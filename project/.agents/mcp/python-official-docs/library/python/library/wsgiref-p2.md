---
title: "wsgiref --- WSGI Utilities and Reference Implementation (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/wsgiref.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# wsgiref --- WSGI Utilities and Reference Implementation (part 2 of 3)

## `wsgiref.validate` --- WSGI conformance checker

Module `wsgiref.validate`.

When creating new WSGI application objects, frameworks, servers, or middleware,
it can be useful to validate the new code's conformance using
`wsgiref.validate`.  This module provides a function that creates WSGI
application objects that validate communications between a WSGI server or
gateway and a WSGI application object, to check both sides for protocol
conformance.

Note that this utility does not guarantee complete PEP 3333 compliance; an
absence of errors from this module does not necessarily mean that errors do not
exist.  However, if this module does produce an error, then it is virtually
certain that either the server or application is not 100% compliant.

This module is based on the `paste.lint` module from Ian Bicking's "Python
Paste" library.

### `validator(application)`

Wrap *application* and return a new WSGI application object.  The returned
application will forward all requests to the original *application*, and will
check that both the *application* and the server invoking it are conforming to
the WSGI specification and to RFC 2616.

Any detected nonconformance results in an `AssertionError` being raised;
note, however, that how these errors are handled is server-dependent.  For
example, `wsgiref.simple_server` and other servers based on
`wsgiref.handlers` (that don't override the error handling methods to do
something else) will simply output a message that an error has occurred, and
dump the traceback to `sys.stderr` or some other error stream.

This wrapper may also generate output using the `warnings` module to
indicate behaviors that are questionable but which may not actually be
prohibited by PEP 3333.  Unless they are suppressed using Python command-line
options or the `warnings` API, any such warnings will be written to
`sys.stderr` (*not* `wsgi.errors`, unless they happen to be the same
object).

Example usage:

```
from wsgiref.validate import validator
from wsgiref.simple_server import make_server

# Our callable object which is intentionally not compliant to the
# standard, so the validator is going to break
def simple_app(environ, start_response):
    status = '200 OK'  # HTTP Status
    headers = [('Content-type', 'text/plain')]  # HTTP Headers
    start_response(status, headers)

    # This is going to break because we need to return a list, and
    # the validator is going to inform us
    return b"Hello World"

# This is the application wrapped in a validator
validator_app = validator(simple_app)

with make_server('', 8000, validator_app) as httpd:
    print("Listening on port 8000....")
    httpd.serve_forever()
```

## `wsgiref.handlers` -- server/gateway base classes

Module `wsgiref.handlers`.

This module provides base handler classes for implementing WSGI servers and
gateways.  These base classes handle most of the work of communicating with a
WSGI application, as long as they are given a CGI-like environment, along with
input, output, and error streams.

### class `CGIHandler()`

CGI-based invocation via `sys.stdin`, `sys.stdout`, `sys.stderr` and
`os.environ`.  This is useful when you have a WSGI application and want to run
it as a CGI script.  Simply invoke `CGIHandler().run(app)`, where `app` is
the WSGI application object you wish to invoke.

This class is a subclass of `BaseCGIHandler` that sets `wsgi.run_once`
to true, `wsgi.multithread` to false, and `wsgi.multiprocess` to true, and
always uses `sys` and `os` to obtain the necessary CGI streams and
environment.

### class `IISCGIHandler()`

A specialized alternative to `CGIHandler`, for use when deploying on
Microsoft's IIS web server, without having set the config allowPathInfo
option (IIS>=7) or metabase allowPathInfoForScriptMappings (IIS<7).

By default, IIS gives a `PATH_INFO` that duplicates the `SCRIPT_NAME` at
the front, causing problems for WSGI applications that wish to implement
routing. This handler strips any such duplicated path.

IIS can be configured to pass the correct `PATH_INFO`, but this causes
another bug where `PATH_TRANSLATED` is wrong. Luckily this variable is
rarely used and is not guaranteed by WSGI. On IIS<7, though, the
setting can only be made on a vhost level, affecting all other script
mappings, many of which break when exposed to the `PATH_TRANSLATED` bug.
For this reason IIS<7 is almost never deployed with the fix (Even IIS7
rarely uses it because there is still no UI for it.).

There is no way for CGI code to tell whether the option was set, so a
separate handler class is provided.  It is used in the same way as
`CGIHandler`, i.e., by calling `IISCGIHandler().run(app)`, where
`app` is the WSGI application object you wish to invoke.

> *Added in version 3.2.*

### class `BaseCGIHandler(stdin, stdout, stderr, environ, multithread=True, multiprocess=False)`

Similar to `CGIHandler`, but instead of using the `sys` and
`os` modules, the CGI environment and I/O streams are specified explicitly.
The *multithread* and *multiprocess* values are used to set the
`wsgi.multithread` and `wsgi.multiprocess` flags for any applications run by
the handler instance.

This class is a subclass of `SimpleHandler` intended for use with
software other than HTTP "origin servers".  If you are writing a gateway
protocol implementation (such as CGI, FastCGI, SCGI, etc.) that uses a
`Status:` header to send an HTTP status, you probably want to subclass this
instead of `SimpleHandler`.

### class `SimpleHandler(stdin, stdout, stderr, environ, multithread=True, multiprocess=False)`

Similar to `BaseCGIHandler`, but designed for use with HTTP origin
servers.  If you are writing an HTTP server implementation, you will probably
want to subclass this instead of `BaseCGIHandler`.

This class is a subclass of `BaseHandler`.  It overrides the
`__init__()`, `get_stdin()`,
`get_stderr()`, `add_cgi_vars()`,
`_write(), and flush()` methods to
support explicitly setting the
environment and streams via the constructor.  The supplied environment and
streams are stored in the `stdin`, `stdout`, `stderr`, and
`environ` attributes.

The `write()` method of *stdout* should write
each chunk in full, like `io.BufferedIOBase`.

### class `BaseHandler()`

This is an abstract base class for running WSGI applications.  Each instance
will handle a single HTTP request, although in principle you could create a
subclass that was reusable for multiple requests.

`BaseHandler` instances have only one method intended for external use:

### `BaseHandler.run(app)`

Run the specified WSGI application, *app*.

All of the other `BaseHandler` methods are invoked by this method in the
process of running the application, and thus exist primarily to allow
customizing the process.

The following methods MUST be overridden in a subclass:

### `BaseHandler._write(data)`

Buffer the bytes *data* for transmission to the client.  It's okay if this
method actually transmits the data; `BaseHandler` just separates write
and flush operations for greater efficiency when the underlying system actually
has such a distinction.

### `BaseHandler._flush()`

Force buffered data to be transmitted to the client.  It's okay if this method
is a no-op (i.e., if `_write()` actually sends the data).

### `BaseHandler.get_stdin()`

Return an object compatible with `InputStream`
suitable for use as the `wsgi.input` of the
request currently being processed.

### `BaseHandler.get_stderr()`

Return an object compatible with `ErrorStream`
suitable for use as the `wsgi.errors` of the
request currently being processed.

### `BaseHandler.add_cgi_vars()`

Insert CGI variables for the current request into the `environ` attribute.

Here are some other methods and attributes you may wish to override. This list
is only a summary, however, and does not include every method that can be
overridden.  You should consult the docstrings and source code for additional
information before attempting to create a customized `BaseHandler`
subclass.

Attributes and methods for customizing the WSGI environment:

### `BaseHandler.wsgi_multithread`

The value to be used for the `wsgi.multithread` environment variable.  It
defaults to true in `BaseHandler`, but may have a different default (or
be set by the constructor) in the other subclasses.

### `BaseHandler.wsgi_multiprocess`

The value to be used for the `wsgi.multiprocess` environment variable.  It
defaults to true in `BaseHandler`, but may have a different default (or
be set by the constructor) in the other subclasses.

### `BaseHandler.wsgi_run_once`

The value to be used for the `wsgi.run_once` environment variable.  It
defaults to false in `BaseHandler`, but `CGIHandler` sets it to
true by default.

### `BaseHandler.os_environ`

The default environment variables to be included in every request's WSGI
environment.  By default, this is a copy of `os.environ` at the time that
`wsgiref.handlers` was imported, but subclasses can either create their own
at the class or instance level.  Note that the dictionary should be considered
read-only, since the default value is shared between multiple classes and
instances.

### `BaseHandler.server_software`

If the `origin_server` attribute is set, this attribute's value is used to
set the default `SERVER_SOFTWARE` WSGI environment variable, and also to set a
default `Server:` header in HTTP responses.  It is ignored for handlers (such
as `BaseCGIHandler` and `CGIHandler`) that are not HTTP origin
servers.

> *Changed in version 3.3.*
> The term "Python" is replaced with implementation specific term like
> "CPython", "Jython" etc.

### `BaseHandler.get_scheme()`

Return the URL scheme being used for the current request.  The default
implementation uses the `guess_scheme()` function from `wsgiref.util`
to guess whether the scheme should be "http" or "https", based on the current
request's `environ` variables.

### `BaseHandler.setup_environ()`

Set the `environ` attribute to a fully populated WSGI environment.  The
default implementation uses all of the above methods and attributes, plus the
`get_stdin()`, `get_stderr()`, and `add_cgi_vars()` methods and the
`wsgi_file_wrapper` attribute.  It also inserts a `SERVER_SOFTWARE` key
if not present, as long as the `origin_server` attribute is a true value
and the `server_software` attribute is set.

Methods and attributes for customizing exception handling:

### `BaseHandler.log_exception(exc_info)`

Log the *exc_info* tuple in the server log.  *exc_info* is a ``(type, value,
traceback)`` tuple.  The default implementation simply writes the traceback to
the request's `wsgi.errors` stream and flushes it.  Subclasses can override
this method to change the format or retarget the output, mail the traceback to
an administrator, or whatever other action may be deemed suitable.

### `BaseHandler.traceback_limit`

The maximum number of frames to include in tracebacks output by the default
`log_exception()` method.  If `None`, all frames are included.

### `BaseHandler.error_output(environ, start_response)`

This method is a WSGI application to generate an error page for the user.  It is
only invoked if an error occurs before headers are sent to the client.

This method can access the current error using `sys.exception()`,
and should pass that information to *start_response* when calling it (as
described in the "Error Handling" section of PEP 3333). In particular,
the *start_response* callable should follow the `.StartResponse`
protocol.

The default implementation just uses the `error_status`,
`error_headers`, and `error_body` attributes to generate an output
page.  Subclasses can override this to produce more dynamic error output.

Note, however, that it's not recommended from a security perspective to spit out
diagnostics to any old user; ideally, you should have to do something special to
enable diagnostic output, which is why the default implementation doesn't
include any.

### `BaseHandler.error_status`

The HTTP status used for error responses.  This should be a status string as
defined in PEP 3333; it defaults to a 500 code and message.

### `BaseHandler.error_headers`

The HTTP headers used for error responses.  This should be a list of WSGI
response headers (`(name, value)` tuples), as described in PEP 3333.  The
default list just sets the content type to `text/plain`.

### `BaseHandler.error_body`

The error response body.  This should be an HTTP response body bytestring. It
defaults to the plain text, "A server error occurred.  Please contact the
administrator."

Methods and attributes for PEP 3333's "Optional Platform-Specific File
Handling" feature:

### `BaseHandler.wsgi_file_wrapper`

A `wsgi.file_wrapper` factory, compatible with
`wsgiref.types.FileWrapper`, or `None`.  The default value
of this attribute is the `wsgiref.util.FileWrapper` class.

### `BaseHandler.sendfile()`

Override to implement platform-specific file transmission.  This method is
called only if the application's return value is an instance of the class
specified by the `wsgi_file_wrapper` attribute.  It should return a true
value if it was able to successfully transmit the file, so that the default
transmission code will not be executed. The default implementation of this
method just returns a false value.

Miscellaneous methods and attributes:

### `BaseHandler.origin_server`

This attribute should be set to a true value if the handler's `_write()` and
`_flush()` are being used to communicate directly to the client, rather than
via a CGI-like gateway protocol that wants the HTTP status in a special
`Status:` header.

This attribute's default value is true in `BaseHandler`, but false in
`BaseCGIHandler` and `CGIHandler`.

### `BaseHandler.http_version`

If `origin_server` is true, this string attribute is used to set the HTTP
version of the response set to the client.  It defaults to `"1.0"`.

### `read_environ()`

Transcode CGI variables from `os.environ` to PEP 3333 "bytes in unicode"
strings, returning a new dictionary.  This function is used by
`CGIHandler` and `IISCGIHandler` in place of directly using
`os.environ`, which is not necessarily WSGI-compliant on all platforms
and web servers using Python 3 -- specifically, ones where the OS's
actual environment is Unicode (i.e. Windows), or ones where the environment
is bytes, but the system encoding used by Python to decode it is anything
other than ISO-8859-1 (e.g. Unix systems using UTF-8).

If you are implementing a CGI-based handler of your own, you probably want
to use this routine instead of just copying values out of `os.environ`
directly.

> *Added in version 3.2.*
