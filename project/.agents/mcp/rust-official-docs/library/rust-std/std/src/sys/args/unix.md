---
title: "std::sys::args::unix"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/args/unix.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::args::unix

Global initialization and retrieval of command line arguments.

On some platforms these are stored during runtime startup,
and on some they are retrieved from the system on demand.

## fn init

```rust
pub unsafe fn init(argc: isize, argv: *const *const u8)
```

One-time global initialization.

## fn args

```rust
pub fn args() -> Args
```

Returns the command line arguments
