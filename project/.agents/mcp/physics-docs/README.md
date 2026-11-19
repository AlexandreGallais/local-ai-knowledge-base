# Brick `physics-docs`

Free documentation of engineering physics, for the simulation of ships and submarines. There is no
"official documentation" of physics: this brick takes free articles, books and documented libraries,
as they are.

- Wikipedia articles, in six lists: ships and submarines (hull, stability, buoyancy, ballast,
  propulsion, batteries, navigation); underwater acoustics and sonar; fluid mechanics and hydraulics;
  thermodynamics and heat transfer; electricity and on-board power; control, numerical methods and
  nomograms.
- Seven Wikibooks books, every chapter: Fluid Mechanics, Engineering Thermodynamics, Engineering
  Acoustics, Circuit Theory, Electronics, Control Systems, Signals and Systems.
- The documented functions of fluids (friction factors, Colebrook, fittings, valves, pumps), ht (heat
  transfer, heat exchangers) and thermo (thermodynamics), taken from their docstrings; the tutorial of
  fluids; CoolProp (properties of water, seawater, air, refrigerants); Cantera (thermodynamics,
  kinetics, combustion); PyNomo (nomograms).

Each file is the source file, unchanged, in its own format (wikitext, reStructuredText, Markdown); the
documentation of fluids, ht and thermo is taken from their docstrings, unchanged. Each list of
articles is in `library/sources.json`: remove or add a title, then fetch the list again. The MCP server
searches the documentation and returns one section at a time.

## What it holds

| File | Role |
| --- | --- |
| `server.ts`, `server.py` | The MCP server, in Node and in Python, with the same answers: `search_docs`, then `read_doc` on one section. The same code in every documentation brick. |
| `brick.json` | The name of the server and the words of its tools. |
| `search.ts`, `search.py` | The local search, in Node and in Python: each file cut into sections by its format, BM25 ranking, exact API names first, 10 hits at most. |
| `build-index.ts`, `build_index.py` | Build `index/`, the same bytes in Node and in Python, one plain-text file per tool. The server runs it when `index/` is missing. |
| `library/` | The documentation, one folder per tool; `<tool>.index.md` lists its files; `README.md` lists the tools, their version, license and size; `lock.json` the identifier of each. |
| `licenses/`, `THIRD_PARTY_NOTICES.md` | The license of each source, its copyright and its attribution. |
| `mcp.ts`, `mcp.py` | The small MCP core, in Node and in Python, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

`library/` and `index/` stay out of the project's Git (`.gitignore` of this folder): the import of
the brick brings `library/` back and builds `index/`.

## Usage

From the project root, after a change of `library/`:

```sh
node .agents/mcp/physics-docs/build-index.ts
python3 .agents/mcp/physics-docs/build_index.py   # the same, without Node
```

## Set aside

- The textbooks under a "non commercial" license (most of OpenStax, MIT OpenCourseWare, most of
  LibreTexts) and the paid standards.
- The wikitext keeps its templates and references as they are: a formula written with a template
  reads in its wikitext form.

## Licenses

The Wikipedia articles and the Wikibooks books are under CC BY-SA 4.0: the history of each page on the
wiki names its authors. fluids, ht, thermo and CoolProp are under MIT; Cantera under BSD 3-Clause;
PyNomo under GPL 3.0 or later. `THIRD_PARTY_NOTICES.md` gives each source with its attribution, and
`licenses/` holds the text of each license. The code of this brick (its `.ts` and `.py` files) is under
the MIT License of the base.

## Remove it

Delete this folder, then remove the line `physics-docs` from `opencode.json` (the next import of the
kit removes it too). The other bricks do not use it.
