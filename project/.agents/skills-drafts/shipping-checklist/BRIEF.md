# BRIEF: shipping-checklist  (REL-03, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: shipping-checklist
description: "Manual: run only when the user explicitly asks for /shipping-checklist. Runs the team's checklist before a delivery - version, changelog, tests, approvals, rollback plan."
metadata:
  id: REL-03
  stars: "2"
  nature: process
  mode: R+C
  wave: V3
  load: manual
```

## Goal

A manual checklist of everything the team checks before shipping a version, filled from the team's real process, with a rollback plan.

## Questions the skill must answer

1. Which checks does the team require before a delivery (tests, sign-offs, documentation)?
2. How is the version and changelog prepared?
3. What is the rollback plan for each kind of delivery?
4. Who approves, and where is the approval recorded?
5. What is monitored after the delivery?

## Where to look (files, commands, people)

- release jobs in .gitlab-ci.yml, CHANGELOG.md, past releases (glab release list)
- the human: the delivery process and approvers

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "/shipping-checklist for 2.4.0", "run /shipping-checklist before delivery", "/shipping-checklist"; does not load on "tag the release", "write release notes", "fix the build".
- Paired task: run the checklist on a release candidate with a missing changelog entry; with the skill the gap is reported and blocks the delivery.

## Human input required (yes/no, what)

Yes: the delivery process, approvers and rollback rules.
