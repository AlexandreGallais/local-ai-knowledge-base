---
title: "http.server --- HTTP servers (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/http.server.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# http.server --- HTTP servers (part 2 of 2)

### `do_HEAD()`

This method serves the `'HEAD'` request type: it sends the headers it
would send for the equivalent `GET` request. See the `do_GET()`
method for a more complete explanation of the possible headers.

### `do_GET()`

The request is mapped to a local file by interpreting the request as a
path relative to the current working directory.

If the request was mapped to a directory, the directory is checked for
an index page as specified by `index_pages`. If found, the
file's contents are returned; otherwise a directory listing is generated
by calling the `list_directory()` method. This method uses
`os.listdir()` to scan the directory, and returns a `404` error
response if the `listdir()` fails.

If the request was mapped to a file, it is opened. Any `OSError`
exception in opening the requested file is mapped to a `404`,
`'File not found'` error. If there was an `'If-Modified-Since'`
header in the request, and the file was not modified after this time,
a `304`, `'Not Modified'` response is sent. Otherwise, the content
type is guessed by calling the `guess_type()` method, which in turn
uses the *extensions_map* variable, and the file contents are returned.

A `'Content-type:'` header with the guessed content type is output,
followed by a `'Content-Length:'` header with the file's size and a
`'Last-Modified:'` header with the file's modification time.

The instance attribute `extra_response_headers` is a sequence of
`(name, value)` pairs containing user-defined extra response headers.

Then follows a blank line signifying the end of the headers, and then the
contents of the file are output.

For example usage, see the implementation of the `test` function
in Lib/http/server.py.

> *Changed in version 3.7.*
> Support of the `'If-Modified-Since'` header.

### `list_directory(path)`

Helper to list the contents of *path* when no index page is present.

This returns either a file-like object (which must be closed
by the caller) or `None` to indicate an error, in which case the
caller has nothing further to do. In either case, the headers are sent.

### `guess_type(path)`

Guess the type of the file at the given *path*.

This returns a string of the form `type/subtype`, usable for
a MIME Content-type header.

The default implementation looks the file's extension up in
`extensions_map`, falling back to
`mimetypes.guess_file_type()` and then to
`default_content_type`.

> *Changed in version 3.13.*
> Add `mimetypes.guess_file_type()` as a fallback.

The `SimpleHTTPRequestHandler` class can be used to create a very basic
webserver serving files relative to the current directory as follows:

```
import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
```

`SimpleHTTPRequestHandler` can also be subclassed to enhance behavior,
such as using different index file names by overriding the class attribute
`index_pages`.

## Command-line interface

`http.server` can also be invoked directly using the `-m`
switch of the interpreter.  The following example illustrates how to serve
files relative to the current directory:

```bash
python -m http.server [OPTIONS] [port]
```

The following options are accepted:

http.server

### option `port`

The server listens to port 8000 by default. The default can be overridden
by passing the desired port number as an argument:

```bash
python -m http.server 9000
```

### option `-b, --bind <address>`

Specifies a specific address to which it should bind. Both IPv4 and IPv6
addresses are supported. By default, the server binds itself to all
interfaces. For example, the following command causes the server to bind
to localhost only:

```bash
python -m http.server --bind 127.0.0.1
```

> *Added in version 3.4.*

> *Changed in version 3.8.*
> Support IPv6 in the `--bind` option.

### option `-d, --directory <dir>`

Specifies a directory to which it should serve the files. By default,
the server uses the current directory. For example, the following command
uses a specific directory:

```bash
python -m http.server --directory /tmp/
```

> *Added in version 3.7.*

### option `-p, --protocol <version>`

Specifies the HTTP version to which the server is conformant. By default,
the server is conformant to HTTP/1.0. For example, the following command
runs an HTTP/1.1 conformant server:

```bash
python -m http.server --protocol HTTP/1.1
```

> *Added in version 3.11.*

### option `--content-type <content_type>`

Specifies the default Content-Type HTTP header used when the MIME type
cannot be guessed from the URL's file extension. By default, the server
uses `'application/octet-stream'`:

```bash
python -m http.server --content-type text/html
```

> *Added in version 3.15.*

### option `--tls-cert`

Specifies a TLS certificate chain for HTTPS connections:

```bash
python -m http.server --tls-cert fullchain.pem
```

> *Added in version 3.14.*

### option `--tls-key`

Specifies a private key file for HTTPS connections.

This option requires `--tls-cert` to be specified.

> *Added in version 3.14.*

### option `--tls-password-file`

Specifies the password file for password-protected private keys:

```bash
python -m http.server \
       --tls-cert cert.pem \
       --tls-key key.pem \
       --tls-password-file password.txt
```

This option requires `--tls-cert` to be specified.

> *Added in version 3.14.*

### option `-H, --header  <value>`

Specify an additional HTTP Response Header to send on successful HTTP 200
responses. Can be used multiple times to send additional custom response
headers. Headers that are sent automatically by the server (for instance
Content-Type) will not be overwritten by the server.

> *Added in version 3.15.*

## Security considerations

`SimpleHTTPRequestHandler` will follow symbolic links when handling
requests which makes it possible for files outside of the specified directory
to be served.

Methods `BaseHTTPRequestHandler.send_header()` and
`BaseHTTPRequestHandler.send_response_only()` assume sanitized input
and do not perform input validation such as checking for the presence of CRLF
sequences. Untrusted input may result in HTTP header injection attacks.

Earlier versions of Python did not scrub control characters from the
log messages emitted to stderr from `python -m http.server` or the
default `BaseHTTPRequestHandler` `.log_message`
implementation. This could allow remote clients connecting to your
server to send nefarious control codes to your terminal.

> *Changed in version 3.12.*
> Control characters are scrubbed in stderr logs.
