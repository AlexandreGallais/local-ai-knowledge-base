---
name: commit-conventions
description: "Writes atomic commits with messages in the team's convention (Conventional Commits by default). Use when about to commit, when asked for a commit message, when splitting changes into commits, or when a commit-msg hook or commitlint rejects a message."
metadata:
  id: GIT-03
  stars: "4"
  nature: reference
  mode: B
  wave: V1
  load: auto
---

# Commit conventions

**Core rule:** one logical change per commit, and a message that follows the team's convention exactly.

## Procedure

1. Group the changes by logical unit; stage one unit by file or hunk (`git add <path>`, `git add -p <path>`).
   - Check: `git diff --cached --stat` shows one unit only.
2. Write the header: `<type>(<scope>): <subject>`, imperative, lowercase, no final period, 72 characters at most.
   - Check: the header length is 72 or less.
3. Add a body after a blank line when the why is not obvious: what changed and why, wrapped at 72.
   - Check: the blank line separates header and body.
4. Breaking change: `!` after the type or scope, and a `BREAKING CHANGE: <what>` footer.
   - Check: both are present for a breaking change.
5. Commit and read the result: `git log -1 --format=%B`.
   - Check: the message is exactly what you wrote; the hook, if any, passed.

## Types

| Type | For |
| --- | --- |
| `feat` | a new behaviour for users |
| `fix` | a bug fix |
| `docs` | documentation only |
| `refactor` | code change without behaviour change |
| `test` | tests only |
| `perf` | performance |
| `build`, `ci` | build system, pipeline |
| `chore` | maintenance that fits nothing else |

## Team conventions

<!-- FILL: what=commit convention of the team; find=git log --format=%s -30 origin/HEAD and CONTRIBUTING.md; verify=at least 25 of the 30 subjects match the convention written here -->

<!-- FILL: what=commit-msg hook or commitlint config; find=ls .husky .lefthook.yml commitlint.config.* .commitlintrc* 2>/dev/null; verify=a deliberately wrong message is rejected by git commit --dry-run or the hook -->

<!-- FILL: what=issue reference format in commits; find=git log --format=%B -50 | grep -E '#[0-9]+|[A-Z]+-[0-9]+' | head; verify=the format matches the GitLab issue references of the project -->

## Stop and ask the human if

- The team's convention contradicts Conventional Commits and is not written anywhere.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "One commit for everything is fine." | It cannot be reverted or reviewed in parts. |
| "`fix: stuff`" | The subject says what changed: `fix(parser): keep trailing zeros`. |

## Definition of done

- [ ] Each commit is one logical change.
- [ ] Each message follows the convention; the hook passed.

## Local completion checklist

- [ ] Team convention
- [ ] commit-msg hook or commitlint
- [ ] Issue reference format
