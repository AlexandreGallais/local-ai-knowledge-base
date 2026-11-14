---
title: "http.cookiejar --- Cookie handling for HTTP clients (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/http.cookiejar.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# http.cookiejar --- Cookie handling for HTTP clients (part 2 of 2)

## CookiePolicy objects

Objects implementing the `CookiePolicy` interface have the following
methods:

### `CookiePolicy.set_ok(cookie, request)`

Return boolean value indicating whether cookie should be accepted from server.

*cookie* is a `Cookie` instance.  *request* is an object
implementing the interface defined by the documentation for
`CookieJar.extract_cookies()`.

### `CookiePolicy.return_ok(cookie, request)`

Return boolean value indicating whether cookie should be returned to server.

*cookie* is a `Cookie` instance.  *request* is an object
implementing the interface defined by the documentation for
`CookieJar.add_cookie_header()`.

### `CookiePolicy.domain_return_ok(domain, request)`

Return `False` if cookies should not be returned, given cookie domain.

This method is an optimization.  It removes the need for checking every cookie
with a particular domain (which might involve reading many files).  Returning
true from `domain_return_ok()` and `path_return_ok()` leaves all the
work to `return_ok()`.

If `domain_return_ok()` returns true for the cookie domain,
`path_return_ok()` is called for the cookie path.  Otherwise,
`path_return_ok()` and `return_ok()` are never called for that cookie
domain.  If `path_return_ok()` returns true, `return_ok()` is called
with the `Cookie` object itself for a full check.  Otherwise,
`return_ok()` is never called for that cookie path.

Note that `domain_return_ok()` is called for every *cookie* domain, not just
for the *request* domain.  For example, the function might be called with both
`".example.com"` and `"www.example.com"` if the request domain is
`"www.example.com"`.  The same goes for `path_return_ok()`.

The *request* argument is as documented for `return_ok()`.

### `CookiePolicy.path_return_ok(path, request)`

Return `False` if cookies should not be returned, given cookie path.

See the documentation for `domain_return_ok()`.

In addition to implementing the methods above, implementations of the
`CookiePolicy` interface must also supply the following attributes,
indicating which protocols should be used, and how.  All of these attributes may
be assigned to.

### `CookiePolicy.netscape`

Implement Netscape protocol.

### `CookiePolicy.rfc2965`

Implement RFC 2965 protocol.

### `CookiePolicy.hide_cookie2`

Don't add Cookie2 header to requests (the presence of this header
indicates to the server that we understand RFC 2965 cookies).

The most useful way to define a `CookiePolicy` class is by subclassing
from `DefaultCookiePolicy` and overriding some or all of the methods
above.  `CookiePolicy` itself may be used as a 'null policy' to allow
setting and receiving any and all cookies (this is unlikely to be useful).

## DefaultCookiePolicy objects

Implements the standard rules for accepting and returning cookies.

Both RFC 2965 and Netscape cookies are covered.  RFC 2965 handling is switched
off by default.

The easiest way to provide your own policy is to override this class and call
its methods in your overridden implementations before adding your own additional
checks:

```
import http.cookiejar
class MyCookiePolicy(http.cookiejar.DefaultCookiePolicy):
    def set_ok(self, cookie, request):
        if not http.cookiejar.DefaultCookiePolicy.set_ok(self, cookie, request):
            return False
        if i_dont_want_to_store_this_cookie(cookie):
            return False
        return True
```

In addition to the features required to implement the `CookiePolicy`
interface, this class allows you to block and allow domains from setting and
receiving cookies.  There are also some strictness switches that allow you to
tighten up the rather loose Netscape protocol rules a little bit (at the cost of
blocking some benign cookies).

A domain blocklist and allowlist is provided (both off by default). Only domains
not in the blocklist and present in the allowlist (if the allowlist is active)
participate in cookie setting and returning.  Use the *blocked_domains*
constructor argument, and `blocked_domains()` and
`set_blocked_domains()` methods (and the corresponding
argument and methods for *allowed_domains*).  If you set an allowlist, you can
turn it off again by setting it to `None`.

Domains in block or allow lists that do not start with a dot must equal the
cookie domain to be matched.  For example, `"example.com"` matches a blocklist
entry of `"example.com"`, but `"www.example.com"` does not.  Domains that do
start with a dot are matched by more specific domains too. For example, both
`"www.example.com"` and `"www.coyote.example.com"` match `".example.com"`
(but `"example.com"` itself does not).  IP addresses are an exception, and
must match exactly.  For example, if blocked_domains contains `"192.168.1.2"`
and `".168.1.2"`, 192.168.1.2 is blocked, but 193.168.1.2 is not.

`DefaultCookiePolicy` implements the following additional methods:

### `DefaultCookiePolicy.blocked_domains()`

Return the sequence of blocked domains (as a tuple).

### `DefaultCookiePolicy.set_blocked_domains(blocked_domains)`

Set the sequence of blocked domains.

### `DefaultCookiePolicy.is_blocked(domain)`

Return `True` if *domain* is on the blocklist for setting or receiving
cookies.

### `DefaultCookiePolicy.allowed_domains()`

Return `None`, or the sequence of allowed domains (as a tuple).

### `DefaultCookiePolicy.set_allowed_domains(allowed_domains)`

Set the sequence of allowed domains, or `None`.

### `DefaultCookiePolicy.is_not_allowed(domain)`

Return `True` if *domain* is not on the allowlist for setting or receiving
cookies.

`DefaultCookiePolicy` instances have the following attributes, which are
all initialised from the constructor arguments of the same name, and which may
all be assigned to.

### `DefaultCookiePolicy.rfc2109_as_netscape`

If true, request that the `CookieJar` instance downgrade RFC 2109 cookies
(that is, cookies received in a Set-Cookie header with a version
cookie-attribute of 1) to Netscape cookies by setting the version attribute of
the `Cookie` instance to 0.  The default value is `None`, in which
case RFC 2109 cookies are downgraded if and only if RFC 2965 handling is turned
off.  Therefore, RFC 2109 cookies are downgraded by default.

General strictness switches:

### `DefaultCookiePolicy.strict_domain`

Don't allow sites to set two-component domains with country-code top-level
domains like `.co.uk`, `.gov.uk`, `.co.nz`.etc.  This is far from perfect
and isn't guaranteed to work!

RFC 2965 protocol strictness switches:

### `DefaultCookiePolicy.strict_rfc2965_unverifiable`

Follow RFC 2965 rules on unverifiable transactions (usually, an unverifiable
transaction is one resulting from a redirect or a request for an image hosted on
another site).  If this is false, cookies are *never* blocked on the basis of
verifiability

Netscape protocol strictness switches:

### `DefaultCookiePolicy.strict_ns_unverifiable`

Apply RFC 2965 rules on unverifiable transactions even to Netscape cookies.

### `DefaultCookiePolicy.strict_ns_domain`

Flags indicating how strict to be with domain-matching rules for Netscape
cookies.  See below for acceptable values.

### `DefaultCookiePolicy.strict_ns_set_initial_dollar`

Ignore cookies in Set-Cookie: headers that have names starting with `'$'`.

### `DefaultCookiePolicy.strict_ns_set_path`

Don't allow setting cookies whose path doesn't path-match request URI.

`strict_ns_domain` is a collection of flags.  Its value is constructed by
or-ing together (for example, `DomainStrictNoDots|DomainStrictNonDomain` means
both flags are set).

### `DefaultCookiePolicy.DomainStrictNoDots`

When setting cookies, the 'host prefix' must not contain a dot (for example,
`www.foo.bar.com` can't set a cookie for `.bar.com`, because `www.foo`
contains a dot).

### `DefaultCookiePolicy.DomainStrictNonDomain`

Cookies that did not explicitly specify a `domain` cookie-attribute can only
be returned to a domain equal to the domain that set the cookie (for example,
`spam.example.com` won't be returned cookies from `example.com` that had no
`domain` cookie-attribute).

### `DefaultCookiePolicy.DomainRFC2965Match`

When setting cookies, require a full RFC 2965 domain-match.

The following attributes are provided for convenience, and are the most useful
combinations of the above flags:

### `DefaultCookiePolicy.DomainLiberal`

Equivalent to 0 (that is, all of the above Netscape domain strictness flags switched
off).

### `DefaultCookiePolicy.DomainStrict`

Equivalent to `DomainStrictNoDots|DomainStrictNonDomain`.

## Cookie objects

`Cookie` instances have Python attributes roughly corresponding to the
standard cookie-attributes specified in the various cookie standards.  The
correspondence is not one-to-one, because there are complicated rules for
assigning default values, because the `max-age` and `expires`
cookie-attributes contain equivalent information, and because RFC 2109 cookies
may be 'downgraded' by `http.cookiejar` from version 1 to version 0 (Netscape)
cookies.

Assignment to these attributes should not be necessary other than in rare
circumstances in a `CookiePolicy` method.  The class does not enforce
internal consistency, so you should know what you're doing if you do that.

### `Cookie.version`

Integer or `None`.  Netscape cookies have `version` 0. RFC 2965 and
RFC 2109 cookies have a `version` cookie-attribute of 1.  However, note that
`http.cookiejar` may 'downgrade' RFC 2109 cookies to Netscape cookies, in which
case `version` is 0.

### `Cookie.name`

Cookie name (a string).

### `Cookie.value`

Cookie value (a string), or `None`.

### `Cookie.port`

String representing a port or a set of ports (for example, '80', or '80,8080'), or
`None`.

### `Cookie.domain`

Cookie domain (a string).

### `Cookie.path`

Cookie path (a string, for example, `'/acme/rocket_launchers'`).

### `Cookie.secure`

`True` if cookie should only be returned over a secure connection.

### `Cookie.expires`

Integer expiry date in seconds since epoch, or `None`.  See also the
`is_expired()` method.

### `Cookie.discard`

`True` if this is a session cookie.

### `Cookie.comment`

String comment from the server explaining the function of this cookie, or
`None`.

### `Cookie.comment_url`

URL linking to a comment from the server explaining the function of this cookie,
or `None`.

### `Cookie.rfc2109`

`True` if this cookie was received as an RFC 2109 cookie (that is, the cookie
arrived in a Set-Cookie header, and the value of the Version
cookie-attribute in that header was 1).  This attribute is provided because
`http.cookiejar` may 'downgrade' RFC 2109 cookies to Netscape cookies, in
which case `version` is 0.

### `Cookie.port_specified`

`True` if a port or set of ports was explicitly specified by the server (in the
Set-Cookie / Set-Cookie2 header).

### `Cookie.domain_specified`

`True` if a domain was explicitly specified by the server.

### `Cookie.domain_initial_dot`

`True` if the domain explicitly specified by the server began with a dot
(`'.'`).

Cookies may have additional non-standard cookie-attributes.  These may be
accessed using the following methods:

### `Cookie.has_nonstandard_attr(name)`

Return `True` if cookie has the named cookie-attribute.

### `Cookie.get_nonstandard_attr(name, default=None)`

If cookie has the named cookie-attribute, return its value. Otherwise, return
*default*.

### `Cookie.set_nonstandard_attr(name, value)`

Set the value of the named cookie-attribute.

The `Cookie` class also defines the following method:

### `Cookie.is_expired(now=None)`

`True` if cookie has passed the time at which the server requested it should
expire.  If *now* is given (in seconds since the epoch), return whether the
cookie has expired at the specified time.

## Examples

The first example shows the most common usage of `http.cookiejar`:

```
import http.cookiejar, urllib.request
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
r = opener.open("http://example.com/")
```

This example illustrates how to open a URL using your Netscape, Mozilla, or Lynx
cookies (assumes Unix/Netscape convention for location of the cookies file):

```
import os, http.cookiejar, urllib.request
cj = http.cookiejar.MozillaCookieJar()
cj.load(os.path.join(os.path.expanduser("~"), ".netscape", "cookies.txt"))
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
r = opener.open("http://example.com/")
```

The next example illustrates the use of `DefaultCookiePolicy`. Turn on
RFC 2965 cookies, be more strict about domains when setting and returning
Netscape cookies, and block some domains from setting cookies or having them
returned:

```
import urllib.request
from http.cookiejar import CookieJar, DefaultCookiePolicy
policy = DefaultCookiePolicy(
    rfc2965=True, strict_ns_domain=Policy.DomainStrict,
    blocked_domains=["ads.net", ".ads.net"])
cj = CookieJar(policy)
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
r = opener.open("http://example.com/")
```
