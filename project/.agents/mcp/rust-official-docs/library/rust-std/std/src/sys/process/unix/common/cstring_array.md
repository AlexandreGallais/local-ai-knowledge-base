---
title: "std::sys::process::unix::common::cstring_array"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/process/unix/common/cstring_array.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::process::unix::common::cstring_array

## struct CStringArray

```rust
pub struct CStringArray
```

Helper type to manage ownership of the strings within a C-style array.

This type manages an array of C-string pointers terminated by a null
pointer. The pointer to the array (as returned by `as_ptr`) can be used as
a value of `argv` or `environ`.

## CStringArray::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> Self
```

Creates a new `CStringArray` with enough capacity to hold `capacity`
strings.

## CStringArray::write

```rust
pub fn write(&mut self, index: usize, item: CString)
```

Replace the string at position `index`.

## CStringArray::push

```rust
pub fn push(&mut self, item: CString)
```

Push an additional string to the array.

## CStringArray::as_ptr

```rust
pub fn as_ptr(&self) -> *const *const c_char
```

Returns a pointer to the C-string array managed by this type.

## CStringArray::iter

```rust
pub fn iter(&self) -> CStringIter<'_>
```

Returns an iterator over all `CStr`s contained in this array.

## struct CStringIter

```rust
pub struct CStringIter<'a>
```

An iterator over all `CStr`s contained in a `CStringArray`.
