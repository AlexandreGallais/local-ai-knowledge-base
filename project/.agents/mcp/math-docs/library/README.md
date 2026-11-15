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
| [linear-algebra-hefferon](linear-algebra-hefferon.index.md) | Linear Algebra, by Jim Hefferon: the LaTeX source of the book | 2026-11 | CC-BY-SA-2.5 OR GFDL-1.2-or-later | 161 files, 3.7 MB |
| [understanding-linear-algebra](understanding-linear-algebra.index.md) | Understanding Linear Algebra, by David Austin: the PreTeXt source of the book | 2026-11 | CC-BY-4.0 | 47 files, 1.7 MB |
| [discrete-mathematics](discrete-mathematics.index.md) | Discrete Mathematics: An Open Introduction, 3rd edition, by Oscar Levin: the PreTeXt source | 3 | CC-BY-SA-4.0 | 40 files, 0.9 MB |
| [applied-combinatorics](applied-combinatorics.index.md) | Applied Combinatorics, by Mitchel T. Keller and William T. Trotter: the PreTeXt source | 2026-11 | CC-BY-SA-4.0 | 179 files, 1.6 MB |
| [linear-algebra-beezer](linear-algebra-beezer.index.md) | A First Course in Linear Algebra, by Robert A. Beezer: the XML source of the book | 2026-11 | GFDL-1.2-or-later | 53 files, 2.5 MB |
