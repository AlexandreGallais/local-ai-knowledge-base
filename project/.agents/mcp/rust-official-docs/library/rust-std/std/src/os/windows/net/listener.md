# std::os::windows::net::listener

## struct UnixListener

```rust
pub struct UnixListener(Socket)
```

#![feature(windows_unix_domain_sockets)]
use std::thread;
use std::os::windows::net::{UnixStream, UnixListener};

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
```

## UnixListener::bind

```rust
pub fn bind<P: AsRef<Path>>(path: P) -> io::Result<UnixListener>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixListener;

let listener = match UnixListener::bind("/path/to/the/socket") {
    Ok(sock) => sock,
    Err(e) => {
        println!("Couldn't connect: {e:?}");
        return
    }
};
```

## UnixListener::bind_addr

```rust
pub fn bind_addr(socket_addr: &SocketAddr) -> io::Result<UnixListener>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::{UnixListener};

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
```

## UnixListener::accept

```rust
pub fn accept(&self) -> io::Result<(UnixStream, SocketAddr)>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixListener;

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;

    match listener.accept() {
        Ok((socket, addr)) => println!("Got a client: {addr:?}"),
        Err(e) => println!("accept function failed: {e:?}"),
    }
    Ok(())
}
```

## UnixListener::local_addr

```rust
pub fn local_addr(&self) -> io::Result<SocketAddr>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixListener;

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;
    let addr = listener.local_addr().expect("Couldn't get local address");
    Ok(())
}
```

## UnixListener::try_clone

```rust
pub fn try_clone(&self) -> io::Result<UnixListener>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixListener;

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;
    let listener_copy = listener.try_clone().expect("try_clone failed");
    Ok(())
}
```

## UnixListener::set_nonblocking

```rust
pub fn set_nonblocking(&self, nonblocking: bool) -> io::Result<()>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixListener;

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/path/to/the/socket")?;
    listener.set_nonblocking(true).expect("Couldn't set non blocking");
    Ok(())
}
```

## UnixListener::take_error

```rust
pub fn take_error(&self) -> io::Result<Option<io::Error>>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixListener;

fn main() -> std::io::Result<()> {
    let listener = UnixListener::bind("/tmp/sock")?;

    if let Ok(Some(err)) = listener.take_error() {
        println!("Got error: {err:?}");
    }
    Ok(())
}
```

## UnixListener::incoming

```rust
pub fn incoming(&self) -> Incoming<'_>
```

#![feature(windows_unix_domain_sockets)]
use std::thread;
use std::os::windows::net::{UnixStream, UnixListener};

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
```

## struct Incoming

```rust
pub struct Incoming<'a>
```

#![feature(windows_unix_domain_sockets)]
use std::thread;
use std::os::windows::net::{UnixStream, UnixListener};

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
```