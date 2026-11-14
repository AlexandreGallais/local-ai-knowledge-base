---
title: "URLConnection class (java.net) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URLConnection.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URLConnection class (java.net)

```java
public abstract class URLConnection
```

The abstract class `URLConnection` is the superclass
of all classes that represent a communications link between the
application and a URL. Instances of this class can be used both to
read from and to write to the resource referenced by the URL.

In general, creating a connection to a URL is a multistep process:

- The connection object is created by invoking the
    openConnection method on a URL.

- The setup parameters and general request properties are manipulated.

- The actual connection to the remote object is made, using the
   connect method.

- The remote object becomes available. The header fields and the contents
    of the remote object can be accessed.

The setup parameters are modified using the following methods:

- `setAllowUserInteraction`

- `setDoInput`

- `setDoOutput`

- `setIfModifiedSince`

- `setUseCaches`

and the general request properties are modified using the method:

- `setRequestProperty`

Default values for the `AllowUserInteraction` and
`UseCaches` parameters can be set using the methods
`setDefaultAllowUserInteraction` and
`setDefaultUseCaches`.

Each of the above `set` methods has a corresponding
`get` method to retrieve the value of the parameter or
general request property. The specific parameters and general
request properties that are applicable are protocol specific.

The following methods are used to access the header fields and
the contents after the connection is made to the remote object:

- `getContent`

- `getHeaderField`

- `getInputStream`

- `getOutputStream`

Certain header fields are accessed frequently. The methods:

- `getContentEncoding`

- `getContentLength`

- `getContentType`

- `getDate`

- `getExpiration`

- `getLastModified`

provide convenient access to these fields. The
`getContentType` method is used by the
`getContent` method to determine the type of the remote
object; subclasses may find it convenient to override the
`getContentType` method.

In the common case, all of the pre-connection parameters and
general request properties can be ignored: the pre-connection
parameters and request properties default to sensible values. For
most clients of this interface, there are only two interesting
methods: `getInputStream` and `getContent`,
which are mirrored in the `URL` class by convenience methods.

More information on the request properties and header fields of
an `http` connection can be found at:

```java
<a href="http://www.ietf.org/rfc/rfc2616.txt">http://www.ietf.org/rfc/rfc2616.txt</a>
```

Invoking the `close()` methods on the `InputStream` or `OutputStream` of an
`URLConnection` after a request may free network resources associated with this
instance, unless particular protocol specifications specify different behaviours
for it.

**See also:** java.net.URL#openConnection()

**See also:** java.net.URLConnection#connect()

**See also:** java.net.URLConnection#getContent()

**See also:** java.net.URLConnection#getContentEncoding()

**See also:** java.net.URLConnection#getContentLength()

**See also:** java.net.URLConnection#getContentType()

**See also:** java.net.URLConnection#getDate()

**See also:** java.net.URLConnection#getExpiration()

**See also:** java.net.URLConnection#getHeaderField(int)

**See also:** java.net.URLConnection#getHeaderField(java.lang.String)

**See also:** java.net.URLConnection#getInputStream()

**See also:** java.net.URLConnection#getLastModified()

**See also:** java.net.URLConnection#getOutputStream()

**See also:** java.net.URLConnection#setAllowUserInteraction(boolean)

**See also:** java.net.URLConnection#setDefaultUseCaches(boolean)

**See also:** java.net.URLConnection#setDoInput(boolean)

**See also:** java.net.URLConnection#setDoOutput(boolean)

**See also:** java.net.URLConnection#setIfModifiedSince(long)

**See also:** java.net.URLConnection#setRequestProperty(java.lang.String, java.lang.String)

**See also:** java.net.URLConnection#setUseCaches(boolean)

**Since:** 1.0

## URLConnection.url

```java
protected URL url
```

The URL represents the remote object on the World Wide Web to
which this connection is opened.

The value of this field can be accessed by the
`getURL` method.

The default value of this variable is the value of the URL
argument in the `URLConnection` constructor.

**See also:** java.net.URLConnection#getURL()

**See also:** java.net.URLConnection#url

## URLConnection.doInput

```java
protected boolean doInput
```

This variable is set by the `setDoInput` method. Its
value is returned by the `getDoInput` method.

A URL connection can be used for input and/or output. Setting the
`doInput` flag to `true` indicates that
the application intends to read data from the URL connection.

The default value of this field is `true`.

**See also:** java.net.URLConnection#getDoInput()

**See also:** java.net.URLConnection#setDoInput(boolean)

## URLConnection.doOutput

```java
protected boolean doOutput
```

This variable is set by the `setDoOutput` method. Its
value is returned by the `getDoOutput` method.

A URL connection can be used for input and/or output. Setting the
`doOutput` flag to `true` indicates
that the application intends to write data to the URL connection.

The default value of this field is `false`.

**See also:** java.net.URLConnection#getDoOutput()

**See also:** java.net.URLConnection#setDoOutput(boolean)

## URLConnection.allowUserInteraction

```java
protected boolean allowUserInteraction
```

If `true`, this `URL` is being examined in
a context in which it makes sense to allow user interactions such
as popping up an authentication dialog. If `false`,
then no user interaction is allowed.

The value of this field can be set by the
`setAllowUserInteraction` method.
Its value is returned by the
`getAllowUserInteraction` method.
Its default value is the value of the argument in the last invocation
of the `setDefaultAllowUserInteraction` method.

**See also:** java.net.URLConnection#getAllowUserInteraction()

**See also:** java.net.URLConnection#setAllowUserInteraction(boolean)

**See also:** java.net.URLConnection#setDefaultAllowUserInteraction(boolean)

## URLConnection.useCaches

```java
protected boolean useCaches
```

If `true`, the protocol is allowed to use caching
whenever it can. If `false`, the protocol must always
try to get a fresh copy of the object.

This field is set by the `setUseCaches` method. Its
value is returned by the `getUseCaches` method.

Its default value is the value given in the last invocation of the
`setDefaultUseCaches` method.

The default setting may be overridden per protocol with
`setDefaultUseCaches(String,boolean)`.

**See also:** java.net.URLConnection#setUseCaches(boolean)

**See also:** java.net.URLConnection#getUseCaches()

**See also:** java.net.URLConnection#setDefaultUseCaches(boolean)

## URLConnection.ifModifiedSince

```java
protected long ifModifiedSince
```

Some protocols support skipping the fetching of the object unless
the object has been modified more recently than a certain time.

A nonzero value gives a time as the number of milliseconds since
January 1, 1970, GMT. The object is fetched only if it has been
modified more recently than that time.

This variable is set by the `setIfModifiedSince`
method. Its value is returned by the
`getIfModifiedSince` method.

The default value of this field is `0`, indicating
that the fetching must always occur.

**See also:** java.net.URLConnection#getIfModifiedSince()

**See also:** java.net.URLConnection#setIfModifiedSince(long)

## URLConnection.connected

```java
protected boolean connected
```

If `false`, this connection object has not created a
communications link to the specified URL. If `true`,
the communications link has been established.

## URLConnection.getFileNameMap()

```java
public static FileNameMap getFileNameMap()
```

Loads filename map (a mimetable) from a data file. It will
first try to load the user-specific table, defined
by "content.types.user.table" property. If that fails,
it tries to load the default built-in table.

**Returns:** the FileNameMap

**Since:** 1.2

**See also:** #setFileNameMap(java.net.FileNameMap)

## URLConnection.setFileNameMap(FileNameMap)

```java
public static void setFileNameMap(FileNameMap map)
```

Sets the FileNameMap.

Parameters:

- `map`: the FileNameMap to be set

**See also:** #getFileNameMap()

**Since:** 1.2

## URLConnection.connect()

```java
public abstract void connect() throws IOException
```

Opens a communications link to the resource referenced by this
URL, if such a connection has not already been established.

If the `connect` method is called when the connection
has already been opened (indicated by the `connected`
field having the value `true`), the call is ignored.

URLConnection objects go through two phases: first they are
created, then they are connected.  After being created, and
before being connected, various options can be specified
(e.g., doInput and UseCaches).  After connecting, it is an
error to try to set them.  Operations that depend on being
connected, like getContentLength, will implicitly perform the
connection, if necessary.

**See also:** java.net.URLConnection#connected

**See also:** #getConnectTimeout()

**See also:** #setConnectTimeout(int)

Throws:

- `SocketTimeoutException`: if the timeout expires before the connection can be established
- `IOException`: if an I/O error occurs while opening the connection.

## URLConnection.setConnectTimeout(int)

```java
public void setConnectTimeout(int timeout)
```

Sets a specified timeout value, in milliseconds, to be used
when opening a communications link to the resource referenced
by this URLConnection.  If the timeout expires before the
connection can be established, a
java.net.SocketTimeoutException is raised. A timeout of zero is
interpreted as an infinite timeout.

 Some non-standard implementation of this method may ignore
the specified timeout. To see the connect timeout set, please
call getConnectTimeout().

Parameters:

- `timeout`: an `int` that specifies the connect timeout value in milliseconds

**See also:** #getConnectTimeout()

**See also:** #connect()

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the timeout parameter is negative

## URLConnection.getConnectTimeout()

```java
public int getConnectTimeout()
```

Returns setting for connect timeout.

0 return implies that the option is disabled
(i.e., timeout of infinity).

**Returns:** an `int` that indicates the connect timeout
        value in milliseconds

**See also:** #setConnectTimeout(int)

**See also:** #connect()

**Since:** 1.5

## URLConnection.setReadTimeout(int)

```java
public void setReadTimeout(int timeout)
```

Sets the read timeout to a specified timeout, in
milliseconds. A non-zero value specifies the timeout when
reading from Input stream when a connection is established to a
resource. If the timeout expires before there is data available
for read, a java.net.SocketTimeoutException is raised. A
timeout of zero is interpreted as an infinite timeout.

 Some non-standard implementation of this method ignores the
specified timeout. To see the read timeout set, please call
getReadTimeout().

Parameters:

- `timeout`: an `int` that specifies the timeout value to be used in milliseconds

**See also:** #getReadTimeout()

**See also:** InputStream#read()

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the timeout parameter is negative

## URLConnection.getReadTimeout()

```java
public int getReadTimeout()
```

Returns setting for read timeout. 0 return implies that the
option is disabled (i.e., timeout of infinity).

**Returns:** an `int` that indicates the read timeout
        value in milliseconds

**See also:** #setReadTimeout(int)

**See also:** InputStream#read()

**Since:** 1.5

## URLConnection.URLConnection(URL)

```java
protected URLConnection(URL url)
```

Constructs a URL connection to the specified URL. A connection to
the object referenced by the URL is not created.

Parameters:

- `url`: the specified URL.

## URLConnection.getURL()

```java
public URL getURL()
```

Returns the value of this `URLConnection`'s `URL`
field.

**Returns:** the value of this `URLConnection`'s `URL`
         field.

**See also:** java.net.URLConnection#url

## URLConnection.getContentLength()

```java
public int getContentLength()
```

Returns the value of the `content-length` header field.

**Note**: getContentLengthLong()
should be preferred over this method, since it returns a `long`
instead and is therefore more portable.

**Returns:** the content length of the resource that this connection's URL
         references, `-1` if the content length is not known,
         or if the content length is greater than Integer.MAX_VALUE.

## URLConnection.getContentLengthLong()

```java
public long getContentLengthLong()
```

Returns the value of the `content-length` header field as a
long.

**Returns:** the content length of the resource that this connection's URL
         references, or `-1` if the content length is
         not known.

**Since:** 1.7

## URLConnection.getContentType()

```java
public String getContentType()
```

Returns the value of the `content-type` header field.

**Returns:** the content type of the resource that the URL references,
         or `null` if not known.

**See also:** java.net.URLConnection#getHeaderField(java.lang.String)

## URLConnection.getContentEncoding()

```java
public String getContentEncoding()
```

Returns the value of the `content-encoding` header field.

**Returns:** the content encoding of the resource that the URL references,
         or `null` if not known.

**See also:** java.net.URLConnection#getHeaderField(java.lang.String)

## URLConnection.getExpiration()

```java
public long getExpiration()
```

Returns the value of the `expires` header field.

**Returns:** the expiration date of the resource that this URL references,
         or 0 if not known. The value is the number of milliseconds since
         January 1, 1970 GMT.

**See also:** java.net.URLConnection#getHeaderField(java.lang.String)

## URLConnection.getDate()

```java
public long getDate()
```

Returns the value of the `date` header field.

**Returns:** the sending date of the resource that the URL references,
         or `0` if not known. The value returned is the
         number of milliseconds since January 1, 1970 GMT.

**See also:** java.net.URLConnection#getHeaderField(java.lang.String)

## URLConnection.getLastModified()

```java
public long getLastModified()
```

Returns the value of the `last-modified` header field.
The result is the number of milliseconds since January 1, 1970 GMT.

**Returns:** the date the resource referenced by this
         `URLConnection` was last modified, or 0 if not known.

**See also:** java.net.URLConnection#getHeaderField(java.lang.String)
