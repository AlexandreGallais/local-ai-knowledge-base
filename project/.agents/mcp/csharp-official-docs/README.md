# Brick `csharp-official-docs`

The official documentation of C# and .NET: the language, the .NET guides and fundamentals (dependency injection, configuration, logging, the CA and IDE analysis rules), the architecture guides, ASP.NET Core, EF Core, .NET Aspire, and the API reference: the XML documentation of the ASP.NET Core shared framework (the base class library included) and of EF Core, from their NuGet packages. Also the desktop guides of .NET (WPF and Windows Forms), .NET MAUI, xUnit.net, NUnit and Polly.

Each file is the official file, unchanged, in its own format (Markdown, reStructuredText, AsciiDoc,
LaTeX, Texinfo, PreTeXt, XML, HTML), at a noted version. An API reference that lives in the
comments of the source code is taken from those comments, unchanged. The MCP server searches the
documentation and returns one section at a time.

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
node .agents/mcp/csharp-official-docs/build-index.ts
python3 .agents/mcp/csharp-official-docs/build_index.py   # the same, without Node
```

## Set aside

- The code samples (`snippets/`) and the images (`media/`) of the guides.
- The API of the other NuGet packages: add one with its own source in `library/sources.json`.
- The ECMA XML of `dotnet/dotnet-api-docs` (135 MB): the XML documentation of the packages above
  already gives the base class library.

## Licenses

The .NET guides, the desktop guides and .NET MAUI are under CC BY 4.0; .NET Aspire, ASP.NET Core, EF Core and NUnit under MIT; xUnit.net under Apache 2.0; Polly under BSD 3-Clause. The documentation of Avalonia is left out: its repository states no license. `THIRD_PARTY_NOTICES.md` gives each source with its attribution, and `licenses/`
holds the text of each license. The code of this brick (its `.ts` and `.py` files) is under the MIT License of
the base.

## Remove it

Delete this folder, then remove the line `csharp-official-docs` from `opencode.json` (the next import of the kit
removes it too). The other bricks do not use it.
