---
title: "core::ops::coroutine"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ops/coroutine.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ops::coroutine

## Coroutine::Yield

```rust
type Yield
```

The type of value this coroutine yields.

This associated type corresponds to the `yield` expression and the
values which are allowed to be returned each time a coroutine yields.
For example an iterator-as-a-coroutine would likely have this type as
`T`, the type being iterated over.

## Coroutine::Return

```rust
type Return
```

The type of value this coroutine returns.

This corresponds to the type returned from a coroutine either with a
`return` statement or implicitly as the last expression of a coroutine
literal. For example futures would use this as `Result<T, E>` as it
represents a completed future.

## Coroutine::resume

```rust
fn resume(self: Pin<&mut Self>, arg: R) -> CoroutineState<Self::Yield, Self::Return>
```

Resumes the execution of this coroutine.

This function will resume execution of the coroutine or start execution
if it hasn't already. This call will return back into the coroutine's
last suspension point, resuming execution from the latest `yield`. The
coroutine will continue executing until it either yields or returns, at
which point this function will return.

# Return value

The `CoroutineState` enum returned from this function indicates what
state the coroutine is in upon returning. If the `Yielded` variant is
returned then the coroutine has reached a suspension point and a value
has been yielded out. Coroutines in this state are available for
resumption at a later point.

If `Complete` is returned then the coroutine has completely finished
with the value provided. It is invalid for the coroutine to be resumed
again.

# Panics

This function may panic if it is called after the `Complete` variant has
been returned previously. While coroutine literals in the language are
guaranteed to panic on resuming after `Complete`, this is not guaranteed
for all implementations of the `Coroutine` trait.
