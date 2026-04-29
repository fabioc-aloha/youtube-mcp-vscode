---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Vibe Diagnostics — detect when intuition replaces criteria in evaluating AI output"
application: "When reviewing AI output, assessing workflow quality, or suspecting over-reliance"
applyTo: "**/*"
currency: 2026-04-27
---

# Vibe Diagnostics

Vibe coding: evaluating AI output by intuition rather than criteria. The feeling becomes the entire quality gate.

**Vibe coding is not using AI** — that's a tool choice.
**Vibe coding is a verification choice** — accepting output because it "feels right."

## The Five Diagnostics

If three or more come back positive, you're vibe coding.

### Diagnostic 1: Ambiguity Burden

**Test**: Could you turn your last prompt into a test?

| Answer | Status |
|--------|--------|
| "Yes, success means X passes Y criteria" | ✅ Criteria-driven |
| "I'd have to think about what correct even means" | ⚠️ Holding full ambiguity |

If you can't define "correct," you're evaluating by vibe.

### Diagnostic 2: Evidence Chain

**Test**: Is there an oracle that distinguishes correct from incorrect?

| Oracle Type | Quality |
|-------------|---------|
| Unit test, schema validator, acceptance checklist | ✅ Objective |
| Visual spec with measurable criteria | ✅ Objective |
| "I'll know it when I see it" | ⚠️ That's not an oracle |

No oracle = vibe territory.

### Diagnostic 3: The Telemetry Trio

Track three numbers:

| Metric | Meaning | Warning |
|--------|---------|---------|
| **Edit distance ratio** | % of AI output surviving to final | <0.50 = rough-draft machine; >0.95 = no real editing |
| **Verification prompts/session** | Times you asked AI to check/validate itself | 0 = vibe pattern |
| **Time-to-acceptance** | Time between receiving and accepting | <30 sec for complex = insufficient review |

**Classic vibe pattern**: Low edit distance + zero verification prompts + short acceptance time.

### Diagnostic 4: Repair Loop Maturity

**Test**: When output is wrong, what happens?

| Response | Status |
|----------|--------|
| Clarify misunderstanding → Summarize correction → Act on revised plan → Reflect | ✅ CSAR repair loop |
| Rephrase prompt, hope next output is better | ⚠️ Prompt roulette |

Prompt roulette discards information. Repair loops generate it.

### Diagnostic 5: Over-Reliance Signals

Watch for these patterns:

| Signal | Description |
|--------|-------------|
| **Agreement without review** | Accepted in < 1 min for a 20-min task |
| **Confidence without evidence** | AI expressed certainty, you didn't question it |
| **Style over substance** | Well-formatted + fluent = trusted, regardless of accuracy |

## Vibe Patterns to Flag

### Prompt Roulette

Rerolling outputs without analyzing why the previous attempt failed. Each regeneration is independent. No information transfers.

**Implicit belief**: The model is a slot machine — pull enough times and the right answer appears.

### Narrate, Don't Measure

Detailed prompts with no success criteria:

| Narration | Measurement |
|-----------|-------------|
| "Handle edge cases gracefully" | "Return -1 for empty, throw for null, log warning for >10K items" |
| "Write a good summary" | "≤200 words, includes key metrics, cites source" |

### Template Cargo Cult

Copying prompt templates without understanding why they work. If you can't explain what each component does and when to omit it, it's cargo.

## When Vibe Is OK

| Context | Vibe Appropriate? |
|---------|------------------|
| Brainstorming | ✅ Generating possibilities, not selecting best |
| Low-stakes exploration | ✅ Weekend project, prototype to be rewritten |
| Creative generation | ✅ Aesthetic judgment is the criterion |
| Production work | ❌ Criteria must take over |
| High-stakes decisions | ❌ Never |

**Danger zone**: Vibe migrating from exploration to production without anyone noticing.

## The Vibe-to-Dialog Continuum

```
Pure Vibe → Instrumented Vibe → Structured Dialog → Full Partnership
```

| Stage | Characteristics |
|-------|-----------------|
| **Pure Vibe** | No criteria, no verification |
| **Instrumented Vibe** | Metrics tracked, no repair loops |
| **Structured Dialog** | CSAR active, criteria defined |
| **Full Partnership** | Governance, telemetry, drills |

## Self-Assessment

Run these diagnostics on your last AI-assisted task:

1. ☐ Could I define success criteria before starting?
2. ☐ Did I have an oracle (test, checklist, spec)?
3. ☐ Did I ask the AI to verify/check anything?
4. ☐ When something was wrong, did I diagnose or just retry?
5. ☐ Did I accept because it looked professional, or because I verified it was correct?

**Scoring**: 0-1 checks = vibe coding; 2-3 = instrumented vibe; 4-5 = structured dialog

## Reference

*The Verification Habit*, Chapters 12, 13: Vibe Coding Diagnostics
