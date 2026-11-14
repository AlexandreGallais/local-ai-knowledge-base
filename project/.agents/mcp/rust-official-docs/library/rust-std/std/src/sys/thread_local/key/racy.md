---
title: "std::sys::thread_local::key::racy"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/key/racy.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::key::racy

A `LazyKey` implementation using racy initialization.

Unfortunately, none of the platforms currently supported by `std` allows
creating TLS keys at compile-time. Thus we need a way to lazily create keys.
Instead of blocking API like `OnceLock`, we use racy initialization, which
should be more lightweight and avoids circular dependencies with the rest of
`std`.

## struct LazyKey

```rust
pub struct LazyKey
```

A type for TLS keys that are statically allocated.

This is basically a `LazyLock<Key>`, but avoids blocking and circular
dependencies with the rest of `std`.
