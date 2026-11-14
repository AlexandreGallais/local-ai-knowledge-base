# core::ffi::va_list

C's "variable arguments"

Better known as "varargs".

## struct VaList

```rust
pub struct VaList<'a>
```

A variable argument list, ABI-compatible with `va_list` in C.

This type is created in c-variadic functions when `...` is desugared. A `VaList`
is automatically initialized (equivalent to calling `va_start` in C).

```
use std::ffi::VaList;

/// # Safety
/// Must be passed at least `count` arguments of type `i32`.
unsafe extern "C" fn my_func(count: u32, ap: ...) -> i32 {
    unsafe { vmy_func(count, ap) }
}

/// # Safety
/// Must be passed at least `count` arguments of type `i32`.
unsafe fn vmy_func(count: u32, mut ap: VaList<'_>) -> i32 {
    let mut sum = 0;
    for _ in 0..count {
        sum += unsafe { ap.next_arg::<i32>() };
    }
    sum
}

assert_eq!(unsafe { my_func(1, 42i32) }, 42);
assert_eq!(unsafe { my_func(3, 42i32, -7i32, 20i32) }, 55);
```

The [`VaList::next_arg`] method reads the next argument from the variable argument list,
and is equivalent to C `va_arg`.

Cloning a `VaList` performs the equivalent of C `va_copy`, producing an independent cursor
that arguments can be read from without affecting the original. Dropping a `VaList` performs
the equivalent of C `va_end`.

A `VaList` can be used across an FFI boundary, and fully matches the platform's `va_list` in
terms of layout and ABI.

## VaList::next_arg

```rust
pub const unsafe fn next_arg<T: VaArgSafe>(&mut self) -> T
```

Read the next argument from the variable argument list.

Only types that implement [`VaArgSafe`] can be read from a variable argument list.

# Safety

This function is safe to call only if all of the following conditions are satisfied:

- There is another c-variadic argument to read.
- The actual type of the argument `U` is compatible with `T` (as defined below).
- If `U` and `T` are both integer types, then the value passed by the caller must be
representable in both types.
- If `T` is not [`Copy`], then it must not have already been read using `next_arg`
on a [`clone`][VaList::clone]d copy of this `VaList`.
(Currently, all types implementing [`VaArgSafe`] also implement [`Copy`],
but this may change in the future.)

Types `T` and `U` are compatible when:

- `T` and `U` are the same type.
- `T` and `U` are integer types of the same size.
- `T` and `U` are both pointers, and their target types are compatible.
- `T` is a pointer to [`c_void`] and `U` is a pointer to [`i8`] or [`u8`], or vice versa.

[`c_void`]: core::ffi::c_void