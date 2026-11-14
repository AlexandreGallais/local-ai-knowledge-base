---
title: "core::iter::adapters::map"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/adapters/map.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::adapters::map

## struct Map

```rust
pub struct Map<I, F>
```

An iterator that maps the values of `iter` with `f`.

This `struct` is created by the `map` method on `Iterator`. See its
documentation for more.

# Notes about side effects

The `map` iterator implements `DoubleEndedIterator`, meaning that
you can also `map` backwards:

```rust
let v: Vec<i32> = [1, 2, 3].into_iter().map(|x| x + 1).rev().collect();

assert_eq!(v, [4, 3, 2]);
```

But if your closure has state, iterating backwards may act in a way you do
not expect. Let's go through an example. First, in the forward direction:

```rust
let mut c = 0;

for pair in ['a', 'b', 'c'].into_iter()
                               .map(|letter| { c += 1; (letter, c) }) {
    println!("{pair:?}");
}
```

This will print `('a', 1), ('b', 2), ('c', 3)`.

Now consider this twist where we add a call to `rev`. This version will
print `('c', 1), ('b', 2), ('a', 3)`. Note that the letters are reversed,
but the values of the counter still go in order. This is because `map()` is
still being called lazily on each item, but we are popping items off the
back of the vector now, instead of shifting them from the front.

```rust
let mut c = 0;

for pair in ['a', 'b', 'c'].into_iter()
                               .map(|letter| { c += 1; (letter, c) })
                               .rev() {
    println!("{pair:?}");
}
```
