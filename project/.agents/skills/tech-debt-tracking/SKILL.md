---
name: tech-debt-tracking
description: "Manual: run only when the user explicitly asks for /tech-debt-tracking. Records technical debt found during work as issues with severity and cost, without fixing it outside the current scope."
metadata:
  id: REL-05
  stars: "1"
  nature: process
  mode: A
  wave: V4
  load: manual
---

# Tech debt tracking

**Core rule:** note the debt, do not fix it now: one issue per item, with location, impact and an estimated cost.

## Procedure

1. Collect the debt items noted during the work (the "Later" list of `scope-discipline`).
   - Check: each item has a file and line.
2. For each, write impact (what it slows or risks) and cost to fix (S, M, L).
   - Check: both filled.
3. Check existing issues to avoid duplicates (`glab issue list --search "<words>"`).
   - Check: no duplicate.
4. Create the issues with the team's debt label after the human's yes.
   - Check: `glab issue list --label <label>` shows them.

## Stop and ask the human if

- Before creating issues, and if an item is a risk that should not wait.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Fix it while I am here." | It widens the change and its risk. Record it. |
| "Debt without impact is fine to list." | Without impact nobody can prioritise it. |

## Definition of done

- [ ] Each item recorded once with location, impact and cost; approved issues created.
