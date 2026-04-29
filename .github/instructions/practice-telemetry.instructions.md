---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Practice Telemetry — measure what matters: review quality, verification habits, error detection"
application: "When assessing AI partnership health, team calibration, or individual reliance patterns"
applyTo: "**/*"
currency: 2026-04-27
---

# Practice Telemetry

Measure practice, not activity. Token counts and usage hours tell you how much AI is used. Practice metrics tell you how well.

## The Five Portfolio Metrics

### Metric 1: Edit Distance Ratio

The fraction of AI-generated content that survives human review.

| Distribution Shape | Interpretation |
|-------------------|----------------|
| Tight cluster 0.75–0.85 | Healthy review — keeping most, consistently editing |
| Bimodal (0.99 and 0.40) | Two behaviors hiding as one: rubber-stamping + rewriting from scratch |
| Persistent >0.95 | **Alert**: Team may be accepting without review |

**Alert threshold**: Team average >0.95 for two consecutive periods.

### Metric 2: Verification Prompt Frequency

How often you ask AI "why?" or "what are the risks?"

| Volume | Rate | Interpretation |
|--------|------|----------------|
| High (100+ interactions) | <5% | **Alert**: High volume, low questioning → automation bias risk |
| Low (<50 interactions) | Any | Insufficient volume for meaningful rate |

**Alert threshold**: Rate <5% with 100+ interactions/period.

### Metric 3: Time-to-Acceptance Trend

The elapsed time between AI output and human approval.

| Trend | Interpretation |
|-------|----------------|
| Stable | Normal operation |
| Gradually decreasing + edit ratio increasing | **Alert**: Reviewing less carefully, not working faster |
| Rapidly decreasing (>20%/month) | Investigate — efficiency gain or rigor decline? |

**Alert threshold**: Time declining >20% over 4 weeks while edit distance ratio rising.

### Metric 4: Repair Loop Adoption

What percentage of AI-related errors flow through a documented repair process vs. ad hoc fixes?

| Adoption Rate | Interpretation |
|---------------|----------------|
| >80% | Healthy — learning from errors |
| 60–80% | Acceptable — room for improvement |
| <60% | **Alert**: Firefighting mode — fixing instances, not patterns |

**Ad hoc fix**: Correct and move on.
**Repair loop**: Correct, document root cause, update constraints to prevent recurrence.

### Metric 5: Reliance Drill Pass Rate

The percentage of seeded errors caught in the most recent calibration exercise.

| Pass Rate | Interpretation |
|-----------|----------------|
| >70% | Team catches most deliberate errors |
| 50–70% | Moderate detection — room for improvement |
| <50% | **Alert**: Team misses more seeded errors than it catches |

If seeded errors pass through at >50%, uncontrolled errors likely pass at a higher rate.

## Activity vs. Practice

| Activity Metric (don't rely on) | Practice Metric (use these) |
|--------------------------------|----------------------------|
| Tokens consumed | Edit distance ratio |
| Queries per day | Verification prompt frequency |
| Cost per sprint | Time-to-acceptance trend |
| Hours of AI usage | Repair loop adoption |
| Sessions per week | Reliance drill pass rate |

**Activity** tells you how much AI is used.
**Practice** tells you whether the use is calibrated.

## Leading vs. Lagging Indicators

| Type | Example | What It Shows |
|------|---------|---------------|
| **Lagging** | Incident count | What already went wrong |
| **Leading** | Declining verification rate over 4 periods | Automation bias forming — intervene now |
| **Leading** | Time-to-acceptance dropping + edit ratio rising | Review rigor declining |
| **Leading** | Drill pass rate falling | Detection capability eroding |

## The Aggregation Principle

Individual session metrics hide patterns that portfolio metrics reveal:

| Level | What You See | What You Miss |
|-------|--------------|---------------|
| Session | Edit ratio = 0.98 | Could be careful review or rubber-stamping |
| Portfolio | 0.98 across all tasks for 3 periods | Systematic pattern — investigate |

## Implementation

You don't need sophisticated tooling:

1. **Weekly self-check**: "What did I accept without verifying this week?"
2. **Monthly skill exercise**: One task completed without AI assistance
3. **Quarterly drill**: Seed one plausible error, track detection
4. **Simple log**: Task type, edit ratio estimate, verification prompts (Y/N), outcome

> **The dashboard that matters fits on one page. Five metrics, five signals, one question: Is the partnership calibrated?**

## Reference

Adapted from *The Verification Habit* (Correa, 2026), Chapter 19: Tooling and Observability.
