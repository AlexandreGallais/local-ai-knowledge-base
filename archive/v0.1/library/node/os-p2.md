---
title: "OS (part 2 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/os.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# OS (part 2 of 3)

## OS constants

The following constants are exported by `os.constants`.

Not all constants will be available on every operating system.

### Signal constants

The following signal constants are exported by `os.constants.signals`.

     | Constant
     | Description

     | `SIGHUP`
     | Sent to indicate when a controlling terminal is closed or a parent
    process exits.

     | `SIGINT`
     | Sent to indicate when a user wishes to interrupt a process
    (`Ctrl`+`C`).

     | `SIGQUIT`
     | Sent to indicate when a user wishes to terminate a process and perform a
    core dump.

     | `SIGILL`
     | Sent to a process to notify that it has attempted to perform an illegal,
    malformed, unknown, or privileged instruction.

     | `SIGTRAP`
     | Sent to a process when an exception has occurred.

     | `SIGABRT`
     | Sent to a process to request that it abort.

     | `SIGIOT`
     | Synonym for `SIGABRT`

     | `SIGBUS`
     | Sent to a process to notify that it has caused a bus error.

     | `SIGFPE`
     | Sent to a process to notify that it has performed an illegal arithmetic
    operation.

     | `SIGKILL`
     | Sent to a process to terminate it immediately.

     | `SIGUSR1` `SIGUSR2`
     | Sent to a process to identify user-defined conditions.

     | `SIGSEGV`
     | Sent to a process to notify of a segmentation fault.

     | `SIGPIPE`
     | Sent to a process when it has attempted to write to a disconnected
    pipe.

     | `SIGALRM`
     | Sent to a process when a system timer elapses.

     | `SIGTERM`
     | Sent to a process to request termination.

     | `SIGCHLD`
     | Sent to a process when a child process terminates.

     | `SIGSTKFLT`
     | Sent to a process to indicate a stack fault on a coprocessor.

     | `SIGCONT`
     | Sent to instruct the operating system to continue a paused process.

     | `SIGSTOP`
     | Sent to instruct the operating system to halt a process.

     | `SIGTSTP`
     | Sent to a process to request it to stop.

     | `SIGBREAK`
     | Sent to indicate when a user wishes to interrupt a process.

     | `SIGTTIN`
     | Sent to a process when it reads from the TTY while in the
    background.

     | `SIGTTOU`
     | Sent to a process when it writes to the TTY while in the
    background.

     | `SIGURG`
     | Sent to a process when a socket has urgent data to read.

     | `SIGXCPU`
     | Sent to a process when it has exceeded its limit on CPU usage.

     | `SIGXFSZ`
     | Sent to a process when it grows a file larger than the maximum
    allowed.

     | `SIGVTALRM`
     | Sent to a process when a virtual timer has elapsed.

     | `SIGPROF`
     | Sent to a process when a system timer has elapsed.

     | `SIGWINCH`
     | Sent to a process when the controlling terminal has changed its
    size.

     | `SIGIO`
     | Sent to a process when I/O is available.

     | `SIGPOLL`
     | Synonym for `SIGIO`

     | `SIGLOST`
     | Sent to a process when a file lock has been lost.

     | `SIGPWR`
     | Sent to a process to notify of a power failure.

     | `SIGINFO`
     | Synonym for `SIGPWR`

     | `SIGSYS`
     | Sent to a process to notify of a bad argument.

     | `SIGUNUSED`
     | Synonym for `SIGSYS`

### Error constants

The following error constants are exported by `os.constants.errno`.

#### POSIX error constants

     | Constant
     | Description

     | `E2BIG`
     | Indicates that the list of arguments is longer than expected.

     | `EACCES`
     | Indicates that the operation did not have sufficient permissions.

     | `EADDRINUSE`
     | Indicates that the network address is already in use.

     | `EADDRNOTAVAIL`
     | Indicates that the network address is currently unavailable for
    use.

     | `EAFNOSUPPORT`
     | Indicates that the network address family is not supported.

     | `EAGAIN`
     | Indicates that there is no data available and to try the
    operation again later.

     | `EALREADY`
     | Indicates that the socket already has a pending connection in
    progress.

     | `EBADF`
     | Indicates that a file descriptor is not valid.

     | `EBADMSG`
     | Indicates an invalid data message.

     | `EBUSY`
     | Indicates that a device or resource is busy.

     | `ECANCELED`
     | Indicates that an operation was canceled.

     | `ECHILD`
     | Indicates that there are no child processes.

     | `ECONNABORTED`
     | Indicates that the network connection has been aborted.

     | `ECONNREFUSED`
     | Indicates that the network connection has been refused.

     | `ECONNRESET`
     | Indicates that the network connection has been reset.

     | `EDEADLK`
     | Indicates that a resource deadlock has been avoided.

     | `EDESTADDRREQ`
     | Indicates that a destination address is required.

     | `EDOM`
     | Indicates that an argument is out of the domain of the function.

     | `EDQUOT`
     | Indicates that the disk quota has been exceeded.

     | `EEXIST`
     | Indicates that the file already exists.

     | `EFAULT`
     | Indicates an invalid pointer address.

     | `EFBIG`
     | Indicates that the file is too large.

     | `EHOSTUNREACH`
     | Indicates that the host is unreachable.

     | `EIDRM`
     | Indicates that the identifier has been removed.

     | `EILSEQ`
     | Indicates an illegal byte sequence.

     | `EINPROGRESS`
     | Indicates that an operation is already in progress.

     | `EINTR`
     | Indicates that a function call was interrupted.

     | `EINVAL`
     | Indicates that an invalid argument was provided.

     | `EIO`
     | Indicates an otherwise unspecified I/O error.

     | `EISCONN`
     | Indicates that the socket is connected.

     | `EISDIR`
     | Indicates that the path is a directory.

     | `ELOOP`
     | Indicates too many levels of symbolic links in a path.

     | `EMFILE`
     | Indicates that there are too many open files.

     | `EMLINK`
     | Indicates that there are too many hard links to a file.

     | `EMSGSIZE`
     | Indicates that the provided message is too long.

     | `EMULTIHOP`
     | Indicates that a multihop was attempted.

     | `ENAMETOOLONG`
     | Indicates that the filename is too long.

     | `ENETDOWN`
     | Indicates that the network is down.

     | `ENETRESET`
     | Indicates that the connection has been aborted by the network.

     | `ENETUNREACH`
     | Indicates that the network is unreachable.

     | `ENFILE`
     | Indicates too many open files in the system.

     | `ENOBUFS`
     | Indicates that no buffer space is available.

     | `ENODATA`
     | Indicates that no message is available on the stream head read
    queue.

     | `ENODEV`
     | Indicates that there is no such device.

     | `ENOENT`
     | Indicates that there is no such file or directory.

     | `ENOEXEC`
     | Indicates an exec format error.

     | `ENOLCK`
     | Indicates that there are no locks available.

     | `ENOLINK`
     | Indications that a link has been severed.

     | `ENOMEM`
     | Indicates that there is not enough space.

     | `ENOMSG`
     | Indicates that there is no message of the desired type.

     | `ENOPROTOOPT`
     | Indicates that a given protocol is not available.

     | `ENOSPC`
     | Indicates that there is no space available on the device.

     | `ENOSR`
     | Indicates that there are no stream resources available.

     | `ENOSTR`
     | Indicates that a given resource is not a stream.

     | `ENOSYS`
     | Indicates that a function has not been implemented.

     | `ENOTCONN`
     | Indicates that the socket is not connected.

     | `ENOTDIR`
     | Indicates that the path is not a directory.

     | `ENOTEMPTY`
     | Indicates that the directory is not empty.

     | `ENOTSOCK`
     | Indicates that the given item is not a socket.

     | `ENOTSUP`
     | Indicates that a given operation is not supported.

     | `ENOTTY`
     | Indicates an inappropriate I/O control operation.

     | `ENXIO`
     | Indicates no such device or address.

     | `EOPNOTSUPP`
     | Indicates that an operation is not supported on the socket. Although
    `ENOTSUP` and `EOPNOTSUPP` have the same value
    on Linux, according to POSIX.1 these error values should be distinct.)

     | `EOVERFLOW`
     | Indicates that a value is too large to be stored in a given data
    type.

     | `EPERM`
     | Indicates that the operation is not permitted.

     | `EPIPE`
     | Indicates a broken pipe.

     | `EPROTO`
     | Indicates a protocol error.

     | `EPROTONOSUPPORT`
     | Indicates that a protocol is not supported.

     | `EPROTOTYPE`
     | Indicates the wrong type of protocol for a socket.

     | `ERANGE`
     | Indicates that the results are too large.

     | `EROFS`
     | Indicates that the file system is read only.

     | `ESPIPE`
     | Indicates an invalid seek operation.

     | `ESRCH`
     | Indicates that there is no such process.

     | `ESTALE`
     | Indicates that the file handle is stale.

     | `ETIME`
     | Indicates an expired timer.

     | `ETIMEDOUT`
     | Indicates that the connection timed out.

     | `ETXTBSY`
     | Indicates that a text file is busy.

     | `EWOULDBLOCK`
     | Indicates that the operation would block.

     | `EXDEV`
     | Indicates an improper link.

#### Windows-specific error constants

The following error codes are specific to the Windows operating system.

     | Constant
     | Description

     | `WSAEINTR`
     | Indicates an interrupted function call.

     | `WSAEBADF`
     | Indicates an invalid file handle.

     | `WSAEACCES`
     | Indicates insufficient permissions to complete the operation.

     | `WSAEFAULT`
     | Indicates an invalid pointer address.

     | `WSAEINVAL`
     | Indicates that an invalid argument was passed.

     | `WSAEMFILE`
     | Indicates that there are too many open files.

     | `WSAEWOULDBLOCK`
     | Indicates that a resource is temporarily unavailable.

     | `WSAEINPROGRESS`
     | Indicates that an operation is currently in progress.

     | `WSAEALREADY`
     | Indicates that an operation is already in progress.

     | `WSAENOTSOCK`
     | Indicates that the resource is not a socket.

     | `WSAEDESTADDRREQ`
     | Indicates that a destination address is required.

     | `WSAEMSGSIZE`
     | Indicates that the message size is too long.

     | `WSAEPROTOTYPE`
     | Indicates the wrong protocol type for the socket.

     | `WSAENOPROTOOPT`
     | Indicates a bad protocol option.

     | `WSAEPROTONOSUPPORT`
     | Indicates that the protocol is not supported.

     | `WSAESOCKTNOSUPPORT`
     | Indicates that the socket type is not supported.

     | `WSAEOPNOTSUPP`
     | Indicates that the operation is not supported.

     | `WSAEPFNOSUPPORT`
     | Indicates that the protocol family is not supported.

     | `WSAEAFNOSUPPORT`
     | Indicates that the address family is not supported.

     | `WSAEADDRINUSE`
     | Indicates that the network address is already in use.

     | `WSAEADDRNOTAVAIL`
     | Indicates that the network address is not available.

     | `WSAENETDOWN`
     | Indicates that the network is down.

     | `WSAENETUNREACH`
     | Indicates that the network is unreachable.

     | `WSAENETRESET`
     | Indicates that the network connection has been reset.

     | `WSAECONNABORTED`
     | Indicates that the connection has been aborted.

     | `WSAECONNRESET`
     | Indicates that the connection has been reset by the peer.

     | `WSAENOBUFS`
     | Indicates that there is no buffer space available.

     | `WSAEISCONN`
     | Indicates that the socket is already connected.

     | `WSAENOTCONN`
     | Indicates that the socket is not connected.

     | `WSAESHUTDOWN`
     | Indicates that data cannot be sent after the socket has been
    shutdown.

     | `WSAETOOMANYREFS`
     | Indicates that there are too many references.

     | `WSAETIMEDOUT`
     | Indicates that the connection has timed out.

     | `WSAECONNREFUSED`
     | Indicates that the connection has been refused.

     | `WSAELOOP`
     | Indicates that a name cannot be translated.

     | `WSAENAMETOOLONG`
     | Indicates that a name was too long.

     | `WSAEHOSTDOWN`
     | Indicates that a network host is down.

     | `WSAEHOSTUNREACH`
     | Indicates that there is no route to a network host.

     | `WSAENOTEMPTY`
     | Indicates that the directory is not empty.

     | `WSAEPROCLIM`
     | Indicates that there are too many processes.

     | `WSAEUSERS`
     | Indicates that the user quota has been exceeded.

     | `WSAEDQUOT`
     | Indicates that the disk quota has been exceeded.

     | `WSAESTALE`
     | Indicates a stale file handle reference.

     | `WSAEREMOTE`
     | Indicates that the item is remote.

     | `WSASYSNOTREADY`
     | Indicates that the network subsystem is not ready.

     | `WSAVERNOTSUPPORTED`
     | Indicates that the `winsock.dll` version is out of
    range.

     | `WSANOTINITIALISED`
     | Indicates that successful WSAStartup has not yet been performed.

     | `WSAEDISCON`
     | Indicates that a graceful shutdown is in progress.

     | `WSAENOMORE`
     | Indicates that there are no more results.

     | `WSAECANCELLED`
     | Indicates that an operation has been canceled.

     | `WSAEINVALIDPROCTABLE`
     | Indicates that the procedure call table is invalid.

     | `WSAEINVALIDPROVIDER`
     | Indicates an invalid service provider.

     | `WSAEPROVIDERFAILEDINIT`
     | Indicates that the service provider failed to initialized.

     | `WSASYSCALLFAILURE`
     | Indicates a system call failure.

     | `WSASERVICE_NOT_FOUND`
     | Indicates that a service was not found.

     | `WSATYPE_NOT_FOUND`
     | Indicates that a class type was not found.

     | `WSA_E_NO_MORE`
     | Indicates that there are no more results.

     | `WSA_E_CANCELLED`
     | Indicates that the call was canceled.

     | `WSAEREFUSED`
     | Indicates that a database query was refused.

### dlopen constants

If available on the operating system, the following constants
are exported in `os.constants.dlopen`. See dlopen(3) for detailed
information.

     | Constant
     | Description

     | `RTLD_LAZY`
     | Perform lazy binding. Node.js sets this flag by default.

     | `RTLD_NOW`
     | Resolve all undefined symbols in the library before dlopen(3)
    returns.

     | `RTLD_GLOBAL`
     | Symbols defined by the library will be made available for symbol
    resolution of subsequently loaded libraries.

     | `RTLD_LOCAL`
     | The converse of `RTLD_GLOBAL`. This is the default behavior
    if neither flag is specified.

     | `RTLD_DEEPBIND`
     | Make a self-contained library use its own symbols in preference to
    symbols from previously loaded libraries.
