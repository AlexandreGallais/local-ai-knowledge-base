---
title: "URLConnection class (java.net) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URLConnection.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URLConnection class (java.net) (part 2 of 3)

## URLConnection.getHeaderField(String)

```java
public String getHeaderField(String name)
```

Returns the value of the named header field.

If called on a connection that sets the same header multiple times
with possibly different values, only the last value is returned.

Parameters:

- `name`: the name of a header field.

**Returns:** the value of the named header field, or `null`
         if there is no such field in the header.

## URLConnection.getHeaderFields()

```java
public Map<String,List<String>> getHeaderFields()
```

Returns an unmodifiable Map of the header fields.
The Map keys are Strings that represent the
response-header field names. Each Map value is an
unmodifiable List of Strings that represents
the corresponding field values.

This method is overridden by the subclasses of `URLConnection`.

In the implementation of these methods, if a given key has multiple
corresponding values, they must be returned in the order they were added,
preserving the insertion-order.

**Implementation requirements:** The default implementation of this method returns an empty map always.

**Returns:** a Map of header fields

**Since:** 1.4

## URLConnection.getHeaderFieldInt(String, int)

```java
public int getHeaderFieldInt(String name, int defaultValue)
```

Returns the value of the named field parsed as a number.

This form of `getHeaderField` exists because some
connection types (e.g., `http-ng`) have pre-parsed
headers. Classes for that connection type can override this method
and short-circuit the parsing.

Parameters:

- `name`: the name of the header field.
- `defaultValue`: the default value.

**Returns:** the value of the named field, parsed as an integer. The
         `defaultValue` value is returned if the field is
         missing or malformed.

## URLConnection.getHeaderFieldLong(String, long)

```java
public long getHeaderFieldLong(String name, long defaultValue)
```

Returns the value of the named field parsed as a number.

This form of `getHeaderField` exists because some
connection types (e.g., `http-ng`) have pre-parsed
headers. Classes for that connection type can override this method
and short-circuit the parsing.

Parameters:

- `name`: the name of the header field.
- `defaultValue`: the default value.

**Returns:** the value of the named field, parsed as a long. The
         `defaultValue` value is returned if the field is
         missing or malformed.

**Since:** 1.7

## URLConnection.getHeaderFieldDate(String, long)

```java
public long getHeaderFieldDate(String name, long defaultValue)
```

Returns the value of the named field parsed as date.
The result is the number of milliseconds since January 1, 1970 GMT
represented by the named field.

This form of `getHeaderField` exists because some
connection types (e.g., `http-ng`) have pre-parsed
headers. Classes for that connection type can override this method
and short-circuit the parsing.

Parameters:

- `name`: the name of the header field.
- `defaultValue`: a default value.

**Returns:** the value of the field, parsed as a date. The value of the
         `defaultValue` argument is returned if the field is
         missing or malformed.

## URLConnection.getHeaderFieldKey(int)

```java
public String getHeaderFieldKey(int n)
```

Returns the key for the `n`th header field.
Some implementations may treat the `0`th
header field as special, in which case, getHeaderField(0)
may return some value, but `getHeaderFieldKey(0)` returns `null`.
For `n > 0` it returns `null` if there are fewer than `n+1` fields.

Parameters:

- `n`: an index, where `n>=0`

**Returns:** the key for the `n`th header field,
         or `null` if there are fewer than `n+1`
         fields when `n > 0`.

## URLConnection.getHeaderField(int)

```java
public String getHeaderField(int n)
```

Returns the value for the `n`th header field.
It returns `null` if there are fewer than
`n+1` fields.

This method can be used in conjunction with the
getHeaderFieldKey <example-value> to iterate through all
the headers in the message.

Parameters:

- `n`: an index, where `n>=0`

**Returns:** the value of the `n`th header field
         or `null` if there are fewer than `n+1` fields

**See also:** java.net.URLConnection#getHeaderFieldKey(int)

## URLConnection.getContent()

```java
public Object getContent() throws IOException
```

Retrieves the contents of this URL connection.

This method first determines the content type of the object by
calling the `getContentType` method. If this is
the first time that the application has seen that specific content
type, a content handler for that content type is created.

 This is done as follows:

- If the application has set up a content handler factory instance
    using the `setContentHandlerFactory` method, the
    `createContentHandler` method of that instance is called
    with the content type as an argument; the result is a content
    handler for that content type.

- If no `ContentHandlerFactory` has yet been set up,
    or if the factory's `createContentHandler` method
    returns `null`, then the ServiceLoader mechanism is used to locate ContentHandlerFactory
    implementations using the system class
    loader. The order that factories are located is implementation
    specific, and an implementation is free to cache the located
    factories. A ServiceConfigurationError, `Error` or `RuntimeException`
    thrown from the `createContentHandler`, if encountered, will
    be propagated to the calling thread. The `createContentHandler` method of each factory, if instantiated, is
    invoked, with the content type, until a factory returns non-null,
    or all factories have been exhausted.

- Failing that, this method tries to load a content handler
    class as defined by ContentHandler.
    If the class does not exist, or is not a subclass of `ContentHandler`, then an `UnknownServiceException` is thrown.

**Returns:** the object fetched. The `instanceof` operator
              should be used to determine the specific kind of object
              returned.

**See also:** java.net.ContentHandlerFactory#createContentHandler(java.lang.String)

**See also:** java.net.URLConnection#getContentType()

**See also:** java.net.URLConnection#setContentHandlerFactory(java.net.ContentHandlerFactory)

Throws:

- `IOException`: if an I/O error occurs while getting the content.
- `UnknownServiceException`: if the protocol does not support the content type.

## URLConnection.getContent(Class<?>[])

```java
public Object getContent(Class<?>[] classes) throws IOException
```

Retrieves the contents of this URL connection.

Parameters:

- `classes`: the `Class` array indicating the requested types

**Returns:** the object fetched that is the first match of the type
              specified in the classes array. null if none of
              the requested types are supported.
              The `instanceof` operator should be used to
              determine the specific kind of object returned.

**See also:** java.net.URLConnection#getContent()

**See also:** java.net.ContentHandlerFactory#createContentHandler(java.lang.String)

**See also:** java.net.URLConnection#getContent(java.lang.Class[])

**See also:** java.net.URLConnection#setContentHandlerFactory(java.net.ContentHandlerFactory)

**Since:** 1.3

Throws:

- `IOException`: if an I/O error occurs while getting the content.
- `UnknownServiceException`: if the protocol does not support the content type.

## URLConnection.getPermission()

```java
public Permission getPermission() throws IOException
```

Returns a permission object representing the permission
necessary to make the connection represented by this
object. This method returns null if no permission is
required to make the connection. By default, this method
returns `java.security.AllPermission`. Subclasses
should override this method and return the permission
that best represents the permission required to make
a connection to the URL. For example, a `URLConnection`
representing a `file:` URL would return a
`java.io.FilePermission` object.

The permission returned may dependent upon the state of the
connection. For example, the permission before connecting may be
different from that after connecting. For example, an HTTP
sever, say foo.com, may redirect the connection to a different
host, say bar.com. Before connecting the permission returned by
the connection will represent the permission needed to connect
to foo.com, while the permission returned after connecting will
be to bar.com.

Permissions are generally used for two purposes: to protect
caches of objects obtained through URLConnections, and to check
the right of a recipient to learn about a particular URL. In
the first case, the permission should be obtained
*after* the object has been obtained. For example, in an
HTTP connection, this will represent the permission to connect
to the host from which the data was ultimately fetched. In the
second case, the permission should be obtained and tested
*before* connecting.

**Returns:** the permission object representing the permission
necessary to make the connection represented by this
URLConnection.

**Deprecated:** Permissions can no longer be used for controlling access to resources
as the Security Manager is no longer supported.

Throws:

- `IOException`: if the computation of the permission requires network or file I/O and an exception occurs while computing it.

## URLConnection.getInputStream()

```java
public InputStream getInputStream() throws IOException
```

Returns an input stream that reads from this open connection.

A SocketTimeoutException can be thrown when reading from the
returned input stream if the read timeout expires before data
is available for read.

**API note:** The `InputStream` returned by this method can wrap an
InflaterInputStream, whose
int, int) read(byte[], int, int) method can modify any element of the output
buffer.

**Returns:** an input stream that reads from this open connection.

**See also:** #setReadTimeout(int)

**See also:** #getReadTimeout()

Throws:

- `IOException`: if an I/O error occurs while creating the input stream.
- `UnknownServiceException`: if the protocol does not support input.

## URLConnection.getOutputStream()

```java
public OutputStream getOutputStream() throws IOException
```

Returns an output stream that writes to this connection.

**Returns:** an output stream that writes to this connection.

Throws:

- `IOException`: if an I/O error occurs while creating the output stream.
- `UnknownServiceException`: if the protocol does not support output.

## URLConnection.toString()

```java
public String toString()
```

Returns a `String` representation of this URL connection.

**Returns:** a string representation of this `URLConnection`.

## URLConnection.setDoInput(boolean)

```java
public void setDoInput(boolean doinput)
```

Sets the value of the `doInput` field for this
`URLConnection` to the specified value.

A URL connection can be used for input and/or output.  Set the doInput
flag to true if you intend to use the URL connection for input,
false if not.  The default is true.

Parameters:

- `doinput`: the new value.

**See also:** java.net.URLConnection#doInput

**See also:** #getDoInput()

Throws:

- `IllegalStateException`: if already connected

## URLConnection.getDoInput()

```java
public boolean getDoInput()
```

Returns the value of this `URLConnection`'s
`doInput` flag.

**Returns:** the value of this `URLConnection`'s
         `doInput` flag.

**See also:** #setDoInput(boolean)

## URLConnection.setDoOutput(boolean)

```java
public void setDoOutput(boolean dooutput)
```

Sets the value of the `doOutput` field for this
`URLConnection` to the specified value.

A URL connection can be used for input and/or output.  Set the doOutput
flag to true if you intend to use the URL connection for output,
false if not.  The default is false.

Parameters:

- `dooutput`: the new value.

**See also:** #getDoOutput()

Throws:

- `IllegalStateException`: if already connected

## URLConnection.getDoOutput()

```java
public boolean getDoOutput()
```

Returns the value of this `URLConnection`'s
`doOutput` flag.

**Returns:** the value of this `URLConnection`'s
         `doOutput` flag.

**See also:** #setDoOutput(boolean)

## URLConnection.setAllowUserInteraction(boolean)

```java
public void setAllowUserInteraction(boolean allowuserinteraction)
```

Set the value of the `allowUserInteraction` field of
this `URLConnection`.

Parameters:

- `allowuserinteraction`: the new value.

**See also:** #getAllowUserInteraction()

Throws:

- `IllegalStateException`: if already connected

## URLConnection.getAllowUserInteraction()

```java
public boolean getAllowUserInteraction()
```

Returns the value of the `allowUserInteraction` field for
this object.

**Returns:** the value of the `allowUserInteraction` field for
         this object.

**See also:** #setAllowUserInteraction(boolean)

## URLConnection.setDefaultAllowUserInteraction(boolean)

```java
public static void setDefaultAllowUserInteraction(boolean defaultallowuserinteraction)
```

Sets the default value of the
`allowUserInteraction` field for all future
`URLConnection` objects to the specified value.

Parameters:

- `defaultallowuserinteraction`: the new value.

**See also:** #getDefaultAllowUserInteraction()

## URLConnection.getDefaultAllowUserInteraction()

```java
public static boolean getDefaultAllowUserInteraction()
```

Returns the default value of the `allowUserInteraction`
field.

This default is "sticky", being a part of the static state of all
URLConnections.  This flag applies to the next, and all following
URLConnections that are created.

**Returns:** the default value of the `allowUserInteraction`
         field.

**See also:** #setDefaultAllowUserInteraction(boolean)

## URLConnection.setUseCaches(boolean)

```java
public void setUseCaches(boolean usecaches)
```

Sets the value of the `useCaches` field of this
`URLConnection` to the specified value.

Some protocols do caching of documents.  Occasionally, it is important
to be able to "tunnel through" and ignore the caches (e.g., the
"reload" button in a browser).  If the UseCaches flag on a connection
is true, the connection is allowed to use whatever caches it can.
 If false, caches are to be ignored.
 The default value comes from defaultUseCaches, which defaults to
true. A default value can also be set per-protocol using
`setDefaultUseCaches(String,boolean)`.

Parameters:

- `usecaches`: a `boolean` indicating whether or not to allow caching

**See also:** #getUseCaches()

Throws:

- `IllegalStateException`: if already connected

## URLConnection.getUseCaches()

```java
public boolean getUseCaches()
```

Returns the value of this `URLConnection`'s
`useCaches` field.

**Returns:** the value of this `URLConnection`'s
         `useCaches` field.

**See also:** #setUseCaches(boolean)
