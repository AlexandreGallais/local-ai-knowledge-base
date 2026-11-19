# BRIEF: team-review-checklists  (REV-06, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: team-review-checklists
description: "Applies the review checklists of this team and domain on top of the generic code review. Use when reviewing or preparing a merge request in this project, or when the team's review rules must be checked before merge."
metadata:
  id: REV-06
  stars: "2"
  nature: reference
  mode: C
  wave: V3
  load: auto
```

## Goal

The team's own review checklists, per area (simulation code, UI, data, infrastructure), so reviews by the agent check what this team checks.

## Questions the skill must answer

1. Which checklists does the team use, per area of code?
2. Which items are blocking?
3. Which domain rules are specific (units, numerical tolerances, real-time constraints, data handling)?
4. Who must review which areas?

## Where to look (files, commands, people)

- CONTRIBUTING.md, MR templates, past review comments (glab mr view --comments on merged MRs)
- the human: the checklists and blocking items

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "review this MR with our rules", "is this ready to merge for the team?", "check the simulation changes before merge"; does not load on "write the feature", "explain the review process of another company", "fix the lint error".
- Paired task: review an MR with a planted domain mistake (wrong unit); with the skill the mistake is reported as blocking.

## Human input required (yes/no, what)

Yes: the team's checklists and blocking items.
