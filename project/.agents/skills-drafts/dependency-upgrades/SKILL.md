---
name: dependency-upgrades
description: "Manual: run only when the user explicitly asks for /dependency-upgrades. Upgrades dependencies one at a time through the internal mirror - read the changelog, apply breaking changes, run the tests, commit each upgrade separately."
metadata:
  id: REL-01
  stars: "3"
  nature: process
  mode: B
  wave: V2
  load: manual
---

# Dependency upgrades

**Core rule:** one dependency per upgrade, its breaking changes read before installing, tests green before the next one.

## Procedure

1. List outdated packages: `npm outdated`, `uv pip list --outdated` or `pip list --outdated`, `cargo outdated` if installed, `dotnet list package --outdated`, `mvn versions:display-dependency-updates`.
   - Check: a list with current and target versions.
2. Pick one; read its changelog or release notes between the two versions (the package's `CHANGELOG.md` in the installed tarball, or the documentation server).
   - Check: breaking changes and deprecations are listed.
3. Upgrade it with the package manager through the mirror.
   - Check: manifest and lockfile changed for that package only.
4. Apply the breaking changes; run build, type check and tests.
   - Check: all green.
5. Commit: `build(deps): bump <pkg> from <old> to <new>`.
   - Check: one commit for this package.
6. Repeat for the next package.
   - Check: each upgrade has its own commit.

## This installation

<!-- FILL: what=outdated-check commands that work through the mirror; find=run each command of step 1 that applies to the project; verify=each prints a list without network error -->

<!-- FILL: what=where changelogs are available offline; find=ls node_modules/<pkg>/CHANGELOG.md and the documentation servers; verify=the changelog of one package is read locally -->

## Stop and ask the human if

- A major upgrade changes behaviour the project relies on, or the target version is not on the mirror.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Upgrade all, fix later." | Failures mix; nobody knows which upgrade broke what. |
| "Minor versions never break." | Read the notes anyway; many projects break in minors. |

## Definition of done

- [ ] Each upgrade: changelog read, one package, tests green, own commit.

## Local completion checklist

- [ ] Outdated-check commands
- [ ] Offline changelogs
