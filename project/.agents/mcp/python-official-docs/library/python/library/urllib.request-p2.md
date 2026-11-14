---
title: "urllib.request --- Extensible library for opening URLs (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/urllib.request.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# urllib.request --- Extensible library for opening URLs (part 2 of 4)

### class `AbstractBasicAuthHandler(password_mgr=None)`

This is a mixin class that helps with HTTP authentication, both to the remote
host and to a proxy. *password_mgr*, if given, should be something that is
compatible with `HTTPPasswordMgr`; refer to section
http-password-mgr for information on the interface that must be
supported.  If *passwd_mgr* also provides `is_authenticated` and
`update_authenticated` methods (see
http-password-mgr-with-prior-auth), then the handler will use the
`is_authenticated` result for a given URI to determine whether or not to
send authentication credentials with the request.  If `is_authenticated`
returns `True` for the URI, credentials are sent.  If `is_authenticated`
is `False`, credentials are not sent, and then if a `401` response is
received the request is re-sent with the authentication credentials.  If
authentication succeeds, `update_authenticated` is called to set
`is_authenticated` `True` for the URI, so that subsequent requests to
the URI or any of its super-URIs will automatically include the
authentication credentials.

> *Added in version 3.5.*
> Added `is_authenticated` support.

### class `HTTPBasicAuthHandler(password_mgr=None)`

Handle authentication with the remote host. *password_mgr*, if given, should
be something that is compatible with `HTTPPasswordMgr`; refer to
section http-password-mgr for information on the interface that must
be supported. HTTPBasicAuthHandler will raise a `ValueError` when
presented with a wrong Authentication scheme.

### class `ProxyBasicAuthHandler(password_mgr=None)`

Handle authentication with the proxy. *password_mgr*, if given, should be
something that is compatible with `HTTPPasswordMgr`; refer to section
http-password-mgr for information on the interface that must be
supported.

### class `AbstractDigestAuthHandler(password_mgr=None)`

This is a mixin class that helps with HTTP authentication, both to the remote
host and to a proxy. *password_mgr*, if given, should be something that is
compatible with `HTTPPasswordMgr`; refer to section
http-password-mgr for information on the interface that must be
supported.

> *Changed in version 3.14.*
> Added support for HTTP digest authentication algorithm `SHA-256`.

### class `HTTPDigestAuthHandler(password_mgr=None)`

Handle authentication with the remote host. *password_mgr*, if given, should
be something that is compatible with `HTTPPasswordMgr`; refer to
section http-password-mgr for information on the interface that must
be supported. When both Digest Authentication Handler and Basic
Authentication Handler are both added, Digest Authentication is always tried
first. If the Digest Authentication returns a 40x response again, it is sent
to Basic <example-value> handler to Handle.  This Handler method will raise a
`ValueError` when presented with an authentication scheme other than
Digest or Basic.

> *Changed in version 3.3.*
> Raise `ValueError` on unsupported Authentication Scheme.

### class `ProxyDigestAuthHandler(password_mgr=None)`

Handle authentication with the proxy. *password_mgr*, if given, should be
something that is compatible with `HTTPPasswordMgr`; refer to section
http-password-mgr for information on the interface that must be
supported.

### class `HTTPHandler()`

A class to handle opening of HTTP URLs.

### class `HTTPSHandler(debuglevel=0, context=None, check_hostname=None)`

A class to handle opening of HTTPS URLs.  *context* and *check_hostname*
have the same meaning as in `http.client.HTTPSConnection`.

> *Changed in version 3.2.*
> *context* and *check_hostname* were added.

### class `FileHandler()`

Open local files.

### class `DataHandler()`

Open data URLs.

> *Added in version 3.4.*

### class `FTPHandler()`

Open FTP URLs.

### class `CacheFTPHandler()`

Open FTP URLs, keeping a cache of open FTP connections to minimize delays.

### class `UnknownHandler()`

A catch-all class to handle unknown URLs.

### class `HTTPErrorProcessor()`

Process HTTP error responses.

## Request Objects

The following methods describe `Request`'s public interface,
and so all may be overridden in subclasses.  It also defines several
public attributes that can be used by clients to inspect the parsed
request.

### `Request.full_url`

The original URL passed to the constructor.

> *Changed in version 3.4.*

Request.full_url is a property with setter, getter and a deleter. Getting
`full_url` returns the original request URL with the
fragment, if it was present.

### `Request.type`

The URI scheme.

### `Request.host`

The URI authority, typically a host, but may also contain a port
separated by a colon.

### `Request.origin_req_host`

The original host for the request, without port.

### `Request.selector`

The URI path.  If the `Request` uses a proxy, then selector
will be the full URL that is passed to the proxy.

### `Request.data`

The entity body for the request, or `None` if not specified.

> *Changed in version 3.4.*
> Changing value of `Request.data` now deletes "Content-Length"
> header if it was previously set or calculated.

### `Request.unverifiable`

boolean, indicates whether the request is unverifiable as defined
by RFC 2965.

### `Request.method`

The HTTP request method to use.  By default its value is `None`,
which means that `get_method()` will do its normal computation
of the method to be used.  Its value can be set (thus overriding the default
computation in `get_method()`) either by providing a default
value by setting it at the class level in a `Request` subclass, or by
passing a value in to the `Request` constructor via the *method*
argument.

> *Added in version 3.3.*

> *Changed in version 3.4.*
> A default value can now be set in subclasses; previously it could only
> be set via the constructor argument.

### `Request.get_method()`

Return a string indicating the HTTP request method.  If
`Request.method` is not `None`, return its value, otherwise return
`'GET'` if `Request.data` is `None`, or `'POST'` if it's not.
This is only meaningful for HTTP requests.

> *Changed in version 3.3.*
> get_method now looks at the value of `Request.method`.

### `Request.add_header(key, val)`

Add another header to the request.  Headers are currently ignored by all
handlers except HTTP handlers, where they are added to the list of headers sent
to the server.  Note that there cannot be more than one header with the same
name, and later calls will overwrite previous calls in case the *key* collides.
Currently, this is no loss of HTTP functionality, since all headers which have
meaning when used more than once have a (header-specific) way of gaining the
same functionality using only one header.  Note that headers added using
this method are also added to redirected requests.

### `Request.add_unredirected_header(key, header)`

Add a header that will not be added to a redirected request.

### `Request.has_header(header)`

Return whether the instance has the named header (checks both regular and
unredirected).

### `Request.remove_header(header)`

Remove named header from the request instance (both from regular and
unredirected headers).

> *Added in version 3.4.*

### `Request.get_full_url()`

Return the URL given in the constructor.

> *Changed in version 3.4.*

Returns `Request.full_url`

### `Request.set_proxy(host, type)`

Prepare the request by connecting to a proxy server. The *host* and *type* will
replace those of the instance, and the instance's selector will be the original
URL given in the constructor.

### `Request.get_header(header_name, default=None)`

Return the value of the given header. If the header is not present, return
the default value.

### `Request.header_items()`

Return a list of tuples (header_name, header_value) of the Request headers.

> *Changed in version 3.4.*
> The request methods add_data, has_data, get_data, get_type, get_host,
> get_selector, get_origin_req_host and is_unverifiable that were deprecated
> since 3.3 have been removed.

## OpenerDirector Objects

`OpenerDirector` instances have the following methods:

### `OpenerDirector.add_handler(handler)`

*handler* should be an instance of `BaseHandler`.  The following methods
are searched, and added to the possible chains (note that HTTP errors are a
special case).  Note that, in the following, *protocol* should be replaced
with the actual protocol to handle, for example `http_response()` would
be the HTTP protocol response handler.  Also *type* should be replaced with
the actual HTTP code, for example `http_error_404()` would handle HTTP
404 errors.

- `<protocol>_open()` --- signal that the handler knows how to open *protocol*
URLs.

See protocol_open_ for more information.

- `http_error_\()` --- signal that the handler knows how to handle HTTP
errors with HTTP error code *type*.

See http_error_nnn_ for more information.

- `<protocol>_error()` --- signal that the handler knows how to handle errors
from (non-`http`) *protocol*.

- `<protocol>_request()` --- signal that the handler knows how to pre-process
*protocol* requests.

See protocol_request_ for more information.

- `<protocol>_response()` --- signal that the handler knows how to
post-process *protocol* responses.

See protocol_response_ for more information.

### `OpenerDirector.open(url, data=None[, timeout])`

Open the given *url* (which can be a request object or a string), optionally
passing the given *data*. Arguments, return values and exceptions raised are
the same as those of `urlopen()` (which simply calls the `open()`
method on the currently installed global `OpenerDirector`).  The
optional *timeout* parameter specifies a timeout in seconds for blocking
operations like the connection attempt (if not specified, the global default
timeout setting will be used). The timeout feature actually works only for
HTTP, HTTPS and FTP connections.

### `OpenerDirector.error(proto, *args)`

Handle an error of the given protocol.  This will call the registered error
handlers for the given protocol with the given arguments (which are protocol
specific).  The HTTP protocol is a special case which uses the HTTP response
code to determine the specific error handler; refer to the `http_error_\()`
methods of the handler classes.

Return values and exceptions raised are the same as those of `urlopen()`.

OpenerDirector objects open URLs in three stages:

The order in which these methods are called within each stage is determined by
sorting the handler instances.

1. Every handler with a method named like `<protocol>_request()` has that
method called to pre-process the request.

1. Handlers with a method named like `<protocol>_open()` are called to handle
the request. This stage ends when a handler either returns a non-`None`
value (ie. a response), or raises an exception (usually
`URLError`).  Exceptions are allowed to propagate.

In fact, the above algorithm is first tried for methods named
`default_open()`.  If all such methods return `None`, the algorithm
is repeated for methods named like `<protocol>_open()`.  If all such methods
return `None`, the algorithm is repeated for methods named
`unknown_open()`.

Note that the implementation of these methods may involve calls of the parent
`OpenerDirector` instance's `open()` and
`error()` methods.

1. Every handler with a method named like `<protocol>_response()` has that
method called to post-process the response.
