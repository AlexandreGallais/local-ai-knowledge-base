---
name: version-pinned-docs
description: "Reads the exact installed version of a dependency from the lockfile or manifest before looking up its documentation, and reports version gaps. Use when about to use, upgrade or look up a library, framework, compiler or CLI, when docs and code disagree, or when an API seems missing or deprecated."
metadata:
  id: DOC-04
  stars: "4"
  nature: process
  mode: A
  wave: V1
  load: auto
---

# Version-pinned docs

**Core rule:** documentation counts only at the installed version; read the version first, then the docs of that version.

## Where the installed version is

| Ecosystem | Exact installed version | Declared range |
| --- | --- | --- |
| npm, pnpm, yarn | `npm ls <pkg> --depth=0`, `package-lock.json`, `pnpm-lock.yaml` | `package.json` |
| Python | `python3 -m pip show <pkg>`, `uv.lock`, `poetry.lock` | `pyproject.toml`, `requirements*.txt` |
| Rust | `cargo tree -i <crate> --depth 0`, `Cargo.lock` | `Cargo.toml` |
| Java | `mvn dependency:tree -Dincludes=<group>:<artifact>`, `gradle dependencies` | `pom.xml`, `build.gradle*` |
| .NET | `dotnet list package`, `packages.lock.json` | `*.csproj`, `Directory.Packages.props` |
| C and C++ | `conan list`, `vcpkg list`, `pkg-config --modversion <lib>` | `conanfile.*`, `vcpkg.json`, `CMakeLists.txt` |
| A tool | `<tool> --version` | the dev container image or CI image |

## Procedure

1. Read the installed version with the table.
   - Check: you can write `<name> <version>`.
2. Search the documentation server for that version: `<brick>_search_docs` then `<brick>_read_doc`; note the version the page covers.
   - Check: the page's version matches the major (and minor when it matters) of the installed one.
3. When they differ, say it: "doc covers X, installed is Y"; prefer the installed source or types (`dependency-source-reading` if present).
   - Check: the gap is written in your reply.

## Stop and ask the human if

- The lockfile and the installed version disagree (install out of date).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The latest docs are fine." | APIs change between majors. Use the installed one. |
| "The range in package.json is the version." | A range is not a version; read the lockfile. |

## Definition of done

- [ ] Installed version read from a command or a lockfile.
- [ ] Docs used match it, or the gap is reported.
