---
title: "errno --- Standard errno system symbols"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/errno.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `errno` --- Standard errno system symbols

Module `errno`.

This module makes available standard `errno` system symbols. The value of each
symbol is the corresponding integer value. The names and descriptions are
borrowed from `linux/include/errno.h`, which should be
all-inclusive.

### `errorcode`

Dictionary providing a mapping from the errno value to the string name in the
underlying system.  For instance, `errno.errorcode[errno.EPERM]` maps to
`'EPERM'`.

To translate a numeric error code to an error message, use `os.strerror()`.

Of the following list, symbols that are not used on the current platform are not
defined by the module.  The specific list of defined symbols is available as
`errno.errorcode.keys()`.  Symbols available can include:

### `EPERM`

Operation not permitted. This error is mapped to the exception
`PermissionError`.

### `ENOENT`

No such file or directory. This error is mapped to the exception
`FileNotFoundError`.

### `ESRCH`

No such process. This error is mapped to the exception
`ProcessLookupError`.

### `EINTR`

Interrupted system call. This error is mapped to the exception
`InterruptedError`.

### `EIO`

I/O error

### `ENXIO`

No such device or address

### `E2BIG`

Arg list too long

### `ENOEXEC`

Exec format error

### `EBADF`

Bad file number

### `ECHILD`

No child processes. This error is mapped to the exception
`ChildProcessError`.

### `EAGAIN`

Try again. This error is mapped to the exception `BlockingIOError`.

### `ENOMEM`

Out of memory

### `EACCES`

Permission denied.  This error is mapped to the exception
`PermissionError`.

### `EFAULT`

Bad address

### `ENOTBLK`

Block device required

### `EBUSY`

Device or resource busy

### `EEXIST`

File exists. This error is mapped to the exception
`FileExistsError`.

### `EXDEV`

Cross-device link

### `ENODEV`

No such device

### `ENOTDIR`

Not a directory. This error is mapped to the exception
`NotADirectoryError`.

### `EISDIR`

Is a directory. This error is mapped to the exception
`IsADirectoryError`.

### `EINVAL`

Invalid argument

### `ENFILE`

File table overflow

### `EMFILE`

Too many open files

### `ENOTTY`

Not a typewriter

### `ETXTBSY`

Text file busy

### `EFBIG`

File too large

### `ENOSPC`

No space left on device

### `ESPIPE`

Illegal seek

### `EROFS`

Read-only file system

### `EMLINK`

Too many links

### `EPIPE`

Broken pipe. This error is mapped to the exception
`BrokenPipeError`.

### `EDOM`

Math argument out of domain of func

### `ERANGE`

Math result not representable

### `EDEADLK`

Resource deadlock would occur

### `ENAMETOOLONG`

File name too long

### `ENOLCK`

No record locks available

### `ENOSYS`

Function not implemented

### `ENOTEMPTY`

Directory not empty

### `ELOOP`

Too many symbolic links encountered

### `EWOULDBLOCK`

Operation would block. This error is mapped to the exception
`BlockingIOError`.

### `ENOMSG`

No message of desired type

### `EIDRM`

Identifier removed

### `ECHRNG`

Channel number out of range

### `EL2NSYNC`

Level 2 not synchronized

### `EL3HLT`

Level 3 halted

### `EL3RST`

Level 3 reset

### `ELNRNG`

Link number out of range

### `EUNATCH`

Protocol driver not attached

### `ENOCSI`

No CSI structure available

### `EL2HLT`

Level 2 halted

### `EBADE`

Invalid exchange

### `EBADR`

Invalid request descriptor

### `EXFULL`

Exchange full

### `ENOANO`

No anode

### `EBADRQC`

Invalid request code

### `EBADSLT`

Invalid slot

### `EDEADLOCK`

File locking deadlock error

### `EBFONT`

Bad font file format

### `ENOSTR`

Device not a stream

### `ENODATA`

No data available

### `ETIME`

Timer expired

### `ENOSR`

Out of streams resources

### `ENONET`

Machine is not on the network

### `ENOPKG`

Package not installed

### `EREMOTE`

Object is remote

### `ENOLINK`

Link has been severed

### `EADV`

Advertise error

### `ESRMNT`

Srmount error

### `ECOMM`

Communication error on send

### `EPROTO`

Protocol error

### `EMULTIHOP`

Multihop attempted

### `EDOTDOT`

RFS specific error

### `EBADMSG`

Not a data message

### `EOVERFLOW`

Value too large for defined data type

### `ENOTUNIQ`

Name not unique on network

### `EBADFD`

File descriptor in bad state

### `EREMCHG`

Remote address changed

### `ELIBACC`

Can not access a needed shared library

### `ELIBBAD`

Accessing a corrupted shared library

### `ELIBSCN`

.lib section in a.out corrupted

### `ELIBMAX`

Attempting to link in too many shared libraries

### `ELIBEXEC`

Cannot exec a shared library directly

### `EILSEQ`

Illegal byte sequence

### `ERESTART`

Interrupted system call should be restarted

### `ESTRPIPE`

Streams pipe error

### `EUSERS`

Too many users

### `ENOTSOCK`

Socket operation on non-socket

### `EDESTADDRREQ`

Destination address required

### `EMSGSIZE`

Message too long

### `EPROTOTYPE`

Protocol wrong type for socket

### `ENOPROTOOPT`

Protocol not available

### `EPROTONOSUPPORT`

Protocol not supported

### `ESOCKTNOSUPPORT`

Socket type not supported

### `EOPNOTSUPP`

Operation not supported on transport endpoint

### `ENOTSUP`

Operation not supported

> *Added in version 3.2.*

### `EPFNOSUPPORT`

Protocol family not supported

### `EAFNOSUPPORT`

Address family not supported by protocol

### `EADDRINUSE`

Address already in use

### `EADDRNOTAVAIL`

Cannot assign requested address

### `ENETDOWN`

Network is down

### `ENETUNREACH`

Network is unreachable

### `ENETRESET`

Network dropped connection because of reset

### `ECONNABORTED`

Software caused connection abort. This error is mapped to the
exception `ConnectionAbortedError`.

### `ECONNRESET`

Connection reset by peer. This error is mapped to the exception
`ConnectionResetError`.

### `ENOBUFS`

No buffer space available

### `EISCONN`

Transport endpoint is already connected

### `ENOTCONN`

Transport endpoint is not connected

### `ESHUTDOWN`

Cannot send after transport endpoint shutdown. This error is mapped
to the exception `BrokenPipeError`.

### `ETOOMANYREFS`

Too many references: cannot splice

### `ETIMEDOUT`

Connection timed out. This error is mapped to the exception
`TimeoutError`.

### `ECONNREFUSED`

Connection refused. This error is mapped to the exception
`ConnectionRefusedError`.

### `EHOSTDOWN`

Host is down

### `EHOSTUNREACH`

No route to host

### `EHWPOISON`

Memory page has hardware error.

> *Added in version 3.14.*

### `EALREADY`

Operation already in progress. This error is mapped to the
exception `BlockingIOError`.

### `EINPROGRESS`

Operation now in progress. This error is mapped to the exception
`BlockingIOError`.

### `ESTALE`

Stale NFS file handle

### `EUCLEAN`

Structure needs cleaning

### `ENOTNAM`

Not a XENIX named type file

### `ENAVAIL`

No XENIX semaphores available

### `EISNAM`

Is a named type file

### `EREMOTEIO`

Remote I/O error

### `EDQUOT`

Quota exceeded

### `EQFULL`

Interface output queue is full

> *Added in version 3.11.*

### `ENOMEDIUM`

No medium found

### `EMEDIUMTYPE`

Wrong medium type

### `ENOKEY`

Required key not available

### `EKEYEXPIRED`

Key has expired

### `EKEYREVOKED`

Key has been revoked

### `EKEYREJECTED`

Key was rejected by service

### `ERFKILL`

Operation not possible due to RF-kill

### `ELOCKUNMAPPED`

Locked lock was unmapped

### `ENOTACTIVE`

Facility is not active

### `EAUTH`

Authentication error

> *Added in version 3.2.*

### `EBADARCH`

Bad CPU type in executable

> *Added in version 3.2.*

### `EBADEXEC`

Bad executable (or shared library)

> *Added in version 3.2.*

### `EBADMACHO`

Malformed Mach-o file

> *Added in version 3.2.*

### `EDEVERR`

Device error

> *Added in version 3.2.*

### `EFTYPE`

Inappropriate file type or format

> *Added in version 3.2.*

### `ENEEDAUTH`

Need authenticator

> *Added in version 3.2.*

### `ENOATTR`

Attribute not found

> *Added in version 3.2.*

### `ENOPOLICY`

Policy not found

> *Added in version 3.2.*

### `EPROCLIM`

Too many processes

> *Added in version 3.2.*

### `EPROCUNAVAIL`

Bad procedure for program

> *Added in version 3.2.*

### `EPROGMISMATCH`

Program version wrong

> *Added in version 3.2.*

### `EPROGUNAVAIL`

RPC prog. not avail

> *Added in version 3.2.*

### `EPWROFF`

Device power is off

> *Added in version 3.2.*

### `EBADRPC`

RPC struct is bad

> *Added in version 3.2.*

### `ERPCMISMATCH`

RPC version wrong

> *Added in version 3.2.*

### `ESHLIBVERS`

Shared library version mismatch

> *Added in version 3.2.*

### `ENOTCAPABLE`

Capabilities insufficient. This error is mapped to the exception
`PermissionError`.

> **Availability:** WASI, FreeBSD

> *Added in version 3.11.1.*

### `ECANCELED`

Operation canceled

> *Added in version 3.2.*

### `EOWNERDEAD`

Owner died

> *Added in version 3.2.*

### `ENOTRECOVERABLE`

State not recoverable

> *Added in version 3.2.*
