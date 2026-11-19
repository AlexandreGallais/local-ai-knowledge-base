---
name: api-and-interface-design
description: "Designs APIs and module interfaces contract first - names, compatibility, error semantics, versioning. Use when adding or changing a public function, a class interface, a REST or RPC endpoint, a message format, or a boundary between front end and back end or between modules."
license: MIT
metadata:
  id: ARC-01
  stars: "3"
  nature: reference
  mode: R
  wave: V2
  load: auto
---

# API and interface design

**Core rule:** write the contract (signature, inputs, outputs, errors) and its tests before the implementation, and never break an existing caller silently.

## Procedure

1. Write the contract: name, inputs with types and limits, output, errors, side effects.
   - Check: the contract fits in a short block a caller can read alone.
2. Check compatibility with existing callers: `grep` the current name and its uses.
   - Check: each existing caller still works, or a migration is planned.
3. Write a test per behaviour of the contract, including each error.
   - Check: the tests fail before the implementation.
4. Implement, then run the tests and the type check.
   - Check: green.

## Rules

| Topic | Rule |
| --- | --- |
| Names | nouns for resources and data, verbs for actions; the project's casing |
| Inputs | accept the narrowest type; validate at the boundary |
| Outputs | return the same shape every time; no `null` and `[]` meaning the same thing |
| Errors | typed or coded errors with a message a caller can act on; HTTP 4xx for caller errors, 5xx for server errors |
| Compatibility | add optional fields; never remove or rename a field without a new version |
| Versioning | version the contract (`/v2/`, a new function name, a schema version) when a change breaks callers |
| Idempotency | retried writes (PUT, delete, message handling) give the same result twice |
| Pagination | lists that can grow are paginated from the start |

## Stop and ask the human if

- A breaking change is needed: say who breaks and propose a migration.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Nobody calls the old field." | Search first; then deprecate before removing. |
| "Return a generic error." | Callers cannot react to "something went wrong". |

## Definition of done

- [ ] Contract written; tests for behaviour and errors pass.
- [ ] No existing caller broken without a planned migration.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
