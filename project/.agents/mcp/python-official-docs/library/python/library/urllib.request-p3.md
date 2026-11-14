---
title: "urllib.request --- Extensible library for opening URLs (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/urllib.request.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# urllib.request --- Extensible library for opening URLs (part 3 of 4)

## BaseHandler Objects

`BaseHandler` objects provide a couple of methods that are directly
useful, and others that are meant to be used by derived classes.  These are
intended for direct use:

### `BaseHandler.add_parent(director)`

Add a director as parent.

### `BaseHandler.close()`

Remove any parents.

The following attribute and methods should only be used by classes derived from
`BaseHandler`.

> **Note:** The convention has been adopted that subclasses defining
> `<protocol>_request()` or `<protocol>_response()` methods are named
> `*Processor`; all others are named `*Handler`.

### `BaseHandler.parent`

A valid `OpenerDirector`, which can be used to open using a different
protocol, or handle errors.

### `BaseHandler.default_open(req)`

This method is *not* defined in `BaseHandler`, but subclasses should
define it if they want to catch all URLs.

This method, if implemented, will be called by the parent
`OpenerDirector`.  It should return a file-like object as described in
the return value of the `open()` method of `OpenerDirector`, or `None`.
It should raise `URLError`, unless a truly exceptional
thing happens (for example, `MemoryError` should not be mapped to
`URLError`).

This method will be called before any protocol-specific open method.

### `BaseHandler.<protocol>_open(req)`

This method is *not* defined in `BaseHandler`, but subclasses should
define it if they want to handle URLs with the given protocol.

This method, if defined, will be called by the parent `OpenerDirector`.
Return values should be the same as for  `default_open()`.

### `BaseHandler.unknown_open(req)`

This method is *not* defined in `BaseHandler`, but subclasses should
define it if they want to catch all URLs with no specific registered handler to
open it.

This method, if implemented, will be called by the `parent`
`OpenerDirector`.  Return values should be the same as for
`default_open()`.

### `BaseHandler.http_error_default(req, fp, code, msg, hdrs)`

This method is *not* defined in `BaseHandler`, but subclasses should
override it if they intend to provide a catch-all for otherwise unhandled HTTP
errors.  It will be called automatically by the  `OpenerDirector` getting
the error, and should not normally be called in other circumstances.

`OpenerDirector` will call this method with five positional arguments:

1. a `Request` object,
1. a file-like object with the HTTP error body,
1. the three-digit code of the error, as a string,
1. the user-visible explanation of the code, as a string, and
1. the headers of the error, as a mapping object.

Return values and exceptions raised should be the same as those of
`urlopen()`.

### `BaseHandler.http_error_<nnn>(req, fp, code, msg, hdrs)`

*nnn* should be a three-digit HTTP error code.  This method is also not defined
in `BaseHandler`, but will be called, if it exists, on an instance of a
subclass, when an HTTP error with code *nnn* occurs.

Subclasses should override this method to handle specific HTTP errors.

Arguments, return values and exceptions raised should be the same as for
`http_error_default()`.

### `BaseHandler.<protocol>_request(req)`

This method is *not* defined in `BaseHandler`, but subclasses should
define it if they want to pre-process requests of the given protocol.

This method, if defined, will be called by the parent `OpenerDirector`.
*req* will be a `Request` object. The return value should be a
`Request` object.

### `BaseHandler.<protocol>_response(req, response)`

This method is *not* defined in `BaseHandler`, but subclasses should
define it if they want to post-process responses of the given protocol.

This method, if defined, will be called by the parent `OpenerDirector`.
*req* will be a `Request` object. *response* will be an object
implementing the same interface as the return value of `urlopen()`.  The
return value should implement the same interface as the return value of
`urlopen()`.

## HTTPRedirectHandler Objects

> **Note:** Some HTTP redirections require action from this module's client code.  If this
> is the case, `HTTPError` is raised.  See RFC 2616 for
> details of the precise meanings of the various redirection codes.
>
> An `HTTPError` exception raised as a security consideration if the
> HTTPRedirectHandler is presented with a redirected URL which is not an HTTP,
> HTTPS or FTP URL.

### `HTTPRedirectHandler.redirect_request(req, fp, code, msg, hdrs, newurl)`

Return a `Request` or `None` in response to a redirect. This is called
by the default implementations of the `http_error_30*()` methods when a
redirection is received from the server.  If a redirection should take place,
return a new `Request` to allow `http_error_30*()` to perform the
redirect to *newurl*.  Otherwise, raise `HTTPError` if
no other handler should try to handle this URL, or return `None` if you
can't but another handler might.

> **Note:** The default implementation of this method does not strictly follow RFC 2616,
> which says that 301 and 302 responses to `POST` requests must not be
> automatically redirected without confirmation by the user.  In reality, browsers
> do allow automatic redirection of these responses, changing the POST to a
> `GET`, and the default implementation reproduces this behavior.

### `HTTPRedirectHandler.http_error_301(req, fp, code, msg, hdrs)`

Redirect to the `Location:` or `URI:` URL.  This method is called by the
parent `OpenerDirector` when getting an HTTP 'moved permanently' response.

### `HTTPRedirectHandler.http_error_302(req, fp, code, msg, hdrs)`

The same as `http_error_301()`, but called for the 'found' response.

### `HTTPRedirectHandler.http_error_303(req, fp, code, msg, hdrs)`

The same as `http_error_301()`, but called for the 'see other' response.

### `HTTPRedirectHandler.http_error_307(req, fp, code, msg, hdrs)`

The same as `http_error_301()`, but called for the 'temporary redirect'
response. It does not allow changing the request method from `POST`
to `GET`.

### `HTTPRedirectHandler.http_error_308(req, fp, code, msg, hdrs)`

The same as `http_error_301()`, but called for the 'permanent redirect'
response. It does not allow changing the request method from `POST`
to `GET`.

> *Added in version 3.11.*

## HTTPCookieProcessor Objects

`HTTPCookieProcessor` instances have one attribute:

### `HTTPCookieProcessor.cookiejar`

The `http.cookiejar.CookieJar` in which cookies are stored.

## ProxyHandler Objects

### `ProxyHandler.<protocol>_open(request)`

The `ProxyHandler` will have a method `<protocol>_open()` for every
*protocol* which has a proxy in the *proxies* dictionary given in the
constructor.  The method will modify requests to go through the proxy, by
calling `request.set_proxy()`, and call the next handler in the chain to
actually execute the protocol.

## HTTPPasswordMgr Objects

These methods are available on `HTTPPasswordMgr` and
`HTTPPasswordMgrWithDefaultRealm` objects.

### `HTTPPasswordMgr.add_password(realm, uri, user, passwd)`

*uri* can be either a single URI, or a sequence of URIs. *realm*, *user* and
*passwd* must be strings. This causes `(user, passwd)` to be used as
authentication tokens when authentication for *realm* and a super-URI of any
of the given URIs is given. If a URI includes a scheme, its credentials only
match authentication URIs with the same scheme or no scheme. A URI without a
scheme matches authentication URIs with any scheme.

> *Changed in version 3.15.*
> Authentication credentials for URIs with a scheme are now scoped by
> that scheme.

### `HTTPPasswordMgr.find_user_password(realm, authuri)`

Get user/password for given realm and URI, if any.  This method will return
`(None, None)` if there is no matching user/password.

For `HTTPPasswordMgrWithDefaultRealm` objects, the realm `None` will be
searched if the given *realm* has no matching user/password.

## HTTPPasswordMgrWithPriorAuth Objects

This password <example-value> extends `HTTPPasswordMgrWithDefaultRealm` to support
tracking URIs for which authentication credentials <example-value> always be sent.

### `HTTPPasswordMgrWithPriorAuth.add_password(realm, uri, user, \`

```python
passwd, is_authenticated=False)
```

*realm*, *uri*, *user*, *passwd* are as for
`HTTPPasswordMgr.add_password()`.  *is_authenticated* sets the initial
value of the `is_authenticated` flag for the given URI or list of URIs.
If *is_authenticated* is specified as `True`, *realm* is ignored.

### `HTTPPasswordMgrWithPriorAuth.find_user_password(realm, authuri)`

Same as for `HTTPPasswordMgrWithDefaultRealm` objects

### `HTTPPasswordMgrWithPriorAuth.update_authenticated(self, uri, \`

```python
is_authenticated=False)
```

Update the `is_authenticated` flag for the given *uri* or list
of URIs.

### `HTTPPasswordMgrWithPriorAuth.is_authenticated(self, authuri)`

Returns the current state of the `is_authenticated` flag for
the given URI.

## AbstractBasicAuthHandler Objects

### `AbstractBasicAuthHandler.http_error_auth_reqed(authreq, host, req, headers)`

Handle an authentication request by getting a user/password pair, and re-trying
the request.  *authreq* should be the name of the header where the information
about the realm is included in the request, *host* specifies the URL and path to
authenticate for, *req* should be the (failed) `Request` object, and
*headers* should be the error headers.

*headers* must be a mapping-like object with case-insensitive lookup
that implements the `get_all()` method,
such as `email.message.Message` or `wsgiref.headers.Headers`.

*host* is either an authority (e.g. `"python.org"`) or a URL containing an
authority component (e.g. `"https://python.org/"`). In either case, the
authority must not contain a userinfo component (so, `"python.org"` and
`"python.org:80"` are fine, `"joe:user@example.com"` is not).

## HTTPBasicAuthHandler Objects

### `HTTPBasicAuthHandler.http_error_401(req, fp, code,  msg, hdrs)`

Retry the request with authentication information, if available.

## ProxyBasicAuthHandler Objects

### `ProxyBasicAuthHandler.http_error_407(req, fp, code,  msg, hdrs)`

Retry the request with authentication information, if available.

## AbstractDigestAuthHandler Objects

### `AbstractDigestAuthHandler.http_error_auth_reqed(authreq, host, req, headers)`

*authreq* should be the name of the header where the information about the realm
is included in the request, *host* should be the host to authenticate to, *req*
should be the (failed) `Request` object, and *headers* should be the
error headers.

*headers* must be a mapping-like object with case-insensitive lookup,
such as `email.message.Message` or `wsgiref.headers.Headers`.

## HTTPDigestAuthHandler Objects

### `HTTPDigestAuthHandler.http_error_401(req, fp, code,  msg, hdrs)`

Retry the request with authentication information, if available.

## ProxyDigestAuthHandler Objects

### `ProxyDigestAuthHandler.http_error_407(req, fp, code,  msg, hdrs)`

Retry the request with authentication information, if available.

## HTTPHandler Objects

### `HTTPHandler.http_open(req)`

Send an HTTP request, which can be either GET or POST, depending on
`req.data`.

## HTTPSHandler Objects

### `HTTPSHandler.https_open(req)`

Send an HTTPS request, which can be either GET or POST, depending on
`req.data`.

## FileHandler Objects

### `FileHandler.file_open(req)`

Open the file locally, if there is no host name, or the host name is
`'localhost'`.

> *Changed in version 3.2.*
> This method is applicable only for local hostnames.  When a remote
> hostname is given, a `URLError` is raised.

## DataHandler Objects

### `DataHandler.data_open(req)`

Read a data URL. This kind of URL contains the content encoded in the URL
itself. The data URL syntax is specified in RFC 2397. This implementation
ignores white spaces in base64 encoded data URLs so the URL may be wrapped
in whatever source file it comes from. But even though some browsers don't
mind about a missing padding at the end of a base64 encoded data URL, this
implementation will raise a `ValueError` in that case.

## FTPHandler Objects

### `FTPHandler.ftp_open(req)`

Open the FTP file indicated by *req*. The login is always done with empty
username and password.

## CacheFTPHandler Objects

`CacheFTPHandler` objects are `FTPHandler` objects with the
following additional methods:

### `CacheFTPHandler.setTimeout(t)`

Set timeout of connections to *t* seconds.

### `CacheFTPHandler.setMaxConns(m)`

Set maximum number of cached connections to *m*.

## UnknownHandler Objects

### `UnknownHandler.unknown_open()`

Raise a `URLError` exception.

## HTTPErrorProcessor Objects

### `HTTPErrorProcessor.http_response(request, response)`

Process HTTP error responses.

For 200 error codes, the response object is returned immediately.

For non-200 error codes, this simply passes the job on to the
`http_error_\()` handler methods, via `OpenerDirector.error()`.
Eventually, `HTTPDefaultErrorHandler` will raise an
`HTTPError` if no other handler handles the error.

### `HTTPErrorProcessor.https_response(request, response)`

Process HTTPS error responses.

The behavior is same as `http_response()`.
