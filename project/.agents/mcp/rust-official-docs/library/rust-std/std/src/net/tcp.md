# std::net::tcp

## struct TcpStream

```rust
pub struct TcpStream(net_imp::TcpStream)
```

A TCP stream between a local and a remote socket.

After creating a `TcpStream` by either [`connect`]ing to a remote host or
[`accept`]ing a connection on a [`TcpListener`], data can be transmitted
by [reading] and [writing] to it.

The connection will be closed when the value is dropped. The reading and writing
portions of the connection can also be shut down individually with the [`shutdown`]
method.

The Transmission Control Protocol is specified in [IETF RFC 793].

[`accept`]: TcpListener::accept
[`connect`]: TcpStream::connect
[IETF RFC 793]: https://tools.ietf.org/html/rfc793
[reading]: Read
[`shutdown`]: TcpStream::shutdown
[writing]: Write

# Examples

```no_run
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

After creating a `TcpListener` by [`bind`]ing it to a socket address, it listens
for incoming TCP connections. These can be accepted by calling [`accept`] or by
iterating over the [`Incoming`] iterator returned by [`incoming`][`TcpListener::incoming`].

The socket will be closed when the value is dropped.

The Transmission Control Protocol is specified in [IETF RFC 793].

[`accept`]: TcpListener::accept
[`bind`]: TcpListener::bind
[IETF RFC 793]: https://tools.ietf.org/html/rfc793

# Examples

```no_run
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

An iterator that infinitely [`accept`]s connections on a [`TcpListener`].

This `struct` is created by the [`TcpListener::incoming`] method.
See its documentation for more.

[`accept`]: TcpListener::accept

## TcpStream::connect

```rust
pub fn connect<A: ToSocketAddrs>(addr: A) -> io::Result<TcpStream>
```

Opens a TCP connection to a remote host.

`addr` is an address of the remote host. Anything which implements
[`ToSocketAddrs`] trait can be supplied for the address; see this trait
documentation for concrete examples.

If `addr` yields multiple addresses, `connect` will be attempted with
each of the addresses until a connection is successful. If none of
the addresses result in a successful connection, the error returned from
the last connection attempt (the last address) is returned.

# Examples

Open a TCP connection to `127.0.0.1:8080`:

```no_run
use std::net::TcpStream;

if let Ok(stream) = TcpStream::connect("127.0.0.1:8080") {
    println!("Connected to the server!");
} else {
    println!("Couldn't connect to server...");
}
```

Open a TCP connection to `127.0.0.1:8080`. If the connection fails, open
a TCP connection to `127.0.0.1:8081`:

```no_run
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

Unlike `connect`, `connect_timeout` takes a single [`SocketAddr`] since
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

```no_run
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

```no_run
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
documentation of [`Shutdown`]).

# Platform-specific behavior

Calling this function multiple times may result in different behavior,
depending on the operating system. On Linux, the second call will
return `Ok(())`, but on macOS, it will return `ErrorKind::NotConnected`.
This may change in the future.

# Examples

```no_run
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

```no_run
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

If the value specified is [`None`], then [`read`] calls will block
indefinitely. An [`Err`] is returned if the zero [`Duration`] is
passed to this method.

# Platform-specific behavior

Platforms may return a different error code whenever a read times out as
a result of setting this option. For example Unix typically returns an
error of the kind [`WouldBlock`], but Windows may return [`TimedOut`].

[`read`]: Read::read
[`WouldBlock`]: io::ErrorKind::WouldBlock
[`TimedOut`]: io::ErrorKind::TimedOut

# Examples

```no_run
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.set_read_timeout(None).expect("set_read_timeout should succeed");
```

An [`Err`] is returned if the zero [`Duration`] is passed to this
method:

```no_run
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

If the value specified is [`None`], then [`write`] calls will block
indefinitely. An [`Err`] is returned if the zero [`Duration`] is
passed to this method.

# Platform-specific behavior

Platforms may return a different error code whenever a write times out
as a result of setting this option. For example Unix typically returns
an error of the kind [`WouldBlock`], but Windows may return [`TimedOut`].

[`write`]: Write::write
[`WouldBlock`]: io::ErrorKind::WouldBlock
[`TimedOut`]: io::ErrorKind::TimedOut

# Examples

```no_run
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:8080")
                       .expect("Couldn't connect to the server...");
stream.set_write_timeout(None).expect("set_write_timeout should succeed");
```

An [`Err`] is returned if the zero [`Duration`] is passed to this
method:

```no_run
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

If the timeout is [`None`], then [`read`] calls will block indefinitely.

# Platform-specific behavior

Some platforms do not provide access to the current timeout.

[`read`]: Read::read

# Examples

```no_run
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

If the timeout is [`None`], then [`write`] calls will block indefinitely.

# Platform-specific behavior

Some platforms do not provide access to the current timeout.

[`write`]: Write::write

# Examples

```no_run
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

```no_run
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

```no_run
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

For more information about this option, see [`TcpStream::set_nodelay`].

# Examples

```no_run
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

```no_run
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

For more information about this option, see [`TcpStream::set_ttl`].

# Examples

```no_run
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

```no_run
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
to be retried, an error with kind [`io::ErrorKind::WouldBlock`] is
returned.

On most Unix platforms, calling this method corresponds to calling `ioctl`
`FIONBIO`. On Windows, calling this method corresponds to calling
`ioctlsocket` `FIONBIO`.

# Examples

Reading bytes from a TCP stream in non-blocking mode:

```no_run
use std::io::{self, Read};
use std::net::TcpStream;

let mut stream = TcpStream::connect("127.0.0.1:7878")
    .expect("Couldn't connect to the server...");
stream.set_nonblocking(true).expect("set_nonblocking should succeed");

# fn wait_for_fd() { unimplemented!() }
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

## TcpListener::bind

```rust
pub fn bind<A: ToSocketAddrs>(addr: A) -> io::Result<TcpListener>
```

Creates a new `TcpListener` which will be bound to the specified
address.

The returned listener is ready for accepting connections.

Binding with a port number of 0 will request that the OS assigns a port
to this listener. The port allocated can be queried via the
[`TcpListener::local_addr`] method.

The address type can be any implementor of [`ToSocketAddrs`] trait. See
its documentation for concrete examples.

If `addr` yields multiple addresses, `bind` will be attempted with
each of the addresses until one succeeds and returns the listener. If
none of the addresses succeed in creating a listener, the error returned
from the last attempt (the last address) is returned.

# Examples

Creates a TCP listener bound to `127.0.0.1:80`:

```no_run
use std::net::TcpListener;

let listener = TcpListener::bind("127.0.0.1:80").unwrap();
```

Creates a TCP listener bound to `127.0.0.1:80`. If that fails, create a
TCP listener bound to `127.0.0.1:443`:

```no_run
use std::net::{SocketAddr, TcpListener};

let addrs = [
    SocketAddr::from(([127, 0, 0, 1], 80)),
    SocketAddr::from(([127, 0, 0, 1], 443)),
];
let listener = TcpListener::bind(&addrs[..]).unwrap();
```

Creates a TCP listener bound to a port assigned by the operating system
at `127.0.0.1`.

```no_run
use std::net::TcpListener;

let socket = TcpListener::bind("127.0.0.1:0").unwrap();
```

## TcpListener::local_addr

```rust
pub fn local_addr(&self) -> io::Result<SocketAddr>
```

Returns the local socket address of this listener.

# Examples

```no_run
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

The returned [`TcpListener`] is a reference to the same socket that this
object references. Both handles can be used to accept incoming
connections and options set on one listener will affect the other.

# Examples

```no_run
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
is established. When established, the corresponding [`TcpStream`] and the
remote peer's address will be returned.

# Errors

Some errors this function returns do not indicate a problem with the
listener itself, and a program serving a long-lived listener will
usually want to handle them and keep accepting connections rather than
treat them as fatal. These include, but are not limited to:

- An error specific to a single incoming connection that failed before
  it could be accepted, such as one aborted by the peer
  ([`ConnectionAborted`]). A later call may succeed immediately.
- An error from reaching the per-process or system-wide open file
  descriptor limit. The call can be retried once other file descriptors
  have been closed, typically after a short delay.
- An error from failing to allocate memory while accepting a connection
  ([`OutOfMemory`]).

Which errors can occur is platform-specific. On Unix, [`Interrupted`]
errors are retried internally rather than being returned.

[`ConnectionAborted`]: io::ErrorKind::ConnectionAborted
[`OutOfMemory`]: io::ErrorKind::OutOfMemory
[`Interrupted`]: io::ErrorKind::Interrupted

# Examples

```no_run
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

The returned iterator will never return [`None`] and will also not yield
the peer's [`SocketAddr`] structure. Iterating over it is equivalent to
calling [`TcpListener::accept`] in a loop.

# Errors

Each connection yielded by the iterator can fail for the same reasons as
[`TcpListener::accept`]; see its documentation for details.

# Examples

```no_run
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

```no_run
use std::net::TcpListener;

let listener = TcpListener::bind("127.0.0.1:80").unwrap();
listener.set_ttl(100).expect("set_ttl should succeed");
```

## TcpListener::ttl

```rust
pub fn ttl(&self) -> io::Result<u32>
```

Gets the value of the `IP_TTL` option for this socket.

For more information about this option, see [`TcpListener::set_ttl`].

# Examples

```no_run
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

```no_run
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
with kind [`io::ErrorKind::WouldBlock`] is returned.

On most Unix platforms, calling this method corresponds to calling `ioctl`
`FIONBIO`. On Windows, calling this method corresponds to calling
`ioctlsocket` `FIONBIO`.

# Examples

Bind a TCP listener to an address, listen for connections, and read
bytes in nonblocking mode:

```no_run
use std::io;
use std::net::TcpListener;

let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
listener.set_nonblocking(true).expect("set_nonblocking should succeed");

# fn wait_for_fd() { unimplemented!() }
# fn handle_connection(stream: std::net::TcpStream) { unimplemented!() }
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