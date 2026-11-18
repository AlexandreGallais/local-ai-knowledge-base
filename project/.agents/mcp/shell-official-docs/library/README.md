# Official documentation library

The official documentation of the tools, at a pinned version, as its authors wrote it: each file is
copied unchanged, in its own format. An API reference that lives in the comments of the source code
is taken from those comments. `<tool>.index.md` lists the files of each tool. The AI searches them
with the tools of the brick, then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # every file indexed, every license and notice
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [bash](bash.index.md) | GNU Bash: the Bash Reference Manual (syntax, expansions, redirections, builtins, shell variables, arrays, job control) | 5.3 | GFDL-1.3-or-later | 1 files, 0.4 MB |
| [dash](dash.index.md) | dash: the manual page of the Debian Almquist shell, a POSIX sh | 0.5.13 | BSD-3-Clause | 1 files, 0.1 MB |
| [coreutils](coreutils.index.md) | GNU Coreutils: the manual of the basic file, text and shell utilities (ls, cp, mv, rm, cat, sort, cut, tr, date, test...) | 9.12 | GFDL-1.3-or-later | 1 files, 0.7 MB |
| [sed](sed.index.md) | GNU sed: the manual of the stream editor | 4.9 | GFDL-1.3-or-later | 1 files, 0.2 MB |
| [grep](grep.index.md) | GNU grep: the manual of grep, its options and regular expressions | 3.12 | GFDL-1.3-or-later | 1 files, 0.1 MB |
| [findutils](findutils.index.md) | GNU Findutils: the manual of find, xargs and locate | 4.10 | GFDL-1.3-or-later | 1 files, 0.2 MB |
| [shellcheck](shellcheck.index.md) | ShellCheck: its manual page and README (the checks it runs on shell scripts, its options and directives) | 0.11 | GPL-3.0-or-later | 2 files, 0.0 MB |
| [shell-style-guide](shell-style-guide.index.md) | Google Shell Style Guide: how to write maintainable Bash scripts | gh-pages | CC-BY-3.0 | 1 files, 0.0 MB |
| [tldr](tldr.index.md) | tldr pages: short practical examples of each command, for every platform, Linux and Windows | 2.3 | CC-BY-4.0 | 5113 files, 3.0 MB |
| [bats](bats.index.md) | Bats: the documentation of the Bash Automated Testing System | 1.14 | MIT | 15 files, 0.1 MB |
| [shfmt](shfmt.index.md) | shfmt and the sh package of Go: the README of the shell formatter and parser | 3.14 | BSD-3-Clause | 1 files, 0.0 MB |
| [powershell](powershell.index.md) | PowerShell: the reference of PowerShell 7.5 (about_ topics and every cmdlet) and the conceptual documentation (scripting, modules, install on Linux) | 7.5 | CC-BY-4.0 | 1110 files, 10.0 MB |
