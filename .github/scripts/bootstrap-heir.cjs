#!/usr/bin/env node
/**
 * bootstrap-heir.cjs — initialize a new ACT-Edition heir.
 *
 * Run from a fresh clone of Alex_ACT_Edition. Targets an existing or new
 * directory, copies edition-owned files, and renders the .act-heir.json marker.
 *
 * Usage:
 *   node .github/scripts/bootstrap-heir.cjs \
 *       --target <path> \
 *       --heir-id <slug> \
 *       --heir-name "Display Name" \
 *       --repo-url https://github.com/owner/repo \
 *       --owner <github-handle> \
 *       [--apply]
 *
 * Without --apply, the script reports what it would do (dry-run by default).
 *
 * After bootstrap, the heir owns the directory. Subsequent upgrades happen
 * via `node .github/scripts/upgrade-self.cjs` from the heir's own repo root.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { upsertHeir } = require('./_registry.cjs');

const IDENTITY_TEMPLATE = `# Identity (heir-owned)

<!--
  This file is heir-owned. Edition upgrades never overwrite it.
  Use it to layer YOUR identity, project context, and preferences
  on top of the Edition's copilot-instructions.md.
-->

## Project Context

<!-- One-paragraph summary: what this repo does, who uses it, and why. -->

## Domain Vocabulary

<!-- Project-specific terms, abbreviations, or product names that
     would otherwise be ambiguous. -->

## My Preferences

<!-- Communication style, code-review priorities, naming conventions,
     test framework choices, etc. -->

## Constraints

<!-- Hard rules: "never use X", "always do Y first". -->
`;


function arg(name, fallback) {
    const i = process.argv.indexOf(name);
    if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
    return fallback;
}
const args = new Set(process.argv.slice(2));
const APPLY = args.has('--apply');

// Script lives at <edition-root>/.github/scripts/bootstrap-heir.cjs
const EDITION_ROOT = path.resolve(__dirname, '..', '..');
const TARGET = arg('--target', null);
const HEIR_ID = arg('--heir-id', null);
const HEIR_NAME = arg('--heir-name', null);
const REPO_URL = arg('--repo-url', null);
const OWNER = arg('--owner', null);

if (!TARGET || !HEIR_ID) {
    console.error('Required: --target <path> --heir-id <slug>');
    console.error('Recommended: --heir-name --repo-url --owner');
    process.exit(2);
}

if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(HEIR_ID) || HEIR_ID.length < 2) {
    console.error(`Invalid --heir-id "${HEIR_ID}". Must be lowercase alphanumeric + hyphens, 2-64 chars.`);
    process.exit(2);
}

const targetAbs = path.resolve(TARGET);
const policyPath = path.join(EDITION_ROOT, '.github', 'config', 'sync-policy.json');
const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));
const editionVersion = fs.readFileSync(path.join(EDITION_ROOT, '.github', 'VERSION'), 'utf8').trim();
const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

console.log(`ACT Heir Bootstrap`);
console.log(`Edition: ${EDITION_ROOT}`);
console.log(`Edition version: ${editionVersion}`);
console.log(`Target: ${targetAbs}`);
console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}`);
console.log('');

if (fs.existsSync(targetAbs)) {
    const heirMarker = path.join(targetAbs, '.github', '.act-heir.json');
    if (fs.existsSync(heirMarker)) {
        console.error(`Refusing to bootstrap: target already has .github/.act-heir.json`);
        console.error(`Use .github/scripts/upgrade-self.cjs from inside the heir to update.`);
        process.exit(2);
    }
}

function expandGlob(pattern) {
    // Minimal glob: '**' = recurse, '*' = single segment wildcard.
    // Returns relative paths from EDITION_ROOT that exist and match.
    const literal = pattern.replace(/\\/g, '/');
    if (!literal.includes('*')) {
        return fs.existsSync(path.join(EDITION_ROOT, literal)) ? [literal] : [];
    }
    const parts = literal.split('/');
    const results = [];
    function walk(dir, idx) {
        if (idx >= parts.length) return;
        const seg = parts[idx];
        const full = path.join(EDITION_ROOT, dir);
        if (!fs.existsSync(full)) return;
        const entries = fs.readdirSync(full, { withFileTypes: true });
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

const filesToCopy = new Set();
for (const pattern of policy.edition_owned) {
    for (const rel of expandGlob(pattern)) {
        filesToCopy.add(rel);
    }
}

const sortedFiles = [...filesToCopy].sort();
console.log(`Edition files to install: ${sortedFiles.length}`);
const sample = sortedFiles.slice(0, 10);
sample.forEach((f) => console.log(`  ${f}`));
if (sortedFiles.length > sample.length) console.log(`  ... and ${sortedFiles.length - sample.length} more`);
console.log('');

const markerPath = path.join(targetAbs, '.github', '.act-heir.json');
const marker = {
    $schema: 'https://github.com/fabioc-aloha/Alex_ACT_Supervisor/blob/main/fleet/schema/act-heir.schema.json',
    spec_version: '1.0',
    edition: 'Alex_ACT_Edition',
    edition_version: editionVersion,
    heir_id: HEIR_ID,
    heir_name: HEIR_NAME || HEIR_ID,
    repo_url: REPO_URL || '',
    deployed_at: now,
    last_sync_at: now,
    contact: {
        owner: OWNER || '',
        feedback_channel: 'issues',
    },
    opt_in: {
        fleet_inventory: true,
        announcements: true,
        telemetry: false,
    },
    notes: '',
};

console.log(`Marker to render: ${path.relative(targetAbs, markerPath)}`);
console.log(`  heir_id: ${marker.heir_id}`);
console.log(`  edition_version: ${marker.edition_version}`);
console.log(`  deployed_at: ${marker.deployed_at}`);
console.log('');

if (!APPLY) {
    console.log('DRY-RUN complete. Re-run with --apply to write.');
    process.exit(0);
}

fs.mkdirSync(targetAbs, { recursive: true });
let copied = 0;
for (const rel of sortedFiles) {
    const src = path.join(EDITION_ROOT, rel);
    const dst = path.join(targetAbs, rel);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    copied += 1;
}

// Heir-owned templates: copy from Edition source on first bootstrap if missing.
// These files become heir-owned the moment they land — upgrade-self.cjs will
// never touch them again. Skip any glob (e.g. **/local/**) without source files.
let templatesRendered = 0;
for (const pattern of (policy.heir_owned || [])) {
    for (const rel of expandGlob(pattern)) {
        const src = path.join(EDITION_ROOT, rel);
        const dst = path.join(targetAbs, rel);
        if (!fs.existsSync(src)) continue;
        if (fs.existsSync(dst)) continue;
        fs.mkdirSync(path.dirname(dst), { recursive: true });
        fs.copyFileSync(src, dst);
        templatesRendered += 1;
    }
}

fs.mkdirSync(path.dirname(markerPath), { recursive: true });
fs.writeFileSync(markerPath, JSON.stringify(marker, null, 2) + '\n');

// Render copilot-instructions.local.md template if it doesn't already exist.
// Heir-owned — only created on first bootstrap, never overwritten.
const identityPath = path.join(targetAbs, '.github', 'copilot-instructions.local.md');
let identityRendered = false;
if (!fs.existsSync(identityPath)) {
    fs.writeFileSync(identityPath, IDENTITY_TEMPLATE);
    identityRendered = true;
}

// Best-effort: register this heir in shared AI-Memory/heirs/registry.json.
const registryResult = upsertHeir(marker, targetAbs);

console.log(`Wrote ${copied} edition files + ${templatesRendered} heir-owned template${templatesRendered === 1 ? '' : 's'} + 1 marker${identityRendered ? ' + identity template' : ''} to ${targetAbs}`);
if (registryResult.ok) {
    console.log(`Registered in fleet: ${registryResult.path}`);
} else if (registryResult.reason === 'opted-out') {
    console.log('Skipped fleet registration (opt_in.fleet_inventory: false in marker)');
} else if (registryResult.reason === 'no-ai-memory') {
    console.log('Skipped fleet registration (no AI-Memory folder found in OneDrive/iCloud/Dropbox/~).');
} else {
    console.log(`Skipped fleet registration: ${registryResult.reason}`);
}
console.log('');
console.log('');
console.log('Next steps:');
console.log(`  cd ${targetAbs}`);
console.log('  git init && git add . && git commit -m "Bootstrap from Alex_ACT_Edition ' + editionVersion + '"');
console.log('  # then: node .github/scripts/upgrade-self.cjs to pull future Edition releases');
console.log('');
console.log('Feedback channel: drop markdown files in AI-Memory/feedback/alex-act/ on shared OneDrive.');
console.log('Announcements:    read AI-Memory/announcements/alex-act/ for fleet-wide updates.');
