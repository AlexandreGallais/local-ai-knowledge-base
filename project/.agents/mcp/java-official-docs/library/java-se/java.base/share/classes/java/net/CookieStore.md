---
title: "CookieStore interface (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/CookieStore.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CookieStore interface (java.net)

```java
public interface CookieStore
```

A CookieStore object represents a storage for cookie. Can store and retrieve
cookies.

`CookieManager` will call `CookieStore.add` to save cookies
for every incoming HTTP response, and call `CookieStore.get` to
retrieve cookie for every outgoing HTTP request. A CookieStore
is responsible for removing HttpCookie instances which have expired.

**Since:** 1.6

## CookieStore.add(URI, HttpCookie)

```java
public void add(URI uri, HttpCookie cookie)
```

Adds one HTTP cookie to the store. This is called for every
incoming HTTP response.

A cookie to store may or may not be associated with an URI. If it
is not associated with an URI, the cookie's domain and path attribute
will indicate where it comes from. If it is associated with an URI and
its domain and path attribute are not specified, given URI will indicate
where this cookie comes from.

If a cookie corresponding to the given URI already exists,
then it is replaced with the new one.

Parameters:

- `uri`: the uri this cookie associated with. if `null`, this cookie will not be associated with an URI
- `cookie`: the cookie to store

**See also:** #get

Throws:

- `NullPointerException`: if `cookie` is `null`

## CookieStore.get(URI)

```java
public List<HttpCookie> get(URI uri)
```

Retrieve cookies associated with given URI, or whose domain matches the
given URI. Only cookies that have not expired are returned.
This is called for every outgoing HTTP request.

Parameters:

- `uri`: the uri associated with the cookies to be returned

**Returns:** an immutable list of HttpCookie,
                 return empty list if no cookies match the given URI

**See also:** #add

Throws:

- `NullPointerException`: if `uri` is `null`

## CookieStore.getCookies()

```java
public List<HttpCookie> getCookies()
```

Get all not-expired cookies in cookie store.

**Returns:** an immutable list of http cookies;
                 return empty list if there's no http cookie in store

## CookieStore.getURIs()

```java
public List<URI> getURIs()
```

Get all URIs which identify the cookies in this cookie store.

**Returns:** an immutable list of URIs;
                 return empty list if no cookie in this cookie store
                 is associated with an URI

## CookieStore.remove(URI, HttpCookie)

```java
public boolean remove(URI uri, HttpCookie cookie)
```

Remove a cookie from store.

Parameters:

- `uri`: the uri this cookie associated with. if `null`, the cookie to be removed is not associated with an URI when added; if not `null`, the cookie to be removed is associated with the given URI when added.
- `cookie`: the cookie to remove

**Returns:** `true` if this store contained the specified cookie

Throws:

- `NullPointerException`: if `cookie` is `null`

## CookieStore.removeAll()

```java
public boolean removeAll()
```

Remove all cookies in this cookie store.

**Returns:** `true` if this store changed as a result of the call
