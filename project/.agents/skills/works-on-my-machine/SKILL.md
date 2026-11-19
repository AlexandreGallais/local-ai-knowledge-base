---
name: works-on-my-machine
description: "Explains why the same code behaves differently in two environments by comparing versions, variables, OS, configuration and image. Use when it works locally but fails in CI, in the container, on another machine or for another user, or the reverse."
metadata:
  id: DBG-12
  stars: "3"
  nature: process
  mode: A
  wave: V3
  load: auto
---

# Works on my machine

**Core rule:** collect the same facts in both environments with the same commands, compare them side by side, and test the differences one at a time.

## Procedure

1. Run the same snapshot commands in both environments and save each output: tool versions (`toolchain-verification`), `env | sort` without secret values, OS (`cat /etc/os-release`), working directory, user and UID, lockfile hash (`sha256sum <lockfile>`), relevant config files.
   - Check: two files `/tmp/env-a.txt` and `/tmp/env-b.txt`.
2. Compare: `diff /tmp/env-a.txt /tmp/env-b.txt`.
   - Check: a list of differences.
3. Rank the differences by likelihood for the symptom.
   - Check: the first one has a reason.
4. Remove one difference at a time (align a version, set a variable) and rerun.
   - Check: the behaviour changes with exactly one difference.
5. Fix it durably: lockfile, image, config, documented variable.
   - Check: both environments behave the same.

## Stop and ask the human if

- One environment cannot be accessed or changed by you (production, another person's machine).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The code is the same, so the bug is random." | The environment differs somewhere. Diff it. |
| "Change several things to make it pass." | Then you do not know which one mattered. |

## Definition of done

- [ ] Snapshots compared; the deciding difference found and fixed durably.
