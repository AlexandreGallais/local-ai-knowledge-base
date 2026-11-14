---
title: "std::os::unix::net::listener"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/unix/net/listener.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::unix::net::listener

## struct UnixListener

```rust
pub struct UnixListener(Socket)
```

use std::thread;
use std::os::unix::net::{UnixStream, UnixListener};

fn handle_client(stream: UnixStream) {
    // ...
}

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;

    // accept connections and process them, spawning a new thread for each one
    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                /* connection succeeded */
                thread::spawn(|| handle_client(stream));
            }
            Err(err) => {
                /* connection failed */
                break;
            }
        }
    }
    Ok(())
}
```rust

## UnixListener::bind

```rust
pub fn bind<P: AsRef<Path>>(path: P) -> io::Result<UnixListener>
```

use std::os::unix::net::UnixListener;

let listener = match UnixListener::bind("/path/to/the/socket") {
    Ok(sock) => sock,
    Err(e) => {
        println!("Couldn't connect: {e:?}");
        return
    }
};
```rust

## UnixListener::bind_addr

```rust
pub fn bind_addr(socket_addr: &SocketAddr) -> io::Result<UnixListener>
```

use std::os::unix::net::{UnixListener};

fn main() -> std::io::Result<()> {
    let listener1 = UnixListener::bind("path/to/socket")?;
    let addr = listener1.local_addr()?;

    let listener2 = match UnixListener::bind_addr(&addr) {
        Ok(sock) => sock,
        Err(err) => {
            println!("Couldn't bind: {err:?}");
            return Err(err);
        }
    };
    Ok(())
}
```rust

## UnixListener::accept

```rust
pub fn accept(&self) -> io::Result<(UnixStream, SocketAddr)>
```

use std::os::unix::net::UnixListener;

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;

    match listener.accept() {
        Ok((socket, addr)) => println!("Got a client: {addr:?}"),
        Err(e) => println!("accept function failed: {e:?}"),
    }
    Ok(())
}
```rust

## UnixListener::try_clone

```rust
pub fn try_clone(&self) -> io::Result<UnixListener>
```

use std::os::unix::net::UnixListener;

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;
    let listener_copy = listener.try_clone().expect("try_clone failed");
    Ok(())
}
```rust

## UnixListener::local_addr

```rust
pub fn local_addr(&self) -> io::Result<SocketAddr>
```

use std::os::unix::net::UnixListener;

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;
    let addr = listener.local_addr().expect("Couldn't get local address");
    Ok(())
}
```rust

## UnixListener::set_nonblocking

```rust
pub fn set_nonblocking(&self, nonblocking: bool) -> io::Result<()>
```

use std::os::unix::net::UnixListener;

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;
    listener.set_nonblocking(true).expect("Couldn't set non blocking");
    Ok(())
}
```rust

## UnixListener::take_error

```rust
pub fn take_error(&self) -> io::Result<Option<io::Error>>
```

use std::os::unix::net::UnixListener;

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/tmp/sock")?;

    if let Ok(Some(err)) = listener.take_error() {
        println!("Got error: {err:?}");
    }
    Ok(())
}
```rust

On Redox this always returns `None`.

## UnixListener::incoming

```rust
pub fn incoming(&self) -> Incoming<'_>
```

use std::thread;
use std::os::unix::net::{UnixStream, UnixListener};

fn handle_client(stream: UnixStream) {
    // ...
}

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                thread::spawn(|| handle_client(stream));
            }
            Err(err) => {
                break;
            }
        }
    }
    Ok(())
}
```rust

## struct Incoming

```rust
pub struct Incoming<'a>
```

use std::thread;
use std::os::unix::net::{UnixStream, UnixListener};

fn handle_client(stream: UnixStream) {
    // ...
}

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                thread::spawn(|| handle_client(stream));
            }
            Err(err) => {
                break;
            }
        }
    }
    Ok(())
}
```rust
