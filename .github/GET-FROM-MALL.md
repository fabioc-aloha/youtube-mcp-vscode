# GET-FROM-MALL — youtube-mcp-vscode

Reset to Alex_ACT_Edition v0.9.0 on 2026-04-30.

## Install from Alex_Skill_Mall

```powershell
# Run from the project root in PowerShell
$mall = "C:\Development\Alex_Skill_Mall"
New-Item -ItemType Directory -Path .github\skills\local -Force | Out-Null

# mcp-builder
New-Item -ItemType Directory -Path .github\skills\local\mcp-builder -Force | Out-Null
Copy-Item "$mall\skills\ai-llm\mcp-builder\*" .github\skills\local\mcp-builder\ -Recurse -Force

# mcp-development
New-Item -ItemType Directory -Path .github\skills\local\mcp-development -Force | Out-Null
Copy-Item "$mall\skills\ai-llm\mcp-development\*" .github\skills\local\mcp-development\ -Recurse -Force

# sse-streaming
New-Item -ItemType Directory -Path .github\skills\local\sse-streaming -Force | Out-Null
Copy-Item "$mall\skills\ai-llm\sse-streaming\*" .github\skills\local\sse-streaming\ -Recurse -Force

# release-preflight
New-Item -ItemType Directory -Path .github\skills\local\release-preflight -Force | Out-Null
Copy-Item "$mall\skills\process\release-preflight\*" .github\skills\local\release-preflight\ -Recurse -Force

# vscode-extension-patterns
New-Item -ItemType Directory -Path .github\skills\local\vscode-extension-patterns -Force | Out-Null
Copy-Item "$mall\skills\vscode\vscode-extension-patterns\*" .github\skills\local\vscode-extension-patterns\ -Recurse -Force

# testing-strategies
New-Item -ItemType Directory -Path .github\skills\local\testing-strategies -Force | Out-Null
Copy-Item "$mall\skills\quality\testing-strategies\*" .github\skills\local\testing-strategies\ -Recurse -Force

# secrets-management
New-Item -ItemType Directory -Path .github\skills\local\secrets-management -Force | Out-Null
Copy-Item "$mall\skills\security\secrets-management\*" .github\skills\local\secrets-management\ -Recurse -Force

# distribution-security
New-Item -ItemType Directory -Path .github\skills\local\distribution-security -Force | Out-Null
Copy-Item "$mall\skills\security\distribution-security\*" .github\skills\local\distribution-security\ -Recurse -Force

# extension-audit-methodology
New-Item -ItemType Directory -Path .github\skills\local\extension-audit-methodology -Force | Out-Null
Copy-Item "$mall\skills\quality\extension-audit-methodology\*" .github\skills\local\extension-audit-methodology\ -Recurse -Force

```

## After installing

Delete this file, stage, and commit:

```powershell
Remove-Item .github\GET-FROM-MALL.md
git add -A
git commit -m "chore: reinstall Mall skills for youtube-mcp-vscode"
```
