# std::os::cygwin::net

Cygwin-specific networking functionality.

There are some limitations of Unix domain sockets on Cygwin:
* The syscalls `accept` and `connect` need
[handshake](https://inbox.sourceware.org/cygwin/Z_UERXFI1g-1v3p2@calimero.vinschen.de/T/#t).
* Cannot bind to abstract addr.
* Unbounded unix socket has an abstract local addr.
* Doesn't support recvmsg with control data.