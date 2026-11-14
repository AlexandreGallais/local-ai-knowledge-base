---
title: "xmlrpc.client --- XML-RPC client access (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xmlrpc.client.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xmlrpc.client --- XML-RPC client access (part 2 of 2)

## Fault Objects

### class `Fault`

A `Fault` object encapsulates the content of an XML-RPC fault tag. Fault
objects have the following attributes:

### `faultCode`

An int indicating the fault type.

### `faultString`

A string containing a diagnostic message associated with the fault.

In the following example we're going to intentionally cause a `Fault` by
returning a complex type object.  The server code:

```
from xmlrpc.server import SimpleXMLRPCServer

# A marshalling error is going to occur because we're returning a
# complex number
def add(x, y):
    return x+y+0j

server = SimpleXMLRPCServer(("localhost", 8000))
print("Listening on port 8000...")
server.register_function(add, 'add')

server.serve_forever()
```

The client code for the preceding server:

```
import xmlrpc.client

proxy = xmlrpc.client.ServerProxy("http://localhost:8000/")
try:
    proxy.add(2, 5)
except xmlrpc.client.Fault as err:
    print("A fault occurred")
    print("Fault code: %d" % err.faultCode)
    print("Fault string: %s" % err.faultString)
```

## ProtocolError Objects

### class `ProtocolError`

A `ProtocolError` object describes a protocol error in the underlying
transport layer (such as a 404 'not found' error if the server named by the URI
does not exist).  It has the following attributes:

### `url`

The URI or URL that triggered the error.

### `errcode`

The error code.

### `errmsg`

The error message or diagnostic string.

### `headers`

A dict containing the headers of the HTTP/HTTPS request that triggered the
error.

In the following example we're going to intentionally cause a `ProtocolError`
by providing an invalid URI:

```
import xmlrpc.client

# create a ServerProxy with a URI that doesn't respond to XMLRPC requests
proxy = xmlrpc.client.ServerProxy("http://google.com/")

try:
    proxy.some_method()
except xmlrpc.client.ProtocolError as err:
    print("A protocol error occurred")
    print("URL: %s" % err.url)
    print("HTTP/HTTPS headers: %s" % err.headers)
    print("Error code: %d" % err.errcode)
    print("Error message: %s" % err.errmsg)
```

## MultiCall Objects

The `MultiCall` object provides a way to encapsulate multiple calls to a
remote server into a single request.

### class `MultiCall(server)`

Create an object used to boxcar method calls. *server* is the eventual target of
the call. Calls can be made to the result object, but they will immediately
return `None`, and only store the call name and arguments in the
`MultiCall` object. Calling the object itself causes all stored calls to
be transmitted as a single `system.multicall` request. The result of this call
is a generator; iterating over this generator yields the individual
results.

A usage example of this class follows.  The server code:

```
from xmlrpc.server import SimpleXMLRPCServer

def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    return x // y

# A simple server with simple arithmetic functions
server = SimpleXMLRPCServer(("localhost", 8000))
print("Listening on port 8000...")
server.register_multicall_functions()
server.register_function(add, 'add')
server.register_function(subtract, 'subtract')
server.register_function(multiply, 'multiply')
server.register_function(divide, 'divide')
server.serve_forever()
```

The client code for the preceding server:

```
import xmlrpc.client

proxy = xmlrpc.client.ServerProxy("http://localhost:8000/")
multicall = xmlrpc.client.MultiCall(proxy)
multicall.add(7, 3)
multicall.subtract(7, 3)
multicall.multiply(7, 3)
multicall.divide(7, 3)
result = multicall()

print("7+3=%d, 7-3=%d, 7*3=%d, 7//3=%d" % tuple(result))
```

## Convenience Functions

### `dumps(params, methodname=None, methodresponse=None, encoding=None, allow_none=False)`

Convert *params* into an XML-RPC request, or into a response if *methodresponse*
is true. *params* can be either a tuple of arguments or an instance of the
`Fault` exception class.  If *methodresponse* is true, only a single value
can be returned, meaning that *params* must be of length 1. *encoding*, if
supplied, is the encoding to use in the generated XML; the default is UTF-8.
Python's `None` value cannot be used in standard XML-RPC; to allow using
it via an extension,  provide a true value for *allow_none*.

### `loads(data, use_datetime=False, use_builtin_types=False)`

Convert an XML-RPC request or response into Python objects, a ``(params,
methodname)``.  *params* is a tuple of argument; *methodname* is a string, or
`None` if no method name is present in the packet. If the XML-RPC packet
represents a fault condition, this function will raise a `Fault` exception.
The *use_builtin_types* flag can be used to cause date/time values to be
presented as `datetime.datetime` objects and binary data to be
presented as `bytes` objects; this flag is false by default.

The obsolete *use_datetime* flag is similar to *use_builtin_types* but it
applies only to date/time values.

> *Changed in version 3.3.*
> The *use_builtin_types* flag was added.

## Example of Client Usage

```
# simple test program (from the XML-RPC specification)
from xmlrpc.client import ServerProxy, Error

# server = ServerProxy("http://localhost:8000") # local server
with ServerProxy("http://betty.userland.com") as proxy:

    print(proxy)

    try:
        print(proxy.examples.getStateName(41))
    except Error as v:
        print("ERROR", v)
```

To access an XML-RPC server through a HTTP proxy, you need to define a custom
transport.  The following example shows how:

```
import http.client
import xmlrpc.client

class ProxiedTransport(xmlrpc.client.Transport):

    def set_proxy(self, host, port=None, headers=None):
        self.proxy = host, port
        self.proxy_headers = headers

    def make_connection(self, host):
        connection = http.client.HTTPConnection(*self.proxy)
        connection.set_tunnel(host, headers=self.proxy_headers)
        self._connection = host, connection
        return connection

transport = ProxiedTransport()
transport.set_proxy('proxy-server', 8080)
server = xmlrpc.client.ServerProxy('http://betty.userland.com', transport=transport)
print(server.examples.getStateName(41))
```

## Example of Client and Server Usage

See simplexmlrpcserver-example.

**Footnotes**
