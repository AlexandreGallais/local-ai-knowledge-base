# std::os::fd::owned

Owned and borrowed Unix-like file descriptors.

## struct BorrowedFd

```rust
pub struct BorrowedFd<'fd>
```

A borrowed file descriptor.

This has a lifetime parameter to tie it to the lifetime of something that owns the file
descriptor. For the duration of that lifetime, it is guaranteed that nobody will close the file
descriptor.

This uses `repr(transparent)` and has the representation of a host file
descriptor, so it can be used in FFI in places where a file descriptor is
passed as an argument, it is not captured or consumed, and it never has the
value `-1`.

This type does not have a [`ToOwned`][crate::borrow::ToOwned]
implementation. Calling `.to_owned()` on a variable of this type will call
it on `&BorrowedFd` and use `Clone::clone()` like `ToOwned` does for all
types implementing `Clone`. The result will be descriptor borrowed under
the same lifetime.

To obtain an [`OwnedFd`], you can use [`BorrowedFd::try_clone_to_owned`]
instead, but this is not supported on all platforms.

## struct OwnedFd

```rust
pub struct OwnedFd
```

An owned file descriptor.

This closes the file descriptor on drop. It is guaranteed that nobody else will close the file
descriptor.

This uses `repr(transparent)` and has the representation of a host file
descriptor, so it can be used in FFI in places where a file descriptor is
passed as a consumed argument or returned as an owned value, and it never
has the value `-1`.

You can use [`AsFd::as_fd`] to obtain a [`BorrowedFd`].

## BorrowedFd::borrow_raw

```rust
pub const unsafe fn borrow_raw(fd: RawFd) -> Self
```

Returns a `BorrowedFd` holding the given raw file descriptor.

# Safety

The resource pointed to by `fd` must remain open for the duration of
the returned `BorrowedFd`.

# Panics

Panics if the raw file descriptor has the value `-1`.

## OwnedFd::try_clone

```rust
pub fn try_clone(&self) -> io::Result<Self>
```

Creates a new `OwnedFd` instance that shares the same underlying file
description as the existing `OwnedFd` instance.

## BorrowedFd::try_clone_to_owned

```rust
pub fn try_clone_to_owned(&self) -> io::Result<OwnedFd>
```

Creates a new `OwnedFd` instance that shares the same underlying file
description as the existing `BorrowedFd` instance.

## BorrowedFd::try_clone_to_owned

```rust
pub fn try_clone_to_owned(&self) -> io::Result<OwnedFd>
```

Creates a new `OwnedFd` instance that shares the same underlying file
description as the existing `BorrowedFd` instance.

## BorrowedFd::try_clone_to_owned

```rust
pub fn try_clone_to_owned(&self) -> io::Result<OwnedFd>
```

Creates a new `OwnedFd` instance that shares the same underlying file
description as the existing `BorrowedFd` instance.

## trait AsFd

```rust
pub trait AsFd
```

A trait to borrow the file descriptor from an underlying object.

This is only available on unix platforms and must be imported in order to
call the method. Windows platforms have a corresponding `AsHandle` and
`AsSocket` set of traits.

## AsFd::as_fd

```rust
fn as_fd(&self) -> BorrowedFd<'_>
```

Borrows the file descriptor.

# Example

```rust,no_run
use std::fs::File;
# use std::io;
# #[cfg(any(unix, target_os = "wasi"))]
# use std::os::fd::{AsFd, BorrowedFd};

let mut f = File::open("foo.txt")?;
# #[cfg(any(unix, target_os = "wasi"))]
let borrowed_fd: BorrowedFd<'_> = f.as_fd();
# Ok::<(), io::Error>(())
```