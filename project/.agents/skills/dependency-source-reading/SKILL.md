---
name: dependency-source-reading
description: "Reads the installed source or type definitions of a dependency when the documentation is silent or ambiguous - node_modules, site-packages, ~/.cargo/registry, ~/.m2, ~/.nuget. Use when the docs do not answer how a library behaves, when an option or default is unclear, or when the library behaves differently from its documentation."
metadata:
  id: DOC-06
  stars: "4"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# Dependency source reading

**Core rule:** the installed code is the truth for the installed version: find the function in it and read only that part.

## Where the installed code is

| Ecosystem | Find the package folder |
| --- | --- |
| npm | `node_modules/<pkg>/`; types in `*.d.ts`; `npm ls <pkg>` for the version |
| Python | `python3 -c "import <mod>, os; print(os.path.dirname(<mod>.__file__))"` |
| Rust | `~/.cargo/registry/src/*/<crate>-<version>/` |
| Java | `~/.m2/repository/<group path>/<artifact>/<version>/` (sources jar if downloaded) |
| .NET | `~/.nuget/packages/<id>/<version>/` (XML docs beside the DLL) |
| C and C++ | headers under `/usr/include`, `build/_deps`, or the Conan or vcpkg cache |

## Procedure

1. Find the package folder and its version with the table.
   - Check: the folder exists and the version matches the lockfile.
2. Search the symbol: `grep -rn "<function or option>" <folder> --include='*.ts' --include='*.d.ts' --include='*.py' | head -n 20`.
   - Check: you find its definition.
3. Read the definition and the default values with `read` and a line range.
   - Check: you can quote the line that sets the behaviour.
4. Write what you found with its file and line in your report.
   - Check: the claim is labelled verified with that location.

## Stop and ask the human if

- Only compiled code is present (no sources, no types) and the docs do not answer.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Read the whole library." | Search the symbol, read its lines. |
| "Patch node_modules to fix it." | Never edit installed packages; they are replaced at the next install. |

## Definition of done

- [ ] The behaviour is quoted from the installed code, with file and line.
- [ ] No installed package was modified.
