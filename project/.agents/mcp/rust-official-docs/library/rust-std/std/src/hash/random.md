# std::hash::random

This module exists to isolate [`RandomState`] and [`DefaultHasher`] outside of the
[`collections`] module without actually publicly exporting them, so that parts of that
implementation can more easily be moved to the [`alloc`] crate.

Although its items are public and contain stability attributes, they can't actually be accessed
outside this crate.

[`collections`]: crate::collections

## struct RandomState

```rust
pub struct RandomState
```

`RandomState` is the default state for [`HashMap`] types.

A particular instance `RandomState` will create the same instances of
[`Hasher`], but the hashers created by two different `RandomState`
instances are unlikely to produce the same result for the same values.

[`HashMap`]: crate::collections::HashMap

# Examples

```
use std::collections::HashMap;
use std::hash::RandomState;

let s = RandomState::new();
let mut map = HashMap::with_hasher(s);
map.insert(1, 2);
```

## struct DefaultHasher

```rust
pub struct DefaultHasher(SipHasher13)
```

The default [`Hasher`] used by [`RandomState`].

The internal algorithm is not specified, and so it and its hashes should
not be relied upon over releases.

## DefaultHasher::new

```rust
pub const fn new() -> DefaultHasher
```

Creates a new `DefaultHasher`.

This hasher is not guaranteed to be the same as all other
`DefaultHasher` instances, but is the same as all other `DefaultHasher`
instances created through `new` or `default`.