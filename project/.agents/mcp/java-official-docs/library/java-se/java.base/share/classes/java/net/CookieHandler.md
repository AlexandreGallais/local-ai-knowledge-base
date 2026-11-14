---
title: "CookieHandler class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/CookieHandler.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CookieHandler class (java.net)

```java
public abstract class CookieHandler
```

A CookieHandler object provides a callback mechanism to hook up a
HTTP state management policy implementation into the HTTP protocol
handler. The HTTP state management mechanism specifies a way to
create a stateful session with HTTP requests and responses.

 A system-wide CookieHandler to be used by the HTTP URL stream protocol handler can be registered by
doing a CookieHandler.setDefault(CookieHandler). The currently registered
CookieHandler can be retrieved by calling
CookieHandler.getDefault().

For more information on HTTP state management, see *RFC 2965: HTTP
State Management Mechanism*

**Since:** 1.5

## CookieHandler.CookieHandler()

```java
public CookieHandler()
```

Constructor for subclasses to call.

## CookieHandler.getDefault()

```java
public static synchronized CookieHandler getDefault()
```

Gets the system-wide cookie handler.

**Returns:** the system-wide cookie handler; A null return means
       there is no system-wide cookie handler currently set.

**See also:** #setDefault(CookieHandler)

## CookieHandler.setDefault(CookieHandler)

```java
public static synchronized void setDefault(CookieHandler cHandler)
```

Sets (or unsets) the system-wide cookie handler.

Note: non-standard http protocol handlers may ignore this setting.

Parameters:

- `cHandler`: The HTTP cookie handler, or `null` to unset.

**See also:** #getDefault()

## CookieHandler.get(URI, Map<String, List<String>>)

```java
public abstract Map<String, List<String>> get(URI uri, Map<String, List<String>> requestHeaders) throws IOException
```

Gets all the applicable cookies from a cookie cache for the
specified uri in the request header.

The `URI` passed as an argument specifies the intended use for
the cookies. In particular the scheme should reflect whether the cookies
will be sent over http, https or used in another context like javascript.
The host part should reflect either the destination of the cookies or
their origin in the case of javascript.

It is up to the implementation to take into account the `URI` and
the cookies attributes and security settings to determine which ones
should be returned.

HTTP protocol implementers should make sure that this method is
called after all request headers related to choosing cookies
are added, and before the request is sent.

Parameters:

- `uri`: a `URI` representing the intended use for the cookies
- `requestHeaders`: a Map from request header field names to lists of field values representing the current request headers

**Returns:** an immutable map from state management headers, with
           field names "Cookie" or "Cookie2" to a list of
           cookies containing state information

**See also:** #put(URI, Map)

Throws:

- `IOException`: if an I/O error occurs
- `IllegalArgumentException`: if either argument is null

## CookieHandler.put(URI, Map<String, List<String>>)

```java
public abstract void put(URI uri, Map<String, List<String>> responseHeaders) throws IOException
```

Sets all the applicable cookies, examples are response header
fields that are named Set-Cookie2, present in the response
headers into a cookie cache.

Parameters:

- `uri`: a `URI` where the cookies come from
- `responseHeaders`: an immutable map from field names to lists of field values representing the response header fields returned

**See also:** #get(URI, Map)

Throws:

- `IOException`: if an I/O error occurs
- `IllegalArgumentException`: if either argument is null
