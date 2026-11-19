# Eval: versioning-and-changelog (GIT-09)

- Date: 2026-11-19
- Written by: the author working with Internet access; tasks not run against the local model.
- Model and version: to fill when run locally.
- Status: to test locally

## Trigger test

| Request | Expected |
| --- | --- |
| Prepare release 2.3. | load |
| Bump the version. | load |
| Write the changelog for this release. | load |
| Create a branch. | do not load |
| Fix a bug. | do not load |
| Explain SemVer history. | do not load |

## Paired tasks

| Task | Deterministic check | Without | With |
| --- | --- | --- | --- |
| Release with one breaking change since the last tag | major version bumped; changelog grouped; annotated tag | to test locally | to test locally |
| Fixes only since the last tag | patch version | to test locally | to test locally |

## Decision

To decide after the local run: keep if better or if it prevents a risky behaviour; shorten if neutral; rewrite or drop if worse.
