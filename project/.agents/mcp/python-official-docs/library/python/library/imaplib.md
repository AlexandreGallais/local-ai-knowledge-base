---
title: "imaplib --- IMAP4 protocol client (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/imaplib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `imaplib` --- IMAP4 protocol client

Module `imaplib`.

**Source code:** Lib/imaplib.py

This module defines three classes, `IMAP4`, `IMAP4_SSL` and
`IMAP4_stream`, which encapsulate a connection to an IMAP4 server and
implement a large subset of the IMAP4rev1 client protocol as defined in
RFC 3501. It is backward compatible with IMAP4 (RFC 1730) servers, but
note that the `STATUS` command is not supported in IMAP4.

Three classes are provided by the `imaplib` module, `IMAP4` is the
base class:

### class `IMAP4(host='', port=IMAP4_PORT, timeout=None)`

This class implements the actual IMAP4 protocol.  The connection is created and
protocol version (IMAP4 or IMAP4rev1) is determined when the instance is
initialized. If *host* is not specified, `''` (the local host) is used. If
*port* is omitted, the standard IMAP4 port (143) is used. The optional *timeout*
parameter specifies a timeout in seconds for the connection attempt.
If timeout is not given or is `None`, the global default socket timeout is used.

The `IMAP4` class supports the `with` statement.  When used
like this, the IMAP4 `LOGOUT` command is issued automatically when the
`with` statement exits.  E.g.:

```
>>> from imaplib import IMAP4
>>> with IMAP4("domain.org") as M:
...     M.noop()
...
('OK', [b'Nothing Accomplished. d25if65hy903weo.87'])
```

> *Changed in version 3.5.*
> Support for the `with` statement was added.

> *Changed in version 3.9.*
> The optional *timeout* parameter was added.

Three exceptions are defined as attributes of the `IMAP4` class:

### exception `IMAP4.error`

Exception raised on any errors.  The reason for the exception is passed to the
constructor as a string.

### exception `IMAP4.abort`

IMAP4 server errors cause this exception to be raised.  This is a sub-class of
`IMAP4.error`.  Note that closing the instance and instantiating a new one
will usually allow recovery from this exception.

### exception `IMAP4.readonly`

This exception is raised when a writable mailbox has its status changed by the
server.  This is a sub-class of `IMAP4.error`.  Some other client now has
write permission, and the mailbox will need to be re-opened to re-obtain write
permission.

There's also a subclass for secure connections:

### class `IMAP4_SSL(host='', port=IMAP4_SSL_PORT, *, ssl_context=None, \`

```python
timeout=None)
```

This is a subclass derived from `IMAP4` that connects over an SSL
encrypted socket (to use this class you need a socket module that was compiled
with SSL support).  If *host* is not specified, `''` (the local host) is used.
If *port* is omitted, the standard IMAP4-over-SSL port (993) is used.
*ssl_context* is a `ssl.SSLContext` object which allows bundling
SSL configuration options, certificates and private keys into a single
(potentially long-lived) structure.  Please read ssl-security for
best practices.

> **Note:** With the default *ssl_context*, the connection is encrypted but the
> server certificate and hostname are not verified.
> To verify them, pass a context created by
> `ssl.create_default_context()`.

The optional *timeout* parameter specifies a timeout in seconds for the
connection attempt. If timeout is not given or is `None`, the global default
socket timeout is used.

> *Changed in version 3.3.*
> *ssl_context* parameter was added.

> *Changed in version 3.4.*
> The class now supports hostname check with
> `ssl.SSLContext.check_hostname` and *Server Name Indication* (see
> `ssl.HAS_SNI`).

> *Changed in version 3.9.*
> The optional *timeout* parameter was added.

> *Changed in version 3.12.*
> The deprecated *keyfile* and *certfile* parameters have been removed.

The second subclass allows for connections created by a child process:

### class `IMAP4_stream(command)`

This is a subclass derived from `IMAP4` that connects to the
`stdin/stdout` file descriptors created by passing *command* to
`subprocess.Popen()`.

The following utility functions are defined:

### `Internaldate2tuple(resp)`

Parse a bytes-like object containing an IMAP4 `INTERNALDATE`
response and return the corresponding local time.  The return value is a
`time.struct_time` tuple or `None` if the input has wrong format.

### `Int2AP(num)`

Converts an integer into a bytes representation using characters from the set
[`A` .. `P`].

### `ParseFlags(resp)`

Converts a bytes-like object containing an IMAP4 `FLAGS` response
to a tuple of individual flags as `bytes`.  The return value is an
empty tuple if the input has wrong format.

### `Time2Internaldate(date_time)`

Convert *date_time* to an IMAP4 `INTERNALDATE` representation.
The return value is a string in the form: ``"DD-Mmm-YYYY HH:MM:SS
+HHMM"`` (including double-quotes).  The *date_time* argument can
be a number (int or float) representing seconds since epoch (as
returned by `time.time()`), a 9-tuple representing local time
an instance of `time.struct_time` (as returned by
`time.localtime()`), an aware instance of
`datetime.datetime`, or a double-quoted string.  In the last
case, it is assumed to already be in the correct format.

Note that IMAP4 message numbers change as the mailbox changes; in particular,
after an `EXPUNGE` command performs deletions the remaining messages are
renumbered. So it is highly advisable to use UIDs instead, with the UID command.

At the end of the module, there is a test section that contains a more extensive
example of usage.

> **See also:** Documents describing the protocol, sources for servers
> implementing it, by the University of Washington's IMAP Information Center
> can all be found at (**Source Code**) https://github.com/uw-imap/imap (**Not Maintained**).
