---
title: "core::pin (part 4 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/pin.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::pin (part 4 of 5)

## Pin::new_unchecked

```rust
pub const unsafe fn new_unchecked(pointer: Ptr) -> Pin<Ptr>
```

Constructs a new `Pin<Ptr>` around a reference to some data of a type that
may or may not implement `Unpin`.

If `pointer` dereferences to an `Unpin` type, `Pin::new` should be used
instead.

# Safety

This constructor is unsafe because we cannot guarantee that the data
pointed to by `pointer` is pinned. At its core, pinning a value means making the
guarantee that the value's data will not be moved nor have its storage invalidated until
it gets dropped. For a more thorough explanation of pinning, see the [`pin` module docs].

If the caller that is constructing this `Pin<Ptr>` does not ensure that the data `Ptr`
points to is pinned, that is a violation of the API contract and may lead to undefined
behavior in later (even safe) operations.

By using this method, you are also making a promise about several trait
implementations of `Ptr` itself, if they exist. Most importantly, they
must not move out of their `self` arguments: `Pin::as_mut` and
`Pin::as_ref` will call `DerefMut::deref_mut` and `Deref::deref` *on the
pointer type `Ptr`* and expect these methods to uphold the pinning
invariants. These requirements are specified in more detail on the
`PinSafePointer` trait, and `Ptr` must abide by the safety
requirements of that trait.

Moreover, by calling this method you promise that the reference `Ptr`
dereferences to will not be moved out of again; in particular, it
must not be possible to obtain a `&mut Ptr::Target` and then
move out of that reference (using, for example `mem::swap`).

For example, calling `Pin::new_unchecked` on an `&'a mut T` is unsafe because
while you are able to pin it for the given lifetime `'a`, you have no control
over whether it is kept pinned once `'a` ends, and therefore cannot uphold the
guarantee that a value, once pinned, remains pinned until it is dropped:

```rust
use std::mem;
use std::pin::Pin;

fn move_pinned_ref<T>(mut a: T, mut b: T) {
    unsafe {
        let p: Pin<&mut T> = Pin::new_unchecked(&mut a);
        // This should mean the pointee `a` can never move again.
    }
    mem::swap(&mut a, &mut b); // Potential UB down the road ⚠️
    // The address of `a` changed to `b`'s stack slot, so `a` got moved even
    // though we have previously pinned it! We have violated the pinning API contract.
}
```
A value, once pinned, must remain pinned until it is dropped (unless its type implements
`Unpin`). Because `Pin<&mut T>` does not own the value, dropping the `Pin` will not drop
the value and will not end the pinning contract. So moving the value after dropping the
`Pin<&mut T>` is still a violation of the API contract.

Similarly, calling `Pin::new_unchecked` on an `Rc<T>` is unsafe because there could be
aliases to the same data that are not subject to the pinning restrictions:
```rust
use std::rc::Rc;
use std::pin::Pin;

fn move_pinned_rc<T>(mut x: Rc<T>) {
    // This should mean the pointee can never move again.
    let pin = unsafe { Pin::new_unchecked(Rc::clone(&x)) };
    {
        let p: Pin<&T> = pin.as_ref();
        // ...
    }
    drop(pin);

    let content = Rc::get_mut(&mut x).unwrap(); // Potential UB down the road ⚠️
    // Now, if `x` was the only reference, we have a mutable reference to
    // data that we pinned above, which we could use to move it as we have
    // seen in the previous example. We have violated the pinning API contract.
}
```

## Pinning of closure captures

Particular care is required when using `Pin::new_unchecked` in a closure:
`Pin::new_unchecked(&mut var)` where `var` is a by-value (moved) closure capture
implicitly makes the promise that the closure itself is pinned, and that *all* uses
of this closure capture respect that pinning.
```rust
use std::pin::Pin;
use std::task::Context;
use std::future::Future;

fn move_pinned_closure(mut x: impl Future, cx: &mut Context<'_>) {
    // Create a closure that moves `x`, and then internally uses it in a pinned way.
    let mut closure = move || unsafe {
        let _ignore = Pin::new_unchecked(&mut x).poll(cx);
    };
    // Call the closure, so the future can assume it has been pinned.
    closure();
    // Move the closure somewhere else. This also moves `x`!
    let mut moved = closure;
    // Calling it again means we polled the future from two different locations,
    // violating the pinning API contract.
    moved(); // Potential UB ⚠️
}
```
When passing a closure to another API, it might be moving the closure any time, so
`Pin::new_unchecked` on closure captures may only be used if the API explicitly documents
that the closure is pinned.

The better alternative is to avoid all that trouble and do the pinning in the outer function
instead (here using the `pin!`[crate::pin::pin] macro):
```rust
use std::pin::pin;
use std::task::Context;
use std::future::Future;

fn move_pinned_closure(mut x: impl Future, cx: &mut Context<'_>) {
    let mut x = pin!(x);
    // Create a closure that captures `x: Pin<&mut _>`, which is safe to move.
    let mut closure = move || {
        let _ignore = x.as_mut().poll(cx);
    };
    // Call the closure, so the future can assume it has been pinned.
    closure();
    // Move the closure somewhere else.
    let mut moved = closure;
    // Calling it again here is fine (except that we might be polling a future that already
    // returned `Poll::Ready`, but that is a separate problem).
    moved();
}
```

## Pin::as_ref

```rust
pub const fn as_ref(&self) -> Pin<&Ptr::Target> where Ptr: [const] Deref,
```

Gets a shared reference to the pinned value this `Pin` points to.

This is a generic method to go from `&Pin<Pointer<T>>` to `Pin<&T>`.
It is safe because, as part of the contract of `Pin::new_unchecked`,
the pointee cannot move after `Pin<Pointer<T>>` got created.
"Malicious" implementations of `Pointer::Deref` are likewise
ruled out by the contract of `Pin::new_unchecked`.

## Pin::as_mut

```rust
pub const fn as_mut(&mut self) -> Pin<&mut Ptr::Target> where Ptr: [const] DerefMut,
```

Gets a mutable reference to the pinned value this `Pin<Ptr>` points to.

This is a generic method to go from `&mut Pin<Pointer<T>>` to `Pin<&mut T>`.
It is safe because, as part of the contract of `Pin::new_unchecked`,
the pointee cannot move after `Pin<Pointer<T>>` got created.
"Malicious" implementations of `Pointer::DerefMut` are likewise
ruled out by the contract of `Pin::new_unchecked`.

This method is useful when doing multiple calls to functions that consume the
pinning pointer.

# Example

```rust
use std::pin::Pin;

impl Type {
    fn method(self: Pin<&mut Self>) {
        // do something
    }

    fn call_method_twice(mut self: Pin<&mut Self>) {
        // `method` consumes `self`, so reborrow the `Pin<&mut Self>` via `as_mut`.
        self.as_mut().method();
        self.as_mut().method();
    }
}
```

## Pin::as_deref_mut

```rust
pub const fn as_deref_mut(self: Pin<&mut Self>) -> Pin<&mut Ptr::Target> where Ptr: [const] DerefMut,
```

Gets `Pin<&mut T>` to the underlying pinned value from this nested `Pin`-pointer.

This is a generic method to go from `Pin<&mut Pin<Pointer<T>>>` to `Pin<&mut T>`. It is
safe because the existence of a `Pin<Pointer<T>>` ensures that the pointee, `T`, cannot
move in the future, and this method does not enable the pointee to move. "Malicious"
implementations of `Ptr::DerefMut` are likewise ruled out by the contract of
`Pin::new_unchecked`.

## Pin::set

```rust
pub fn set(&mut self, value: Ptr::Target) where Ptr::Target: Sized,
```

Assigns a new value to the memory location pointed to by the `Pin<Ptr>`.

This overwrites pinned data, but that is okay: the original pinned value's destructor gets
run before being overwritten and the new value is also a valid value of the same type, so
no pinning invariant is violated. See the `pin` module documentation
for more information on how this upholds the pinning invariants.

# Example

```rust
use std::pin::Pin;

let mut val: u8 = 5;
let mut pinned: Pin<&mut u8> = Pin::new(&mut val);
println!("{}", pinned); // 5
pinned.set(10);
println!("{}", pinned); // 10
```

## Pin::into_inner_unchecked

```rust
pub const unsafe fn into_inner_unchecked(pin: Pin<Ptr>) -> Ptr
```

Unwraps this `Pin<Ptr>`, returning the underlying `Ptr`.

# Safety

This function is unsafe. You must guarantee that you will continue to
treat the pointer `Ptr` as pinned after you call this function, so that
the invariants on the `Pin` type can be upheld. If the code using the
resulting `Ptr` does not continue to maintain the pinning invariants that
is a violation of the API contract and may lead to undefined behavior in
later (safe) operations.

Note that you must be able to guarantee that the data pointed to by `Ptr`
will be treated as pinned all the way until its `drop` handler is complete!

*For more information, see the `pin` module docs*

If the underlying data is `Unpin`, `Pin::into_inner` should be used
instead.

## Pin::map_unchecked

```rust
pub unsafe fn map_unchecked<U, F>(self, func: F) -> Pin<&'a U> where U: ?Sized, F: FnOnce(&T) -> &U,
```

Constructs a new pin by mapping the interior value.

For example, if you wanted to get a `Pin` of a field of something,
you could use this to get access to that field in one line of code.
However, there are several gotchas with these "pinning projections";
see the [`pin` module] documentation for further details on that topic.

# Safety

This function is unsafe. You must guarantee that the data you return
will not move so long as the argument value does not move (for example,
because it is one of the fields of that value), and also that you do
not move out of the argument you receive to the interior function.

## Pin::get_ref

```rust
pub const fn get_ref(self) -> &'a T
```

Gets a shared reference out of a pin.

This is safe because it is not possible to move out of a shared reference.
It may seem like there is an issue here with interior mutability: in fact,
it *is* possible to move a `T` out of a `&RefCell<T>`. However, this is
not a problem as long as there does not also exist a `Pin<&T>` pointing
to the inner `T` inside the `RefCell`, and `RefCell<T>` does not let you get a
`Pin<&T>` pointer to its contents. See the discussion on ["pinning projections"]
for further details.

Note: `Pin` also implements `Deref` to the target, which can be used
to access the inner value. However, `Deref` only provides a reference
that lives for as long as the borrow of the `Pin`, not the lifetime of
the reference contained in the `Pin`. This method allows turning the `Pin` into a reference
with the same lifetime as the reference it wraps.

## Pin::into_ref

```rust
pub const fn into_ref(self) -> Pin<&'a T>
```

Converts this `Pin<&mut T>` into a `Pin<&T>` with the same lifetime.

## Pin::get_mut

```rust
pub const fn get_mut(self) -> &'a mut T where T: Unpin,
```

Gets a mutable reference to the data inside of this `Pin`.

This requires that the data inside this `Pin` is `Unpin`.

Note: `Pin` also implements `DerefMut` to the data, which can be used
to access the inner value. However, `DerefMut` only provides a reference
that lives for as long as the borrow of the `Pin`, not the lifetime of
the `Pin` itself. This method allows turning the `Pin` into a reference
with the same lifetime as the original `Pin`.

## Pin::get_unchecked_mut

```rust
pub const unsafe fn get_unchecked_mut(self) -> &'a mut T
```

Gets a mutable reference to the data inside of this `Pin`.

# Safety

This function is unsafe. You must guarantee that you will never move
the data out of the mutable reference you receive when you call this
function, so that the invariants on the `Pin` type can be upheld.

If the underlying data is `Unpin`, `Pin::get_mut` should be used
instead.

## Pin::map_unchecked_mut

```rust
pub unsafe fn map_unchecked_mut<U, F>(self, func: F) -> Pin<&'a mut U> where U: ?Sized, F: FnOnce(&mut T) -> &mut U,
```

Constructs a new pin by mapping the interior value.

For example, if you wanted to get a `Pin` of a field of something,
you could use this to get access to that field in one line of code.
However, there are several gotchas with these "pinning projections";
see the [`pin` module] documentation for further details on that topic.

# Safety

This function is unsafe. You must guarantee that the data you return
will not move so long as the argument value does not move (for example,
because it is one of the fields of that value), and also that you do
not move out of the argument you receive to the interior function.

## Pin::static_ref

```rust
pub const fn static_ref(r: &'static T) -> Pin<&'static T>
```

Gets a pinning reference from a `&'static` reference.

This is safe because `T` is borrowed immutably for the `'static` lifetime, which
never ends.

## Pin::static_mut

```rust
pub const fn static_mut(r: &'static mut T) -> Pin<&'static mut T>
```

Gets a pinning mutable reference from a static mutable reference.

This is safe because `T` is borrowed for the `'static` lifetime, which
never ends.

## trait PinSafePointer

```rust
pub unsafe trait PinSafePointer: Deref + Sized
```

Trait that indicates that this is a pointer that does not misbehave when
combined with `Pin`.

Note that for backwards compatibility reasons, it is possible to create a
`Pin` for pointer types `P` that do not implement this trait. However,
this can only be done safely if `::Target` implements `Unpin`,
which means that pinning has no effect.

# Safety

Types that implement this trait must not provide "malicious" implementations
of any safe traits used by `Pin`.

## The pointer must always reference the same object

Calls to `deref`/`deref_mut` on the same `Pin` instance must always
refer to the same object. That is, the address returned by these methods
must not change. This applies even if the pointer type is moved.

These coercions must also not change the underlying concrete type. Here, the
concrete type of a trait object is the type that the vtable corresponds to.
The concrete type of a slice is an array of the same element type and the
length specified in the metadata. The concrete type of a sized type is the
type itself.

As an example, after unsizing coercing a pinned pointer, `deref_mut` must
not return a `#[repr(transparent)]` wrapper around the value it referenced
before being unsized, even if the address is unchanged.

## The pointer must not move its pointee

The `deref_mut` method and the pointer type's destructor are called with a
`&mut self` receiver, but they must behave as-if it was a `self: Pin<&mut
Self>` receiver. That is, they must not move out of the underlying value.

As an example, `deref_mut` must not invoke `swap` on the inner value.
