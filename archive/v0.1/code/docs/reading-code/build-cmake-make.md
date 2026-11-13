---
id: reading-code-build-cmake-make
title: Reading CMakeLists.txt and Makefile
topic: reading-code
summary: What CMakeLists.txt and a Makefile say about a C or C++ project, with targets, dependencies, macros and standard.
tool: cmake
version: "4"
checked: 2026-11-13
sources: [S1, S2]
license: MIT (own words; facts summarized from the sources)
variant: files
---

# Reading CMakeLists.txt and Makefile

Contents: 1. CMakeLists.txt · 2. Makefile · 3. What to take before explaining · Sources

## 1. CMakeLists.txt (CMake build)

| You read | What it says about the project | C# landmark |
| --- | --- | --- |
| `add_executable`, `add_library` (`STATIC`, `SHARED`, `MODULE`, `OBJECT`, `INTERFACE`) | The targets: programs and libraries, and their kind [S1] | `OutputType` of a `.csproj` |
| `target_link_libraries(target PRIVATE or PUBLIC or INTERFACE dependency)` | The dependencies; `PUBLIC` and `INTERFACE` pass on to users of the target [S1] | `ProjectReference`, `PackageReference` |
| `target_compile_definitions` | Macros given to the compiler (`-D`): they decide the `#ifdef` branches [S1] | `DefineConstants` |
| `target_compile_features`, `target_include_directories` | The minimum language standard; where headers are found [S1] | `LangVersion` |
| Target `Namespace::name`, `$<…>` expression, `CMAKE_BUILD_TYPE` | Imported target or alias; value computed at generation; configuration (`Debug`, `Release`, `RelWithDebInfo`, `MinSizeRel`) [S1] | Build configuration |

## 2. Makefile (GNU Make)

| You read | Meaning |
| --- | --- |
| `$@`, `$<`, `$^`, `$?`, `$*` | Target, first prerequisite, all prerequisites, newer prerequisites, pattern stem [S2] |
| `include`, `ifdef`, `ifeq`, `define`, `export` | Another file read; conditions; multi-line variable; variable passed to sub-processes [S2] |
| `$(wildcard …)`, `$(patsubst …)`, `$(shell …)`, `$(foreach …)`, `$(call …)` | Computed file lists and commands [S2] |

The GNU Make manual is under GFDL: described here in own words.

## 3. What to take before explaining (C and C++ build)

- The language standard: `target_compile_features` or the standard property.
- The defined macros: they say which `#ifdef` branch is compiled.
- The dependencies: they explain an unknown name (library, generated code).

## Sources

- [S1] Kitware, "cmake-buildsystem(7)", CMake 4.5.0, <https://cmake.org/cmake/help/latest/manual/cmake-buildsystem.7.html>, read 2026-11-12, BSD 3-Clause, summarized.
- [S2] Free Software Foundation, "Quick Reference", GNU make 4.4.1, <https://www.gnu.org/software/make/manual/html_node/Quick-Reference.html>, read 2026-11-12, GFDL 1.3, summarized in own words.
