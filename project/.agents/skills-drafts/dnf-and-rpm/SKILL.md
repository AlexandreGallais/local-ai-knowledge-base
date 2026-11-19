---
name: dnf-and-rpm
description: "Finds and installs Fedora packages with dnf and queries them with rpm - which package provides a file or a command, installed versions, debuginfo, internal repositories. Use when a command or a header file is missing, when you see 'command not found' or 'fatal error: X.h: No such file', or when you need a package version."
metadata:
  id: LNX-05
  stars: "3"
  nature: reference
  mode: B
  wave: V2
  load: auto
---

# dnf and rpm

**Core rule:** find the package that provides what is missing with `dnf provides`, then install it through the internal repositories, with the human's approval when it needs root.

## Procedure

1. Find the package: `dnf provides '*/bin/<command>'` or `dnf provides '*/<header>.h'`.
   - Check: a package name is printed.
2. Check if it is installed and which version: `rpm -q <package>`.
   - Check: version printed, or "not installed".
3. Install it (in the dev container's Containerfile for a lasting change, or with `sudo dnf install <package>` after approval).
   - Check: `rpm -q <package>` prints the version.
4. For C and C++ headers, install the `-devel` package; for debug symbols, `dnf debuginfo-install <package>`.
   - Check: the header exists; `gdb` finds the symbols.

| Need | Command |
| --- | --- |
| Files of a package | `rpm -ql <package>` |
| Package owning a file | `rpm -qf <path>` |
| Info and version | `dnf info <package>` |
| Repositories in use | `dnf repolist` |

## This installation

<!-- FILL: what=internal dnf repositories and whether sudo is allowed in the dev container; find=dnf repolist and sudo -n true; verify=dnf provides of a common command answers from the internal repositories -->

<!-- FILL: what=whether debuginfo repositories are mirrored; find=dnf repolist --all | grep -i debug; verify=dnf debuginfo-install of a small package succeeds or is reported unavailable -->

## Stop and ask the human if

- Installing needs root and you have no approval, or the package is not on the internal repositories.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Install it in the running container only." | It is lost at rebuild. Put it in the Containerfile. |
| "The library package has the header." | Headers are in `-devel`. |

## Definition of done

- [ ] Missing file mapped to a package; package installed through the internal repositories, durably.

## Local completion checklist

- [ ] Internal repositories and sudo
- [ ] Debuginfo repositories
