---
title: "urllib.request --- Extensible library for opening URLs (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/urllib.request.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `urllib.request` --- Extensible library for opening URLs

Module `urllib.request`.

**Source code:** Lib/urllib/request.py

The `urllib.request` module defines functions and classes which help in
opening URLs (mostly HTTP) in a complex world --- basic and digest
authentication, redirections, cookies and more.

> **See also:** The Requests package
> is recommended for a higher-level HTTP client interface.

> **Warning:** On macOS it is unsafe to use this module in programs using
> `os.fork()` because the `getproxies()` implementation for
> macOS uses a higher-level system API. Set the environment variable
> `no_proxy` to `*` to avoid this problem
> (e.g. `os.environ["no_proxy"] = "*"`).

The `urllib.request` module defines the following functions:

### `urlopen(url, data=None[, timeout], *, context=None)`

Open *url*, which can be either a string containing a valid, properly
encoded URL, or a `Request` object.

*data* must be an object specifying additional data to be sent to the
server, or `None` if no such data is needed.  See `Request`
for details.

urllib.request module uses HTTP/1.1 and includes `Connection:close` header
in its HTTP requests.

The optional *timeout* parameter specifies a timeout in seconds for
blocking operations like the connection attempt (if not specified,
the global default timeout setting will be used).  This actually
only works for HTTP, HTTPS and FTP connections.

If *context* is specified, it must be a `ssl.SSLContext` instance
describing the various SSL options. See `HTTPSConnection`
for more details.

This function always returns an object which can work as a
context manager and has the properties *url*, *headers*, and *status*.
See `urllib.response.addinfourl` for more detail on these properties.

For HTTP and HTTPS URLs, this function returns a
`http.client.HTTPResponse` object slightly modified. In addition
to the three new methods above, the msg attribute contains the
same information as the `reason`
attribute --- the reason phrase returned by server --- instead of
the response headers as it is specified in the documentation for
`HTTPResponse`.

For FTP, file, and data URLs, this function
returns a `urllib.response.addinfourl` object.

Raises `URLError` on protocol errors.

Note that `None` may be returned if no handler handles the request (though
the default installed global `OpenerDirector` uses
`UnknownHandler` to ensure this never happens).

In addition, if proxy settings are detected (for example, when a `*_proxy`
environment variable like `http_proxy` is set),
`ProxyHandler` is default installed and makes sure the requests are
handled through the proxy.

The legacy `urllib.urlopen` function from Python 2.6 and earlier has been
discontinued; `urllib.request.urlopen()` corresponds to the old
`urllib2.urlopen`.  Proxy handling, which was done by passing a dictionary
parameter to `urllib.urlopen`, can be obtained by using
`ProxyHandler` objects.

> *Changed in version 3.2.*
> *cafile* and *capath* were added.
> HTTPS virtual hosts are now supported if possible (that is, if
> `ssl.HAS_SNI` is true).
>
> *data* can be an iterable object.

> *Changed in version 3.3.*
> *cadefault* was added.

> *Changed in version 3.4.3.*
> *context* was added.

> *Changed in version 3.10.*
> HTTPS connection now send an ALPN extension with protocol indicator
> `http/1.1` when no *context* is given. Custom *context* should set
> ALPN protocols with `set_alpn_protocols()`.

> *Changed in version 3.13.*
> Remove *cafile*, *capath* and *cadefault* parameters: use the *context*
> parameter instead.

### `install_opener(opener)`

Install an `OpenerDirector` instance as the default global opener.
Installing an opener is only necessary if you want urlopen to use that
opener; otherwise, simply call `OpenerDirector.open()` instead of
`urlopen()`.  The code does not check for a real
`OpenerDirector`, and any class with the appropriate interface will
work.

### `build_opener([handler, ...])`

Return an `OpenerDirector` instance, which chains the handlers in the
order given. *handler*\s can be either instances of `BaseHandler`, or
subclasses of `BaseHandler` (in which case it must be possible to call
the constructor without any parameters).  Instances of the following classes
will be in front of the *handler*\s, unless the *handler*\s contain them,
instances of them or subclasses of them: `ProxyHandler` (if proxy
settings are detected), `UnknownHandler`, `HTTPHandler`,
`HTTPDefaultErrorHandler`, `HTTPRedirectHandler`,
`FTPHandler`, `FileHandler`, `HTTPErrorProcessor`.

If the Python installation has SSL support (i.e., if the `ssl` module
can be imported), `HTTPSHandler` will also be added.

A `BaseHandler` subclass may also change its `handler_order`
attribute to modify its position in the handlers list.

### `pathname2url(path, *, add_scheme=False)`

Convert the given local path to a `file:` URL. This function uses
`quote()` function to encode the path.

If *add_scheme* is false (the default), the return value omits the
`file:` scheme prefix. Set *add_scheme* to true to return a complete URL.

This example shows the function being used on Windows:

```
>>> from urllib.request import pathname2url
>>> path = 'C:\\Program Files'
>>> pathname2url(path, add_scheme=True)
'file:///C:/Program%20Files'
```

> *Changed in version 3.14.*
> Windows drive letters are no longer converted to uppercase, and `:`
> characters not following a drive letter no longer cause an
> `OSError` exception to be raised on Windows.

> *Changed in version 3.14.*
> Paths beginning with a slash are converted to URLs with authority
> sections. For example, the path `/etc/hosts` is converted to
> the URL `///etc/hosts`.

> *Changed in version 3.14.*
> The *add_scheme* parameter was added.

### `url2pathname(url, *, require_scheme=False, resolve_host=False)`

Convert the given `file:` URL to a local path. This function uses
`unquote()` to decode the URL.

If *require_scheme* is false (the default), the given value should omit a
`file:` scheme prefix. If *require_scheme* is set to true, the given
value should include the prefix; a `URLError` is raised
if it doesn't.

The URL authority is discarded if it is empty, `localhost`, or the local
hostname. Otherwise, if *resolve_host* is set to true, the authority is
resolved using `socket.gethostbyname()` and discarded if it matches a
local IP address (as per RFC RFC 8089 §3). If the
authority is still unhandled, then on Windows a UNC path is returned, and
on other platforms a `URLError` is raised.

This example shows the function being used on Windows:

```
>>> from urllib.request import url2pathname
>>> url = 'file:///C:/Program%20Files'
>>> url2pathname(url, require_scheme=True)
'C:\\Program Files'
```

> *Changed in version 3.14.*
> Windows drive letters are no longer converted to uppercase, and `:`
> characters not following a drive letter no longer cause an
> `OSError` exception to be raised on Windows.

> *Changed in version 3.14.*
> The URL authority is discarded if it matches the local hostname.
> Otherwise, if the authority isn't empty or `localhost`, then on
> Windows a UNC path is returned (as before), and on other platforms a
> `URLError` is raised.

> *Changed in version 3.14.*
> The URL query and fragment components are discarded if present.

> *Changed in version 3.14.*
> The *require_scheme* and *resolve_host* parameters were added.

### `getproxies()`

This helper function returns a dictionary of scheme to proxy server URL
mappings. It scans the environment for variables named `<scheme>_proxy`,
in a case insensitive approach, for all operating systems first, and when it
cannot find it, looks for proxy information from System
Configuration for macOS and Windows Systems Registry for Windows.
If both lowercase and uppercase environment variables exist (and disagree),
lowercase is preferred.

> **Note:** If the environment variable `REQUEST_METHOD` is set, which usually
> indicates your script is running in a CGI environment, the environment
> variable `HTTP_PROXY` (uppercase `_PROXY`) will be ignored. This is
> because that variable can be injected by a client using the "Proxy:" HTTP
> header. If you need to use an HTTP proxy in a CGI environment, either use
> `ProxyHandler` explicitly, or make sure the variable name is in
> lowercase (or at least the `_proxy` suffix).

The following classes are provided:

### class `Request(url, data=None, headers={}, origin_req_host=None, unverifiable=False, method=None)`

This class is an abstraction of a URL request.

*url* should be a string containing a valid, properly encoded URL.

*data* must be an object specifying additional data to send to the
server, or `None` if no such data is needed.  Currently HTTP
requests are the only ones that use *data*.  The supported object
types include bytes, file-like objects, and iterables of bytes-like objects.
If no `Content-Length` nor `Transfer-Encoding` header field
has been provided, `HTTPHandler` will set these headers according
to the type of *data*.  `Content-Length` will be used to send
bytes objects, while `Transfer-Encoding: chunked` as specified in
RFC 7230, Section 3.3.1 will be used to send files and other iterables.

For an HTTP POST request method, *data* should be a buffer in the
standard application/x-www-form-urlencoded format.  The
`urllib.parse.urlencode()` function takes a mapping or sequence
of 2-tuples and returns an ASCII string in this format. It should
be encoded to bytes before being used as the *data* parameter.

*headers* should be a dictionary, and will be treated as if
`add_header()` was called with each key and value as arguments.
This is often used to "spoof" the `User-Agent` header value, which is
used by a browser to identify itself -- some HTTP servers only
allow requests coming from common browsers as opposed to scripts.
For example, Mozilla Firefox may identify itself as ``"Mozilla/5.0
(X11; U; Linux i686) Gecko/20071127 Firefox/2.0.0.11"``, while
`urllib`'s default user agent string is
`"Python-urllib/2.6"` (on Python 2.6).
All header keys are sent in camel case.

An appropriate `Content-Type` header should be included if the *data*
argument is present.  If this header has not been provided and *data*
is not `None`, `Content-Type: application/x-www-form-urlencoded` will
be added as a default.

The next two arguments are only of interest for correct handling
of third-party HTTP cookies:

*origin_req_host* should be the request-host of the origin
transaction, as defined by RFC 2965.  It defaults to
`http.cookiejar.request_host(self)`.  This is the host name or IP
address of the original request that was initiated by the user.
For example, if the request is for an image in an HTML document,
this should be the request-host of the request for the page
containing the image.

*unverifiable* should indicate whether the request is unverifiable,
as defined by RFC 2965.  It defaults to `False`.  An unverifiable
request is one whose URL the user did not have the option to
approve.  For example, if the request is for an image in an HTML
document, and the user had no option to approve the automatic
fetching of the image, this should be true.

*method* should be a string that indicates the HTTP request method that
will be used (e.g. `'HEAD'`).  If provided, its value is stored in the
`method` attribute and is used by `get_method()`.
The default is `'GET'` if *data* is `None` or `'POST'` otherwise.
Subclasses may indicate a different default method by setting the
`method` attribute in the class itself.

> **Note:** The request will not work as expected if the data object is unable
> to deliver its content more than once (e.g. a file or an iterable
> that can produce the content only once) and the request is retried
> for HTTP redirects or authentication.  The *data* is sent to the
> HTTP server right away after the headers.  There is no support for
> a 100-continue expectation in the library.

> *Changed in version 3.3.*
> `Request.method` argument is added to the Request class.

> *Changed in version 3.4.*
> Default `Request.method` may be indicated at the class level.

> *Changed in version 3.6.*
> Do not raise an error if the `Content-Length` has not been
> provided and *data* is neither `None` nor a bytes object.
> Fall back to use chunked transfer encoding instead.

### class `OpenerDirector()`

The `OpenerDirector` class opens URLs via `BaseHandler`s chained
together. It manages the chaining of handlers, and recovery from errors.

### class `BaseHandler()`

This is the base class for all registered handlers --- and handles only the
simple mechanics of registration.

### class `HTTPDefaultErrorHandler()`

A class which defines a default handler for HTTP error responses; all responses
are turned into `HTTPError` exceptions.

### class `HTTPRedirectHandler()`

A class to handle redirections.

### class `HTTPCookieProcessor(cookiejar=None)`

A class to handle HTTP Cookies.

### class `ProxyHandler(proxies=None)`

Cause requests to go through a proxy. If *proxies* is given, it must be a
dictionary mapping protocol names to URLs of proxies. The default is to read
the list of proxies from the environment variables
`<protocol>_proxy`.  If no proxy environment variables are set, then
in a Windows environment proxy settings are obtained from the registry's
Internet Settings section, and in a macOS environment proxy information
is retrieved from the System Configuration Framework.

To disable autodetected proxy pass an empty dictionary.

The `no_proxy` environment variable can be used to specify hosts
which shouldn't be reached via proxy; if set, it should be a comma-separated
list of hostname suffixes, optionally with `:port` appended, for example
`cern.ch,ncsa.uiuc.edu,some.host:8080`.

> **Note:** `HTTP_PROXY` will be ignored if a variable `REQUEST_METHOD` is set;
> see the documentation on `getproxies()`.

### class `HTTPPasswordMgr()`

Keep a database of  `(realm, uri) -> (user, password)` mappings.

### class `HTTPPasswordMgrWithDefaultRealm()`

Keep a database of  `(realm, uri) -> (user, password)` mappings. A realm of
`None` is considered a catch-all realm, which is searched if no other realm
fits.

### class `HTTPPasswordMgrWithPriorAuth()`

A variant of `HTTPPasswordMgrWithDefaultRealm` that also has a
database of `uri -> is_authenticated` mappings.  Can be used by a
BasicAuth handler to determine when to send authentication credentials
immediately instead of waiting for a `401` response first.

> *Added in version 3.5.*
