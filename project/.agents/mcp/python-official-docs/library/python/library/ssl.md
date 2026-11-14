---
title: "ssl --- TLS/SSL wrapper for socket objects (part 1 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ssl.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `ssl` --- TLS/SSL wrapper for socket objects

Module `ssl`.

**Source code:** Lib/ssl.py

This module provides access to Transport Layer Security (often known as "Secure
Sockets Layer") encryption and peer authentication facilities for network
sockets, both client-side and server-side.  This module uses the OpenSSL
library.

> **Note:** Some behavior may be platform dependent, since calls are made to the
> operating system socket APIs.  The installed version of OpenSSL may also
> cause variations in behavior. For example, TLSv1.3 comes with OpenSSL version
> 1.1.1.

> **Warning:** Don't use this module without reading the ssl-security.  Doing so
> may lead to a false sense of security, as the default settings of the
> ssl module are not necessarily appropriate for your application.

This section documents the objects and functions in the `ssl` module; for more
general information about TLS, SSL, and certificates, the reader is referred to
the documents in the "See Also" section at the bottom.

This module provides a class, `ssl.SSLSocket`, which is derived from the
`socket.socket` type, and provides a socket-like wrapper that also
encrypts and decrypts the data going over the socket with SSL.  It supports
additional methods such as `getpeercert()`, which retrieves the
certificate of the other side of the connection, `cipher()`, which
retrieves the cipher being used for the secure connection or
`get_verified_chain()`, `get_unverified_chain()` which retrieves
certificate chain.

For more sophisticated applications, the `ssl.SSLContext` class
helps manage settings and certificates, which can then be inherited
by SSL sockets created through the `SSLContext.wrap_socket()` method.

> *Changed in version 3.5.3.*
> Updated to support linking with OpenSSL 1.1.0

> *Changed in version 3.6.*
> OpenSSL 0.9.8, 1.0.0 and 1.0.1 are deprecated and no longer supported.
> In the future the ssl module will require at least OpenSSL 1.0.2 or
> 1.1.0.

> *Changed in version 3.10.*
> PEP 644 has been implemented. The ssl module requires OpenSSL 1.1.1
> or newer.
>
> Use of deprecated constants and functions result in deprecation warnings.
