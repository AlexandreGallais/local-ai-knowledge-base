# alloc::wtf8

Heap-allocated counterpart to core `wtf8` module.

## Wtf8Buf::new

```rust
pub fn new() -> Wtf8Buf
```

Creates a new, empty WTF-8 string.

## Wtf8Buf::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> Wtf8Buf
```

Creates a new, empty WTF-8 string with pre-allocated capacity for `capacity` bytes.

## Wtf8Buf::from_bytes_unchecked

```rust
pub unsafe fn from_bytes_unchecked(value: Vec<u8>) -> Wtf8Buf
```

Creates a WTF-8 string from a WTF-8 byte vec.

# Safety

`value` must contain [well-formed WTF-8](https://wtf-8.codeberg.page/#well-formed).

## Wtf8Buf::from_string

```rust
pub const fn from_string(string: String) -> Wtf8Buf
```

Creates a WTF-8 string from a UTF-8 `String`.

This takes ownership of the `String` and does not copy.

Since WTF-8 is a superset of UTF-8, this always succeeds.

## Wtf8Buf::from_str

```rust
pub fn from_str(s: &str) -> Wtf8Buf
```

Creates a WTF-8 string from a UTF-8 `&str` slice.

This copies the content of the slice.

Since WTF-8 is a superset of UTF-8, this always succeeds.

## Wtf8Buf::from_wide

```rust
pub fn from_wide(v: &[u16]) -> Wtf8Buf
```

Creates a WTF-8 string from a potentially ill-formed UTF-16 slice of 16-bit code units.

This is lossless: calling `.encode_wide()` on the resulting string
will always return the original code units.

## Wtf8Buf::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Reserves capacity for at least `additional` more bytes to be inserted
in the given `Wtf8Buf`.
The collection may reserve more space to avoid frequent reallocations.

# Panics

Panics if the new capacity exceeds `isize::MAX` bytes.

## Wtf8Buf::try_reserve

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve capacity for at least `additional` more bytes to be
inserted in the given `Wtf8Buf`. The `Wtf8Buf` may reserve more space to
avoid frequent reallocations. After calling `try_reserve`, capacity will
be greater than or equal to `self.len() + additional`. Does nothing if
capacity is already sufficient. This method preserves the contents even
if an error occurs.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

## Wtf8Buf::try_reserve_exact

```rust
pub fn try_reserve_exact(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve the minimum capacity for exactly `additional` more
bytes to be inserted in the given `Wtf8Buf`. After calling
`try_reserve_exact`, capacity will be greater than or equal to
`self.len() + additional` if it returns `Ok(())`.
Does nothing if the capacity is already sufficient.

Note that the allocator may give the `Wtf8Buf` more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer [`try_reserve`] if future insertions are expected.

[`try_reserve`]: Wtf8Buf::try_reserve

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

## Wtf8Buf::capacity

```rust
pub fn capacity(&self) -> usize
```

Returns the number of bytes that this string buffer can hold without reallocating.

## Wtf8Buf::push_str

```rust
pub fn push_str(&mut self, other: &str)
```

Append a UTF-8 slice at the end of the string.

## Wtf8Buf::push_wtf8

```rust
pub fn push_wtf8(&mut self, other: &Wtf8)
```

Append a WTF-8 slice at the end of the string.

This replaces newly paired surrogates at the boundary
with a supplementary code point,
like concatenating ill-formed UTF-16 strings effectively would.

## Wtf8Buf::push_char

```rust
pub fn push_char(&mut self, c: char)
```

Append a Unicode scalar value at the end of the string.

## Wtf8Buf::push

```rust
pub fn push(&mut self, code_point: CodePoint)
```

Append a code point at the end of the string.

This replaces newly paired surrogates at the boundary
with a supplementary code point,
like concatenating ill-formed UTF-16 strings effectively would.

## Wtf8Buf::truncate

```rust
pub fn truncate(&mut self, new_len: usize)
```

Shortens a string to the specified length.

If `new_len` is greater than the string's current length, this has no
effect.

# Panics

Panics if `new_len` does not lie on a code point boundary.

## Wtf8Buf::into_bytes

```rust
pub fn into_bytes(self) -> Vec<u8>
```

Consumes the WTF-8 string and tries to convert it to a vec of bytes.

## Wtf8Buf::into_string

```rust
pub fn into_string(self) -> Result<String, Wtf8Buf>
```

Consumes the WTF-8 string and tries to convert it to UTF-8.

This does not copy the data.

If the contents are not well-formed UTF-8
(that is, if the string contains surrogates),
the original WTF-8 string is returned instead.

## Wtf8Buf::into_string_lossy

```rust
pub fn into_string_lossy(mut self) -> String
```

Consumes the WTF-8 string and converts it lossily to UTF-8.

This does not copy the data (but may overwrite parts of it in place).

Surrogates are replaced with `"\u{FFFD}"` (the replacement character “�”)

## Wtf8Buf::into_box

```rust
pub fn into_box(self) -> Box<Wtf8>
```

Converts this `Wtf8Buf` into a boxed `Wtf8`.

## Wtf8Buf::from_box

```rust
pub fn from_box(boxed: Box<Wtf8>) -> Wtf8Buf
```

Converts a `Box<Wtf8>` into a `Wtf8Buf`.

## Wtf8Buf::extend_from_slice_unchecked

```rust
pub unsafe fn extend_from_slice_unchecked(&mut self, other: &[u8])
```

Provides plumbing to core `Vec::extend_from_slice`.
More well behaving alternative to allowing outer types
full mutable access to the core `Vec`.

# Safety

`self` and `other` must contain [well-formed WTF-8](https://wtf-8.codeberg.page/#well-formed),
and appending `other` to `self` must preserve that invariant.
In particular, `self` must not end with a leading surrogate,
or `other` must not start with a trailing surrogate.