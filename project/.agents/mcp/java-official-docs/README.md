# Brick `java-official-docs`

The documentation of the Java SE API, from the Javadoc comments of OpenJDK, in cleaned Markdown, at a
noted version. The MCP server searches it and returns one section at a time.

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
node .agents/mcp/java-official-docs/build-index.ts
```

## Sources

| Tool | Source | Version | License | Files | Size |
| --- | --- | --- | --- | --- | --- |
| `java-se` | openjdk/jdk, the Javadoc of `java.base` and `java.net.http`, converted to Markdown | Java 25 (LTS), tag `jdk-25-ga` | GPL 2.0 with the Classpath exception | 1,587 | 11.1 MB |

Java 25 is the last long-term support version; Java 27 is out too. The commit is in
`library/lock.json`.

Set aside:

- The Java Language Specification, the JVM Specification and the Java tutorials of Oracle: their
  license does not allow a copy in a public repository.
- The other modules of the JDK (`java.sql`, `java.desktop`, `java.logging`...): `java.base` and the
  HTTP client cover what a service reads first.
- Members without their own Javadoc: they inherit it from their interface, documented there.

## Licenses

The OpenJDK source code, and so its converted Javadoc, is under the GNU GPL version 2 with the
Classpath exception: these files stay under it, in their own folder, as `THIRD_PARTY_NOTICES.md`
says. The code of this brick (its `.ts` files) is under the MIT License of the base.

## Remove it

Delete this folder, then remove the line `java-official-docs` from `opencode.json` (the next import of
the kit removes it too). The other bricks do not use it.
