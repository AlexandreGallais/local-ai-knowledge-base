---
name: git-branching
description: "Creates and maintains topic branches - naming (feature/, fix/...), right base, regular updates, one branch per subject. Use when starting work on a new task, before the first commit, when asked to name or create a branch, or when a branch is behind or has diverged from its target."
metadata:
  id: GIT-02
  stars: "5"
  nature: process
  mode: B
  wave: V1
  load: auto
---

# Git branching

**Core rule:** one subject per branch, created from the up-to-date target branch, named with the team's prefix.

## When to use

- Use when: a new task starts; you are on the default branch; the branch must catch up with its target.
- Do not use when: you continue the same subject on its existing branch.

## Procedure

1. Find the target branch and the naming rule (below).
   - Check: you can write the target and the prefix.
2. Update and branch: `git fetch origin`, then `git switch -c <prefix>/<issue>-<short-topic> origin/<target>`.
   - Check: `git branch --show-current` prints the new name; `git log -1` equals `origin/<target>`.
3. Push and track at the first push: `git push -u origin <branch>`.
   - Check: `git status -sb` shows `## <branch>...origin/<branch>`.
4. Catch up with the target on your own branch: `git fetch origin`, then `git rebase origin/<target>`.
   - Check: `git log --oneline origin/<target>..HEAD` lists only your commits.

## Team conventions

<!-- FILL: what=default target branch; find=git symbolic-ref refs/remotes/origin/HEAD; verify=the printed branch exists with git ls-remote --heads origin <name> -->

<!-- FILL: what=branch prefixes and pattern used by the team; find=git branch -r --format='%(refname:short)' | head -n 30 and CONTRIBUTING.md; verify=at least 5 recent remote branches follow the pattern -->

<!-- FILL: what=rebase or merge to catch up, as the team does; find=CONTRIBUTING.md and git log --merges --oneline -10 origin/<target>; verify=the rule matches the last 10 merge requests -->

Default if the team has no rule: `feat/`, `fix/`, `docs/`, `refactor/`, `test/`, `chore/`; lowercase words joined by hyphens; issue number first when there is one.

## Stop and ask the human if

- The branch is shared by other people and the rebase would rewrite pushed commits.
- The target branch is not obvious (release branches, several long-lived branches).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I will branch from my local main." | It may be stale. Branch from `origin/<target>` after a fetch. |
| "One branch for these two fixes." | Two subjects, two branches, two merge requests. |

## Definition of done

- [ ] Branch named with the team's prefix, from the up-to-date target.
- [ ] Tracked on origin; contains only this subject's commits.

## Local completion checklist

- [ ] Default target branch
- [ ] Branch prefixes and pattern
- [ ] Rebase or merge rule
