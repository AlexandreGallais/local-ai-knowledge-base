---
title: "core::future::pending"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/future/pending.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::future::pending

## struct Pending

```rust
pub struct Pending<T>
```

Creates a future which never resolves, representing a computation that never
finishes.

This `struct` is created by `pending()`. See its
documentation for more.

## fn pending

```rust
pub fn pending<T>() -> Pending<T>
```

Creates a future which never resolves, representing a computation that never
finishes.

# Examples

```rust
use std::future;

let future = future::pending();
let () = future.await;
unreachable!();
```
