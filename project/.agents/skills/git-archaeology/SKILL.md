---
name: git-archaeology
description: "Finds why code exists with git history - log -S and -G, blame, --follow, show. Use when a line, a condition or a workaround looks odd, before removing code you do not understand, or when asked when and why something changed."
metadata:
  id: EXP-04
  stars: "3"
  nature: reference
  mode: A
  wave: V2
  load: auto
---

# Git archaeology

**Core rule:** before removing or rewriting code that looks odd, find the commit that added it and read its message.

## Procedure

1. Find who last changed the lines: `git blame -L <start>,<end> <file>`.
   - Check: you have the commit hash of the lines.
2. Read that commit: `git show --stat <hash>`, then `git show <hash> -- <file>`.
   - Check: you can state why it was added, from its message or linked issue.
3. If the blame shows a move or a reformat, go further back: `git blame -w -C -C <file>` or `git log --follow -p -- <file>`.
   - Check: you reach the commit that introduced the logic.
4. Find when a string or symbol appeared or disappeared: `git log -S '<text>' --oneline`; for a regex, `git log -G '<regex>' --oneline`.
   - Check: the list of commits is short and relevant.
5. Read the linked merge request or issue: `glab mr list --search '<hash or title>'`, or the reference in the message.
   - Check: the reason is quoted.

## Stop and ask the human if

- The history is squashed or missing and the code's purpose stays unclear: ask before removing it.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Blame names the author of the logic." | Often the author of a reformat. Use `-w -C`. |
| "No comment means no reason." | The reason is often in the commit or the MR. |

## Definition of done

- [ ] The introducing commit is found and its reason quoted, or its absence reported.
