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
| [python](python.index.md) | Python documentation: language reference, standard library, tutorial, how-to guides, FAQ and what is new in each version | 3.15 | PSF-2.0 AND 0BSD | 422 files, 11.0 MB |
| [inkex](inkex.index.md) | Inkscape extensions: the API of the inkex package, from its docstrings | 1.4.1 | GPL-2.0-or-later | 59 files, 0.2 MB |
| [inkscape-extensions-guide](inkscape-extensions-guide.index.md) | Inkscape extensions: the guides and tutorials for extension authors | 1.4.1 | GPL-2.0-or-later | 18 files, 0.1 MB |
