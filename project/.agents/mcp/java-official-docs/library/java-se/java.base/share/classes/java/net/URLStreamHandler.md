---
title: "URLStreamHandler class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URLStreamHandler.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URLStreamHandler class (java.net)

```java
public abstract class URLStreamHandler
```

The abstract class `URLStreamHandler` is the common
superclass for all stream protocol handlers. A stream protocol
handler knows how to make a connection for a particular protocol
type, such as `http` or `https`.

In most cases, an instance of a `URLStreamHandler`
subclass is not created directly by an application. Rather, the
first time a protocol name is encountered when constructing a
`URL`, the appropriate stream protocol handler is
automatically loaded.

**See also:** java.net.URL#URL(java.lang.String, java.lang.String, int, java.lang.String)

**Since:** 1.0

## URLStreamHandler.URLStreamHandler()

```java
public URLStreamHandler()
```

Constructor for subclasses to call.

## URLStreamHandler.openConnection(URL)

```java
protected abstract URLConnection openConnection(URL u) throws IOException
```

Opens a connection to the object referenced by the
`URL` argument.
This method should be overridden by a subclass.

If for the handler's protocol (such as HTTP or JAR), there
exists a public, specialized URLConnection subclass belonging
to one of the following packages or one of their subpackages:
java.lang, java.io, java.util, java.net, the connection
returned will be of that subclass. For example, for HTTP an
HttpURLConnection will be returned, and for JAR a
JarURLConnection will be returned.

Parameters:

- `u`: the URL that this connects to.

**Returns:** a `URLConnection` object for the `URL`.

Throws:

- `IOException`: if an I/O error occurs while opening the connection.

## URLStreamHandler.openConnection(URL, Proxy)

```java
protected URLConnection openConnection(URL u, Proxy p) throws IOException
```

Same as openConnection(URL), except that the connection will be
made through the specified proxy; Protocol handlers that do not
support proxying will ignore the proxy parameter and make a
normal connection.

 Calling this method preempts the system's default
ProxySelector settings.

Parameters:

- `u`: the URL that this connects to.
- `p`: the proxy through which the connection will be made. If direct connection is desired, Proxy.NO_PROXY should be specified.

**Implementation requirements:** The default implementation of this method first checks that the given
`URL` and `Proxy` are not null, then throws `UnsupportedOperationException`. Subclasses should override this method
with an appropriate implementation.

**Returns:** a `URLConnection` object for the `URL`.

**Since:** 1.5

Throws:

- `IOException`: if an I/O error occurs while opening the connection.
- `IllegalArgumentException`: if either u or p is null, or p has the wrong type.
- `UnsupportedOperationException`: if the subclass that implements the protocol doesn't support this method.

## URLStreamHandler.parseURL(URL, String, int, int)

```java
protected void parseURL(URL u, String spec, int start, int limit)
```

Parses the string representation of a `URL` into a
`URL` object.

If there is any inherited context, then it has already been
copied into the `URL` argument.

The `parseURL` method of `URLStreamHandler`
parses the string representation as if it were an
`http` specification. Most URL protocol families have a
similar parsing. A stream protocol handler for a protocol that has
a different syntax must override this routine.

Parameters:

- `u`: the `URL` to receive the result of parsing the spec.
- `spec`: the `String` representing the URL that must be parsed.
- `start`: the character index at which to begin parsing. This is just past the '`:`' (if there is one) that specifies the determination of the protocol name.
- `limit`: the character position to stop parsing at. This is the end of the string or the position of the "`#`" character, if present. All information after the sharp sign indicates an anchor.

Throws:

- `IllegalArgumentException`: if the implementation of the protocol handler rejects any of the given parameters
- `NullPointerException`: if `u` is `null`, or if `start < limit` and `spec` is `null`

## URLStreamHandler.getDefaultPort()

```java
protected int getDefaultPort()
```

Returns the default port for a URL parsed by this handler. This method
is meant to be overridden by handlers with default port numbers.

**Returns:** the default port for a `URL` parsed by this handler.

**Since:** 1.3

## URLStreamHandler.equals(URL, URL)

```java
protected boolean equals(URL u1, URL u2)
```

Provides the default equals calculation. May be overridden by handlers
for other protocols that have different requirements for equals().
This method requires that none of its arguments is null. This is
guaranteed by the fact that it is only called by java.net.URL class.

Parameters:

- `u1`: a URL object
- `u2`: a URL object

**Returns:** `true` if the two urls are
considered equal, i.e. they refer to the same
fragment in the same file.

**Since:** 1.3

## URLStreamHandler.hashCode(URL)

```java
protected int hashCode(URL u)
```

Provides the default hash calculation. May be overridden by handlers for
other protocols that have different requirements for hashCode
calculation.

Parameters:

- `u`: a URL object

**Returns:** an `int` suitable for hash table indexing

**Since:** 1.3

## URLStreamHandler.sameFile(URL, URL)

```java
protected boolean sameFile(URL u1, URL u2)
```

Compare two urls to see whether they refer to the same file,
i.e., having the same protocol, host, port, and path.
This method requires that none of its arguments is null. This is
guaranteed by the fact that it is only called indirectly
by java.net.URL class.

Parameters:

- `u1`: a URL object
- `u2`: a URL object

**Returns:** true if u1 and u2 refer to the same file

**Since:** 1.3

## URLStreamHandler.getHostAddress(URL)

```java
protected InetAddress getHostAddress(URL u)
```

Get the IP address of our host. An empty host field or a DNS failure
will result in a null return.

Parameters:

- `u`: a URL object

**Returns:** an `InetAddress` representing the host
IP address.

**Since:** 1.3

## URLStreamHandler.hostsEqual(URL, URL)

```java
protected boolean hostsEqual(URL u1, URL u2)
```

Compares the host components of two URLs.

Parameters:

- `u1`: the URL of the first host to compare
- `u2`: the URL of the second host to compare

**Returns:** `true` if and only if they
are equal, `false` otherwise.

**Since:** 1.3

## URLStreamHandler.toExternalForm(URL)

```java
protected String toExternalForm(URL u)
```

Converts a `URL` of a specific protocol to a
`String`.

Parameters:

- `u`: the URL.

**Returns:** a string representation of the `URL` argument.

## URLStreamHandler.setURL(URL, String, String, int, String, String, String, String, String)

```java
protected void setURL(URL u, String protocol, String host, int port, String authority, String userInfo, String path, String query, String ref)
```

Sets the fields of the `URL` argument to the indicated values.
Only classes derived from URLStreamHandler are able
to use this method to set the values of the URL fields.

Parameters:

- `u`: the URL to modify.
- `protocol`: the protocol name.
- `host`: the remote host value for the URL.
- `port`: the port on the remote machine.
- `authority`: the authority part for the URL.
- `userInfo`: the userInfo part of the URL.
- `path`: the path component of the URL.
- `query`: the query part for the URL.
- `ref`: the reference.

**Since:** 1.3

Throws:

- `SecurityException`: if the protocol handler of the URL is different from this one
- `IllegalArgumentException`: if the implementation of the protocol handler rejects any of the given parameters
- `NullPointerException`: if `u` is `null`

## URLStreamHandler.setURL(URL, String, String, int, String, String)

```java
protected void setURL(URL u, String protocol, String host, int port, String file, String ref)
```

Sets the fields of the `URL` argument to the indicated values.
Only classes derived from URLStreamHandler are able
to use this method to set the values of the URL fields.

Parameters:

- `u`: the URL to modify.
- `protocol`: the protocol name. This value is ignored since 1.2.
- `host`: the remote host value for the URL.
- `port`: the port on the remote machine.
- `file`: the file.
- `ref`: the reference.

**Deprecated:** Use setURL(URL, String, String, int, String, String, String,
            String);

Throws:

- `SecurityException`: if the protocol handler of the URL is different from this one
- `IllegalArgumentException`: if the implementation of the protocol handler rejects any of the given parameters
- `NullPointerException`: if `u` is `null`
