---
title: "std::os::cygwin::net"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/cygwin/net.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::cygwin::net

Cygwin-specific networking functionality.

There are some limitations of Unix domain sockets on Cygwin:
* The syscalls `accept` and `connect` need
handshake.
* Cannot bind to abstract addr.
* Unbounded unix socket has an abstract local addr.
* Doesn't support recvmsg with control data.
