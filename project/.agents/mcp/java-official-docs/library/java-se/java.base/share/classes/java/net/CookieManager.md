---
title: "CookieManager class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/CookieManager.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CookieManager class (java.net)

```java
public class CookieManager extends CookieHandler
```

CookieManager provides a concrete implementation of `CookieHandler`,
which separates the storage of cookies from the policy surrounding accepting
and rejecting cookies. A CookieManager is initialized with a `CookieStore`
which manages storage, and a `CookiePolicy` object, which makes
policy decisions on cookie acceptance/rejection.

 The HTTP cookie management in java.net package looks like:

```java
                 use
CookieHandler <------- HttpURLConnection
      ^
      | impl
      |         use
CookieManager -------> CookiePolicy
            |   use
            |--------> HttpCookie
            |              ^
            |              | use
            |   use        |
            |--------> CookieStore
                           ^
                           | impl
                           |
                 Internal in-memory implementation
```

-
    CookieHandler is at the core of cookie management. User can call
    CookieHandler.setDefault to set a concrete CookieHandler implementation
    to be used.

-
    CookiePolicy.shouldAccept will be called by CookieManager.put to see whether
    or not one cookie should be accepted and put into cookie store. User can use
    any of three pre-defined CookiePolicy, namely ACCEPT_ALL, ACCEPT_NONE and
    ACCEPT_ORIGINAL_SERVER, or user can define his own CookiePolicy implementation
    and tell CookieManager to use it.

-
    CookieStore is the place where any accepted HTTP cookie is stored in.
    If not specified when created, a CookieManager instance will use an internal
    in-memory implementation. Or user can implements one and tell CookieManager
    to use it.

-
    Currently, only CookieStore.add(URI, HttpCookie) and CookieStore.get(URI)
    are used by CookieManager. Others are for completeness and might be needed
    by a more sophisticated CookieStore implementation, e.g. a NetscapeCookieStore.

There're various ways user can hook up his own HTTP cookie management behavior, e.g.

- Use CookieHandler.setDefault to set a brand new `CookieHandler` implementation

- Let CookieManager be the default `CookieHandler` implementation,
      but implement user's own `CookieStore` and `CookiePolicy`
      and tell default CookieManager to use them:

```java
      // this should be done at the beginning of an HTTP session
      CookieHandler.setDefault(new CookieManager(new MyCookieStore(), new MyCookiePolicy()));
```

- Let CookieManager be the default `CookieHandler` implementation, but
      use customized `CookiePolicy`:

```java
      // this should be done at the beginning of an HTTP session
      CookieHandler.setDefault(new CookieManager());
      // this can be done at any point of an HTTP session
      ((CookieManager)CookieHandler.getDefault()).setCookiePolicy(new MyCookiePolicy());
```

The implementation conforms to RFC 2965, section 3.3.

**See also:** CookiePolicy

**Since:** 1.6

## CookieManager.CookieManager()

```java
public CookieManager()
```

Create a new cookie manager.

This constructor will create new cookie manager with default
cookie store and accept policy. The effect is same as
`CookieManager(null, null)`.

## CookieManager.CookieManager(CookieStore, CookiePolicy)

```java
public CookieManager(CookieStore store, CookiePolicy cookiePolicy)
```

Create a new cookie manager with specified cookie store and cookie policy.

Parameters:

- `store`: a `CookieStore` to be used by cookie manager. if `null`, cookie manager will use a default one, which is an in-memory CookieStore implementation.
- `cookiePolicy`: a `CookiePolicy` instance to be used by cookie manager as policy callback. if `null`, ACCEPT_ORIGINAL_SERVER will be used.

## CookieManager.setCookiePolicy(CookiePolicy)

```java
public void setCookiePolicy(CookiePolicy cookiePolicy)
```

To set the cookie policy of this cookie manager.

 An instance of `CookieManager` will have
cookie policy ACCEPT_ORIGINAL_SERVER by default. Users always
can call this method to set another cookie policy.

Parameters:

- `cookiePolicy`: the cookie policy. Can be `null`, which has no effects on current cookie policy.

## CookieManager.getCookieStore()

```java
public CookieStore getCookieStore()
```

To retrieve current cookie store.

**Returns:** the cookie store currently used by cookie manager.
