---
title: "core::mem::maybe_uninit (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/mem/maybe_uninit.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::mem::maybe_uninit

## MaybeUninit::new

```rust
pub const fn new(val: T) -> MaybeUninit<T>
```

Creates a new `MaybeUninit<T>` initialized with the given value.
It is safe to call `assume_init` on the return value of this function.

Note that dropping a `MaybeUninit<T>` will never call `T`'s drop code.
It is your responsibility to make sure `T` gets dropped if it got initialized.

# Example

```rust
use std::mem::MaybeUninit;

let v: MaybeUninit<Vec<u8>> = MaybeUninit::new(vec![42]);
```

## MaybeUninit::uninit

```rust
pub const fn uninit() -> MaybeUninit<T>
```

Creates a new `MaybeUninit<T>` in an uninitialized state.

Note that dropping a `MaybeUninit<T>` will never call `T`'s drop code.
It is your responsibility to make sure `T` gets dropped if it got initialized.

See the type-level documentation for some examples.

# Example

```rust
use std::mem::MaybeUninit;

let v: MaybeUninit<String> = MaybeUninit::uninit();
```

## MaybeUninit::zeroed

```rust
pub const fn zeroed() -> MaybeUninit<T>
```

Creates a new `MaybeUninit<T>` in an uninitialized state, with the memory being
filled with `0` bytes. It depends on `T` whether that already makes for
proper initialization. For example, `MaybeUninit<usize>::zeroed()` is initialized,
but `MaybeUninit<&'static i32>::zeroed()` is not because references must not
be null.

Note that if `T` has padding bytes, those bytes are *not* preserved when the
`MaybeUninit<T>` value is returned from this function, so those bytes are not
guaranteed to be zeroed.

Note that dropping a `MaybeUninit<T>` will never call `T`'s drop code.
It is your responsibility to make sure `T` gets dropped if it got initialized.

# Example

Correct usage of this function: initializing a struct with zero, where all
fields of the struct can hold the bit-pattern 0 as a valid value.

```rust
use std::mem::MaybeUninit;

let x = MaybeUninit::<(u8, bool)>::zeroed();
let x = unsafe { x.assume_init() };
assert_eq!(x, (0, false));
```

This can be used in const contexts, such as to indicate the end of static arrays for
plugin registration.

*Incorrect* usage of this function: calling `x.zeroed().assume_init()`
when `0` is not a valid bit-pattern for the type:

```rust
use std::mem::MaybeUninit;

enum NotZero { One = 1, Two = 2 }

let x = MaybeUninit::<(u8, NotZero)>::zeroed();
let x = unsafe { x.assume_init() };
// Inside a pair, we create a `NotZero` that does not have a valid discriminant.
// This is undefined behavior. ⚠️
```

## MaybeUninit::write

```rust
pub const fn write(&mut self, val: T) -> &mut T
```

Sets the value of the `MaybeUninit<T>`.

This overwrites any previous value without dropping it, so be careful
not to use this twice unless you want to skip running the destructor.
For your convenience, this also returns a mutable reference to the
(now safely initialized) contents of `self`.

As the content is stored inside a `ManuallyDrop`, the destructor is not
run for the inner data if the MaybeUninit leaves scope without a call to
`assume_init`, `assume_init_drop`, or similar. Code that receives
the mutable reference returned by this function needs to keep this in
mind. The safety model of Rust regards leaks as safe, but they are
usually still undesirable. This being said, the mutable reference
behaves like any other mutable reference would, so assigning a new value
to it will drop the old content.

# Examples

Correct usage of this method:

```rust
use std::mem::MaybeUninit;

let mut x = MaybeUninit::<Vec<u8>>::uninit();

{
    let hello = x.write((&b"Hello, world!").to_vec());
    // Setting hello does not leak prior allocations, but drops them
    *hello = (&b"Hello").to_vec();
    hello[0] = 'h' as u8;
}
// x is initialized now:
let s = unsafe { x.assume_init() };
assert_eq!(b"hello", s.as_slice());
```

This usage of the method causes a leak:

```rust
use std::mem::MaybeUninit;

let mut x = MaybeUninit::<String>::uninit();

x.write("Hello".to_string());
// This leaks the contained string:
x.write("hello".to_string());
// x is initialized now:
let s = unsafe { x.assume_init() };
```

This method can be used to avoid unsafe in some cases. The example below
shows a part of an implementation of a fixed sized arena that lends out
pinned references.
With `write`, we can avoid the need to write through a raw pointer:

```rust
use core::pin::Pin;
use core::mem::MaybeUninit;

struct PinArena<T> {
    memory: Box<[MaybeUninit<T>]>,
    len: usize,
}

impl <T> PinArena<T> {
    pub fn capacity(&self) -> usize {
        self.memory.len()
    }
    pub fn push(&mut self, val: T) -> Pin<&mut T> {
        if self.len >= self.capacity() {
            panic!("Attempted to push to a full pin arena!");
        }
        let ref_ = self.memory[self.len].write(val);
        self.len += 1;
        unsafe { Pin::new_unchecked(ref_) }
    }
}
```

## MaybeUninit::as_ptr

```rust
pub const fn as_ptr(&self) -> *const T
```

Gets a pointer to the contained value. Reading from this pointer or turning it
into a reference is undefined behavior unless the `MaybeUninit<T>` is initialized.
Writing to memory that this pointer (non-transitively) points to is undefined behavior
(except inside an `UnsafeCell<T>`).

# Examples

Correct usage of this method:

```rust
use std::mem::MaybeUninit;

let mut x = MaybeUninit::<Vec<u32>>::uninit();
x.write(vec![0, 1, 2]);
// Create a reference into the `MaybeUninit<T>`. This is okay because we initialized it.
let x_vec = unsafe { &*x.as_ptr() };
assert_eq!(x_vec.len(), 3);
```

*Incorrect* usage of this method:

```rust
use std::mem::MaybeUninit;

let x = MaybeUninit::<Vec<u32>>::uninit();
let x_vec = unsafe { &*x.as_ptr() };
// We have created a reference to an uninitialized vector! This is undefined behavior. ⚠️
```

(Notice that the rules around references to uninitialized data are not finalized yet, but
until they are, it is advisable to avoid them.)

## MaybeUninit::as_mut_ptr

```rust
pub const fn as_mut_ptr(&mut self) -> *mut T
```

Gets a mutable pointer to the contained value. Reading from this pointer or turning it
into a reference is undefined behavior unless the `MaybeUninit<T>` is initialized.

# Examples

Correct usage of this method:

```rust
use std::mem::MaybeUninit;

let mut x = MaybeUninit::<Vec<u32>>::uninit();
x.write(vec![0, 1, 2]);
// Create a reference into the `MaybeUninit<Vec<u32>>`.
// This is okay because we initialized it.
let x_vec = unsafe { &mut *x.as_mut_ptr() };
x_vec.push(3);
assert_eq!(x_vec.len(), 4);
```

*Incorrect* usage of this method:

```rust
use std::mem::MaybeUninit;

let mut x = MaybeUninit::<Vec<u32>>::uninit();
let x_vec = unsafe { &mut *x.as_mut_ptr() };
// We have created a reference to an uninitialized vector! This is undefined behavior. ⚠️
```

(Notice that the rules around references to uninitialized data are not finalized yet, but
until they are, it is advisable to avoid them.)

## MaybeUninit::assume_init

```rust
pub const unsafe fn assume_init(self) -> T
```

Extracts the value from the `MaybeUninit<T>` container. This is a great way
to ensure that the data will get dropped, because the resulting `T` is
subject to the usual drop handling.

# Safety

It is up to the caller to guarantee that the `MaybeUninit<T>` really is in an initialized
state, i.e., a state that is considered "valid" for type `T`. Calling this when
the content is not yet fully initialized causes immediate undefined behavior. The
type-level documentation contains more information about this initialization
invariant.

It is a common mistake to assume that this function is safe to call on integers because they
can hold all bit patterns. It is also a common mistake to think that calling this function
is UB if any byte is uninitialized. Both of these assumptions are wrong. If that is
surprising to you, please read the type-level documentation.

On top of that, remember that most types have additional invariants beyond merely
being considered initialized at the type level. For example, a `1`-initialized `Vec<T>`
is considered initialized (under the current implementation; this does not constitute
a stable guarantee) because the only requirement the compiler knows about it
is that the data pointer must be non-null. Creating such a `Vec<T>` does not cause
*immediate* undefined behavior, but will cause undefined behavior with most
safe operations (including dropping it).

# Examples

Correct usage of this method:

```rust
use std::mem::MaybeUninit;

let mut x = MaybeUninit::<bool>::uninit();
x.write(true);
let x_init = unsafe { x.assume_init() };
assert_eq!(x_init, true);
```

*Incorrect* usage of this method:

```rust
use std::mem::MaybeUninit;

let x: i32 = unsafe { MaybeUninit::uninit().assume_init() }; // undefined behavior! ⚠️
```

See the type-level documentation for more examples.

## MaybeUninit::assume_init_read

```rust
pub const unsafe fn assume_init_read(&self) -> T
```

Reads the value from the `MaybeUninit<T>` container. The resulting `T` is subject
to the usual drop handling.

Whenever possible, it is preferable to use `assume_init` instead, which
prevents duplicating the content of the `MaybeUninit<T>`.

# Safety

It is up to the caller to guarantee that the `MaybeUninit<T>` really is in an initialized
state. Calling this when the content is not yet fully initialized causes undefined
behavior. The type-level documentation contains more information about
this initialization invariant.

Moreover, similar to the `ptr::read` function, this function creates a
bitwise copy of the contents, regardless whether the contained type
implements the `Copy` trait or not. When using multiple copies of the
data (by calling `assume_init_read` multiple times, or first calling
`assume_init_read` and then `assume_init`), it is your responsibility
to ensure that data may indeed be duplicated.

# Examples

Correct usage of this method:

```rust
use std::mem::MaybeUninit;

let mut x = MaybeUninit::<u32>::uninit();
x.write(13);
let x1 = unsafe { x.assume_init_read() };
// `u32` is `Copy`, so we may read multiple times.
let x2 = unsafe { x.assume_init_read() };
assert_eq!(x1, x2);

let mut x = MaybeUninit::<Option<Vec<u32>>>::uninit();
x.write(None);
let x1 = unsafe { x.assume_init_read() };
// Duplicating a `None` value is okay, so we may read multiple times.
let x2 = unsafe { x.assume_init_read() };
assert_eq!(x1, x2);
```

*Incorrect* usage of this method:

```rust
use std::mem::MaybeUninit;

let mut x = MaybeUninit::<Option<Vec<u32>>>::uninit();
x.write(Some(vec![0, 1, 2]));
let x1 = unsafe { x.assume_init_read() };
let x2 = unsafe { x.assume_init_read() };
// We now created two copies of the same vector, leading to a double-free ⚠️ when
// they both get dropped!
```

## MaybeUninit::assume_init_drop

```rust
pub const unsafe fn assume_init_drop(&mut self) where T: [const] Destruct,
```

Drops the contained value in place.

If you have ownership of the `MaybeUninit`, you can also use
`assume_init` as an alternative.

# Safety

It is up to the caller to guarantee that the `MaybeUninit<T>` really is
in an initialized state. Calling this when the content is not yet fully
initialized causes undefined behavior.

On top of that, all additional invariants of the type `T` must be
satisfied, as the `Drop` implementation of `T` (or its members) may
rely on this. For example, setting a `Vec<T>` to an invalid but
non-null address makes it initialized (under the current implementation;
this does not constitute a stable guarantee), because the only
requirement the compiler knows about it is that the data pointer must be
non-null. Dropping such a `Vec<T>` however will cause undefined
behavior.

## MaybeUninit::assume_init_ref

```rust
pub const unsafe fn assume_init_ref(&self) -> &T
```

Gets a shared reference to the contained value.

This can be useful when we want to access a `MaybeUninit` that has been
initialized but don't have ownership of the `MaybeUninit` (preventing the use
of `.assume_init()`).

# Safety

Calling this when the content is not yet fully initialized causes undefined
behavior: it is up to the caller to guarantee that the `MaybeUninit<T>` really
is in an initialized state.

# Examples

### Correct usage of this method:

```rust
use std::mem::MaybeUninit;

let mut x = MaybeUninit::<Vec<u32>>::uninit();
// Initialize `x`:
x.write(vec![1, 2, 3]);
// Now that our `MaybeUninit<_>` is known to be initialized, it is okay to
// create a shared reference to it:
let x: &Vec<u32> = unsafe {
    // SAFETY: `x` has been initialized.
    x.assume_init_ref()
};
assert_eq!(x, &vec![1, 2, 3]);
```

### *Incorrect* usages of this method:

```rust
use std::mem::MaybeUninit;

let x = MaybeUninit::<Vec<u32>>::uninit();
let x_vec: &Vec<u32> = unsafe { x.assume_init_ref() };
// We have created a reference to an uninitialized vector! This is undefined behavior. ⚠️
```

```rust
use std::{cell::Cell, mem::MaybeUninit};

let b = MaybeUninit::<Cell<bool>>::uninit();
// Initialize the `MaybeUninit` using `Cell::set`:
unsafe {
    b.assume_init_ref().set(true);
    //^^^^^^^^^^^^^^^ Reference to an uninitialized `Cell<bool>`: UB!
}
```
