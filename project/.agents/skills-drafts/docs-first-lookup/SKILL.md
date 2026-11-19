---
name: docs-first-lookup
description: "Makes the local documentation servers the first source before using an API - which server, how to query, one section at a time, cite the page. Use when about to use a library, framework, CLI or language feature you have not checked in this session, when an API behaves unexpectedly, or when the user asks how something works."
metadata:
  id: DOC-01
  stars: "5"
  nature: process
  mode: B
  wave: V1
  load: always
---

# Docs-first lookup

**Core rule:** before using an API you have not checked in this session, search its documentation server, read one section, and cite the page in your report.

## When to use

- Use when: new API, option, config key, or a behaviour that surprises you.
- Do not use when: the exact usage already exists in this project and works (copy the local pattern).

## Procedure

1. Pick the server from the table below.
   - Check: the server name is in `opencode.json` of the project.
2. Search with the exact identifier first, then with two or three plain words: `<brick>_search_docs` with `query`.
   - Check: one of the first 3 results has the identifier or topic in its title.
3. Read one section: `<brick>_read_doc` with the path and section returned by the search.
   - Check: the section names the version it covers.
4. Compare its version with the installed one (`version-pinned-docs`).
   - Check: versions match, or the gap is written down.
5. Cite it in your report: `doc: <brick>, <path>#<section>`.
   - Check: the citation is in the final report.

| Topic | Server |
| --- | --- |
| JavaScript, TypeScript, Angular, Node.js, browser APIs | `js-official-docs` |
| C#, .NET, ASP.NET Core, EF Core | `csharp-official-docs` |
| Python and its libraries | `python-official-docs` |
| Rust, Cargo | `rust-official-docs` |
| Java, Maven, Gradle | `java-official-docs` |
| C, C++, CMake, Qt | `cpp-official-docs` |
| Docker, Podman, Compose, dev containers | `containers-official-docs` |
| Git | `git-official-docs` |
| GitLab CI, glab | `gitlab-official-docs` |
| Bash, sh, coreutils, PowerShell | `shell-official-docs` |
| Fedora, systemd, GNOME, Wayland | `linux-official-docs` |
| Electron, Tauri | `desktop-official-docs` |
| Markdown, Mermaid, Graphviz | `markdown-official-docs` |
| Maths, simulation, physics | `math-docs`, `simulation-official-docs`, `physics-docs` |

<!-- FILL: what=servers actually present in this installation; find=list the keys under mcp.servers in opencode.json; verify=each server answers one search_docs call with at least one result -->

<!-- FILL: what=one query per server that returns a relevant first result; find=run <brick>_search_docs with a common identifier of each topic; verify=the identifier is in the title of result 1 to 3 -->

## Query tips

- Exact identifiers win: `useEffect`, `HEALTHCHECK`, `git rebase`.
- No result: drop version numbers and punctuation, try the class or module name.
- Too many results: add the module name (`pathlib Path.glob`).

## Stop and ask the human if

- No server holds the topic: report it with `docs-gap-report` and say the answer is unverified.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I know this API by heart." | Your memory may be another version. Look it up. |
| "I will read the whole page." | Read one section; search again for the next. |

## Definition of done

- [ ] Each new API used has a documentation section read in this session.
- [ ] Each one is cited in the report with its server and section.

## Local completion checklist

- [ ] Servers actually present
- [ ] One verified query per server
