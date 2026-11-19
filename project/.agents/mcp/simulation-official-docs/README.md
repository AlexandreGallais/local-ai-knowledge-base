# Brick `simulation-official-docs`

The official documentation of simulation standards and tools, and of the free tools that do the work
of MATLAB, Simulink and Simscape:

- the Modelica language specification and the Modelica Standard Library 4.1 (Fluid, Thermal,
  Electrical, Mechanics, Blocks, StateGraph, Media, Magnetic, Math...), the OpenModelica User's Guide;
- the FMI 3.0 standard (the exchange of models between tools, which Simulink imports and exports as
  FMU), the SSP 2.0 standard (a system of several FMU), FMPy (simulating an FMU from Python);
- the GNU Octave manual and the help of each Octave function (a language close to MATLAB);
- the help of Scilab and Xcos (close to MATLAB and Simulink), with the conversion of each MATLAB
  function to Scilab;
- python-control (the control systems toolbox), the SciPy user guide (ODE solvers, signal
  processing, optimization) and SimPy (discrete-event simulation).

Each file is the official file, unchanged, in its own format (LaTeX, AsciiDoc, Texinfo, DocBook XML,
reStructuredText, Markdown), at a noted version. The documentation of the Modelica Standard Library
lives in the `Documentation(info="...")` annotations of its code: it is taken from them, unchanged,
after the declaration of each class; the help of the Octave functions likewise from their comments.
The MCP server searches the documentation and returns one section at a time.

## What it holds

| File | Role |
| --- | --- |
| `server.ts`, `server.py` | The MCP server, in Node and in Python, with the same answers: `search_docs`, then `read_doc` on one section. The same code in every documentation brick. |
| `brick.json` | The name of the server and the words of its tools. |
| `search.ts`, `search.py` | The local search, in Node and in Python: each file cut into sections by its format, BM25 ranking, exact API names first, 10 hits at most. |
| `build-index.ts`, `build_index.py` | Build `index/`, the same bytes in Node and in Python, one plain-text file per tool. The server runs it when `index/` is missing. |
| `library/` | The documentation, one folder per tool; `<tool>.index.md` lists its files; `README.md` lists the tools, their version, license and size; `lock.json` the commit of each. |
| `licenses/`, `THIRD_PARTY_NOTICES.md` | The license of each source, its copyright and its attribution. |
| `mcp.ts`, `mcp.py` | The small MCP core, in Node and in Python, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

`library/` and `index/` stay out of the project's Git (`.gitignore` of this folder): the import of
the brick brings `library/` back and builds `index/`.

## Usage

From the project root, after a change of `library/`:

```sh
node .agents/mcp/simulation-official-docs/build-index.ts
python3 .agents/mcp/simulation-official-docs/build_index.py   # the same, without Node
```

## Set aside

- MATLAB, Simulink, Simscape and Stateflow: their documentation is not free; read it in the help of MATLAB on the workstation.
- Dymola, Simcenter Amesim, SCADE, LabVIEW: not free.
- Stateflow has no free equivalent with its own documentation; `Modelica.StateGraph` comes closest.
- The C headers and XML schemas of FMI and SSP: code, which the standards describe.
- The API reference of SciPy and python-control: it lives in their docstrings; their user guides are
  there.

## Licenses

The Modelica specification and the FMI and SSP standards are under CC BY-SA 4.0; the Modelica
Standard Library under BSD 3-Clause; the OpenModelica User's Guide under CC BY 4.0. The Octave manual
is under the GNU permission notice of its file `octave.texi` (copy, change and translate it, under the
same notice), kept in `licenses/octave-manual/NOTICE`; the help of the Octave functions is under the
GNU GPL version 3 or later. The help of Scilab is under the GNU GPL version 2; FMPy under BSD 2-Clause;
python-control and SciPy under BSD 3-Clause; SimPy under MIT. `THIRD_PARTY_NOTICES.md` gives each
source with its attribution, and `licenses/` holds the text of each license. The code of this brick
(its `.ts` and `.py` files) is under the MIT License of the base.

## Remove it

Delete this folder, then remove the line `simulation-official-docs` from `opencode.json` (the next import of the kit
removes it too). The other bricks do not use it.
