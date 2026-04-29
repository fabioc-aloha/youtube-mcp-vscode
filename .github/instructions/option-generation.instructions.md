---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Structured methods for generating multiple options — SCAMPER, MECE, How Might We, and lateral thinking"
application: "When you need alternatives, options, or creative solutions — supports ACT Tenet III (Multiple Working Hypotheses)"
applyTo: "**"
currency: 2026-04-27
---

# Option Generation

> **ACT Tenet III**: Never test a hypothesis against the null. Always against at least one rival.

This instruction provides **methods** for generating those rivals. Saying "consider alternatives" isn't enough — you need structured techniques.

## When to Use

| Trigger | Action |
|---------|--------|
| About to commit to a solution | Generate 2-3 alternatives first |
| User says "how should I..." | Present options, not a single answer |
| Stuck on a problem | Use divergent techniques to unstick |
| High-stakes decision | More options = better calibration |

## Option Generation Methods

### 1. SCAMPER (For Improving Existing Solutions)

Apply each lens to the current approach:

| Lens | Question | Example |
|------|----------|---------|
| **S**ubstitute | What can be replaced? | Different tool, vendor, person, material |
| **C**ombine | What can be merged? | Two steps into one, teams, features |
| **A**dapt | What can be borrowed? | How does another industry solve this? |
| **M**odify | What can be changed? | Size, shape, frequency, intensity |
| **P**ut to other uses | What else could this do? | Repurpose, new market, side benefit |
| **E**liminate | What can be removed? | Steps, features, dependencies |
| **R**everse | What if we flip it? | Order, roles, assumptions |

### 2. MECE (For Structuring Option Space)

**M**utually **E**xclusive, **C**ollectively **E**xhaustive — ensure you've covered all options without overlap.

| Dimension | Example Splits |
|-----------|----------------|
| **Build vs Buy** | Create ourselves OR purchase/license |
| **Fast vs Thorough** | Quick-and-dirty OR comprehensive |
| **Centralized vs Distributed** | One place OR many places |
| **Push vs Pull** | We initiate OR they request |
| **Automated vs Manual** | System does it OR human does it |

**Test**: Can every possible option fit into exactly one category?

### 3. How Might We (HMW)

Reframe constraints as opportunities:

| Constraint | HMW Reframe |
|------------|-------------|
| "We don't have budget" | HMW achieve the goal with zero budget? |
| "It takes too long" | HMW deliver value in 1/10th the time? |
| "Users won't adopt it" | HMW make adoption effortless? |
| "It's technically impossible" | HMW work around the technical limit? |

### 4. Inversion (Jacobi's Method)

> "Invert, always invert." — Charlie Munger

Instead of "How do we succeed?", ask "How would we guarantee failure?" Then avoid those things.

| Goal | Inverted Question | Insights |
|------|-------------------|----------|
| Successful product launch | How would we guarantee a failed launch? | Reveals hidden assumptions |
| Happy customers | How would we guarantee angry customers? | Surfaces neglected risks |
| On-time delivery | How would we guarantee we miss the deadline? | Identifies real blockers |

### 5. Lateral Thinking Triggers

When stuck, use random stimuli to break fixation:

| Technique | Application |
|-----------|-------------|
| **Random word** | Pick a random noun; force a connection to your problem |
| **Analogy** | "How would [doctor/architect/chef] solve this?" |
| **Constraint removal** | "What if we had unlimited [time/money/people]?" |
| **Extreme parameters** | "What if the deadline was tomorrow? Next year?" |

## Output Format

When generating options, present them in comparable form:

```markdown
## Options for [Decision]

| Option | Description | Pros | Cons | Effort |
|--------|-------------|------|------|--------|
| A | [What it is] | [Benefits] | [Drawbacks] | [Est.] |
| B | [What it is] | [Benefits] | [Drawbacks] | [Est.] |
| C | [What it is] | [Benefits] | [Drawbacks] | [Est.] |

**Recommendation**: [Which and why]
**Would revise if**: [What evidence would change this]
```

## Anti-Patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| Single option presented | No comparison possible | Generate 2+ options always |
| Options that aren't real | Strawman alternatives | Each option must be genuinely viable |
| Analysis paralysis | Too many options | Limit to 3-5 meaningfully different options |
| Anchoring on first idea | Confirmation bias | Generate options BEFORE evaluating any |
