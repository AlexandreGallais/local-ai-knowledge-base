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
| [modelica-spec](modelica-spec.index.md) | Modelica Language Specification: the LaTeX source of each chapter | 3.7 | CC-BY-SA-4.0 | 27 files, 1.2 MB |
| [fmi](fmi.index.md) | Functional Mock-up Interface (FMI) 3.0: the AsciiDoc source of the standard (model exchange, co-simulation, scheduled execution) | 3.0.2 | CC-BY-SA-4.0 | 27 files, 0.4 MB |
| [ssp](ssp.index.md) | System Structure and Parameterization (SSP) 2.0: the AsciiDoc source of the standard | 2.0.1 | CC-BY-SA-4.0 | 11 files, 0.1 MB |
| [octave-manual](octave-manual.index.md) | GNU Octave manual: the Texinfo source of each chapter | 11.3 | LicenseRef-GNU-permission-notice | 51 files, 0.9 MB |
| [octave-functions](octave-functions.index.md) | GNU Octave functions: the Texinfo help of each function file, which the manual calls with @DOCSTRING | 11.3 | GPL-3.0-or-later | 889 files, 1.3 MB |
