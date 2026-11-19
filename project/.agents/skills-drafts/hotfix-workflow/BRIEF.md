# BRIEF: hotfix-workflow  (REL-04, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: hotfix-workflow
description: "Manual: run only when the user explicitly asks for /hotfix-workflow. Ships an urgent fix - branch from the release tag, minimal fix, tests, backport to the main branch, new release."
metadata:
  id: REL-04
  stars: "3"
  nature: process
  mode: C
  wave: V2
  load: manual
```

## Goal

A manual process for the team's hotfixes: from the released tag to a new patch release and the backport, with the team's approvals.

## Questions the skill must answer

1. From which tag or release branch does a hotfix start, and how is it named?
2. Which checks and approvals are required before release?
3. How is the version bumped and tagged (team's SemVer rules)?
4. How is the fix brought back to the main branch (cherry-pick, merge)?
5. Who must be told, and where?

## Where to look (files, commands, people)

- git tag --list, release branches, CHANGELOG.md
- .gitlab-ci.yml release jobs
- the human: the hotfix policy and approvers

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "/hotfix-workflow for the crash in 2.3.1", "we need a /hotfix-workflow now", "start /hotfix-workflow on release 1.8"; does not load on "create a feature branch", "fix this failing test", "write release notes".
- Paired task: hotfix a planted bug on a tagged release; with the skill the patch tag, the changelog and the backport commit all exist and tests pass on both branches.

## Human input required (yes/no, what)

Yes: the hotfix policy, approvers and release rules.
