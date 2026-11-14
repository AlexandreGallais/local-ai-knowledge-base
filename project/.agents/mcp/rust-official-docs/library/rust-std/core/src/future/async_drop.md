---
title: "core::future::async_drop"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/future/async_drop.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::future::async_drop

## AsyncDrop::drop

```rust
async fn drop(self: Pin<&mut Self>)
```

Executes the async destructor for this type.

This method is called implicitly when the value goes out of scope,
and cannot be called explicitly.

When this method has been called, `self` has not yet been deallocated.
That only happens after the method is over.

# Panics
