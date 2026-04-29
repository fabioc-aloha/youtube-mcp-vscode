# Alex — ACT Edition

This folder contains Alex's cognitive architecture.

## What's Here

| Folder | Purpose |
|--------|---------|
| `copilot-instructions.md` | Identity and routing |
| `instructions/` | 52 always-on cognitive behaviors |
| `skills/` | Reusable expertise packages (ships with `markdown-mermaid`, `md-to-html`, `md-to-word`, `md-to-eml`, `docx-to-md`) |
| `prompts/` | User-invokable workflows (`/welcome`, `/feedback`, `/save-session-note`, `/install-from-mall`) |
| `muscles/` | Executable converters (`md-to-html`, `md-to-eml`, `md-to-txt`, `html-to-md`, `md-to-word`, `docx-to-md`) + shared modules + Pandoc lua filters |
| `episodic/` | Memory-formation templates (heirs fill these in) |
| `scripts/` | `bootstrap-heir.cjs` (one-shot heir init) and `upgrade-self.cjs` (heir-side pull) |
| `config/sync-policy.json` | Edition-owned vs heir-owned paths for `upgrade-self.cjs` |
| `.act-heir.json` | Heir self-identification marker (rendered by `bootstrap-heir.cjs`) |
| `VERSION`, `LICENSE` | Edition release stamp + license |

## How It Works

The instructions in `instructions/` auto-load based on context via `applyTo` patterns. Alex starts with the cognitive behaviors and grows project-specific knowledge over time.

## Converters

Edition ships six format converters under `muscles/`:

| Tool | Purpose | External deps |
|------|---------|---------------|
| `md-to-html.cjs` | Standalone HTML with embedded CSS, base64 images, Mermaid | none |
| `md-to-eml.cjs` | Email file (.eml) with frontmatter-driven headers | none |
| `md-to-txt.cjs` | Strip-to-plaintext | none |
| `html-to-md.cjs` | HTML → Markdown round-trip | none |
| `md-to-word.cjs` | Word .docx via Pandoc | Pandoc, `jszip` (npm) |
| `docx-to-md.cjs` | Word → Markdown round-trip | Pandoc |

Heirs that need PDF, EPUB, LaTeX, PPTX, or Gamma converters can pull them on-demand from [Alex_Skill_Mall](https://github.com/fabioc-aloha/Alex_Skill_Mall) under `skills/converters/`.

## The Mall: On-Demand Add-Ons

[Alex_Skill_Mall](https://github.com/fabioc-aloha/Alex_Skill_Mall) is a public catalog of optional skills, patterns, MCP server configs, and scaffolds. Pull only what you need — keep the brain small by default.

Install with the `/install-from-mall` prompt, or follow `instructions/mall-installation.instructions.md`. **Always install under the `local/` subdirs** (`skills/local/`, `instructions/local/`, `muscles/local/`, `prompts/local/`) — those paths are heir-owned and survive Edition upgrades.

## Growth

Alex builds knowledge through:

- **Skills** → `.github/skills/*/SKILL.md`
- **Instructions** → `.github/instructions/*.instructions.md`
- **Prompts** → `.github/prompts/*.prompt.md` (user-invokable)
- **Muscles** → `.github/muscles/*.cjs` (executable tools)
- **Episodic memory** → `.github/episodic/`

Heir-owned local additions live in `instructions/local/`, `skills/local/`, `prompts/local/`, `muscles/local/` — never overwritten on upgrade.

Invoke "let's meditate" to consolidate session learnings.

## Pull-Based Updates

Heirs self-update by running `node .github/scripts/upgrade-self.cjs` from their own repo root. The script clones the latest `Alex_ACT_Edition`, applies edition-owned paths, preserves heir-owned paths, and bumps the marker. Major bumps require `--allow-major`. See [decisions/ADR-002-pull-based-fleet.md](https://github.com/fabioc-aloha/Alex_ACT_Supervisor/blob/main/decisions/ADR-002-pull-based-fleet.md) in the Supervisor repo.
