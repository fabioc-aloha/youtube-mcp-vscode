---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Structured comparison of options on multiple dimensions — weighted scoring, decision matrices, and explicit trade-offs"
application: "When choosing between options, making decisions, or explaining trade-offs — supports ACT Tenets III and VI"
applyTo: "**"
currency: 2026-04-27
---

# Trade-off Analysis

> **ACT Tenet III**: Multiple working hypotheses require comparison.
> **ACT Tenet VI**: Materiality gating requires understanding what matters.

This instruction provides methods for **comparing** options once you've generated them.

## When to Use

| Trigger | Action |
|---------|--------|
| Multiple options exist | Compare them explicitly |
| Stakeholders disagree | Make criteria and weights visible |
| "It depends" temptation | Specify WHAT it depends on |
| High-stakes choice | Document reasoning for future audit |

## Trade-off Analysis Methods

### 1. Decision Matrix (Weighted Scoring)

For comparing 3+ options on multiple criteria:

```markdown
## Decision: [What you're deciding]

| Criteria | Weight | Option A | Option B | Option C |
|----------|--------|----------|----------|----------|
| [Criterion 1] | 30% | 8 | 6 | 9 |
| [Criterion 2] | 25% | 7 | 9 | 5 |
| [Criterion 3] | 25% | 6 | 7 | 8 |
| [Criterion 4] | 20% | 9 | 5 | 6 |
| **Weighted Total** | 100% | **7.4** | **6.8** | **7.1** |

**Winner**: Option A (7.4)
**Close second**: Option C (7.1)
```

**Rules**:
- Weights must sum to 100%
- Scores 1-10 (or 1-5 for simpler decisions)
- Criteria should be independent (not double-counting)
- Make weights explicit BEFORE scoring options

### 2. Pros/Cons with Severity

When quantitative scoring feels forced:

| Option | Pro | Severity | Con | Severity |
|--------|-----|----------|-----|----------|
| A | Fast to implement | High | Limited flexibility | Medium |
| A | Low cost | Medium | Technical debt | High |
| B | Very flexible | High | Complex to build | High |
| B | Future-proof | Medium | Slower time-to-value | Medium |

**Severity key**: High = deal-maker/breaker, Medium = significant, Low = nice-to-have

### 3. 2x2 Matrix (Two Key Dimensions)

When two criteria dominate:

```
                    High [Dimension 2]
                          │
         Quadrant II      │      Quadrant I
         (Risky bets)     │      (Sweet spot)
                          │
    ──────────────────────┼────────────────────
                          │
         Quadrant III     │      Quadrant IV
         (Avoid)          │      (Quick wins)
                          │
                    Low [Dimension 2]
    
    Low [Dimension 1]                High [Dimension 1]
```

**Common 2x2s**:
- Impact vs Effort (prioritization)
- Urgency vs Importance (Eisenhower)
- Risk vs Reward (investment)
- Certainty vs Impact (planning)

### 4. Reversibility Test

For risk-calibrated decisions:

| Decision Type | Approach | Example |
|---------------|----------|---------|
| **Reversible** (Type 2) | Decide fast, correct later | Feature flag, A/B test, pilot |
| **Irreversible** (Type 1) | Decide carefully, full analysis | Architecture, contracts, public commitments |

> "Most decisions should be made with around 70% of the information you wish you had." — Jeff Bezos

### 5. Regret Minimization

For high-stakes personal/strategic decisions:

> "Project yourself to age 80. Which choice minimizes regret?"

| Option | Regret if chosen & fails | Regret if NOT chosen & would have worked |
|--------|--------------------------|------------------------------------------|
| A | "I tried, learned, moved on" | "I'll always wonder what if..." |
| B | "At least I was safe" | "I played it too safe" |

## Making Trade-offs Visible

### The Trade-off Statement

Every recommendation should include:

```markdown
**Trade-off**: We're accepting [downside] in exchange for [upside].
**Why this trade-off**: [Rationale tied to priorities/constraints]
**Would reconsider if**: [What would change the calculus]
```

### Explicit "Depends On" Statements

When "it depends" is genuinely true, specify the dependency:

| If... | Then choose... | Because... |
|-------|----------------|------------|
| Budget is constrained | Option A | Lowest cost |
| Time is constrained | Option B | Fastest delivery |
| Quality is paramount | Option C | Highest reliability |

## Anti-Patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| Hidden trade-offs | Stakeholders surprised later | Make all trade-offs explicit upfront |
| Unweighted criteria | All factors treated equal | Assign weights before scoring |
| Post-hoc rationalization | Reasoning invented after decision | Document criteria before evaluating |
| False precision | 7.42 vs 7.38 is meaningless | Round scores, acknowledge uncertainty |
| Ignoring reversibility | Over-analyzing reversible decisions | Type 2 decisions: faster is better |
