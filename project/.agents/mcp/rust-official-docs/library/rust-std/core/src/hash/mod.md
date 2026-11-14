---
title: "core::hash"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/hash/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::hash

Generic hashing support.

This module provides a generic way to compute the [hash] of a value.
Hashes are most commonly used with `HashMap` and `HashSet`.

The simplest way to make a type hashable is to use `#[derive(Hash)]`:

#### Examples

```rust
use std::hash::{DefaultHasher, Hash, Hasher};

#[derive(Hash)]
struct Person {
    id: u32,
    name: String,
    phone: u64,
}

let person1 = Person {
    id: 5,
    name: "Janet".to_string(),
    phone: 555_666_7777,
};
let person2 = Person {
    id: 5,
    name: "Bob".to_string(),
    phone: 555_666_7777,
};

assert!(calculate_hash(&person1) != calculate_hash(&person2));

fn calculate_hash<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}
```

If you need more control over how a value is hashed, you need to implement
the `Hash` trait:

```rust
use std::hash::{DefaultHasher, Hash, Hasher};

struct Person {
    id: u32,
    name: String,
    phone: u64,
}

impl Hash for Person {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.id.hash(state);
        self.phone.hash(state);
    }
}

let person1 = Person {
    id: 5,
    name: "Janet".to_string(),
    phone: 555_666_7777,
};
let person2 = Person {
    id: 5,
    name: "Bob".to_string(),
    phone: 555_666_7777,
};

assert_eq!(calculate_hash(&person1), calculate_hash(&person2));

fn calculate_hash<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}
```

## trait Hash

```rust
pub trait Hash: marker::PointeeSized
```

A hashable type.

Types implementing `Hash` are able to be `hash`ed with an instance of
`Hasher`.

## Implementing `Hash`

You can derive `Hash` with `#[derive(Hash)]` if all fields implement `Hash`.
The resulting hash will be the combination of the values from calling
`hash` on each field.

```rust
#[derive(Hash)]
struct Rustacean {
    name: String,
    country: String,
}
```

If you need more control over how a value is hashed, you can of course
implement the `Hash` trait yourself:

```rust
use std::hash::{Hash, Hasher};

struct Person {
    id: u32,
    name: String,
    phone: u64,
}

impl Hash for Person {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.id.hash(state);
        self.phone.hash(state);
    }
}
```

## `Hash` and `Eq`

When implementing both `Hash` and `Eq`, it is important that the following
property holds:

```
k1 == k2 -> hash(k1) == hash(k2)
```rust

In other words, if two keys are equal, their hashes must also be equal.
`HashMap` and `HashSet` both rely on this behavior.

Thankfully, you won't need to worry about upholding this property when
deriving both `Eq` and `Hash` with `#[derive(PartialEq, Eq, Hash)]`.

Violating this property is a logic error. The behavior resulting from a logic error is not
specified, but users of the trait must ensure that such logic errors do *not* result in
undefined behavior. This means that `unsafe` code **must not** rely on the correctness of these
methods.

## Prefix collisions

Implementations of `hash` should ensure that the data they
pass to the `Hasher` are prefix-free. That is,
values which are not equal should cause two different sequences of values to be written,
and neither of the two sequences should be a prefix of the other.

For example, the standard implementation of [`Hash` for `&str`][impl] passes an extra
`0xFF` byte to the `Hasher` so that the values `("ab", "c")` and `("a",
"bc")` hash differently.

## Portability

Due to differences in endianness and type sizes, data fed by `Hash` to a `Hasher`
should not be considered portable across platforms. Additionally the data passed by most
standard library types should not be considered stable between compiler versions.

This means tests shouldn't probe hard-coded hash values or data fed to a `Hasher` and
instead should check consistency with `Eq`.

Serialization formats intended to be portable between platforms or compiler versions should
either avoid encoding hashes or only rely on `Hash` and `Hasher` implementations that
provide additional guarantees.

`HashMap`: ../../std/collections/struct.HashMap.html
`HashSet`: ../../std/collections/struct.HashSet.html
`hash`: Hash::hash
[impl]: ../../std/primitive.str.html#impl-Hash-for-str

## Hash::hash

```rust
fn hash<H: Hasher>(&self, state: &mut H)
```

Feeds this value into the given `Hasher`.

# Examples

```rust
use std::hash::{DefaultHasher, Hash, Hasher};

let mut hasher = DefaultHasher::new();
7920.hash(&mut hasher);
println!("Hash is {:x}!", hasher.finish());
```

## Hash::hash_slice

```rust
fn hash_slice<H: Hasher>(data: &[Self], state: &mut H) where Self: Sized,
```

Feeds a slice of this type into the given `Hasher`.

This method is meant as a convenience, but its implementation is
also explicitly left unspecified. It isn't guaranteed to be
equivalent to repeated calls of `hash` and implementations of
`Hash` should keep that in mind and call `hash` themselves
if the slice isn't treated as a whole unit in the `PartialEq`
implementation.

For example, a `VecDeque` implementation might naïvely call
`as_slices` and then `hash_slice` on each slice, but this
is wrong since the two slices can change with a call to
`make_contiguous` without affecting the `PartialEq`
result. Since these slices aren't treated as singular
units, and instead part of a larger deque, this method cannot
be used.

# Examples

```rust
use std::hash::{DefaultHasher, Hash, Hasher};

let mut hasher = DefaultHasher::new();
let numbers = [6, 28, 496, 8128];
Hash::hash_slice(&numbers, &mut hasher);
println!("Hash is {:x}!", hasher.finish());
```

## trait Hasher

```rust
pub trait Hasher
```

A trait for hashing an arbitrary stream of bytes.

Instances of `Hasher` usually represent state that is changed while hashing
data.

`Hasher` provides a fairly basic <example-value> for retrieving the generated hash
(with `finish`), and writing integers as well as slices of bytes into an
instance (with `write` and `write_u8` etc.). Most of the time, `Hasher`
instances are used in conjunction with the `Hash` trait.

This trait provides no guarantees about how the various `write_*` methods are
defined and implementations of `Hash` should not assume that they work one
way or another. You cannot assume, for example, that a `write_u32` call is
equivalent to four calls of `write_u8`.  Nor can you assume that adjacent
`write` calls are merged, so it's possible, for example, that
```rust
hasher.write(&[1, 2]);
hasher.write(&[3, 4, 5, 6]);
```
and
```rust
hasher.write(&[1, 2, 3, 4]);
hasher.write(&[5, 6]);
```
end up producing different hashes.

Thus to produce the same hash value, `Hash` implementations must ensure
for equivalent items that exactly the same sequence of calls is made -- the
same methods with the same parameters in the same order.

# Examples

```rust
use std::hash::{DefaultHasher, Hasher};

let mut hasher = DefaultHasher::new();

hasher.write_u32(1989);
hasher.write_u8(11);
hasher.write_u8(9);
hasher.write(b"Huh?");

println!("Hash is {:x}!", hasher.finish());
```

## Hasher::finish

```rust
fn finish(&self) -> u64
```

Returns the hash value for the values written so far.

Despite its name, the method does not reset the hasher’s internal
state. Additional `write`s will continue from the current value.
If you need to start a fresh hash value, you will have to create
a new hasher.

# Examples

```rust
use std::hash::{DefaultHasher, Hasher};

let mut hasher = DefaultHasher::new();
hasher.write(b"Cool!");

println!("Hash is {:x}!", hasher.finish());
```

## Hasher::write

```rust
fn write(&mut self, bytes: &[u8])
```

Writes some data into this `Hasher`.

# Examples

```rust
use std::hash::{DefaultHasher, Hasher};

let mut hasher = DefaultHasher::new();
let data = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef];

hasher.write(&data);

println!("Hash is {:x}!", hasher.finish());
```

# Note to Implementers

You generally should not do length-prefixing as part of implementing
this method.  It's up to the `Hash` implementation to call
`Hasher::write_length_prefix` before sequences that need it.

## Hasher::write_u8

```rust
fn write_u8(&mut self, i: u8)
```

Writes a single `u8` into this hasher.

## Hasher::write_u16

```rust
fn write_u16(&mut self, i: u16)
```

Writes a single `u16` into this hasher.

## Hasher::write_u32

```rust
fn write_u32(&mut self, i: u32)
```

Writes a single `u32` into this hasher.

## Hasher::write_u64

```rust
fn write_u64(&mut self, i: u64)
```

Writes a single `u64` into this hasher.

## Hasher::write_u128

```rust
fn write_u128(&mut self, i: u128)
```

Writes a single `u128` into this hasher.

## Hasher::write_usize

```rust
fn write_usize(&mut self, i: usize)
```

Writes a single `usize` into this hasher.

## Hasher::write_i8

```rust
fn write_i8(&mut self, i: i8)
```

Writes a single `i8` into this hasher.

## Hasher::write_i16

```rust
fn write_i16(&mut self, i: i16)
```

Writes a single `i16` into this hasher.

## Hasher::write_i32

```rust
fn write_i32(&mut self, i: i32)
```

Writes a single `i32` into this hasher.

## Hasher::write_i64

```rust
fn write_i64(&mut self, i: i64)
```

Writes a single `i64` into this hasher.

## Hasher::write_i128

```rust
fn write_i128(&mut self, i: i128)
```

Writes a single `i128` into this hasher.

## Hasher::write_isize

```rust
fn write_isize(&mut self, i: isize)
```

Writes a single `isize` into this hasher.

## trait BuildHasher

```rust
pub trait BuildHasher
```

A trait for creating instances of `Hasher`.

A `BuildHasher` is typically used (e.g., by `HashMap`) to create
`Hasher`s for each key such that they are hashed independently of one
another, since `Hasher`s contain state.

For each instance of `BuildHasher`, the `Hasher`s created by
`build_hasher` should be identical. That is, if the same stream of bytes
is fed into each hasher, the same output will also be generated.

# Examples

```rust
use std::hash::{BuildHasher, Hasher, RandomState};

let s = RandomState::new();
let mut hasher_1 = s.build_hasher();
let mut hasher_2 = s.build_hasher();

hasher_1.write_u32(8128);
hasher_2.write_u32(8128);

assert_eq!(hasher_1.finish(), hasher_2.finish());
```

## BuildHasher::Hasher

```rust
type Hasher: Hasher
```

Type of the hasher that will be created.

## BuildHasher::build_hasher

```rust
fn build_hasher(&self) -> Self::Hasher
```

Creates a new hasher.

Each call to `build_hasher` on the same instance should produce identical
`Hasher`s.

# Examples

```rust
use std::hash::{BuildHasher, RandomState};

let s = RandomState::new();
let new_s = s.build_hasher();
```

## BuildHasher::hash_one

```rust
fn hash_one<T: Hash>(&self, x: T) -> u64 where Self: Sized, Self::Hasher: Hasher,
```

Calculates the hash of a single value.

This is intended as a convenience for code which *consumes* hashes, such
as the implementation of a hash table or in unit tests that check
whether a custom `Hash` implementation behaves as expected.

This must not be used in any code which *creates* hashes, such as in an
implementation of `Hash`.  The way to create a combined hash of
multiple values is to call `Hash::hash` multiple times using the same
`Hasher`, not to call this method repeatedly and combine the results.

# Example

```rust
use std::cmp::{max, min};
use std::hash::{BuildHasher, Hash, Hasher};
struct OrderAmbivalentPair<T: Ord>(T, T);
impl<T: Ord + Hash> Hash for OrderAmbivalentPair<T> {
    fn hash<H: Hasher>(&self, hasher: &mut H) {
        min(&self.0, &self.1).hash(hasher);
        max(&self.0, &self.1).hash(hasher);
    }
}

// Then later, in a `#[test]` for the type...
let bh = std::hash::RandomState::new();
assert_eq!(
    bh.hash_one(OrderAmbivalentPair(1, 2)),
    bh.hash_one(OrderAmbivalentPair(2, 1))
);
assert_eq!(
    bh.hash_one(OrderAmbivalentPair(10, 2)),
    bh.hash_one(&OrderAmbivalentPair(2, 10))
);
```

## struct BuildHasherDefault

```rust
pub struct BuildHasherDefault<H>(marker::PhantomData<fn() -> H>)
```

Used to create a default `BuildHasher` instance for types that implement
`Hasher` and `Default`.

`BuildHasherDefault<H>` can be used when a type `H` implements `Hasher` and
`Default`, and you need a corresponding `BuildHasher` instance, but none is
defined.

Any `BuildHasherDefault` is [zero-sized]. It can be created with
`default`[method.default]. When using `BuildHasherDefault` with `HashMap` or
`HashSet`, this doesn't need to be done, since they implement appropriate
`Default` instances themselves.

# Examples

Using `BuildHasherDefault` to specify a custom `BuildHasher` for
`HashMap`:

```rust
use std::collections::HashMap;
use std::hash::{BuildHasherDefault, Hasher};

#[derive(Default)]
struct MyHasher;

impl Hasher for MyHasher {
    fn write(&mut self, bytes: &[u8]) {
        // Your hashing algorithm goes here!
       unimplemented!()
    }

    fn finish(&self) -> u64 {
        // Your hashing algorithm goes here!
        unimplemented!()
    }
}

type MyBuildHasher = BuildHasherDefault<MyHasher>;

let hash_map = HashMap::<u32, u32, MyBuildHasher>::default();
```

## BuildHasherDefault::new

```rust
pub const fn new() -> Self
```

Creates a new BuildHasherDefault for Hasher `H`.
