# `.agents/`: what the AI gets in this project

This folder gives the AI of OpenCode the official documentation of the tools, kept locally, and the
skills of the project. Everything lives in the project; nothing is installed elsewhere, and no npm or
Python package is needed.

## How it works

OpenCode reads three entries at the root of the project:

| Entry | What OpenCode does with it |
| --- | --- |
| `AGENTS.md` | Loads it at every request: the rules of this project, written by the team. |
| `opencode.json` | Loads `.agents/rules.md` and the `rules.md` of each brick, and starts the documentation server of each brick. |
| `.agents/skills/` | Lists the skills by their name and description, and loads one when a task matches it. |

## Node or Python

Each documentation server exists twice, the same code in two languages, with the same answers:

| Runtime | Command in `opencode.json` | Needs |
| --- | --- | --- |
| Node | `["node", ".agents/mcp/<brick>/server.ts"]` | Node 22.18 or later |
| Python | `["python3", ".agents/mcp/<brick>/server.py"]` | Python 3.9 or later |

The import writes the Node command; `--runtime python` writes the Python one. To switch by hand,
change the command of each server in `mcp.servers` of `opencode.json`. Both read the same index.

## Usage

Nothing to start by hand: OpenCode starts the servers itself. Check that it sees them with `/mcps` in
OpenCode. Each server builds its search index in `index/` of its brick the first time it needs it.

## The bricks

Each folder of `.agents/mcp/` is a brick: one documentation server with everything it needs (its code
in Node and in Python, its documentation in `library/`, its licenses, its `rules.md` and its
`README.md`). No brick uses another.

| Brick | What it gives |
| --- | --- |
| `js-official-docs` | JavaScript and TypeScript: MDN, ARIA patterns, Angular (guides, API, CLI), TypeScript, RxJS, NgRx Signals, Node.js, npm, Vite, Vitest, Playwright, Storybook, Sass, Prettier, ESLint, Stylelint. |
| `csharp-official-docs` | C# and .NET: the language, .NET, ASP.NET Core, EF Core, Aspire and their API reference. |
| `python-official-docs` | Python, and the `inkex` API of the Inkscape extensions. |
| `rust-official-docs` | Rust: the book, the reference, Rust by Example, Cargo and the standard library. |
| `java-official-docs` | The Java SE API (`java.base`, `java.net.http`), Gradle and Maven. |
| `cpp-official-docs` | C and C++: cppreference, CMake, Clang. |
| `containers-official-docs` | Docker, Podman and its configuration files, Buildah, Skopeo, Podman Desktop, Compose, dev containers (specification, VS Code, features, images), the display and sound of the host in a container (x11docker, Distrobox, Toolbx), the OCI specifications. |
| `git-official-docs` | Git: every command, and Git LFS. |
| `linux-official-docs` | Linux, Fedora, GNOME and Wayland: Fedora Quick Docs, DNF5, RPM, the Linux man-pages, systemd, util-linux, the kernel admin guide, GNOME, GTK 4, GLib, GJS, Wayland and its protocols, PipeWire, Flatpak, SELinux. |
| `shell-official-docs` | Shell scripts and PowerShell: Bash, POSIX sh (dash), the GNU manuals of coreutils, sed, grep and find, ShellCheck, the Google Shell Style Guide, the tldr examples of each command (Linux, Windows), Bats, shfmt, PowerShell 7.5. |
| `desktop-official-docs` | Desktop applications, up to Windows: Electron, electron-builder, Electron Packager, Rebuild, Fuses and ASAR, Tauri 2, cross and cargo-xwin, Wine, NSIS, WiX, MSIX. |
| `markdown-official-docs` | Markdown and diagrams: Mermaid, CommonMark, GFM, Pandoc, markdownlint, KaTeX, Vega-Lite, Graphviz, D2. |
| `gitlab-official-docs` | GitLab CI/CD: the folder `doc/ci` of the GitLab documentation, GitLab Runner, the Dev Containers CLI, glab. |
| `simulation-official-docs` | Simulation: the Modelica language and Standard Library, OpenModelica, the FMI and SSP standards, FMPy, Octave, Scilab and Xcos, python-control, SciPy, SimPy. |
| `math-docs` | Free mathematics textbooks, in LaTeX, PreTeXt and XML: linear algebra, discrete mathematics, combinatorics. |

Each file of the documentation is the official file, unchanged, in its own format. Keep only the
bricks the project needs: each one is its own pack in the export.

## Remove a brick

1. Delete its folder in `.agents/mcp/`.
2. Remove its line from `mcp.servers` of `opencode.json`. The next import of the kit does it too.
   Until then, OpenCode shows that server as failed; the others work.

## Add a brick

Paste its export parts beside the others and run `node import.ts` or `python3 import.py`: it writes the
folder and its line in `opencode.json`.

## Other files

- `package.json`: tells Node to read the TypeScript of the servers as ES modules, whatever the project
  says. Python does not need it.
- `.gitignore`: keeps `work/` (the journal of the calls to the servers) and `cache/` out of Git.
