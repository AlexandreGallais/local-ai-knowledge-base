# core::hash::sip

An implementation of SipHash.

## struct SipHasher

```rust
pub struct SipHasher(SipHasher24)
```

An implementation of SipHash 2-4.

See: <https://github.com/veorq/SipHash>

SipHash is a general-purpose hashing function: it runs at a good
speed (competitive with Spooky and City) and permits strong _keyed_
hashing. This lets you key your hash tables from a strong RNG, such as
[`rand::os::OsRng`](https://docs.rs/rand/latest/rand/rngs/struct.OsRng.html).

Although the SipHash algorithm is considered to be generally strong,
it is not intended for cryptographic purposes. As such, all
cryptographic uses of this implementation are _strongly discouraged_.

## macro load_int_le!

```rust
macro_rules! load_int_le
```

Loads an integer of the desired type from a byte stream, in LE order. Uses
`copy_nonoverlapping` to let the compiler generate the most efficient way
to load it from a possibly unaligned address.

Safety: this performs unchecked indexing of `$buf` at
`$i..$i+size_of::<$int_ty>()`, so that must be in-bounds.

## SipHasher::new

```rust
pub fn new() -> SipHasher
```

Creates a new `SipHasher` with the two initial keys set to 0.

## SipHasher::new_with_keys

```rust
pub fn new_with_keys(key0: u64, key1: u64) -> SipHasher
```

Creates a `SipHasher` that is keyed off the provided keys.