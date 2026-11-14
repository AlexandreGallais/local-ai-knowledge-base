# Official documentation library

The official documentation of the tools, converted to plain Markdown, at a pinned version, cut into
files of 16 KB at most, with one index per tool. The AI searches it with the docs tools of the base,
then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # headers, index, 16 KB at most, notices
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [python](python/index.md) | Python documentation: language reference, standard library, tutorial, how-to guides, FAQ and what is new in each version | 3.15 | PSF-2.0 AND 0BSD | 1033 files, 9.9 MB |
| [inkex](inkex/index.md) | Inkscape extensions: the API of the inkex package, from its docstrings | 1.4.1 | GPL-2.0-or-later | 59 files, 0.2 MB |
| [inkscape-extensions-guide](inkscape-extensions-guide/index.md) | Inkscape extensions: the guides and tutorials for extension authors | 1.4.1 | GPL-2.0-or-later | 20 files, 0.1 MB |
