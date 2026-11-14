---
title: "URL class (java.net) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URL.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URL class (java.net) (part 2 of 3)

## URL.URL(URL, String)

```java
public URL(URL context, String spec) throws MalformedURLException
```

Creates a URL by parsing the given spec within a specified context.

The new URL is created from the given context URL and the spec
argument as described in
RFC2396 "Uniform Resource Identifiers : Generic Syntax" :

```java
         <scheme>://<authority><path>?<query>#<fragment>
```

The reference is parsed into the scheme, authority, path, query and
fragment parts. If the path component is empty and the scheme,
authority, and query components are undefined, then the new URL is a
reference to the current document. Otherwise, the fragment and query
parts present in the spec are used in the new URL.

If the scheme component is defined in the given spec and does not match
the scheme of the context, then the new URL is created as an absolute
URL based on the spec alone. Otherwise the scheme component is inherited
from the context URL.

If the authority component is present in the spec then the spec is
treated as absolute and the spec authority and path will replace the
context authority and path. If the authority component is absent in the
spec then the authority of the new URL will be inherited from the
context.

If the spec's path component begins with a slash character
"/" then the
path is treated as absolute and the spec path replaces the context path.

Otherwise, the path is treated as a relative path and is appended to the
context path, as described in RFC2396. Also, in this case,
the path is canonicalized through the removal of directory
changes made by occurrences of ".." and ".".

For a more detailed description of URL parsing, refer to RFC2396.

Parameters:

- `context`: the context in which to parse the specification.
- `spec`: the `String` to parse as a URL.

**Implementation requirements:** Parsing the URL includes calling the String, int, int) parseURL method on the
selected handler.

**See also:** java.net.URL#URL(java.lang.String, java.lang.String,
                 int, java.lang.String)

**See also:** java.net.URLStreamHandler

**See also:** java.net.URLStreamHandler#parseURL(java.net.URL,
                 java.lang.String, int, int)

**Deprecated:** Use `URI.toURL()` to construct an instance of URL. See the note on
constructor deprecation for more
details.

Throws:

- `MalformedURLException`: if no protocol is specified, or an unknown protocol is found, or `spec` is `null`, or the parsed URL fails to comply with the specific syntax of the associated protocol, or the underlying stream handler's parseURL method throws `IllegalArgumentException`

## URL.URL(URL, String, URLStreamHandler)

```java
public URL(URL context, String spec, URLStreamHandler handler) throws MalformedURLException
```

Creates a URL by parsing the given spec with the specified handler
within a specified context. If the handler is null, the parsing
occurs as with the two argument constructor.

Parameters:

- `context`: the context in which to parse the specification.
- `spec`: the `String` to parse as a URL.
- `handler`: the stream handler for the URL.

**Implementation requirements:** Parsing the URL includes calling the String, int, int) parseURL method on the
selected handler.

**See also:** java.net.URL#URL(java.lang.String, java.lang.String,
                 int, java.lang.String)

**See also:** java.net.URLStreamHandler

**See also:** java.net.URLStreamHandler#parseURL(java.net.URL,
                 java.lang.String, int, int)

**Deprecated:** Use URLStreamHandler) to construct an instance of URL
associated with a custom protocol handler.
See the note on constructor deprecation
for more details.

Throws:

- `MalformedURLException`: if no protocol is specified, or an unknown protocol is found, or `spec` is `null`, or the parsed URL fails to comply with the specific syntax of the associated protocol, or the underlying stream handler's String, int, int) parseURL method throws `IllegalArgumentException`

## URL.of(URI, URLStreamHandler)

```java
public static URL of(URI uri, URLStreamHandler handler) throws MalformedURLException
```

Creates a URL from a URI, as if by invoking `uri.toURL()`, but
associating it with the given `URLStreamHandler`, if allowed.

Parameters:

- `uri`: the `URI` from which the returned `URL` should be built
- `handler`: a custom protocol stream handler for the returned `URL`. Can be `null`, in which case the default stream handler for the protocol if any, will be used.

**API note:** Applications should consider performing additional integrity
checks before constructing a `URL` and opening a connection.
See the API note in the class level API
documentation.

**Implementation requirements:** The implementation of this method includes calling the String, int, int) parseURL method on the
selected handler.

**Returns:** a new `URL` instance created from the given `URI`
  and associated with the given `URLStreamHandler`, if any

**See also:** java.net.URI#toURL()

**Since:** 20

Throws:

- `NullPointerException`: if `uri` is `null`
- `IllegalArgumentException`: if no protocol is specified (the uri scheme is `null`), or if the `URLStreamHandler` is not `null` and can not be set for the given protocol
- `MalformedURLException`: if an unknown protocol is found, or the given URI fails to comply with the specific syntax of the associated protocol, or the underlying stream handler's String, int, int) parseURL method throws `IllegalArgumentException`

## URL.getQuery()

```java
public String getQuery()
```

Gets the query part of this `URL`.

**Returns:** the query part of this `URL`,
or `null` if one does not exist

**Since:** 1.3

## URL.getPath()

```java
public String getPath()
```

Gets the path part of this `URL`.

**Returns:** the path part of this `URL`, or an
empty string if one does not exist

**Since:** 1.3

## URL.getUserInfo()

```java
public String getUserInfo()
```

Gets the userInfo part of this `URL`.

**Returns:** the userInfo part of this `URL`, or
`null` if one does not exist

**Since:** 1.3

## URL.getAuthority()

```java
public String getAuthority()
```

Gets the authority part of this `URL`.

**Returns:** the authority part of this `URL`

**Since:** 1.3

## URL.getPort()

```java
public int getPort()
```

Gets the port number of this `URL`.

**Returns:** the port number, or -1 if the port is not set

## URL.getDefaultPort()

```java
public int getDefaultPort()
```

Gets the default port number of the protocol associated
with this `URL`. If the URL scheme or the URLStreamHandler
for the URL do not define a default port number,
then -1 is returned.

**Returns:** the port number

**Since:** 1.4

## URL.getProtocol()

```java
public String getProtocol()
```

Gets the protocol name of this `URL`.

**Returns:** the protocol of this `URL`.

## URL.getHost()

```java
public String getHost()
```

Gets the host name of this `URL`, if applicable.
The format of the host conforms to RFC 2732, i.e. for a
literal IPv6 address, this method will return the IPv6 address
enclosed in square brackets (`'['` and `']'`).

**Returns:** the host name of this `URL`.

## URL.getFile()

```java
public String getFile()
```

Gets the file name of this `URL`.
The returned file portion will be
the same as `getPath()`, plus the concatenation of
the value of `getQuery()`, if any. If there is
no query portion, this method and `getPath()` will
return identical results.

**Returns:** the file name of this `URL`,
or an empty string if one does not exist

## URL.getRef()

```java
public String getRef()
```

Gets the anchor (also known as the "reference") of this
`URL`.

**Returns:** the anchor (also known as the "reference") of this
         `URL`, or `null` if one does not exist

## URL.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this URL for equality with another object.

If the given object is not a URL then this method immediately returns
`false`.

Two URL objects are equal if they have the same protocol, reference
equivalent hosts, have the same port number on the host, and the same
file and fragment of the file.

Two hosts are considered equivalent if both host names can be resolved
into the same IP addresses; else if either host name can't be
resolved, the host names must be equal without regard to case; or both
host names equal to null.

Since hosts comparison requires name resolution, this operation is a
blocking operation.

Note: The defined behavior for `equals` is known to
be inconsistent with virtual hosting in HTTP.

Parameters:

- `obj`: the URL to compare against.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

## URL.hashCode()

```java
public synchronized int hashCode()
```

Creates an integer suitable for hash table indexing.

The hash code is based upon all the URL components relevant for URL
comparison. As such, this operation is a blocking operation.

**Returns:** a hash code for this `URL`.

## URL.sameFile(URL)

```java
public boolean sameFile(URL other)
```

Compares two URLs, excluding the fragment component.

Returns `true` if this `URL` and the
`other` argument are equal without taking the
fragment component into consideration.

Parameters:

- `other`: the `URL` to compare against.

**Returns:** `true` if they reference the same remote object;
         `false` otherwise.

## URL.toString()

```java
public String toString()
```

Constructs a string representation of this `URL`. The
string is created by calling the `toExternalForm`
method of the stream protocol handler for this object.

**Returns:** a string representation of this object.

**See also:** java.net.URL#URL(java.lang.String, java.lang.String, int,
                 java.lang.String)

**See also:** java.net.URLStreamHandler#toExternalForm(java.net.URL)

## URL.toExternalForm()

```java
public String toExternalForm()
```

Constructs a string representation of this `URL`. The
string is created by calling the `toExternalForm`
method of the stream protocol handler for this object.

**Returns:** a string representation of this object.

**See also:** java.net.URL#URL(java.lang.String, java.lang.String,
                 int, java.lang.String)

**See also:** java.net.URLStreamHandler#toExternalForm(java.net.URL)

## URL.toURI()

```java
public URI toURI() throws URISyntaxException
```

Returns a `java.net.URI` equivalent to this URL.
This method functions in the same way as `new URI (this.toString())`.

Note, any URL instance that complies with RFC 2396 can be converted
to a URI. However, some URLs that are not strictly in compliance
can not be converted to a URI.

**Returns:** a URI instance equivalent to this URL.

**Since:** 1.5

Throws:

- `URISyntaxException`: if this URL is not formatted strictly according to RFC2396 and cannot be converted to a URI.

## URL.openConnection()

```java
public URLConnection openConnection() throws java.io.IOException
```

Returns a URLConnection instance that
represents a connection to the remote object referred to by the
`URL`.

A new instance of URLConnection is
created every time when invoking the
URLStreamHandler.openConnection(URL) method of the protocol handler for
this URL.

It should be noted that a URLConnection instance does not establish
the actual network connection on creation. This will happen only when
calling URLConnection.connect().

If for the URL's protocol (such as HTTP or JAR), there
exists a public, specialized URLConnection subclass belonging
to one of the following packages or one of their subpackages:
java.lang, java.io, java.util, java.net, the connection
returned will be of that subclass. For example, for HTTP an
HttpURLConnection will be returned, and for JAR a
JarURLConnection will be returned.

**Returns:** a URLConnection linking
            to the URL.

**See also:** java.net.URL#URL(java.lang.String, java.lang.String,
            int, java.lang.String)

Throws:

- `IOException`: if an I/O exception occurs.

## URL.openConnection(Proxy)

```java
public URLConnection openConnection(Proxy proxy) throws java.io.IOException
```

Same as `openConnection()`, except that the connection will be
made through the specified proxy; Protocol handlers that do not
support proxying will ignore the proxy parameter and make a
normal connection.

Invoking this method preempts the system's default
ProxySelector settings.

Parameters:

- `proxy`: the Proxy through which this connection will be made. If direct connection is desired, Proxy.NO_PROXY should be specified.

**Returns:** a `URLConnection` to the URL.

**See also:** java.net.URL#URL(java.lang.String, java.lang.String,
            int, java.lang.String)

**See also:** java.net.URLConnection

**See also:** java.net.URLStreamHandler#openConnection(java.net.URL,
            java.net.Proxy)

**Since:** 1.5

Throws:

- `IOException`: if an I/O exception occurs.
- `IllegalArgumentException`: will be thrown if proxy is null, or proxy has the wrong type
- `UnsupportedOperationException`: if the subclass that implements the protocol handler doesn't support this method.

## URL.openStream()

```java
public final InputStream openStream() throws java.io.IOException
```

Opens a connection to this `URL` and returns an
`InputStream` for reading from that connection. This
method is a shorthand for:

```java
    openConnection().getInputStream()
```

**Returns:** an input stream for reading from the URL connection.

**See also:** java.net.URL#openConnection()

**See also:** java.net.URLConnection#getInputStream()

Throws:

- `IOException`: if an I/O exception occurs.

## URL.getContent()

```java
public final Object getContent() throws java.io.IOException
```

Gets the contents of this URL. This method is a shorthand for:

```java
    openConnection().getContent()
```

**Returns:** the contents of this URL.

**See also:** java.net.URLConnection#getContent()

Throws:

- `IOException`: if an I/O exception occurs.

## URL.getContent(Class<?>[])

```java
public final Object getContent(Class<?>[] classes) throws java.io.IOException
```

Gets the contents of this URL. This method is a shorthand for:

```java
    openConnection().getContent(classes)
```

Parameters:

- `classes`: an array of Java types

**Returns:** the content object of this URL that is the first match of
              the types specified in the classes array.
              null if none of the requested types are supported.

**See also:** java.net.URLConnection#getContent(Class[])

**Since:** 1.3

Throws:

- `IOException`: if an I/O exception occurs.
