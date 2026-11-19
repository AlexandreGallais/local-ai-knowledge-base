---
name: writing-skills
description: "Creates or improves a skill of .agents/skills with a trigger-ready description, a short body, separate references and a before/after test. Use when the user asks to write, fix, shorten or review a skill, when a procedure the user explained must be saved, or when a SKILL.md fails check-skill."
license: MIT
metadata:
  id: SKL-01
  stars: "5"
  nature: process
  mode: R
  wave: V0
  load: auto
---

# Writing skills

**Core rule:** write only what the agent would get wrong without the skill, and never invent the method: it comes from the human or from verified commands.

## When to use

- Use when: the user explains a procedure to keep; a skill does not trigger or misleads; `check-skill` reports findings.
- Do not use when: the content is one command or one config value. Put it in `AGENTS.md` instead (`agents-md-authoring`).

## Procedure

1. Collect the material: the task, one real input, the expected output, the mistakes already seen, the commands that prove success.
   - Check: each item is written down; anything missing is asked with the `question` tool.
2. Compare with `SKILLS_INDEX.md`: if an existing skill covers the trigger, improve that skill instead of adding one.
   - Check: no other description in the index fires on the same request.
3. Choose the `name`: lowercase, digits and hyphens, verb or noun phrase, 64 characters at most. Folder name equals `name`.
   - Check: `.agents/skills/<name>/` does not exist yet, or you are editing it on purpose.
4. Copy the template `.agents/skills/skill-template/assets/SKILL.template.md` to `.agents/skills/<name>/SKILL.md`.
   - Check: the file exists and starts with `---`.
5. Write the `description` in double quotes: what it does (third person), then `Use when` with the words the agent will see: file names, error fragments, commands, symptoms. 200 to 400 characters.
   - Check: the description has no double quote inside and is at most 1,024 characters.
6. Write the body: the core rule in the first 10 lines; numbered steps, each with an Action and a `- Check:` line; the three mandatory sections.
   - Check: a guardrail is at most 60 lines; any skill at most 500 lines.
7. Move long material (tables, recipes, error lists) to `references/<topic>.md`, one level deep, each cited as "read when ...".
   - Check: every file in `references/` is named in `SKILL.md`.
8. Run the checker from the project root.
   - Check: `node .agents/skills/skill-template/scripts/check-skill.ts .agents/skills/<name>` ends with `0 findings.`
9. Test it with `skill-testing` (trigger test and paired test), then rebuild the index with `skill-index`.
   - Check: `_eval/<name>.md` exists and `SKILLS_INDEX.md` lists the skill.
10. If the skill is always loaded, add its one-line rule to `CORE_RULES.md` and to the copy in `AGENTS.md`.
    - Check: both files hold the same line.

## Writing rules for a mid-size model

- Short sentences. One instruction per bullet.
- Decisions as a table, at most two levels of conditions.
- Exact commands, files and expected output: "check the logs" is not a step.
- State the wanted behaviour; add a prohibition only as a hard guardrail, next to the wanted behaviour.
- One good and one bad example when the behaviour is subtle.
- Repeat the core rule in "Definition of done".

## Stop and ask the human if

- The method is not given and cannot be verified by a command: ask, do not write it from memory.
- The skill would hold internal values (hosts, mirrors, paths) and may leave the internal environment.
- Two existing skills overlap and one must be narrowed or removed.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "A complete guide helps more." | Long documentation-style skills lower results. Keep the gap only. |
| "I know how this should be done." | Your own method is not reliable. Write what the human said or what a command proved. |
| "The description can summarise the steps." | The agent then follows the summary and skips the body. Describe the trigger. |
| "A colon in the description is fine." | Unquoted, it breaks the YAML header. Quote the whole value. |
| "It passed the checker, so it works." | Only the paired test shows it helps. |

## Definition of done

- [ ] Folder name equals `name`; description quoted, with `Use when` and real trigger words.
- [ ] Core rule in the first 10 lines; every step has a check; mandatory sections present.
- [ ] `check-skill` ends with `0 findings.`
- [ ] Test logged in `_eval/<name>.md`; index rebuilt; `CORE_RULES.md` updated if always loaded.
- [ ] Nothing in the skill was invented.

## References

- `.agents/skills/skill-template/assets/SKILL.template.md`: the template to copy at step 4.
- Skill `skill-testing`: read at step 9.
- Skill `skill-index`: rebuild the index at step 9.
- `references/SOURCE.md`: upstream and licence of this skill.
