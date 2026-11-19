---
name: plan-to-issues
description: "Manual: run only when the user explicitly asks for /plan-to-issues. Turns a plan or a spec into GitLab issues - vertical slices, blocking dependencies, labels - created with glab."
license: MIT
metadata:
  id: PLN-06
  stars: "3"
  nature: process
  mode: R+B
  wave: V2
  load: manual
---

# Plan to issues

**Core rule:** each issue is a vertical slice that can be demonstrated alone, states what blocks it, and is shown to the human before it is created.

## Procedure

1. Read the plan or spec (`PLAN.md`, a spec file, or the conversation).
   - Check: you can list its behaviours.
2. Draft the slices: each one a narrow path through every layer, testable alone; put refactors that ease the rest first.
   - Check: no slice is a single layer (except an expand-and-migrate refactor).
3. Write each issue: title, goal, acceptance criteria, "Blocked by #<n>", labels.
   - Check: every issue has acceptance criteria and its blockers.
4. Show the list to the human and wait for approval.
   - Check: approved or corrected.
5. Create them in dependency order: `glab issue create --title "<title>" --description "<text>" --label "<labels>"`, then add the blocking references once numbers exist.
   - Check: `glab issue list` shows them; each body cites its blockers.

## This installation

<!-- FILL: what=label set and issue template of the project; find=glab label list and ls .gitlab/issue_templates/; verify=labels used in the draft all exist -->

<!-- FILL: what=how blocking links are expressed (issue links feature or text); find=glab issue view on a recent linked issue and glab api projects/:id/issues/<iid>/links; verify=the method creates a visible link -->

## Stop and ask the human if

- The plan has open decisions: settle them first (`grill-me` or `ask-when-underspecified`).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "One issue per layer." | Layers cannot be demonstrated alone. Slice vertically. |
| "Create first, review later." | Issues are visible to the team at once. Approve first. |

## Definition of done

- [ ] Issues approved, created in order, with criteria, blockers and labels.

## References

- `references/SOURCE.md`: upstream and licence of this skill.

## Local completion checklist

- [ ] Labels and issue template
- [ ] Blocking link method
