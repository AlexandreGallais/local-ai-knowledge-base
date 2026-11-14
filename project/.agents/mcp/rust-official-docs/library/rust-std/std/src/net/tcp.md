---
title: "std::net::tcp (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/net/tcp.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::net::tcp

## struct TcpStream

```rust
pub struct TcpStream(net_imp::TcpStream)
```

A TCP stream between a local and a remote socket.

After creating a `TcpStream` by either `connect`ing to a remote host or
`accept`ing a connection on a `TcpListener`, data can be transmitted
by [reading] and [writing] to it.

The connection will be closed when the value is dropped. The reading and writing
portions of the connection can also be shut down individually with the `shutdown`
method.

The Transmission Control Protocol is specified in [IETF RFC 793].

# Examples

```rust
use std::io::prelude::*;
use std::net::TcpStream;

fn main() -> std::io::Result<()> {
    let mut stream = TcpStream::connect("127.0.0.1:34254")?;

    stream.write(&[1])?;
    stream.read(&mut [0; 128])?;
    Ok(())
} // the stream is closed here
```

# Platform-specific Behavior

On Unix, writes to the underlying socket in `SOCK_STREAM` mode are made with
`MSG_NOSIGNAL` flag. This suppresses the emission of the  `SIGPIPE` signal when writing
to disconnected socket. In some cases, getting a `SIGPIPE` would trigger process termination.

## struct TcpListener

```rust
pub struct TcpListener(net_imp::TcpListener)
```

A TCP socket server, listening for connections.

After creating a `TcpListener` by `bind`ing it to a socket address, it listens
for incoming TCP connections. These can be accepted by calling `accept` or by
iterating over the `Incoming` iterator returned by `incoming``TcpListener::incoming`.

The socket will be closed when the value is dropped.

The Transmission Control Protocol is specified in [IETF RFC 793].

# Examples

```rust
use std::net::{TcpListener, TcpStream};

fn handle_client(stream: TcpStream) {
    // ...
}

fn main() -> std::io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:80")?;

    // accept connections and process them serially
    for stream in listener.incoming() {
        handle_client(stream?);
    }
    Ok(())
}
```

## struct Incoming

```rust
pub struct Incoming<'a>
```

An iterator that infinitely `accept`s connections on a `TcpListener`.

This `struct` is created by the `TcpListener::incoming` method.
See its documentation for more.

## TcpStream::connect

```rust
pub fn connect<A: ToSocketAddrs>(addr: A) -> io::Result<TcpStream>
```

Opens a TCP connection to a remote host.

`addr` is an address of the remote host. Anything which implements
`ToSocketAddrs` trait can be supplied for the address; see this trait
documentation for concrete examples.

If `addr` yields multiple addresses, `connect` will be attempted with
each of the addresses until a connection is successful. If none of
the addresses result in a successful connection, the error returned from
the last connection attempt (the last address) is returned.

# Examples

Open a TCP connection to `127.0.0.1:8080`:

```rust
use std::net::TcpStream;

if let Ok(stream) = TcpStream::connect("127.0.0.1:8080") {
    println!("Connected to the server!");
} else {
    println!("Couldn't connect to server...");
}
```

Open a TCP connection to `127.0.0.1:8080`. If the connection fails, open
a TCP connection to `127.0.0.1:8081`:

```rust
use std::net::{SocketAddr, TcpStream};

let addrs = [
    SocketAddr::from(([127, 0, 0, 1], 8080)),
    SocketAddr::from(([127, 0, 0, 1], 8081)),
];
if let Ok(stream) = TcpStream::connect(&addrs[..]) {
    println!("Connected to the server!");
} else {
    println!("Couldn't connect to server...");
}
```

## TcpStream::connect_timeout

```rust
pub fn connect_timeout(addr: &SocketAddr, timeout: Duration) -> io::Result<TcpStream>
```

Opens a TCP connection to a remote host with a timeout.

Unlike `connect`, `connect_timeout` takes a single `SocketAddr` since
timeout must be applied to individual addresses.

It is an error to pass a zero `Duration` to this function.

Unlike other methods on `TcpStream`, this does not correspond to a
single system call. It instead calls `connect` in nonblocking mode and
then uses an OS-specific mechanism to await the completion of the
connection request.

## TcpStream::peer_addr

```rust
pub fn peer_addr(&self) -> io::Result<SocketAddr>
```

Returns the socket address of the remote peer of this TCP connection.

# Examples

```rust
use std::net::{Ipv4Addr, SocketAddr, SocketAddrV4, TcpStream};

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
assert_eq!(stream.peer_addr().unwrap(),
           SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 8080)));
```

## TcpStream::local_addr

```rust
pub fn local_addr(&self) -> io::Result<SocketAddr>
```

Returns the socket address of the local half of this TCP connection.

# Examples

```rust
use std::net::{IpAddr, Ipv4Addr, TcpStream};

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
assert_eq!(stream.local_addr().unwrap().ip(),
           IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)));
```

## TcpStream::shutdown

```rust
pub fn shutdown(&self, how: Shutdown) -> io::Result<()>
```

Shuts down the read, write, or both halves of this connection.

This function will cause all pending and future I/O on the specified
portions to return immediately with an appropriate value (see the
documentation of `Shutdown`).

# Platform-specific behavior

Calling this function multiple times may result in different behavior,
depending on the operating system. On Linux, the second call will
return `Ok(())`, but on macOS, it will return `ErrorKind::NotConnected`.
This may change in the future.

# Examples

```rust
use std::net::{Shutdown, TcpStream};

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.shutdown(Shutdown::Both).expect("shutdown should succeed");
```

## TcpStream::try_clone

```rust
pub fn try_clone(&self) -> io::Result<TcpStream>
```

Creates a new independently owned handle to the underlying socket.

The returned `TcpStream` is a reference to the same stream that this
object references. Both handles will read and write the same stream of
data, and options set on one stream will be propagated to the other
stream.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
let stream_clone = stream.try_clone().expect("clone should succeed");
```

## TcpStream::set_read_timeout

```rust
pub fn set_read_timeout(&self, dur: Option<Duration>) -> io::Result<()>
```

Sets the read timeout to the timeout specified.

If the value specified is `None`, then `read` calls will block
indefinitely. An `Err` is returned if the zero `Duration` is
passed to this method.

# Platform-specific behavior

Platforms may return a different error code whenever a read times out as
a result of setting this option. For example Unix typically returns an
error of the kind `WouldBlock`, but Windows may return `TimedOut`.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.set_read_timeout(None).expect("set_read_timeout should succeed");
```

An `Err` is returned if the zero `Duration` is passed to this
method:

```rust
use std::io;
use std::net::TcpStream;
use std::time::Duration;

let stream = TcpStream::connect("127.0.0.1:8080").unwrap();
let result = stream.set_read_timeout(Some(Duration::new(0, 0)));
let err = result.unwrap_err();
assert_eq!(err.kind(), io::ErrorKind::InvalidInput)
```

## TcpStream::set_write_timeout

```rust
pub fn set_write_timeout(&self, dur: Option<Duration>) -> io::Result<()>
```

Sets the write timeout to the timeout specified.

If the value specified is `None`, then `write` calls will block
indefinitely. An `Err` is returned if the zero `Duration` is
passed to this method.

# Platform-specific behavior

Platforms may return a different error code whenever a write times out
as a result of setting this option. For example Unix typically returns
an error of the kind `WouldBlock`, but Windows may return `TimedOut`.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.set_write_timeout(None).expect("set_write_timeout should succeed");
```

An `Err` is returned if the zero `Duration` is passed to this
method:

```rust
use std::io;
use std::net::TcpStream;
use std::time::Duration;

let stream = TcpStream::connect("127.0.0.1:8080").unwrap();
let result = stream.set_write_timeout(Some(Duration::new(0, 0)));
let err = result.unwrap_err();
assert_eq!(err.kind(), io::ErrorKind::InvalidInput)
```

## TcpStream::read_timeout

```rust
pub fn read_timeout(&self) -> io::Result<Option<Duration>>
```

Returns the read timeout of this socket.

If the timeout is `None`, then `read` calls will block indefinitely.

# Platform-specific behavior

Some platforms do not provide access to the current timeout.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.set_read_timeout(None).expect("set_read_timeout should succeed");
assert_eq!(stream.read_timeout().unwrap(), None);
```

## TcpStream::write_timeout

```rust
pub fn write_timeout(&self) -> io::Result<Option<Duration>>
```

Returns the write timeout of this socket.

If the timeout is `None`, then `write` calls will block indefinitely.

# Platform-specific behavior

Some platforms do not provide access to the current timeout.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.set_write_timeout(None).expect("set_write_timeout should succeed");
assert_eq!(stream.write_timeout().unwrap(), None);
```

## TcpStream::peek

```rust
pub fn peek(&self, buf: &mut [u8]) -> io::Result<usize>
```

Receives data on the socket from the remote address to which it is
connected, without removing that data from the queue. On success,
returns the number of bytes peeked.

Successive calls return the same data. This is accomplished by passing
`MSG_PEEK` as a flag to the underlying `recv` system call.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8000")
                       .expect("Couldn't connect to the server...");
let mut buf = [0; 10];
let len = stream.peek(&mut buf).expect("peek should succeed");
```

## TcpStream::set_nodelay

```rust
pub fn set_nodelay(&self, nodelay: bool) -> io::Result<()>
```

Sets the value of the `TCP_NODELAY` option on this socket.

If set, this option disables the Nagle algorithm. This means that
segments are always sent as soon as possible, even if there is only a
small amount of data. When not set, data is buffered until there is a
sufficient amount to send out, thereby avoiding the frequent sending of
small packets.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.set_nodelay(true).expect("set_nodelay should succeed");
```

## TcpStream::nodelay

```rust
pub fn nodelay(&self) -> io::Result<bool>
```

Gets the value of the `TCP_NODELAY` option on this socket.

For more information about this option, see `TcpStream::set_nodelay`.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.set_nodelay(true).expect("set_nodelay should succeed");
assert_eq!(stream.nodelay().unwrap_or(false), true);
```

## TcpStream::set_ttl

```rust
pub fn set_ttl(&self, ttl: u32) -> io::Result<()>
```

Sets the value for the `IP_TTL` option on this socket.

This value sets the time-to-live field that is used in every packet sent
from this socket.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.set_ttl(100).expect("set_ttl should succeed");
```

## TcpStream::ttl

```rust
pub fn ttl(&self) -> io::Result<u32>
```

Gets the value of the `IP_TTL` option for this socket.

For more information about this option, see `TcpStream::set_ttl`.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.set_ttl(100).expect("set_ttl should succeed");
assert_eq!(stream.ttl().unwrap_or(0), 100);
```

## TcpStream::take_error

```rust
pub fn take_error(&self) -> io::Result<Option<io::Error>>
```

Gets the value of the `SO_ERROR` option on this socket.

This will retrieve the stored error in the underlying socket, clearing
the field in the process. This can be useful for checking errors between
calls.

# Examples

```rust
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.take_error().expect("No error was expected...");
```

## TcpStream::set_nonblocking

```rust
pub fn set_nonblocking(&self, nonblocking: bool) -> io::Result<()>
```

Moves this TCP stream into or out of nonblocking mode.

This will result in `read`, `write`, `recv` and `send` system operations
becoming nonblocking, i.e., immediately returning from their calls.
If the IO operation is successful, `Ok` is returned and no further
action is required. If the IO operation could not be completed and needs
to be retried, an error with kind `io::ErrorKind::WouldBlock` is
returned.

On most Unix platforms, calling this method corresponds to calling `ioctl`
`FIONBIO`. On Windows, calling this method corresponds to calling
`ioctlsocket` `FIONBIO`.

# Examples

Reading bytes from a TCP stream in non-blocking mode:

```rust
use std::io::{self, Read};
use std::net::TcpStream;

let mut stream = TcpStream::connect("127.0.0.1:7878")
    .expect("Couldn't connect to the server...");
stream.set_nonblocking(true).expect("set_nonblocking should succeed");

let mut buf = vec![];
loop {
    match stream.read_to_end(&mut buf) {
        Ok(_) => break,
        Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {
            // wait until network socket is ready, typically implemented
            // via platform-specific APIs such as epoll or IOCP
            wait_for_fd();
        }
        Err(e) => panic!("encountered IO error: {e}"),
    };
};
println!("bytes: {buf:?}");
```
