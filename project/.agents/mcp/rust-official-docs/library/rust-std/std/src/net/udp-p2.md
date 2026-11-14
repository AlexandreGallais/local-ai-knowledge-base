---
title: "std::net::udp (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/net/udp.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::net::udp (part 2 of 2)

## UdpSocket::multicast_loop_v6

```rust
pub fn multicast_loop_v6(&self) -> io::Result<bool>
```

Gets the value of the `IPV6_MULTICAST_LOOP` option for this socket.

For more information about this option, see `UdpSocket::set_multicast_loop_v6`.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("[::1]:34254").expect("bind should succeed");
socket.set_multicast_loop_v6(false).expect("set_multicast_loop_v6 should succeed");
assert_eq!(socket.multicast_loop_v6().unwrap(), false);
```

## UdpSocket::set_ttl

```rust
pub fn set_ttl(&self, ttl: u32) -> io::Result<()>
```

Sets the value for the `IP_TTL` option on this socket.

This value sets the time-to-live field that is used in every packet sent
from this socket.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_ttl(42).expect("set_ttl should succeed");
```

## UdpSocket::ttl

```rust
pub fn ttl(&self) -> io::Result<u32>
```

Gets the value of the `IP_TTL` option for this socket.

For more information about this option, see `UdpSocket::set_ttl`.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.set_ttl(42).expect("set_ttl should succeed");
assert_eq!(socket.ttl().unwrap(), 42);
```

## UdpSocket::join_multicast_v4

```rust
pub fn join_multicast_v4(&self, multiaddr: &Ipv4Addr, interface: &Ipv4Addr) -> io::Result<()>
```

Executes an operation of the `IP_ADD_MEMBERSHIP` type.

This function specifies a new multicast group for this socket to join.
The address must be a valid multicast address, and `interface` is the
address of the local interface with which the system should join the
multicast group. If it's equal to `UNSPECIFIED`
then an appropriate interface is chosen by the system.

## UdpSocket::join_multicast_v6

```rust
pub fn join_multicast_v6(&self, multiaddr: &Ipv6Addr, interface: u32) -> io::Result<()>
```

Executes an operation of the `IPV6_ADD_MEMBERSHIP` type.

This function specifies a new multicast group for this socket to join.
The address must be a valid multicast address, and `interface` is the
index of the interface to join/leave (or 0 to indicate any interface).

## UdpSocket::leave_multicast_v4

```rust
pub fn leave_multicast_v4(&self, multiaddr: &Ipv4Addr, interface: &Ipv4Addr) -> io::Result<()>
```

Executes an operation of the `IP_DROP_MEMBERSHIP` type.

For more information about this option, see `UdpSocket::join_multicast_v4`.

## UdpSocket::leave_multicast_v6

```rust
pub fn leave_multicast_v6(&self, multiaddr: &Ipv6Addr, interface: u32) -> io::Result<()>
```

Executes an operation of the `IPV6_DROP_MEMBERSHIP` type.

For more information about this option, see `UdpSocket::join_multicast_v6`.

## UdpSocket::take_error

```rust
pub fn take_error(&self) -> io::Result<Option<io::Error>>
```

Gets the value of the `SO_ERROR` option on this socket.

This will retrieve the stored error in the underlying socket, clearing
the field in the process. This can be useful for checking errors between
calls.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
match socket.take_error() {
    Ok(Some(error)) => println!("UdpSocket error: {error:?}"),
    Ok(None) => println!("No error"),
    Err(error) => println!("UdpSocket.take_error failed: {error:?}"),
}
```

## UdpSocket::connect

```rust
pub fn connect<A: ToSocketAddrs>(&self, addr: A) -> io::Result<()>
```

Connects this UDP socket to a remote address, allowing the `send` and
`recv` syscalls to be used to send data and also applies filters to only
receive data from the specified address.

If `addr` yields multiple addresses, `connect` will be attempted with
each of the addresses until the underlying OS function returns no
error. Note that usually, a successful `connect` call does not specify
that there is a remote server listening on the port, rather, such an
error would only be detected after the first send. If the OS returns an
error for each of the specified addresses, the error returned from the
last connection attempt (the last address) is returned.

# Examples

Creates a UDP socket bound to `127.0.0.1:3400` and connect the socket to
`127.0.0.1:8080`:

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:3400").expect("bind should succeed");
socket.connect("127.0.0.1:8080").expect("connect should succeed");
```

Unlike in the TCP case, passing an array of addresses to the `connect`
function of a UDP socket is not a useful thing to do: The OS will be
unable to determine whether something is listening on the remote
address without the application sending data.

If your first `connect` is to a loopback address, subsequent
`connect`s to non-loopback addresses might fail, depending
on the platform.

## UdpSocket::send

```rust
pub fn send(&self, buf: &[u8]) -> io::Result<usize>
```

Sends data on the socket to the remote address to which it is connected.
On success, returns the number of bytes written. Note that the operating
system may refuse buffers larger than 65507. However, partial writes are
not possible until buffer sizes above `i32::MAX`.

`UdpSocket::connect` will connect this socket to a remote address. This
method will fail if the socket is not connected.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.connect("127.0.0.1:8080").expect("connect should succeed");
socket.send(&[0, 1, 2]).expect("send should succeed");
```

## UdpSocket::recv

```rust
pub fn recv(&self, buf: &mut [u8]) -> io::Result<usize>
```

Receives a single datagram message on the socket from the remote address to
which it is connected. On success, returns the number of bytes read.

The function must be called with valid byte array `buf` of sufficient size to
hold the message bytes. If a message is too long to fit in the supplied buffer,
excess bytes may be discarded.

`UdpSocket::connect` will connect this socket to a remote address. This
method will fail if the socket is not connected.

Refer to the platform-specific documentation on this function; it is considered
correct for its behavior to differ from `UdpSocket::recv_from` if the underlying
system call does so.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.connect("127.0.0.1:8080").expect("connect should succeed");
let mut buf = [0; 10];
match socket.recv(&mut buf) {
    Ok(received) => println!("received {received} bytes {:?}", &buf[..received]),
    Err(e) => println!("recv function failed: {e:?}"),
}
```

## UdpSocket::peek

```rust
pub fn peek(&self, buf: &mut [u8]) -> io::Result<usize>
```

Receives single datagram on the socket from the remote address to which it is
connected, without removing the message from input queue. On success, returns
the number of bytes peeked.

The function must be called with valid byte array `buf` of sufficient size to
hold the message bytes. If a message is too long to fit in the supplied buffer,
excess bytes may be discarded.

Successive calls return the same data. This is accomplished by passing
`MSG_PEEK` as a flag to the underlying `recv` system call.

Do not use this function to implement busy waiting, instead use `libc::poll` to
synchronize IO events on one or more sockets.

`UdpSocket::connect` will connect this socket to a remote address. This
method will fail if the socket is not connected.

# Errors

This method will fail if the socket is not connected. The `connect` method
will connect this socket to a remote address.

# Examples

```rust
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:34254").expect("bind should succeed");
socket.connect("127.0.0.1:8080").expect("connect should succeed");
let mut buf = [0; 10];
match socket.peek(&mut buf) {
    Ok(received) => println!("received {received} bytes"),
    Err(e) => println!("peek function failed: {e:?}"),
}
```

## UdpSocket::set_nonblocking

```rust
pub fn set_nonblocking(&self, nonblocking: bool) -> io::Result<()>
```

Moves this UDP socket into or out of nonblocking mode.

This will result in `recv`, `recv_from`, `send`, and `send_to` system
operations becoming nonblocking, i.e., immediately returning from their
calls. If the IO operation is successful, `Ok` is returned and no
further action is required. If the IO operation could not be completed
and needs to be retried, an error with kind
`io::ErrorKind::WouldBlock` is returned.

On most Unix platforms, calling this method corresponds to calling `ioctl`
`FIONBIO`. On Windows, calling this method corresponds to calling
`ioctlsocket` `FIONBIO`.

# Examples

Creates a UDP socket bound to `127.0.0.1:7878` and read bytes in
nonblocking mode:

```rust
use std::io;
use std::net::UdpSocket;

let socket = UdpSocket::bind("127.0.0.1:7878").unwrap();
socket.set_nonblocking(true).unwrap();

let mut buf = [0; 10];
let (num_bytes_read, _) = loop {
    match socket.recv_from(&mut buf) {
        Ok(n) => break n,
        Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {
            // wait until network socket is ready, typically implemented
            // via platform-specific APIs such as epoll or IOCP
            wait_for_fd();
        }
        Err(e) => panic!("encountered IO error: {e}"),
    }
};
println!("bytes: {:?}", &buf[..num_bytes_read]);
```
