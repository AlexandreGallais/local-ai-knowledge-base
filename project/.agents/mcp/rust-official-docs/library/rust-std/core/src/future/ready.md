---
title: "core::future::ready"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/future/ready.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::future::ready

## struct Ready

```rust
pub struct Ready<T>(Option<T>)
```

A future that is immediately ready with a value.

This `struct` is created by `ready()`. See its
documentation for more.

## Ready::into_inner

```rust
pub fn into_inner(self) -> T
```

Consumes the `Ready`, returning the wrapped value.

# Panics

Will panic if this `Ready` was already polled to completion.

# Examples

```rust
use std::future;

let a = future::ready(1);
assert_eq!(a.into_inner(), 1);
```

## fn ready

```rust
pub fn ready<T>(t: T) -> Ready<T>
```

Creates a future that is immediately ready with a value.

Futures created through this function are functionally similar to those
created through `async {}`. The main difference is that futures created
through this function are named and implement `Unpin`.

# Examples

```rust
use std::future;

let a = future::ready(1);
assert_eq!(a.await, 1);
```
