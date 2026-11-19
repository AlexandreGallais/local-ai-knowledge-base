---
name: spec-writing
description: "Writes a short specification before a non-trivial change - goal, scope, design, test plan, limits - in a SPEC file the team can review. Use when the user asks for a spec or /spec-writing, when a change spans several modules or needs a design decision, or before implementing a feature whose behaviour is not yet written down."
license: MIT
metadata:
  id: PLN-02
  stars: "4"
  nature: template
  mode: R
  wave: V2
  load: auto+manual
---

# Spec writing

**Core rule:** a spec states behaviour the user can check and the tests that will prove it; it is written and agreed before code.

## When to use

- Use when: a change spans modules, an API or data format changes, or the behaviour is not written anywhere.
- Do not use when: a bug fix with a clear expected behaviour (`systematic-debugging`).

## Procedure

1. Gather what is known: the request, the conversation, the code areas involved, existing ADRs.
   - Check: open questions are listed; ask them first (`ask-when-underspecified`).
2. Write `docs/specs/<YYYY-MM-DD>-<topic>.md` (or the project's spec folder) from the template.
   - Check: every section is filled or says "none".
3. Choose the test seams: the highest existing level that reaches the behaviour.
   - Check: each acceptance criterion maps to a test at a named seam.
4. Ask the user to review it.
   - Check: approved, or the requested changes are applied.

## Template

```markdown
# <Topic>
## Problem
<who has the problem, what they cannot do today>
## Goal and scope
- In: <...>
- Out: <...>
## Behaviour
1. <user-visible behaviour, checkable>
## Design
- Modules touched: <...>
- Interfaces changed: <signature or contract>
- Data: <formats, migrations>
## Test plan
| Criterion | Test | Level |
## Limits and risks
- <...>
## Open questions
- <...>
```

## Stop and ask the human if

- A behaviour or business rule is unknown.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The spec is in the issue." | Issues hold discussion; the spec holds the decision. |
| "Design first, behaviour later." | Without the behaviour, the design has nothing to satisfy. |

## Definition of done

- [ ] Spec file with all sections; each criterion has its test.
- [ ] Reviewed and approved before code.

## References

- Skill `adr-writing`: when the spec contains a structural decision.
- `references/SOURCE.md`: upstream and licence of this skill.
