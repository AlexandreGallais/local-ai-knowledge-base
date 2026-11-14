# std::os::windows::io::socket

Owned and borrowed OS sockets.

## struct BorrowedSocket

```rust
pub struct BorrowedSocket<'socket>
```

A borrowed socket.

This has a lifetime parameter to tie it to the lifetime of something that
owns the socket.

This uses `repr(transparent)` and has the representation of a host socket,
so it can be used in FFI in places where a socket is passed as an argument,
it is not captured or consumed, and it never has the value
`INVALID_SOCKET`.

This type's `.to_owned()` implementation returns another `BorrowedSocket`
rather than an `OwnedSocket`. It just makes a trivial copy of the raw
socket, which is then borrowed under the same lifetime.

## struct OwnedSocket

```rust
pub struct OwnedSocket
```

An owned socket.

This closes the socket on drop.

This uses `repr(transparent)` and has the representation of a host socket,
so it can be used in FFI in places where a socket is passed as a consumed
argument or returned as an owned value, and it never has the value
`INVALID_SOCKET`.

## BorrowedSocket::borrow_raw

```rust
pub const unsafe fn borrow_raw(socket: RawSocket) -> Self
```

Returns a `BorrowedSocket` holding the given raw socket.

# Safety

The resource pointed to by `socket` must remain open for the duration of
the returned `BorrowedSocket`, and it must not have the value
`INVALID_SOCKET`.

## OwnedSocket::try_clone

```rust
pub fn try_clone(&self) -> io::Result<Self>
```

Creates a new `OwnedSocket` instance that shares the same underlying
object as the existing `OwnedSocket` instance.

## BorrowedSocket::try_clone_to_owned

```rust
pub fn try_clone_to_owned(&self) -> io::Result<OwnedSocket>
```

Creates a new `OwnedSocket` instance that shares the same underlying
object as the existing `BorrowedSocket` instance.

## trait AsSocket

```rust
pub trait AsSocket
```

A trait to borrow the socket from an underlying object.

## AsSocket::as_socket

```rust
fn as_socket(&self) -> BorrowedSocket<'_>
```

Borrows the socket.