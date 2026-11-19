---
name: skill-maintenance
description: "Manual: run only when the user explicitly asks for /skill-maintenance. Reviews the skills - never triggered, overlapping descriptions, content out of date with the installed versions - and proposes fixes, merges or removals."
metadata:
  id: SKL-08
  stars: "3"
  nature: process
  mode: A
  wave: V3
  load: manual
---

# Skill maintenance

**Core rule:** propose changes with evidence (test logs, overlaps, version gaps); remove or merge a skill only with the human's yes.

## Procedure

1. Check every skill: `node .agents/skills/skill-template/scripts/check-skill.ts .agents/skills/*/`.
   - Check: the findings are listed.
2. Find overlaps: search the index with the main words of each description (`skill-index.ts search <words>`).
   - Check: pairs of skills that answer the same request are listed.
3. Find skills never or wrongly triggered: read `_eval/` logs and recent sessions if the human provides them.
   - Check: each suspect has its evidence.
4. Find stale content: versions, commands and flags in skills against the installed tools (`toolchain-verification`, `api-existence-check`).
   - Check: each stale line is listed with the current value.
5. Propose: fix, narrow the description, merge, or remove; wait for the human's choice.
   - Check: decisions recorded; changes made with `writing-skills`; index rebuilt.

## Stop and ask the human if

- At step 5: every merge or removal needs a yes.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Delete skills that seem unused." | Some are manual or rare by design. Ask. |
| "Fix descriptions without testing." | Run the trigger test after each change (`skill-testing`). |

## Definition of done

- [ ] Findings, overlaps, triggers and stale content reported with evidence; approved changes made; index rebuilt.
