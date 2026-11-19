---
name: session-handoff
description: "Compacts the state of a long task into HANDOFF.md so a fresh session can resume cold. Use when the user asks for a handoff, a summary to continue later or /session-handoff, when the context is getting long, before a risky step, or when you are about to stop with work unfinished."
license: MIT
metadata:
  id: SKL-07
  stars: "4"
  nature: template
  mode: R
  wave: V1
  load: auto+manual
---

# Session handoff

**Core rule:** a fresh session must be able to continue from `HANDOFF.md` and the repository alone, without this conversation.

## When to use

- Use when: the user asks; the task will not finish in this session; the context is long; before stopping on a blocker.
- Do not use when: the task is finished; write the `final-report` instead.

## Procedure

1. Collect the facts: `git status`, `git log --oneline -5`, the branch, the last test result.
   - Check: each fact comes from a command run now.
2. Write `HANDOFF.md` at the project root with the template below. Point to files (`PLAN.md`, specs, commits); do not copy them.
   - Check: every section is filled or says "none".
3. Remove secrets and personal data from it.
   - Check: no token, password, host name or person name in the file.
4. Tell the user where the file is and the first command to run next time.
   - Check: your reply names `HANDOFF.md` and that command.

## Template

```markdown
# Handoff - <task> - <YYYY-MM-DD>
## Goal
<one or two sentences>
## Done
- <fact> (commit <hash> / file <path>)
## In progress
- <what, where, current state>
## Next
1. <first command or step>
## Traps
- <what failed and why; what not to retry>
## Load these skills
- `<skill>`: <why>
```

## Stop and ask the human if

- `HANDOFF.md` should not be committed (ask whether to keep it out of Git).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will summarise the conversation." | Write state and next steps, not history. |
| "I will paste the plan in it." | Point to `PLAN.md`; copies go stale. |
| "Next: continue." | Name the exact next command. |

## Definition of done

- [ ] `HANDOFF.md` has goal, done, in progress, next, traps, skills.
- [ ] Facts come from commands run now; no secret inside.
- [ ] A fresh session could resume with it alone.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
