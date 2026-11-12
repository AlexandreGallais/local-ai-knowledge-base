---
name: write-commit-message
description: Write a commit message in the Conventional Commits format that passes commitlint with its conventional configuration. Use when the user asks for a commit message, or asks to commit changes.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Write a commit message

## Rules

- Write the message in English, whatever the language of the user.
- Header: `<type>(<scope>): <subject>`. The scope is optional: `<type>: <subject>`.
- Type: one of the table below, in lowercase.
- Subject: imperative mood, first letter in lowercase, no period at the end. Write "add", never "added" or "adds".
- Header: 100 characters at most. Aim for 72.
- Scope: the part of the code that changed, in lowercase, for example `valves` or `alarm-list`.
- Body: optional. Leave one blank line after the header. Say what changed and why, not how. Lines of 100 characters at most.
- Breaking change: put `!` just before the colon, and add a footer `BREAKING CHANGE: <what users must change>` after a blank line.
- One commit, one change. If the changes do two things, propose two commits.
- Never invent a change. Use only what the user says or what the changes show.
- Never search the web. Never open a URL.

## Choose the type

| The change | Type |
| --- | --- |
| Adds a feature for the user | `feat` |
| Fixes a bug | `fix` |
| Changes only documentation | `docs` |
| Changes only formatting, not the meaning | `style` |
| Changes code without a feature or a fix | `refactor` |
| Makes the code faster | `perf` |
| Adds or fixes tests only | `test` |
| Changes the build or the dependencies | `build` |
| Changes the CI configuration | `ci` |
| Anything else outside the source and the tests | `chore` |
| Undoes an earlier commit | `revert` |

## Steps

1. Find what changed and why. If the reason is not clear, ask the user one short question.

<!-- files:begin id=changes -->

2. Run `git status --short` and `git diff --staged --stat`. If nothing is staged, run `git diff --stat`.
3. Run `git diff --staged -- <file>` only for the files you need to understand. Read 300 lines of diff at most.

<!-- files:end -->

4. Choose the type from the table, and a scope from the folder or the module that changed.
5. Write the header. Add a body when the reason is not obvious from the header.
6. Check the message against each rule above.

<!-- files:begin id=commit -->

7. Commit only if the user asked to. Write the message to a file outside the repository, then run `git commit -F <file>`.

<!-- files:end -->

8. Give the message in a `text` code block. Then give the type you chose and why, in one sentence.

## Examples

Wrong (type in uppercase, final period):

```text
Fix: correct the pump start.
```

Wrong (subject starts with an uppercase letter):

```text
feat(valves): Add the close command
```

Wrong (no type):

```text
update the alarm list
```

Wrong (type not in the list):

```text
feature(valves): add the close command
```

Right:

```text
feat(valves): add the close command to the motorized valve
```

Right (body that says why):

```text
fix(pumps): stop the pump when the tank is empty

The pump kept running dry when the low level alarm was acknowledged.
```

Right (breaking change):

```text
feat(api)!: rename the valve state endpoint

BREAKING CHANGE: clients must call /valves/{id}/state instead of /valves/{id}/status.
```

## Pitfalls

- "Updated files" or "misc changes": the subject must say what changed.
- A past tense ("added", "fixed"): use the imperative ("add", "fix").
- A breaking change hidden in a `fix`: add `!` and the `BREAKING CHANGE:` footer.

## Final check

- Is the type in the table, in lowercase?
- Does the subject start with a lowercase verb, without a final period?
- Is the header 100 characters or fewer?

## Sources

- Conventional Commits 1.0.0, conventionalcommits.org, CC BY 3.0, summarized.
- commitlint, package @commitlint/config-conventional 21.2.4, MIT, rules read in the package, summarized.
