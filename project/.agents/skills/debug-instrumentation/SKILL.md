---
name: debug-instrumentation
description: "Adds temporary debug output with a fixed tag and removes it before commit, checked by search. Use when adding print, console.log, logging or dbg! lines to understand a bug, and before committing after a debugging session."
metadata:
  id: DBG-13
  stars: "3"
  nature: guardrail
  mode: A
  wave: V2
  load: auto
---

# Debug instrumentation

**Core rule:** every temporary debug line carries the tag `DEBUG-TMP`, and none is left when you commit.

## Rules

1. Tag each temporary line: `console.log('DEBUG-TMP', value)`, `print("DEBUG-TMP", value)`, `eprintln!("DEBUG-TMP {:?}", value)`, `System.err.println("DEBUG-TMP " + value)`.
   - Check: every debug line you added holds `DEBUG-TMP`.
2. Print values with a label and the place: `DEBUG-TMP parse:42 total=`.
   - Check: one output line tells where and what.
3. Before commit, search and remove: `grep -rn 'DEBUG-TMP' .` (exclude dependency folders).
   - Check: the search finds nothing.
4. Keep useful diagnostics as real logs at debug level instead (`logging-and-observability`).
   - Check: kept lines use the project logger, without the tag.

## Stop and ask the human if

- A debug line must stay in a shared environment to diagnose a problem there.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will remember to remove it." | Untagged debug lines get committed. Tag them. |
| "Print the whole object." | Huge outputs flood the context. Print the fields you need. |

## Definition of done

- [ ] `grep -rn 'DEBUG-TMP'` finds nothing before the commit.
