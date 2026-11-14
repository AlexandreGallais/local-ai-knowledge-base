# core::io::io_slice

## struct IoSliceMut

```rust
pub struct IoSliceMut<'a>(repr::IoSliceMut<'a>)
```

A buffer type used with `Read::read_vectored`.

It is semantically a wrapper around a `&mut [u8]`, but is guaranteed to be
ABI compatible with the `iovec` type on Unix platforms and `WSABUF` on
Windows.

## IoSliceMut::new

```rust
pub fn new(buf: &'a mut [u8]) -> IoSliceMut<'a>
```

Creates a new `IoSliceMut` wrapping a byte slice.

# Panics

Panics on Windows if the slice is larger than 4GB.

## IoSliceMut::advance

```rust
pub fn advance(&mut self, n: usize)
```

Advance the internal cursor of the slice.

Also see [`IoSliceMut::advance_slices`] to advance the cursors of
multiple buffers.

# Panics

Panics when trying to advance beyond the end of the slice.

# Examples

```
use std::io::IoSliceMut;
use std::ops::Deref;

let mut data = [1; 8];
let mut buf = IoSliceMut::new(&mut data);

// Mark 3 bytes as read.
buf.advance(3);
assert_eq!(buf.deref(), [1; 5].as_ref());
```

## IoSliceMut::advance_slices

```rust
pub fn advance_slices(bufs: &mut &mut [IoSliceMut<'a>], n: usize)
```

Advance a slice of slices.

Shrinks the slice to remove any `IoSliceMut`s that are fully advanced over.
If the cursor ends up in the middle of an `IoSliceMut`, it is modified
to start at that cursor.

For example, if we have a slice of two 8-byte `IoSliceMut`s, and we advance by 10 bytes,
the result will only include the second `IoSliceMut`, advanced by 2 bytes.

# Panics

Panics when trying to advance beyond the end of the slices.

# Examples

```
use std::io::IoSliceMut;
use std::ops::Deref;

let mut buf1 = [1; 8];
let mut buf2 = [2; 16];
let mut buf3 = [3; 8];
let mut bufs = &mut [
    IoSliceMut::new(&mut buf1),
    IoSliceMut::new(&mut buf2),
    IoSliceMut::new(&mut buf3),
][..];

// Mark 10 bytes as read.
IoSliceMut::advance_slices(&mut bufs, 10);
assert_eq!(bufs[0].deref(), [2; 14].as_ref());
assert_eq!(bufs[1].deref(), [3; 8].as_ref());
```

## struct IoSlice

```rust
pub struct IoSlice<'a>(repr::IoSlice<'a>)
```

A buffer type used with `Write::write_vectored`.

It is semantically a wrapper around a `&[u8]`, but is guaranteed to be
ABI compatible with the `iovec` type on Unix platforms and `WSABUF` on
Windows.

## IoSlice::new

```rust
pub fn new(buf: &'a [u8]) -> IoSlice<'a>
```

Creates a new `IoSlice` wrapping a byte slice.

# Panics

Panics on Windows if the slice is larger than 4GB.

## IoSlice::advance

```rust
pub fn advance(&mut self, n: usize)
```

Advance the internal cursor of the slice.

Also see [`IoSlice::advance_slices`] to advance the cursors of multiple
buffers.

# Panics

Panics when trying to advance beyond the end of the slice.

# Examples

```
use std::io::IoSlice;
use std::ops::Deref;

let data = [1; 8];
let mut buf = IoSlice::new(&data);

// Mark 3 bytes as read.
buf.advance(3);
assert_eq!(buf.deref(), [1; 5].as_ref());
```

## IoSlice::advance_slices

```rust
pub fn advance_slices(bufs: &mut &mut [IoSlice<'a>], n: usize)
```

Advance a slice of slices.

Shrinks the slice to remove any `IoSlice`s that are fully advanced over.
If the cursor ends up in the middle of an `IoSlice`, it is modified
to start at that cursor.

For example, if we have a slice of two 8-byte `IoSlice`s, and we advance by 10 bytes,
the result will only include the second `IoSlice`, advanced by 2 bytes.

# Panics

Panics when trying to advance beyond the end of the slices.

# Examples

```
use std::io::IoSlice;
use std::ops::Deref;

let buf1 = [1; 8];
let buf2 = [2; 16];
let buf3 = [3; 8];
let mut bufs = &mut [
    IoSlice::new(&buf1),
    IoSlice::new(&buf2),
    IoSlice::new(&buf3),
][..];

// Mark 10 bytes as written.
IoSlice::advance_slices(&mut bufs, 10);
assert_eq!(bufs[0].deref(), [2; 14].as_ref());
assert_eq!(bufs[1].deref(), [3; 8].as_ref());