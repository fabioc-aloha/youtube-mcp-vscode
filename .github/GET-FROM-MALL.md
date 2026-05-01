# GET-FROM-MALL — youtube-mcp-vscode

This heir was reset to a fresh Alex_ACT_Edition v0.9.0 baseline on 2026-04-30.
Use this file to reinstall project-specific skills from the Mall.

## Install from Alex_Skill_Mall

Run these commands from the project root to reinstall project-specific skills:

```bash
# Clone the Mall (if not already cloned)
git clone https://github.com/fabioc-aloha/Alex_Skill_Mall.git ~/Alex_Skill_Mall

# Install skills into local/ (heir-owned, survives Edition upgrades)
mkdir -p .github/skills/local
cp -r ~/Alex_Skill_Mall/skills/ai-llm/mcp-builder/ .github/skills/local/mcp-builder/
cp -r ~/Alex_Skill_Mall/skills/ai-llm/mcp-development/ .github/skills/local/mcp-development/
cp -r ~/Alex_Skill_Mall/skills/ai-llm/sse-streaming/ .github/skills/local/sse-streaming/
cp -r ~/Alex_Skill_Mall/skills/process/release-preflight/ .github/skills/local/release-preflight/
cp -r ~/Alex_Skill_Mall/skills/vscode/vscode-extension-patterns/ .github/skills/local/vscode-extension-patterns/
cp -r ~/Alex_Skill_Mall/skills/quality/testing-strategies/ .github/skills/local/testing-strategies/
cp -r ~/Alex_Skill_Mall/skills/security/secrets-management/ .github/skills/local/secrets-management/
cp -r ~/Alex_Skill_Mall/skills/security/distribution-security/ .github/skills/local/distribution-security/
cp -r ~/Alex_Skill_Mall/skills/quality/extension-audit-methodology/ .github/skills/local/extension-audit-methodology/
```

## Project-Specific Customizations (removed — recreate from git history if needed)

- `instructions/local/release-process.instructions.md` — release workflow
- `prompts/local/debug.prompt.md` — debugging workflow
- `prompts/local/mcp-server.prompt.md` — MCP server workflow
- `prompts/local/release.prompt.md` — release workflow
- `prompts/local/tests.prompt.md` — test invocation
- `prompts/local/vscode-extension-audit.prompt.md` — extension audit

## After reinstalling

1. Delete this file
2. Commit: `git add -A && git commit -m "chore: reset to Edition v0.9.0 + reinstall local skills"`
