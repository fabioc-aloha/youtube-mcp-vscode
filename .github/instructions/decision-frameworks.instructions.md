---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Structured decision-making frameworks — RAPID, DACI, and consensus models for group decisions"
application: "When multiple people are involved in a decision, or when decision authority is unclear"
applyTo: "**/*decision*,**/*approve*,**/*consensus*"
currency: 2026-04-27
---

# Decision Frameworks

> **ACT Tenet III**: Multiple hypotheses need a method for choosing.
> **ACT Tenet VI**: Materiality gating needs clear decision authority.

This instruction provides frameworks for **who decides** and **how**, not just what to decide.

## When to Use

| Trigger | Framework |
|---------|-----------|
| Multiple stakeholders, unclear authority | RAPID or DACI |
| Team needs to agree | Consensus models |
| Recurring decision type | Document the framework once |
| Slow decisions causing delays | Clarify roles and process |

## Decision Role Frameworks

### 1. RAPID (Bain & Company)

| Role | Responsibility | Count |
|------|----------------|-------|
| **R**ecommend | Proposes options, does analysis | 1-2 |
| **A**gree | Must sign off (veto power) | 0-2 |
| **P**erform | Executes the decision | 1+ |
| **I**nput | Consulted, provides expertise | 0+ |
| **D**ecide | Makes the final call | **Exactly 1** |

**Key rule**: Only ONE person can be the Decider. "We all decide" = nobody decides.

### 2. DACI (Intuit)

| Role | Responsibility |
|------|----------------|
| **D**river | Owns the process, keeps things moving |
| **A**pprover | Makes the final call (single person) |
| **C**ontributors | Provide input and expertise |
| **I**nformed | Notified of outcome, no input required |

**RAPID vs DACI**: RAPID separates Recommend from Driver; DACI combines them.

### 3. Decision Rights by Type

| Decision Type | Who Decides | Examples |
|---------------|-------------|----------|
| **Strategic** | Leadership/Owner | Vision, major investments, partnerships |
| **Tactical** | Manager/Lead | Resource allocation, priorities, timelines |
| **Operational** | Individual/Team | Implementation details, day-to-day choices |

**Principle**: Push decisions to the lowest level with sufficient context.

## Consensus Models

### Consent vs Consensus

| Model | Definition | Use When |
|-------|------------|----------|
| **Consensus** | Everyone agrees it's the best option | High-stakes, time available, alignment critical |
| **Consent** | No one has a fundamental objection | Good enough, move forward, iterate later |

**Consent question**: "Can you live with this decision?" (not "Is this your first choice?")

### Fist of Five (Quick Consensus Check)

| Fingers | Meaning |
|---------|---------|
| 5 | "Fully support, will champion" |
| 4 | "Support, good decision" |
| 3 | "Can live with it" |
| 2 | "Have concerns, need discussion" |
| 1 | "Cannot support, blocks proceeding" |

**Rule**: If anyone shows 1-2, discuss concerns before proceeding.

### Disagree and Commit

When consensus fails but a decision is needed:

1. **Discuss** — Hear all perspectives, ensure everyone feels heard
2. **Decide** — The Decider (D in DACI) makes the call
3. **Commit** — Everyone executes as if they agreed, regardless of their vote
4. **Review** — Set a checkpoint to evaluate the decision

> "Have backbone; disagree and commit. Leaders are obligated to challenge decisions respectfully... Once a decision is determined, they commit wholly." — Amazon Leadership Principle

## Decision Documentation

### Decision Record Template

```markdown
## Decision: [Title]

**Date**: [Date]
**Status**: [Proposed/Decided/Superseded]
**Decider**: [Name]

### Context
[Why this decision is needed]

### Options Considered
1. [Option A] — [Brief description]
2. [Option B] — [Brief description]
3. [Option C] — [Brief description]

### Decision
[Which option was chosen]

### Rationale
[Why this option was selected]

### Trade-offs Accepted
[What we're giving up]

### Would Revisit If
[Conditions that would change this decision]
```

## Anti-Patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| Decision by committee | No one accountable | Assign single Decider |
| HIPPO (Highest Paid Person's Opinion) | Rank overrides reasoning | Use structured evaluation |
| Analysis paralysis | Over-researching reversible decisions | Time-box, decide, iterate |
| Undocumented decisions | "Why did we do this?" later | Write decision records |
| Revisiting settled decisions | Wasted time, frustration | "Disagree and commit" + review checkpoint |
| Vague escalation | "Let's run it up the chain" | Specify WHO decides WHAT |
