---
title: "std::os::unix::net::datagram"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/unix/net/datagram.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::unix::net::datagram

## struct UnixDatagram

```rust
pub struct UnixDatagram(Socket)
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let socket = UnixDatagram::bind("/path/to/my/socket")?;
    socket.send_to(b"hello world", "/path/to/other/socket")?;
    let mut buf = [0; 100];
    let (count, address) = socket.recv_from(&mut buf)?;
    println!("socket {:?} sent {:?}", address, &buf[..count]);
    Ok(())
}
```rust

## UnixDatagram::bind

```rust
pub fn bind<P: AsRef<Path>>(path: P) -> io::Result<UnixDatagram>
```

use std::os::unix::net::UnixDatagram;

let sock = match UnixDatagram::bind("/path/to/the/socket") {
    Ok(sock) => sock,
    Err(e) => {
        println!("Couldn't bind: {e:?}");
        return
    }
};
```rust

## UnixDatagram::bind_addr

```rust
pub fn bind_addr(socket_addr: &SocketAddr) -> io::Result<UnixDatagram>
```

use std::os::unix::net::{UnixDatagram};

fn main() -> std::io::Result<()> {
    let sock1 = UnixDatagram::bind("path/to/socket")?;
    let addr = sock1.local_addr()?;

    let sock2 = match UnixDatagram::bind_addr(&addr) {
        Ok(sock) => sock,
        Err(err) => {
            println!("Couldn't bind: {err:?}");
            return Err(err);
        }
    };
    Ok(())
}
```rust

## UnixDatagram::unbound

```rust
pub fn unbound() -> io::Result<UnixDatagram>
```

use std::os::unix::net::UnixDatagram;

let sock = match UnixDatagram::unbound() {
    Ok(sock) => sock,
    Err(e) => {
        println!("Couldn't unbound: {e:?}");
        return
    }
};
```rust

## UnixDatagram::pair

```rust
pub fn pair() -> io::Result<(UnixDatagram, UnixDatagram)>
```

use std::os::unix::net::UnixDatagram;

let (sock1, sock2) = match UnixDatagram::pair() {
    Ok((sock1, sock2)) => (sock1, sock2),
    Err(e) => {
        println!("Couldn't unbound: {e:?}");
        return
    }
};
```rust

## UnixDatagram::connect

```rust
pub fn connect<P: AsRef<Path>>(&self, path: P) -> io::Result<()>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::unbound()?;
    match sock.connect("/path/to/the/socket") {
        Ok(sock) => sock,
        Err(e) => {
            println!("Couldn't connect: {e:?}");
            return Err(e)
        }
    };
    Ok(())
}
```rust

## UnixDatagram::connect_addr

```rust
pub fn connect_addr(&self, socket_addr: &SocketAddr) -> io::Result<()>
```

use std::os::unix::net::{UnixDatagram};

fn main() -> std::io::Result<()> {
    let bound = UnixDatagram::bind("/path/to/socket")?;
    let addr = bound.local_addr()?;

    let sock = UnixDatagram::unbound()?;
    match sock.connect_addr(&addr) {
        Ok(sock) => sock,
        Err(e) => {
            println!("Couldn't connect: {e:?}");
            return Err(e)
        }
    };
    Ok(())
}
```rust

## UnixDatagram::try_clone

```rust
pub fn try_clone(&self) -> io::Result<UnixDatagram>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::bind("/path/to/the/socket")?;
    let sock_copy = sock.try_clone().expect("try_clone failed");
    Ok(())
}
```rust

## UnixDatagram::local_addr

```rust
pub fn local_addr(&self) -> io::Result<SocketAddr>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::bind("/path/to/the/socket")?;
    let addr = sock.local_addr().expect("Couldn't get local address");
    Ok(())
}
```rust

## UnixDatagram::peer_addr

```rust
pub fn peer_addr(&self) -> io::Result<SocketAddr>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::unbound()?;
    sock.connect("/path/to/the/socket")?;

    let addr = sock.peer_addr().expect("Couldn't get peer address");
    Ok(())
}
```rust

## UnixDatagram::recv_from

```rust
pub fn recv_from(&self, buf: &mut [u8]) -> io::Result<(usize, SocketAddr)>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::unbound()?;
    let mut buf = vec![0; 10];
    let (size, sender) = sock.recv_from(buf.as_mut_slice())?;
    println!("received {size} bytes from {sender:?}");
    Ok(())
}
```rust

## UnixDatagram::recv

```rust
pub fn recv(&self, buf: &mut [u8]) -> io::Result<usize>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::bind("/path/to/the/socket")?;
    let mut buf = vec![0; 10];
    sock.recv(buf.as_mut_slice()).expect("recv function failed");
    Ok(())
}
```rust

## UnixDatagram::send_to

```rust
pub fn send_to<P: AsRef<Path>>(&self, buf: &[u8], path: P) -> io::Result<usize>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::unbound()?;
    sock.send_to(b"omelette au fromage", "/some/sock").expect("send_to function failed");
    Ok(())
}
```rust

## UnixDatagram::send_to_addr

```rust
pub fn send_to_addr(&self, buf: &[u8], socket_addr: &SocketAddr) -> io::Result<usize>
```

use std::os::unix::net::{UnixDatagram};

fn main() -> std::io::Result<()> {
    let bound = UnixDatagram::bind("/path/to/socket")?;
    let addr = bound.local_addr()?;

    let sock = UnixDatagram::unbound()?;
    sock.send_to_addr(b"bacon egg and cheese", &addr).expect("send_to_addr function failed");
    Ok(())
}
```rust

## UnixDatagram::send

```rust
pub fn send(&self, buf: &[u8]) -> io::Result<usize>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::unbound()?;
    sock.connect("/some/sock").expect("Couldn't connect");
    sock.send(b"omelette au fromage").expect("send_to function failed");
    Ok(())
}
```rust

## UnixDatagram::set_read_timeout

```rust
pub fn set_read_timeout(&self, timeout: Option<Duration>) -> io::Result<()>
```

use std::io;
use std::os::unix::net::UnixDatagram;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UnixDatagram::unbound()?;
    let result = socket.set_read_timeout(Some(Duration::new(0, 0)));
    let err = result.unwrap_err();
    assert_eq!(err.kind(), io::ErrorKind::InvalidInput);
    Ok(())
}
```rust

## UnixDatagram::set_write_timeout

```rust
pub fn set_write_timeout(&self, timeout: Option<Duration>) -> io::Result<()>
```

use std::io;
use std::os::unix::net::UnixDatagram;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UnixDatagram::unbound()?;
    let result = socket.set_write_timeout(Some(Duration::new(0, 0)));
    let err = result.unwrap_err();
    assert_eq!(err.kind(), io::ErrorKind::InvalidInput);
    Ok(())
}
```rust

## UnixDatagram::read_timeout

```rust
pub fn read_timeout(&self) -> io::Result<Option<Duration>>
```

use std::os::unix::net::UnixDatagram;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::unbound()?;
    sock.set_read_timeout(Some(Duration::new(1, 0)))
        .expect("set_read_timeout function failed");
    assert_eq!(sock.read_timeout()?, Some(Duration::new(1, 0)));
    Ok(())
}
```rust

## UnixDatagram::write_timeout

```rust
pub fn write_timeout(&self) -> io::Result<Option<Duration>>
```

use std::os::unix::net::UnixDatagram;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::unbound()?;
    sock.set_write_timeout(Some(Duration::new(1, 0)))
        .expect("set_write_timeout function failed");
    assert_eq!(sock.write_timeout()?, Some(Duration::new(1, 0)));
    Ok(())
}
```rust

## UnixDatagram::set_nonblocking

```rust
pub fn set_nonblocking(&self, nonblocking: bool) -> io::Result<()>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::unbound()?;
    sock.set_nonblocking(true).expect("set_nonblocking function failed");
    Ok(())
}
```rust

## UnixDatagram::take_error

```rust
pub fn take_error(&self) -> io::Result<Option<io::Error>>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::unbound()?;
    if let Ok(Some(err)) = sock.take_error() {
        println!("Got error: {err:?}");
    }
    Ok(())
}
```rust

## UnixDatagram::shutdown

```rust
pub fn shutdown(&self, how: Shutdown) -> io::Result<()>
```

use std::os::unix::net::UnixDatagram;
use std::net::Shutdown;

fn main() -> std::io::Result<()> {
    let sock = UnixDatagram::unbound()?;
    sock.shutdown(Shutdown::Both).expect("shutdown function failed");
    Ok(())
}
```rust
