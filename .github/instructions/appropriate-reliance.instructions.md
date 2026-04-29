---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Appropriate Reliance — trust calibrated to demonstrated reliability, neither over- nor under-relying"
application: "When evaluating AI output, deciding verification depth, or calibrating trust"
applyTo: "**/*"
currency: 2026-04-27
---

# Appropriate Reliance

Trust AI output in proportion to demonstrated reliability — neither more nor less.

**Over-reliance**: Accepting output without adequate review → errors the human could have caught.
**Under-reliance**: Checking everything exhaustively → wasted time that negates AI's value.

The right balance varies by task, domain, and partnership maturity.

## The Three Questions

Before accepting AI output, ask:

### 1. What Is the Cost of an Error?

| Error Cost | Scrutiny Level |
|------------|----------------|
| Typo in internal doc | Low — quick scan |
| Security vulnerability in production | High — line-by-line review |
| Medical/legal/financial impact | Maximum — expert verification |

### 2. What Is the Track Record?

| History | Trust Level |
|---------|-------------|
| Correct output 10+ times for this task type | Warranted |
| Never tested this task type | Not established |
| Recent failures in this domain | Skeptical |

### 3. Can I Verify Quickly?

| Verification Time | Recommendation |
|-------------------|----------------|
| < 30 seconds (run tests, check link) | Verify every time |
| > 10 minutes (reproduce research, audit architecture) | Selective based on cost + track record |

## The Reliance Matrix

| | Fast Verification | Slow Verification |
|---|---|---|
| **Low Cost + Good Track Record** | Trust the output | Spot-check periodically |
| **High Cost + Poor Track Record** | Verify every time | Review everything — or don't use AI |

## Practice Telemetry

Track these numbers to detect calibration drift:

| Metric | Healthy Range | Warning Sign |
|--------|---------------|--------------|
| **Edit distance ratio** | 0.50–0.85 | Persistent <0.50 (AI misaligned) or >0.95 (no real review) |
| **Verification prompts/session** | ≥1 for complex tasks | Zero for weeks (automation complacency) |
| **Time-to-acceptance** | 30 sec – 5 min | <10 sec for complex tasks (insufficient review) |
| **Repair count** | Varies | Rising count without process improvement |

## The Compounding Triad

Three biases reinforce over-reliance:

```
Automation Bias → Anchoring → Confirmation Bias → (back to Automation Bias)
```

1. **Automation bias**: Accept without verifying (Parasuraman & Manzey, 2010)
2. **Anchoring**: AI's suggestion dominates solution space (Tversky & Kahneman, 1974)
3. **Confirmation bias**: Notice successes, discount failures (Nickerson, 1998)

**No natural correction mechanism exists.** You must build one through deliberate practice.

## Cognitive Forcing Functions

Interrupt the bias cycle with these interventions:

### Prediction Before Reveal

Before seeing AI output, write one sentence predicting what you expect:
> "I expect a recursive solution with memoization."

Compare prediction to output. Divergence triggers investigation.

### Evidence Requirement

Before accepting, identify one specific piece of evidence confirming correctness:
> "The function handles null at line 12."
> "The SQL includes the tenant_id filter."

### Restatement Before Action

Before acting on output, restate in your own words what it does — not what the AI said it does.

## When to Double-Check (Always)

1. **Novel claims** — If the AI states a fact you haven't verified, check it
2. **Irreversible actions** — Deployment, deletion, publication, sending messages
3. **Edge cases** — Unusual inputs, rare scenarios, unusual combinations
4. **High confidence without evidence** — Confidence without citation is a warning
5. **Emotional/ethical stakes** — Affects people → human must review
6. **Contradictions with prior context** — May be lost context, hallucination, or real change

## Psychological Hygiene

Maintain appropriate reliance through recurring practices:

| Practice | Frequency | Purpose |
|----------|-----------|---------|
| Self-check: "What did I accept without verifying?" | Weekly | Awareness |
| Skill exercise: Complete one task without AI | Monthly | Maintain independence |
| Confidence journaling: Note confidence vs. outcome | Ongoing | Calibration patterns |

## Reference

*The Verification Habit*, Chapters 8, 9, 18, 20
