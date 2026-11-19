---
name: test-strategy
description: "Chooses the right test level for a behaviour - unit, integration or end-to-end - and the right split for a project. Use when deciding how to test a feature, when a project has only one kind of test, when tests are slow or brittle, or when asked for a testing plan."
license: MIT
metadata:
  id: TST-14
  stars: "2"
  nature: reference
  mode: R
  wave: V3
  load: auto
---

# Test strategy

**Core rule:** test each behaviour at the lowest level that can catch its bug; keep end-to-end tests for the few critical user paths.

## Procedure

1. List the behaviours to test and, for each, what kind of bug would break it.
   - Check: one line per behaviour.
2. Choose the level with the table.
   - Check: each behaviour has one level and a reason.
3. Check the balance: many fast unit tests, fewer integration tests, a handful of end-to-end tests.
   - Check: the full unit suite runs in seconds; end-to-end only for critical paths.
4. Write the plan in the spec or `PLAN.md`.
   - Check: the plan names the files or folders of each level.

| Bug lives in | Level | Example |
| --- | --- | --- |
| Pure logic, calculations, parsing | unit | `parseDate`, pricing rules |
| Contract with a database, queue, file system | integration | repository queries, message handlers |
| Wiring of several modules, configuration | integration | API endpoint with real database |
| What a user does across screens | end-to-end | log in, create, save |
| Look of a screen | visual regression | layout after a CSS change |

## Stop and ask the human if

- The team has a test policy that differs from this table.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "End-to-end tests cover everything." | They are slow and vague when they fail. |
| "Unit tests with mocks prove the database query." | Only an integration test proves a query. |

## Definition of done

- [ ] Each behaviour has a level and a reason; the balance holds; plan written.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
