---
title: "std::os::windows::io::raw"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/windows/io/raw.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::windows::io::raw

Windows-specific extensions to general I/O primitives.

## type RawHandle

```rust
pub type RawHandle = raw::HANDLE
```

Raw HANDLEs.

## type RawSocket

```rust
pub type RawSocket = raw::SOCKET
```

Raw SOCKETs.

## trait AsRawHandle

```rust
pub trait AsRawHandle
```

Extracts raw handles.

## AsRawHandle::as_raw_handle

```rust
fn as_raw_handle(&self) -> RawHandle
```

Extracts the raw handle.

This function is typically used to **borrow** an owned handle.
When used in this way, this method does **not** pass <example-value> of the
raw handle to the caller, and the handle is only guaranteed
to be valid while the original object has not yet been destroyed.

This function may return null, such as when called on `Stdin`,
`Stdout`, or `Stderr` when the console is detached.

However, borrowing is not strictly required. See `AsHandle::as_handle`
for an API which strictly borrows a handle.

## trait FromRawHandle

```rust
pub trait FromRawHandle
```

Constructs I/O objects from raw handles.

## FromRawHandle::from_raw_handle

```rust
unsafe fn from_raw_handle(handle: RawHandle) -> Self
```

Constructs a new I/O object from the specified raw handle.

This function is typically used to **consume ownership** of the handle
given, passing responsibility for closing the handle to the returned
object. When used in this way, the returned object
will take responsibility for closing it when the object goes out of
scope.

However, consuming ownership is not strictly required. Use a
`From<OwnedHandle>::from` implementation for an API which strictly
consumes ownership.

# Safety

The `handle` passed in must:
  - be an owned handle; in particular, it must be open.
  - be a handle for a resource that may be freed via `CloseHandle`
    (as opposed to `RegCloseKey` or other close functions).

Note that the handle *may* have the value `INVALID_HANDLE_VALUE` (-1),
which is sometimes a valid handle value. See [here] for the full story.

## trait IntoRawHandle

```rust
pub trait IntoRawHandle
```

A trait to express the ability to consume an object and acquire ownership of
its raw `HANDLE`.

## IntoRawHandle::into_raw_handle

```rust
fn into_raw_handle(self) -> RawHandle
```

Consumes this object, returning the raw underlying handle.

This function is typically used to **transfer ownership** of the underlying
handle to the caller. When used in this way, callers are then the unique
owners of the handle and must close it once it's no longer needed.

However, transferring ownership is not strictly required. Use a
`Into<OwnedHandle>::into` implementation for an API which strictly
transfers ownership.

## trait AsRawSocket

```rust
pub trait AsRawSocket
```

Extracts raw sockets.

## AsRawSocket::as_raw_socket

```rust
fn as_raw_socket(&self) -> RawSocket
```

Extracts the raw socket.

This function is typically used to **borrow** an owned socket.
When used in this way, this method does **not** pass <example-value> of the
raw socket to the caller, and the socket is only guaranteed
to be valid while the original object has not yet been destroyed.

However, borrowing is not strictly required. See `AsSocket::as_socket`
for an API which strictly borrows a socket.

## trait FromRawSocket

```rust
pub trait FromRawSocket
```

Creates I/O objects from raw sockets.

## FromRawSocket::from_raw_socket

```rust
unsafe fn from_raw_socket(sock: RawSocket) -> Self
```

Constructs a new I/O object from the specified raw socket.

This function is typically used to **consume ownership** of the socket
given, passing responsibility for closing the socket to the returned
object. When used in this way, the returned object
will take responsibility for closing it when the object goes out of
scope.

However, consuming ownership is not strictly required. Use a
`From<OwnedSocket>::from` implementation for an API which strictly
consumes ownership.

# Safety

The `socket` passed in must:
  - be an owned socket; in particular, it must be open.
  - be a socket that may be freed via `closesocket`.

## trait IntoRawSocket

```rust
pub trait IntoRawSocket
```

A trait to express the ability to consume an object and acquire ownership of
its raw `SOCKET`.

## IntoRawSocket::into_raw_socket

```rust
fn into_raw_socket(self) -> RawSocket
```

Consumes this object, returning the raw underlying socket.

This function is typically used to **transfer ownership** of the underlying
socket to the caller. When used in this way, callers are then the unique
owners of the socket and must close it once it's no longer needed.

However, transferring ownership is not strictly required. Use a
`Into<OwnedSocket>::into` implementation for an API which strictly
transfers ownership.
