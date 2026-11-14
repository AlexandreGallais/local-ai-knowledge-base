---
title: "core::iter::sources::once"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/sources/once.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::sources::once

## fn once

```rust
pub fn once<T>(value: T) -> Once<T>
```

Creates an iterator that yields an element exactly once.

This is commonly used to adapt a single value into a `chain()` of other
kinds of iteration. Maybe you have an iterator that covers almost
everything, but you need an extra special case. Maybe you have a function
which works on iterators, but you only need to process one value.

# Examples

Basic usage:

```rust
use std::iter;

// one is the loneliest number
let mut one = iter::once(1);

assert_eq!(Some(1), one.next());

// just one, that's all we get
assert_eq!(None, one.next());
```

Chaining together with another iterator. Let's say that we want to iterate
over each file of the `.foo` directory, but also a configuration file,
`.foorc`:

```rust
use std::iter;
use std::fs;
use std::path::PathBuf;

let dirs = fs::read_dir(".foo")?;

// we need to convert from an iterator of DirEntry-s to an iterator of
// PathBufs, so we use map
let dirs = dirs.map(|file| file.unwrap().path());

// now, our iterator just for our config file
let config = iter::once(PathBuf::from(".foorc"));

// chain the two iterators together into one big iterator
let files = dirs.chain(config);

// this will give us all of the files in .foo as well as .foorc
for f in files {
    println!("{f:?}");
}
```

## struct Once

```rust
pub struct Once<T>
```

An iterator that yields an element exactly once.

This `struct` is created by the `once()` function. See its documentation for more.
