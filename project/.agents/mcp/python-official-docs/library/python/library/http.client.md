---
title: "http.client --- HTTP protocol client (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/http.client.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `http.client` --- HTTP protocol client

Module `http.client`.

**Source code:** Lib/http/client.py

This module defines classes that implement the client side of the HTTP and
HTTPS protocols.  It is normally not used directly --- the module
`urllib.request` uses it to handle URLs that use HTTP and HTTPS.

> **See also:** The Requests package
> is recommended for a higher-level HTTP client interface.

> **Note:** HTTPS support is only available if Python was compiled with SSL support
> (through the `ssl` module).

The module provides the following classes:

### class `HTTPConnection(host, port=None[, timeout], source_address=None, \`

```python
blocksize=8192, max_response_headers=None)
```

An `HTTPConnection` instance represents one transaction with an HTTP
server.  It should be instantiated by passing it a host and optional port
number.  If no port number is passed, the port is extracted from the host
string if it has the form `host:port`, else the default HTTP port (80) is
used.  If the optional *timeout* parameter is given, blocking
operations (like connection attempts) will timeout after that many seconds
(if it is not given, the global default timeout setting is used).
The optional *source_address* parameter may be a tuple of a (host, port)
to use as the source address the HTTP connection is made from.
The optional *blocksize* parameter sets the buffer size in bytes for
sending a file-like message body. The optional *max_response_headers*
parameter sets the maximum number of allowed response headers to help
prevent denial-of-service attacks, otherwise the default value (100) is used.

For example, the following calls all create instances that connect to the server
at the same host and port:

```
>>> h1 = http.client.HTTPConnection('www.python.org')
>>> h2 = http.client.HTTPConnection('www.python.org:80')
>>> h3 = http.client.HTTPConnection('www.python.org', 80)
>>> h4 = http.client.HTTPConnection('www.python.org', 80, timeout=10)
```

> *Changed in version 3.2.*
> *source_address* was added.

> *Changed in version 3.4.*
> The  *strict* parameter was removed. HTTP 0.9-style "Simple Responses" are
> no longer supported.

> *Changed in version 3.7.*
> *blocksize* parameter was added.

> *Changed in version 3.15.*
> *max_response_headers* parameter was added.

### class `HTTPSConnection(host, port=None, *[, timeout], \`

```python
source_address=None, context=None, \
blocksize=8192, max_response_headers=None)
```

A subclass of `HTTPConnection` that uses SSL for communication with
secure servers.  Default port is `443`.  If *context* is specified, it
must be a `ssl.SSLContext` instance describing the various SSL
options.

Please read ssl-security for more information on best practices.

> *Changed in version 3.2.*
> *source_address*, *context* and *check_hostname* were added.

> *Changed in version 3.2.*
> This class now supports HTTPS virtual hosts if possible (that is,
> if `ssl.HAS_SNI` is true).

> *Changed in version 3.4.*
> The *strict* parameter was removed. HTTP 0.9-style "Simple Responses" are
> no longer supported.

> *Changed in version 3.4.3.*
> This class now performs all the necessary certificate and hostname checks
> by default. To revert to the previous, unverified, behavior
> `ssl._create_unverified_context()` can be passed to the *context*
> parameter.

> *Changed in version 3.8.*
> This class now enables TLS 1.3
> `ssl.SSLContext.post_handshake_auth` for the default *context* or
> when *cert_file* is passed with a custom *context*.

> *Changed in version 3.10.*
> This class now sends an ALPN extension with protocol indicator
> `http/1.1` when no *context* is given. Custom *context* should set
> ALPN protocols with `set_alpn_protocols()`.

> *Changed in version 3.12.*
> The deprecated *key_file*, *cert_file* and *check_hostname* parameters
> have been removed.

> *Changed in version 3.15.*
> *max_response_headers* parameter was added.

### class `HTTPResponse(sock, debuglevel=0, method=None, url=None)`

Class whose instances are returned upon successful connection.  Not
instantiated directly by user.

> *Changed in version 3.4.*
> The *strict* parameter was removed. HTTP 0.9 style "Simple Responses" are
> no longer supported.

This module provides the following function:

### `parse_headers(fp)`

Parse the headers from a file pointer *fp* representing a HTTP
request/response. The file has to be a `BufferedIOBase` reader
(i.e. not text) and must provide a valid RFC 5322 style header.

This function returns an instance of `http.client.HTTPMessage`
that holds the header fields, but no payload
(the same as `HTTPResponse.msg`
and `http.server.BaseHTTPRequestHandler.headers`).
After returning, the file pointer *fp* is ready to read the HTTP body.

> **Note:** `parse_headers()` does not parse the start-line of a HTTP message;
> it only parses the `Name: value` lines. The file has to be ready to
> read these field lines, so the first line should already be consumed
> before calling the function.

The following exceptions are raised as appropriate:

### exception `HTTPException`

The base class of the other exceptions in this module.  It is a subclass of
`Exception`.

### exception `NotConnected`

A subclass of `HTTPException`.

### exception `InvalidURL`

A subclass of `HTTPException`, raised if a port is given and is either
non-numeric or empty.

### exception `UnknownProtocol`

A subclass of `HTTPException`.

### exception `UnknownTransferEncoding`

A subclass of `HTTPException`.

### exception `UnimplementedFileMode`

A subclass of `HTTPException`.

### exception `IncompleteRead`

A subclass of `HTTPException`.

### exception `ImproperConnectionState`

A subclass of `HTTPException`.

### exception `CannotSendRequest`

A subclass of `ImproperConnectionState`.

### exception `CannotSendHeader`

A subclass of `ImproperConnectionState`.

### exception `ResponseNotReady`

A subclass of `ImproperConnectionState`.

### exception `BadStatusLine`

A subclass of `HTTPException`.  Raised if a server responds with a HTTP
status code that we don't understand.

### exception `LineTooLong`

A subclass of `HTTPException`.  Raised if an excessively long line
is received in the HTTP protocol from the server.

### exception `RemoteDisconnected`

A subclass of `ConnectionResetError` and `BadStatusLine`.  Raised
by `HTTPConnection.getresponse()` when the attempt to read the response
results in no data read from the connection, indicating that the remote end
has closed the connection.

> *Added in version 3.5.*
> Previously, `BadStatusLine``('')` was raised.

The constants defined in this module are:

### `HTTP_PORT`

The default port for the HTTP protocol (always `80`).

### `HTTPS_PORT`

The default port for the HTTPS protocol (always `443`).

### `responses`

This dictionary maps the HTTP 1.1 status codes to the W3C names.

Example: `http.client.responses[http.client.NOT_FOUND]` is `'Not Found'`.

See http-status-codes for a list of HTTP status codes that are
available in this module as constants.
