# core::mem::maybe_dangling

## struct MaybeDangling

```rust
pub struct MaybeDangling<P: ?Sized>(P)
```

```rust,no_run
#![feature(maybe_dangling)]
# use std::alloc::{dealloc, Layout};
# use std::mem::{self, MaybeDangling};

let mut boxed = MaybeDangling::new(Box::new(0_u32));
let ptr = Box::as_mut_ptr(boxed.as_mut());

// Safety: the pointer comes from a box and thus was allocated before; `box` is not used afterwards
unsafe { dealloc(ptr.cast(), Layout::new::<u32>()) };

mem::forget(boxed); // <-- this is OK!
```

Note that the bit pattern must still be valid for the wrapped type. That is, [references]
(and [boxes]) still must be aligned and non-null.

Additionally note that safe code can still assume that the inner value in a `MaybeDangling` is
**not** dangling -- functions like [`as_ref`] and [`into_inner`] are safe. It is not sound to
return a dangling reference in a `MaybeDangling` to safe code. However, it *is* sound
to hold such values internally inside your code -- and there's no way to do that without
this type. Note that other types can use this type and thus get the same effect; in particular,
[`ManuallyDrop`] will use `MaybeDangling`.

Note that `MaybeDangling` doesn't prevent drops from being run, which can lead to UB if the
drop observes a dangling value. If you need to prevent drops from being run use [`ManuallyDrop`]
instead.

[references]: prim@reference
[boxes]: ../../std/boxed/struct.Box.html
[`into_inner`]: MaybeDangling::into_inner
[`as_ref`]: MaybeDangling::as_ref
[`ManuallyDrop`]: crate::mem::ManuallyDrop

## MaybeDangling::new

```rust
pub const fn new(x: P) -> Self where P: Sized,
```

Wraps a value in a `MaybeDangling`, allowing it to dangle.

## MaybeDangling::as_ref

```rust
pub const fn as_ref(&self) -> &P
```

Returns a reference to the inner value.

Note that this is UB if the inner value is currently dangling.

## MaybeDangling::as_mut

```rust
pub const fn as_mut(&mut self) -> &mut P
```

Returns a mutable reference to the inner value.

Note that this is UB if the inner value is currently dangling.

## MaybeDangling::into_inner

```rust
pub const fn into_inner(self) -> P where P: Sized,
```

Extracts the value from the `MaybeDangling` container.

Note that this is UB if the inner value is currently dangling.