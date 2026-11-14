---
title: "HOWTO Fetch Internet Resources Using The urllib Package (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/urllib2.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# HOWTO Fetch Internet Resources Using The urllib Package (part 2 of 2)

## Basic <example-value>

To illustrate creating and installing a handler we will use the
`HTTPBasicAuthHandler`. For a more detailed discussion of this subject --
including an explanation of how Basic <example-value> works - see the `Basic
Authentication Tutorial
<https://web.archive.org/web/20201215133350/http://www.voidspace.org.uk/python/articles/authentication.shtml>`__.

When authentication is required, the server sends a header (as well as the 401
error code) requesting authentication.  This specifies the authentication scheme
and a 'realm'. The header looks like: ``WWW-Authenticate: SCHEME
realm="REALM"``.

e.g.

```none
WWW-Authenticate: Basic <example-value>"cPanel Users"
```

The client should then retry the request with the appropriate name and password
for the realm included as a header in the request. This is 'basic
authentication'. In order to simplify this process we can create an instance of
`HTTPBasicAuthHandler` and an opener to use this handler.

The `HTTPBasicAuthHandler` uses an object called a password <example-value> to handle
the mapping of URLs and realms to passwords and usernames. If you know what the
realm is (from the authentication header sent by the server), then you can use a
`HTTPPasswordMgr`. Frequently one doesn't care what the realm is. In that
case, it is convenient to use `HTTPPasswordMgrWithDefaultRealm`. This allows
you to specify a default username and password for a URL. This will be supplied
in the absence of you providing an alternative combination for a specific
realm. We indicate this by providing `None` as the realm argument to the
`add_password` method.

The top-level URL is the first URL that requires authentication. URLs "deeper"
than the URL you pass to .add_password() will also match.:

```
# create a password <example-value>
password_mgr = urllib.request.HTTPPasswordMgrWithDefaultRealm()

# Add the username and password.
# If we knew the realm, we could use it instead of None.
top_level_url = "http://example.com/foo/"
password_mgr.add_password(None, top_level_url, username, password)

handler = urllib.request.HTTPBasicAuthHandler(password_mgr)

# create "opener" (OpenerDirector instance)
opener = urllib.request.build_opener(handler)

# use the opener to fetch a URL
opener.open(a_url)

# Install the opener.
# Now all calls to urllib.request.urlopen use our opener.
urllib.request.install_opener(opener)
```

> **Note:** In the above example we only supplied our `HTTPBasicAuthHandler` to
> `build_opener`. By default openers have the handlers for normal situations
> -- `ProxyHandler` (if a proxy setting such as an `http_proxy`
> environment variable is set), `UnknownHandler`, `HTTPHandler`,
> `HTTPDefaultErrorHandler`, `HTTPRedirectHandler`, `FTPHandler`,
> `FileHandler`, `DataHandler`, `HTTPErrorProcessor`.

`top_level_url` is in fact *either* a full URL (including the 'http:' scheme
component and the hostname and optionally the port number)
e.g. `"http://example.com/"` *or* an "authority" (i.e. the hostname,
optionally including the port number) e.g. `"example.com"` or `"example.com:8080"`
(the latter example includes a port number).  The authority, if present, must
NOT contain the "userinfo" component - for example `"joe:user@example.com"` is
not correct.

## Proxies

**urllib** will auto-detect your proxy settings and use those. This is through
the `ProxyHandler`, which is part of the normal handler chain when a proxy
setting is detected.  Normally that's a good thing, but there are occasions
when it may not be helpful. One way to do this is to setup our own
`ProxyHandler`, with no proxies defined. This is done using similar steps to
setting up a Basic <example-value> handler::

```
>>> proxy_support = urllib.request.ProxyHandler({})
>>> opener = urllib.request.build_opener(proxy_support)
>>> urllib.request.install_opener(opener)
```

> **Note:** Currently `urllib.request` *does not* support fetching of `https` locations
> through a proxy.  However, this can be enabled by extending urllib.request as
> shown in the recipe.

> **Note:** `HTTP_PROXY` will be ignored if a variable `REQUEST_METHOD` is set; see
> the documentation on `getproxies()`.

## Sockets and Layers

The Python support for fetching resources from the web is layered.  urllib uses
the `http.client` library, which in turn uses the socket library.

As of Python 2.3 you can specify how long a socket should wait for a response
before timing out. This can be useful in applications which have to fetch web
pages. By default the socket module has *no timeout* and can hang. Currently,
the socket timeout is not exposed at the http.client or urllib.request levels.
However, you can set the default timeout globally for all sockets using:

```
import socket
import urllib.request

# timeout in seconds
timeout = 10
socket.setdefaulttimeout(timeout)

# this call to urllib.request.urlopen now uses the default timeout
# we have set in the socket module
req = urllib.request.Request('http://www.voidspace.org.uk')
response = urllib.request.urlopen(req)
```

## Footnotes

This document was reviewed and revised by John Lee.
