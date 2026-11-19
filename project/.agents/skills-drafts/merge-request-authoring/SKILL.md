---
name: merge-request-authoring
description: "Writes and opens a GitLab merge request - title, team template, linked issue, Draft, reviewers, labels. Use when the work on a branch is ready for review, when the user asks to open or update an MR, or when glab mr create is about to run."
metadata:
  id: GL-02
  stars: "4"
  nature: template
  mode: B
  wave: V1
  load: auto
---

# Merge request authoring

**Core rule:** open the merge request only after tests and build pass on the branch, with a description that says what changed, why, and how to test it.

## Procedure

1. Check the branch is ready: tests, build and lint green; `self-review` done; branch pushed.
   - Check: the outputs are quoted; `git status -sb` shows no commit ahead of origin.
2. Write the title: the main commit's subject, or `<type>(<scope>): <summary>` (72 characters at most).
   - Check: the title reads as the change, not as the branch name.
3. Write the description in a file `/tmp/mr-<branch>.md` from the team template, or the default below.
   - Check: every section is filled; the issue is referenced (`Closes #<iid>`).
4. Create it as a draft: `glab mr create --title "<title>" --description-file /tmp/mr-<branch>.md --target-branch <target> --draft --yes` and add `--label`, `--reviewer` as the team requires.
   - Check: `glab mr view` shows the MR, Draft, the right target.
5. Follow the pipeline (`mr-pipeline-watch` if present); mark ready only when it is green: `glab mr update <iid> --ready`.
   - Check: the pipeline status is success before the Draft is removed.

## Default description

```markdown
## What
<one paragraph>
## Why
<problem solved, link to the issue>
## How to test
1. <command or steps>
## Risks
<what could break; or "none known">
Closes #<iid>
```

## Team conventions

<!-- FILL: what=MR description template of the project; find=ls .gitlab/merge_request_templates/; verify=the template file exists and its sections are used in the last merged MRs (glab mr list --merged) -->

<!-- FILL: what=required labels and reviewers; find=CONTRIBUTING.md and glab mr view on 3 recent merged MRs; verify=the same labels appear on those MRs -->

<!-- FILL: what=squash and delete-source-branch policy; find=glab api projects/:id and read squash_option and remove_source_branch_after_merge; verify=the values match the flags written here -->

## Stop and ask the human if

- The reviewers or labels are not known.
- The MR would target a protected release branch.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Open it now, tests later." | Reviewers waste time on a red MR. Green first, or Draft. |
| "The description can be empty, commits explain it." | Reviewers read the description first. |

## Definition of done

- [ ] MR created as Draft with title, filled description, issue reference, labels and reviewers.
- [ ] Draft removed only after a green pipeline.

## Local completion checklist

- [ ] MR description template
- [ ] Labels and reviewers
- [ ] Squash and delete-branch policy
