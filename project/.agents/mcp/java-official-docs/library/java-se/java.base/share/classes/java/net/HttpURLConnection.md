---
title: "HttpURLConnection class (java.net) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/HttpURLConnection.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpURLConnection class (java.net)

```java
public abstract class HttpURLConnection extends URLConnection
```

A URLConnection with support for HTTP-specific features. See
 the spec  for
details.

Each HttpURLConnection instance is used to make a single request
but the underlying network connection to the HTTP server may be
transparently shared by other instances. Calling the close() methods
on the InputStream or OutputStream of an HttpURLConnection
after a request may free network resources associated with this
instance but has no effect on any shared persistent connection.
Calling the disconnect() method may close the underlying socket
if a persistent connection is otherwise idle at that time.

The HTTP protocol handler has a few settings that can be accessed through
System Properties. This covers
Proxy settings as well as
 various other settings.

**See also:** java.net.HttpURLConnection#disconnect()

**Since:** 1.1

## HttpURLConnection.method

```java
protected String method
```

The HTTP method (GET,POST,PUT,etc.).

## HttpURLConnection.chunkLength

```java
protected int chunkLength
```

The chunk-length when using chunked encoding streaming mode for output.
A value of `-1` means chunked encoding is disabled for output.

**Since:** 1.5

## HttpURLConnection.fixedContentLength

```java
protected int fixedContentLength
```

The fixed content-length when using fixed-length streaming mode.
A value of `-1` means fixed-length streaming mode is disabled
for output.

 **NOTE:** `fixedContentLengthLong` is recommended instead
of this field, as it allows larger content lengths to be set.

**Since:** 1.5

## HttpURLConnection.fixedContentLengthLong

```java
protected long fixedContentLengthLong
```

The fixed content-length when using fixed-length streaming mode.
A value of `-1` means fixed-length streaming mode is disabled
for output.

**Since:** 1.7

## HttpURLConnection.setAuthenticator(Authenticator)

```java
public void setAuthenticator(Authenticator auth)
```

Supplies an Authenticator to be used
when authentication is requested through the HTTP protocol for
this `HttpURLConnection`.
If no authenticator is supplied, the
default authenticator will be used.

Parameters:

- `auth`: The `Authenticator` that should be used by this `HttpURLConnection`.

**Implementation requirements:** The default behavior of this method is to unconditionally
          throw `UnsupportedOperationException`. Concrete
          implementations of `HttpURLConnection`
          which support supplying an `Authenticator` for a
          specific `HttpURLConnection` instance should
          override this method to implement a different behavior.

**Implementation note:** Depending on authentication schemes, an implementation
          may or may not need to use the provided authenticator
          to obtain a password. For instance, an implementation that
          relies on third-party security libraries may still invoke the
          default authenticator if these libraries are configured
          to do so.
          Likewise, an implementation that supports transparent
          NTLM authentication may let the system attempt
          to connect using the system user credentials first,
          before invoking the provided authenticator.

          However, if an authenticator is specifically provided,
          then the underlying connection may only be reused for
          `HttpURLConnection` instances which share the same
          `Authenticator` instance, and authentication information,
          if cached, may only be reused for an `HttpURLConnection`
          sharing that same `Authenticator`.

**Since:** 9

Throws:

- `UnsupportedOperationException`: if setting an Authenticator is not supported by the underlying implementation.
- `IllegalStateException`: if URLConnection is already connected.
- `NullPointerException`: if the supplied `auth` is `null`.

## HttpURLConnection.getHeaderFieldKey(int)

```java
public String getHeaderFieldKey (int n)
```

Returns the key for the `n`th header field.
Some implementations may treat the `0`th
header field as special, i.e. as the status line returned by the HTTP
server. In this case, getHeaderField(0) returns the status
line, but `getHeaderFieldKey(0)` returns null.

Parameters:

- `n`: an index, where `n >=0`.

**Returns:** the key for the `n`th header field,
         or `null` if the key does not exist.

## HttpURLConnection.setFixedLengthStreamingMode(int)

```java
public void setFixedLengthStreamingMode (int contentLength)
```

This method is used to enable streaming of a HTTP request body
without internal buffering, when the content length is known in
advance.

An exception will be thrown if the application
attempts to write more data than the indicated
content-length, or if the application closes the OutputStream
before writing the indicated amount.

When output streaming is enabled, authentication
and redirection cannot be handled automatically.
A HttpRetryException will be thrown when reading
the response if authentication or redirection are required.
This exception can be queried for the details of the error.

This method must be called before the URLConnection is connected.

**NOTE:** `setFixedLengthStreamingMode(long)` is recommended
instead of this method as it allows larger content lengths to be set.

Parameters:

- `contentLength`: The number of bytes which will be written to the OutputStream.

**See also:** #setChunkedStreamingMode(int)

**Since:** 1.5

Throws:

- `IllegalStateException`: if URLConnection is already connected or if a different streaming mode is already enabled.
- `IllegalArgumentException`: if a content length less than zero is specified.

## HttpURLConnection.setFixedLengthStreamingMode(long)

```java
public void setFixedLengthStreamingMode(long contentLength)
```

This method is used to enable streaming of a HTTP request body
without internal buffering, when the content length is known in
advance.

 An exception will be thrown if the application attempts to write
more data than the indicated content-length, or if the application
closes the OutputStream before writing the indicated amount.

 When output streaming is enabled, authentication and redirection
cannot be handled automatically. A `HttpRetryException` will
be thrown when reading the response if authentication or redirection
are required. This exception can be queried for the details of the
error.

 This method must be called before the URLConnection is connected.

 The content length set by invoking this method takes precedence
over any value set by `setFixedLengthStreamingMode(int)`.

Parameters:

- `contentLength`: The number of bytes which will be written to the OutputStream.

**Since:** 1.7

Throws:

- `IllegalStateException`: if URLConnection is already connected or if a different streaming mode is already enabled.
- `IllegalArgumentException`: if a content length less than zero is specified.

## HttpURLConnection.setChunkedStreamingMode(int)

```java
public void setChunkedStreamingMode (int chunklen)
```

This method is used to enable streaming of a HTTP request body
without internal buffering, when the content length is **not**
known in advance. In this mode, chunked transfer encoding
is used to send the request body. Note, not all HTTP servers
support this mode.

When output streaming is enabled, authentication
and redirection cannot be handled automatically.
A HttpRetryException will be thrown when reading
the response if authentication or redirection are required.
This exception can be queried for the details of the error.

This method must be called before the URLConnection is connected.

Parameters:

- `chunklen`: The number of bytes to be written in each chunk, including a chunk size header as a hexadecimal string (minimum of 1 byte), two CRLF's (4 bytes) and a minimum payload length of 1 byte. If chunklen is less than or equal to 5, a higher default value will be used.

**See also:** #setFixedLengthStreamingMode(int)

**Since:** 1.5

Throws:

- `IllegalStateException`: if URLConnection is already connected or if a different streaming mode is already enabled.

## HttpURLConnection.getHeaderField(int)

```java
public String getHeaderField(int n)
```

Returns the value for the `n`th header field.
Some implementations may treat the `0`th
header field as special, i.e. as the status line returned by the HTTP
server.

This method can be used in conjunction with the
getHeaderFieldKey <example-value> to iterate through all
the headers in the message.

Parameters:

- `n`: an index, where `n>=0`.

**Returns:** the value of the `n`th header field,
         or `null` if the value does not exist.

**See also:** java.net.HttpURLConnection#getHeaderFieldKey(int)

## HttpURLConnection.responseCode

```java
protected int responseCode
```

An `int` representing the three digit HTTP Status-Code.

-  1xx: Informational

-  2xx: Success

-  3xx: Redirection

-  4xx: Client Error

-  5xx: Server Error

## HttpURLConnection.responseMessage

```java
protected String responseMessage
```

The HTTP response message.

## HttpURLConnection.instanceFollowRedirects

```java
protected boolean instanceFollowRedirects
```

If `true`, the protocol will automatically follow redirects.
If `false`, the protocol will not automatically follow
redirects.

This field is set by the `setInstanceFollowRedirects`
method. Its value is returned by the `getInstanceFollowRedirects`
method.

Its default value is based on the value of the static followRedirects
at HttpURLConnection construction time.

**See also:** java.net.HttpURLConnection#setInstanceFollowRedirects(boolean)

**See also:** java.net.HttpURLConnection#getInstanceFollowRedirects()

**See also:** java.net.HttpURLConnection#setFollowRedirects(boolean)

## HttpURLConnection.HttpURLConnection(URL)

```java
protected HttpURLConnection (URL u)
```

Constructor for the HttpURLConnection.

Parameters:

- `u`: the URL

## HttpURLConnection.setFollowRedirects(boolean)

```java
public static void setFollowRedirects(boolean set)
```

Sets whether HTTP redirects  (requests with response code 3xx) should
be automatically followed by this class.  True by default.

Parameters:

- `set`: a `boolean` indicating whether or not to follow HTTP redirects.

**See also:** #getFollowRedirects()

## HttpURLConnection.getFollowRedirects()

```java
public static boolean getFollowRedirects()
```

Returns a `boolean` indicating
whether or not HTTP redirects (3xx) should
be automatically followed.

**Returns:** `true` if HTTP redirects should
be automatically followed, `false` if not.

**See also:** #setFollowRedirects(boolean)

## HttpURLConnection.setInstanceFollowRedirects(boolean)

```java
public void setInstanceFollowRedirects(boolean followRedirects)
```

Sets whether HTTP redirects (requests with response code 3xx) should
be automatically followed by this `HttpURLConnection`
instance.

The default value comes from followRedirects, which defaults to
true.

Parameters:

- `followRedirects`: a `boolean` indicating whether or not to follow HTTP redirects.

**See also:** java.net.HttpURLConnection#instanceFollowRedirects

**See also:** #getInstanceFollowRedirects

**Since:** 1.3

## HttpURLConnection.getInstanceFollowRedirects()

```java
public boolean getInstanceFollowRedirects()
```

Returns the value of this `HttpURLConnection`'s
`instanceFollowRedirects` field.

**Returns:** the value of this `HttpURLConnection`'s
         `instanceFollowRedirects` field.

**See also:** java.net.HttpURLConnection#instanceFollowRedirects

**See also:** #setInstanceFollowRedirects(boolean)

**Since:** 1.3

## HttpURLConnection.setRequestMethod(String)

```java
public void setRequestMethod(String method) throws ProtocolException
```

Set the method for the URL request, one of:

- GET

- POST

- HEAD

- OPTIONS

- PUT

- DELETE

- TRACE
 are legal, subject to protocol restrictions.  The default
method is GET.

Parameters:

- `method`: the HTTP method

**See also:** #getRequestMethod()

Throws:

- `ProtocolException`: if the method cannot be reset or if the requested method isn't valid for HTTP.

## HttpURLConnection.getRequestMethod()

```java
public String getRequestMethod()
```

Get the request method.

**Returns:** the HTTP request method

**See also:** #setRequestMethod(java.lang.String)

## HttpURLConnection.getResponseCode()

```java
public int getResponseCode() throws IOException
```

Gets the status code from an HTTP response message.
For example, in the case of the following status lines:

```java
HTTP/1.0 200 OK
HTTP/1.0 401 Unauthorized
```

It will return 200 and 401 respectively.
Returns -1 if no code can be discerned
from the response (i.e., the response is not valid HTTP).

**Returns:** the HTTP Status-Code, or -1

Throws:

- `IOException`: if an error occurred connecting to the server.

## HttpURLConnection.getResponseMessage()

```java
public String getResponseMessage() throws IOException
```

Gets the HTTP response message, if any, returned along with the
response code from a server.  From responses like:

```java
HTTP/1.0 200 OK
HTTP/1.0 404 Not Found
```

Extracts the Strings "OK" and "Not Found" respectively.
Returns null if none could be discerned from the responses
(the result was not valid HTTP).

**Returns:** the HTTP response message, or `null`

Throws:

- `IOException`: if an error occurred connecting to the server.

## HttpURLConnection.disconnect()

```java
public abstract void disconnect()
```

Indicates that other requests to the server
are unlikely in the near future. Calling disconnect()
should not imply that this HttpURLConnection
instance can be reused for other requests.

## HttpURLConnection.usingProxy()

```java
public abstract boolean usingProxy()
```

Indicates if the connection is going through a proxy.

This method returns `true` if the connection is known
to be going or has gone through proxies, and returns `false`
if the connection will never go through a proxy or if
the use of a proxy cannot be determined.

**Returns:** a boolean indicating if the connection is using a proxy.

## HttpURLConnection.getPermission()

```java
public Permission getPermission() throws IOException
```

Returns a `SocketPermission` object representing the
permission necessary to connect to the destination host and port.

**Returns:** a `SocketPermission` object representing the
        permission necessary to connect to the destination
        host and port.

**Deprecated:** Permissions can no longer be used for controlling access to resources
as the Security Manager is no longer supported.

Throws:

- `IOException`: if an error occurs while computing the permission.
