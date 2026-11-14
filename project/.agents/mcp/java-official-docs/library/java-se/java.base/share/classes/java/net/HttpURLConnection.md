# HttpURLConnection class (java.net)

```java
public abstract class HttpURLConnection extends URLConnection
```

A URLConnection with support for HTTP-specific features. See
<A HREF="http://www.w3.org/pub/WWW/Protocols/"> the spec </A> for
details.
<p>

Each HttpURLConnection instance is used to make a single request
but the underlying network connection to the HTTP server may be
transparently shared by other instances. Calling the close() methods
on the InputStream or OutputStream of an HttpURLConnection
after a request may free network resources associated with this
instance but has no effect on any shared persistent connection.
Calling the disconnect() method may close the underlying socket
if a persistent connection is otherwise idle at that time.

<P>The HTTP protocol handler has a few settings that can be accessed through
System Properties. This covers
<a href="doc-files/net-properties.html#Proxies">Proxy settings</a> as well as
<a href="doc-files/net-properties.html#MiscHTTP"> various other settings</a>.
</P>

@see     java.net.HttpURLConnection#disconnect()
@since 1.1

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
A value of {@code -1} means chunked encoding is disabled for output.
@since 1.5

## HttpURLConnection.fixedContentLength

```java
protected int fixedContentLength
```

The fixed content-length when using fixed-length streaming mode.
A value of {@code -1} means fixed-length streaming mode is disabled
for output.

<P> <B>NOTE:</B> {@link #fixedContentLengthLong} is recommended instead
of this field, as it allows larger content lengths to be set.

@since 1.5

## HttpURLConnection.fixedContentLengthLong

```java
protected long fixedContentLengthLong
```

The fixed content-length when using fixed-length streaming mode.
A value of {@code -1} means fixed-length streaming mode is disabled
for output.

@since 1.7

## HttpURLConnection.setAuthenticator(Authenticator)

```java
public void setAuthenticator(Authenticator auth)
```

Supplies an {@link java.net.Authenticator Authenticator} to be used
when authentication is requested through the HTTP protocol for
this {@code HttpURLConnection}.
If no authenticator is supplied, the
{@linkplain Authenticator#setDefault(java.net.Authenticator) default
authenticator} will be used.

@implSpec The default behavior of this method is to unconditionally
          throw {@link UnsupportedOperationException}. Concrete
          implementations of {@code HttpURLConnection}
          which support supplying an {@code Authenticator} for a
          specific {@code HttpURLConnection} instance should
          override this method to implement a different behavior.

@implNote Depending on authentication schemes, an implementation
          may or may not need to use the provided authenticator
          to obtain a password. For instance, an implementation that
          relies on third-party security libraries may still invoke the
          default authenticator if these libraries are configured
          to do so.
          Likewise, an implementation that supports transparent
          NTLM authentication may let the system attempt
          to connect using the system user credentials first,
          before invoking the provided authenticator.
          <br>
          However, if an authenticator is specifically provided,
          then the underlying connection may only be reused for
          {@code HttpURLConnection} instances which share the same
          {@code Authenticator} instance, and authentication information,
          if cached, may only be reused for an {@code HttpURLConnection}
          sharing that same {@code Authenticator}.

@param auth The {@code Authenticator} that should be used by this
          {@code HttpURLConnection}.

@throws  UnsupportedOperationException if setting an Authenticator is
         not supported by the underlying implementation.
@throws  IllegalStateException if URLConnection is already connected.
@throws  NullPointerException if the supplied {@code auth} is {@code null}.
@since 9

## HttpURLConnection.getHeaderFieldKey(int)

```java
public String getHeaderFieldKey (int n)
```

Returns the key for the {@code n}<sup>th</sup> header field.
Some implementations may treat the {@code 0}<sup>th</sup>
header field as special, i.e. as the status line returned by the HTTP
server. In this case, {@link #getHeaderField(int) getHeaderField(0)} returns the status
line, but {@code getHeaderFieldKey(0)} returns null.

@param   n   an index, where {@code n >=0}.
@return  the key for the {@code n}<sup>th</sup> header field,
         or {@code null} if the key does not exist.

## HttpURLConnection.setFixedLengthStreamingMode(int)

```java
public void setFixedLengthStreamingMode (int contentLength)
```

This method is used to enable streaming of a HTTP request body
without internal buffering, when the content length is known in
advance.
<p>
An exception will be thrown if the application
attempts to write more data than the indicated
content-length, or if the application closes the OutputStream
before writing the indicated amount.
<p>
When output streaming is enabled, authentication
and redirection cannot be handled automatically.
A HttpRetryException will be thrown when reading
the response if authentication or redirection are required.
This exception can be queried for the details of the error.
<p>
This method must be called before the URLConnection is connected.
<p>
<B>NOTE:</B> {@link #setFixedLengthStreamingMode(long)} is recommended
instead of this method as it allows larger content lengths to be set.

@param   contentLength The number of bytes which will be written
         to the OutputStream.

@throws  IllegalStateException if URLConnection is already connected
         or if a different streaming mode is already enabled.

@throws  IllegalArgumentException if a content length less than
         zero is specified.

@see     #setChunkedStreamingMode(int)
@since 1.5

## HttpURLConnection.setFixedLengthStreamingMode(long)

```java
public void setFixedLengthStreamingMode(long contentLength)
```

This method is used to enable streaming of a HTTP request body
without internal buffering, when the content length is known in
advance.

<P> An exception will be thrown if the application attempts to write
more data than the indicated content-length, or if the application
closes the OutputStream before writing the indicated amount.

<P> When output streaming is enabled, authentication and redirection
cannot be handled automatically. A {@linkplain HttpRetryException} will
be thrown when reading the response if authentication or redirection
are required. This exception can be queried for the details of the
error.

<P> This method must be called before the URLConnection is connected.

<P> The content length set by invoking this method takes precedence
over any value set by {@link #setFixedLengthStreamingMode(int)}.

@param  contentLength
        The number of bytes which will be written to the OutputStream.

@throws  IllegalStateException
         if URLConnection is already connected or if a different
         streaming mode is already enabled.

@throws  IllegalArgumentException
         if a content length less than zero is specified.

@since 1.7

## HttpURLConnection.setChunkedStreamingMode(int)

```java
public void setChunkedStreamingMode (int chunklen)
```

This method is used to enable streaming of a HTTP request body
without internal buffering, when the content length is <b>not</b>
known in advance. In this mode, chunked transfer encoding
is used to send the request body. Note, not all HTTP servers
support this mode.
<p>
When output streaming is enabled, authentication
and redirection cannot be handled automatically.
A HttpRetryException will be thrown when reading
the response if authentication or redirection are required.
This exception can be queried for the details of the error.
<p>
This method must be called before the URLConnection is connected.

@param   chunklen The number of bytes to be written in each chunk,
         including a chunk size header as a hexadecimal string
         (minimum of 1 byte), two CRLF's (4 bytes) and a minimum
         payload length of 1 byte. If chunklen is less than or equal
         to 5, a higher default value will be used.

@throws  IllegalStateException if URLConnection is already connected
         or if a different streaming mode is already enabled.

@see     #setFixedLengthStreamingMode(int)
@since 1.5

## HttpURLConnection.getHeaderField(int)

```java
public String getHeaderField(int n)
```

Returns the value for the {@code n}<sup>th</sup> header field.
Some implementations may treat the {@code 0}<sup>th</sup>
header field as special, i.e. as the status line returned by the HTTP
server.
<p>
This method can be used in conjunction with the
{@link #getHeaderFieldKey getHeaderFieldKey} method to iterate through all
the headers in the message.

@param   n   an index, where {@code n>=0}.
@return  the value of the {@code n}<sup>th</sup> header field,
         or {@code null} if the value does not exist.
@see     java.net.HttpURLConnection#getHeaderFieldKey(int)

## HttpURLConnection.responseCode

```java
protected int responseCode
```

An {@code int} representing the three digit HTTP Status-Code.
<ul>
<li> 1xx: Informational
<li> 2xx: Success
<li> 3xx: Redirection
<li> 4xx: Client Error
<li> 5xx: Server Error
</ul>

## HttpURLConnection.responseMessage

```java
protected String responseMessage
```

The HTTP response message.

## HttpURLConnection.instanceFollowRedirects

```java
protected boolean instanceFollowRedirects
```

If {@code true}, the protocol will automatically follow redirects.
If {@code false}, the protocol will not automatically follow
redirects.
<p>
This field is set by the {@code setInstanceFollowRedirects}
method. Its value is returned by the {@code getInstanceFollowRedirects}
method.
<p>
Its default value is based on the value of the static followRedirects
at HttpURLConnection construction time.

@see     java.net.HttpURLConnection#setInstanceFollowRedirects(boolean)
@see     java.net.HttpURLConnection#getInstanceFollowRedirects()
@see     java.net.HttpURLConnection#setFollowRedirects(boolean)

## HttpURLConnection.HttpURLConnection(URL)

```java
protected HttpURLConnection (URL u)
```

Constructor for the HttpURLConnection.
@param u the URL

## HttpURLConnection.setFollowRedirects(boolean)

```java
public static void setFollowRedirects(boolean set)
```

Sets whether HTTP redirects  (requests with response code 3xx) should
be automatically followed by this class.  True by default.

@param set a {@code boolean} indicating whether or not
to follow HTTP redirects.
@see #getFollowRedirects()

## HttpURLConnection.getFollowRedirects()

```java
public static boolean getFollowRedirects()
```

Returns a {@code boolean} indicating
whether or not HTTP redirects (3xx) should
be automatically followed.

@return {@code true} if HTTP redirects should
be automatically followed, {@code false} if not.
@see #setFollowRedirects(boolean)

## HttpURLConnection.setInstanceFollowRedirects(boolean)

```java
public void setInstanceFollowRedirects(boolean followRedirects)
```

Sets whether HTTP redirects (requests with response code 3xx) should
be automatically followed by this {@code HttpURLConnection}
instance.
<p>
The default value comes from followRedirects, which defaults to
true.

@param followRedirects a {@code boolean} indicating
whether or not to follow HTTP redirects.

@see    java.net.HttpURLConnection#instanceFollowRedirects
@see #getInstanceFollowRedirects
@since 1.3

## HttpURLConnection.getInstanceFollowRedirects()

```java
public boolean getInstanceFollowRedirects()
```

Returns the value of this {@code HttpURLConnection}'s
{@code instanceFollowRedirects} field.

@return  the value of this {@code HttpURLConnection}'s
         {@code instanceFollowRedirects} field.
@see     java.net.HttpURLConnection#instanceFollowRedirects
@see #setInstanceFollowRedirects(boolean)
@since 1.3

## HttpURLConnection.setRequestMethod(String)

```java
public void setRequestMethod(String method) throws ProtocolException
```

Set the method for the URL request, one of:
<UL>
 <LI>GET
 <LI>POST
 <LI>HEAD
 <LI>OPTIONS
 <LI>PUT
 <LI>DELETE
 <LI>TRACE
</UL> are legal, subject to protocol restrictions.  The default
method is GET.

@param method the HTTP method
@throws    ProtocolException if the method cannot be reset or if
             the requested method isn't valid for HTTP.
@see #getRequestMethod()

## HttpURLConnection.getRequestMethod()

```java
public String getRequestMethod()
```

Get the request method.
@return the HTTP request method
@see #setRequestMethod(java.lang.String)

## HttpURLConnection.getResponseCode()

```java
public int getResponseCode() throws IOException
```

Gets the status code from an HTTP response message.
For example, in the case of the following status lines:
<PRE>
HTTP/1.0 200 OK
HTTP/1.0 401 Unauthorized
</PRE>
It will return 200 and 401 respectively.
Returns -1 if no code can be discerned
from the response (i.e., the response is not valid HTTP).
@throws IOException if an error occurred connecting to the server.
@return the HTTP Status-Code, or -1

## HttpURLConnection.getResponseMessage()

```java
public String getResponseMessage() throws IOException
```

Gets the HTTP response message, if any, returned along with the
response code from a server.  From responses like:
<PRE>
HTTP/1.0 200 OK
HTTP/1.0 404 Not Found
</PRE>
Extracts the Strings "OK" and "Not Found" respectively.
Returns null if none could be discerned from the responses
(the result was not valid HTTP).
@throws IOException if an error occurred connecting to the server.
@return the HTTP response message, or {@code null}

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

This method returns {@code true} if the connection is known
to be going or has gone through proxies, and returns {@code false}
if the connection will never go through a proxy or if
the use of a proxy cannot be determined.

@return a boolean indicating if the connection is using a proxy.

## HttpURLConnection.getPermission()

```java
public Permission getPermission() throws IOException
```

Returns a {@link SocketPermission} object representing the
permission necessary to connect to the destination host and port.

@throws    IOException if an error occurs while computing
           the permission.

@return a {@code SocketPermission} object representing the
        permission necessary to connect to the destination
        host and port.

@deprecated
Permissions can no longer be used for controlling access to resources
as the Security Manager is no longer supported.

## HttpURLConnection.getErrorStream()

```java
public InputStream getErrorStream()
```

Returns the error stream if the connection failed
but the server sent useful data nonetheless. The
typical example is when an HTTP server responds
with a 404, which will cause a FileNotFoundException
to be thrown in connect, but the server sent an HTML
help page with suggestions as to what to do.

<p>This method will not cause a connection to be initiated.  If
the connection was not connected, or if the server did not have
an error while connecting or if the server had an error but
no error data was sent, this method will return null. This is
the default.

@return an error stream if any, null if there have been no
errors, the connection is not connected or the server sent no
useful data.

## HttpURLConnection.HTTP_OK

```java
public static final int HTTP_OK
```

HTTP Status-Code 200: OK.

## HttpURLConnection.HTTP_CREATED

```java
public static final int HTTP_CREATED
```

HTTP Status-Code 201: Created.

## HttpURLConnection.HTTP_ACCEPTED

```java
public static final int HTTP_ACCEPTED
```

HTTP Status-Code 202: Accepted.

## HttpURLConnection.HTTP_NOT_AUTHORITATIVE

```java
public static final int HTTP_NOT_AUTHORITATIVE
```

HTTP Status-Code 203: Non-Authoritative Information.

## HttpURLConnection.HTTP_NO_CONTENT

```java
public static final int HTTP_NO_CONTENT
```

HTTP Status-Code 204: No Content.

## HttpURLConnection.HTTP_RESET

```java
public static final int HTTP_RESET
```

HTTP Status-Code 205: Reset Content.

## HttpURLConnection.HTTP_PARTIAL

```java
public static final int HTTP_PARTIAL
```

HTTP Status-Code 206: Partial Content.

## HttpURLConnection.HTTP_MULT_CHOICE

```java
public static final int HTTP_MULT_CHOICE
```

HTTP Status-Code 300: Multiple Choices.

## HttpURLConnection.HTTP_MOVED_PERM

```java
public static final int HTTP_MOVED_PERM
```

HTTP Status-Code 301: Moved Permanently.

## HttpURLConnection.HTTP_MOVED_TEMP

```java
public static final int HTTP_MOVED_TEMP
```

HTTP Status-Code 302: Temporary Redirect.

## HttpURLConnection.HTTP_SEE_OTHER

```java
public static final int HTTP_SEE_OTHER
```

HTTP Status-Code 303: See Other.

## HttpURLConnection.HTTP_NOT_MODIFIED

```java
public static final int HTTP_NOT_MODIFIED
```

HTTP Status-Code 304: Not Modified.

## HttpURLConnection.HTTP_USE_PROXY

```java
public static final int HTTP_USE_PROXY
```

HTTP Status-Code 305: Use Proxy.

## HttpURLConnection.HTTP_BAD_REQUEST

```java
public static final int HTTP_BAD_REQUEST
```

HTTP Status-Code 400: Bad Request.

## HttpURLConnection.HTTP_UNAUTHORIZED

```java
public static final int HTTP_UNAUTHORIZED
```

HTTP Status-Code 401: Unauthorized.

## HttpURLConnection.HTTP_PAYMENT_REQUIRED

```java
public static final int HTTP_PAYMENT_REQUIRED
```

HTTP Status-Code 402: Payment Required.

## HttpURLConnection.HTTP_FORBIDDEN

```java
public static final int HTTP_FORBIDDEN
```

HTTP Status-Code 403: Forbidden.

## HttpURLConnection.HTTP_NOT_FOUND

```java
public static final int HTTP_NOT_FOUND
```

HTTP Status-Code 404: Not Found.

## HttpURLConnection.HTTP_BAD_METHOD

```java
public static final int HTTP_BAD_METHOD
```

HTTP Status-Code 405: Method Not Allowed.

## HttpURLConnection.HTTP_NOT_ACCEPTABLE

```java
public static final int HTTP_NOT_ACCEPTABLE
```

HTTP Status-Code 406: Not Acceptable.

## HttpURLConnection.HTTP_PROXY_AUTH

```java
public static final int HTTP_PROXY_AUTH
```

HTTP Status-Code 407: Proxy Authentication Required.

## HttpURLConnection.HTTP_CLIENT_TIMEOUT

```java
public static final int HTTP_CLIENT_TIMEOUT
```

HTTP Status-Code 408: Request Time-Out.

## HttpURLConnection.HTTP_CONFLICT

```java
public static final int HTTP_CONFLICT
```

HTTP Status-Code 409: Conflict.

## HttpURLConnection.HTTP_GONE

```java
public static final int HTTP_GONE
```

HTTP Status-Code 410: Gone.

## HttpURLConnection.HTTP_LENGTH_REQUIRED

```java
public static final int HTTP_LENGTH_REQUIRED
```

HTTP Status-Code 411: Length Required.

## HttpURLConnection.HTTP_PRECON_FAILED

```java
public static final int HTTP_PRECON_FAILED
```

HTTP Status-Code 412: Precondition Failed.

## HttpURLConnection.HTTP_ENTITY_TOO_LARGE

```java
public static final int HTTP_ENTITY_TOO_LARGE
```

HTTP Status-Code 413: Request Entity Too Large.

## HttpURLConnection.HTTP_REQ_TOO_LONG

```java
public static final int HTTP_REQ_TOO_LONG
```

HTTP Status-Code 414: Request-URI Too Large.

## HttpURLConnection.HTTP_UNSUPPORTED_TYPE

```java
public static final int HTTP_UNSUPPORTED_TYPE
```

HTTP Status-Code 415: Unsupported Media Type.

## HttpURLConnection.HTTP_SERVER_ERROR

```java
public static final int HTTP_SERVER_ERROR
```

HTTP Status-Code 500: Internal Server Error.
@deprecated   it is misplaced and shouldn't have existed.

## HttpURLConnection.HTTP_INTERNAL_ERROR

```java
public static final int HTTP_INTERNAL_ERROR
```

HTTP Status-Code 500: Internal Server Error.

## HttpURLConnection.HTTP_NOT_IMPLEMENTED

```java
public static final int HTTP_NOT_IMPLEMENTED
```

HTTP Status-Code 501: Not Implemented.

## HttpURLConnection.HTTP_BAD_GATEWAY

```java
public static final int HTTP_BAD_GATEWAY
```

HTTP Status-Code 502: Bad Gateway.

## HttpURLConnection.HTTP_UNAVAILABLE

```java
public static final int HTTP_UNAVAILABLE
```

HTTP Status-Code 503: Service Unavailable.

## HttpURLConnection.HTTP_GATEWAY_TIMEOUT

```java
public static final int HTTP_GATEWAY_TIMEOUT
```

HTTP Status-Code 504: Gateway Timeout.

## HttpURLConnection.HTTP_VERSION

```java
public static final int HTTP_VERSION
```

HTTP Status-Code 505: HTTP Version Not Supported.