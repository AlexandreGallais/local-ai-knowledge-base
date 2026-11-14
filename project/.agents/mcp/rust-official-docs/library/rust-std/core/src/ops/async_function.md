---
title: "core::ops::async_function"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ops/async_function.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ops::async_function

## trait AsyncFn

```rust
pub trait AsyncFn<Args: Tuple>: AsyncFnMut<Args>
```

An async-aware version of the `Fn` trait.

All `async fn` and functions returning futures implement this trait.

## trait AsyncFnMut

```rust
pub trait AsyncFnMut<Args: Tuple>: AsyncFnOnce<Args>
```

An async-aware version of the `FnMut` trait.

All `async fn` and functions returning futures implement this trait.

## trait AsyncFnOnce

```rust
pub trait AsyncFnOnce<Args: Tuple>
```

An async-aware version of the `FnOnce` trait.

All `async fn` and functions returning futures implement this trait.
