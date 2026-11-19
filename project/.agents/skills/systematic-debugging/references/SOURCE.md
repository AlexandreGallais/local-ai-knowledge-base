# Source of systematic-debugging

## Upstream

| Repository | Path | Commit | Licence |
| --- | --- | --- | --- |
| obra/superpowers | `skills/systematic-debugging/SKILL.md` and `root-cause-tracing.md` | `22f0b463e7a5e579904dd6211a520321035526f7` (2026-11-03) | MIT, Copyright (c) 2025 Jesse Vincent |
| addyosmani/agent-skills | `skills/debugging-and-error-recovery/SKILL.md` | `8c99fa36d90068c82d547f7c12a9d67a3e95f4ee` (2026-11-18) | MIT, Copyright (c) 2025 Addy Osmani |
| mattpocock/skills | `skills/engineering/diagnosing-bugs/SKILL.md` | `5863806dd4e15c63174bee4e7515a4256792ecfa` (2026-11-12) | MIT, Copyright (c) 2026 Matt Pocock |

Licences checked on 2026-11-19. Full texts in `../../_licenses/`.

## Kept

- The iron law: no fix without root cause investigation first (superpowers).
- Build a tight, red-capable feedback loop before any hypothesis (diagnosing-bugs).
- Reproduce, minimise, one hypothesis at a time, fix at the source, guard with a test (all three).

## Changed

- Rewritten as eight steps with an observable check each (catalogue, section 5.4).
- Cross-references to the skills of this catalogue (`reproduce-first`, `loop-breaker`, `stack-trace-reading`).
- Removed the multi-layer signing example and the human-in-the-loop script.

## Sources

- <https://github.com/obra/superpowers>
- <https://github.com/addyosmani/agent-skills>
- <https://github.com/mattpocock/skills>
