# std::os::solid::io

SOLID-specific extensions to general I/O primitives

Just like raw pointers, raw SOLID Sockets file descriptors point to
resources with dynamic lifetimes, and they can dangle if they outlive their
resources or be forged if they're created from invalid values.

This module provides three types for representing raw file descriptors
with different ownership properties: raw, borrowed, and owned, which are
analogous to types used for representing pointers:

| Type               | Analogous to |
| ------------------ | ------------ |
| [`RawFd`]          | `*const _`   |
| [`BorrowedFd<'a>`] | `&'a _`      |
| [`OwnedFd`]        | `Box<_>`     |

Like raw pointers, `RawFd` values are primitive values. And in new code,
they should be considered unsafe to do I/O on (analogous to dereferencing
them). Rust did not always provide this guidance, so existing code in the
Rust ecosystem often doesn't mark `RawFd` usage as unsafe. Once the
`io_safety` feature is stable, libraries will be encouraged to migrate,
either by adding `unsafe` to APIs that dereference `RawFd` values, or by
using to `BorrowedFd` or `OwnedFd` instead.

Like references, `BorrowedFd` values are tied to a lifetime, to ensure
that they don't outlive the resource they point to. These are safe to
use. `BorrowedFd` values may be used in APIs which provide safe access to
any system call except for:

 - `close`, because that would end the dynamic lifetime of the resource
   without ending the lifetime of the file descriptor.

 - `dup2`/`dup3`, in the second argument, because this argument is
   closed and assigned a new resource, which may break the assumptions
   other code using that file descriptor.

`BorrowedFd` values may be used in APIs which provide safe access to `dup`
system calls, so types implementing `AsFd` or `From<OwnedFd>` should not
assume they always have exclusive access to the underlying file
description.

Like boxes, `OwnedFd` values conceptually own the resource they point to,
and free (close) it when they are dropped.

[`BorrowedFd<'a>`]: crate::os::solid::io::BorrowedFd

## type RawFd

```rust
pub type RawFd = i32
```

Raw file descriptors.

## struct BorrowedFd

```rust
pub struct BorrowedFd<'socket>
```

A borrowed SOLID Sockets file descriptor.

This has a lifetime parameter to tie it to the lifetime of something that
owns the socket.

This uses `repr(transparent)` and has the representation of a host file
descriptor, so it can be used in FFI in places where a socket is passed as
an argument, it is not captured or consumed, and it never has the value
`SOLID_NET_INVALID_FD`.

This type's `.to_owned()` implementation returns another `BorrowedFd`
rather than an `OwnedFd`. It just makes a trivial copy of the raw
socket, which is then borrowed under the same lifetime.

## struct OwnedFd

```rust
pub struct OwnedFd
```

An owned SOLID Sockets file descriptor.

This closes the file descriptor on drop.

This uses `repr(transparent)` and has the representation of a host file
descriptor, so it can be used in FFI in places where a socket is passed as
an argument, it is not captured or consumed, and it never has the value
`SOLID_NET_INVALID_FD`.

## BorrowedFd::borrow_raw

```rust
pub const unsafe fn borrow_raw(fd: RawFd) -> Self
```

Returns a `BorrowedFd` holding the given raw file descriptor.

# Safety

The resource pointed to by `fd` must remain open for the duration of
the returned `BorrowedFd`, and it must not have the value
`SOLID_NET_INVALID_FD`.

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

## trait AsFd

```rust
pub trait AsFd
```

A trait to borrow the SOLID Sockets file descriptor from an underlying
object.

## AsFd::as_fd

```rust
fn as_fd(&self) -> BorrowedFd<'_>
```

Borrows the file descriptor.

## trait AsRawFd

```rust
pub trait AsRawFd
```

A trait to extract the raw SOLID Sockets file descriptor from an underlying
object.

## AsRawFd::as_raw_fd

```rust
fn as_raw_fd(&self) -> RawFd
```

Extracts the raw file descriptor.

This method does **not** pass ownership of the raw file descriptor
to the caller. The descriptor is only guaranteed to be valid while
the original object has not yet been destroyed.

## trait FromRawFd

```rust
pub trait FromRawFd
```

A trait to express the ability to construct an object from a raw file
descriptor.

## FromRawFd::from_raw_fd

```rust
unsafe fn from_raw_fd(fd: RawFd) -> Self
```

Constructs a new instance of `Self` from the given raw file
descriptor.

This function is typically used to **consume ownership** of the
specified file descriptor. When used in this way, the returned object
will take responsibility for closing it when the object goes out of
scope.

However, consuming ownership is not strictly required. Use a
[`From<OwnedFd>::from`] implementation for an API which strictly
consumes ownership.

# Safety

The `fd` passed in must be an [owned file descriptor][io-safety];
in particular, it must be open.

[io-safety]: io#io-safety

## trait IntoRawFd

```rust
pub trait IntoRawFd
```

A trait to express the ability to consume an object and acquire ownership of
its raw file descriptor.

## IntoRawFd::into_raw_fd

```rust
fn into_raw_fd(self) -> RawFd
```

Consumes this object, returning the raw underlying file descriptor.

This function **transfers ownership** of the underlying file descriptor
to the caller. Callers are then the unique owners of the file descriptor
and must close the descriptor once it's no longer needed.