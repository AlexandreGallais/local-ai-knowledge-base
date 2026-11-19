---
name: requesting-code-review
description: "Prepares a review request - context, what changed, points of attention, how to test - so a reviewer can work fast. Use when a branch or a merge request is ready for review, when asking a colleague to look at a change, or when the MR description is empty or only lists commits."
license: MIT
metadata:
  id: REV-04
  stars: "3"
  nature: process
  mode: R
  wave: V2
  load: auto
---

# Requesting code review

**Core rule:** ask for review only after your own checks pass, and tell the reviewer where to look and how to test.

## Procedure

1. Run the project's tests, build and lint; run `self-review`.
   - Check: all green, outputs quoted.
2. Write the request: context, what changed (by file group), points of attention, how to test, what is out of scope.
   - Check: each section has at least one line.
3. Keep it small: if the diff is over about 400 changed lines, propose to split it.
   - Check: `git diff --stat <base>...HEAD` total is known.
4. Put the request in the MR description (`glab mr update <iid> --description "<text>"`) or in a note (`glab mr note <iid> -m "<text>"`).
   - Check: `glab mr view <iid>` shows it.

## Request template

```markdown
## Context
<why this change>
## What changed
- <area>: <change>
## Please look at
- <file:line> - <risk or doubt>
## How to test
1. <command> -> <expected>
## Out of scope
- <what this MR does not do>
```

## Stop and ask the human if

- You do not know who should review.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The diff speaks for itself." | Reviewers need the why and the risky places. |
| "Ask review while CI is red." | Fix first; a red MR wastes the reviewer's time. |

## Definition of done

- [ ] Checks green before asking.
- [ ] Request with context, changes, attention points, test steps, out of scope.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
