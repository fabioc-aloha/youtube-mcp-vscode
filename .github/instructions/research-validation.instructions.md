---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "Research validation — verify assumptions against authoritative sources before implementing; LLM knowledge is almost always outdated"
application: "Before implementing any API, library, framework, or technology-dependent solution"
applyTo: "**/*api*,**/*integrat*,**/*implement*,**/*build*"
currency: 2026-04-30
lastReviewed: 2026-04-30
---

# Research Validation

**Core truth**: LLM knowledge is almost always outdated. Technology changes faster than training data.

Before implementing anything technology-dependent, validate against authoritative sources.

## The Problem

| What I Think I Know | Reality |
|---------------------|---------|
| API endpoint `/v1/users` | Deprecated in v2, now `/v2/accounts` |
| Library function `doThing()` | Renamed to `performAction()` in 3.0 |
| Framework pattern X | Anti-pattern since version 4.0 |
| Default config value | Changed in latest release |
| Authentication flow | New OAuth scopes required |

**Training data cutoff means**:

- Breaking changes after cutoff are invisible to me
- Deprecations aren't flagged
- New best practices aren't known
- Security fixes aren't reflected

## Validation Protocol

Before implementing, check authoritative sources:

### 1. Official Documentation

| Source Type | What to Check |
|-------------|---------------|
| API reference | Endpoint URLs, parameters, auth requirements |
| SDK docs | Method signatures, return types, error handling |
| Migration guides | Breaking changes, deprecations, upgrade paths |
| Changelog | Recent releases, what changed |

### 2. Source of Truth Priority

| Priority | Source | Trust Level |
|----------|--------|-------------|
| 1 | Official docs (current version) | Authoritative |
| 2 | Official GitHub repo / source code | Ground truth |
| 3 | Official blog / release notes | Context for changes |
| 4 | Stack Overflow (recent, high-voted) | Community-validated |
| 5 | My training data | **Verify before using** |

### 3. Version Pinning

Always specify and verify versions:

```markdown
## Validated Against
- API: Stripe API v2024-12-18
- SDK: stripe-python 7.0.0
- Docs: https://stripe.com/docs (accessed 2026-04-27)
```

## When to Validate

| Trigger | Action |
|---------|--------|
| Implementing new API integration | Full validation |
| Using library method I haven't used recently | Check current signature |
| Framework configuration | Verify against current defaults |
| Security-related code | Always validate — this changes fast |
| User says "the docs say..." | Read the docs yourself |
| Error message doesn't match expectation | Docs may have changed |

## Validation Checklist

Before writing implementation code:

- [ ] Identified the official documentation URL
- [ ] Checked the current API version
- [ ] Verified endpoint/method signatures
- [ ] Noted any deprecation warnings
- [ ] Confirmed authentication requirements
- [ ] Checked rate limits and quotas
- [ ] Read error response formats

## Red Flags

Stop and validate when you notice:

| Signal | Meaning |
|--------|---------|
| "I think the API is..." | Uncertainty = validate |
| "Usually you would..." | Generalizing = validate |
| "Last time I saw..." | Stale knowledge = validate |
| 401/403/404 on first try | Something changed = validate |
| "Deprecated" warning in response | Migration needed = validate |

## Integration with ACT

Research validation is ACT applied to technology knowledge:

| ACT Tenet | Application |
|-----------|-------------|
| **II. Evidence Grounding** | Claims must trace to current docs, not training data |
| **III. Confidence Calibration** | Lower confidence on anything >6 months from training |
| **IV. System-Prompt Skepticism** | My own knowledge is a hypothesis to test |
| **V. Falsifiability** | Docs either confirm or refute — testable |

## Example

**Bad**: "The OpenAI API uses `model: 'gpt-4'` parameter..."

**Good**: "Let me check the current OpenAI API docs for the model parameter format... [reads docs] ... The current API (v1, as of April 2026) uses `model: 'gpt-4-turbo'` with these parameters: ..."

## Remember

> **I don't know what I don't know about recent changes.**
>
> Every technology claim I make should be verified against authoritative sources before implementation.
