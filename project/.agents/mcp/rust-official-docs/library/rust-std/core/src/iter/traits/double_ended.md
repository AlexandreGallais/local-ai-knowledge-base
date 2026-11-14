---
title: "core::iter::traits::double_ended"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/traits/double_ended.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::traits::double_ended

## trait DoubleEndedIterator

```rust
pub const trait DoubleEndedIterator: [const] Iterator
```

An iterator able to yield elements from both ends.

Something that implements `DoubleEndedIterator` has one extra capability
over something that implements `Iterator`: the ability to also take
`Item`s from the back, as well as the front.

It is important to note that both back and forth work on the same range,
and do not cross: iteration is over when they meet in the middle.

In a similar fashion to the `Iterator` protocol, once a
`DoubleEndedIterator` returns `None` from a `next_back()`, calling it
again may or may not ever return `Some` again. `next()` and
`next_back()` are interchangeable for this purpose.

# Examples

Basic usage:

```rust
let numbers = vec![1, 2, 3, 4, 5, 6];

let mut iter = numbers.iter();

assert_eq!(Some(&1), iter.next());
assert_eq!(Some(&6), iter.next_back());
assert_eq!(Some(&5), iter.next_back());
assert_eq!(Some(&2), iter.next());
assert_eq!(Some(&3), iter.next());
assert_eq!(Some(&4), iter.next());
assert_eq!(None, iter.next());
assert_eq!(None, iter.next_back());
```
