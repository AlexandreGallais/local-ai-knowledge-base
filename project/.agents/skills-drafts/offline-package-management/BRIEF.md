# BRIEF: offline-package-management  (CTR-07, 5 stars, V1)

## Final frontmatter (do not change)

```yaml
name: offline-package-management
description: "Installs packages through the internal mirrors only - dnf, npm, pip, NuGet, Maven, Cargo - with the config files to read and the checks to run. Use when installing or restoring dependencies, when npm install, pip install, dotnet restore, mvn or cargo build downloads, or when a package cannot be found or fetched."
metadata:
  id: CTR-07
  stars: "5"
  nature: reference
  mode: C
  wave: V1
  load: auto
```

## Goal

A reference skill that gives, for each package manager, the config file that points to the internal mirror, the exact install and restore commands, and a check that the mirror is used. It must let the agent install what a project needs without asking the human each time, and stop cleanly when a package is missing from the mirror.

## Questions the skill must answer

1. For dnf, npm, pip, NuGet, Maven and Cargo: which file sets the mirror (user, project, system level)?
2. What is the install or restore command for a project (`npm ci`, `pip install -r`, `dotnet restore`, `mvn -o`, `cargo fetch`...)?
3. How to check that a command used the mirror and not a public host?
4. What does each tool print when a package is missing from the mirror?
5. How are lockfiles and offline modes used (`npm ci`, `mvn -o`, `cargo --offline`, `pip --no-index`)?
6. Who to ask, and how, when a package must be added to the mirror?

## Where to look (files, commands, people)

- `~/.npmrc`, `.npmrc`, `npm config get registry`
- `~/.config/pip/pip.conf`, `/etc/pip.conf`, `pip config list`
- `~/.nuget/NuGet/NuGet.Config`, `dotnet nuget list source`
- `~/.m2/settings.xml`
- `~/.cargo/config.toml`
- `/etc/yum.repos.d/`, `dnf repolist`
- The draft `offline-environment` (same mirrors; do not duplicate its rules, cross-reference it).
- The human: the procedure to request a new package on the mirror.

## Required sections

- Core rule in the first 10 lines; one table per manager (file, install command, check); stop conditions; common mistakes; definition of done.
- Detail per manager in `references/<manager>.md` if the body passes 150 lines.

## Acceptance tests

- Trigger: loads on "install the dependencies", "npm install fails with E404", "dotnet restore cannot find package"; does not load on "write a test", "explain this code", "rename the branch".
- Paired task: restore a sample project with a lockfile; with the skill the agent uses the mirror and the lockfile command (`npm ci`), and the restore succeeds.

## Human input required (yes/no, what)

Yes: the procedure and the contact to request a missing package on the mirror. Every mirror URL is read from the machine, never asked or guessed.
