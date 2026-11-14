---
title: "std::sys::pal::windows"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/windows/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::windows

## trait IoResult

```rust
pub trait IoResult<T>
```

Map a `Result<T, WinError>` to `io::Result<T>`.

## fn abort_internal

```rust
pub fn abort_internal() -> !
```

Use `__fastfail` to abort the process

In Windows 8 and later, this will terminate the process immediately without
running any in-process exception handlers. In earlier versions of Windows,
this sequence of instructions will be treated as an access violation, which
will still terminate the process but might run some exception handlers.

<https://docs.microsoft.com/en-us/cpp/intrinsics/fastfail>
