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
```

## SocketAddr::from_pathname

```rust
pub fn from_pathname<P>(path: P) -> io::Result<SocketAddr> where P: AsRef<Path>,
```

use std::os::unix::net::SocketAddr;

assert!(SocketAddr::from_pathname("/path/with/\0/bytes").is_err());
```

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
```

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
```