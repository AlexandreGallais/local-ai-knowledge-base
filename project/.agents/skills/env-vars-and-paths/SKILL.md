---
name: env-vars-and-paths
description: "Explains and fixes PATH, LD_LIBRARY_PATH, pkg-config and shell start-up files. Use when a command is not found though installed, the wrong version of a tool runs, a shared library is not found ('cannot open shared object file'), pkg-config cannot find a package, or a variable is set in one shell but not in another."
metadata:
  id: LNX-09
  stars: "3"
  nature: reference
  mode: A
  wave: V2
  load: auto
---

# Environment variables and paths

**Core rule:** find which file sets a variable and which binary actually runs before changing anything.

## Procedure

1. See what runs: `command -v <tool>` and `type -a <tool>` (all matches in PATH order).
   - Check: you know the path of the binary that runs.
2. See the variable: `printenv PATH | tr ':' '\n'`, `printenv LD_LIBRARY_PATH`.
   - Check: the expected folder is present, at the right position.
3. Find where it is set: `grep -n '<VAR>' ~/.bashrc ~/.bash_profile ~/.profile /etc/profile.d/*.sh 2>/dev/null`.
   - Check: you have the file and line.
4. Change it in the right place, for the right scope (table), then open a new shell or `source` the file.
   - Check: `command -v <tool>` now prints the expected path.

| Need | Where |
| --- | --- |
| For this command only | `VAR=value <command>` |
| For this shell session | `export VAR=value` |
| Interactive shells of this user | `~/.bashrc` |
| Login shells | `~/.bash_profile` or `~/.profile` |
| The dev container | `containerEnv` or `remoteEnv` in `devcontainer.json` |
| A missing shared library | install its `-devel` or runtime package; avoid `LD_LIBRARY_PATH` when a package exists |
| pkg-config | `pkg-config --modversion <name>`; `PKG_CONFIG_PATH` for a prefix outside the defaults |

## Stop and ask the human if

- The fix needs a change of system files under `/etc`.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It works in my shell, so in CI too." | CI and the editor do not read `~/.bashrc`. Set it where they read it. |
| "Prepend everything to PATH." | Order decides which tool runs; add only what you need. |

## Definition of done

- [ ] The running binary and the variable's origin identified.
- [ ] Change made in the right scope and verified in a new shell.
