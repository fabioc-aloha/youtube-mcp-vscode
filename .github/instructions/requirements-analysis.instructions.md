---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Requirements elicitation, process analysis, and stakeholder alignment — supports ACT Tenet VII (Frame Before Solve)"
application: "When gathering requirements, understanding problems, or aligning stakeholders"
applyTo: "**/*requirement*,**/*analysis*,**/*stakeholder*,**/*need*"
currency: 2026-04-27
---

# Business Analysis

> **ACT Tenet VII**: The first framing is rarely the right framing. Audit it before optimizing within it.

This instruction provides methods for **understanding what's actually needed** before solving.

## When to Use

| Trigger | Action |
|---------|--------|
| User says "build me X" | Ask "what problem does X solve?" |
| Requirements feel unclear | Elicit underlying needs |
| Stakeholders disagree | Align on problem before solution |
| "Just do what I asked" | Validate the ask is the real need |

## Requirements Elicitation

### The Five Whys (Root Need Discovery)

Keep asking "Why?" until you reach the underlying need:

1. "I need a dashboard" → Why?
2. "To track sales performance" → Why track that?
3. "To identify underperforming regions" → Why identify them?
4. "To allocate resources better" → Why allocate better?
5. "To hit our revenue target" → **Root need: revenue growth**

**Insight**: The request was "dashboard" but the need is "resource allocation for revenue growth." Many solutions could address that.

### Needs vs Solutions vs Features

| Layer | Question | Example |
|-------|----------|---------|
| **Need** (why) | What outcome do you want? | "Know if we're on track for quota" |
| **Solution** (what) | What approach achieves that? | "Weekly sales visibility" |
| **Feature** (how) | What specific thing to build? | "Dashboard with regional breakdown" |

**Rule**: Validate the need before committing to a solution.

### JTBD: Jobs To Be Done

> "People don't buy a drill. They buy a hole in the wall."

| Question | Reveals |
|----------|---------|
| "When [situation], I want to [motivation], so I can [outcome]" | The job being hired |
| "What are you using today?" | Current solution (even if manual) |
| "What's painful about today's approach?" | Real problems to solve |
| "What would success look like?" | Measurable outcomes |

## Process Analysis

### Current State Before Future State

| Step | Purpose |
|------|---------|
| 1. Map current process | Understand what exists |
| 2. Identify pain points | Where does it break? |
| 3. Quantify impact | How much time/money/frustration? |
| 4. Design future state | Now propose improvements |
| 5. Validate with users | Confirm with people who do the work |

**Anti-pattern**: Designing the future without understanding the present.

### Swimlane Process Map

```
Actor A    │ Actor B    │ System
───────────┼────────────┼──────────
Step 1     │            │
    ───────┼──► Step 2  │
           │     ───────┼──► Step 3
           │ ◄──────────┼── Step 4
```

Reveals: Handoffs, bottlenecks, missing steps, redundancy.

## Stakeholder Alignment

### Stakeholder Map

| Stakeholder | Interest | Influence | Needs | Concerns |
|-------------|----------|-----------|-------|----------|
| [Name/Role] | [What they care about] | High/Med/Low | [What they need] | [What worries them] |

### RACI for Requirements

| Requirement | Responsible | Accountable | Consulted | Informed |
|-------------|-------------|-------------|-----------|----------|
| [Req 1] | [Who does] | [Who owns] | [Who advises] | [Who's told] |

## Requirements Documentation

### User Story Format

```
As a [role]
I want [capability]
So that [benefit]

Acceptance Criteria:
- Given [context], when [action], then [outcome]
```

### MoSCoW Prioritization

| Priority | Definition |
|----------|------------|
| **Must** | Required for success — non-negotiable |
| **Should** | Important but not critical — high value |
| **Could** | Nice to have — if time permits |
| **Won't** | Explicitly out of scope — not this time |

## Anti-Patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| Solution before problem | Solving the wrong thing | Ask "what problem does this solve?" |
| Requirements as feature lists | No "why" or prioritization | Include rationale and priority |
| Skipping stakeholder alignment | Rework when they disagree | Align before building |
| Gold-plating | Building beyond validated needs | Stick to MoSCoW priorities |
| Assuming you understand | User's words ≠ user's need | Repeat back, get confirmation |
