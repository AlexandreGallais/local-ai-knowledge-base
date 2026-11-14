---
title: "HttpHeaders class (java.net.http)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.net.http/share/classes/java/net/http/HttpHeaders.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpHeaders class (java.net.http)

```java
public final class HttpHeaders
```

A read-only view of a set of HTTP headers.

 An `HttpHeaders` is not typically created directly, but rather
returned from an HttpRequest or an
HttpResponse. Specific HTTP headers can be
set for a request through one of the request
builder's String) headers methods.

 The methods of this class ( that accept a String header name ), and the
`Map` returned by the map method, operate without regard
to case when retrieving the header value(s).

 An HTTP header name may appear more than once in the HTTP protocol. As
such, headers are represented as a name and a list of values. Each occurrence
of a header value is added verbatim, to the appropriate header name list,
without interpreting its value. In particular, `HttpHeaders` does not
perform any splitting or joining of comma separated header value strings. The
order of elements in a header value list is preserved when String) building a request. For
responses, the order of elements in a header value list is the order in which
they were received. The `Map` returned by the `map` method,
however, does not provide any guarantee with regard to the ordering of its
entries.

 `HttpHeaders` instances are immutable.

**Since:** 11

## HttpHeaders.firstValue(String)

```java
public Optional<String> firstValue(String name)
```

Returns an `Optional` containing the first header string value of
the given named (and possibly multi-valued) header. If the header is not
present, then the returned `Optional` is empty.

Parameters:

- `name`: the header name

**Returns:** an `Optional<String>` containing the first named header
        string value, if present

## HttpHeaders.firstValueAsLong(String)

```java
public OptionalLong firstValueAsLong(String name)
```

Returns an `OptionalLong` containing the first header string value
of the named header field. If the header is not present, then the
Optional is empty. If the header is present but contains a value that
does not parse as a `Long` value, then an exception is thrown.

Parameters:

- `name`: the header name

**Returns:** an `OptionalLong`

Throws:

- `NumberFormatException`: if a value is found, but does not parse as a Long

## HttpHeaders.allValues(String)

```java
public List<String> allValues(String name)
```

Returns an unmodifiable List of all of the header string values of the
given named header. Always returns a List, which may be empty if the
header is not present.

Parameters:

- `name`: the header name

**Returns:** a List of headers string values

## HttpHeaders.map()

```java
public Map<String,List<String>> map()
```

Returns an unmodifiable multi Map view of this HttpHeaders.

**Returns:** the Map

## HttpHeaders.equals(Object)

```java
public final boolean equals(Object obj)
```

Tests this HTTP headers instance for equality with the given object.

 If the given object is not an `HttpHeaders` then this
method returns `false`. Two HTTP headers are equal if each
of their corresponding maps are equal.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `obj`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is an `HttpHeaders` that is equal to this HTTP headers

## HttpHeaders.hashCode()

```java
public final int hashCode()
```

Computes a hash code for this HTTP headers instance.

 The hash code is based upon the components of the HTTP headers
map, and satisfies the general contract of the
Object.hashCode method.

**Returns:** the hash-code value for this HTTP headers

## HttpHeaders.toString()

```java
public String toString()
```

Returns this HTTP headers as a string.

**Returns:** a string describing the HTTP headers

## HttpHeaders.of(Map<String,List<String>>, BiPredicate<String,String>)

```java
public static HttpHeaders of(Map<String,List<String>> headerMap, BiPredicate<String,String> filter)
```

Returns an HTTP headers from the given map. The given map's key
represents the header name, and its value the list of string header
values for that header name.

 An HTTP header name may appear more than once in the HTTP protocol.
Such, *multi-valued*, headers must be represented by a single entry
in the given map, whose entry value is a list that represents the
multiple header string values. Leading and trailing whitespaces are
removed from all string values retrieved from the given map and its lists
before processing. Only headers that, after filtering, contain at least
one, possibly empty string, value will be added to the HTTP headers.

Parameters:

- `headerMap`: the map containing the header names and values
- `filter`: a filter that can be used to inspect each header-name-and-value pair in the given map to determine if it should, or should not, be added to the to the HTTP headers

**API note:** The primary purpose of this method is for testing frameworks.
Per-request headers can be set through one of the `HttpRequest`
String) headers methods.

**Returns:** an HTTP headers instance containing the given headers

Throws:

- `NullPointerException`: if any of: `headerMap`, a key or value in the given map, or an entry in the map's value list, or `filter`, is `null`
- `IllegalArgumentException`: if the given `headerMap` contains any two keys that are equal ( without regard to case ); or if the given map contains any key whose length, after trimming whitespaces, is `0`
