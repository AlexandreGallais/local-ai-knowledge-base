---
title: "std::os::windows::net::stream"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/windows/net/stream.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::windows::net::stream

## struct UnixStream

```rust
pub struct UnixStream(pub(super) Socket)
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixStream;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let mut stream = UnixStream::connect("/path/to/my/socket")?;
    stream.write_all(b"hello world")?;
    let mut response = String::new();
    stream.read_to_string(&mut response)?;
    println!("{response}");
    Ok(())
}
```rust

## UnixStream::connect

```rust
pub fn connect<P: AsRef<Path>>(path: P) -> io::Result<UnixStream>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixStream;

let socket = match UnixStream::connect("/tmp/sock") {
    Ok(sock) => sock,
    Err(e) => {
        println!("Couldn't connect: {e:?}");
        return
    }
};
```rust

## UnixStream::connect_addr

```rust
pub fn connect_addr(socket_addr: &SocketAddr) -> io::Result<UnixStream>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::{UnixListener, UnixStream};

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;
    let addr = listener.local_addr()?;

    let sock = match UnixStream::connect_addr(&addr) {
        Ok(sock) => sock,
        Err(e) => {
            println!("Couldn't connect: {e:?}");
            return Err(e)
        }
    };
    Ok(())
}
```

## UnixStream::local_addr

```rust
pub fn local_addr(&self) -> io::Result<SocketAddr>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixStream;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    let addr = socket.local_addr().expect("Couldn't get local address");
    Ok(())
}
```rust

## UnixStream::peer_addr

```rust
pub fn peer_addr(&self) -> io::Result<SocketAddr>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixStream;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    let addr = socket.peer_addr().expect("Couldn't get peer address");
    Ok(())
}
```rust

## UnixStream::read_timeout

```rust
pub fn read_timeout(&self) -> io::Result<Option<Duration>>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixStream;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    socket.set_read_timeout(Some(Duration::new(1, 0))).expect("Couldn't set read timeout");
    assert_eq!(socket.read_timeout()?, Some(Duration::new(1, 0)));
    Ok(())
}
```rust

## UnixStream::set_nonblocking

```rust
pub fn set_nonblocking(&self, nonblocking: bool) -> io::Result<()>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixStream;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    socket.set_nonblocking(true).expect("Couldn't set nonblocking");
    Ok(())
}
```rust

## UnixStream::set_read_timeout

```rust
pub fn set_read_timeout(&self, dur: Option<Duration>) -> io::Result<()>
```

#![feature(windows_unix_domain_sockets)]
use std::io;
use std::os::windows::net::UnixStream;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    let result = socket.set_read_timeout(Some(Duration::new(0, 0)));
    let err = result.unwrap_err();
    assert_eq!(err.kind(), io::ErrorKind::InvalidInput);
    Ok(())
}
```rust

## UnixStream::set_write_timeout

```rust
pub fn set_write_timeout(&self, dur: Option<Duration>) -> io::Result<()>
```

#![feature(windows_unix_domain_sockets)]
use std::io;
use std::os::windows::net::UnixStream;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    let result = socket.set_write_timeout(Some(Duration::new(0, 0)));
    let err = result.unwrap_err();
    assert_eq!(err.kind(), io::ErrorKind::InvalidInput);
    Ok(())
}
```rust

## UnixStream::shutdown

```rust
pub fn shutdown(&self, how: Shutdown) -> io::Result<()>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixStream;
use std::net::Shutdown;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    socket.shutdown(Shutdown::Both).expect("shutdown function failed");
    Ok(())
}
```rust

## UnixStream::take_error

```rust
pub fn take_error(&self) -> io::Result<Option<io::Error>>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixStream;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    if let Ok(Some(err)) = socket.take_error() {
        println!("Got error: {err:?}");
    }
    Ok(())
}
```rust

## UnixStream::try_clone

```rust
pub fn try_clone(&self) -> io::Result<UnixStream>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixStream;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    let sock_copy = socket.try_clone().expect("Couldn't clone socket");
    Ok(())
}
```rust

## UnixStream::write_timeout

```rust
pub fn write_timeout(&self) -> io::Result<Option<Duration>>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixStream;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    socket.set_write_timeout(Some(Duration::new(1, 0)))
        .expect("Couldn't set write timeout");
    assert_eq!(socket.write_timeout()?, Some(Duration::new(1, 0)));
    Ok(())
}
```rust
