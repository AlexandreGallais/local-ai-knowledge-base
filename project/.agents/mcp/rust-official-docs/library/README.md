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
| [rust-book](rust-book/index.md) | The Rust Programming Language | 2026-11 | MIT OR Apache-2.0 | 183 files, 1.3 MB |
| [rust-reference](rust-reference/index.md) | The Rust Reference | 2026-11 | MIT OR Apache-2.0 | 159 files, 1.0 MB |
| [rust-std](rust-std/index.md) | The Rust standard library: core, alloc and std, from their documentation comments | 1.100 | MIT OR Apache-2.0 | 754 files, 3.2 MB |
