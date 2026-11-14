# std::os::xous::services

## fn connect

```rust
pub fn connect(name: &str) -> Option<Connection>
```

Attempts to connect to a server by name. If the server does not exist, this will
block until the server is created.

Note that this is different from connecting to a server by address. Server
addresses are always 16 bytes long, whereas server names are arbitrary-length
strings up to 64 bytes in length.

## fn try_connect

```rust
pub fn try_connect(name: &str) -> Option<Connection>
```

Attempts to connect to a server by name. If the server does not exist, this will
immediately return `None`.

Note that this is different from connecting to a server by address. Server
addresses are always 16 bytes long, whereas server names are arbitrary-length
strings.