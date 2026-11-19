---
name: versioning-and-changelog
description: "Chooses the next version with SemVer, writes the CHANGELOG entry in the Keep a Changelog format, and creates an annotated tag. Use when preparing a release, bumping a version number, writing the changelog, or tagging a commit."
metadata:
  id: GIT-09
  stars: "3"
  nature: process
  mode: A
  wave: V3
  load: auto
---

# Versioning and changelog

**Core rule:** the version number follows from the changes since the last tag: breaking change gives a major, new feature a minor, fixes only a patch.

## Procedure

1. List the changes since the last tag: `git describe --tags --abbrev=0`, then `git log --oneline <tag>..HEAD`.
   - Check: every commit is classified as breaking, feature or fix.
2. Compute the version with the table.
   - Check: the version is one step above the last tag.
3. Write the changelog entry at the top of `CHANGELOG.md`: `## [<version>] - <YYYY-MM-DD>`, then `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.
   - Check: each user-visible change appears once, in user terms.
4. Bump the version in the manifest(s) with the tool (`npm version <v> --no-git-tag-version`, `cargo set-version` if present, or an exact edit).
   - Check: the manifest shows the new version.
5. Commit, then tag: `git tag -a v<version> -m "v<version>"`.
   - Check: `git show v<version>` shows an annotated tag; push the tag only with approval.

| Changes since last tag | Next version from 1.4.2 |
| --- | --- |
| any breaking change | 2.0.0 |
| new features, no breaking change | 1.5.0 |
| fixes only | 1.4.3 |
| before 1.0.0, breaking change | minor bump: 0.5.0 to 0.6.0 |

## Stop and ask the human if

- It is unclear whether a change is breaking for users.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Paste the git log as changelog." | Users need effects, not commit subjects. |
| "Lightweight tags are fine." | Annotated tags carry the date and author; use `-a`. |

## Definition of done

- [ ] Version computed from classified changes; changelog entry; manifest bumped; annotated tag.
