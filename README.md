# Knowledge base for a local AI

The official documentation of the tools a team uses, kept locally and served by MCP servers, with a
few rules and skills, so that a small local language model inside OpenCode CLI 2.x looks things up
instead of guessing them, without any access to the web.

## Status

- Next version, not released yet: a kit of documentation only, one brick per MCP server, each server in
  Node and in Python. Changes: [CHANGELOG.md](CHANGELOG.md).
- Version 0.1 is archived in [`archive/v0.1/`](archive/v0.1/README.md), unchanged, with its history.

## How it works

The kit, in [`project/`](project/), holds three entries, copied to the root of a project:

| Entry | Content |
| --- | --- |
| `AGENTS.md` | The rules of the project, owned by the team. |
| `opencode.json` | What OpenCode loads: the rules, and one local MCP server per brick. |
| `.agents/` | The common rules, the skills, and the documentation bricks in `.agents/mcp/`. |

To mount the base once into every dev container instead, `.agents/opencode/` holds the same
configuration in four files, for OpenCode 2.x or 1.x, with the servers run by Node or by Python. One
line of `devcontainer.json`, `OPENCODE_CONFIG`, names the one to load; the `opencode.json` of the
project stays its own and wins over it. [`.agents/README.md`](project/.agents/README.md#one-shared-folder-for-every-dev-container)
gives the line, the order in which OpenCode merges the files, and what the project keeps out of Git.

The skills follow the skill catalogue of the team: 142 finished skills in `.agents/skills/` (with
`CORE_RULES.md`, copied into `AGENTS.md`, and the generated `SKILLS_INDEX.md`), and 119 drafts in
`.agents/skills-drafts/` that are finished on the target machine. [`.agents/README.md`](project/.agents/README.md)
explains how to use, check, finish and add them.

Each folder of `.agents/mcp/` is a brick: one documentation server with everything it needs. Removing
the folder removes the server, its documentation and its rules, without breaking the other bricks.

| Brick | What the AI gets |
| --- | --- |
| `js-official-docs` | The JavaScript and TypeScript tools: MDN (JavaScript, HTML, CSS, Web APIs, SVG, HTTP, accessibility), the ARIA Authoring Practices Guide, Angular (guides, API reference, CLI), TypeScript (handbook, tsconfig options), RxJS and NgRx Signals (guides, API reference), Node.js, npm, Vite, Vitest, Playwright, Storybook, Sass, Prettier, EditorConfig, ESLint, Stylelint and their plugins; D3, Chart.js, Apache ECharts, three.js, Zod. |
| `csharp-official-docs` | C# and .NET: the language, the guides and fundamentals, the architecture guides, ASP.NET Core, EF Core, .NET Aspire, the API reference of ASP.NET Core and EF Core, WPF and Windows Forms, .NET MAUI, xUnit.net, NUnit, Polly. |
| `python-official-docs` | Python: language reference, standard library, tutorial, how-to guides, what is new; NumPy (user guide and API), pandas, Matplotlib, pytest, Pydantic, FastAPI; the `inkex` API of the Inkscape extensions and their guides. |
| `rust-official-docs` | Rust: the book, the reference, Rust by Example, the Cargo book and the standard library (`core`, `alloc`, `std`), Tokio, Serde. |
| `java-official-docs` | Java: the Java SE API of `java.base` and `java.net.http` (OpenJDK 25, LTS), JavaFX 27, JUnit 6, Mockito, Spring Framework 7, Spring Boot 4, Hibernate ORM 7, Log4j 2, picocli, Quarkus, Gradle and Maven. |
| `containers-official-docs` | Containers: the Dockerfile reference, the Docker manuals and CLI, Podman and its configuration files (`containers.conf`, `registries.conf`, `storage.conf`), Buildah, Skopeo, Podman Desktop, the Compose Specification, dev containers (the specification, containers.dev, VS Code, the reference features and images), the display and the sound of the host in a container (x11docker, Distrobox, Toolbx), the OCI specifications. |
| `git-official-docs` | Git: the manual page of every command, and Git LFS. |
| `linux-official-docs` | Linux, Fedora, GNOME and Wayland: Fedora Quick Docs and release notes, DNF5, RPM, the Linux man-pages (system calls, C library, file formats), systemd, util-linux, the kernel administration guide and userspace API, the GNOME developer documentation, GTK 4, GLib, GJS, Wayland, its protocols and _The Wayland Protocol_, PipeWire, Flatpak, the SELinux Notebook. |
| `shell-official-docs` | Shell scripts and PowerShell: the Bash Reference Manual, the manual page of dash (POSIX sh), the GNU manuals of coreutils, sed, grep and find, ShellCheck, the Google Shell Style Guide, the tldr pages (short examples of each command, Linux and Windows), Bats, shfmt, and PowerShell 7.5 (about_ topics, every cmdlet, the conceptual documentation). |
| `desktop-official-docs` | Desktop applications, up to Windows: Electron (guides, tutorials, every API), electron-builder (Windows installers, signing, auto-update), Electron Packager, Rebuild, Fuses and ASAR, Tauri 2, cross and cargo-xwin (Rust for Windows), the tools of Wine, the NSIS Users Manual, WiX Toolset, MSIX. |
| `markdown-official-docs` | Markdown and diagrams as text: Mermaid (every diagram, configuration, themes), the CommonMark and GitHub Flavored Markdown specifications, the Pandoc User's Guide, the markdownlint rules, KaTeX, Vega-Lite, Graphviz (DOT) and D2. |
| `cpp-official-docs` | C and C++: cppreference.com (converted to Markdown), CMake, Clang, Qt 6 (guides, the reference of every class, QML and Qt Quick), GoogleTest, Catch2, {fmt}, nlohmann/json, Eigen, Conan, vcpkg, Meson. |
| `gitlab-official-docs` | GitLab CI/CD: the folder `doc/ci` of the GitLab documentation (`.gitlab-ci.yml` and every keyword), GitLab Runner and its executors, the Dev Containers CLI to build and run a dev container in a CI job, glab (the GitLab CLI). |
| `simulation-official-docs` | Simulation: the Modelica language specification and the Modelica Standard Library (Fluid, Thermal, Electrical, Mechanics, Blocks, StateGraph, Media), the OpenModelica User's Guide, the FMI 3.0 standard (the exchange of models, which Simulink imports and exports as FMU), the SSP 2.0 standard, FMPy, the GNU Octave manual and functions, the help of Scilab and Xcos (with the conversion of each MATLAB function), python-control, the SciPy user guide and SimPy. MATLAB, Simulink, Simscape and Stateflow are not there: their documentation is not free. |
| `physics-docs` | Engineering physics for the simulation of ships and submarines: Wikipedia articles (ships and submarines, underwater acoustics and sonar, fluid mechanics, thermodynamics and heat transfer, electricity and on-board power, control, numerical methods, nomograms), seven Wikibooks books (fluids, thermodynamics, acoustics, circuits, electronics, control, signals), and the documented functions of fluids, ht, thermo, CoolProp, Cantera and PyNomo. |
| `math-docs` | Mathematics: free textbooks of linear algebra, discrete mathematics and combinatorics, in LaTeX and PreTeXt. |

Each brick searches its own documentation only, then gives one section at a time. Only the official
documentation is there, each file as its authors wrote it, in its own format (Markdown,
reStructuredText, AsciiDoc, LaTeX, Texinfo, PreTeXt, XML, HTML, roff, Halibut); an API reference that lives in the
comments of the code is taken from those comments; the HTML pages of cppreference.com are converted to
Markdown. Every source is under a free license (OSI and FSF licenses, CC0, CC BY, CC BY-SA), noted in
the `THIRD_PARTY_NOTICES.md` of its brick; `library/README.md` lists the sources, their versions and
sizes, and the `README.md` of the brick what was set aside and why.

Each server exists twice, in Node (`server.ts`, Node 22.18 or later) and in Python (`server.py`,
Python 3.9 or later): the same code, the same search index, the same answers, no package for either.
Use the one the machine has. [`project/.agents/README.md`](project/.agents/README.md) explains each
part, and the `README.md` of each brick says what it holds and how to remove it.

In a session, one agent works directly, with no per-project setup. It runs the commands it needs
itself, after your approval, and says "done" after the build and the tests of the project.

## From the export to the first conversation

The export is in `export/`, in three part sizes, one folder each: `2m`, `3m`, `4m`. They hold the same
content. Parts of 2 MB pass the paste on the workstation, parts of 5 MB do not. Each folder has one pack `kit` (`kit-001.txt`...), one pack per documentation
brick (`js-official-docs-001.txt`...) and the two import scripts, `import.ts` (Node 22.18 or later) and
`import.py` (Python 3, its standard library only): the same import, whichever the machine has. Python
reads parts compressed with gzip in every version, with zstd from 3.14, and not with brotli: for parts
in brotli, use `import.ts`. The first lines of a part name its compression.

The export of this repository is compressed with brotli, the smallest: paste it on a machine with Node.
Each size folder also holds `export.py`, to make parts for a machine with Python only (see step 4).

### 1. Find the largest size that pastes

1. On the workstation, create an empty folder, for example `~/paste-test`.
2. Create `kit-001.txt` there, open `export/4m/kit-001.txt` here, copy all of it, paste it into the
   new file, save. Paste `import.ts` (or `import.py`) the same way.
3. Run `node ~/paste-test/import.ts --target ~/paste-test-project` (or `python3 ~/paste-test/import.py
   --target ~/paste-test-project`) and read the first line:
   - "Installed in": the paste worked; keep this size.
   - "the content was damaged by the paste" or "the end of the part is missing": the paste cut or
     changed the text; try the next size down: 3m, then 2m.

### 2. Paste what the project needs

1. In an empty folder, paste the import script and every part of the size you keep: the parts of
   `kit`, and the parts of each documentation brick the project needs.
2. From the root of the project, run `node <that folder>/import.ts`, or `python3 <that folder>/import.py`.
   It takes every part, checks them all, then writes everything at once: the kit, each brick with its
   line in `opencode.json`, and the search index of each brick.
3. Add `--runtime python` to write the commands of the Python servers in `opencode.json`, for a machine
   without Node. Without it, the servers run by Node.
4. A damaged or missing part is named, and nothing is written: paste that part again, then run the
   command again.

In a project that exists, nothing the team wrote is replaced: `AGENTS.md` and the skills are written
only when missing, and the import lists every file it left aside. The bricks pasted are replaced whole;
the settings added to `opencode.json` stay, and the formatters an earlier version of the kit declared
there are removed.

### 3. Work

Open OpenCode CLI at the root of the project and describe what you want. Check that it sees the
servers: `/mcps` lists each documentation brick pasted. `opencode.json` is in the format of OpenCode
2.x; for OpenCode 1.x, use `.agents/opencode/opencode.node.v1.json` (or `python.v1`) through
`OPENCODE_CONFIG`, as [`.agents/README.md`](project/.agents/README.md#one-shared-folder-for-every-dev-container) shows.

### 4. Make parts for a machine with Python only

On a machine where the base is installed, `export.py` (Python 3, its standard library only) cuts it
again into parts compressed with gzip, which `import.py` reads in every version of Python:

1. Paste `export.py` beside the import script, then, from the root of the equipped project, run
   `python3 <that folder>/export.py`. The parts go into `export-gzip/`, in the three sizes; each size
   folder gets `import.py` and `import.ts` beside them.
2. `--sizes 2m` keeps only some sizes; `--packs kit,js-official-docs` only some packs; `--source`
   and `--out` name another project or another folder.
3. On the machine with Python only, paste one size folder and run `python3 import.py` there, as in
   step 2. The gzip parts are larger than the brotli ones: there are more of them to paste.

## Update the documentation of a tool

For the maintainers, on a machine with network access, with the build tools kept beside this
repository. The workstation never does it: it receives the new export.

1. See what is behind: `node scripts/update-tool.ts` lists each source with a newer release tag. In a
   project, `node .agents/mcp/js-official-docs/check-versions.ts` (or `python3
   .agents/mcp/js-official-docs/check_versions.py`) lists the tools whose documentation is behind the
   versions of `package.json`.
2. Move a source to its new tag, fetch it again, check it:
   `node scripts/update-tool.ts angular v23.0.0`, `node scripts/fetch-library.ts --tool angular`,
   `node scripts/check-library.ts`. For another language, name its brick:
   `node scripts/fetch-library.ts --brick python-official-docs`, then
   `node scripts/check-library.ts project/.agents/mcp/python-official-docs`.
3. After a change of the search or of the server of the documentation bricks, made in
   `js-official-docs` in Node and in Python, copy it to the others: `node scripts/sync-docs-bricks.ts`.
4. Run the tests, `node scripts/check-base.ts` and `node scripts/export.ts`, write the change in
   `CHANGELOG.md`, and deliver the new export.

## Layout

| Folder | Content |
| --- | --- |
| `project/` | The project kit: `AGENTS.md`, `opencode.json` and `.agents/`, bricks included. |
| `import.ts`, `import.py` | The import, in Node and in Python: the same work, the same messages. Both travel with the export. |
| `export.py` | The export in Python, gzip: cuts an equipped project into parts again. Travels with the export. |
| `export/` | The export of the last delivery, in three part sizes: 2, 3 and 4 MB. |
| `archive/v0.1/` | Version 0.1, unchanged. |

The tools that build, check and export this repository are kept outside it.

## License

MIT, see [LICENSE](LICENSE). The official documentation of a brick keeps its own license, listed in
the `THIRD_PARTY_NOTICES.md` of the brick with its copyright; the license files of each source are
copied unchanged in its `licenses/<tool>/`. MDN Web Docs content stays under CC BY-SA 2.5 in its own
folders.
