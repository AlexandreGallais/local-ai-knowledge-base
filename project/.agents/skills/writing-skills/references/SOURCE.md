# Source of writing-skills

## Upstream

| Repository | Path | Commit | Licence |
| --- | --- | --- | --- |
| obra/superpowers | `skills/writing-skills/SKILL.md` | `22f0b463e7a5e579904dd6211a520321035526f7` (2026-11-03) | MIT, Copyright (c) 2025 Jesse Vincent |
| anthropics/skills | `skills/skill-creator/SKILL.md` | `e4bb5d960d87126ff3b3a8af1a104b7db67560ba` (2026-11-16) | Apache-2.0 (`LICENSE.txt` of the skill folder) |
| mattpocock/skills | `skills/productivity/writing-for-agents/SKILL.md` | `5863806dd4e15c63174bee4e7515a4256792ecfa` (2026-11-12) | MIT, Copyright (c) 2026 Matt Pocock |

Licences checked on 2026-11-19. Full texts: `../../_licenses/superpowers-MIT.txt`, `../../_licenses/anthropics-skills-Apache-2.0.txt`, `../../_licenses/mattpocock-skills-MIT.txt`.

## Kept

- A skill is tested like code: see the agent fail without it, then pass with it (superpowers).
- The description states when to use the skill, not a summary of its workflow (superpowers).
- Heavy reference goes to separate files reached by a pointer (superpowers, writing-for-agents).
- Every step ends on a clear completion criterion; prefer the positive target to a prohibition (writing-for-agents).
- Evaluation with and without the skill (skill-creator).

## Changed

- Rewritten around the build guide of the catalogue: quoted description, core rule in the first 10 lines, Action and Check per step, mandatory sections, limits of 60 and 500 lines.
- The method comes from the human or from verified commands, never from the local model (catalogue, section 5.3).
- Removed subagent pressure scenarios, graphviz flowcharts and platform paths.

## Sources

- https://github.com/obra/superpowers
- https://github.com/anthropics/skills
- https://github.com/mattpocock/skills
