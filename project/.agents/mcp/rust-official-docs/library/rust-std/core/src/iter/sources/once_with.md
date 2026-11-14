# core::iter::sources::once_with

## fn once_with

```rust
pub fn once_with<A, F: FnOnce() -> A>(make: F) -> OnceWith<F>
```

Creates an iterator that lazily generates a value exactly once by invoking
the provided closure.

This is commonly used to adapt a single value coroutine into a [`chain()`] of
other kinds of iteration. Maybe you have an iterator that covers almost
everything, but you need an extra special case. Maybe you have a function
which works on iterators, but you only need to process one value.

Unlike [`once()`], this function will lazily generate the value on request.

[`chain()`]: Iterator::chain
[`once()`]: crate::iter::once

# Examples

Basic usage:

```
use std::iter;

// one is the loneliest number
let mut one = iter::once_with(|| 1);

assert_eq!(Some(1), one.next());

// just one, that's all we get
assert_eq!(None, one.next());
```

Chaining together with another iterator. Let's say that we want to iterate
over each file of the `.foo` directory, but also a configuration file,
`.foorc`:

```no_run
use std::iter;
use std::fs;
use std::path::PathBuf;

let dirs = fs::read_dir(".foo").unwrap();

// we need to convert from an iterator of DirEntry-s to an iterator of
// PathBufs, so we use map
let dirs = dirs.map(|file| file.unwrap().path());

// now, our iterator just for our config file
let config = iter::once_with(|| PathBuf::from(".foorc"));

// chain the two iterators together into one big iterator
let files = dirs.chain(config);

// this will give us all of the files in .foo as well as .foorc
for f in files {
    println!("{f:?}");
}
```

## struct OnceWith

```rust
pub struct OnceWith<F>
```

An iterator that yields a single element of type `A` by
applying the provided closure `F: FnOnce() -> A`.

This `struct` is created by the [`once_with()`] function.
See its documentation for more.