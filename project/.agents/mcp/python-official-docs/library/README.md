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
| [numpy](numpy.index.md) | NumPy: the user guide, the fundamentals (arrays, indexing, broadcasting, dtypes), the reference pages and the NumPy for MATLAB users guide | 2.5 | BSD-3-Clause | 331 files, 2.5 MB |
| [numpy-api](numpy-api.index.md) | NumPy: the API of its Python functions (linspace, arange, meshgrid, interp, linalg, fft, random, polynomial...), from their docstrings | 2.5 | BSD-3-Clause | 119 files, 1.5 MB |
| [pandas](pandas.index.md) | pandas: the user guide (DataFrame, indexing, group by, merge, reshaping, time series, I/O to CSV, Excel, SQL, Parquet) and the getting started guides | 3.1 | BSD-3-Clause | 92 files, 1.3 MB |
| [matplotlib](matplotlib.index.md) | Matplotlib: the user guide (figures, axes, artists, plot types, colors, text, animations, backends) and the API pages | 3.11 | LicenseRef-Matplotlib | 226 files, 0.7 MB |
| [pytest](pytest.index.md) | pytest: writing and running tests, fixtures, parametrize, markers, plugins, configuration and the reference of every API and option | 9.2 | MIT | 71 files, 2.7 MB |
| [pydantic](pydantic.index.md) | Pydantic 2: data validation with type hints (models, fields, validators, serialization, settings, JSON schema) | 2.14 | MIT | 91 files, 0.7 MB |
| [fastapi](fastapi.index.md) | FastAPI: web APIs with Python type hints (path and query parameters, request bodies, dependencies, security, WebSockets, background tasks, testing, deployment) | 0.165 | MIT | 159 files, 1.5 MB |
