---
title: "core::iter::traits::collect"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/traits/collect.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::traits::collect

## trait FromIterator

```rust
pub trait FromIterator<T>: Sized
```

Conversion from an `Iterator`.

By implementing `FromIterator` for a type, you define how it will be
created from an iterator. This is common for types which describe a
collection of some kind.

If you want to create a collection from the contents of an iterator, the
`Iterator::collect()` method is preferred. However, when you need to
specify the container type, `FromIterator::from_iter()` can be more
readable than using a turbofish (e.g. `::<Vec<_>>()`). See the
`Iterator::collect()` documentation for more examples of its use.

See also: `IntoIterator`.

# Examples

Basic usage:

```rust
let five_fives = std::iter::repeat(5).take(5);

let v = Vec::from_iter(five_fives);

assert_eq!(v, vec![5, 5, 5, 5, 5]);
```

Using `Iterator::collect()` to implicitly use `FromIterator`:

```rust
let five_fives = std::iter::repeat(5).take(5);

let v: Vec<i32> = five_fives.collect();

assert_eq!(v, vec![5, 5, 5, 5, 5]);
```

Using `FromIterator::from_iter()` as a more readable alternative to
`Iterator::collect()`:

```rust
use std::collections::VecDeque;
let first = (0..10).collect::<VecDeque<i32>>();
let second = VecDeque::from_iter(0..10);

assert_eq!(first, second);
```

Implementing `FromIterator` for your type:

```rust
// A sample collection, that's just a wrapper over Vec<T>
#[derive(Debug)]
struct MyCollection(Vec<i32>);

// Let's give it some methods so we can create one and add things
// to it.
impl MyCollection {
    fn new() -> MyCollection {
        MyCollection(Vec::new())
    }

    fn add(&mut self, elem: i32) {
        self.0.push(elem);
    }
}

// and we'll implement FromIterator
impl FromIterator<i32> for MyCollection {
    fn from_iter<I: IntoIterator<Item=i32>>(iter: I) -> Self {
        let mut c = MyCollection::new();

        for i in iter {
            c.add(i);
        }

        c
    }
}

// Now we can make a new iterator...
let iter = (0..5).into_iter();

// ... and make a MyCollection out of it
let c = MyCollection::from_iter(iter);

assert_eq!(c.0, vec![0, 1, 2, 3, 4]);

// collect works too!

let iter = (0..5).into_iter();
let c: MyCollection = iter.collect();

assert_eq!(c.0, vec![0, 1, 2, 3, 4]);
```

## FromIterator::from_iter

```rust
fn from_iter<I: IntoIterator<Item = T>>(iter: I) -> Self
```

Creates a value from an iterator.

See the [module-level documentation] for more.

# Examples

```rust
let five_fives = std::iter::repeat(5).take(5);

let v = Vec::from_iter(five_fives);

assert_eq!(v, vec![5, 5, 5, 5, 5]);
```

## trait IntoIterator

```rust
pub const trait IntoIterator
```

Conversion into an `Iterator`.

By implementing `IntoIterator` for a type, you define how it will be
converted to an iterator. This is common for types which describe a
collection of some kind.

One benefit of implementing `IntoIterator` is that your type will work
with Rust's `for` loop syntax.

See also: `FromIterator`.

# Examples

Basic usage:

```rust
let v = [1, 2, 3];
let mut iter = v.into_iter();

assert_eq!(Some(1), iter.next());
assert_eq!(Some(2), iter.next());
assert_eq!(Some(3), iter.next());
assert_eq!(None, iter.next());
```
Implementing `IntoIterator` for your type:

```rust
// A sample collection, that's just a wrapper over Vec<T>
#[derive(Debug)]
struct MyCollection(Vec<i32>);

// Let's give it some methods so we can create one and add things
// to it.
impl MyCollection {
    fn new() -> MyCollection {
        MyCollection(Vec::new())
    }

    fn add(&mut self, elem: i32) {
        self.0.push(elem);
    }
}

// and we'll implement IntoIterator
impl IntoIterator for MyCollection {
    type Item = i32;
    type IntoIter = std::vec::IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.0.into_iter()
    }
}

// Now we can make a new collection...
let mut c = MyCollection::new();

// ... add some stuff to it ...
c.add(0);
c.add(1);
c.add(2);

// ... and then turn it into an Iterator:
for (i, n) in c.into_iter().enumerate() {
    assert_eq!(i as i32, n);
}
```

It is common to use `IntoIterator` as a trait bound. This allows
the input collection type to change, so long as it is still an
iterator. Additional bounds can be specified by restricting on
`Item`:

```rust
fn collect_as_strings<T>(collection: T) -> Vec<String>
where
    T: IntoIterator,
    T::Item: std::fmt::Debug,
{
    collection
        .into_iter()
        .map(|item| format!("{item:?}"))
        .collect()
}
```

## trait Extend

```rust
pub trait Extend<T>
```

Extend a collection with the contents of an iterator.

Iterators produce a series of values, and collections can also be thought
of as a series of values. The `Extend` trait bridges this gap, allowing you
to extend a collection by including the contents of that iterator. When
extending a collection with an already existing key, that entry is updated
or, in the case of collections that permit multiple entries with equal
keys, that entry is inserted.

# Examples

Basic usage:

```rust
// You can extend a String with some chars:
let mut message = String::from("The first three letters are: ");

message.extend(&['a', 'b', 'c']);

assert_eq!("abc", &message[29..32]);
```

Implementing `Extend`:

```rust
// A sample collection, that's just a wrapper over Vec<T>
#[derive(Debug)]
struct MyCollection(Vec<i32>);

// Let's give it some methods so we can create one and add things
// to it.
impl MyCollection {
    fn new() -> MyCollection {
        MyCollection(Vec::new())
    }

    fn add(&mut self, elem: i32) {
        self.0.push(elem);
    }
}

// since MyCollection has a list of i32s, we implement Extend for i32
impl Extend<i32> for MyCollection {

    // This is a bit simpler with the concrete type signature: we can call
    // extend on anything which can be turned into an Iterator which gives
    // us i32s. Because we need i32s to put into MyCollection.
    fn extend<I: IntoIterator<Item=i32>>(&mut self, iter: I) {

        // The implementation is very straightforward: loop through the
        // iterator, and add() each element to ourselves.
        for elem in iter {
            self.add(elem);
        }
    }
}

let mut c = MyCollection::new();

c.add(5);
c.add(6);
c.add(7);

// let's extend our collection with three more numbers
c.extend(vec![1, 2, 3]);

// we've added these elements onto the end
assert_eq!("MyCollection([5, 6, 7, 1, 2, 3])", format!("{c:?}"));
```

## Extend::extend

```rust
fn extend<I: IntoIterator<Item = T>>(&mut self, iter: I)
```

Extends a collection with the contents of an iterator.

As this is the only required method for this trait, the [trait-level] docs
contain more details.

# Examples

```rust
// You can extend a String with some chars:
let mut message = String::from("abc");

message.extend(['d', 'e', 'f'].iter());

assert_eq!("abcdef", &message);
```
