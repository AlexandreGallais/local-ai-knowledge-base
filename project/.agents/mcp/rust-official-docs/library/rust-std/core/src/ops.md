---
title: "core::ops::index"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ops/index.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ops::index

## trait Index

```rust
pub const trait Index<Idx: ?Sized>
```

Used for indexing operations (`container[index]`) in immutable contexts.

`container[index]` is actually syntactic sugar for `*container.index(index)`,
but only when used as an immutable value. If a mutable value is requested,
`IndexMut` is used instead. This allows nice things such as
`let value = v[index]` if the type of `value` implements `Copy`.

# Examples

The following example implements `Index` on a read-only `NucleotideCount`
container, enabling individual counts to be retrieved with index syntax.

```rust
use std::ops::Index;

enum Nucleotide {
    A,
    C,
    G,
    T,
}

struct NucleotideCount {
    a: usize,
    c: usize,
    g: usize,
    t: usize,
}

impl Index<Nucleotide> for NucleotideCount {
    type Output = usize;

    fn index(&self, nucleotide: Nucleotide) -> &Self::Output {
        match nucleotide {
            Nucleotide::A => &self.a,
            Nucleotide::C => &self.c,
            Nucleotide::G => &self.g,
            Nucleotide::T => &self.t,
        }
    }
}

let nucleotide_count = NucleotideCount {a: 14, c: 9, g: 10, t: 12};
assert_eq!(nucleotide_count[Nucleotide::A], 14);
assert_eq!(nucleotide_count[Nucleotide::C], 9);
assert_eq!(nucleotide_count[Nucleotide::G], 10);
assert_eq!(nucleotide_count[Nucleotide::T], 12);
```

## trait IndexMut

```rust
pub const trait IndexMut<Idx: ?Sized>: [const] Index<Idx>
```

Used for indexing operations (`container[index]`) in mutable contexts.

`container[index]` is actually syntactic sugar for
`*container.index_mut(index)`, but only when used as a mutable value. If
an immutable value is requested, the `Index` trait is used instead. This
allows nice things such as `v[index] = value`.

# Examples

A very simple implementation of a `Balance` struct that has two sides, where
each can be indexed mutably and immutably.

```rust
use std::ops::{Index, IndexMut};

#[derive(Debug)]
enum Side {
    Left,
    Right,
}

#[derive(Debug, PartialEq)]
enum Weight {
    Kilogram(f32),
    Pound(f32),
}

struct Balance {
    pub left: Weight,
    pub right: Weight,
}

impl Index<Side> for Balance {
    type Output = Weight;

    fn index(&self, index: Side) -> &Self::Output {
        println!("Accessing {index:?}-side of balance immutably");
        match index {
            Side::Left => &self.left,
            Side::Right => &self.right,
        }
    }
}

impl IndexMut<Side> for Balance {
    fn index_mut(&mut self, index: Side) -> &mut Self::Output {
        println!("Accessing {index:?}-side of balance mutably");
        match index {
            Side::Left => &mut self.left,
            Side::Right => &mut self.right,
        }
    }
}

let mut balance = Balance {
    right: Weight::Kilogram(2.5),
    left: Weight::Pound(1.5),
};

// In this case, `balance[Side::Right]` is sugar for
// `*balance.index(Side::Right)`, since we are only *reading*
// `balance[Side::Right]`, not writing it.
assert_eq!(balance[Side::Right], Weight::Kilogram(2.5));

// However, in this case `balance[Side::Left]` is sugar for
// `*balance.index_mut(Side::Left)`, since we are writing
// `balance[Side::Left]`.
balance[Side::Left] = Weight::Kilogram(3.0);
```
