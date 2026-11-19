# Source of pipeline-failure-triage

## Upstream

| Repository | Path | Commit | Licence |
| --- | --- | --- | --- |
| openai/skills | `skills/.curated/gh-fix-ci/SKILL.md` | `49f948faa9258a0c61caceaf225e179651397431` (2026-06-23) | Apache-2.0 (`LICENSE.txt` of the skill folder) |

Licence checked on 2026-11-19. Full text: `../../../skills/_licenses/openai-skills-Apache-2.0.txt`. This skill is a derivative work: it states its changes below, as Apache-2.0 section 4 asks.

## Kept

- Locate failing checks, fetch their logs, summarise the failure snippet, propose a plan, implement only after explicit approval, recheck.

## Changed

- Transposed from GitHub to GitLab: `gh pr checks` and `gh run view --log` became `glab ci get` and `glab ci trace` (glab commands confirmed in the gitlab-official-docs brick, glab 1.131).
- Added the classification table (code, environment, infrastructure, flaky) and the local reproduction step.
- Removed the bundled Python script and external providers.

## Sources

- https://github.com/openai/skills
