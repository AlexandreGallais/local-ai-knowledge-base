---
title: "std::net::tcp (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/net/tcp.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::net::tcp (part 2 of 2)

## TcpListener::bind

```rust
pub fn bind<A: ToSocketAddrs>(addr: A) -> io::Result<TcpListener>
```

Creates a new `TcpListener` which will be bound to the specified
address.

The returned listener is ready for accepting connections.

Binding with a port number of 0 will request that the OS assigns a port
to this listener. The port allocated can be queried via the
`TcpListener::local_addr` method.

The address type can be any implementor of `ToSocketAddrs` trait. See
its documentation for concrete examples.

If `addr` yields multiple addresses, `bind` will be attempted with
each of the addresses until one succeeds and returns the listener. If
none of the addresses succeed in creating a listener, the error returned
from the last attempt (the last address) is returned.

# Examples

Creates a TCP listener bound to `127.0.0.1:80`:

```rust
use std::net::TcpListener;

let listener = TcpListener::bind("127.0.0.1:80").unwrap();
```

Creates a TCP listener bound to `127.0.0.1:80`. If that fails, create a
TCP listener bound to `127.0.0.1:443`:

```rust
use std::net::{SocketAddr, TcpListener};

let addrs = [
    SocketAddr::from(([127, 0, 0, 1], 80)),
    SocketAddr::from(([127, 0, 0, 1], 443)),
];
let listener = TcpListener::bind(&addrs[..]).unwrap();
```

Creates a TCP listener bound to a port assigned by the operating system
at `127.0.0.1`.

```rust
use std::net::TcpListener;

let socket = TcpListener::bind("127.0.0.1:0").unwrap();
```

## TcpListener::local_addr

```rust
pub fn local_addr(&self) -> io::Result<SocketAddr>
```

Returns the local socket address of this listener.

# Examples

```rust
use std::net::{Ipv4Addr, SocketAddr, SocketAddrV4, TcpListener};

let listener = TcpListener::bind("127.0.0.1:8080").unwrap();
assert_eq!(listener.local_addr().unwrap(),
           SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 8080)));
```

## TcpListener::try_clone

```rust
pub fn try_clone(&self) -> io::Result<TcpListener>
```

Creates a new independently owned handle to the underlying socket.

The returned `TcpListener` is a reference to the same socket that this
object references. Both handles can be used to accept incoming
connections and options set on one listener will affect the other.

# Examples

```rust
use std::net::TcpListener;

let listener = TcpListener::bind("127.0.0.1:8080").unwrap();
let listener_clone = listener.try_clone().unwrap();
```

## TcpListener::accept

```rust
pub fn accept(&self) -> io::Result<(TcpStream, SocketAddr)>
```

Accept a new incoming connection from this listener.

This function will block the calling thread until a new TCP connection
is established. When established, the corresponding `TcpStream` and the
remote peer's address will be returned.

# Errors

Some errors this function returns do not indicate a problem with the
listener itself, and a program serving a long-lived listener will
usually want to handle them and keep accepting connections rather than
treat them as fatal. These include, but are not limited to:

- An error specific to a single incoming connection that failed before
  it could be accepted, such as one aborted by the peer
  (`ConnectionAborted`). A later call may succeed immediately.
- An error from reaching the per-process or system-wide open file
  descriptor limit. The call can be retried once other file descriptors
  have been closed, typically after a short delay.
- An error from failing to allocate memory while accepting a connection
  (`OutOfMemory`).

Which errors can occur is platform-specific. On Unix, `Interrupted`
errors are retried internally rather than being returned.

# Examples

```rust
use std::net::TcpListener;

let listener = TcpListener::bind("127.0.0.1:8080").unwrap();
match listener.accept() {
    Ok((_socket, addr)) => println!("new client: {addr:?}"),
    Err(e) => println!("couldn't get client: {e:?}"),
}
```

## TcpListener::incoming

```rust
pub fn incoming(&self) -> Incoming<'_>
```

Returns an iterator over the connections being received on this
listener.

The returned iterator will never return `None` and will also not yield
the peer's `SocketAddr` structure. Iterating over it is equivalent to
calling `TcpListener::accept` in a loop.

# Errors

Each connection yielded by the iterator can fail for the same reasons as
`TcpListener::accept`; see its documentation for details.

# Examples

```rust
use std::net::{TcpListener, TcpStream};

fn handle_connection(stream: TcpStream) {
   //...
}

fn main() -> std::io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:80")?;

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                handle_connection(stream);
            }
            Err(e) => { /* connection failed */ }
        }
    }
    Ok(())
}
```

## TcpListener::set_ttl

```rust
pub fn set_ttl(&self, ttl: u32) -> io::Result<()>
```

Sets the value for the `IP_TTL` option on this socket.

This value sets the time-to-live field that is used in every packet sent
from this socket.

# Examples

```rust
use std::net::TcpListener;

let listener = TcpListener::bind("127.0.0.1:80").unwrap();
listener.set_ttl(100).expect("set_ttl should succeed");
```

## TcpListener::ttl

```rust
pub fn ttl(&self) -> io::Result<u32>
```

Gets the value of the `IP_TTL` option for this socket.

For more information about this option, see `TcpListener::set_ttl`.

# Examples

```rust
use std::net::TcpListener;

let listener = TcpListener::bind("127.0.0.1:80").unwrap();
listener.set_ttl(100).expect("set_ttl should succeed");
assert_eq!(listener.ttl().unwrap_or(0), 100);
```

## TcpListener::take_error

```rust
pub fn take_error(&self) -> io::Result<Option<io::Error>>
```

Gets the value of the `SO_ERROR` option on this socket.

This will retrieve the stored error in the underlying socket, clearing
the field in the process. This can be useful for checking errors between
calls.

# Examples

```rust
use std::net::TcpListener;

let listener = TcpListener::bind("127.0.0.1:80").unwrap();
listener.take_error().expect("`take_error` should succeed");
```

## TcpListener::set_nonblocking

```rust
pub fn set_nonblocking(&self, nonblocking: bool) -> io::Result<()>
```

Moves this TCP stream into or out of nonblocking mode.

This will result in the `accept` operation becoming nonblocking,
i.e., immediately returning from their calls. If the IO operation is
successful, `Ok` is returned and no further action is required. If the
IO operation could not be completed and needs to be retried, an error
with kind `io::ErrorKind::WouldBlock` is returned.

On most Unix platforms, calling this method corresponds to calling `ioctl`
`FIONBIO`. On Windows, calling this method corresponds to calling
`ioctlsocket` `FIONBIO`.

# Examples

Bind a TCP listener to an address, listen for connections, and read
bytes in nonblocking mode:

```rust
use std::io;
use std::net::TcpListener;

let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
listener.set_nonblocking(true).expect("set_nonblocking should succeed");

for stream in listener.incoming() {
    match stream {
        Ok(s) => {
            // do something with the TcpStream
            handle_connection(s);
        }
        Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {
            // wait until network socket is ready, typically implemented
            // via platform-specific APIs such as epoll or IOCP
            wait_for_fd();
            continue;
        }
        Err(e) => panic!("encountered IO error: {e}"),
    }
}
```
