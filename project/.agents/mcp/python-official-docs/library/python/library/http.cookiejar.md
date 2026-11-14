---
title: "http.cookiejar --- Cookie handling for HTTP clients (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/http.cookiejar.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `http.cookiejar` --- Cookie handling for HTTP clients

Module `http.cookiejar`.

**Source code:** Lib/http/cookiejar.py

The `http.cookiejar` module defines classes for automatic handling of HTTP
cookies.  It is useful for accessing websites that require small pieces of data
-- cookies -- to be set on the client machine by an HTTP response from a
web server, and then returned to the server in later HTTP requests.

Both the regular Netscape cookie protocol and the protocol defined by
RFC 2965 are handled.  RFC 2965 handling is switched off by default.
RFC 2109 cookies are parsed as Netscape cookies and subsequently treated
either as Netscape or RFC 2965 cookies according to the 'policy' in effect.
Note that the great majority of cookies on the internet are Netscape cookies.
`http.cookiejar` attempts to follow the de-facto Netscape cookie protocol (which
differs substantially from that set out in the original Netscape specification),
including taking note of the `max-age` and `port` cookie-attributes
introduced with RFC 2965.

> **Note:** The various named parameters found in Set-Cookie and
> Set-Cookie2 headers (for example, `domain` and `expires`) are
> conventionally referred to as attributes.  To distinguish them from
> Python attributes, the documentation for this module uses the term
> cookie-attribute instead.

The module defines the following exception:

### exception `LoadError`

Instances of `FileCookieJar` raise this exception on failure to load
cookies from a file.  `LoadError` is a subclass of `OSError`.

> *Changed in version 3.3.*
> `LoadError` used to be a subtype of `IOError`, which is now an
> alias of `OSError`.

The following classes are provided:

### class `CookieJar(policy=None)`

*policy* is an object implementing the `CookiePolicy` interface.

The `CookieJar` class stores HTTP cookies.  It extracts cookies from HTTP
requests, and returns them in HTTP responses. `CookieJar` instances
automatically expire contained cookies when necessary.  Subclasses are also
responsible for storing and retrieving cookies from a file or database.

### class `FileCookieJar(filename=None, delayload=None, policy=None)`

*policy* is an object implementing the `CookiePolicy` interface.  For the
other arguments, see the documentation for the corresponding attributes.

A `CookieJar` which can load cookies from, and perhaps save cookies to, a
file on disk.  Cookies are **NOT** loaded from the named file until either the
`load()` or `revert()` method is called.  Subclasses of this class are
documented in section file-cookie-jar-classes.

This should not be initialized directly – use its subclasses below instead.

> *Changed in version 3.8.*
> The filename parameter supports a path-like object.

### class `CookiePolicy()`

This class is responsible for deciding whether each cookie should be accepted
from / returned to the server.

### class `DefaultCookiePolicy( blocked_domains=None, allowed_domains=None, netscape=True, rfc2965=False, rfc2109_as_netscape=None, hide_cookie2=False, strict_domain=False, strict_rfc2965_unverifiable=True, strict_ns_unverifiable=False, strict_ns_domain=DefaultCookiePolicy.DomainLiberal, strict_ns_set_initial_dollar=False, strict_ns_set_path=False, secure_protocols=("https", "wss") )`

Constructor arguments should be passed as keyword arguments only.
*blocked_domains* is a sequence of domain names that we never accept cookies
from, nor return cookies to. *allowed_domains* if not `None`, this is a
sequence of the only domains for which we accept and return cookies.
*secure_protocols* is a sequence of protocols for which secure cookies can be
added to. By default *https* and *wss* (secure websocket) are considered
secure protocols. For all other arguments, see the documentation for
`CookiePolicy` and `DefaultCookiePolicy` objects.

`DefaultCookiePolicy` implements the standard accept / reject rules for
Netscape and RFC 2965 cookies.  By default, RFC 2109 cookies (that is, cookies
received in a Set-Cookie header with a version cookie-attribute of
1) are treated according to the RFC 2965 rules.  However, if RFC 2965 handling
is turned off or `rfc2109_as_netscape` is `True`, RFC 2109 cookies are
'downgraded' by the `CookieJar` instance to Netscape cookies, by
setting the `version` attribute of the `Cookie` instance to 0.
`DefaultCookiePolicy` also provides some parameters to allow some
fine-tuning of policy.

### class `Cookie()`

This class represents Netscape, RFC 2109 and RFC 2965 cookies.  It is not
expected that users of `http.cookiejar` construct their own `Cookie`
instances.  Instead, if necessary, call `make_cookies()` on a
`CookieJar` instance.

> **See also:** Module `urllib.request`
> URL opening with automatic cookie handling.
>
> Module `http.cookies`
> HTTP cookie classes, principally useful for server-side code.  The
> `http.cookiejar` and `http.cookies` modules do not depend on each
> other.
>
> https://curl.se/rfc/cookie_spec.html
> The specification of the original Netscape cookie protocol.  Though this is
> still the dominant protocol, the 'Netscape cookie protocol' implemented by all
> the major browsers (and `http.cookiejar`) only bears a passing resemblance to
> the one sketched out in `cookie_spec.html`.
>
> RFC 2109 - HTTP State Management Mechanism
> Obsoleted by RFC 2965. Uses Set-Cookie with version=1.
>
> RFC 2965 - HTTP State Management Mechanism
> The Netscape protocol with the bugs fixed.  Uses Set-Cookie2 in
> place of Set-Cookie.  Not widely used.
>
> https://kristol.org/cookie/errata.html
> Unfinished errata to RFC 2965.
>
> RFC 2964 - Use of HTTP State Management

## CookieJar and FileCookieJar objects

`CookieJar` objects support the iterator protocol for iterating over
contained `Cookie` objects.

`CookieJar` has the following methods:

### `CookieJar.add_cookie_header(request)`

Add correct Cookie header to *request*.

If policy allows (that is, the `rfc2965` and
`hide_cookie2` attributes of
the `CookieJar`'s `CookiePolicy` instance are true and false
respectively), the Cookie2 header is also added when appropriate.

The *request* object (usually a `urllib.request.Request` instance)
must support the methods `get_full_url()`,
`has_header()`,
`get_header()`,
`header_items()`,
`add_unredirected_header()`
and the attributes `host`,
`type`, `unverifiable`
and `origin_req_host` as documented by
`urllib.request`.

> *Changed in version 3.3.*
> *request* object needs `origin_req_host`
> attribute. Dependency on a deprecated method
> `get_origin_req_host()` has been removed.

### `CookieJar.extract_cookies(response, request)`

Extract cookies from HTTP *response* and store them in the `CookieJar`,
where allowed by policy.

The `CookieJar` will look for allowable Set-Cookie and
Set-Cookie2 headers in the *response* argument, and store cookies
as appropriate (subject to the `CookiePolicy.set_ok()` method's approval).

The *response* object (usually the result of a call to
`urllib.request.urlopen()`, or similar) should support an
`info()` method, which returns an
`email.message.Message` instance.

The *request* object (usually a `urllib.request.Request` instance)
must support the method `get_full_url()` and
the attributes `host`,
`unverifiable`
and `origin_req_host`,
as documented by `urllib.request`.  The request is used to set
default values for cookie-attributes as well as for checking that the
cookie is allowed to be set.

> *Changed in version 3.3.*
> *request* object needs `origin_req_host`
> attribute. Dependency on a deprecated method
> `get_origin_req_host()` has been removed.

### `CookieJar.set_policy(policy)`

Set the `CookiePolicy` instance to be used.

### `CookieJar.make_cookies(response, request)`

Return sequence of `Cookie` objects extracted from *response* object.

See the documentation for `extract_cookies()` for the interfaces required of
the *response* and *request* arguments.

### `CookieJar.set_cookie_if_ok(cookie, request)`

Set a `Cookie` if policy says it's OK to do so.

### `CookieJar.set_cookie(cookie)`

Set a `Cookie`, without checking with policy to see whether or not it
should be set.

### `CookieJar.clear([domain[, path[, name]]])`

Clear some cookies.

If invoked without arguments, clear all cookies.  If given a single argument,
only cookies belonging to that *domain* will be removed. If given two arguments,
cookies belonging to the specified *domain* and URL *path* are removed.  If
given three arguments, then the cookie with the specified *domain*, *path* and
*name* is removed.

Raises `KeyError` if no matching cookie exists.

### `CookieJar.clear_session_cookies()`

Discard all session cookies.

Discards all contained cookies that have a true `discard` attribute
(usually because they had either no `max-age` or `expires` cookie-attribute,
or an explicit `discard` cookie-attribute).  For interactive browsers, the end
of a session usually corresponds to closing the browser window.

Note that the `save()` method won't save session cookies
anyway, unless you ask otherwise by passing a true *ignore_discard* argument.

`FileCookieJar` implements the following additional methods:

### `FileCookieJar.save(filename=None, ignore_discard=False, ignore_expires=False)`

Save cookies to a file.

This base class raises `NotImplementedError`.  Subclasses may leave this
method unimplemented.

*filename* is the name of file in which to save cookies.  If *filename* is not
specified, `self.filename` is used (whose
default is the value passed to the constructor, if any); if
`self.filename` is `None`,
`ValueError` is raised.

*ignore_discard*: save even cookies set to be discarded. *ignore_expires*: save
even cookies that have expired

The file is overwritten if it already exists, thus wiping all the cookies it
contains.  Saved cookies can be restored later using the `load()` or
`revert()` methods.

### `FileCookieJar.load(filename=None, ignore_discard=False, ignore_expires=False)`

Load cookies from a file.

Old cookies are kept unless overwritten by newly loaded ones.

Arguments are as for `save()`.

The named file must be in the format understood by the class, or
`LoadError` will be raised.  Also, `OSError` may be raised, for
example if the file does not exist.

> *Changed in version 3.3.*
> `IOError` used to be raised, it is now an alias of `OSError`.

### `FileCookieJar.revert(filename=None, ignore_discard=False, ignore_expires=False)`

Clear all cookies and reload cookies from a saved file.

`revert()` can raise the same exceptions as `load()`. If there is a
failure, the object's state will not be altered.

`FileCookieJar` instances have the following public attributes:

### `FileCookieJar.filename`

Filename of default file in which to keep cookies.  This attribute may be
assigned to.

### `FileCookieJar.delayload`

If true, load cookies lazily from disk.  This attribute should not be assigned
to.  This is only a hint, since this only affects performance, not behaviour
(unless the cookies on disk are changing). A `CookieJar` object may
ignore it.  None of the `FileCookieJar` classes included in the standard
library lazily loads cookies.

## FileCookieJar subclasses and co-operation with web browsers

The following `CookieJar` subclasses are provided for reading and
writing.

### class `MozillaCookieJar(filename=None, delayload=None, policy=None)`

A `FileCookieJar` that can load from and save cookies to disk in the
Mozilla `cookies.txt` file format (which is also used by curl and the Lynx
and Netscape browsers).

> **Note:** This loses information about RFC 2965 cookies, and also about newer or
> non-standard cookie-attributes such as `port`.

> **Warning:** Back up your cookies before saving if you have cookies whose loss / corruption
> would be inconvenient (there are some subtleties which may lead to slight
> changes in the file over a load / save round-trip).

Also note that cookies saved while Mozilla is running will get clobbered by
Mozilla.

### class `LWPCookieJar(filename=None, delayload=None, policy=None)`

A `FileCookieJar` that can load from and save cookies to disk in format
compatible with the libwww-perl library's `Set-Cookie3` file format.  This is
convenient if you want to store cookies in a human-readable file.

> *Changed in version 3.8.*
> The filename parameter supports a path-like object.
