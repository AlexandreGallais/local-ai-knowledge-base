---
title: "alloc::borrow"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/borrow.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::borrow

A module for working with borrowed data.

## trait ToOwned

```rust
pub trait ToOwned
```

A generalization of `Clone` to borrowed data.

Some types make it possible to go from borrowed to owned, usually by
implementing the `Clone` trait. But `Clone` works only for going from `&T`
to `T`. The `ToOwned` trait generalizes `Clone` to construct owned data
from any borrow of a given type.

## ToOwned::Owned

```rust
type Owned: Borrow<Self>
```

The resulting type after obtaining ownership.

## ToOwned::to_owned

```rust
fn to_owned(&self) -> Self::Owned
```

Creates owned data from borrowed data, usually by cloning.

# Examples

Basic usage:

```rust
let s: &str = "a";
let ss: String = s.to_owned();

let v: &[i32] = &[1, 2];
let vv: Vec<i32> = v.to_owned();
```

## ToOwned::clone_into

```rust
fn clone_into(&self, target: &mut Self::Owned)
```

Uses borrowed data to replace owned data, usually by cloning.

This is borrow-generalized version of `Clone::clone_from`.

# Examples

Basic usage:

```rust
let mut s: String = String::new();
"hello".clone_into(&mut s);

let mut v: Vec<i32> = Vec::new();
[1, 2][..].clone_into(&mut v);
```

## enum Cow

```rust
pub enum Cow<'a, B: ?Sized + 'a> where B: ToOwned,
```

A clone-on-write smart pointer.

The type `Cow` is a smart pointer providing clone-on-write functionality: it
can enclose and provide immutable access to borrowed data, and clone the
data lazily when mutation or ownership is required. The type is designed to
work with general borrowed data via the `Borrow` trait.

`Cow` implements `Deref`, which means that you can call
non-mutating methods directly on the data it encloses. If mutation
is desired, `to_mut` will obtain a mutable reference to an owned
value, cloning if necessary.

If you need reference-counting pointers, note that
`Rc::make_mut`[crate::rc::Rc::make_mut] and
`Arc::make_mut`[crate::sync::Arc::make_mut] can provide clone-on-write
functionality as well.

# Examples

```rust
use std::borrow::Cow;

fn abs_all(input: &mut Cow<'_, [i32]>) {
    for i in 0..input.len() {
        let v = input[i];
        if v < 0 {
            // Clones into a vector if not already owned.
            input.to_mut()[i] = -v;
        }
    }
}

// No clone occurs because `input` doesn't need to be mutated.
let slice = [0, 1, 2];
let mut input = Cow::from(&slice[..]);
abs_all(&mut input);

// Clone occurs because `input` needs to be mutated.
let slice = [-1, 0, 1];
let mut input = Cow::from(&slice[..]);
abs_all(&mut input);

// No clone occurs because `input` is already owned.
let mut input = Cow::from(vec![-1, 0, 1]);
abs_all(&mut input);
```

Another example showing how to keep `Cow` in a struct:

```rust
use std::borrow::Cow;

struct Items<'a, X> where [X]: ToOwned<Owned = Vec<X>> {
    values: Cow<'a, [X]>,
}

impl<'a, X: Clone + 'a> Items<'a, X> where [X]: ToOwned<Owned = Vec<X>> {
    fn new(v: Cow<'a, [X]>) -> Self {
        Items { values: v }
    }
}

// Creates a container from borrowed values of a slice
let readonly = [1, 2];
let borrowed = Items::new((&readonly[..]).into());
match borrowed {
    Items { values: Cow::Borrowed(b) } => println!("borrowed {b:?}"),
    _ => panic!("expect borrowed value"),
}

let mut clone_on_write = borrowed;
// Mutates the data from slice into owned vec and pushes a new value on top
clone_on_write.values.to_mut().push(3);
println!("clone_on_write = {:?}", clone_on_write.values);

// The data was mutated. Let's check it out.
match clone_on_write {
    Items { values: Cow::Owned(_) } => println!("clone_on_write contains owned data"),
    _ => panic!("expect owned data"),
}
```

## Cow::to_mut

```rust
pub fn to_mut(&mut self) -> &mut <B as ToOwned>::Owned
```

Acquires a mutable reference to the owned form of the data.

Clones the data if it is not already owned.

# Examples

```rust
use std::borrow::Cow;

let mut cow = Cow::Borrowed("foo");
cow.to_mut().make_ascii_uppercase();

assert_eq!(
  cow,
  Cow::Owned(String::from("FOO")) as Cow<'_, str>
);
```

## Cow::into_owned

```rust
pub fn into_owned(self) -> <B as ToOwned>::Owned
```

Extracts the owned data.

Clones the data if it is not already owned.

# Examples

Calling `into_owned` on a `Cow::Borrowed` returns a clone of the borrowed data:

```rust
use std::borrow::Cow;

let s = "Hello world!";
let cow = Cow::Borrowed(s);

assert_eq!(
  cow.into_owned(),
  String::from(s)
);
```

Calling `into_owned` on a `Cow::Owned` returns the owned data. The data is moved out of the
`Cow` without being cloned.

```rust
use std::borrow::Cow;

let s = "Hello world!";
let cow: Cow<'_, str> = Cow::Owned(String::from(s));

assert_eq!(
  cow.into_owned(),
  String::from(s)
);
```
