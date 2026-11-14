---
title: "CacheRequest class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/CacheRequest.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CacheRequest class (java.net)

```java
public abstract class CacheRequest
```

Represents channels for storing resources in the
ResponseCache. Instances of such a class provide an
OutputStream object which is called by protocol handlers to
store the resource data into the cache, and also an abort() method
which allows a cache store operation to be interrupted and
abandoned. If an IOException is encountered while reading the
response or writing to the cache, the current cache store operation
will be aborted.

**Since:** 1.5

## CacheRequest.CacheRequest()

```java
public CacheRequest()
```

Constructor for subclasses to call.

## CacheRequest.getBody()

```java
public abstract OutputStream getBody() throws IOException
```

Returns an OutputStream to which the response body can be
written.

**Returns:** an OutputStream to which the response body can
        be written

Throws:

- `IOException`: if an I/O error occurs while writing the response body

## CacheRequest.abort()

```java
public abstract void abort()
```

Aborts the attempt to cache the response. If an IOException is
encountered while reading the response or writing to the cache,
the current cache store operation will be abandoned.
