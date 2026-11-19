---
name: docs-sync
description: "Checks that README, docs and examples still match the code after a change, and updates them. Use when you changed a command, an option, a configuration key, an API, a file layout or a behaviour that documentation describes, and before opening a merge request."
metadata:
  id: WRT-09
  stars: "2"
  nature: process
  mode: A
  wave: V3
  load: auto
---

# Docs sync

**Core rule:** a change that alters what the docs say is not done until the docs say the new thing.

## Procedure

1. List what your change renamed or altered: commands, options, keys, endpoints, paths, behaviours.
   - Check: one line per item.
2. Search the docs for each item: `grep -rn "<old name>" README.md docs/ examples/`.
   - Check: every hit is listed.
3. Update each hit; run the examples you changed.
   - Check: examples run with the new code.
4. Search again for the old names.
   - Check: no hit left, except in the changelog.

## Stop and ask the human if

- The docs describe behaviour you did not change but which seems wrong.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Docs are updated by someone else." | The author of the change knows what changed. |
| "Examples are just illustrations." | Broken examples are the first thing users copy. |

## Definition of done

- [ ] Old names searched and replaced in docs and examples; examples run.
