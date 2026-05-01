# GET-FROM-MALL - youtube-mcp-vscode

Reset to Alex_ACT_Edition v0.9.0 on 2026-04-30.

## Install from Alex_Skill_Mall

```bash
mall=~/Alex_Skill_Mall
mkdir -p .github/skills/local

# mcp-builder
mkdir -p .github/skills/local/mcp-builder
cp -r $mall/skills/ai-llm/mcp-builder/* .github/skills/local/mcp-builder/

# mcp-development
mkdir -p .github/skills/local/mcp-development
cp -r $mall/skills/ai-llm/mcp-development/* .github/skills/local/mcp-development/

# sse-streaming
mkdir -p .github/skills/local/sse-streaming
cp -r $mall/skills/ai-llm/sse-streaming/* .github/skills/local/sse-streaming/

# release-preflight
mkdir -p .github/skills/local/release-preflight
cp -r $mall/skills/process/release-preflight/* .github/skills/local/release-preflight/

# vscode-extension-patterns
mkdir -p .github/skills/local/vscode-extension-patterns
cp -r $mall/skills/vscode/vscode-extension-patterns/* .github/skills/local/vscode-extension-patterns/

# testing-strategies
mkdir -p .github/skills/local/testing-strategies
cp -r $mall/skills/quality/testing-strategies/* .github/skills/local/testing-strategies/

# secrets-management
mkdir -p .github/skills/local/secrets-management
cp -r $mall/skills/security/secrets-management/* .github/skills/local/secrets-management/

# distribution-security
mkdir -p .github/skills/local/distribution-security
cp -r $mall/skills/security/distribution-security/* .github/skills/local/distribution-security/

# extension-audit-methodology
mkdir -p .github/skills/local/extension-audit-methodology
cp -r $mall/skills/quality/extension-audit-methodology/* .github/skills/local/extension-audit-methodology/

```

## After installing

Delete this file, stage, and commit:

```bash
rm .github/GET-FROM-MALL.md
git add -A
git commit -m "chore: reinstall Mall skills for youtube-mcp-vscode"
```
