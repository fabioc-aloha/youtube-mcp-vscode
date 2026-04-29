#!/usr/bin/env node
/**
 * upgrade-self.cjs — heir-side pull from Alex_ACT_Edition.
 *
 * Run from a heir repo root. Fetches Edition into a temp dir, applies
 * edition_owned paths per .github/config/sync-policy.json, preserves
 * heir_owned paths, and bumps edition_version + last_sync_at in the marker.
 *
 * Usage:
 *   node .github/scripts/upgrade-self.cjs              # dry-run; reports changes
 *   node .github/scripts/upgrade-self.cjs --apply      # apply changes
 *   node .github/scripts/upgrade-self.cjs --from <url> # use alternate Edition remote
 *   node .github/scripts/upgrade-self.cjs --ref <ref>  # use alternate ref (default: main)
 *   node .github/scripts/upgrade-self.cjs --allow-major  # required if Edition major bumped
 *
 * The script never writes outside the heir repo. It does not touch git
 * (no commits, no pushes). The heir reviews the diff and commits.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { upsertHeir } = require('./_registry.cjs');

const HEIR_ROOT = process.cwd();
const args = new Set(process.argv.slice(2));
function arg(name, fallback) {
    const i = process.argv.indexOf(name);
    if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
    return fallback;
}
const APPLY = args.has('--apply');
const ALLOW_MAJOR = args.has('--allow-major');
const FROM = arg('--from', 'https://github.com/fabioc-aloha/Alex_ACT_Edition.git');
const REF = arg('--ref', 'main');

const markerPath = path.join(HEIR_ROOT, '.github', '.act-heir.json');
if (!fs.existsSync(markerPath)) {
    console.error(`No .github/.act-heir.json found in ${HEIR_ROOT}`);
    console.error('Are you running from a heir repo root? Bootstrap first via Edition\'s .github/scripts/bootstrap-heir.cjs.');
    process.exit(2);
}

const marker = JSON.parse(fs.readFileSync(markerPath, 'utf8'));
const currentVersion = marker.edition_version || '0.0.0';

console.log(`ACT Heir Self-Upgrade`);
console.log(`Heir: ${marker.heir_id} (${marker.heir_name || ''})`);
console.log(`Current edition_version: ${currentVersion}`);
console.log(`Source: ${FROM} @ ${REF}`);
console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}`);
console.log('');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'alex-act-edition-'));
let cleanupNeeded = true;
function cleanup() {
    if (!cleanupNeeded) return;
    try {
        fs.rmSync(tmp, { recursive: true, force: true });
    } catch {
        // best-effort
    }
    cleanupNeeded = false;
}
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(130); });

try {
    console.log(`Fetching Edition into ${tmp}...`);
    execFileSync('git', ['clone', '--depth', '1', '--branch', REF, FROM, tmp], { stdio: ['ignore', 'ignore', 'pipe'] });
} catch (err) {
    console.error(`Failed to clone Edition: ${err.message}`);
    process.exit(1);
}

const versionPath = path.join(tmp, '.github', 'VERSION');
if (!fs.existsSync(versionPath)) {
    console.error(`Cloned Edition has no .github/VERSION file. Aborting.`);
    process.exit(1);
}
const newVersion = fs.readFileSync(versionPath, 'utf8').trim();

const policyPath = path.join(tmp, '.github', 'config', 'sync-policy.json');
if (!fs.existsSync(policyPath)) {
    console.error(`Cloned Edition has no sync-policy.json. Aborting.`);
    process.exit(1);
}
const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));

function semver(v) {
    const m = /^(\d+)\.(\d+)\.(\d+)/.exec(v);
    if (!m) return [0, 0, 0];
    return [Number(m[1]), Number(m[2]), Number(m[3])];
}
const [curMaj, curMin, curPatch] = semver(currentVersion);
const [newMaj, newMin, newPatch] = semver(newVersion);
const isMajorBump = newMaj > curMaj;
const isUpgrade = newMaj > curMaj || (newMaj === curMaj && (newMin > curMin || (newMin === curMin && newPatch > curPatch)));
const isDowngrade = !isUpgrade && (newMaj < curMaj || newMin < curMin || newPatch < curPatch);

console.log(`Edition version available: ${newVersion}`);
if (isDowngrade) {
    console.error(`Refusing to downgrade ${currentVersion} -> ${newVersion}.`);
    process.exit(2);
}
if (isMajorBump && !ALLOW_MAJOR) {
    console.error('');
    console.error(`Major bump detected: ${currentVersion} -> ${newVersion}.`);
    console.error('Major releases may contain breaking changes. Review the Edition CHANGELOG, then re-run with --allow-major.');
    process.exit(2);
}
if (currentVersion === newVersion) {
    console.log(`Already on ${currentVersion}. No edition_version change.`);
} else {
    console.log(`Will bump: ${currentVersion} -> ${newVersion}`);
}
console.log('');

function expandGlob(root, pattern) {
    const literal = pattern.replace(/\\/g, '/');
    if (!literal.includes('*')) {
        return fs.existsSync(path.join(root, literal)) ? [literal] : [];
    }
    const parts = literal.split('/');
    const results = [];
    function walk(dir, idx) {
        if (idx >= parts.length) return;
        const seg = parts[idx];
        const full = path.join(root, dir);
        if (!fs.existsSync(full)) return;
        let entries;
        try { entries = fs.readdirSync(full, { withFileTypes: true }); } catch { return; }
        if (seg === '**') {
            for (const e of entries) {
                const rel = path.posix.join(dir, e.name);
                if (e.isDirectory()) {
                    walk(rel, idx);
                    walk(rel, idx + 1);
                } else if (idx + 1 >= parts.length || parts[idx + 1] === e.name) {
                    results.push(rel);
                }
            }
        } else if (seg === '*' || seg.includes('*')) {
            const re = new RegExp('^' + seg.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
            for (const e of entries) {
                if (!re.test(e.name)) continue;
                const rel = path.posix.join(dir, e.name);
                if (idx === parts.length - 1) {
                    if (e.isFile()) results.push(rel);
                } else if (e.isDirectory()) {
                    walk(rel, idx + 1);
                }
            }
        } else {
            for (const e of entries) {
                if (e.name !== seg) continue;
                const rel = path.posix.join(dir, e.name);
                if (idx === parts.length - 1) {
                    if (e.isFile()) results.push(rel);
                } else if (e.isDirectory()) {
                    walk(rel, idx + 1);
                }
            }
        }
    }
    walk('', 0);
    return results;
}

function hash(file) {
    // Normalize CRLF -> LF so Windows/Unix checkouts compare equal.
    // Binary files rarely contain raw 0x0D 0x0A pairs, so the normalization
    // is safe for the file types Edition ships (markdown, JSON, JS, YAML).
    const buf = fs.readFileSync(file);
    const normalized = Buffer.from(buf.toString('binary').replace(/\r\n/g, '\n'), 'binary');
    return crypto.createHash('sha256').update(normalized).digest('hex');
}

const editionFiles = new Set();
for (const pattern of policy.edition_owned) {
    for (const rel of expandGlob(tmp, pattern)) editionFiles.add(rel);
}

const heirOwnedSet = new Set();
for (const pattern of policy.heir_owned) {
    for (const rel of expandGlob(HEIR_ROOT, pattern)) heirOwnedSet.add(rel);
}

const changes = { add: [], update: [], same: [], skipped_heir_owned: [] };
for (const rel of editionFiles) {
    if (heirOwnedSet.has(rel)) {
        changes.skipped_heir_owned.push(rel);
        continue;
    }
    const editionFile = path.join(tmp, rel);
    const heirFile = path.join(HEIR_ROOT, rel);
    if (!fs.existsSync(heirFile)) {
        changes.add.push(rel);
    } else if (hash(editionFile) !== hash(heirFile)) {
        changes.update.push(rel);
    } else {
        changes.same.push(rel);
    }
}

console.log(`Files added:           ${changes.add.length}`);
console.log(`Files updated:         ${changes.update.length}`);
console.log(`Files unchanged:       ${changes.same.length}`);
console.log(`Heir-owned (skipped):  ${changes.skipped_heir_owned.length}`);
console.log('');

if (changes.add.length || changes.update.length) {
    console.log('Changes:');
    [...changes.add.map((f) => `  + ${f}`), ...changes.update.map((f) => `  ~ ${f}`)]
        .slice(0, 30)
        .forEach((line) => console.log(line));
    const total = changes.add.length + changes.update.length;
    if (total > 30) console.log(`  ... and ${total - 30} more`);
    console.log('');
}

if (!APPLY) {
    console.log('DRY-RUN complete. Re-run with --apply to write changes.');
    process.exit(0);
}

let written = 0;
for (const rel of [...changes.add, ...changes.update]) {
    const src = path.join(tmp, rel);
    const dst = path.join(HEIR_ROOT, rel);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    written += 1;
}

const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
marker.edition_version = newVersion;
marker.last_sync_at = now;
fs.writeFileSync(markerPath, JSON.stringify(marker, null, 2) + '\n');

// Best-effort: refresh this heir's row in shared AI-Memory/heirs/registry.json.
const registryResult = upsertHeir(marker, HEIR_ROOT);
if (registryResult.ok) {
    console.log(`Refreshed fleet registry: ${registryResult.path}`);
}

console.log(`Wrote ${written} files. Marker bumped to ${newVersion} @ ${now}.`);
console.log('');
console.log('Next steps:');
console.log('  git status                    # review changes');
console.log('  git diff .github/.act-heir.json');
console.log('  git add -A && git commit -m "Sync to Alex_ACT_Edition ' + newVersion + '"');
