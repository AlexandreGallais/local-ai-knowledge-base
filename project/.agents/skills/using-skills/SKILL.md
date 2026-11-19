---
name: using-skills
description: "Routes each task to at most three skills before any action. Use when a new request arrives or when the task changes (debugging, then committing), before any reply, question, file read or command, to read SKILLS_INDEX.md, load the matching skills and announce them."
license: MIT
metadata:
  id: MET-01
  stars: "5"
  nature: process
  mode: R
  wave: V0
  load: always
---

# Using skills

**Core rule:** before acting on a request, read `.agents/skills/SKILLS_INDEX.md`, load at most 3 matching skills with the `skill` tool, and say which ones you apply.

## When to use

- Use when: a new request arrives; the kind of work changes (from fixing to committing); you are not sure which method applies.
- Do not use when: you already follow a loaded skill for the same task. Keep following it.

## Procedure

1. Read the index once per session with `read` on `.agents/skills/SKILLS_INDEX.md`.
   - Check: you can quote the descriptions whose words match the request (file names, error text, commands).
2. Choose at most 3 skills: first one process skill (how to work), then at most two domain skills (what to know). Use the table below.
   - Check: your list holds 1, 2 or 3 names, each present in the index.
3. Load each chosen skill with the `skill` tool, even if you think you remember it.
   - Check: the text of each skill is in your context now.
4. Announce them in one line before the first action: `Using <skill>, <skill> for <purpose>.`
   - Check: that line is the first line of your reply.
5. Follow each loaded skill in order. Its "Definition of done" becomes part of yours.
   - Check: before saying done, each loaded skill's checklist is ticked with evidence.

| The request is about | Load first | Then, if present in the index |
| --- | --- | --- |
| An error, a failing test, "it does not work" | `systematic-debugging` | the skill of the stack or tool |
| A new feature or change of behaviour | `feature-workflow` | `task-breakdown`, the domain skill |
| A plan to carry out | `executing-plans` | the domain skill |
| A vague or incomplete request | `ask-when-underspecified` | none until it is clear |
| A skill to write or fix | `writing-skills` | `skill-testing` |
| Any API, option or flag you are not sure of | `api-existence-check` | the documentation server of that tool |

## Priority

- The user's explicit request and the project's `AGENTS.md` come first, then the loaded skills, then your habits.
- When the user says to skip a skill, skip it and say so in one line.

## Stop and ask the human if

- Two loaded skills give opposite instructions for the same step.
- The task is complex and no skill matches it: ask for the procedure with the `question` tool instead of improvising.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It is only a small question." | Small questions are tasks. Read the index first. |
| "Let me look at the code first." | The skill tells you how to explore. Load it first. |
| "I remember this skill." | Skills change. Load the current text. |
| "More skills means more safety." | More than 3 skills dilutes attention. Keep 3 at most. |
| "This skill is overkill." | Follow it; skip only on the user's explicit word. |

## Definition of done

- [ ] `SKILLS_INDEX.md` read in this session.
- [ ] 1 to 3 skills loaded with the `skill` tool and announced in one line.
- [ ] Each loaded skill's "Definition of done" checked before you say done.

## References

- `.agents/skills/SKILLS_INDEX.md`: read at the start of a session and when the task changes.
- `.agents/skills/CORE_RULES.md`: the rules that hold even when no skill is loaded.
- `references/SOURCE.md`: upstream and licence of this skill.
