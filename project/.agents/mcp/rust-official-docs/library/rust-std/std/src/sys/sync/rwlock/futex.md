---
title: "std::sys::sync::rwlock::futex"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/sync/rwlock/futex.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::sync::rwlock::futex

## RwLock::read_unlock

```rust
pub unsafe fn read_unlock(&self)
```

# Safety

The `RwLock` must be read-locked (N readers) in order to call this.

## RwLock::write_unlock

```rust
pub unsafe fn write_unlock(&self)
```

# Safety

The `RwLock` must be write-locked (single writer) in order to call this.

## RwLock::downgrade

```rust
pub unsafe fn downgrade(&self)
```

# Safety

The `RwLock` must be write-locked (single writer) in order to call this.
