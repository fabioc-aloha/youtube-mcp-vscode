# External API Registry

Centralized source-of-truth for external APIs, models, and services referenced by skills/instructions/muscles in this brain.

## How This Works

- **Each row tracks one vendor or API surface.** Use one table per category (image models, video models, TTS, etc.).
- **`Last Checked`** must be an ISO date `YYYY-MM-DD`. The date itself is the freshness signal.
- **`Brain Files`** is a comma-separated list of `skills/<name>` or `instructions/<name>` that depend on this entry. Used to compute the blast radius of drift.
- **`Source URL`** must be reachable with a `HEAD` request. The audit muscle (`/audit-apis`) can probe these on demand.

## Maintenance Loop

```text
node .github/muscles/audit-api-drift.cjs                  # report stale entries
node .github/muscles/audit-api-drift.cjs --probe          # also HEAD-check source URLs
/audit-apis                                                # full LLM-driven refresh
```

The script catches **time-based drift** (entries older than 30 days). The `/audit-apis` prompt catches **content drift** (new model versions, deprecated endpoints, breaking changes) — that's the LLM's job, not the script's.

## Freshness Policy

| Age of `Last Checked` | Status |
|---|---|
| ≤ 30 days | Fresh |
| 31–90 days | Stale (warn) |
| > 90 days | Expired (fail) |

Override the threshold with `--max-age-days=N`.

## Registries

> **No entries yet.** This Edition installation has no skills that depend on external AI APIs. Add a table below when a skill lands that needs version tracking — typical categories are listed in the template at the bottom of this file. The audit muscle will report `0 entries` until populated.

<!-- Add tables here. Example structure:

## Replicate Image Models

| Vendor | Latest Models | Source URL | Last Checked | Brain Files |
|---|---|---|---|---|
| Black Forest Labs (FLUX) | `flux-2-max`, `flux-2-pro` | <https://replicate.com/black-forest-labs> | 2026-04-26 | skills/image-handling, instructions/image-generation-guidelines |

## Replicate Video Models

| Vendor | Latest Models | Source URL | Last Checked | Brain Files |
|---|---|---|---|---|

## Replicate TTS / Audio Models

| Vendor | Latest Models | Source URL | Last Checked | Brain Files |
|---|---|---|---|---|

## Microsoft APIs

| API | Endpoints / Versions | Source URL | Last Checked | Brain Files |
|---|---|---|---|---|

## CLI Tools (Pandoc, Mermaid, etc.)

| Tool | Tested Version | Source URL | Last Checked | Brain Files |
|---|---|---|---|---|

-->

## When a Mall Skill Adds an API

When you install a skill from [Alex_Skill_Mall](https://github.com/fabioc-aloha/Alex_Skill_Mall) that wraps an external API, the skill's README will tell you which row(s) to add to this registry. Add them under the appropriate category, set `Last Checked` to today's date, and run `/audit-apis` to verify.

If a skill wraps an API not covered by any existing category, add a new `## <Category>` heading with the same five-column table structure.
