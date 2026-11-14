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
| [rust-book](rust-book.index.md) | The Rust Programming Language | 2026-11 | MIT OR Apache-2.0 | 112 files, 1.2 MB |
| [rust-reference](rust-reference.index.md) | The Rust Reference | 2026-11 | MIT OR Apache-2.0 | 121 files, 1.1 MB |
| [rust-std](rust-std.index.md) | The Rust standard library: core, alloc and std, from their documentation comments | 1.100 | MIT OR Apache-2.0 | 649 files, 3.1 MB |
| [cargo](cargo.index.md) | The Cargo Book: manifests, workspaces, features, profiles, commands | 1.100 | MIT OR Apache-2.0 | 99 files, 1.7 MB |
| [rust-by-example](rust-by-example.index.md) | Rust by Example | 2026-11 | MIT OR Apache-2.0 | 198 files, 0.4 MB |
