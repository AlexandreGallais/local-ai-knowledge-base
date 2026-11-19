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

## Skills

The skills follow the skill catalogue of the team (261 skills in 25 categories, built in waves V0 to V4).

| Path | What it holds |
| --- | --- |
| `skills/<name>/SKILL.md` | A finished skill, ready to use: written from scratch or adapted from an open-source skill (`references/SOURCE.md` gives its origin and licence). |
| `skills/CORE_RULES.md` | The rules that hold at every step, one line per always-loaded skill. `AGENTS.md` holds a copy: keep both identical. |
| `skills/SKILLS_INDEX.md` | The list of finished skills with their triggers, generated: never edit it by hand. |
| `skills/_templates/` | The family templates used to finish the seeds (stack playbook, tool reference). |
| `skills/_eval/` | One test plan per finished skill rated 3 stars or more, to run on this machine. |
| `skills/_licenses/` | The licence texts of the adapted skills. |
| `skills-drafts/<name>/` | An unfinished skill, completed on this machine: a skeleton with `FILL` markers, a `BRIEF.md` (written with the team) or a `SEED.md` (written from the documentation servers). |

Usage, from the root of the project:

```sh
node .agents/skills/skill-index/scripts/skill-index.ts search <words>    # find a skill
node .agents/skills/skill-index/scripts/skill-index.ts build             # rebuild the index after a change
node .agents/skills/skill-template/scripts/check-skill.ts .agents/skills/<name>   # check a skill
python3 .agents/skills/skill-template/scripts/check_skill.py .agents/skills/<name>  # the same, without Node
```

To finish a draft, follow its file: replace each `FILL` marker by the value found and checked on this
machine, or write the `SKILL.md` asked by `BRIEF.md` or `SEED.md`; then move the folder to `skills/`,
check it, test it with the skill `skill-testing`, and rebuild the index. To add a skill of the team, use
the skill `writing-skills`. To remove a skill, delete its folder and rebuild the index.

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
| `js-official-docs` | JavaScript and TypeScript: MDN, ARIA patterns, Angular (guides, API, CLI), TypeScript, RxJS, NgRx Signals, Node.js, npm, Vite, Vitest, Playwright, Storybook, Sass, Prettier, ESLint, Stylelint, D3, Chart.js, ECharts, three.js, Zod. |
| `csharp-official-docs` | C# and .NET: the language, .NET, ASP.NET Core, EF Core, Aspire and their API reference, WPF, Windows Forms, MAUI, xUnit.net, NUnit, Polly. |
| `python-official-docs` | Python, NumPy, pandas, Matplotlib, pytest, Pydantic, FastAPI, and the `inkex` API of the Inkscape extensions. |
| `rust-official-docs` | Rust: the book, the reference, Rust by Example, Cargo, the standard library, Tokio and Serde. |
| `java-official-docs` | The Java SE API (`java.base`, `java.net.http`), JavaFX, JUnit, Mockito, Spring, Spring Boot, Hibernate, Log4j, picocli, Quarkus, Gradle and Maven. |
| `cpp-official-docs` | C and C++: cppreference, CMake, Clang, Qt 6, GoogleTest, Catch2, {fmt}, nlohmann/json, Eigen, Conan, vcpkg, Meson. |
| `containers-official-docs` | Docker, Podman and its configuration files, Buildah, Skopeo, Podman Desktop, Compose, dev containers (specification, VS Code, features, images), the display and sound of the host in a container (x11docker, Distrobox, Toolbx), the OCI specifications. |
| `git-official-docs` | Git: every command, and Git LFS. |
| `linux-official-docs` | Linux, Fedora, GNOME and Wayland: Fedora Quick Docs, DNF5, RPM, the Linux man-pages, systemd, util-linux, the kernel admin guide, GNOME, GTK 4, GLib, GJS, Wayland and its protocols, PipeWire, Flatpak, SELinux. |
| `shell-official-docs` | Shell scripts and PowerShell: Bash, POSIX sh (dash), the GNU manuals of coreutils, sed, grep and find, ShellCheck, the Google Shell Style Guide, the tldr examples of each command (Linux, Windows), Bats, shfmt, PowerShell 7.5. |
| `desktop-official-docs` | Desktop applications, up to Windows: Electron, electron-builder, Electron Packager, Rebuild, Fuses and ASAR, Tauri 2, cross and cargo-xwin, Wine, NSIS, WiX, MSIX. |
| `markdown-official-docs` | Markdown and diagrams: Mermaid, CommonMark, GFM, Pandoc, markdownlint, KaTeX, Vega-Lite, Graphviz, D2. |
| `gitlab-official-docs` | GitLab CI/CD: the folder `doc/ci` of the GitLab documentation, GitLab Runner, the Dev Containers CLI, glab. |
| `simulation-official-docs` | Simulation: the Modelica language and Standard Library, OpenModelica, the FMI and SSP standards, FMPy, Octave, Scilab and Xcos, python-control, SciPy, SimPy. |
| `physics-docs` | Engineering physics: Wikipedia (naval, sonar, fluids, heat, electricity, control, nomograms), Wikibooks, fluids, ht, thermo, CoolProp, Cantera, PyNomo. |
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
