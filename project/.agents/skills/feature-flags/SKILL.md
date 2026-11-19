---
name: feature-flags
description: "Ships a feature behind a flag to enable it progressively, with an owner and a removal plan so no dead code stays. Use when a feature must be merged before it is ready, enabled for some users only, or turned off quickly if it fails."
metadata:
  id: DEV-20
  stars: "1"
  nature: reference
  mode: A
  wave: V4
  load: auto
---

# Feature flags

**Core rule:** every flag has a name, an owner, a default (off), tests for both states and a removal date.

## Procedure

1. Use the project's flag mechanism (config, environment, flag service); create the flag off by default.
   - Check: the flag appears in the config with its default.
2. Guard the new path at one place near the entry, not deep in many functions.
   - Check: `grep` finds the flag in few places.
3. Test both states.
   - Check: tests pass with the flag on and off.
4. Record owner and removal date (issue or comment next to the flag).
   - Check: the record exists.
5. When fully enabled, remove the flag and the old path.
   - Check: `grep` finds no reference to the flag.

## Stop and ask the human if

- No flag mechanism exists and one would have to be added.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Remove the flag later." | Without a date, flags become permanent dead code. |
| "Test only the new path." | The old path still runs for most users. |

## Definition of done

- [ ] Flag off by default, tested both ways, with owner and removal date.
