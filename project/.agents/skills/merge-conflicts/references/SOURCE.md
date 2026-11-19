# Source of merge-conflicts

## Upstream

| Repository | Path | Commit | Licence |
| --- | --- | --- | --- |
| mattpocock/skills | `docs/engineering/resolving-merge-conflicts.md` (the skill is archived upstream; this page describes it) | `5863806dd4e15c63174bee4e7515a4256792ecfa` (2026-11-12) | MIT, Copyright (c) 2026 Matt Pocock |

Licence checked on 2026-11-19. Full text: `../../_licenses/mattpocock-skills-MIT.txt`.

## Kept

- Resolve by intent, not by text: read the commits behind each side before touching a hunk.
- Keep both intents when compatible; name what is dropped; invent nothing.
- Run the repository's checks before finishing the operation.

## Changed

- Written as six commands with checks; asking before an abort instead of never aborting.
- Lockfiles and generated files are regenerated, not hand-merged.

## Sources

- https://github.com/mattpocock/skills
