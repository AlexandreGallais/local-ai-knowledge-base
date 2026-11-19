# Source of secure-coding

## Upstream

| Repository | Path | Commit | Licence |
| --- | --- | --- | --- |
| addyosmani/agent-skills | `skills/security-and-hardening/SKILL.md` | `8c99fa36d90068c82d547f7c12a9d67a3e95f4ee` (2026-11-18) | MIT, Copyright (c) 2025 Addy Osmani |
| openai/skills | `skills/.curated/security-best-practices/SKILL.md` | `49f948faa9258a0c61caceaf225e179651397431` (2026-06-23) | Apache-2.0 (`LICENSE.txt` of the skill folder) |

Licences checked on 2026-11-19. Full texts: `../../_licenses/agent-skills-MIT.txt`, `../../_licenses/openai-skills-Apache-2.0.txt`. Changes are stated below (Apache-2.0, section 4).

## Kept

- OWASP prevention, input validation, least privilege (security-and-hardening).
- Secure-by-default patterns per language and framework (security-best-practices).

## Changed

- Condensed into a sink table (SQL, shell, HTML, paths, deserialisation, redirects, crypto, passwords) with tests per input; per-language references dropped.

## Sources

- <https://github.com/addyosmani/agent-skills>
- <https://github.com/openai/skills>
- <https://owasp.org/www-project-top-ten/>
