---
title: "wsgiref --- WSGI Utilities and Reference Implementation (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/wsgiref.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# wsgiref --- WSGI Utilities and Reference Implementation (part 3 of 3)

## `wsgiref.types` -- WSGI types for static type checking

Module `wsgiref.types`.

This module provides various types for static type checking as described
in PEP 3333.

> *Added in version 3.11.*

### class `StartResponse`

A `typing.Protocol` describing :pep:`start_response()
<3333#the-start-response-callable>`
callables (PEP 3333).

### `WSGIEnvironment`

A type alias describing a WSGI environment dictionary.

### `WSGIApplication`

A type alias describing a WSGI application callable.

### class `InputStream()`

A `typing.Protocol` describing a :pep:`WSGI Input Stream
<3333#input-and-error-streams>`.

### class `ErrorStream()`

A `typing.Protocol` describing a :pep:`WSGI Error Stream
<3333#input-and-error-streams>`.

### class `FileWrapper()`

A `typing.Protocol` describing a :pep:`file wrapper
<3333#optional-platform-specific-file-handling>`.
See `wsgiref.util.FileWrapper` for a concrete implementation of this
protocol.

## Examples

This is a working "Hello World" WSGI application, where the *start_response*
callable should follow the `.StartResponse` protocol:

```
"""
Every WSGI application must have an application object - a callable
object that accepts two arguments. For that purpose, we're going to
use a function (note that you're not limited to a function, you can
use a class for example). The first argument passed to the function
is a dictionary containing CGI-style environment variables and the
second variable is the callable object.
"""
from wsgiref.simple_server import make_server

def hello_world_app(environ, start_response):
    status = "200 OK"  # HTTP Status
    headers = [("Content-type", "text/plain; charset=utf-8")]  # HTTP Headers
    start_response(status, headers)

    # The returned object is going to be printed
    return [b"Hello World"]

with make_server("", 8000, hello_world_app) as httpd:
    print("Serving on port 8000...")

    # Serve until process is killed
    httpd.serve_forever()
```

Example of a WSGI application serving the current directory, accept optional
directory and port number (default: 8000) on the command line:

```
"""
Small wsgiref based web server. Takes a path to serve from and an
optional port number (defaults to 8000), then tries to serve files.
MIME types are guessed from the file names, 404 errors are raised
if the file is not found.
"""
import mimetypes
import os
import sys
from wsgiref import simple_server, util

def app(environ, respond):
    # Get the file name and MIME type
    fn = os.path.join(path, environ["PATH_INFO"][1:])
    if "." not in fn.split(os.path.sep)[-1]:
        fn = os.path.join(fn, "index.html")
    mime_type = mimetypes.guess_file_type(fn)[0]

    # Return 200 OK if file exists, otherwise 404 Not Found
    if os.path.exists(fn):
        respond("200 OK", [("Content-Type", mime_type)])
        return util.FileWrapper(open(fn, "rb"))
    else:
        respond("404 Not Found", [("Content-Type", "text/plain")])
        return [b"not found"]

if __name__ == "__main__":
    # Get the path and port from command-line arguments
    path = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
    port = int(sys.argv[2]) if len(sys.argv) > 2 else 8000

    # Make and start the server until control-c
    httpd = simple_server.make_server("", port, app)
    print(f"Serving {path} on port {port}, control-C to stop")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("Shutting down.")
        httpd.server_close()
```
