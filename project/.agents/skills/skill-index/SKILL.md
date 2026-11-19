---
name: skill-index
description: "Builds and searches SKILLS_INDEX.md, the local list of skills with their descriptions and tags. Use when you cannot tell which skill fits a task, after adding, renaming or removing a skill, or when SKILLS_INDEX.md looks stale or misses a skill folder."
metadata:
  id: SKL-04
  stars: "4"
  nature: tooling
  mode: A
  wave: V1
  load: auto
---

# Skill index

**Core rule:** `SKILLS_INDEX.md` is generated, never edited by hand; rebuild it after any change to a skill header.

## When to use

- Use when: you look for a skill by a word of the task; a skill was added, renamed or removed; the index does not match the folders.
- Do not use when: you already know the skill's name. Load it with the `skill` tool.

## Procedure

1. Search the skills by the words of the task, from the project root: `node .agents/skills/skill-index/scripts/skill-index.ts search <word> <word>`.
   - Check: the output ends with `N results.` and lists at most 5 skills with their descriptions.
2. After a change to any `SKILL.md` header, rebuild: `node .agents/skills/skill-index/scripts/skill-index.ts build`.
   - Check: the command prints `Wrote .../SKILLS_INDEX.md.`
3. Confirm the index is current: `node .agents/skills/skill-index/scripts/skill-index.ts check`.
   - Check: it prints `SKILLS_INDEX.md is up to date.` and exits 0.
4. Without Node, use the Python twin with the same arguments: `python3 .agents/skills/skill-index/scripts/skill_index.py build`.
   - Check: the same messages; both scripts write the same bytes.

## What the index holds

| Column | From |
| --- | --- |
| Skill | `name` |
| Load | `metadata.load` (always, auto, manual, auto+manual) |
| Tags | category prefix of `metadata.id` and `metadata.nature` |
| Description | `description` |

Folders starting with `_` and the drafts of `.agents/skills-drafts/` are not listed: a draft is not usable yet.

## Stop and ask the human if

- Two descriptions fire on the same search: one of the two skills must be narrowed (see `writing-skills`).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will fix the index by hand." | The next build overwrites it. Fix the skill header, then rebuild. |
| "A search with one word is enough." | Use the words of the task: file name, error text, command. |

## Definition of done

- [ ] `check` prints `SKILLS_INDEX.md is up to date.`
- [ ] The index was rebuilt, not edited.
