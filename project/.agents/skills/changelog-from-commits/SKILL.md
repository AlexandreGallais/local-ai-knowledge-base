---
name: changelog-from-commits
description: "Manual: run only when the user explicitly asks for /changelog-from-commits. Turns commits and merge requests between two points into readable release notes or a summary, grouped by type and written for users."
metadata:
  id: WRT-06
  stars: "2"
  nature: process
  mode: A
  wave: V3
  load: manual
---

# Changelog from commits

**Core rule:** release notes describe effects for users, grouped by type; every line comes from a commit or merge request in the range.

## Procedure

1. Fix the range: last tag to now (`git describe --tags --abbrev=0`), or the two points given.
   - Check: the range is written.
2. Collect commits and merged MRs: `git log --format='%h %s' <from>..<to>` and `glab mr list --merged` for the period.
   - Check: the list is complete for the range.
3. Group: Added, Changed, Fixed, Removed, Security; drop internal-only changes (refactors, CI) unless asked.
   - Check: each item is in one group.
4. Rewrite each item as a user-visible effect, one line, with its MR or commit reference.
   - Check: no line is a raw commit subject.
5. Put the result where asked (CHANGELOG entry, release description, message).
   - Check: the human reviewed it.

## Stop and ask the human if

- The audience (users, developers, management) is not clear.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Paste the log." | Users do not read commit subjects. |
| "Include every refactor." | Notes are for effects; keep internals out. |

## Definition of done

- [ ] Range fixed; items grouped and rewritten as effects with references; reviewed.
