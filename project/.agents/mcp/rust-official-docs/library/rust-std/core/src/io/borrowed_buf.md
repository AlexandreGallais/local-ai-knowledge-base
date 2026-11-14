# core::io::borrowed_buf

## struct BorrowedBuf

```rust
pub struct BorrowedBuf<'data, T>
```

A borrowed buffer of initially uninitialized elements, which is incrementally filled.

This type makes it safer to work with `MaybeUninit` buffers, such as to read into a buffer
without having to initialize it first. It tracks the region of elements that have been filled
and whether the unfilled region was initialized.

In summary, the contents of the buffer can be visualized as:
```not_rust
[                capacity                ]
[ filled | unfilled (may be initialized) ]
```

A `BorrowedBuf` is created around some existing elements (or capacity for elements) via a unique
reference (`&mut`). The `BorrowedBuf` can be configured (e.g., using `clear` or `set_init`), but
cannot be directly written. To write into the buffer, use `unfilled` to create a
`BorrowedCursor`. The cursor has write-only access to the unfilled portion of the buffer (you
can think of it as a write-only iterator).

The lifetime `'data` is a bound on the lifetime of the underlying elements.

The type is most commonly used to manage bytes, but can manage any type of elements.

## BorrowedBuf::capacity

```rust
pub fn capacity(&self) -> usize
```

Returns the total capacity of the buffer.

## BorrowedBuf::len

```rust
pub fn len(&self) -> usize
```

Returns the length of the filled part of the buffer.

## BorrowedBuf::filled

```rust
pub fn filled(&self) -> &[T]
```

Returns a shared reference to the filled portion of the buffer.

## BorrowedBuf::filled_mut

```rust
pub fn filled_mut(&mut self) -> &mut [T]
```

Returns a mutable reference to the filled portion of the buffer.

## BorrowedBuf::into_filled

```rust
pub fn into_filled(self) -> &'data [T]
```

Returns a shared reference to the filled portion of the buffer with its original lifetime.

## BorrowedBuf::into_filled_mut

```rust
pub fn into_filled_mut(self) -> &'data mut [T]
```

Returns a mutable reference to the filled portion of the buffer with its original lifetime.

## BorrowedBuf::unfilled

```rust
pub fn unfilled<'this>(&'this mut self) -> BorrowedCursor<'this, T>
```

Returns a cursor over the unfilled part of the buffer.

## BorrowedBuf::clear

```rust
pub fn clear(&mut self) -> &mut Self
```

Clears the buffer, resetting the filled region to empty.

The contents of the buffer are not modified.

## struct BorrowedCursor

```rust
pub struct BorrowedCursor<'a, T>
```

A writeable view of the unfilled portion of a [`BorrowedBuf`].

The unfilled portion may be uninitialized; see [`BorrowedBuf`] for details.

Data can be written directly to the cursor by using [`append`](BorrowedCursor::append) or
indirectly by getting a slice of part or all of the cursor and writing into the slice. In the
indirect case, the caller must call [`advance`](BorrowedCursor::advance) after writing to inform
the cursor how many elements have been written.

Once elements are written to the cursor, they become part of the filled portion of the
underlying `BorrowedBuf` and can no longer be accessed or re-written by the cursor. In other
words, the cursor tracks the unfilled part of the underlying `BorrowedBuf`.

The lifetime `'a` is a bound on the lifetime of the underlying buffer (which means it is a bound
on the elements in that buffer by transitivity).

## BorrowedCursor::reborrow

```rust
pub fn reborrow<'this>(&'this mut self) -> BorrowedCursor<'this, T>
```

Reborrows this cursor by cloning it with a smaller lifetime.

Since a cursor maintains unique access to its underlying buffer, the borrowed cursor is
not accessible while the new cursor exists.

## BorrowedCursor::capacity

```rust
pub fn capacity(&self) -> usize
```

Returns the available space in the cursor.

## BorrowedCursor::written

```rust
pub fn written(&self) -> usize
```

Returns the number of elements written to the `BorrowedBuf` this cursor was created from.

In particular, the count returned is shared by all reborrows of the cursor.

## BorrowedCursor::as_mut

```rust
pub unsafe fn as_mut(&mut self) -> &mut [MaybeUninit<T>]
```

Returns a mutable reference to the whole cursor.

# Safety

The caller must not uninitialize any elements of the cursor if it is initialized.

## BorrowedCursor::advance

```rust
pub unsafe fn advance(&mut self, n: usize) -> &mut Self
```

Advances the cursor by asserting that `n` elements have been filled.

After advancing, the `n` elements are no longer accessible via the cursor and can only be
accessed via the underlying buffer. I.e., the buffer's filled portion grows by `n` elements
and its unfilled portion (and the capacity of this cursor) shrinks by `n` elements.

# Safety

The caller must ensure that the first `n` elements of the cursor have been initialized.

## BorrowedCursor::append

```rust
pub fn append(&mut self, buf: &[T])
```

Append elements to the cursor, advancing position within its buffer.

# Panics

Panics if `self.capacity()` is less than `buf.len()`.

## BorrowedCursor::with_unfilled_buf

```rust
pub fn with_unfilled_buf<R>(&mut self, f: impl FnOnce(&mut BorrowedBuf<'_, T>) -> R) -> R
```

Runs the given closure with a `BorrowedBuf` containing the unfilled part
of the cursor.

This enables inspecting what was written to the cursor.

# Panics

Panics if the `BorrowedBuf` given to the closure is replaced by another
one.