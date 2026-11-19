# BRIEF: issue-workflow  (GL-07, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: issue-workflow
description: "Works with GitLab issues the way this team does - read, split, label, link, write acceptance criteria, move through the team's workflow states with glab. Use when asked to work on, create, triage, label, split or close an issue, or when an issue number like #123 is mentioned."
metadata:
  id: GL-07
  stars: "3"
  nature: process
  mode: C
  wave: V2
  load: auto
```

## Goal

A process skill that follows the team's issue workflow (labels, states, templates, links) with glab, so issues created or updated by the agent look like the team's own.

## Questions the skill must answer

1. Which labels and scoped labels mark type, priority and workflow state?
2. Which issue templates exist and when to use each?
3. What makes acceptance criteria acceptable to the team?
4. How are issues linked (related, blocks) and to merge requests (Closes #n)?
5. Who may close an issue and when?

## Where to look (files, commands, people)

- glab label list and ls .gitlab/issue_templates/
- glab issue list and glab issue view on recent issues
- the human: the workflow states and closing rule

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "triage issue 42", "split this issue into smaller ones", "create an issue for this bug"; does not load on "write a commit message", "run the tests", "fix the pipeline".
- Paired task: create an issue for a described bug; with the skill it uses the template, the right labels and testable acceptance criteria.

## Human input required (yes/no, what)

Yes: the workflow states, the label meanings and who closes issues.
