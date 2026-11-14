---
title: "wsgiref --- WSGI Utilities and Reference Implementation (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/wsgiref.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `wsgiref` --- WSGI Utilities and Reference Implementation

Module `wsgiref`.

**Source code:** Lib/wsgiref

> **Warning:** `wsgiref` is a reference implementation and is not recommended for
> production. The module only implements basic <example-value> checks.

The Web Server Gateway Interface (WSGI) is a standard interface between web
server software and web applications written in Python. Having a standard
interface makes it easy to use an application that supports WSGI with a number
of different web servers.

Only authors of web servers and programming frameworks need to know every detail
and corner case of the WSGI design.  You don't need to understand every detail
of WSGI just to install a WSGI application or to write a web application using
an existing framework.

`wsgiref` is a reference implementation of the WSGI specification that can
be used to add WSGI support to a web server or framework.  It provides utilities
for manipulating WSGI environment variables and response headers, base classes
for implementing WSGI servers, a demo HTTP server that serves WSGI applications,
types for static type checking,
and a validation tool that checks WSGI servers and applications for conformance
to the WSGI specification (PEP 3333).

See wsgi.readthedocs.io for more information about WSGI, and links
to tutorials and other resources.

## `wsgiref.util` -- WSGI environment utilities

Module `wsgiref.util`.

This module provides a variety of utility functions for working with WSGI
environments.  A WSGI environment is a dictionary containing HTTP request
variables as described in PEP 3333.  All of the functions taking an *environ*
parameter expect a WSGI-compliant dictionary to be supplied; please see
PEP 3333 for a detailed specification and
`WSGIEnvironment` for a type alias that can be used
in type annotations.

### `guess_scheme(environ)`

Return a guess for whether `wsgi.url_scheme` should be "http" or "https", by
checking for a `HTTPS` environment variable in the *environ* dictionary.  The
return value is a string.

This function is useful when creating a gateway that wraps CGI or a CGI-like
protocol such as FastCGI.  Typically, servers providing such protocols will
include a `HTTPS` variable with a value of "1", "yes", or "on" when a request
is received via SSL.  So, this function returns "https" if such a value is
found, and "http" otherwise.

### `request_uri(environ, include_query=True)`

Return the full request URI, optionally including the query string, using the
algorithm found in the "URL Reconstruction" section of PEP 3333.  If
*include_query* is false, the query string is not included in the resulting URI.

### `application_uri(environ)`

Similar to `request_uri()`, except that the `PATH_INFO` and
`QUERY_STRING` variables are ignored.  The result is the base URI of the
application object addressed by the request.

### `shift_path_info(environ)`

Shift a single name from `PATH_INFO` to `SCRIPT_NAME` and return the name.
The *environ* dictionary is *modified* in-place; use a copy if you need to keep
the original `PATH_INFO` or `SCRIPT_NAME` intact.

If there are no remaining path segments in `PATH_INFO`, `None` is returned.

Typically, this routine is used to process each portion of a request URI path,
for example to treat the path as a series of dictionary keys. This routine
modifies the passed-in environment to make it suitable for invoking another WSGI
application that is located at the target URI. For example, if there is a WSGI
application at `/foo`, and the request URI path is `/foo/bar/baz`, and the
WSGI application at `/foo` calls `shift_path_info()`, it will receive the
string "bar", and the environment will be updated to be suitable for passing to
a WSGI application at `/foo/bar`.  That is, `SCRIPT_NAME` will change from
`/foo` to `/foo/bar`, and `PATH_INFO` will change from `/bar/baz` to
`/baz`.

When `PATH_INFO` is just a "/", this routine returns an empty string and
appends a trailing slash to `SCRIPT_NAME`, even though empty path segments are
normally ignored, and `SCRIPT_NAME` doesn't normally end in a slash.  This is
intentional behavior, to ensure that an application can tell the difference
between URIs ending in `/x` from ones ending in `/x/` when using this
routine to do object traversal.

### `setup_testing_defaults(environ)`

Update *environ* with trivial defaults for testing purposes.

This routine adds various parameters required for WSGI, including `HTTP_HOST`,
`SERVER_NAME`, `SERVER_PORT`, `REQUEST_METHOD`, `SCRIPT_NAME`,
`PATH_INFO`, and all of the PEP 3333-defined `wsgi.*` variables.  It
only supplies default values, and does not replace any existing settings for
these variables.

This routine is intended to make it easier for unit tests of WSGI servers and
applications to set up dummy environments.  It should NOT be used by actual WSGI
servers or applications, since the data is fake!

Example usage (see also `demo_app()`
for another example):

```
from wsgiref.util import setup_testing_defaults
from wsgiref.simple_server import make_server

# A relatively simple WSGI application. It's going to print out the
# environment dictionary after being updated by setup_testing_defaults
def simple_app(environ, start_response):
    setup_testing_defaults(environ)

    status = '200 OK'
    headers = [('Content-type', 'text/plain; charset=utf-8')]

    start_response(status, headers)

    ret = [("%s: %s\n" % (key, value)).encode("utf-8")
           for key, value in environ.items()]
    return ret

with make_server('', 8000, simple_app) as httpd:
    print("Serving on port 8000...")
    httpd.serve_forever()
```

In addition to the environment functions above, the `wsgiref.util` module
also provides these miscellaneous utilities:

### `is_hop_by_hop(header_name)`

Return `True` if 'header_name' is an HTTP/1.1 "Hop-by-Hop" header, as defined by
RFC 2616.

### class `FileWrapper(filelike, blksize=8192)`

A concrete implementation of the `wsgiref.types.FileWrapper`
protocol used to convert a file-like object to an iterator.
The resulting objects
are iterables. As the object is iterated over, the
optional *blksize* parameter will be repeatedly passed to the *filelike*
object's `read()` method to obtain bytestrings to yield.  When `read()`
returns an empty bytestring, iteration is ended and is not resumable.

If *filelike* has a `close()` method, the returned object will also have a
`close()` method, and it will invoke the *filelike* object's `close()`
method when called.

Example usage:

```
from io import StringIO
from wsgiref.util import FileWrapper

# We're using a StringIO-buffer for as the file-like object
filelike = StringIO("This is an example file-like object"*10)
wrapper = FileWrapper(filelike, blksize=5)

for chunk in wrapper:
    print(chunk)
```

> *Changed in version 3.11.*
> Support for `__getitem__()` method has been removed.

## `wsgiref.headers` -- WSGI response header tools

Module `wsgiref.headers`.

This module provides a single class, `Headers`, for convenient
manipulation of WSGI response headers using a mapping-like interface.

### class `Headers([headers])`

Create a mapping-like object wrapping *headers*, which must be a list of header
name/value tuples as described in PEP 3333. The default value of *headers* is
an empty list.

`Headers` objects support typical mapping operations including
`__getitem__()`, `get(), setitem__()`,
`setdefault()`,
`__delitem__() and contains__()`.  For each of
these methods, the key is the header name (treated case-insensitively), and the
value is the first value associated with that header name.  Setting a header
deletes any existing values for that header, then adds a new value at the end of
the wrapped header list.  Headers' existing order is generally maintained, with
new headers added to the end of the wrapped list.

Unlike a dictionary, `Headers` objects do not raise an error when you try
to get or delete a key that isn't in the wrapped header list. Getting a
nonexistent header just returns `None`, and deleting a nonexistent header does
nothing.

`Headers` objects also support `keys()`, `values()`, and
`items()` methods.  The lists returned by `keys()` and `items()` can
include the same key more than once if there is a multi-valued header.  The
`len()` of a `Headers` object is the same as the length of its
`items()`, which is the same as the length of the wrapped header list.  In
fact, the `items()` method just returns a copy of the wrapped header list.

Calling `bytes()` on a `Headers` object returns a formatted bytestring
suitable for transmission as HTTP response headers.  Each header is placed on a
line with its value, separated by a colon and a space. Each line is terminated
by a carriage return and line feed, and the bytestring is terminated with a
blank line.

In addition to their mapping interface and formatting features, `Headers`
objects also have the following methods for querying and adding multi-valued
headers, and for adding headers with MIME parameters:

### `Headers.get_all(name)`

Return a list of all the values for the named header.

The returned list will be sorted in the order they appeared in the original
header list or were added to this instance, and may contain duplicates.  Any
fields deleted and re-inserted are always appended to the header list.  If no
fields exist with the given name, returns an empty list.

### `Headers.add_header(name, value, **_params)`

Add a (possibly multi-valued) header, with optional MIME parameters specified
via keyword arguments.

*name* is the header field to add.  Keyword arguments can be used to set MIME
parameters for the header field.  Each parameter must be a string or `None`.
Underscores in parameter names are converted to dashes, since dashes are illegal
in Python identifiers, but many MIME parameter names include dashes.  If the
parameter value is a string, it is added to the header value parameters in the
form `name="value"`. If it is `None`, only the parameter name is added.
(This is used for MIME parameters without a value.)  Example usage:

```
h.add_header('content-disposition', 'attachment', filename='bud.gif')
```

The above will add a header that looks like this:

```
Content-Disposition: attachment; filename="bud.gif"
```

> *Changed in version 3.5.*
> *headers* parameter is optional.

## `wsgiref.simple_server` -- a simple WSGI HTTP server

Module `wsgiref.simple_server`.

This module implements a simple HTTP server (based on `http.server`)
that serves WSGI applications.  Each server instance serves a single WSGI
application on a given host and port.  If you want to serve multiple
applications on a single host and port, you should create a WSGI application
that parses `PATH_INFO` to select which application to invoke for each
request.  (E.g., using the `shift_path_info()` function from
`wsgiref.util`.)

### `make_server(host, port, app, server_class=WSGIServer, handler_class=WSGIRequestHandler)`

Create a new WSGI server listening on *host* and *port*, accepting connections
for *app*.  The return value is an instance of the supplied *server_class*, and
will process requests using the specified *handler_class*.  *app* must be a WSGI
application object, as defined by PEP 3333.

Example usage:

```
from wsgiref.simple_server import make_server, demo_app

with make_server('', 8000, demo_app) as httpd:
    print("Serving HTTP on port 8000...")

    # Respond to requests until process is killed
    httpd.serve_forever()

    # Alternative: serve one request, then exit
    httpd.handle_request()
```

### `demo_app(environ, start_response)`

This function is a small but complete WSGI application that returns a text page
containing the message "Hello world!" and a list of the key/value pairs provided
in the *environ* parameter.  It's useful for verifying that a WSGI server (such
as `wsgiref.simple_server`) is able to run a simple WSGI application
correctly.

The *start_response* callable should follow the `.StartResponse` protocol.

### class `WSGIServer(server_address, RequestHandlerClass)`

Create a `WSGIServer` instance.  *server_address* should be a
`(host,port)` tuple, and *RequestHandlerClass* should be the subclass of
`http.server.BaseHTTPRequestHandler` that will be used to process
requests.

You do not normally need to call this constructor, as the `make_server()`
function can handle all the details for you.

`WSGIServer` is a subclass of `http.server.HTTPServer`, so all
of its methods (such as `serve_forever()` and `handle_request()`) are
available. `WSGIServer` also provides these WSGI-specific methods:

### `WSGIServer.set_app(application)`

Sets the callable *application* as the WSGI application that will receive
requests.

### `WSGIServer.get_app()`

Returns the currently set application callable.

Normally, however, you do not need to use these additional methods, as
`set_app()` is normally called by `make_server()`, and the
`get_app()` exists mainly for the benefit of request handler instances.

### class `WSGIRequestHandler(request, client_address, server)`

Create an HTTP handler for the given *request* (i.e. a socket), *client_address*
(a `(host,port)` tuple), and *server* (`WSGIServer` instance).

You do not need to create instances of this class directly; they are
automatically created as needed by `WSGIServer` objects.  You can,
however, subclass this class and supply it as a *handler_class* to the
`make_server()` function.  Some possibly relevant methods for overriding in
subclasses:

### `WSGIRequestHandler.get_environ()`

Return a `WSGIEnvironment` dictionary for a
request.  The default
implementation copies the contents of the `WSGIServer` object's
`base_environ` dictionary attribute and then adds various headers derived
from the HTTP request.  Each call to this method should return a new dictionary
containing all of the relevant CGI environment variables as specified in
PEP 3333.

### `WSGIRequestHandler.get_stderr()`

Return the object that should be used as the `wsgi.errors` stream. The default
implementation just returns `sys.stderr`.

### `WSGIRequestHandler.handle()`

Process the HTTP request.  The default implementation creates a handler instance
using a `wsgiref.handlers` class to implement the actual WSGI application
interface.
