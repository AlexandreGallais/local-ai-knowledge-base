---
name: choose-version
description: Choose the next version number with Semantic Versioning 2.0.0, from the commits since the last release. Use when the user asks which version to release, or asks to tag a release.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Choose a version number

## Rules

- A version is `MAJOR.MINOR.PATCH`: three whole numbers, no leading zero.
- Read the commits since the last release. The highest change decides:

  | Commits since the last release | Next version from 1.4.2 |
  | --- | --- |
  | At least one breaking change: `!` before the colon, or a `BREAKING CHANGE:` footer | `2.0.0`: MAJOR + 1, MINOR and PATCH back to 0 |
  | Else at least one `feat` | `1.5.0`: MINOR + 1, PATCH back to 0 |
  | Else at least one `fix` or `perf` | `1.4.3`: PATCH + 1 |
  | Only `docs`, `style`, `refactor`, `test`, `build`, `ci` or `chore` | No release needed. If the user wants one: `1.4.3` |

- Before 1.0.0, anything may change. This base uses one rule: a breaking change gives MINOR + 1, everything else PATCH + 1. Say that it is a convention.
- A pre-release adds a hyphen and dot-separated identifiers: `2.0.0-rc.1`. It comes before `2.0.0`.
- Build metadata after a plus sign (`2.0.0+build.7`) does not change the order of versions.
- Never reuse a version that was released. Never go back to a lower version.
- `v1.4.2` is a tag name, not a version. Use the tag form the project already uses.
- Never search the web. Never open a URL.

## Steps

1. Find the last released version and the commits since then. If the user gave them, use them.

<!-- files:begin id=commits -->

2. Run `git describe --tags --abbrev=0` to get the last tag. If there is no tag, ask the user for the current version.
3. Run `git log <tag>..HEAD --format="%s%n%b"` to list the commits since that tag.

<!-- files:end -->

4. Mark each commit as breaking, feature, fix or other, with the table above.
5. Take the highest change. Compute the next version from the last one.
6. Give the version, the commit that decided it, and the tag name to create.

<!-- files:begin id=tag -->

7. Create the tag only if the user asked to: `git tag -a <tag> -m "<tag>"`. Never push it without the user's word.

<!-- files:end -->

## Example

Last version `0.3.1`. Commits since then:

```text
feat(alarms): add the alarm history view
fix(pumps): stop the pump when the tank is empty
docs: explain the alarm priorities
```

Wrong: `1.0.0`. Nothing asks for a first stable release.

Right: `0.4.0`, decided by `feat(alarms): add the alarm history view`. Tag: `v0.4.0` if the project tags with a `v`.

## Pitfalls

- A breaking change written only in the body, without `BREAKING CHANGE:`: ask the user before you choose.
- Commits that do not follow Conventional Commits: ask the user what each one changes.
- The version of a package file that differs from the last tag: say it, and ask which one is right.

## Final check

- Did the highest change of all the commits decide the version?
- Did MINOR and PATCH go back to 0 where the table says so?
- Did you create or push nothing that the user did not ask for?

## Sources

- Semantic Versioning 2.0.0, semver.org, CC BY 3.0, summarized.
- Conventional Commits 1.0.0, conventionalcommits.org, CC BY 3.0, summarized.
