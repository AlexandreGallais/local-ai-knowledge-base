---
title: "URLConnection class (java.net) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URLConnection.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URLConnection class (java.net) (part 3 of 3)

## URLConnection.setIfModifiedSince(long)

```java
public void setIfModifiedSince(long ifmodifiedsince)
```

Sets the value of the `ifModifiedSince` field of
this `URLConnection` to the specified value.

Parameters:

- `ifmodifiedsince`: the new value.

**See also:** #getIfModifiedSince()

Throws:

- `IllegalStateException`: if already connected

## URLConnection.getIfModifiedSince()

```java
public long getIfModifiedSince()
```

Returns the value of this object's `ifModifiedSince` field.

**Returns:** the value of this object's `ifModifiedSince` field.

**See also:** #setIfModifiedSince(long)

## URLConnection.getDefaultUseCaches()

```java
public boolean getDefaultUseCaches()
```

Returns the default value of a `URLConnection`'s
`useCaches` flag.

This default is "sticky", being a part of the static state of all
URLConnections.  This flag applies to the next, and all following
URLConnections that are created. This default value can be over-ridden
per protocol using `setDefaultUseCaches(String,boolean)`

**Returns:** the default value of a `URLConnection`'s
         `useCaches` flag.

**See also:** #setDefaultUseCaches(boolean)

## URLConnection.setDefaultUseCaches(boolean)

```java
public void setDefaultUseCaches(boolean defaultusecaches)
```

Sets the default value of the `useCaches` field to the
specified value. This default value can be over-ridden
per protocol using `setDefaultUseCaches(String,boolean)`

Parameters:

- `defaultusecaches`: the new value.

**See also:** #getDefaultUseCaches()

## URLConnection.setDefaultUseCaches(String, boolean)

```java
public static void setDefaultUseCaches(String protocol, boolean defaultVal)
```

Sets the default value of the `useCaches` field for the named
protocol to the given value. This value overrides any default setting
set by `setDefaultUseCaches(boolean)` for the given protocol.
Successive calls to this method change the setting and affect the
default value for all future connections of that protocol. The protocol
name is case insensitive.

Parameters:

- `protocol`: the protocol to set the default for
- `defaultVal`: whether caching is enabled by default for the given protocol

**Since:** 9

## URLConnection.getDefaultUseCaches(String)

```java
public static boolean getDefaultUseCaches(String protocol)
```

Returns the default value of the `useCaches` flag for the given protocol. If
`setDefaultUseCaches(String,boolean)` was called for the given protocol,
then that value is returned. Otherwise, if `setDefaultUseCaches(boolean)`
was called, then that value is returned. If neither method was called,
the return value is `true`. The protocol name is case insensitive.

Parameters:

- `protocol`: the protocol whose defaultUseCaches setting is required

**Returns:** the default value of the `useCaches` flag for the given protocol.

**Since:** 9

## URLConnection.setRequestProperty(String, String)

```java
public void setRequestProperty(String key, String value)
```

Sets the general request property. If a property with the key <example-value>
exists, overwrite its value with the new value.

 NOTE: HTTP requires all request properties which can
legally have multiple instances with the same key
to use a comma-separated list syntax which enables multiple
properties to be appended into a single property.

Parameters:

- `key`: the keyword by which the request is known (e.g., "`Accept`").
- `value`: the value associated with it.

**See also:** #getRequestProperty(java.lang.String)

Throws:

- `IllegalStateException`: if already connected
- `NullPointerException`: if key is `null`

## URLConnection.addRequestProperty(String, String)

```java
public void addRequestProperty(String key, String value)
```

Adds a general request property specified by a
key-value pair.  This method will not overwrite
existing values associated with the same key.

This method could be a no-op if appending a value
to the map is not supported by the protocol being
used in a given subclass.

Parameters:

- `key`: the keyword by which the request is known (e.g., "`Accept`").
- `value`: the value associated with it.

**See also:** #getRequestProperties()

**Since:** 1.4

Throws:

- `IllegalStateException`: if already connected
- `NullPointerException`: if key is null

## URLConnection.getRequestProperty(String)

```java
public String getRequestProperty(String key)
```

Returns the value of the named general request property for this
connection.

Parameters:

- `key`: the keyword by which the request is known (e.g., "Accept").

**Returns:** the value of the named general request property for this
          connection. If key is null, then null is returned.

**See also:** #setRequestProperty(java.lang.String, java.lang.String)

Throws:

- `IllegalStateException`: if already connected

## URLConnection.getRequestProperties()

```java
public Map<String,List<String>> getRequestProperties()
```

Returns an unmodifiable Map of general request
properties for this connection. The Map keys
are Strings that represent the request-header
field names. Each Map value is a unmodifiable List
of Strings that represents the corresponding
field values.

If multiple values for a given key are added via the
String) method,
these values will be returned in the order they were
added. This method must preserve the insertion order
of such values.

The default implementation of this method preserves the insertion order when
multiple values are added for a given key. The values are returned in the order they
were added.

**Returns:** a Map of the general request properties for this connection.

**Since:** 1.4

Throws:

- `IllegalStateException`: if already connected

## URLConnection.setDefaultRequestProperty(String, String)

```java
public static void setDefaultRequestProperty(String key, String value)
```

Sets the default value of a general request property. When a
`URLConnection` is created, it is initialized with
these properties.

Parameters:

- `key`: the keyword by which the request is known (e.g., "`Accept`").
- `value`: the value associated with the key.

**See also:** java.net.URLConnection#setRequestProperty(java.lang.String,java.lang.String)

**Deprecated:** The instance specific setRequestProperty method
should be used after an appropriate instance of URLConnection
is obtained. Invoking this method will have no effect.

**See also:** #getDefaultRequestProperty(java.lang.String)

## URLConnection.getDefaultRequestProperty(String)

```java
public static String getDefaultRequestProperty(String key)
```

Returns the value of the default request property. Default request
properties are set for every connection.

Parameters:

- `key`: the keyword by which the request is known (e.g., "Accept").

**Returns:** the value of the default request property
for the specified key.

**See also:** java.net.URLConnection#getRequestProperty(java.lang.String)

**Deprecated:** The instance specific getRequestProperty method
should be used after an appropriate instance of URLConnection
is obtained.

**See also:** #setDefaultRequestProperty(java.lang.String, java.lang.String)

## URLConnection.setContentHandlerFactory(ContentHandlerFactory)

```java
public static synchronized void setContentHandlerFactory(ContentHandlerFactory fac)
```

Sets the `ContentHandlerFactory` of an
application. It can be called at most once by an application.

The `ContentHandlerFactory` instance is used to
construct a content handler from a content type.

Parameters:

- `fac`: the desired factory.

**See also:** java.net.ContentHandlerFactory

**See also:** java.net.URLConnection#getContent()

Throws:

- `Error`: if the factory has already been defined.

## URLConnection.guessContentTypeFromName(String)

```java
public static String guessContentTypeFromName(String fname)
```

Tries to determine the content type of an object, based
on the specified "file" component of a URL.
This is a convenience method that can be used by
subclasses that override the `getContentType` method.

Parameters:

- `fname`: a filename.

**Returns:** a guess as to what the content type of the object is,
         based upon its file name.

**See also:** java.net.URLConnection#getContentType()

## URLConnection.guessContentTypeFromStream(InputStream)

```java
public static String guessContentTypeFromStream(InputStream is) throws IOException
```

Tries to determine the type of an input stream based on the
characters at the beginning of the input stream. This method can
be used by subclasses that override the
`getContentType` method.

Ideally, this routine would not be needed. But many
`http` servers return the incorrect content type; in
addition, there are many nonstandard extensions. Direct inspection
of the bytes to determine the content type is often more accurate
than believing the content type claimed by the `http` server.

Parameters:

- `is`: an input stream that supports marks.

**Returns:** a guess at the content type, or `null` if none
            can be determined.

**See also:** java.io.InputStream#mark(int)

**See also:** java.io.InputStream#markSupported()

**See also:** java.net.URLConnection#getContentType()

Throws:

- `IOException`: if an I/O error occurs while reading the input stream.
