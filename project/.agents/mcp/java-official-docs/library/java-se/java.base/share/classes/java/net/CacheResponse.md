---
title: "CacheResponse class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/CacheResponse.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CacheResponse class (java.net)

```java
public abstract class CacheResponse
```

Represent channels for retrieving resources from the
ResponseCache. Instances of such a class provide an
InputStream that returns the entity body, and also a
getHeaders() method which returns the associated response headers.

**Since:** 1.5

## CacheResponse.CacheResponse()

```java
public CacheResponse()
```

Constructor for subclasses to call.

## CacheResponse.getHeaders()

```java
public abstract Map<String, List<String>> getHeaders() throws IOException
```

Returns the response headers as a Map.

**Returns:** An immutable Map from response header field names to
        lists of field values. The status line has null as its
        field name.

Throws:

- `IOException`: if an I/O error occurs while getting the response headers

## CacheResponse.getBody()

```java
public abstract InputStream getBody() throws IOException
```

Returns the response body as an InputStream.

**Returns:** an InputStream from which the response body can
        be accessed

Throws:

- `IOException`: if an I/O error occurs while getting the response body
