---
name: impact-analysis
description: "Lists what a change touches before making it - callers, public APIs, configs, tests, CI jobs, data. Use when about to change a function signature, a shared module, a config key, a data format, a dependency version or a CI file, and when asked what a change could break."
metadata:
  id: EXP-05
  stars: "4"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# Impact analysis

**Core rule:** before changing a shared thing, list every place that depends on it, from searches you ran.

## Procedure

1. Name what changes: symbol, file, config key, format, version.
   - Check: one line per thing.
2. Find direct users: `grep -rn "<name>"` in code, configs, scripts, docs and `.gitlab-ci.yml`.
   - Check: each hit is listed with file and line.
3. Find indirect users: exports, re-exports, public API, serialised data, environment variables, other repositories mentioned in docs.
   - Check: each one is listed or marked "none found".
4. Find the tests that cover each user: test files that import or call them.
   - Check: users without a test are flagged.
5. Write the impact table and the plan (update each user, or keep compatibility).
   - Check: every user has an action.

## Impact table

```markdown
| Dependent | Where | Covered by test | Action |
|---|---|---|---|
```

## Stop and ask the human if

- Users outside this repository may exist (published package, API, shared database).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The type checker will find everything." | It misses configs, strings, scripts and other repositories. |
| "No test failed, nothing is impacted." | Uncovered users break silently. |

## Definition of done

- [ ] Impact table written from searches; every dependent has an action.
- [ ] Uncovered dependents flagged.
