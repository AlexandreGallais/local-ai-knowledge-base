---
name: git-hooks
description: "Manual: run only when the user explicitly asks for /git-hooks. Sets up pre-commit hooks with pre-commit, Lefthook or Husky to run fast lint and tests before each commit."
metadata:
  id: GIT-12
  stars: "2"
  nature: tooling
  mode: B
  wave: V3
  load: manual
---

# Git hooks

**Core rule:** hooks run only fast checks on staged files, are installed with the project's tool from a committed config, and are never bypassed with `--no-verify` without a yes.

## Procedure

1. Choose the tool the project already uses, else the one matching its stack (table).
   - Check: the tool is on the internal mirror.
2. Write the committed config with fast checks on staged files: format check, lint, secret scan.
   - Check: the config file is in the repository.
3. Install the hooks: `pre-commit install`, `lefthook install`, or Husky through the `prepare` script.
   - Check: `.git/hooks/pre-commit` exists.
4. Test: stage a file with a lint error and commit.
   - Check: the commit is refused with the lint message; fixing it lets the commit pass.

| Stack | Tool |
| --- | --- |
| Python or mixed | pre-commit |
| Any, single binary | Lefthook |
| Node project | Husky with lint-staged |

## This installation

<!-- FILL: what=hook tool already used or allowed by the team; find=ls .pre-commit-config.yaml lefthook.yml .husky 2>/dev/null and ask the human; verify=the tool installs from the internal mirror -->

<!-- FILL: what=whether hook tools can fetch their plugins offline; find=pre-commit run --all-files once; verify=it runs without network access -->

## Stop and ask the human if

- Hooks would slow commits noticeably or the team has no hook policy.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Run the full test suite in the hook." | Slow hooks get bypassed. Keep it to seconds. |
| "`--no-verify` to get past it." | Fix the finding, or ask. |

## Definition of done

- [ ] Config committed; hooks installed; a bad commit is refused and a good one passes.

## Local completion checklist

- [ ] Hook tool
- [ ] Offline plugins
