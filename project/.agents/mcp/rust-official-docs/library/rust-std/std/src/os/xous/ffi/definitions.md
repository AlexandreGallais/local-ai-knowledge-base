---
title: "std::os::xous::ffi::definitions"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/xous/ffi/definitions.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::xous::ffi::definitions

## enum Syscall

```rust
pub enum Syscall
```

Indicates a particular syscall number as used by the Xous kernel.

## enum SyscallResult

```rust
pub enum SyscallResult
```

Copies of these invocation types here for when we're running
in environments without libxous.

## enum Error

```rust
pub enum Error
```

A list of all known errors that may be returned by the Xous kernel.

## struct Connection

```rust
pub struct Connection(u32)
```

A representation of a connection to a Xous service.
