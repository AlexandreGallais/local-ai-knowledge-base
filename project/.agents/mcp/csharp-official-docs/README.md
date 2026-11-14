# Brick `csharp-official-docs`

The official documentation of C# and .NET, in cleaned Markdown, at a noted version. The MCP server
searches it and returns one section at a time.

## What it holds

| File | Role |
| --- | --- |
| `server.ts` | The MCP server: `search_docs`, then `read_doc` on one section. The same code in every documentation brick. |
| `brick.json` | The name of the server and the words of its tools. |
| `search.ts` | The local search: words split as a person reads names, BM25 ranking, exact API names first, 10 hits at most. |
| `build-index.ts` | Builds `index/`, one plain-text file per tool. The server runs it when `index/` is missing. |
| `library/` | The documentation, one folder per tool, files of 16 KB at most, each with its header. |
| `licenses/`, `THIRD_PARTY_NOTICES.md` | The license of each source and its attribution. |
| `mcp.ts` | The small MCP core, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

`library/` and `index/` stay out of the project's Git (`.gitignore` of this folder): the import of
the brick brings `library/` back and builds `index/`.

## Usage

From the project root, after a change of `library/`:

```sh
node .agents/mcp/csharp-official-docs/build-index.ts
```

## Sources

| Tool | Source | Version | License | Files | Size |
| --- | --- | --- | --- | --- | --- |
| `csharp` | dotnet/docs, `docs/csharp` | C# 15 | CC BY 4.0 | 1,390 | 8.3 MB |
| `dotnet-core` | dotnet/docs, `docs/core` | .NET 11 | CC BY 4.0 | 2,585 | 9.6 MB |
| `dotnet-standard` | dotnet/docs, `docs/standard` | .NET 11 | CC BY 4.0 | 1,642 | 12.7 MB |
| `aspnetcore` | dotnet/AspNetCore.Docs, `aspnetcore` | ASP.NET Core 11 | CC BY 4.0 | 2,138 | 12.5 MB |
| `efcore` | dotnet/EntityFramework.Docs, `entity-framework` | EF Core 11 | CC BY 4.0 | 503 | 4.4 MB |
| `dotnet-api` | dotnet/dotnet-api-docs, ECMA XML converted to Markdown | .NET 11 | CC BY 4.0 | 4,718 | 33.9 MB |

The API reference holds 88 namespaces: `System` and its namespaces for collections, LINQ, I/O, text
and JSON, networking and HTTP, threading and tasks, cryptography, reflection, XML; and the
`Microsoft.Extensions` namespaces for caching, configuration, dependency injection, hosting, HTTP
and resilience, logging, options and time. The commits are in `library/lock.json`.

Set aside:

- The Windows desktop and .NET Framework namespaces (Windows Forms, WPF, `System.Drawing`, WCF,
  `System.Web`, Speech, Printing): not for a server or console application on Linux.
- The code samples of the API reference (its `snippets/` folder, several hundred MB): a page says
  where a sample was left out.
- The API reference of ASP.NET Core and EF Core: it is not published in a public repository; their
  guides are here.

## Licenses

The documentation of Microsoft is under CC BY 4.0, its code under MIT, as `THIRD_PARTY_NOTICES.md`
says with its attribution. The code of this brick (its `.ts` files) is under the MIT License of the
base.

## Remove it

Delete this folder, then remove the line `csharp-official-docs` from `opencode.json` (the next import
of the kit removes it too). The other bricks do not use it.
