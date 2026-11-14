---
title: "std::os::fd::raw"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/fd/raw.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::fd::raw

Raw Unix-like file descriptors.

## type RawFd

```rust
pub type RawFd = raw::c_int
```

Raw file descriptors.

## trait AsRawFd

```rust
pub trait AsRawFd
```

A trait to extract the raw file descriptor from an underlying object.

This is only available on unix and WASI platforms and must be imported in
order to call the method. Windows platforms have a corresponding
`AsRawHandle` and `AsRawSocket` set of traits.

## AsRawFd::as_raw_fd

```rust
fn as_raw_fd(&self) -> RawFd
```

Extracts the raw file descriptor.

This function is typically used to **borrow** an owned file descriptor.
When used in this way, this method does **not** pass <example-value> of the
raw file descriptor to the caller, and the file descriptor is only
guaranteed to be valid while the original object has not yet been
destroyed.

However, borrowing is not strictly required. See `AsFd::as_fd`
for an API which strictly borrows a file descriptor.

# Example

```rust
use std::fs::File;
#[cfg(any(unix, target_os = "wasi"))]
use std::os::fd::{AsRawFd, RawFd};

let mut f = File::open("foo.txt")?;
// Note that `raw_fd` is only valid as long as `f` exists.
#[cfg(any(unix, target_os = "wasi"))]
let raw_fd: RawFd = f.as_raw_fd();
```

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
`From<OwnedFd>::from` implementation for an API which strictly
consumes ownership.

# Safety

The `fd` passed in must be an owned file descriptor;
in particular, it must be open.

# Example

```rust
use std::fs::File;
#[cfg(any(unix, target_os = "wasi"))]
use std::os::fd::{FromRawFd, IntoRawFd, RawFd};

let f = File::open("foo.txt")?;
let raw_fd: RawFd = f.into_raw_fd();
// SAFETY: no other functions should call `from_raw_fd`, so there
// is only one owner for the file descriptor.
let f = unsafe { File::from_raw_fd(raw_fd) };
```

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

This function is typically used to **transfer ownership** of the underlying
file descriptor to the caller. When used in this way, callers are then the unique
owners of the file descriptor and must close it once it's no longer needed.

However, transferring ownership is not strictly required. Use a
`Into<OwnedFd>::into` implementation for an API which strictly
transfers ownership.

# Example

```rust
use std::fs::File;
#[cfg(any(unix, target_os = "wasi"))]
use std::os::fd::{IntoRawFd, RawFd};

let f = File::open("foo.txt")?;
#[cfg(any(unix, target_os = "wasi"))]
let raw_fd: RawFd = f.into_raw_fd();
```
