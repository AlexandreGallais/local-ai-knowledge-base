---
title: "xmlrpc.client --- XML-RPC client access (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xmlrpc.client.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `xmlrpc.client` --- XML-RPC client access

Module `xmlrpc.client`.

**Source code:** Lib/xmlrpc/client.py

XML-RPC is a Remote Procedure Call method that uses XML passed via HTTP(S) as a
transport.  With it, a client can call methods with parameters on a remote
server (the server is named by a URI) and get back structured data.  This module
supports writing XML-RPC client code; it handles all the details of translating
between conformable Python objects and XML on the wire.

> **Warning:** The `xmlrpc.client` module is not secure against maliciously
> constructed data.  If you need to parse untrusted or unauthenticated data,
> see xml-security.

> *Changed in version 3.5.*
> For HTTPS URIs, `xmlrpc.client` now performs all the necessary
> certificate and hostname checks by default.

### class `ServerProxy(uri, transport=None, encoding=None, verbose=False, \`

```python
allow_none=False, use_datetime=False, \
use_builtin_types=False, *, headers=(), context=None)
```

A `ServerProxy` instance is an object that manages communication with a
remote XML-RPC server.  The required first argument is a URI (Uniform Resource
Indicator), and will normally be the URL of the server.  The optional second
argument is a transport factory instance; by default it is an internal
`SafeTransport` instance for https: URLs and an internal HTTP
`Transport` instance otherwise.  The optional third argument is an
encoding, by default UTF-8. The optional fourth argument is a debugging flag.

The following parameters govern the use of the returned proxy instance.
If *allow_none* is true,  the Python constant `None` will be translated into
XML; the default behaviour is for `None` to raise a `TypeError`. This is
a commonly used extension to the XML-RPC specification, but isn't supported by
all clients and servers; see `http://ontosys.com/xml-rpc/extensions.php
<https://web.archive.org/web/20130120074804/http://ontosys.com/xml-rpc/extensions.php>`_
for a description.
The *use_builtin_types* flag can be used to cause date/time values
to be presented as `datetime.datetime` objects and binary data to be
presented as `bytes` objects; this flag is false by default.
`datetime.datetime`, `bytes` and `bytearray` objects
may be passed to calls.
The *headers* parameter is an optional sequence of HTTP headers to send with
each request, expressed as a sequence of 2-tuples representing the header
name and value. (e.g. `[('Header-Name', 'value')]`).
If an HTTPS URL is provided, *context* may be `ssl.SSLContext`
and configures the SSL settings of the underlying HTTPS connection.
The obsolete *use_datetime* flag is similar to *use_builtin_types* but it
applies only to date/time values.

> *Changed in version 3.3.*
> The *use_builtin_types* flag was added.

> *Changed in version 3.8.*
> The *headers* parameter was added.

Both the HTTP and HTTPS transports support the URL syntax extension for HTTP
Basic <example-value>: `http://user:<example-password>@host:port/path`.  The  `user:pass`
portion will be base64-encoded as an HTTP 'Authorization' header, and sent to
the remote server as part of the connection process when invoking an XML-RPC
method.  You only need to use this if the remote server requires a Basic
Authentication user and password.

The returned instance is a proxy object with methods that can be used to invoke
corresponding RPC calls on the remote server.  If the remote server supports the
introspection API, the proxy can also be used to query the remote server for the
methods it supports (service discovery) and fetch other server-associated
metadata.

Types that are conformable (e.g. that can be marshalled through XML),
include the following (and except where noted, they are unmarshalled
as the same Python type):

```text
+----------------------+-------------------------------------------------------+
| XML-RPC type         | Python type                                           |
+======================+=======================================================+
| ``boolean``          | :class:`bool`                                         |
+----------------------+-------------------------------------------------------+
| ``int``, ``i1``,     | :class:`int` in range from -2147483648 to 2147483647. |
| ``i2``,  ``i4``,     | Values get the ``<int>`` tag.                         |
| ``i8`` or            |                                                       |
| ``biginteger``       |                                                       |
+----------------------+-------------------------------------------------------+
| ``double`` or        | :class:`float`.  Values get the ``<double>`` tag.     |
| ``float``            |                                                       |
+----------------------+-------------------------------------------------------+
| ``string``           | :class:`str`                                          |
+----------------------+-------------------------------------------------------+
| ``array``            | :class:`list` or :class:`tuple` containing            |
|                      | conformable elements.  Arrays are returned as         |
|                      | :class:`lists <list>`.                                |
+----------------------+-------------------------------------------------------+
| ``struct``           | :class:`dict`.  Keys must be strings, values may be   |
|                      | any conformable type.  Objects of user-defined        |
|                      | classes can be passed in; only their                  |
|                      | :attr:`~object.__dict__` attribute is transmitted.    |
+----------------------+-------------------------------------------------------+
| ``dateTime.iso8601`` | :class:`DateTime` or :class:`datetime.datetime`.      |
|                      | Returned type depends on values of                    |
|                      | *use_builtin_types* and *use_datetime* flags.         |
+----------------------+-------------------------------------------------------+
| ``base64``           | :class:`Binary`, :class:`bytes` or                    |
|                      | :class:`bytearray`.  Returned type depends on the     |
|                      | value of the *use_builtin_types* flag.                |
+----------------------+-------------------------------------------------------+
| ``nil``              | The ``None`` constant.  Passing is allowed only if    |
|                      | *allow_none* is true.                                 |
+----------------------+-------------------------------------------------------+
| ``bigdecimal``       | :class:`decimal.Decimal`.  Returned type only.        |
+----------------------+-------------------------------------------------------+
```

This is the full set of data types supported by XML-RPC.  Method calls may also
raise a special `Fault` instance, used to signal XML-RPC server errors, or
`ProtocolError` used to signal an error in the HTTP/HTTPS transport layer.
Both `Fault` and `ProtocolError` derive from a base class called
`Error`.  Note that the xmlrpc client module currently does not marshal
instances of subclasses of built-in types.

When passing strings, characters special to XML such as `<`, `>`, and `&`
will be automatically escaped.  However, it's the caller's responsibility to
ensure that the string is free of characters that aren't allowed in XML, such as
the control characters with ASCII values between 0 and 31 (except, of course,
tab, newline and carriage return); failing to do this will result in an XML-RPC
request that isn't well-formed XML.  If you have to pass <example-value> bytes
via XML-RPC, use `bytes` or `bytearray` classes or the
`Binary` wrapper class described below.

`Server` is retained as an alias for `ServerProxy` for backwards
compatibility.  New code should use `ServerProxy`.

> *Changed in version 3.5.*
> Added the *context* argument.

> *Changed in version 3.6.*
> Added support of type tags with prefixes (e.g. `ex:nil`).
> Added support of unmarshalling additional types used by Apache XML-RPC
> implementation for numerics: `i1`, `i2`, `i8`, `biginteger`,
> `float` and `bigdecimal`.
> See https://ws.apache.org/xmlrpc/types.html for a description.

> **See also:** XML-RPC HOWTO
> A good description of XML-RPC operation and client software in several languages.
> Contains pretty much everything an XML-RPC client developer needs to know.
>
> XML-RPC Introspection
> Describes the XML-RPC protocol extension for introspection.
>
> XML-RPC Specification
> The official specification.

## ServerProxy Objects

A `ServerProxy` instance has a method corresponding to each remote
procedure call accepted by the XML-RPC server.  Calling the method performs an
RPC, dispatched by both name and argument signature (e.g. the same method name
can be overloaded with multiple argument signatures).  The RPC finishes either
by returning data in a conformant type or by raising a `Fault` or
`ProtocolError` exception indicating an error.

Servers that support the XML introspection API support some common methods
grouped under the reserved `system` attribute:

### `ServerProxy.system.listMethods()`

This method returns a list of strings, one for each (non-system) method
supported by the XML-RPC server.

### `ServerProxy.system.methodSignature(name)`

This method takes one parameter, the name of a method implemented by the XML-RPC
server. It returns an array of possible signatures for this method. A signature
is an array of types. The first of these types is the return type of the method,
the rest are parameters.

Because multiple signatures (ie. overloading) is permitted, this method returns
a list of signatures rather than a singleton.

Signatures themselves are restricted to the top level parameters expected by a
method. For instance if a method expects one array of structs as a parameter,
and it returns a string, its signature is simply "string, array". If it expects
three integers and returns a string, its signature is "string, int, int, int".

If no signature is defined for the method, a non-array value is returned. In
Python this means that the type of the returned  value will be something other
than list.

### `ServerProxy.system.methodHelp(name)`

This method takes one parameter, the name of a method implemented by the XML-RPC
server.  It returns a documentation string describing the use of that method. If
no such string is available, an empty string is returned. The documentation
string may contain HTML markup.

> *Changed in version 3.5.*
> Instances of `ServerProxy` support the context manager protocol
> for closing the underlying transport.

A working example follows. The server code:

```
from xmlrpc.server import SimpleXMLRPCServer

def is_even(n):
    return n % 2 == 0

server = SimpleXMLRPCServer(("localhost", 8000))
print("Listening on port 8000...")
server.register_function(is_even, "is_even")
server.serve_forever()
```

The client code for the preceding server:

```
import xmlrpc.client

with xmlrpc.client.ServerProxy("http://localhost:8000/") as proxy:
    print("3 is even: %s" % str(proxy.is_even(3)))
    print("100 is even: %s" % str(proxy.is_even(100)))
```

## DateTime Objects

### class `DateTime`

This class may be initialized with seconds since the epoch, a time
tuple, an ISO 8601 time/date string, or a `datetime.datetime`
instance.  It has the following methods, supported mainly for internal
use by the marshalling/unmarshalling code:

### `decode(string)`

Accept a string as the instance's new time value.

### `encode(out)`

Write the XML-RPC encoding of this `DateTime` item to the *out* stream
object.

It also supports certain of Python's built-in operators through
`rich comparison() and repr__()`
methods.

A working example follows. The server code:

```
import datetime as dt
from xmlrpc.server import SimpleXMLRPCServer
import xmlrpc.client

def today():
    today = dt.datetime.today()
    return xmlrpc.client.DateTime(today)

server = SimpleXMLRPCServer(("localhost", 8000))
print("Listening on port 8000...")
server.register_function(today, "today")
server.serve_forever()
```

The client code for the preceding server:

```
import xmlrpc.client
import datetime as dt

proxy = xmlrpc.client.ServerProxy("http://localhost:8000/")

today = proxy.today()
# convert the ISO 8601 string to a datetime object
converted = dt.datetime.strptime(today.value, "%Y%m%dT%H:%M:%S")
print(f"Today: {converted.strftime('%d.%m.%Y, %H:%M')}")
```

## Binary Objects

### class `Binary`

This class may be initialized from bytes data (which may include NULs). The
primary access to the content of a `Binary` object is provided by an
attribute:

### `data`

The binary data encapsulated by the `Binary` instance.  The data is
provided as a `bytes` object.

`Binary` objects have the following methods, supported mainly for
internal use by the marshalling/unmarshalling code:

### `decode(bytes)`

Accept a base64 `bytes` object and decode it as the instance's new data.

### `encode(out)`

Write the XML-RPC base 64 encoding of this binary item to the *out* stream object.

The encoded data will have newlines every 76 characters as per
RFC RFC 2045 section 6.8,
which was the de facto standard base64 specification when the
XML-RPC spec was written.

It also supports certain of Python's built-in operators through
`__eq__() and ne__()` methods.

Example usage of the binary objects.  We're going to transfer an image over
XMLRPC:

```
from xmlrpc.server import SimpleXMLRPCServer
import xmlrpc.client

def python_logo():
    with open("python_logo.jpg", "rb") as handle:
        return xmlrpc.client.Binary(handle.read())

server = SimpleXMLRPCServer(("localhost", 8000))
print("Listening on port 8000...")
server.register_function(python_logo, 'python_logo')

server.serve_forever()
```

The client gets the image and saves it to a file:

```
import xmlrpc.client

proxy = xmlrpc.client.ServerProxy("http://localhost:8000/")
with open("fetched_python_logo.jpg", "wb") as handle:
    handle.write(proxy.python_logo().data)
```
