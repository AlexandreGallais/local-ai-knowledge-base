---
title: "http.server --- HTTP servers (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/http.server.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `http.server` --- HTTP servers

Module `http.server`.

**Source code:** Lib/http/server.py

This module defines classes for implementing HTTP servers.

> **Warning:** `http.server` is not recommended for production. It only implements
> basic <example-value> checks.

One class, `HTTPServer`, is a `socketserver.TCPServer` subclass.
It creates and listens at the HTTP socket, dispatching the requests to a
handler.  Code to create and run the server looks like this:

```
def run(server_class=HTTPServer, handler_class=BaseHTTPRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()
```

### class `HTTPServer(server_address, RequestHandlerClass)`

This class builds on the `TCPServer` class by storing
the server address as instance variables named `server_name` and
`server_port`. The server is accessible by the handler, typically
through the handler's `server`
instance variable.

### `server_name`

The HTTP server's fully qualified domain name.

### `server_port`

The HTTP server's port number obtained from *server_address*.

### class `ThreadingHTTPServer(server_address, RequestHandlerClass)`

This class is identical to HTTPServer but uses threads to handle
requests by using the `ThreadingMixIn`. This
is useful to handle web browsers pre-opening sockets, on which
`HTTPServer` would wait indefinitely.

> *Added in version 3.7.*

### class `HTTPSServer(server_address, RequestHandlerClass,\`

```python
bind_and_activate=True, *, certfile, keyfile=None,\
password=None, alpn_protocols=None)
```

Subclass of `HTTPServer` with a wrapped socket using the `ssl` module.
If the `ssl` module is not available, instantiating a `HTTPSServer`
object fails with a `RuntimeError`.

The *certfile* argument is the path to the SSL certificate chain file,
and the *keyfile* is the path to the file containing the private key.

A *password* can be specified for files protected and wrapped with PKCS#8,
but beware that this could possibly expose hardcoded passwords in clear.

> **See also:** See `ssl.SSLContext.load_cert_chain()` for additional
> information on the accepted values for *certfile*, *keyfile*
> and *password*.

When specified, the *alpn_protocols* argument must be a sequence of strings
specifying the "Application-Layer Protocol Negotiation" (ALPN) protocols
supported by the server. ALPN allows the server and the client to negotiate
the application protocol during the TLS handshake.

By default, it is set to `["http/1.1"]`, meaning the server supports HTTP/1.1.

> *Added in version 3.14.*

### class `ThreadingHTTPSServer(server_address, RequestHandlerClass,\`

```python
bind_and_activate=True, *, certfile, keyfile=None,\
password=None, alpn_protocols=None)
```

This class is identical to `HTTPSServer` but uses threads to handle
requests by inheriting from `ThreadingMixIn`. This is
analogous to `ThreadingHTTPServer` only using `HTTPSServer`.

> *Added in version 3.14.*

The `HTTPServer`, `ThreadingHTTPServer`, `HTTPSServer` and
`ThreadingHTTPSServer` must be given a *RequestHandlerClass* on
instantiation, of which this module provides three different variants:

### class `BaseHTTPRequestHandler(request, client_address, server)`

This class is used to handle the HTTP requests that arrive at the server.  By
itself, it cannot respond to any actual HTTP requests; it must be subclassed
to handle each request method (for example, `'GET'` or `'POST'`).
`BaseHTTPRequestHandler` provides a number of class and instance
variables, and methods for use by subclasses.

The handler will parse the request and the headers, then call a method
specific to the request type. The method name is constructed from the
request. For example, for the request method `SPAM`, the `do_SPAM()`
method will be called with no arguments. All of the relevant information is
stored in instance variables of the handler.  Subclasses should not need to
override or extend the `__init__()` method.

`BaseHTTPRequestHandler` has the following instance variables:

### `client_address`

Contains a tuple of the form `(host, port)` referring to the client's
address.

### `server`

Contains the server instance.

### `close_connection`

Boolean that should be set before `handle_one_request()` returns,
indicating if another request may be expected, or if the connection should
be shut down.

### `requestline`

Contains the string representation of the HTTP request line. The
terminating CRLF is stripped. This attribute should be set by
`handle_one_request()`. If no valid request line was processed, it
should be set to the empty string.

### `command`

Contains the command (request type). For example, `'GET'`.

### `path`

Contains the request path. If the query component of the URL is present,
then `path` includes the query. Using the terminology of RFC 3986,
`path` here includes `hier-part` and the `query`.

### `request_version`

Contains the version string from the request. For example, `'HTTP/1.0'`.

### `headers`

Holds an instance of the class specified by the `MessageClass` class
variable. This instance parses and manages the headers in the HTTP
request. The `parse_headers()` function from
`http.client` is used to parse the headers and it requires that the
HTTP request provide a valid RFC 5322 style header.

### `rfile`

An `io.BufferedIOBase` input stream, ready to read from
the start of the optional input data.

### `wfile`

Contains the output stream for writing a response back to the
client. Proper adherence to the HTTP protocol must be used when writing to
this stream in order to achieve successful interoperation with HTTP
clients.

> *Changed in version 3.6.*
> This is an `io.BufferedIOBase` stream.

`BaseHTTPRequestHandler` has the following attributes:

### `server_version`

Specifies the server software version.  You may want to override this. The
format is multiple whitespace-separated strings, where each string is of
the form name[/version]. For example, `'BaseHTTP/0.2'`.

### `sys_version`

Contains the Python system version, in a form usable by the
`version_string` method and the `server_version` class
variable. For example, `'Python/1.4'`.

### `error_message_format`

Specifies a format string that should be used by `send_error()` method
for building an error response to the client. The string is filled by
default with variables from `responses` based on the status code
passed to `send_error()`.

### `error_content_type`

Specifies the Content-Type HTTP header of error responses sent to the
client.  The default value is `'text/html'`.

### `protocol_version`

Specifies the HTTP version to which the server is conformant. It is sent
in responses to let the client know the server's communication
capabilities for future requests. If set to
`'HTTP/1.1'`, the server will permit HTTP persistent connections;
however, your server *must* then include an accurate `Content-Length`
header (using `send_header()`) in all of its responses to clients.
For backwards compatibility, the setting defaults to `'HTTP/1.0'`.

### `MessageClass`

Specifies an `email.message.Message`-like class to parse HTTP
headers.  Typically, this is not overridden, and it defaults to
`http.client.HTTPMessage`.

### `responses`

This attribute contains a mapping of error code integers to two-element tuples
containing a short and long message. For example, ``{code: (shortmessage,
longmessage)}``. The *shortmessage* is usually used as the *message* key in an
error response, and *longmessage* as the *explain* key.  It is used by
`send_response_only()` and `send_error()` methods.

A `BaseHTTPRequestHandler` instance has the following methods:

### `handle()`

Calls `handle_one_request()` once (or, if persistent connections are
enabled, multiple times) to handle incoming HTTP requests. You should
never need to override it; instead, implement appropriate `do_*()`
methods.

### `handle_one_request()`

This method will parse and dispatch the request to the appropriate
`do_*()` method.  You should never need to override it.

### `handle_expect_100()`

When an HTTP/1.1 conformant server receives an `Expect: 100-continue`
request header it responds with a `100 Continue` followed by `200 OK`
headers.
This method can be overridden to raise an error if the server does not
want the client to continue.  For example, the server can choose to send ``417
Expectation Failed` as a response header and `return False``.

> *Added in version 3.2.*

### `send_error(code, message=None, explain=None)`

Sends and logs a complete error reply to the client. The numeric *code*
specifies the HTTP error code, with *message* as an optional, short, human
readable description of the error.  The *explain* argument can be used to
provide more detailed information about the error; it will be formatted
using the `error_message_format` attribute and emitted, after
a complete set of headers, as the response body.  The `responses`
attribute holds the default values for *message* and *explain* that
will be used if no value is provided; for unknown codes the default value
for both is the string `???`. The body will be empty if the method is
HEAD or the response code is one of the following: `1{xx}`,
`204 No Content`, `205 Reset Content`, `304 Not Modified`.

> *Changed in version 3.4.*
> The error response includes a Content-Length header.
> Added the *explain* argument.

### `send_response(code, message=None)`

Adds a response header to the headers buffer and logs the accepted
request. The HTTP response line is written to the internal buffer,
followed by *Server* and *Date* headers. The values for these two headers
are picked up from the `version_string()` and
`date_time_string()` methods, respectively. If the server does not
intend to send any other headers using the `send_header()` method,
then `send_response()` should be followed by an `end_headers()`
call.

> *Changed in version 3.3.*
> Headers are stored to an internal buffer and `end_headers()`
> needs to be called explicitly.

### `send_header(keyword, value)`

Adds the HTTP header to an internal buffer which will be written to the
output stream when either `end_headers()` or `flush_headers()` is
invoked. *keyword* should specify the header keyword, with *value*
specifying its value. Note that, after the send_header calls are done,
`end_headers()` MUST BE called in order to complete the operation.

This method does not reject input containing CRLF sequences.

> *Changed in version 3.2.*
> Headers are stored in an internal buffer.

### `send_response_only(code, message=None)`

Sends the response header only, used for the purposes when ``100
Continue`` response is sent by the server to the client. The headers are
not buffered and sent directly the output stream. If the *message* is not
specified, the HTTP message corresponding the response *code*  is sent.

This method does not reject *message* containing CRLF sequences.

> *Added in version 3.2.*

### `end_headers()`

Adds a blank line
(indicating the end of the HTTP headers in the response)
to the headers buffer and calls `flush_headers()`.

> *Changed in version 3.2.*
> The buffered headers are written to the output stream.

### `flush_headers()`

Finally send the headers to the output stream and flush the internal
headers buffer.

> *Added in version 3.3.*

### `log_request(code='-', size='-')`

Logs an accepted (successful) request. *code* should specify the numeric
HTTP code associated with the response. If a size of the response is
available, then it should be passed as the *size* parameter.

### `log_error(...)`

Logs an error when a request cannot be fulfilled. By default, it passes
the message to `log_message()`, so it takes the same arguments
(*format* and additional values).

### `log_message(format, ...)`

Logs an arbitrary message to `sys.stderr`. This is typically overridden
to create custom error logging mechanisms. The *format* argument is a
standard printf-style format string, where the additional arguments to
`log_message()` are applied as inputs to the formatting. The client
IP address and current date and time are prefixed to every message logged.

### `version_string()`

Returns the server software's version string. This is a combination of the
`server_version` and `sys_version` attributes.

### `date_time_string(timestamp=None)`

Returns the date and time given by *timestamp* (which must be `None` or in
the format returned by `time.time()`), formatted for a message
header. If *timestamp* is omitted, it uses the current date and time.

The result looks like `'Sun, 06 Nov 1994 08:49:37 GMT'`.

### `log_date_time_string()`

Returns the current date and time, formatted for logging.

### `address_string()`

Returns the client address.

> *Changed in version 3.3.*
> Previously, a name lookup was performed. To avoid name resolution
> delays, it now always returns the IP address.

### class `SimpleHTTPRequestHandler(request, client_address, server, \`

```python
*, directory=None, extra_response_headers=None)
```

This class serves files from the directory *directory* and below,
or the current directory if *directory* is not provided, directly
mapping the directory structure to HTTP requests.

> *Changed in version 3.7.*
> Added the *directory* parameter.

> *Changed in version 3.9.*
> The *directory* parameter accepts a path-like object.

> *Changed in version 3.15.*
> Added *extra_response_headers* parameter.

A lot of the work, such as parsing the request, is done by the base class
`BaseHTTPRequestHandler`.  This class implements the `do_GET()`
and `do_HEAD()` functions.

The following are defined as class-level attributes of
`SimpleHTTPRequestHandler`:

### `server_version`

This will be `"SimpleHTTP/" + __version__`, where `__version__` is
defined at the module level.

### `default_content_type`

Specifies the Content-Type header value sent when the MIME type
cannot be guessed from the file extension of the requested URL.
By default, it is set to `'application/octet-stream'`.

> *Added in version 3.15.*

### `index_pages`

Specifies the filenames that are treated as directory index pages.

Defaults to `("index.html", "index.htm")`.

> *Added in version 3.12.*

### `extensions_map`

A dictionary mapping suffixes into MIME types, contains custom overrides
for the default system mappings. The mapping is used case-insensitively,
and so should contain only lower-cased keys.

> *Changed in version 3.9.*
> This dictionary is no longer filled with the default system mappings,
> but only contains overrides.

### `extra_response_headers`

A sequence of `(name, value)` pairs containing user-defined extra HTTP
response headers to add to each successful HTTP status 200 response. These
headers are not included in other status code responses.

Headers that the server sends automatically such as `Content-Type`
will not be overwritten by `extra_response_headers`.

The `SimpleHTTPRequestHandler` class defines the following methods:
