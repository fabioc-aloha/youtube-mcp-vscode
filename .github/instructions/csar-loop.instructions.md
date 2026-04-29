---
type: instruction
lifecycle: stable
inheritance: inheritable
description: "CSAR Loop protocol — Clarify, Summarize, Act, Reflect for structured human-AI dialog"
application: "When working on multi-step tasks, complex requests, or any work requiring iteration"
applyTo: "**/*"
currency: 2026-04-27
---

# CSAR Loop

The core protocol for productive human-AI collaboration. Structure every multi-step task with four phases: Clarify → Summarize → Act → Reflect.

## The Four Phases

### 1. Clarify

Before acting, ask questions to understand the task fully:

- What is the deliverable?
- Who is the audience?
- What constraints apply?
- What does success look like?

Clarify is not about gathering information the AI lacks. It's about surfacing assumptions the human hasn't articulated. Often, the most valuable question is one the human hadn't considered.

### 2. Summarize

Before proceeding, verify shared understanding:

> "Here's what I understand: you want X, constrained by Y, for audience Z. The priority is A over B. Is that right?"

The summary invites correction. It catches misunderstandings before they propagate. It creates a checkpoint both parties can return to if the conversation drifts.

### 3. Act

Execute the agreed work. Generate the document, write the code, produce the analysis.

Action happens *after* clarification and summarization, not instead of them. The output is smaller and more targeted because the scope has been narrowed by the preceding phases.

### 4. Reflect

After the action, evaluate the outcome:

- Does it meet the stated success criteria?
- What's missing?
- What should change in the next cycle?

Reflection is learning: what worked, what didn't, and what should change.

## When to Use CSAR

| Context | Apply CSAR? |
|---------|-------------|
| Multi-step tasks | Yes — each cycle produces a checkpoint |
| Complex requests | Yes — clarification prevents wasted work |
| Ambiguous requirements | Yes — summarization surfaces misunderstandings |
| Simple, mechanical tasks | Optional — may add overhead |
| Time-critical single outputs | Skip Clarify/Summarize if context is clear |

## CSAR Anti-Patterns

| Anti-Pattern | What Happens | Better Approach |
|--------------|--------------|-----------------|
| Skip to Act | Assumptions propagate into work | Always Clarify first |
| Summarize without inviting correction | Misunderstandings persist | End summaries with "Is that right?" |
| Act once, never Reflect | Learning is lost | Small cycles, frequent reflection |
| Treat CSAR as bureaucracy | Goes through motions | Genuine questions, genuine checks |

## Worked Example

**Task**: Create a testing strategy for a TypeScript project.

**Clarify**:
> "What's the current test coverage? Which failures have reached production recently? Is the team more comfortable with Jest or Vitest?"

**Summarize**:
> "Coverage is 43%, concentrated in utilities. Two null-reference bugs reached production. Team uses Jest but finds mocking verbose. I'll propose a strategy focused on integration tests for the failure-prone modules, using Vitest, with 70% coverage for critical paths. Correct?"

**Act**: Generate the strategy document.

**Reflect**:
> "The strategy covers integration tests but not performance testing. Should I add a section on load testing for the payment module?"

## Integration with Other Protocols

- **Partnership Charter** (Chapter 10): CSAR is the loop; the charter defines commitments within each phase
- **Appropriate Reliance** (Chapter 8): Verification happens in the Reflect phase
- **Vibe Diagnostics** (Chapter 12): Skipping Clarify/Summarize is a vibe coding signal

## Reference

*The Verification Habit*, Chapter 8: Dialog Engineering
