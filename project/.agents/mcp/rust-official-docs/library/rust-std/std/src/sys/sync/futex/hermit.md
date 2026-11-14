---
title: "std::sys::sync::futex::hermit"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/sync/futex/hermit.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::sync::futex::hermit

## type Futex

```rust
pub type Futex = Atomic<Primitive>
```

An atomic for use as a futex that is at least 32-bits but may be larger

## type Primitive

```rust
pub type Primitive = u32
```

Must be the underlying type of Futex

## type SmallFutex

```rust
pub type SmallFutex = Atomic<SmallPrimitive>
```

An atomic for use as a futex that is at least 8-bits but may be larger.

## type SmallPrimitive

```rust
pub type SmallPrimitive = u32
```

Must be the underlying type of SmallFutex
