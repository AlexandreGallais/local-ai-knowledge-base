---
name: test-data-builders
description: "Creates test data with fixtures, factories and builders - realistic, minimal, anonymised. Use when tests need objects with many fields, when fixtures are copied between tests, when test data comes from real records, or when setup code dwarfs the assertions."
metadata:
  id: TST-08
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Test data builders

**Core rule:** each test states only the fields that matter to it; a factory supplies valid defaults for the rest, and no real personal data is used.

## Procedure

1. Write one factory per entity with valid defaults (`makeUser(overrides)`, `UserFactory`, a pytest fixture with parameters).
   - Check: `makeUser()` alone produces a valid object.
2. In tests, override only the relevant fields: `makeUser({ role: 'admin' })`.
   - Check: each test's setup shows why the test exists.
3. Generate unique values where uniqueness matters (sequence numbers, not random values without a seed).
   - Check: tests pass when run twice and in any order.
4. Replace real data with fake values; never copy production records.
   - Check: no real name, email or identifier in fixtures (`sensitive-data-handling`).

## Stop and ask the human if

- A test needs the shape of real production data that you cannot fake.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Copy the big fixture and tweak it." | Copies drift. Use one factory with overrides. |
| "Random data finds more bugs." | Unseeded randomness makes failures unreproducible. |

## Definition of done

- [ ] Factories with valid defaults; tests override only what matters; no real data.
