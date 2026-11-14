---
title: "std::os::unix::net::addr"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/unix/net/addr.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::unix::net::addr

## struct SocketAddr

```rust
pub struct SocketAddr
```

use std::os::unix::net::UnixListener;

let socket = match UnixListener::bind("/tmp/sock") {
    Ok(sock) => sock,
    Err(e) => {
        println!("Couldn't bind: {e:?}");
        return
    }
};
let addr = socket.local_addr().expect("Couldn't get local address");
```rust

## SocketAddr::from_pathname

```rust
pub fn from_pathname<P>(path: P) -> io::Result<SocketAddr> where P: AsRef<Path>,
```

use std::os::unix::net::SocketAddr;

assert!(SocketAddr::from_pathname("/path/with/\0/bytes").is_err());
```rust

## SocketAddr::is_unnamed

```rust
pub fn is_unnamed(&self) -> bool
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let socket = UnixDatagram::unbound()?;
    let addr = socket.local_addr().expect("Couldn't get local address");
    assert_eq!(addr.is_unnamed(), true);
    Ok(())
}
```rust

## SocketAddr::as_pathname

```rust
pub fn as_pathname(&self) -> Option<&Path>
```

use std::os::unix::net::UnixDatagram;

fn main() -> std::io::Result<()> {
    let socket = UnixDatagram::unbound()?;
    let addr = socket.local_addr().expect("Couldn't get local address");
    assert_eq!(addr.as_pathname(), None);
    Ok(())
}
```rust
