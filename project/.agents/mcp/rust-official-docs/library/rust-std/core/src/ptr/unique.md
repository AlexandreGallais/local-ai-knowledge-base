---
title: "core::ptr::unique"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ptr/unique.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ptr::unique

## Unique::dangling

```rust
pub const fn dangling() -> Self
```

Creates a new `Unique` that is dangling, but well-aligned.

This is useful for initializing types which lazily allocate, like
`Vec::new` does.

Note that the address of the returned pointer may potentially
be that of a valid pointer, which means this must not be used
as a "not yet initialized" sentinel value.
Types that lazily allocate must track initialization by some other means.

## Unique::new_unchecked

```rust
pub const unsafe fn new_unchecked(ptr: *mut T) -> Self
```

Creates a new `Unique`.

# Safety

`ptr` must be non-null.

## Unique::new

```rust
pub const fn new(ptr: *mut T) -> Option<Self>
```

Creates a new `Unique` if `ptr` is non-null.

## Unique::from_non_null

```rust
pub const fn from_non_null(pointer: NonNull<T>) -> Self
```

Create a new `Unique` from a `NonNull` in const context.

## Unique::as_ptr

```rust
pub const fn as_ptr(self) -> *mut T
```

Acquires the underlying `*mut` pointer.

## Unique::as_non_null_ptr

```rust
pub const fn as_non_null_ptr(self) -> NonNull<T>
```

Acquires the underlying `*mut` pointer.

## Unique::as_ref

```rust
pub const unsafe fn as_ref(&self) -> &T
```

Dereferences the content.

The resulting lifetime is bound to self so this behaves "as if"
it were actually an instance of T that is getting borrowed. If a longer
(unbound) lifetime is needed, use `&*my_ptr.as_ptr()`.

## Unique::as_mut

```rust
pub const unsafe fn as_mut(&mut self) -> &mut T
```

Mutably dereferences the content.

The resulting lifetime is bound to self so this behaves "as if"
it were actually an instance of T that is getting borrowed. If a longer
(unbound) lifetime is needed, use `&mut *my_ptr.as_ptr()`.

## Unique::cast

```rust
pub const fn cast<U>(self) -> Unique<U>
```

Casts to a pointer of another type.
