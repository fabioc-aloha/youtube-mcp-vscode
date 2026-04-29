# Identity (heir-owned)

<!--
  This file is heir-owned. Edition upgrades never overwrite it.
  Use it to layer YOUR identity, project context, and preferences
  on top of the Edition's copilot-instructions.md.
-->

## Project Context

**YouTube MCP Tools** — a VS Code extension (publisher: `fabioc-aloha`, package: `youtube-mcp-tools`) that lets users search YouTube, analyze videos, extract transcripts, and generate flashcards directly from VS Code via a local MCP server the extension manages itself. Zero external runtime dependencies beyond what ships with VS Code + the MCP server. Owned by Fabio Correa (Director of Business Analytics at Microsoft, DBA candidate, AI researcher).

Source layout:

- `src/extension.ts` — activation, commands, tree view registration
- `src/mcpClient.ts` — MCP server lifecycle and JSON-RPC calls
- `src/services/youtubeService.ts` — YouTube domain logic
- `src/views/` — tree view providers (`recentVideos`, `searchResults`, `flashcards`)
- `src/statusBar.ts` — status bar integration
- `src/test/extension.test.ts` — extension tests

## Domain Vocabulary

| Term | Meaning |
|---|---|
| **MCP** | Model Context Protocol — JSON-RPC protocol for AI tool servers |
| **MCP server** | The local Node process this extension launches and talks to |
| **Tree view** | VS Code sidebar providers in `src/views/` |
| **Flashcard** | Generated study card derived from a video transcript |
| **Recent videos** | Cached list of videos the user has interacted with |

## My Preferences

- **Build & test**: use the `watch` task (combined `npm: watch:tsc` + `npm: watch:esbuild`), not bare `tsc`. Tests run from `src/test/`.
- **TypeScript**: strict mode, modern target. VS Code engine is recent — don't downgrade syntax for older runtimes.
- **Bundling**: esbuild via `esbuild.js`, not webpack.
- **Linting**: flat config in `eslint.config.mjs`. Follow existing style; no new rules without discussion.
- **Mermaid**: pastel-light palette per user-memory `mermaid-palette.md` — always include the full `themeVariables` init block, with `color:#1f2937` on every classDef.
- **Awesome-list fetches**: scope the query to the section needed; never fetch raw 50k+ star READMEs blindly (per user-memory `awesome-list-fetch-budget.md`).
- **Communication** (per `config/USER-PROFILE.md`): balanced formality, balanced detail, occasional humor, ask when needed.

## Constraints

- **No secrets in repo**: no API keys, OAuth tokens, or `.env` files. Auth, when needed, goes through VS Code SecretStorage.
- **No billing-required YouTube API calls without explicit user consent.**
- **Keep `extension.ts` activate() lean**: heavy work goes into commands or lazy services so activation stays fast.
- **Justify new runtime dependencies**: this extension's selling point is "zero external dependencies." New `dependencies` entries in `package.json` need a reason.
- **Backups (`.github Backup *`, `.github-backup-*`) are not sources of truth.** The live `.github/` is. Plan to delete the backups in a separate commit once Edition migration has settled.

## Local Skills (ported 2026-04-28)

Project-specific skills, prompts, and instructions ported from the pre-Edition snapshot, all under `.github/*/local/`:

| Path | Purpose |
|---|---|
| `skills/local/mcp-builder/` | Authoring guide for MCP servers (TS/Python/.NET SDKs) — Track A.1 of v0.3.0 |
| `skills/local/mcp-development/` | MCP architecture, transports, deployment patterns; tracks SDK security advisories |
| `skills/local/vscode-extension-patterns/` | Webview, TreeDataProvider, command, configuration, secret-storage patterns |
| `skills/local/secrets-management/` | SecretStorage usage and audit (already used in this extension) |
| `skills/local/distribution-security/` | Signed VSIX, supply-chain hygiene — Track C.3 |
| `skills/local/release-preflight/` | Pre-publish checklist — Track C.3 |
| `skills/local/testing-strategies/` | Coverage and test design — Track C.4 |
| `prompts/local/mcp-server.prompt.md` | Scaffold a complete MCP server end-to-end |
| `prompts/local/vscode-extension-audit.prompt.md` | 5-phase audit of an extension |
| `prompts/local/release.prompt.md` | Release workflow |
| `prompts/local/tests.prompt.md` | Generate tests for changed code |
| `prompts/local/debug.prompt.md` | Hypothesis-driven debugging template |
| `instructions/local/release-process.instructions.md` | Release hygiene rules |
| `instructions/local/extension-audit-methodology.instructions.md` | Audit methodology |
| `instructions/local/sse-streaming.instructions.md` | SSE / Streamable-HTTP patterns for MCP transport |

Use these when working on the v0.3.0 plan in `archive/upgrades/` or any future MCP-server / VSIX-publish work.
