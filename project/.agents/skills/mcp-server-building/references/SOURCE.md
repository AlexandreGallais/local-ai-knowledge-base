# Source of mcp-server-building

## Upstream

| Repository | Path | Commit | Licence |
| --- | --- | --- | --- |
| anthropics/skills | `skills/mcp-builder/SKILL.md` | `e4bb5d960d87126ff3b3a8af1a104b7db67560ba` (2026-11-16) | Apache-2.0 (`LICENSE.txt` of the skill folder) |

Licence checked on 2026-11-19. Full text: `../../_licenses/anthropics-skills-Apache-2.0.txt`. Changes are stated below (Apache-2.0, section 4).

## Kept

- Well-designed tools for an LLM: clear names, focused purpose, schemas, concise outputs; test the server.

## Changed

- Local stdio servers only, in the style of the bricks of `.agents/mcp/`; no external API; no SDK required.
- Six steps with checks; declaration in `opencode.json`.

## Sources

- <https://github.com/anthropics/skills>
- <https://modelcontextprotocol.io>
