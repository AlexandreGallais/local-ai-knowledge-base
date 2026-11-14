---
title: "std::os::xous::ffi::definitions::memoryflags"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/xous/ffi/definitions/memoryflags.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::xous::ffi::definitions::memoryflags

## struct MemoryFlags

```rust
pub struct MemoryFlags
```

Flags to be passed to the MapMemory struct.
Note that it is an error to have memory be
writable and not readable.

## MemoryFlags::FREE

```rust
pub const FREE: Self = Self
```

Free this memory

## MemoryFlags::RESERVE

```rust
pub const RESERVE: Self = Self
```

Immediately allocate this memory.  Otherwise it will
be demand-paged.  This is implicitly set when `phys`
is not 0.

## MemoryFlags::R

```rust
pub const R: Self = Self
```

Allow the CPU to read from this page.

## MemoryFlags::W

```rust
pub const W: Self = Self
```

Allow the CPU to write to this page.

## MemoryFlags::X

```rust
pub const X: Self = Self
```

Allow the CPU to execute from this page.
