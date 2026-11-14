---
title: "std::os::xous::services"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/xous/services.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

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
