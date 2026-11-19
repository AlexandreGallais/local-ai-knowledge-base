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
| [cppreference](cppreference.index.md) | cppreference.com: the C and C++ languages and standard libraries, offline HTML book converted to Markdown | 2025-02 | CC-BY-SA-3.0 OR GFDL-1.3-or-later | 6639 files, 21.2 MB |
| [cmake](cmake.index.md) | CMake documentation: commands, variables, properties, modules, the cmake tool | 4.5 | BSD-3-Clause | 2591 files, 4.2 MB |
| [clang](clang.index.md) | Clang documentation: the user manual, diagnostics, sanitizers, language extensions, clang-tidy is apart | 23.1 | Apache-2.0 WITH LLVM-exception | 130 files, 3.6 MB |
| [qt-guides](qt-guides.index.md) | Qt 6 (Qt Base): the guides and overviews of each module, written in qdoc (signals and slots, the object model, containers, threads, events, painting, model/view, layouts, style sheets, network, SQL, Qt Test) | 6.12 | GFDL-1.3-no-invariants-only | 249 files, 2.5 MB |
| [qt-api](qt-api.index.md) | Qt 6 (Qt Base): the reference of every class and function of Qt Core, Qt GUI, Qt Widgets, Qt Network, Qt Concurrent, Qt Test, Qt SQL, Qt XML, Qt D-Bus, Qt Print Support and Qt OpenGL, taken from the qdoc comments of the code | 6.12 | LGPL-3.0-only OR GPL-2.0-only OR GPL-3.0-only | 724 files, 9.9 MB |
| [qt-quick-guides](qt-quick-guides.index.md) | Qt 6 (Qt Declarative): the guides of QML and Qt Quick, written in qdoc (the QML language, property bindings, signals, JavaScript in QML, C++ integration, Qt Quick items, positioners, animations, states, models and views) | 6.12 | GFDL-1.3-no-invariants-only | 274 files, 1.7 MB |
| [qt-quick-api](qt-quick-api.index.md) | Qt 6 (Qt Declarative): the reference of the QML types and C++ classes of Qt QML, Qt Quick and Qt Quick Controls, taken from the qdoc comments of the code | 6.12 | LGPL-3.0-only OR GPL-2.0-only OR GPL-3.0-only | 216 files, 2.0 MB |
| [googletest](googletest.index.md) | GoogleTest and GoogleMock: the primer, the assertions (EXPECT_EQ, ASSERT_THAT...), test fixtures, parameterized tests, matchers and mocks | 1.18 | BSD-3-Clause | 19 files, 0.5 MB |
| [catch2](catch2.index.md) | Catch2: test cases, sections, assertions, matchers, generators, benchmarks and its command line | 3.16 | BSL-1.0 | 35 files, 0.4 MB |
| [fmt](fmt.index.md) | {fmt}: the format string syntax, the API (fmt::format, fmt::print) and std::format compatibility | 12.2 | MIT | 5 files, 0.2 MB |
| [nlohmann-json](nlohmann-json.index.md) | JSON for Modern C++ (nlohmann/json): the API of basic_json, parsing, serialization, arbitrary type conversions, JSON Pointer and Patch, binary formats | 3.12 | MIT | 235 files, 0.8 MB |
| [conan](conan.index.md) | Conan 2: the C and C++ package manager (conanfile.py and conanfile.txt, profiles, generators for CMake, the commands, creating and uploading packages, CI) | 2 | MIT | 316 files, 2.4 MB |
| [vcpkg](vcpkg.index.md) | vcpkg: the C and C++ package manager of Microsoft (manifest mode, triplets for Windows, Linux and cross-compiling, CMake integration, binary caching, registries) | main | MIT | 207 files, 0.9 MB |
| [meson](meson.index.md) | Meson: the build system (meson.build syntax, reference of every function, dependencies, cross-compilation files, subprojects) | 1.12 | Apache-2.0 | 161 files, 1.1 MB |
| [eigen](eigen.index.md) | Eigen: linear algebra in C++ (matrices and vectors, arithmetic, block operations, decompositions and linear solvers, geometry and rotations, sparse matrices) | 5.0 | MPL-2.0 | 58 files, 0.4 MB |
