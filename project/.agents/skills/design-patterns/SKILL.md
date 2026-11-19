---
name: design-patterns
description: "Gives the common design patterns and, above all, when not to use them, with the simplest alternative. Use when considering a factory, strategy, observer, adapter, singleton, builder or repository, when code feels over-engineered, or when asked which pattern fits."
metadata:
  id: ARC-05
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Design patterns

**Core rule:** use a pattern only when the problem it solves is present now; otherwise write the plain code.

## Procedure

1. Name the problem in one sentence without the pattern's name.
   - Check: the sentence describes a present need (several variants now, an external interface to adapt).
2. Find the row of the table; check the "use when" condition.
   - Check: the condition holds in this code today.
3. Prefer the plain alternative when the condition does not hold.
   - Check: the chosen solution is the simplest that meets the need.

| Pattern | Use when | Plain alternative |
| --- | --- | --- |
| Strategy | several interchangeable algorithms chosen at run time | a function parameter, or a switch on two cases |
| Factory | creation logic varies or is complex | a constructor or a plain function |
| Adapter | an external interface does not match yours | call it directly if used in one place |
| Observer or events | several independent listeners react to changes | a direct call when there is one listener |
| Builder | many optional parameters with validation | an options object with defaults |
| Repository | storage must be swappable or isolated for tests | direct queries in a small module |
| Singleton | never by default | pass the instance (dependency injection) |

## Stop and ask the human if

- The team's codebase follows a pattern you would not choose: follow the codebase, or ask.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It may need variants later." | Add the pattern when the second variant arrives. |
| "Singletons are convenient." | They hide dependencies and break tests. |

## Definition of done

- [ ] Each pattern used matches a present need; otherwise the plain alternative is used.
