# alloc::alloc

Memory allocation APIs

## ::alloc

```rust
pub unsafe fn alloc(layout: Layout) -> *mut u8
```

Allocates memory with the global allocator.

This function forwards calls to the [`GlobalAlloc::alloc`] method
of the allocator registered with the `#[global_allocator]` attribute
if there is one, or the `std` crate’s default.

Note, however, that invoking this function is *not* equivalent to invoking the underlying
[`GlobalAlloc::alloc`] method of the registered allocator directly. Users of this function
cannot assume anything about what the allocator does, other than the documented requirements.
This means:

- This function may non-deterministically entirely skip the underlying allocator, e.g. if the
  compiler can show that this allocation can be replaced by a stack variable. The compiler may
  also merge multiple allocation operations into one, as long as it can also adjust all
  corresponding deallocation operations accordingly.
- An allocation created by invoking this function has exactly the size and minimum alignment
  defined by `layout`, even if the underlying allocator makes stronger promises.
- The allocation can only be freed by invoking [`dealloc`] or [`realloc`]. In particular,
  passing a pointer to such an allocation directly to the underlying method on [`GlobalAlloc`] is
  not permitted. Until one of those functions is called, it is undefined behavior to access the
  memory that backs this allocation with any pointer not derived from the return value of this
  function (e.g., with internal pointers the allocator might keep around).
- This function de-initializes the contents of the allocation before handing it to the user. So even
  if you control the underlying allocator and know that it explicitly initialized this memory,
  you cannot rely on it being initialized.

Users of this function have to consider that in the future, allocators may be allowed to unwind.

This function is expected to be deprecated in favor of the `allocate` method
of the [`Global`] type when it and the [`Allocator`] trait become stable.

# Safety

See [`GlobalAlloc::alloc`].

# Examples

```
use std::alloc::{alloc, dealloc, handle_alloc_error, Layout};

unsafe {
    let layout = Layout::new::<u16>();
    let ptr = alloc(layout);
    if ptr.is_null() {
        handle_alloc_error(layout);
    }

    *(ptr as *mut u16) = 42;
    assert_eq!(*(ptr as *mut u16), 42);

    dealloc(ptr, layout);
}
```

## fn dealloc

```rust
pub unsafe fn dealloc(ptr: *mut u8, layout: Layout)
```

Deallocates memory with the global allocator.

This function forwards calls to the [`GlobalAlloc::dealloc`] method
of the allocator registered with the `#[global_allocator]` attribute
if there is one, or the `std` crate’s default.

Note, however, that invoking this function is *not* equivalent to invoking the underlying
[`GlobalAlloc::dealloc`] method of the registered allocator directly. Users of this function
cannot assume anything about what the allocator does, other than the documented requirements.
This means:

- This function may non-deterministically entirely skip the underlying allocator, e.g. if the
  compiler can show that this allocation can be replaced by a stack variable. The compiler may
  also merge multiple allocation operations into one, as long as it can also adjust all
  corresponding deallocation operations accordingly.
- The pointer passed to this function must have been obtained by invoking [`alloc`],
  [`alloc_zeroed`], or [`realloc`]. In particular, passing a pointer returned by the underlying
  methods on [`GlobalAlloc`] is not permitted.
- This function de-initializes the contents of the allocation before handing it to the allocator.
  So even if you know that the program previously initialized that memory, the allocator cannot
  rely on it being initialized.

Users of this function have to consider that in the future, allocators may be allowed to unwind.

This function is expected to be deprecated in favor of the `deallocate` method
of the [`Global`] type when it and the [`Allocator`] trait become stable.

# Safety

See [`GlobalAlloc::dealloc`].

## fn realloc

```rust
pub unsafe fn realloc(ptr: *mut u8, layout: Layout, new_size: usize) -> *mut u8
```

Reallocates memory with the global allocator.

This function forwards calls to the [`GlobalAlloc::realloc`] method
of the allocator registered with the `#[global_allocator]` attribute
if there is one, or the `std` crate’s default.

Note, however, that invoking this function is *not* equivalent to invoking the underlying
[`GlobalAlloc::realloc`] method of the registered allocator directly. Users of this function
cannot assume anything about what the allocator does, other than the documented requirements.
This means:

- This function may non-deterministically entirely skip the underlying allocator, e.g. if the
  compiler can show that this allocation can be replaced by a stack variable. The compiler may
  also merge multiple allocation operations into one, as long as it can also adjust all
  corresponding deallocation operations accordingly.
- The pointer passed to this function must have been obtained by invoking [`alloc`],
  [`alloc_zeroed`], or [`realloc`]. In particular, passing a pointer returned by the underlying
  methods on [`GlobalAlloc`] is not permitted.
- An allocation created by invoking this function has exactly the size and minimum alignment
  defined by `layout`, even if the underlying allocator makes stronger promises.
- The allocation can only be freed by invoking [`dealloc`] or [`realloc`]. In particular,
  passing a pointer to such an allocation directly to the underlying method on [`GlobalAlloc`] is
  not permitted. Until one of those functions is called, it is undefined behavior to access the
  memory that backs this allocation with any pointer not derived from the return value of this
  function (e.g., with internal pointers the allocator might keep around).
- If this grows the allocation, the contents of the grown part of the new allocation allocation
  are de-initialized by this function before returning.
- If this shrinks the allocation, the contents of the removed part of the old allocation are
  de-initialized by this function before invoking the underlying allocator.

Users of this function have to consider that in the future, allocators may be allowed to unwind.

This function is expected to be deprecated in favor of the `grow` and `shrink` methods
of the [`Global`] type when it and the [`Allocator`] trait become stable.

# Safety

See [`GlobalAlloc::realloc`].

## fn alloc_zeroed

```rust
pub unsafe fn alloc_zeroed(layout: Layout) -> *mut u8
```

Allocates zero-initialized memory with the global allocator.

This function forwards calls to the [`GlobalAlloc::alloc_zeroed`] method
of the allocator registered with the `#[global_allocator]` attribute
if there is one, or the `std` crate’s default.

Note, however, that invoking this function is *not* equivalent to invoking the underlying
[`GlobalAlloc::alloc_zeroed`] method of the registered allocator directly. Users of this
function cannot assume anything about what the allocator does, other than the documented
requirements. This means:

- This function may non-deterministically entirely skip the underlying allocator, e.g. if the
  compiler can show that this allocation can be replaced by a stack variable. The compiler may
  also merge multiple allocation operations into one, as long as it can also adjust all
  corresponding deallocation operations accordingly.
- The allocation can only be freed by invoking [`dealloc`] or [`realloc`]. In particular,
  passing a pointer to such an allocation directly to the underlying method on [`GlobalAlloc`] is
  not permitted. Until one of those functions is called, it is undefined behavior to access the
  memory that backs this allocation with any pointer not derived from the return value of this
  function (e.g., with internal pointers the allocator might keep around).
- An allocation created by invoking this function has exactly the size and minimum alignment
  defined by `layout`, even if the underlying allocator makes stronger promises.

Users of this function have to consider that in the future, allocators may be allowed to unwind.

This function is expected to be deprecated in favor of the `allocate_zeroed` method
of the [`Global`] type when it and the [`Allocator`] trait become stable.

# Safety

See [`GlobalAlloc::alloc_zeroed`].

# Examples

```
use std::alloc::{alloc_zeroed, dealloc, handle_alloc_error, Layout};

unsafe {
    let layout = Layout::new::<u16>();
    let ptr = alloc_zeroed(layout);
    if ptr.is_null() {
        handle_alloc_error(layout);
    }

    assert_eq!(*(ptr as *mut u16), 0);

    dealloc(ptr, layout);
}
```

## fn handle_alloc_error

```rust
pub const fn handle_alloc_error(layout: Layout) -> !
```

Signals a memory allocation error.

Callers of memory allocation APIs wishing to cease execution
in response to an allocation error are encouraged to call this function,
rather than directly invoking [`panic!`] or similar.

This function is guaranteed to diverge (not return normally with a value), but depending on
global configuration, it may either panic (resulting in unwinding or aborting as per
configuration for all panics), or abort the process (with no unwinding).

The default behavior is:

 * If the binary links against `std` (typically the case), then
  print a message to standard error and abort the process.
  This behavior can be replaced with [`set_alloc_error_hook`] and [`take_alloc_error_hook`].
  Future versions of Rust may panic by default instead.

* If the binary does not link against `std` (all of its crates are marked
  [`#![no_std]`][no_std]), then call [`panic!`] with a message.
  [The panic handler] applies as to any panic.

[`set_alloc_error_hook`]: ../../std/alloc/fn.set_alloc_error_hook.html
[`take_alloc_error_hook`]: ../../std/alloc/fn.take_alloc_error_hook.html
[The panic handler]: https://doc.rust-lang.org/reference/runtime.html#the-panic_handler-attribute
[no_std]: https://doc.rust-lang.org/reference/names/preludes.html#the-no_std-attribute