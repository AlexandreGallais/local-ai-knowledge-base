---
title: "std::net::udp (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/net/udp.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::net::udp

## struct UdpSocket

```rust
pub struct UdpSocket(net_imp::UdpSocket)
```

A UDP socket.

After creating a `UdpSocket` by `bind`ing it to a socket address, data can be
[sent to] and [received from] any other socket address.

Although UDP is a connectionless protocol, this implementation provides an interface
to set an address where data should be sent and received from. After setting a remote
address with `connect`, data can be sent to and received from that address with
`send` and `recv`.

As stated in the User Datagram Protocol's specification in [IETF RFC 768], UDP is
an unordered, unreliable protocol; refer to `TcpListener` and `TcpStream` for TCP
primitives.

# Examples

```rust
use std::net::UdpSocket;

fn main() -> std::io::Result<()> {
    {
        let socket = UdpSocket::bind("127.0.0.1:34254")?;

        // Receives a single datagram message on the socket. If `buf` is too small to hold
        // the message, it will be cut off.
        let mut buf = [0; 10];
        let (amt, src) = socket.recv_from(&mut buf)?;

        // Redeclare `buf` as slice of the received data and send reverse data back to origin.
        let buf = &mut buf[..amt];
        buf.reverse();
        socket.send_to(buf, &src)?;
    } // the socket is closed here
    Ok(())
}
```

## UdpSocket::bind

```rust
pub fn bind<A: ToSocketAddrs>(addr: A) -> io::Result<UdpSocket>
```

Creates a UDP socket from the given address.

The address type can be any implementor of `ToSocketAddrs` trait. See
its documentation for concrete examples.

If `addr` yields multiple addresses, `bind` will be attempted with
each of the addresses until one succeeds and returns the socket. If none
of the addresses succeed in creating a socket, the error returned from
the last attempt (the last address) is returned.

# Examples

Creates a UDP socket bound to `127.0.0.1:3400`:

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:3400").expect("bind should succeed");
```

Creates a UDP socket bound to `127.0.0.1:3400`. If the socket cannot be
bound to that address, create a UDP socket bound to `127.0.0.1:3401`:

```rust
use std::net::{SocketAddr, UdpSocket};

let addrs = [
    SocketAddr::from(([127, 0, 0, 1], 3400)),
    SocketAddr::from(([127, 0, 0, 1], 3401)),
];
let socket = UdpSocket::bind(&addrs[..]).expect("bind should succeed");
```

Creates a UDP socket bound to a port assigned by the operating system
at `127.0.0.1`.

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:0").unwrap();
```

Note that `bind` declares the scope of your network connection.
You can only receive datagrams from and send datagrams to
participants in that view of the network.
For instance, binding to a loopback address as in the example
above will prevent you from sending datagrams to another device
in your local network.

In order to limit your view of the network the least, `bind` to
`Ipv4Addr::UNSPECIFIED` or `Ipv6Addr::UNSPECIFIED`.

## UdpSocket::recv_from

```rust
pub fn recv_from(&self, buf: &mut [u8]) -> io::Result<(usize, SocketAddr)>
```

Receives a single datagram message on the socket. On success, returns the number
of bytes read and the origin.

The function must be called with valid byte array `buf` of sufficient size to
hold the message bytes. If a message is too long to fit in the supplied buffer,
excess bytes may be discarded.

Refer to the platform-specific documentation on this function; it is considered
correct for its behavior to differ from `UdpSocket::recv` if the underlying system
call does so.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
let mut buf = [0; 10];
let (number_of_bytes, src_addr) = socket.recv_from(&mut buf)
                                        .expect("recv_from should succeed");
let filled_buf = &mut buf[..number_of_bytes];
```

## UdpSocket::peek_from

```rust
pub fn peek_from(&self, buf: &mut [u8]) -> io::Result<(usize, SocketAddr)>
```

Receives a single datagram message on the socket, without removing it from the
queue. On success, returns the number of bytes read and the origin.

The function must be called with valid byte array `buf` of sufficient size to
hold the message bytes. If a message is too long to fit in the supplied buffer,
excess bytes may be discarded.

Successive calls return the same data. This is accomplished by passing
`MSG_PEEK` as a flag to the underlying `recvfrom` system call.

Do not use this function to implement busy waiting, instead use `libc::poll` to
synchronize IO events on one or more sockets.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
let mut buf = [0; 10];
let (number_of_bytes, src_addr) = socket.peek_from(&mut buf)
                                        .expect("recv_from should succeed");
let filled_buf = &mut buf[..number_of_bytes];
```

## UdpSocket::send_to

```rust
pub fn send_to<A: ToSocketAddrs>(&self, buf: &[u8], addr: A) -> io::Result<usize>
```

Sends data on the socket to the given address. On success, returns the
number of bytes written. Note that the operating system may refuse
buffers larger than 65507. However, partial writes are not possible
until buffer sizes above `i32::MAX`.

Address type can be any implementor of `ToSocketAddrs` trait. See its
documentation for concrete examples.

It is possible for `addr` to yield multiple addresses, but `send_to`
will only send data to the first address yielded by `addr`.

This will return an error when the IP version of the local socket
does not match that returned from `ToSocketAddrs`.

See [Issue #34202] for more details.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.send_to(&[0; 10], "127.0.0.1:4242").expect("send_to should succeed");
```

## UdpSocket::peer_addr

```rust
pub fn peer_addr(&self) -> io::Result<SocketAddr>
```

Returns the socket address of the remote peer this socket was connected to.

# Examples

```rust
use std::net::{Ipv4Addr, SocketAddr, SocketAddrV4, UdpSocket};

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.connect("192.168.0.1:41203").expect("connect should succeed");
assert_eq!(socket.peer_addr().unwrap(),
           SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::new(192, 168, 0, 1), 41203)));
```

If the socket isn't connected, it will return a `NotConnected` error.

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
assert_eq!(socket.peer_addr().unwrap_err().kind(),
           std::io::ErrorKind::NotConnected);
```

## UdpSocket::local_addr

```rust
pub fn local_addr(&self) -> io::Result<SocketAddr>
```

Returns the socket address that this socket was created from.

# Examples

```rust
use std::net::{Ipv4Addr, SocketAddr, SocketAddrV4, UdpSocket};

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
assert_eq!(socket.local_addr().unwrap(),
           SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 34254)));
```

## UdpSocket::try_clone

```rust
pub fn try_clone(&self) -> io::Result<UdpSocket>
```

Creates a new independently owned handle to the underlying socket.

The returned `UdpSocket` is a reference to the same socket that this
object references. Both handles will read and write the same port, and
options set on one socket will be propagated to the other.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
let socket_clone = socket.try_clone().expect("try_clone should succeed");
```

## UdpSocket::set_read_timeout

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
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_read_timeout(None).expect("set_read_timeout should succeed");
```

An `Err` is returned if the zero `Duration` is passed to this
method:

```rust
use std::io;
use std::net::UdpSocket;
use std::time::Duration;

let socket = UdpSocket::bind("127.0.0.1:34254").unwrap();
let result = socket.set_read_timeout(Some(Duration::new(0, 0)));
let err = result.unwrap_err();
assert_eq!(err.kind(), io::ErrorKind::InvalidInput)
```

## UdpSocket::set_write_timeout

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
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_write_timeout(None).expect("set_write_timeout should succeed");
```

An `Err` is returned if the zero `Duration` is passed to this
method:

```rust
use std::io;
use std::net::UdpSocket;
use std::time::Duration;

let socket = UdpSocket::bind("127.0.0.1:34254").unwrap();
let result = socket.set_write_timeout(Some(Duration::new(0, 0)));
let err = result.unwrap_err();
assert_eq!(err.kind(), io::ErrorKind::InvalidInput)
```

## UdpSocket::read_timeout

```rust
pub fn read_timeout(&self) -> io::Result<Option<Duration>>
```

Returns the read timeout of this socket.

If the timeout is `None`, then `read` calls will block indefinitely.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_read_timeout(None).expect("set_read_timeout should succeed");
assert_eq!(socket.read_timeout().unwrap(), None);
```

## UdpSocket::write_timeout

```rust
pub fn write_timeout(&self) -> io::Result<Option<Duration>>
```

Returns the write timeout of this socket.

If the timeout is `None`, then `write` calls will block indefinitely.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_write_timeout(None).expect("set_write_timeout should succeed");
assert_eq!(socket.write_timeout().unwrap(), None);
```

## UdpSocket::set_broadcast

```rust
pub fn set_broadcast(&self, broadcast: bool) -> io::Result<()>
```

Sets the value of the `SO_BROADCAST` option for this socket.

When enabled, this socket is allowed to send packets to a broadcast
address.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_broadcast(false).expect("set_broadcast should succeed");
```

## UdpSocket::broadcast

```rust
pub fn broadcast(&self) -> io::Result<bool>
```

Gets the value of the `SO_BROADCAST` option for this socket.

For more information about this option, see `UdpSocket::set_broadcast`.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_broadcast(false).expect("set_broadcast should succeed");
assert_eq!(socket.broadcast().unwrap(), false);
```

## UdpSocket::set_multicast_loop_v4

```rust
pub fn set_multicast_loop_v4(&self, multicast_loop_v4: bool) -> io::Result<()>
```

Sets the value of the `IP_MULTICAST_LOOP` option for this socket.

If enabled, multicast packets will be looped back to the local socket.
Note that this might not have any effect on IPv6 sockets.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_multicast_loop_v4(false).expect("set_multicast_loop_v4 should succeed");
```

## UdpSocket::multicast_loop_v4

```rust
pub fn multicast_loop_v4(&self) -> io::Result<bool>
```

Gets the value of the `IP_MULTICAST_LOOP` option for this socket.

For more information about this option, see `UdpSocket::set_multicast_loop_v4`.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_multicast_loop_v4(false).expect("set_multicast_loop_v4 should succeed");
assert_eq!(socket.multicast_loop_v4().unwrap(), false);
```

## UdpSocket::set_multicast_ttl_v4

```rust
pub fn set_multicast_ttl_v4(&self, multicast_ttl_v4: u32) -> io::Result<()>
```

Sets the value of the `IP_MULTICAST_TTL` option for this socket.

Indicates the time-to-live value of outgoing multicast packets for
this socket. The default value is 1 which means that multicast packets
don't leave the local network unless explicitly requested.

Note that this might not have any effect on IPv6 sockets.

Since the underlying socket option value is byte-sized,
any value above 255 will result in an error.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_multicast_ttl_v4(42).expect("set_multicast_ttl_v4 should succeed");
```

## UdpSocket::multicast_ttl_v4

```rust
pub fn multicast_ttl_v4(&self) -> io::Result<u32>
```

Gets the value of the `IP_MULTICAST_TTL` option for this socket.

For more information about this option, see `UdpSocket::set_multicast_ttl_v4`.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_multicast_ttl_v4(42).expect("set_multicast_ttl_v4 should succeed");
assert_eq!(socket.multicast_ttl_v4().unwrap(), 42);
```

## UdpSocket::set_multicast_loop_v6

```rust
pub fn set_multicast_loop_v6(&self, multicast_loop_v6: bool) -> io::Result<()>
```

Sets the value of the `IPV6_MULTICAST_LOOP` option for this socket.

Controls whether this socket sees the multicast packets it sends itself.
Note that this might not have any affect on IPv4 sockets.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("[::1]:34254").expect("bind should succeed");
socket.set_multicast_loop_v6(false).expect("set_multicast_loop_v6 should succeed");
```
