---
name: name-branch
description: Use when the user asks for a branch name, or asks to create a branch - a name in the Conventional Branch 1.1.0 form, type/description in lowercase.
---

# Name a branch

## Rules

- Format: `<type>/<description>`.
- Type: one of the table below.
- Description: lowercase letters, digits and hyphens between words. Dots only in a version number.
- No uppercase letter, no underscore, no space, no other sign.
- No two hyphens or dots in a row. No hyphen or dot at the start or at the end of the description.
- A ticket number goes first in the description: `feature/issue-123-add-login`.
- Keep the description short: three to six words, in English.
- `main`, `master` and `develop` are trunk branches: they keep their name, without a type.
- The common rules keep the work on the current branch: create a branch only when the user asks for one.

| The work | Type |
| --- | --- |
| A new feature | `feature/` (or `feat/`) |
| A bug fix | `bugfix/` (or `fix/`) |
| An urgent fix of a release | `hotfix/` |
| The preparation of a release | `release/` |
| Anything else: tooling, dependencies, documentation | `chore/` |

Use the long or the short type the project already uses, never both.

## Steps

1. Ask what the branch is for, and the ticket number if there is one.
2. Choose the type from the table.
3. Write the description: the verb, then what it acts on.
4. Check the name against each rule above.
5. Run `git branch --list` to check that the name is free.
6. Create the branch only if the user asked to: `git switch -c <name>`. OpenCode asks the user to approve it.
7. Give the name in a `text` code block.

## Example

Wrong:

```text
Feature/Add_Alarm--Filter
```

Right:

```text
feature/issue-42-add-alarm-filter
release/v1.2.0
```

## Pitfalls

- A French description: write it in English.
- A description that copies the whole ticket title: keep three to six words.

## Final check

- Is the type in the table?
- Are there only lowercase letters, digits, hyphens, and dots in a version?
- Is there no double hyphen and no hyphen at either end?

## Sources

- Conventional Branch 1.1.0, conventionalbranch.org, CC BY 4.0, summarized.
