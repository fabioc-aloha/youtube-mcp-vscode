/**
 * _registry.cjs — best-effort heir registry in shared AI-Memory.
 *
 * Resolves the user's AI-Memory root (OneDrive, iCloud, Dropbox, or ~/AI-Memory)
 * and upserts the heir's row in <root>/heirs/registry.json. Best-effort: never
 * throws on failure — the registry is optional fleet-tracking, not load-bearing.
 *
 * Used by bootstrap-heir.cjs and upgrade-self.cjs.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME = os.homedir();
const CANDIDATES = [
    path.join(HOME, 'OneDrive - Correa Family', 'AI-Memory'),
    path.join(HOME, 'OneDrive', 'AI-Memory'),
    path.join(HOME, 'iCloudDrive', 'AI-Memory'),
    path.join(HOME, 'iCloud Drive', 'AI-Memory'),
    path.join(HOME, 'iCloud~com~apple~CloudDocs', 'AI-Memory'),
    path.join(HOME, 'Dropbox', 'AI-Memory'),
    path.join(HOME, 'AI-Memory'),
];

function resolveAiMemoryRoot() {
    for (const candidate of CANDIDATES) {
        try {
            if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
                return candidate;
            }
        } catch {
            // continue
        }
    }
    return null;
}

/**
 * Upsert a heir row. Returns { ok: true, path } or { ok: false, reason }.
 * Honors marker.opt_in.fleet_inventory (default true). Never throws.
 */
function upsertHeir(marker, repoPath) {
    try {
        if (marker && marker.opt_in && marker.opt_in.fleet_inventory === false) {
            return { ok: false, reason: 'opted-out' };
        }
        const root = resolveAiMemoryRoot();
        if (!root) {
            return { ok: false, reason: 'no-ai-memory' };
        }
        const heirsDir = path.join(root, 'heirs');
        const registryPath = path.join(heirsDir, 'registry.json');
        fs.mkdirSync(heirsDir, { recursive: true });

        let registry = { schema: '1.0', heirs: {} };
        if (fs.existsSync(registryPath)) {
            try {
                registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
                if (!registry.heirs) registry.heirs = {};
            } catch {
                // corrupt — start fresh, don't lose write
                registry = { schema: '1.0', heirs: {} };
            }
        }

        const heirId = marker.heir_id;
        if (!heirId) return { ok: false, reason: 'no-heir-id' };

        registry.heirs[heirId] = {
            heir_id: heirId,
            heir_name: marker.heir_name || heirId,
            edition: marker.edition || 'Alex_ACT_Edition',
            edition_version: marker.edition_version || '0.0.0',
            repo_url: marker.repo_url || '',
            repo_path: repoPath || '',
            deployed_at: marker.deployed_at || new Date().toISOString(),
            last_sync_at: marker.last_sync_at || new Date().toISOString(),
            owner: (marker.contact && marker.contact.owner) || '',
        };
        registry.last_updated = new Date().toISOString();

        fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n');
        return { ok: true, path: registryPath };
    } catch (e) {
        return { ok: false, reason: `error: ${e.message}` };
    }
}

module.exports = { resolveAiMemoryRoot, upsertHeir };
