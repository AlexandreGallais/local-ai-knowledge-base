# Brick `rust-official-docs`

The official documentation of Rust, in cleaned Markdown, at a noted version. The MCP server searches
it and returns one section at a time.

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
node .agents/mcp/rust-official-docs/build-index.ts
```

## Sources

| Tool | Source | Version | License | Files | Size |
| --- | --- | --- | --- | --- | --- |
| `rust-book` | rust-lang/book, `src/` | 2026-11 | MIT or Apache 2.0 | 183 | 1.3 MB |
| `rust-reference` | rust-lang/reference, `src/` | 2026-11 | MIT or Apache 2.0 | 159 | 1.0 MB |
| `rust-std` | rust-lang/rust, `library/core`, `library/alloc`, `library/std`, the documentation comments converted to Markdown | Rust 1.100.0 | MIT or Apache 2.0 | 754 | 3.2 MB |

The commits are in `library/lock.json`.

Set aside:

- Unstable items (`#[unstable]`) and hidden ones (`#[doc(hidden)]`): not usable on stable Rust.
- Items whose documentation a macro writes (`#[doc = ...]`, as the methods of the integer types):
  only rustdoc can expand them.
- Rust by Example and the Rustonomicon: the book and the reference cover the language first.

## Licenses

The Rust documentation is under MIT or Apache 2.0, at the choice of whoever uses it, as
`THIRD_PARTY_NOTICES.md` says with its attribution. The code of this brick (its `.ts` files) is
under the MIT License of the base.

## Remove it

Delete this folder, then remove the line `rust-official-docs` from `opencode.json` (the next import of
the kit removes it too). The other bricks do not use it.
