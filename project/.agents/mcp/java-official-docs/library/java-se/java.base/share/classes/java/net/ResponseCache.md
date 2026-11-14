---
title: "ResponseCache class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/ResponseCache.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ResponseCache class (java.net)

```java
public abstract class ResponseCache
```

Represents implementations of URLConnection caches. An instance of
such a class can be registered with the system by doing
ResponseCache.setDefault(ResponseCache), and the system will call
this object in order to:

- store resource data which has been retrieved from an
           external source into the cache

- try to fetch a requested resource that may have been
           stored in the cache

The ResponseCache implementation decides which resources
should be cached, and for how long they should be cached. If a
request resource cannot be retrieved from the cache, then the
protocol handlers will fetch the resource from its original
location.

The settings for URLConnection#useCaches controls whether the
protocol is allowed to use a cached response.

For more information on HTTP caching, see *RFC 2616: Hypertext
Transfer Protocol -- HTTP/1.1*

**Since:** 1.5

## ResponseCache.ResponseCache()

```java
public ResponseCache()
```

Constructor for subclasses to call.

## ResponseCache.getDefault()

```java
public static synchronized ResponseCache getDefault()
```

Gets the system-wide response cache.

**See also:** #setDefault(ResponseCache)

**Returns:** the system-wide `ResponseCache`

**Since:** 1.5

## ResponseCache.setDefault(ResponseCache)

```java
public static synchronized void setDefault(ResponseCache responseCache)
```

Sets (or unsets) the system-wide cache.

Note: non-standard protocol handlers may ignore this setting.

Parameters:

- `responseCache`: The response cache, or `null` to unset the cache.

**See also:** #getDefault()

**Since:** 1.5

## ResponseCache.get(URI, String, Map<String, List<String>>)

```java
public abstract CacheResponse get(URI uri, String rqstMethod, Map<String, List<String>> rqstHeaders) throws IOException
```

Retrieve the cached response based on the requesting uri,
request method and request headers. Typically this method is
called by the protocol handler before it sends out the request
to get the network resource. If a cached response is returned,
that resource is used instead.

Parameters:

- `uri`: a `URI` used to reference the requested network resource
- `rqstMethod`: a `String` representing the request method
- `rqstHeaders`: a Map from request header field names to lists of field values representing the current request headers

**Returns:** a `CacheResponse` instance if available
         from cache, or null otherwise

**See also:** java.net.URLConnection#setUseCaches(boolean)

**See also:** java.net.URLConnection#getUseCaches()

**See also:** java.net.URLConnection#setDefaultUseCaches(boolean)

**See also:** java.net.URLConnection#getDefaultUseCaches()

Throws:

- `IOException`: if an I/O error occurs
- `IllegalArgumentException`: if any one of the arguments is null

## ResponseCache.put(URI, URLConnection)

```java
public abstract CacheRequest put(URI uri, URLConnection conn) throws IOException
```

The protocol handler calls this method after a resource has
been retrieved, and the ResponseCache must decide whether or
not to store the resource in its cache. If the resource is to
be cached, then put() must return a CacheRequest object which
contains an OutputStream that the protocol handler will
use to write the resource into the cache. If the resource is
not to be cached, then put must return null.

Parameters:

- `uri`: a `URI` used to reference the requested network resource
- `conn`: a URLConnection instance that is used to fetch the response to be cached

**Returns:** a `CacheRequest` for recording the
           response to be cached. Null return indicates that
           the caller does not intend to cache the response.

Throws:

- `IOException`: if an I/O error occurs
- `IllegalArgumentException`: if any one of the arguments is null
