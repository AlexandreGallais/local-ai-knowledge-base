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
| [cppreference](cppreference.index.md) | cppreference.com: the C and C++ languages and standard libraries, offline HTML book | 2025-02 | CC-BY-SA-3.0 OR GFDL-1.3-or-later | 6640 files, 347.0 MB |
| [cmake](cmake.index.md) | CMake documentation: commands, variables, properties, modules, the cmake tool | 4.5 | BSD-3-Clause | 2591 files, 4.2 MB |
| [clang](clang.index.md) | Clang documentation: the user manual, diagnostics, sanitizers, language extensions, clang-tidy is apart | 23.1 | Apache-2.0 WITH LLVM-exception | 130 files, 3.6 MB |
| [gnu-make](gnu-make.index.md) | GNU Make manual | 4.4 | GFDL-1.3-or-later | 1 files, 0.5 MB |
| [gcc](gcc.index.md) | GCC manual: invoking GCC, options, C and C++ extensions, warnings | 16.2 | GFDL-1.3-or-later | 63 files, 6.1 MB |
