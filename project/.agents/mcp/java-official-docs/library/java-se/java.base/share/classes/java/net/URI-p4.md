---
title: "URI class (java.net) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URI.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URI class (java.net) (part 4 of 4)

## URI.compareTo(URI)

```java
public int compareTo(URI that)
```

Compares this URI to another object, which must be a URI.

 When comparing corresponding components of two URIs, if one
component is undefined but the other is defined then the first is
considered to be less than the second.  Unless otherwise noted, string
components are ordered according to their natural, case-sensitive
ordering as defined by the String.compareTo method.  String components that are subject to
encoding are compared by comparing their raw forms rather than their
encoded forms and the hexadecimal digits of escaped octets are compared
without regard to case.

 The ordering of URIs is defined as follows:

-

 Two URIs with different schemes are ordered according the
  ordering of their schemes, without regard to case.

-

 A hierarchical URI is considered to be less than an opaque URI
  with an identical scheme.

-

 Two opaque URIs with identical schemes are ordered according
  to the ordering of their scheme-specific parts.

-

 Two opaque URIs with identical schemes and scheme-specific
  parts are ordered according to the ordering of their
  fragments.

-

 Two hierarchical URIs with identical schemes are ordered
  according to the ordering of their authority components:

-

 If both authority components are server-based then the URIs
    are ordered according to their user-information components; if these
    components are identical then the URIs are ordered according to the
    ordering of their hosts, without regard to case; if the hosts are
    identical then the URIs are ordered according to the ordering of
    their ports.

-

 If one or both authority components are registry-based then
    the URIs are ordered according to the ordering of their authority
    components.

-

 Finally, two hierarchical URIs with identical schemes and
  authority components are ordered according to the ordering of their
  paths; if their paths are identical then they are ordered according to
  the ordering of their queries; if the queries are identical then they
  are ordered according to the order of their fragments.

 This method satisfies the general contract of the Comparable.compareTo
method.

Parameters:

- `that`: The object to which this URI is to be compared

**Returns:** A negative integer, zero, or a positive integer as this URI is
         less than, equal to, or greater than the given URI

Throws:

- `ClassCastException`: If the given object is not a URI

## URI.toString()

```java
public String toString()
```

Returns the content of this URI as a string.

 If this URI was created by invoking one of the constructors in this
class then a string equivalent to the original input string, or to the
string computed from the originally-given components, as appropriate, is
returned.  Otherwise this URI was created by normalization, resolution,
or relativization, and so a string is constructed from this URI's
components according to the rules specified in RFC 2396,
section 5.2, step 7.

**Returns:** The string form of this URI

## URI.toASCIIString()

```java
public String toASCIIString()
```

Returns the content of this URI as a US-ASCII string.

 If this URI does not contain any characters in the *other*
category then an invocation of this method will return the same value as
an invocation of the toString method.  Otherwise
this method works as if by invoking that method and then encoding the result.

**Returns:** The string form of this URI, encoded as needed
         so that it only contains characters in the US-ASCII
         charset
