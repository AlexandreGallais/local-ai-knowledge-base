# Source of using-skills

## Upstream

| Repository | Path | Commit | Licence |
| --- | --- | --- | --- |
| obra/superpowers | `skills/using-superpowers/SKILL.md` | `22f0b463e7a5e579904dd6211a520321035526f7` (2026-11-03) | MIT, Copyright (c) 2025 Jesse Vincent |
| addyosmani/agent-skills | `skills/using-agent-skills/SKILL.md` | `8c99fa36d90068c82d547f7c12a9d67a3e95f4ee` (2026-11-18) | MIT, Copyright (c) 2025 Addy Osmani |

Licences checked in each repository's `LICENSE` file on 2026-11-19. Full texts: `../../_licenses/superpowers-MIT.txt` and `../../_licenses/agent-skills-MIT.txt`.

## Kept

- Load the matching skill before any action, including questions and exploration.
- Process skills before domain skills.
- The table of rationalisations ("only a small question", "I remember this skill").
- User instructions override skills.

## Changed

- Added the limit of 3 skills per task and the reading of `SKILLS_INDEX.md` (catalogue, section 5.3).
- Replaced the platform list with the tools of the target harness (`skill`, `read`, `question`).
- Removed the subagent stop block, the todo creation and the plan-mode rule: the harness runs one agent without a todo tool.
- Replaced the upstream skill map with the skills of this catalogue.

## Sources

- <https://github.com/obra/superpowers>
- <https://github.com/addyosmani/agent-skills>
