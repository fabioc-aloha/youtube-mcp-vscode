---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Cognitive Forcing Functions — deliberate friction that activates analytical thinking before accepting AI output"
application: "Before accepting AI suggestions, when calibrating verification habits, or countering automation bias"
applyTo: "**/*"
currency: 2026-04-27
---

# Cognitive Forcing Functions

Deliberate interventions that require effortful thinking before accepting automated recommendations.

**The problem**: Automation bias operates below conscious awareness. The brain conserves energy by reducing attention to reliable-seeming output.

**The solution**: Structured friction that activates analytical thinking without adding significant time cost.

## The Three Forcing Functions

### 1. Prediction Before Reveal

Before seeing AI's suggestion, write what you expect.

**Process**:
1. Read the problem/task
2. Write one sentence predicting the AI's approach: *"I expect the AI will suggest a recursive solution with memoization."*
3. Then view the AI's output
4. Compare prediction to output

| Match? | Action |
|--------|--------|
| Prediction matches output | Confidence calibration: your mental model is accurate |
| Prediction differs | **Stop and investigate**: Why the divergence? Is yours or AI's better? |

**Overhead**: 10–30 seconds per interaction.
**Payoff**: Forces you to activate your own understanding before evaluating someone else's.

### 2. Evidence Requirement

Before accepting output, identify one specific piece of confirming evidence.

**Not this**: "It looks correct."
**This**: "The function handles the null case at line 12."

| Domain | Evidence Examples |
|--------|-------------------|
| Code | "The WHERE clause filters by tenant_id" |
| Documentation | "The citation references the 2024 paper, not the preprint" |
| Analysis | "The calculation uses the correct denominator from row 7" |
| Architecture | "The async call has proper error handling at line 34" |

**The rule**: If you cannot name one specific, verifiable fact that confirms correctness, you have not verified.

### 3. Restatement Before Action

Before acting on AI output (merge, publish, deploy), restate what it does in your own words.

**Not this**: Repeat AI's description.
**This**: Read the output and explain what you believe it does.

| AI Says | You Restate |
|---------|-------------|
| "This function optimizes database queries" | "This adds an index on user_id and changes the JOIN order" |
| "This documentation clarifies the API" | "This adds three new parameters and deprecates the v1 endpoint" |

**Why it works**: Restatement forces comprehension. Passive reading permits automation bias. Active restatement reveals misunderstandings.

## When to Apply Each Function

| Situation | Recommended Function |
|-----------|---------------------|
| First time using AI for this task type | All three |
| Routine task with good track record | Evidence requirement only |
| High-stakes output (production, customer-facing) | All three |
| Noticed declining verification habits | Prediction before reveal for 1 week |
| After catching a surprising AI error | Restatement for similar tasks |

## Psychological Hygiene Practices

Forcing functions address individual interactions. Hygiene practices maintain calibration over time.

### Weekly Self-Check

One question: **"What did I accept from AI this week without verifying?"**

| Answer | Interpretation |
|--------|----------------|
| "Several things, probably fine" | Normal — stay aware |
| "I cannot remember the last time I verified" | **Alert**: Automation complacency has set in |

### Monthly Skill Exercise

One task per month, completed without AI assistance. Not trivial tasks — the tasks AI usually handles.

| Exercise Type | Purpose |
|---------------|---------|
| Debug with just logs and debugger | Maintain independent reasoning |
| Code review without AI summaries | Preserve human judgment |
| Documentation from blank page | Keep synthesis skills active |

**Expectation**: First exercise takes longer. Subsequent exercises improve. The skill has not disappeared — it has deconditioned. Exercises recondition it.

### Confidence Journaling

Before accepting output, note:
- Confidence level (high/medium/low)
- One reason for that rating

After outcome is known, compare confidence to result.

| Pattern Over Time | Interpretation |
|-------------------|----------------|
| Calibrated: high confidence → correct, low confidence → errors | Good self-awareness |
| Overconfident: high confidence → frequent errors | Increase scrutiny on "confident" assessments |
| Underconfident: low confidence → usually correct | Trust yourself more |

## The Overhead Objection

**"These add friction. Friction slows me down."**

Total time cost: 1–2 minutes per complex interaction.

| Without Forcing Functions | With Forcing Functions |
|--------------------------|----------------------|
| Fast acceptance | Slightly slower acceptance |
| Undetected errors ship | Errors caught earlier |
| Debug time later | Prevention time now |
| Skill atrophy over months | Capability maintained |

**The real question**: Is 2 minutes of verification worth avoiding 2 hours of debugging?

## The Goal

Forcing functions are scaffolding, not permanent overhead.

**Short-term**: Add friction to interrupt automatic acceptance.
**Long-term**: Train calibrated intuition that fires automatically.

A practitioner who has used forcing functions for 6 months develops instincts about when to scrutinize. The explicit steps become implicit habits. The scaffolding can reduce.

> **The forcing function's job is to buy time for your analytical brain to catch up with your automatic brain.**

## Reference

Adapted from Buçinca, Malaya, and Gajos (2021), "To Trust or to Think," and *The Verification Habit* (Correa, 2026), Chapter 20: Over-Reliance Psychology.
