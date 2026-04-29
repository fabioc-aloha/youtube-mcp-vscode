---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Risk identification, assessment, and mitigation — supports ACT Tenet VI (Materiality Gating)"
application: "When assessing risks, planning mitigations, or deciding where to invest rigor"
applyTo: "**/*risk*,**/*plan*,**/*assess*"
currency: 2026-04-27
---

# Risk Analysis

> **ACT Tenet VI**: Match rigor to stakes. Reversible decisions deserve speed; irreversible ones deserve doubt.

This instruction provides methods for **assessing stakes** so you can calibrate rigor appropriately.

## When to Use

| Trigger | Action |
|---------|--------|
| Starting a new initiative | Identify risks upfront |
| Making a significant decision | Assess what could go wrong |
| "What's the worst that could happen?" | Structured risk assessment |
| Feeling uncertain about stakes | Quantify probability and impact |

## Risk Categories (Cross-Domain)

| Category | Examples |
|----------|----------|
| **Execution** | Can we actually do this? Skills, time, complexity |
| **External** | Dependencies we don't control — vendors, markets, regulations |
| **Resource** | People, money, time availability |
| **Scope** | Requirements changing, feature creep, unclear goals |
| **Stakeholder** | Alignment, buy-in, competing priorities |
| **Technical** | Will the approach work? Integration, performance, scalability |
| **Timeline** | Dependencies, estimates, external deadlines |

## Risk Assessment Matrix

| | Low Impact | Medium Impact | High Impact |
|---|-----------|---------------|-------------|
| **High Likelihood** | Monitor | Mitigate | 🔴 Mitigate immediately |
| **Medium Likelihood** | Accept | Monitor | Mitigate |
| **Low Likelihood** | Accept | Accept | Monitor |

### Likelihood Definitions

| Level | Probability | Description |
|-------|-------------|-------------|
| High | >60% | Expected to happen |
| Medium | 20-60% | Could go either way |
| Low | <20% | Unlikely but possible |

### Impact Definitions

| Level | Description |
|-------|-------------|
| High | Project failure, major loss, irreversible damage |
| Medium | Significant delay, cost overrun, quality degradation |
| Low | Minor inconvenience, easily recoverable |

## Risk Response Strategies

| Strategy | When to Use | Example |
|----------|-------------|---------|
| **Avoid** | Change plan to eliminate risk | Don't use untested technology |
| **Mitigate** | Reduce probability or impact | Add testing, create fallback plan |
| **Transfer** | Shift to another party | Insurance, SLAs, contracts |
| **Accept** | Risk is within tolerance | Document and monitor |

## Risk Register Template

```markdown
## Risk Register: [Project/Decision]

| ID | Risk | Category | Likelihood | Impact | Score | Response | Owner |
|----|------|----------|------------|--------|-------|----------|-------|
| R1 | [Description] | [Cat] | H/M/L | H/M/L | [L×I] | [Strategy] | [Who] |
| R2 | [Description] | [Cat] | H/M/L | H/M/L | [L×I] | [Strategy] | [Who] |
```

## Pre-Mortem Technique

Before starting, imagine the project has failed. Ask: **"What went wrong?"**

| Pre-Mortem Question | Reveals |
|---------------------|---------|
| "It's 6 months later and this failed. Why?" | Hidden assumptions |
| "What did we miss that should have been obvious?" | Blind spots |
| "What did we know but ignore?" | Willful blindness |
| "What external event killed it?" | Dependency risks |

**Benefit**: Surfaces risks that optimism bias hides.

## Connecting to Materiality Gate (ACT Tenet VI)

| Risk Level | ACT Pass Intensity | Rationale |
|------------|-------------------|-----------|
| High (irreversible, high-impact) | Full 7-step pass | Cost of being wrong is high |
| Medium (significant but recoverable) | Trimmed pass (steps 1, 3, 5, 6) | Moderate scrutiny |
| Low (easily reversible, low-impact) | Skip pass | Move fast, correct later |

## Anti-Patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| No risk assessment | Blindsided by predictable problems | Identify risks at kickoff |
| All risks "medium" | No prioritization possible | Force ranking, compare to past |
| Risk theatre | Document risks, never act on them | Assign owners and deadlines |
| Over-mitigation | Spending more than the risk is worth | Cost of mitigation < expected loss |
| Ignoring low-probability/high-impact | Black swans happen | Monitor, have contingency |
