---
title: "smtplib --- SMTP protocol client (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/smtplib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `smtplib` --- SMTP protocol client

Module `smtplib`.

**Source code:** Lib/smtplib.py

The `smtplib` module defines an SMTP client session object that can be used
to send mail to any internet machine with an SMTP or ESMTP listener daemon.  For
details of SMTP and ESMTP operation, consult RFC 821 (Simple Mail Transfer
Protocol) and RFC 1869 (SMTP Service Extensions).

### class `SMTP(host='', port=0, local_hostname=None[, timeout], source_address=None)`

An `SMTP` instance encapsulates an SMTP connection.  It has methods
that support a full repertoire of SMTP and ESMTP operations.

If the host parameter is set to a truthy value, `SMTP.connect()` is called with
host and port automatically when the object is created; otherwise, `connect()` must
be called manually.

If specified, *local_hostname* is used as the FQDN of the local host in the HELO/EHLO
command.  Otherwise, the local hostname is found using
`socket.getfqdn()`.  If the `connect()` call returns anything other
than a success code, an `SMTPConnectError` is raised. The optional
*timeout* parameter specifies a timeout in seconds for blocking operations
like the connection attempt (if not specified, the global default timeout
setting will be used).  If the timeout expires, `TimeoutError` is
raised.  The optional *source_address* parameter allows binding
to some specific source address in a machine with multiple network
interfaces, and/or to some specific source TCP port. It takes a 2-tuple
`(host, port)`, for the socket to bind to as its source address before
connecting. If omitted (or if *host* or *port* are `''` and/or `0`
respectively) the OS default behavior will be used.

For normal use, you should only require the initialization/connect,
`sendmail()`, and `SMTP.quit()` methods.
An example is included below.

The `SMTP` class supports the `with` statement.  When used
like this, the SMTP `QUIT` command is issued automatically when the
`with` statement exits.  E.g.:

```
>>> from smtplib import SMTP
>>> with SMTP("domain.org") as smtp:
...     smtp.noop()
...
(250, b'Ok')
>>>
```

### `SMTP.default_port`

The default port used for SMTP connections (25).

> *Changed in version 3.3.*
> Support for the `with` statement was added.

> *Changed in version 3.3.*
> *source_address* argument was added.

> *Added in version 3.5.*
> The SMTPUTF8 extension (RFC 6531) is now supported.

> *Changed in version 3.9.*
> If the *timeout* parameter is set to be zero, it will raise a
> `ValueError` to prevent the creation of a non-blocking socket.

### class `SMTP_SSL(host='', port=0, local_hostname=None, * [, timeout], \`

```python
context=None, source_address=None)
```

An `SMTP_SSL` instance behaves exactly the same as instances of
`SMTP`. `SMTP_SSL` should be used for situations where SSL is
required from the beginning of the connection and using `SMTP.starttls()` is
not appropriate.

If the host parameter is set to a truthy value, `SMTP.connect()` is called with host
and port automatically when the object is created; otherwise, `SMTP.connect()` must
be called manually.

The optional arguments *local_hostname*, *timeout* and *source_address* have the same
meaning as they do in the `SMTP` class.  *context*, also optional,
can contain a `SSLContext` and allows configuring various
aspects of the secure connection.  Please read ssl-security for
best practices.

### `SMTP_SSL.default_port`

The default port used for SMTP-over-SSL connections (465).

> *Changed in version 3.3.*
> *context* was added.

> *Changed in version 3.3.*
> The *source_address* argument was added.

> *Changed in version 3.4.*
> The class now supports hostname check with
> `ssl.SSLContext.check_hostname` and *Server Name Indication* (see
> `ssl.HAS_SNI`).

> *Changed in version 3.9.*
> If the *timeout* parameter is set to be zero, it will raise a
> `ValueError` to prevent the creation of a non-blocking socket

> *Changed in version 3.12.*
> The deprecated *keyfile* and *certfile* parameters have been removed.

### class `LMTP(host='', port=LMTP_PORT, local_hostname=None, \`

```python
source_address=None[, timeout])
```

The LMTP protocol, which is very similar to ESMTP, is heavily based on the
standard SMTP client. It's common to use Unix sockets for LMTP, so our
`connect()` method must support that as well as a regular host:port
server. The optional arguments *local_hostname* and *source_address* have the
same meaning as they do in the `SMTP` class. To specify a Unix
socket, you must use an absolute path for *host*, starting with a '/'.

Authentication is supported, using the regular SMTP mechanism. When using a
Unix socket, LMTP generally don't support or require any authentication, but
your mileage might vary.

> *Changed in version 3.9.*
> The optional *timeout* parameter was added.

A nice selection of exceptions is defined as well:

### exception `SMTPException`

Subclass of `OSError` that is the base exception class for all
the other exceptions provided by this module.

> *Changed in version 3.4.*
> SMTPException became subclass of `OSError`

### exception `SMTPServerDisconnected`

This exception is raised when the server unexpectedly disconnects, or when an
attempt is made to use the `SMTP` instance before connecting it to a
server.

### exception `SMTPResponseException`

Base class for all exceptions that include an SMTP error code. These exceptions
are generated in some instances when the SMTP server returns an error code.

### `smtp_code`

The error code.

### `smtp_error`

The error message.

### exception `SMTPSenderRefused`

Sender address refused.  In addition to the attributes set by on all
`SMTPResponseException` exceptions, this sets 'sender' to the string that
the SMTP server refused.

### exception `SMTPRecipientsRefused`

All recipient addresses refused.

### `recipients`

A dictionary of exactly the same sort as returned
by `SMTP.sendmail()` containing the errors for
each recipient.

### exception `SMTPDataError`

The SMTP server refused to accept the message data.

### exception `SMTPConnectError`

Error occurred during establishment of a connection  with the server.

### exception `SMTPHeloError`

The server refused our `HELO` message.

### exception `SMTPNotSupportedError`

The command or option attempted is not supported by the server.

> *Added in version 3.5.*

### exception `SMTPAuthenticationError`

SMTP authentication went wrong.  Most probably the server didn't accept the
username/password <example-value> provided.

> **See also:** RFC 821 - Simple Mail Transfer Protocol
> Protocol definition for SMTP.  This document covers the model, operating
> procedure, and protocol details for SMTP.
>
> RFC 1869 - SMTP Service Extensions
> Definition of the ESMTP extensions for SMTP.  This describes a framework for
> extending SMTP with new commands, supporting dynamic discovery of the commands
> provided by the server, and defines a few additional commands.
