---
title: "core::async_iter::async_iter"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/async_iter/async_iter.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::async_iter::async_iter

## AsyncIterator::Item

```rust
type Item
```

The type of items yielded by the async iterator.

## AsyncIterator::poll_next

```rust
fn poll_next(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Option<Self::Item>>
```

Attempts to pull out the next value of this async iterator, registering the
current task for wakeup if the value is not yet available, and returning
`None` if the async iterator is exhausted.

# Return value

There are several possible return values, each indicating a distinct
async iterator state:

- `Poll::Pending` means that this async iterator's next value is not ready
  yet. Implementations will ensure that the current task will be notified
  when the next value may be ready.

- `Poll::Ready(Some(val))` means that the async iterator has successfully
  produced a value, `val`, and may produce further values on subsequent
  `poll_next` calls.

- `Poll::Ready(None)` means that the async iterator has terminated, and
  `poll_next` should not be invoked again.

# Panics

Once an async iterator has finished (returned `Ready(None)` from `poll_next`), calling its
`poll_next` method again may panic, block forever, or cause other kinds of
problems; the `AsyncIterator` trait places no requirements on the effects of
such a call. However, as the `poll_next` method is not marked `unsafe`,
Rust's usual rules apply: calls must never cause undefined behavior
(memory corruption, incorrect use of `unsafe` functions, or the like),
regardless of the async iterator's state.

## AsyncIterator::size_hint

```rust
fn size_hint(&self) -> (usize, Option<usize>)
```

Returns the bounds on the remaining length of the async iterator.

Specifically, `size_hint()` returns a tuple where the first element
is the lower bound, and the second element is the upper bound.

The second half of the tuple that is returned is an <code>[Option]<[usize]></code>.
A `None` here means that either there is no known upper bound, or the
upper bound is larger than `usize`.

# Implementation notes

It is not enforced that an async iterator implementation yields the declared
number of elements. A buggy async iterator may yield less than the lower bound
or more than the upper bound of elements.

`size_hint()` is primarily intended to be used for optimizations such as
reserving space for the elements of the async iterator, but must not be
trusted to e.g., omit bounds checks in unsafe code. An incorrect
implementation of `size_hint()` should not lead to memory safety
violations.

That said, the implementation should provide a correct estimation,
because otherwise it would be a violation of the trait's protocol.

The default implementation returns `(0, [None])` which is correct for any
async iterator.

## IntoAsyncIterator::Item

```rust
type Item
```

The type of the item yielded by the iterator

## IntoAsyncIterator::IntoAsyncIter

```rust
type IntoAsyncIter: AsyncIterator<Item = Self::Item>
```

The type of the resulting iterator

## IntoAsyncIterator::into_async_iter

```rust
fn into_async_iter(self) -> Self::IntoAsyncIter
```

Converts `self` into an async iterator
