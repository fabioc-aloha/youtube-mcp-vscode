---
type: skill
lifecycle: stable
name: "mermaid-mode-fragility"
description: "Mermaid renders blank or garbled — diagnose silent failures in timeline, gitGraph, gantt; default to flowchart for arbitrary text"
tier: standard
inheritance: inheritable
applyTo: '**/*.md,**/*mermaid*,**/*diagram*'
currency: 2026-04-30
lastReviewed: 2026-04-30
---

# Mermaid Mode Fragility

> Battle-tested in production — multiple Mermaid modes fail silently on colons and quoted tags. Default to `flowchart` for any diagram with arbitrary text content.

## When to Use

- A Mermaid diagram renders blank or garbled with no error message
- You're about to use `timeline`, `gitGraph`, or `gantt` with arbitrary text
- The diagram works in Mermaid Live Editor but breaks on GitHub
- Time values like `HH:MM` appear in any diagram label

## Why It Happens

Several Mermaid modes have undocumented constraints around colons (`:`) and other characters. They fail silently or produce garbage output. The renderer does not surface the parse error to the page.

## The Fragile Modes

### 1. Timeline Mode

Uses `:` as time/event separator. Breaks on `HH:MM` times.

```mermaid
timeline
  title Project Timeline
  2024-01 : Project kickoff
  2024-02 : Design complete
  10:30 : Daily standup    ← BREAKS: colon in time value
```

### 2. GitGraph Mode

Long linear chains with colon-bearing quoted tags fail to render.

```mermaid
gitGraph
  commit id: "feat: initial"
  commit id: "feat: add login"
  commit id: "fix: security"
  ... 10+ more commits ...    ← BREAKS: long chains with colons
  commit id: "chore: release"
```

### 3. Gantt Mode

`dateFormat HH:mm` mis-parses task lines with times.

```mermaid
gantt
  dateFormat HH:mm
  title Daily Schedule
  Meeting : 09:00, 1h         ← BREAKS: colon in description
  Standup : 10:30, 30m
```

## The Rule

**Default to flowchart for any diagram with arbitrary text labels.**

Flowchart (TB/LR/TD) is the only Mermaid mode that reliably survives complex content:

```mermaid
flowchart TB
  A[09:00 Meeting] --> B[10:30 Standup]
  B --> C[14:00 Review]
```

## Safe vs Fragile Modes

| Mode | Status | Constraint |
|------|--------|------------|
| `flowchart` | ✅ Safe | None — handles any content |
| `sequenceDiagram` | ✅ Safe | Standard message format |
| `classDiagram` | ✅ Safe | Standard notation |
| `stateDiagram` | ⚠️ Caution | Colons in state names |
| `erDiagram` | ✅ Safe | Standard notation |
| `timeline` | ❌ Fragile | No colons in events |
| `gitGraph` | ❌ Fragile | Short chains only |
| `gantt` | ❌ Fragile | No HH:MM in dateFormat |
| `journey` | ⚠️ Caution | Score format sensitive |

## Flowchart Alternatives

### Instead of Timeline

```mermaid
flowchart LR
  A[Jan: Kickoff] --> B[Feb: Design] --> C[Mar: Build]
```

### Instead of GitGraph

```mermaid
flowchart TB
  A[main] --> B[feat/login]
  B --> C[feat/auth]
  C --> D[release/1.0]
```

### Instead of Gantt

```mermaid
flowchart TB
  subgraph Morning
    A[09:00 Meeting]
    B[10:30 Standup]
  end
  subgraph Afternoon
    C[14:00 Review]
    D[16:00 Deploy]
  end
```

## Debugging Silent Failures

1. **Check browser console** — Mermaid sometimes logs parse errors
2. **Simplify content** — Remove colons and special chars
3. **Test incrementally** — Add nodes one at a time
4. **Try flowchart** — If it works in flowchart, the mode is the problem

## Verification Checklist

- [ ] Does diagram contain colons in text?
- [ ] Using a fragile mode (`timeline`, `gitGraph`, `gantt`)?
- [ ] Test in Mermaid Live Editor before committing
- [ ] Consider flowchart for complex text content

## Related

- [markdown-mermaid](../markdown-mermaid/SKILL.md) — full markdown + Mermaid style guide
- [lint-clean-markdown](../lint-clean-markdown/SKILL.md) — pass markdownlint on first attempt
