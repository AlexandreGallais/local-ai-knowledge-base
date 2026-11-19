---
name: toolchain-verification
description: "Checks versions and PATH of the toolchain (gcc, clang, cmake, node, npm, python, dotnet, java, mvn, rustc, cargo) before blaming the code. Use when a build or test behaves differently than expected, when you see 'command not found', 'unsupported version', 'requires node >=' or a syntax error that should not exist, or after entering a new container."
metadata:
  id: CTR-08
  stars: "4"
  nature: process
  mode: B
  wave: V1
  load: auto
---

# Toolchain verification

**Core rule:** before concluding to a bug, print the version and the path of each tool the failing command uses, and compare them with what the project requires.

## Procedure

1. List the tools the failing command calls.
   - Check: each tool has a name.
2. Print path and version of each: `command -v <tool>` and `<tool> --version`.
   - Check: every tool prints both, or "not found" is noted.
3. Read the required versions: `.nvmrc`, `engines` in `package.json`, `.python-version`, `global.json`, `rust-toolchain.toml`, `pom.xml` `maven.compiler.release`, `CMakeLists.txt` `cmake_minimum_required`.
   - Check: each tool has its required version, or "no requirement".
4. Compare; a mismatch is the first suspect.
   - Check: the report lists tool, required, installed, path.

| Tool | Version command |
| --- | --- |
| gcc, g++ | `gcc --version` |
| clang | `clang --version` |
| cmake | `cmake --version` |
| node, npm | `node --version`, `npm --version` |
| python | `python3 --version`, `python3 -c "import sys; print(sys.executable)"` |
| dotnet | `dotnet --info` |
| java, mvn, gradle | `java -version`, `mvn -v`, `gradle -v` |
| rustc, cargo | `rustc -V`, `cargo -V` |

## This installation

<!-- FILL: what=toolchain versions expected in the dev container; find=run the version commands of the table inside the container; verify=the versions match the image's documentation or Containerfile -->

<!-- FILL: what=version managers present (nvm, pyenv, rustup, sdkman) that change PATH; find=command -v nvm pyenv rustup sdk; verify=the active version printed by each manager equals the version command output -->

## Stop and ask the human if

- The required version is not installed and no internal mirror provides it.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It must be the code." | A wrong compiler or runtime gives errors that look like code bugs. |
| "`python` is Python 3." | Check `python3` and the path; virtual environments change it. |

## Definition of done

- [ ] Tool, required version, installed version and path listed for each tool involved.
- [ ] Any mismatch fixed or reported before debugging the code.

## Local completion checklist

- [ ] Toolchain versions in the dev container
- [ ] Version managers
