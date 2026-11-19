# Source of e2e-playwright

## Upstream

| Repository | Path | Commit | Licence |
| --- | --- | --- | --- |
| anthropics/skills | `skills/webapp-testing/SKILL.md` | `e4bb5d960d87126ff3b3a8af1a104b7db67560ba` (2026-11-16) | Apache-2.0 (`LICENSE.txt` of the skill folder) |
| openai/skills | `skills/.curated/playwright/SKILL.md` | `49f948faa9258a0c61caceaf225e179651397431` (2026-06-23) | Apache-2.0 (`LICENSE.txt` of the skill folder) |

Licences checked on 2026-11-19. Full texts: `../../../skills/_licenses/anthropics-skills-Apache-2.0.txt`, `../../../skills/_licenses/openai-skills-Apache-2.0.txt`. Changes are stated below (Apache-2.0, section 4).

## Kept

- Test local web apps with Playwright: verify functionality, capture screenshots, read browser logs.

## Changed

- Written as Playwright Test procedure (role locators, auto-waiting, repeat to catch flakiness); Electron launch added; bundled helper scripts not copied.

## Sources

- <https://github.com/anthropics/skills>
- <https://github.com/openai/skills>
