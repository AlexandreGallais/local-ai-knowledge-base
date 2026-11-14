---
title: "alloc::boxed (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/boxed.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::boxed (part 3 of 3)

## Box::as_ptr

```rust
pub fn as_ptr(b: &Self) -> *const T
```

Returns a raw pointer to the `Box`'s contents.

The caller must ensure that the `Box` outlives the pointer this
function returns, or else it will end up dangling.

The caller must also ensure that the memory the pointer (non-transitively) points to
is never written to (except inside an `UnsafeCell`) using this pointer or any pointer
derived from it. If you need to mutate the contents of the `Box`, use `as_mut_ptr`.

This method guarantees that for the purpose of the aliasing model, this method
does not materialize a reference to the underlying memory, and thus the returned pointer
will remain valid when mixed with other calls to `as_ptr`, `as_mut_ptr`, and `as_non_null`.
Note that calling other methods that materialize mutable references to the memory,
as well as writing to this memory, may still invalidate this pointer.
See the example below for how this guarantee can be used.

# Examples

Due to the aliasing guarantee, the following code is legal:

```rust
unsafe {
    let mut v = Box::new(0);
    let ptr1 = Box::as_ptr(&v);
    let ptr2 = Box::as_mut_ptr(&mut v);
    let _val = ptr2.read();
    // No write to this memory has happened yet, so `ptr1` is still valid.
    let _val = ptr1.read();
    // However, once we do a write...
    ptr2.write(1);
    // ... `ptr1` is no longer valid.
    // This would be UB: let _val = ptr1.read();
}
```

## Box::allocator

```rust
pub fn allocator(b: &Self) -> &A
```

Returns a reference to the underlying allocator.

Note: this is an associated function, which means that you have
to call it as `Box::allocator(&b)` instead of `b.allocator()`. This
is so that there is no conflict with a method on the inner type.

## Box::leak

```rust
pub fn leak<'a>(b: Self) -> &'a mut T where A: 'a,
```

Consumes and leaks the `Box`, returning a mutable reference,
`&'a mut T`.

Note that the type `T` must outlive the chosen lifetime `'a`. If the type
has only static references, or none at all, then this may be chosen to be
`'static`.

This function is mainly useful for data that lives for the remainder of the program's life,
i.e., memory that is meant to leak. If the memory should eventually be freed, prefer to use
`Box::into_raw` or `Box::into_non_null` instead. Reconstructing ("unleaking") a `Box` from
the mutable reference returned here (e.g. via `Box::from_raw`) is only possible if the
allocator is `Global`, and even then it is a grey area (meaning it is possible under specific
circumstances but many seemingly harmless ways of doing it are undefined behavior) and should
be avoided.

Note: this is an associated function, which means that you have
to call it as `Box::leak(b)` instead of `b.leak()`. This
is so that there is no conflict with a method on the inner type.

# Examples

Simple usage:

```rust
let x = Box::new(41);
let static_ref: &'static mut usize = Box::leak(x);
*static_ref += 1;
assert_eq!(*static_ref, 42);
```

Unsized data:

```rust
let x = vec![1, 2, 3].into_boxed_slice();
let static_ref = Box::leak(x);
static_ref[0] = 4;
assert_eq!(*static_ref, [4, 2, 3]);
```

## Box::into_pin

```rust
pub fn into_pin(boxed: Self) -> Pin<Self> where A: StaticAllocator,
```

Converts a `Box<T>` into a `Pin<Box<T>>`. If `T` does not implement `Unpin`, then
`*boxed` will be pinned in memory and unable to be moved.

This conversion does not allocate on the heap and happens in place.

This is also available via `From`.

Constructing and pinning a `Box` with `Box::into_pin([Box::new]\(x))`
can also be written more concisely using `[Box::pin]\(x)`.
This `into_pin` method is useful if you already have a `Box<T>`, or you are
constructing a (pinned) `Box` in a different way than with `Box::new`.

# Notes

It's not recommended that crates add an impl like `From<Box<T>> for Pin<T>`,
as it'll introduce an ambiguity when calling `Pin::from`.
A demonstration of such a poor impl is shown below.

```rust
struct Foo; // A type defined in this crate.
impl From<Box<()>> for Pin<Foo> {
    fn from(_: Box<()>) -> Pin<Foo> {
        Pin::new(Foo)
    }
}

let foo = Box::new(());
let bar = Pin::from(foo);
```
