---
title: "urllib.request --- Extensible library for opening URLs (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/urllib.request.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# urllib.request --- Extensible library for opening URLs (part 4 of 4)

## Examples

In addition to the examples below, more examples are given in
urllib-howto.

This example gets the python.org main page and displays the first 300 bytes of
it:

```
>>> import urllib.request
>>> with urllib.request.urlopen('https://www.python.org/') as f:
...     # The response may be compressed (for example, 'gzip').
...     print(f.headers.get('Content-Encoding'))
...     data = f.read()
...     if f.headers.get('Content-Encoding') == 'gzip':
...         import gzip
...         data = gzip.decompress(data)
...     print(data[:300].decode('utf-8', errors='replace'))
```

Note that urlopen returns a bytes object.  This is because there is no way
for urlopen to automatically determine the encoding of the byte stream
it receives from the HTTP server. In general, a program will decode
the returned bytes object to string once it determines or guesses
the appropriate encoding.

The following HTML spec document, https://html.spec.whatwg.org/#charset, lists
the various ways in which an HTML or an XML document could have specified its
encoding information.

For additional information, see the W3C document: https://www.w3.org/International/questions/qa-html-encoding-declarations.

As the python.org website uses *utf-8* encoding as specified in its meta tag, we
will use the same for decoding the bytes object:

```
>>> with urllib.request.urlopen('https://www.python.org/') as f:
...     # Check for compression and decode appropriately.
...     enc = f.headers.get('Content-Encoding')
...     data = f.read()
...     if enc == 'gzip':
...         import gzip
...         data = gzip.decompress(data)
...     print(data[:100].decode('utf-8', errors='replace'))
...
```

It is also possible to achieve the same result without using the
context manager approach:

```
>>> import urllib.request
>>> f = urllib.request.urlopen('https://www.python.org/')
>>> try:
...     enc = f.headers.get('Content-Encoding')
...     data = f.read()
...     if enc == 'gzip':
...         import gzip
...         data = gzip.decompress(data)
...     print(data[:100].decode('utf-8', errors='replace'))
... finally:
...     f.close()
```

In the following example, we are sending a data-stream to the stdin of a CGI
and reading the data it returns to us. Note that this example will only work
when the Python installation supports SSL.:

```
>>> import urllib.request
>>> req = urllib.request.Request(url='https://localhost/cgi-bin/test.cgi',
...                       data=b'This data is passed to stdin of the CGI')
>>> with urllib.request.urlopen(req) as f:
...     print(f.read().decode('utf-8'))
...
Got Data: "This data is passed to stdin of the CGI"
```

The code for the sample CGI used in the above example is:

```
#!/usr/bin/env python
import sys
data = sys.stdin.read()
print('Content-type: text/plain\n\nGot Data: "%s"' % data)
```

Here is an example of doing a `PUT` request using `Request`:

```
import urllib.request
DATA = b'some data'
req = urllib.request.Request(url='http://localhost:8080', data=DATA, method='PUT')
with urllib.request.urlopen(req) as f:
    pass
print(f.status)
print(f.reason)
```

Use of Basic HTTP Authentication:

```
import urllib.request
# Create an OpenerDirector with support for Basic HTTP Authentication...
auth_handler = urllib.request.HTTPBasicAuthHandler()
auth_handler.add_password(realm='<example-value>',
                          uri='https://mahler:8092/site-updates.py',
                          user='klem',
                          passwd='<example-value>')
opener = urllib.request.build_opener(auth_handler)
# ...and install it globally so it can be used with urlopen.
urllib.request.install_opener(opener)
with urllib.request.urlopen('http://www.example.com/login.html') as f:
    print(f.read().decode('utf-8'))
```

`build_opener()` provides many handlers by default, including a
`ProxyHandler`.  By default, `ProxyHandler` uses the environment
variables named `<scheme>_proxy`, where `<scheme>` is the URL scheme
involved.  For example, the `http_proxy` environment variable is read to
obtain the HTTP proxy's URL.

This example replaces the default `ProxyHandler` with one that uses
programmatically supplied proxy URLs, and adds proxy authorization support with
`ProxyBasicAuthHandler`.:

```
proxy_handler = urllib.request.ProxyHandler({'http': 'http://www.example.com:3128/'})
proxy_auth_handler = urllib.request.ProxyBasicAuthHandler()
proxy_auth_handler.add_password('<example-value>', '<example-value>', '<example-value>', '<example-value>')

opener = urllib.request.build_opener(proxy_handler, proxy_auth_handler)
# This time, rather than install the OpenerDirector, we use it directly:
with opener.open('http://www.example.com/login.html') as f:
   print(f.read().decode('utf-8'))
```

Adding HTTP headers:

Use the *headers* argument to the `Request` constructor, or:

```
import urllib.request
req = urllib.request.Request('http://www.example.com/')
req.add_header('Referer', 'https://www.python.org/')
# Customize the default User-Agent header value:
req.add_header('User-Agent', 'urllib-example/0.1 (Contact: . . .)')
with urllib.request.urlopen(req) as f:
    print(f.read().decode('utf-8'))
```

`OpenerDirector` automatically adds a User-Agent header to
every `Request`.  To change this:

```
import urllib.request
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
with opener.open('http://www.example.com/') as f:
   print(f.read().decode('utf-8'))
```

Also, remember that a few standard headers (Content-Length,
Content-Type and Host)
are added when the `Request` is passed to `urlopen()` (or
`OpenerDirector.open()`).

Here is an example session that uses the `GET` method to retrieve a URL
containing parameters:

```
>>> import urllib.request
>>> import urllib.parse
>>> params = urllib.parse.urlencode({'spam': 1, 'eggs': 2, 'bacon': 0})
>>> url = "https://www.python.org/?%s" % params
>>> with urllib.request.urlopen(url) as f:
...     print(f.read().decode('utf-8'))
...
```

The following example uses the `POST` method instead. Note that params output
from urlencode is encoded to bytes before it is sent to urlopen as data:

```
>>> import urllib.request
>>> import urllib.parse
>>> data = urllib.parse.urlencode({'spam': 1, 'eggs': 2, 'bacon': 0})
>>> data = data.encode('ascii')
>>> with urllib.request.urlopen("https://httpbin.org/post", data) as f:
...     print(f.read().decode('utf-8'))
...
```

The following example uses an explicitly specified HTTP proxy, overriding
environment settings:

```
>>> import urllib.request
>>> proxies = {'http': 'http://proxy.example.com:8080/'}
>>> opener = urllib.request.build_opener(urllib.request.ProxyHandler(proxies))
>>> with opener.open("https://www.python.org") as f:
...     f.read().decode('utf-8')
...
```

The following example uses no proxies at all, overriding environment settings:

```
>>> import urllib.request
>>> opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
>>> with opener.open("https://www.python.org/") as f:
...     f.read().decode('utf-8')
...
```

## Legacy interface

The following functions and classes are ported from the Python 2 module
`urllib` (as opposed to `urllib2`).  They might become deprecated at
some point in the future.

### `urlretrieve(url, filename=None, reporthook=None, data=None)`

Copy a network object denoted by a URL to a local file. If the URL
points to a local file, the object will not be copied unless filename is supplied.
Return a tuple `(filename, headers)` where *filename* is the
local file name under which the object can be found, and *headers* is whatever
the `info()` method of the object returned by `urlopen()` returned (for
a remote object). Exceptions are the same as for `urlopen()`.

The second argument, if present, specifies the file location to copy to (if
absent, the location will be a tempfile with a generated name). The third
argument, if present, is a callable that will be called once on
establishment of the network connection and once after each block read
thereafter.  The callable will be passed three arguments; a count of blocks
transferred so far, a block size in bytes, and the total size of the file.  The
third argument may be `-1` on older FTP servers which do not return a file
size in response to a retrieval request.

The following example illustrates the most common usage scenario:

```
>>> import urllib.request
>>> local_filename, headers = urllib.request.urlretrieve('https://python.org/')
>>> html = open(local_filename)
>>> html.close()
```

If the *url* uses the `http:` scheme identifier, the optional *data*
argument may be given to specify a `POST` request (normally the request
type is `GET`).  The *data* argument must be a bytes object in standard
application/x-www-form-urlencoded format; see the
`urllib.parse.urlencode()` function.

`urlretrieve()` will raise `ContentTooShortError` when it detects that
the amount of data available  was less than the expected amount (which is the
size reported by a  *Content-Length* header). This can occur, for example, when
the  download is interrupted.

The *Content-Length* is treated as a lower bound: if there's more data  to read,
urlretrieve reads more data, but if less data is available,  it raises the
exception.

You can still retrieve the downloaded data in this case, it is stored in the
`content` attribute of the exception instance.

If no *Content-Length* header was supplied, urlretrieve can not check the size
of the data it has downloaded, and just returns it.  In this case you just have
to assume that the download was successful.

### `urlcleanup()`

Cleans up temporary files that may have been left behind by previous
calls to `urlretrieve()`.  It also resets the default global opener
installed by `install_opener()`.

## `urllib.request` Restrictions

- Currently, only the following protocols are supported: HTTP (versions 0.9 and
1.0), FTP, local files, and data URLs.

> *Changed in version 3.4.*

- The caching feature of `urlretrieve()` has been disabled until someone
finds the time to hack proper processing of Expiration time headers.

- There should be a function to query whether a particular URL is in the cache.

- For backward compatibility, if a URL appears to point to a local file but the
file can't be opened, the URL is re-interpreted using the FTP protocol.  This
can sometimes cause confusing error messages.

- The `urlopen()` and `urlretrieve()` functions can cause arbitrarily
long delays while waiting for a network connection to be set up.  This means
that it is difficult to build an interactive web client using these functions
without using threads.

- The data returned by `urlopen()` or `urlretrieve()` is the raw data
returned by the server.  This may be binary data (such as an image), plain text
or (for example) HTML.  The HTTP protocol provides type information in the reply
header, which can be inspected by looking at the Content-Type
header.  If the returned data is HTML, you can use the module
`html.parser` to parse it.

- The code handling the FTP protocol cannot differentiate between a file and a
directory.  This can lead to unexpected behavior when attempting to read a URL
that points to a file that is not accessible.  If the URL ends in a `/`, it is
assumed to refer to a directory and will be handled accordingly.  But if an
attempt to read a file leads to a 550 error (meaning the URL cannot be found or
is not accessible, often for permission reasons), then the path is treated as a
directory in order to handle the case when a directory is specified by a URL but
the trailing `/` has been left off.  This can cause misleading results when
you try to fetch a file whose read permissions make it inaccessible; the FTP
code will try to read it, fail with a 550 error, and then perform a directory
listing for the unreadable file. If fine-grained control is needed, consider
using the `ftplib` module.

# `urllib.response` --- Response classes used by urllib

Module `urllib.response`.

The `urllib.response` module defines functions and classes which define a
minimal file-like interface, including `read()` and `readline()`.
Functions defined by this module are used internally by the `urllib.request` module.
The typical response object is a `urllib.response.addinfourl` instance:

### `url`

URL of the resource retrieved, commonly used to determine if a redirect was followed.

### `headers`

Returns the headers of the response in the form of an `EmailMessage` instance.

### `status`

> *Added in version 3.9.*

Status code returned by server.

### `geturl()`

> *Deprecated since version 3.9.*
> Deprecated in favor of `url`.

### `info()`

> *Deprecated since version 3.9.*
> Deprecated in favor of `headers`.

### `code`

> *Deprecated since version 3.9.*
> Deprecated in favor of `status`.

### `getcode()`

> *Deprecated since version 3.9.*
> Deprecated in favor of `status`.
