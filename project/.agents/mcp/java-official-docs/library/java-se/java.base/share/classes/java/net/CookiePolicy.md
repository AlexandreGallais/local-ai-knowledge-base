---
title: "CookiePolicy interface (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/CookiePolicy.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CookiePolicy interface (java.net)

```java
public interface CookiePolicy
```

CookiePolicy implementations decide which cookies should be accepted
and which should be rejected. Three pre-defined policy implementations
are provided, namely ACCEPT_ALL, ACCEPT_NONE and ACCEPT_ORIGINAL_SERVER.

See RFC 2965 sec. 3.3 and 7 for more detail.

**Since:** 1.6

## CookiePolicy.ACCEPT_ALL

```java
public static final CookiePolicy ACCEPT_ALL
```

One pre-defined policy which accepts all cookies.

## CookiePolicy.ACCEPT_NONE

```java
public static final CookiePolicy ACCEPT_NONE
```

One pre-defined policy which accepts no cookies.

## CookiePolicy.ACCEPT_ORIGINAL_SERVER

```java
public static final CookiePolicy ACCEPT_ORIGINAL_SERVER
```

One pre-defined policy which only accepts cookies from original server.

## CookiePolicy.shouldAccept(URI, HttpCookie)

```java
public boolean shouldAccept(URI uri, HttpCookie cookie)
```

Will be called to see whether or not this cookie should be accepted.

Parameters:

- `uri`: the URI to consult accept policy with
- `cookie`: the HttpCookie object in question

**Returns:** `true` if this cookie should be accepted;
                 otherwise, `false`
