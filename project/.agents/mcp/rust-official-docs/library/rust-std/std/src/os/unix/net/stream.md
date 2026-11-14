# std::os::unix::net::stream

## struct UnixStream

```rust
pub struct UnixStream(pub(super) Socket)
```

use std::os::unix::net::UnixStream;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let mut stream = UnixStream::connect("/path/to/my/socket")?;
    stream.write_all(b"hello world")?;
    let mut response = String::new();
    stream.read_to_string(&mut response)?;
    println!("{response}");
    Ok(())
}
```

# `SOCK_CLOEXEC`

On platforms that support it, we pass the close-on-exec flag to atomically create the socket and
set it as CLOEXEC. On Linux, this was added in 2.6.27. See [`socket(2)`] for more information.

[`socket(2)`]: https://www.man7.org/linux/man-pages/man2/socket.2.html#:~:text=SOCK_CLOEXEC

# `SIGPIPE`

Writes to the underlying socket in `SOCK_STREAM` mode are made with `MSG_NOSIGNAL` flag.
This suppresses the emission of the  `SIGPIPE` signal when writing to disconnected socket.
In some cases getting a `SIGPIPE` would trigger process termination.

## UnixStream::connect

```rust
pub fn connect<P: AsRef<Path>>(path: P) -> io::Result<UnixStream>
```

use std::os::unix::net::UnixStream;

let socket = match UnixStream::connect("/tmp/sock") {
    Ok(sock) => sock,
    Err(e) => {
        println!("Couldn't connect: {e:?}");
        return
    }
};
```

## UnixStream::connect_addr

```rust
pub fn connect_addr(socket_addr: &SocketAddr) -> io::Result<UnixStream>
```

use std::os::unix::net::{UnixListener, UnixStream};

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

## UnixStream::pair

```rust
pub fn pair() -> io::Result<(UnixStream, UnixStream)>
```

use std::os::unix::net::UnixStream;

let (sock1, sock2) = match UnixStream::pair() {
    Ok((sock1, sock2)) => (sock1, sock2),
    Err(e) => {
        println!("Couldn't create a pair of sockets: {e:?}");
        return
    }
};
```

## UnixStream::try_clone

```rust
pub fn try_clone(&self) -> io::Result<UnixStream>
```

use std::os::unix::net::UnixStream;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    let sock_copy = socket.try_clone().expect("Couldn't clone socket");
    Ok(())
}
```

## UnixStream::local_addr

```rust
pub fn local_addr(&self) -> io::Result<SocketAddr>
```

use std::os::unix::net::UnixStream;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    let addr = socket.local_addr().expect("Couldn't get local address");
    Ok(())
}
```

## UnixStream::peer_addr

```rust
pub fn peer_addr(&self) -> io::Result<SocketAddr>
```

use std::os::unix::net::UnixStream;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    let addr = socket.peer_addr().expect("Couldn't get peer address");
    Ok(())
}
```

## UnixStream::set_read_timeout

```rust
pub fn set_read_timeout(&self, timeout: Option<Duration>) -> io::Result<()>
```

use std::io;
use std::os::unix::net::UnixStream;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    let result = socket.set_read_timeout(Some(Duration::new(0, 0)));
    let err = result.unwrap_err();
    assert_eq!(err.kind(), io::ErrorKind::InvalidInput);
    Ok(())
}
```

## UnixStream::set_write_timeout

```rust
pub fn set_write_timeout(&self, timeout: Option<Duration>) -> io::Result<()>
```

use std::io;
use std::os::unix::net::UnixStream;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    let result = socket.set_write_timeout(Some(Duration::new(0, 0)));
    let err = result.unwrap_err();
    assert_eq!(err.kind(), io::ErrorKind::InvalidInput);
    Ok(())
}
```

## UnixStream::read_timeout

```rust
pub fn read_timeout(&self) -> io::Result<Option<Duration>>
```

use std::os::unix::net::UnixStream;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    socket.set_read_timeout(Some(Duration::new(1, 0))).expect("Couldn't set read timeout");
    assert_eq!(socket.read_timeout()?, Some(Duration::new(1, 0)));
    Ok(())
}
```

## UnixStream::write_timeout

```rust
pub fn write_timeout(&self) -> io::Result<Option<Duration>>
```

use std::os::unix::net::UnixStream;
use std::time::Duration;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    socket.set_write_timeout(Some(Duration::new(1, 0)))
        .expect("Couldn't set write timeout");
    assert_eq!(socket.write_timeout()?, Some(Duration::new(1, 0)));
    Ok(())
}
```

## UnixStream::set_nonblocking

```rust
pub fn set_nonblocking(&self, nonblocking: bool) -> io::Result<()>
```

use std::os::unix::net::UnixStream;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    socket.set_nonblocking(true).expect("Couldn't set nonblocking");
    Ok(())
}
```

## UnixStream::take_error

```rust
pub fn take_error(&self) -> io::Result<Option<io::Error>>
```

use std::os::unix::net::UnixStream;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    if let Ok(Some(err)) = socket.take_error() {
        println!("Got error: {err:?}");
    }
    Ok(())
}
```

# Platform specific
On Redox this always returns `None`.

## UnixStream::shutdown

```rust
pub fn shutdown(&self, how: Shutdown) -> io::Result<()>
```

use std::os::unix::net::UnixStream;
use std::net::Shutdown;

fn main() -> std::io::Result<()> {
    let socket = UnixStream::connect("/tmp/sock")?;
    socket.shutdown(Shutdown::Both).expect("shutdown function failed");
    Ok(())
}
```