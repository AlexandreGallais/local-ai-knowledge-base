# std::os::windows::net::addr

## SocketAddr::as_pathname

```rust
pub fn as_pathname(&self) -> Option<&Path>
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixListener;
use std::path::Path;

fn main() -> std::io::Result<()> {
    let socket = UnixListener::bind("/tmp/sock")?;
    let addr = socket.local_addr().expect("Couldn't get local address");
    assert_eq!(addr.as_pathname(), Some(Path::new("/tmp/sock")));
    Ok(())
}
```

## SocketAddr::from_pathname

```rust
pub fn from_pathname<P>(path: P) -> io::Result<SocketAddr> where P: AsRef<Path>,
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::SocketAddr;

assert!(SocketAddr::from_pathname("/path/with/\0/bytes").is_err());
```

## SocketAddr::is_unnamed

```rust
pub fn is_unnamed(&self) -> bool
```

#![feature(windows_unix_domain_sockets)]
use std::os::windows::net::UnixListener;

fn main() -> std::io::Result<()> {
    let socket = UnixListener::bind("/tmp/sock")?;
    let addr = socket.local_addr().expect("Couldn't get local address");
    assert_eq!(addr.is_unnamed(), false);
    Ok(())
}
```