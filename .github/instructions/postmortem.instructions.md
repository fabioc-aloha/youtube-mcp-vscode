---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Postmortem writing — structured incident analysis for root cause and prevention"
application: "After failures, incidents, or mistakes that reveal novel failure modes"
applyTo: "**/*postmortem*,**/*incident*,**/*failure*,**/*retro*"
currency: 2026-04-27
---

# Postmortem Writing

Structured analysis of failures to prevent recurrence. Not blame — learning.

## When to Write a Postmortem

- Incident escaped to users
- Significant time lost to a preventable failure
- Novel failure mode discovered
- Near-miss that reveals systemic risk

**Don't write one for:** routine bugs, known issues, or failures that don't teach anything new.

## Template Structure

### 1. Summary
One paragraph: What happened? When? What was the impact?

### 2. Impact
- Who was affected?
- Duration of impact
- Severity level (critical/high/medium/low)

### 3. Timeline
Chronological events from first signal to resolution:

| Time | Event |
|------|-------|
| 14:32 | Alert fired |
| 14:45 | Root cause identified |
| 15:10 | Fix deployed |

### 4. Root Cause
**Technical cause chain**, not "human error."

Bad: "Developer forgot to test edge case"
Good: "No automated test covered this code path; manual testing doesn't scale"

### 5. Contributing Factors
What made detection or resolution slower?
- Missing monitoring?
- Unclear ownership?
- Documentation gaps?

### 6. Action Items

| Action | Owner | Deadline | Priority |
|--------|-------|----------|----------|
| Add automated test | @name | 2026-05-01 | High |
| Update runbook | @name | 2026-05-05 | Medium |

Every action needs an owner and deadline. No orphan actions.

### 7. Lessons Learned
- What worked well?
- What didn't?
- What was lucky (caught by chance)?

## Key Rules

| Rule | Reason |
|------|--------|
| **Blameless** | Focus on systems, not individuals |
| **Root cause = design flaw** | "Someone made a mistake" isn't root cause |
| **Actions have owners** | Unowned actions don't happen |
| **Share widely** | Others learn from your failures |

## The 5 Whys

Keep asking "Why?" until you reach a systemic cause:

1. Why did the deployment fail? → Config was wrong
2. Why was config wrong? → Manual edit error
3. Why was it manual? → No automation
4. Why no automation? → Not prioritized
5. Why not prioritized? → **No process to review deployment risk**

Root cause: Missing deployment risk review process (not "human error").
