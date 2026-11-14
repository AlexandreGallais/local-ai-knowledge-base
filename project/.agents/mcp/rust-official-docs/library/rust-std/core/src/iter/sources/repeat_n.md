---
title: "core::iter::sources::repeat_n"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/sources/repeat_n.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::sources::repeat_n

## fn repeat_n

```rust
pub fn repeat_n<T: Clone>(element: T, count: usize) -> RepeatN<T>
```

Creates a new iterator that repeats a single element a given number of times.

The `repeat_n()` function repeats a single value exactly `n` times.

This is very similar to using `repeat()` with `Iterator::take()`,
but `repeat_n()` can return the original value, rather than always cloning.

# Examples

Basic usage:

```rust
use std::iter;

// four of the number four:
let mut four_fours = iter::repeat_n(4, 4);

assert_eq!(Some(4), four_fours.next());
assert_eq!(Some(4), four_fours.next());
assert_eq!(Some(4), four_fours.next());
assert_eq!(Some(4), four_fours.next());

// no more fours
assert_eq!(None, four_fours.next());
```

For non-`Copy` types,

```rust
use std::iter;

let v: Vec<i32> = Vec::with_capacity(123);
let mut it = iter::repeat_n(v, 5);

for i in 0..4 {
    // It starts by cloning things
    let cloned = it.next().unwrap();
    assert_eq!(cloned.len(), 0);
    assert_eq!(cloned.capacity(), 0);
}

// ... but the last item is the original one
let last = it.next().unwrap();
assert_eq!(last.len(), 0);
assert_eq!(last.capacity(), 123);

// ... and now we're done
assert_eq!(None, it.next());
```

## struct RepeatN

```rust
pub struct RepeatN<A>
```

An iterator that repeats an element an exact number of times.

This `struct` is created by the `repeat_n()` function.
See its documentation for more.
