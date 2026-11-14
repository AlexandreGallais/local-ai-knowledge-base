---
title: "core::mem (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/mem/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::mem (part 2 of 3)

## fn needs_drop

```rust
pub const fn needs_drop<T: ?Sized>() -> bool
```

Returns `true` if dropping values of type `T` matters.

This is purely an optimization hint, and may be implemented conservatively:
it may return `true` for types that don't actually need to be dropped.
As such always returning `true` would be a valid implementation of
this function. However if this function actually returns `false`, then you
can be certain dropping `T` has no side effect.

Low level implementations of things like collections, which need to manually
drop their data, should use this function to avoid unnecessarily
trying to drop all their contents when they are destroyed. This might not
make a difference in release builds (where a loop that has no side-effects
is easily detected and eliminated), but is often a big win for debug builds.

Note that `drop_in_place` already performs this check, so if your workload
can be reduced to some small number of `drop_in_place` calls, using this is
unnecessary. In particular note that you can `drop_in_place` a slice, and that
will do a single needs_drop check for all the values.

Types like Vec therefore just `drop_in_place(&mut self[..])` without using
`needs_drop` explicitly. Types like `HashMap`, on the other hand, have to drop
values one at a time and should use this API.

# Examples

Here's an example of how a collection might make use of `needs_drop`:

```rust
use std::{mem, ptr};

pub struct MyCollection<T> {
    /* ... */
}

impl<T> Drop for MyCollection<T> {
    fn drop(&mut self) {
        unsafe {
            // drop the data
            if mem::needs_drop::<T>() {
                for x in self.iter_mut() {
                    ptr::drop_in_place(x);
                }
            }
            self.free_buffer();
        }
    }
}
```

## fn zeroed

```rust
pub const unsafe fn zeroed<T>() -> T
```

Returns the value of type `T` represented by the all-zero byte-pattern.

This means that, for example, the padding byte in `(u8, u16)` is not
necessarily zeroed.

This has the same effect as `MaybeUninit::zeroed().assume_init()`[zeroed].
It is useful for FFI sometimes, but should generally be avoided.

# Safety

The all-zero byte-pattern must represent a valid value of type `T`.
For example, it is not valid for reference types (`&T`, `&mut T`) or function
pointers. Using `zeroed` on such types causes immediate undefined behavior
because the Rust compiler assumes that there always is a valid value in a
variable it considers initialized.

# Examples

Correct usage of this function: initializing an integer with zero.

```rust
use std::mem;

let x: i32 = unsafe { mem::zeroed() };
assert_eq!(0, x);
```

*Incorrect* usage of this function: initializing a reference with zero.

```rust
use std::mem;

let _x: &i32 = unsafe { mem::zeroed() }; // Undefined behavior!
let _y: fn() = unsafe { mem::zeroed() }; // And again!
```

## fn uninitialized

```rust
pub unsafe fn uninitialized<T>() -> T
```

Bypasses Rust's normal memory-initialization checks by pretending to
produce a value of type `T`, while doing nothing at all.

**This function is deprecated.** Use `MaybeUninit<T>` instead.
It also might be slower than using `MaybeUninit<T>` due to mitigations that were put in place to
limit the potential harm caused by incorrect use of this function in legacy code.

The reason for deprecation is that the function basically cannot be used
correctly: it has the same effect as `MaybeUninit::uninit().assume_init()`[uninit].
As the `assume_init` documentation explains,
the Rust compiler assumes that values are properly initialized.

Truly uninitialized memory like what gets returned here
is special in that the compiler knows that it does not have a fixed value.
This makes it undefined behavior to have uninitialized data in a variable even
if that variable has an integer type.

Therefore, it is immediate undefined behavior to call this function on nearly all types,
including integer types and arrays of integer types, and even if the result is unused.

## fn swap

```rust
pub const fn swap<T>(x: &mut T, y: &mut T)
```

Swaps the values at two mutable locations, without deinitializing either one.

* If you want to swap with a default or dummy value, see `take`.
* If you want to swap with a passed value, returning the old value, see `replace`.

# Examples

```rust
use std::mem;

let mut x = 5;
let mut y = 42;

mem::swap(&mut x, &mut y);

assert_eq!(42, x);
assert_eq!(5, y);
```

## fn take

```rust
pub const fn take<T: [const] Default>(dest: &mut T) -> T
```

Replaces `dest` with the default value of `T`, returning the previous `dest` value.

* If you want to replace the values of two variables, see `swap`.
* If you want to replace with a passed value instead of the default value, see `replace`.

# Examples

A simple example:

```rust
use std::mem;

let mut v: Vec<i32> = vec![1, 2];

let old_v = mem::take(&mut v);
assert_eq!(vec![1, 2], old_v);
assert!(v.is_empty());
```

`take` allows taking ownership of a struct field by replacing it with an "empty" value.
Without `take` you can run into issues like these:

```
struct Buffer<T> { buf: Vec<T> }

impl<T> Buffer<T> {
    fn get_and_reset(&mut self) -> Vec<T> {
        // error: cannot move out of dereference of `&mut`-pointer
        let buf = self.buf;
        self.buf = Vec::new();
        buf
    }
}
```rust

Note that `T` does not necessarily implement `Clone`, so it can't even clone and reset
`self.buf`. But `take` can be used to disassociate the original value of `self.buf` from
`self`, allowing it to be returned:

```
use std::mem;

# struct Buffer<T> { buf: Vec<T> }
impl<T> Buffer<T> {
    fn get_and_reset(&mut self) -> Vec<T> {
        mem::take(&mut self.buf)
    }
}

let mut buffer = Buffer { buf: vec![0, 1] };
assert_eq!(buffer.buf.len(), 2);

assert_eq!(buffer.get_and_reset(), vec![0, 1]);
assert_eq!(buffer.buf.len(), 0);
```rust

## fn replace

```rust
pub const fn replace<T>(dest: &mut T, src: T) -> T
```

Moves `src` into the referenced `dest`, returning the previous `dest` value.

Neither value is dropped.

* If you want to replace the values of two variables, see `swap`.
* If you want to replace with a default value, see `take`.

# Examples

A simple example:

```rust
use std::mem;

let mut v: Vec<i32> = vec![1, 2];

let old_v = mem::replace(&mut v, vec![3, 4, 5]);
assert_eq!(vec![1, 2], old_v);
assert_eq!(vec![3, 4, 5], v);
```

`replace` allows consumption of a struct field by replacing it with another value.
Without `replace` you can run into issues like these:

```
struct Buffer<T> { buf: Vec<T> }

impl<T> Buffer<T> {
    fn replace_index(&mut self, i: usize, v: T) -> T {
        // error: cannot move out of dereference of `&mut`-pointer
        let t = self.buf[i];
        self.buf[i] = v;
        t
    }
}
```rust

Note that `T` does not necessarily implement `Clone`, so we can't even clone `self.buf[i]` to
avoid the move. But `replace` can be used to disassociate the original value at that index from
`self`, allowing it to be returned:

```
# #![allow(dead_code)]
use std::mem;

# struct Buffer<T> { buf: Vec<T> }
impl<T> Buffer<T> {
    fn replace_index(&mut self, i: usize, v: T) -> T {
        mem::replace(&mut self.buf[i], v)
    }
}

let mut buffer = Buffer { buf: vec![0, 1] };
assert_eq!(buffer.buf[0], 0);

assert_eq!(buffer.replace_index(0, 2), 0);
assert_eq!(buffer.buf[0], 2);
```rust

## fn drop

```rust
pub const fn drop<T>(_x: T) where T: [const] Destruct,
```

Disposes of a value.

This effectively does nothing for types which implement `Copy`, e.g.
integers. Such values are copied and _then_ moved into the function, so the
value persists after this function call.

This function is not magic; it is literally defined as

```rust
pub fn drop<T>(_x: T) {}
```

Because `_x` is moved into the function, it is automatically dropped before
the function returns.

# Examples

Basic usage:

```rust
let v = vec![1, 2, 3];

drop(v); // explicitly drop the vector
```

Since `RefCell` enforces the borrow rules at runtime, `drop` can
release a `RefCell` borrow:

```rust
use std::cell::RefCell;

let x = RefCell::new(1);

let mut mutable_borrow = x.borrow_mut();
*mutable_borrow = 1;

drop(mutable_borrow); // relinquish the mutable borrow on this slot

let borrow = x.borrow();
println!("{}", *borrow);
```

Integers and other types implementing `Copy` are unaffected by `drop`.

```rust
#[derive(Copy, Clone)]
struct Foo(u8);

let x = 1;
let y = Foo(2);
drop(x); // a copy of `x` is moved and dropped
drop(y); // a copy of `y` is moved and dropped

println!("x: {}, y: {}", x, y.0); // still available
```

## fn transmute_copy

```rust
pub const unsafe fn transmute_copy<Src: ?Sized, Dst>(src: &Src) -> Dst
```

Interprets `src` as having type `&Dst`, and then reads `src` without moving
the contained value.

This function will unsafely assume the pointer `src` is valid for `size_of::<Dst>`[size_of]
bytes by transmuting `&Src` to `&Dst` and then reading the `&Dst` (except that this is done
in a way that is correct even when `&Dst` has stricter alignment requirements than `&Src`).
It will also unsafely create a copy of the contained value instead of moving out of `src`.

It is not a compile-time error if `Src` and `Dst` have different sizes, but it
is highly encouraged to only invoke this function where `Src` and `Dst` have the
same size. This function triggers undefined behavior if `Dst` is larger than
`Src`.

If you have a raw pointer instead of a reference, you might be looking for
`src.cast::<Dst>().``read_unaligned()` instead.

# Safety

- Requires `size_of_val::<Src>(src) >= size_of::<Dst>()`
- The first `size_of::<Dst>()` bytes behind `src` must be *readable*
- The first `size_of::<Dst>()` bytes behind `src` must be *[valid]*
  when interpreted as a `Dst`.

On top of that, remember that most types have additional invariants beyond merely
being considered initialized at the type level. For example, a `1`-initialized `Vec<T>`
is considered initialized (under the current implementation; this does not constitute
a stable guarantee) because the only requirement the compiler knows about it
is that the data pointer must be non-null. Creating such a `Vec<T>` does not cause
*immediate* undefined behavior, but will cause undefined behavior with most
safe operations (including dropping it).

# Examples

```rust
use std::mem;

#[repr(packed)]
struct Foo {
    bar: u8,
}

let foo_array = [10u8];

unsafe {
    // Copy the data from 'foo_array' and treat it as a 'Foo'
    let mut foo_struct: Foo = mem::transmute_copy(&foo_array);
    assert_eq!(foo_struct.bar, 10);

    // Modify the copied data
    foo_struct.bar = 20;
    assert_eq!(foo_struct.bar, 20);
}

// The contents of 'foo_array' should not have changed
assert_eq!(foo_array, [10]);

let bytes: &[u8] = &[1, 2, 3, 4, 5, 6, 7];
assert_eq!(
    unsafe { mem::transmute_copy::<[u8], u32>(bytes) },
    u32::from_ne_bytes(*bytes.first_chunk().unwrap()),
);
```

## struct Discriminant

```rust
pub struct Discriminant<T>(<T as DiscriminantKind>::Discriminant)
```

Opaque type representing the discriminant of an enum.

See the `discriminant` function in this module for more information.

## fn discriminant

```rust
pub const fn discriminant<T>(v: &T) -> Discriminant<T>
```

Returns a value uniquely identifying the enum variant in `v`.

If `T` is not an enum, calling this function will not result in undefined behavior, but the
return value is unspecified.

# Stability

The discriminant of an enum variant may change if the enum definition changes. A discriminant
of some variant will not change between compilations with the same compiler. See the [Reference]
for more information.

The value of a `Discriminant<T>` is independent of any *free lifetimes* in `T`. As such,
reading or writing a `Discriminant<Foo<'a>>` as a `Discriminant<Foo<'b>>` (whether via
`transmute` or otherwise) is always sound. Note that this is **not** true for other kinds
of generic parameters and for higher-ranked lifetimes; `Discriminant<Foo>` and
`Discriminant<Foo>` as well as `Discriminant<Bar<dyn for<'a> Trait<'a>>>` and
`Discriminant<Bar<dyn Trait<'static>>>` may be incompatible.

# Examples

This can be used to compare enums that carry data, while disregarding
the actual data:

```rust
use std::mem;

enum Foo { A(&'static str), B(i32), C(i32) }

assert_eq!(mem::discriminant(&Foo::A("bar")), mem::discriminant(&Foo::A("baz")));
assert_eq!(mem::discriminant(&Foo::B(1)), mem::discriminant(&Foo::B(2)));
assert_ne!(mem::discriminant(&Foo::B(3)), mem::discriminant(&Foo::C(3)));
```

## Accessing the numeric value of the discriminant

Note that it is *undefined behavior* to `transmute` from `Discriminant` to a primitive!

If an enum has only unit variants, then the numeric value of the discriminant can be accessed
with an `as` cast:

```rust
enum Enum {
    Foo,
    Bar,
    Baz,
}

assert_eq!(0, Enum::Foo as isize);
assert_eq!(1, Enum::Bar as isize);
assert_eq!(2, Enum::Baz as isize);
```

If an enum has opted-in to having a [primitive representation] for its discriminant,
then it's possible to use pointers to read the memory location storing the discriminant.
That **cannot** be done for enums using the [default representation], however, as it's
undefined what layout the discriminant has and where it's stored — it might not even be
stored at all!

```rust
#[repr(u8)]
enum Enum {
    Unit,
    Tuple(bool),
    Struct { a: bool },
}

impl Enum {
    fn discriminant(&self) -> u8 {
        // SAFETY: Because `Self` is marked `repr(u8)`, its layout is a `repr(C)` `union`
        // between `repr(C)` structs, each of which has the `u8` discriminant as its first
        // field, so we can read the discriminant without offsetting the pointer.
        unsafe { *<*const _>::from(self).cast::<u8>() }
    }
}

let unit_like = Enum::Unit;
let tuple_like = Enum::Tuple(true);
let struct_like = Enum::Struct { a: false };
assert_eq!(0, unit_like.discriminant());
assert_eq!(1, tuple_like.discriminant());
assert_eq!(2, struct_like.discriminant());

// ⚠️ This is undefined behavior. Don't do this. ⚠️
// assert_eq!(0, unsafe { std::mem::transmute::<_, u8>(std::mem::discriminant(&unit_like)) });
```
