---
description: "Convert a Markdown document to RFC 5322 email (.eml) with inline CSS, CID images, and email-safe formatting"
mode: agent
lastReviewed: 2026-04-30
---

# Markdown → Email (.eml)

Skill: [md-to-eml](../skills/md-to-eml/SKILL.md). Muscle: `.github/muscles/md-to-eml.cjs`.

## Steps

1. **Source must include email headers** in YAML frontmatter (`to`, `subject`, optional `from`, `cc`, `bcc`).
2. **Run.** `node .github/muscles/md-to-eml.cjs message.md`.
3. **Optional flags.**
   - `--inline-images` — embed images as CID attachments
   - `--test` / `--test-to ADDRESS` — send via local SMTP for preview
   - `--no-replace-em-dashes` — keep `—` (default: replaced)
   - `--no-strip-decorative-rules` — keep `---` (default: stripped)
4. **Open the `.eml`** in Outlook or any email client to verify rendering. Mermaid diagrams degrade gracefully to table fallbacks (email clients can't run JS).

## Related

- [lint-clean-markdown](../skills/lint-clean-markdown/SKILL.md)
- [markdown-sanitization-chain](../skills/markdown-sanitization-chain/SKILL.md)
