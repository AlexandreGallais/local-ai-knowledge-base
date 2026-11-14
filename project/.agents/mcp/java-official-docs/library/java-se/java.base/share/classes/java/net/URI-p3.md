---
title: "URI class (java.net) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URI.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URI class (java.net) (part 3 of 4)

## URI.resolve(URI)

```java
public URI resolve(URI uri)
```

Resolves the given URI against this URI.

 If the given URI is already absolute, or if this URI is opaque, then
the given URI is returned.

 If the given URI's fragment component is
defined, its path component is empty, and its scheme, authority, and
query components are undefined, then a URI with the given fragment but
with all other components equal to those of this URI is returned.  This
allows a URI representing a standalone fragment reference, such as
`"#foo"`, to be usefully resolved against a base URI.

 Otherwise this method constructs a new hierarchical URI in a manner
consistent with RFC 2396,
section 5.2; that is:

-

 A new URI is constructed with this URI's scheme and the given
  URI's query and fragment components.

-

 If the given URI has an authority component then the new URI's
  authority and path are taken from the given URI.

-

 Otherwise the new URI's authority component is copied from
  this URI, and its path is computed as follows:

-

 If the given URI's path is absolute then the new URI's path
    is taken from the given URI.

-

 Otherwise the given URI's path is relative, and so the new
    URI's path is computed by resolving the path of the given URI
    against the path of this URI.  This is done by concatenating all but
    the last segment of this URI's path, if any, with the given URI's
    path and then normalizing the result as if by invoking the normalize method.

 The result of this method is absolute if, and only if, either this
URI is absolute or the given URI is absolute.

Parameters:

- `uri`: The URI to be resolved against this URI

**Returns:** The resulting URI

Throws:

- `NullPointerException`: If `uri` is `null`

## URI.resolve(String)

```java
public URI resolve(String str)
```

Constructs a new URI by parsing the given string and then resolving it
against this URI.

 This convenience method works as if invoking it were equivalent to
evaluating the expression resolve`(URI.`create`(str))`.

Parameters:

- `str`: The string to be parsed into a URI

**Returns:** The resulting URI

Throws:

- `NullPointerException`: If `str` is `null`
- `IllegalArgumentException`: If the given string violates RFC 2396

## URI.relativize(URI)

```java
public URI relativize(URI uri)
```

Relativizes the given URI against this URI.

 The relativization of the given URI against this URI is computed as
follows:

-

 If either this URI or the given URI are opaque, or if the
  scheme and authority components of the two URIs are not identical, or
  if the path of this URI is not a prefix of the path of the given URI,
  then the given URI is returned.

-

 Otherwise a new relative hierarchical URI is constructed with
  query and fragment components taken from the given URI and with a path
  component computed by removing this URI's path from the beginning of
  the given URI's path.

Parameters:

- `uri`: The URI to be relativized against this URI

**Returns:** The resulting URI

Throws:

- `NullPointerException`: If `uri` is `null`

## URI.toURL()

```java
public URL toURL() throws MalformedURLException
```

Constructs a URL from this URI.

 This convenience method works as if invoking it were equivalent to
evaluating the expression `new URL(this.toString())` after
first checking that this URI is absolute.

**Returns:** A URL constructed from this URI

Throws:

- `IllegalArgumentException`: If this URL is not absolute
- `MalformedURLException`: If a protocol handler for the URL could not be found, or if some other error occurred while constructing the URL

## URI.getScheme()

```java
public String getScheme()
```

Returns the scheme component of this URI.

 The scheme component of a URI, if defined, only contains characters
in the *alphanum* category and in the string `"-.+"`.  A
scheme always starts with an *alpha* character.

The scheme component of a URI cannot contain escaped octets, hence this
method does not perform any decoding.

**Returns:** The scheme component of this URI,
         or `null` if the scheme is undefined

## URI.isAbsolute()

```java
public boolean isAbsolute()
```

Tells whether or not this URI is absolute.

 A URI is absolute if, and only if, it has a scheme component.

**Returns:** `true` if, and only if, this URI is absolute

## URI.isOpaque()

```java
public boolean isOpaque()
```

Tells whether or not this URI is opaque.

 A URI is opaque if, and only if, it is absolute and its
scheme-specific part does not begin with a slash character ('/').
An opaque URI has a scheme, a scheme-specific part, and possibly
a fragment; all other components are undefined.

**Returns:** `true` if, and only if, this URI is opaque

## URI.getRawSchemeSpecificPart()

```java
public String getRawSchemeSpecificPart()
```

Returns the raw scheme-specific part of this URI.  The scheme-specific
part is never undefined, though it may be empty.

 The scheme-specific part of a URI only contains legal URI
characters.

**Returns:** The raw scheme-specific part of this URI
         (never `null`)

## URI.getSchemeSpecificPart()

```java
public String getSchemeSpecificPart()
```

Returns the decoded scheme-specific part of this URI.

 The string returned by this method is equal to that returned by the
getRawSchemeSpecificPart method
except that all sequences of escaped octets are decoded.

**Returns:** The decoded scheme-specific part of this URI
         (never `null`)

## URI.getRawAuthority()

```java
public String getRawAuthority()
```

Returns the raw authority component of this URI.

 The authority component of a URI, if defined, only contains the
commercial-at character (`'@'`) and characters in the
*unreserved*, *punct*, *escaped*, and *other*
categories.  If the authority is server-based then it is further
constrained to have valid user-information, host, and port
components.

**Returns:** The raw authority component of this URI,
         or `null` if the authority is undefined

## URI.getAuthority()

```java
public String getAuthority()
```

Returns the decoded authority component of this URI.

 The string returned by this method is equal to that returned by the
getRawAuthority method except that all
sequences of escaped octets are decoded.

**Returns:** The decoded authority component of this URI,
         or `null` if the authority is undefined

## URI.getRawUserInfo()

```java
public String getRawUserInfo()
```

Returns the raw user-information component of this URI.

 The user-information component of a URI, if defined, only contains
characters in the *unreserved*, *punct*, *escaped*, and
*other* categories.

**Returns:** The raw user-information component of this URI,
         or `null` if the user information is undefined

## URI.getUserInfo()

```java
public String getUserInfo()
```

Returns the decoded user-information component of this URI.

 The string returned by this method is equal to that returned by the
getRawUserInfo method except that all
sequences of escaped octets are decoded.

**Returns:** The decoded user-information component of this URI,
         or `null` if the user information is undefined

## URI.getHost()

```java
public String getHost()
```

Returns the host component of this URI.

 The host component of a URI, if defined, will have one of the
following forms:

-

 A domain name consisting of one or more *labels*
  separated by period characters (`'.'`), optionally followed by
  a period character.  Each label consists of *alphanum* characters
  as well as hyphen characters (`'-'`), though hyphens never
  occur as the first or last characters in a label. The rightmost
  label of a domain name consisting of two or more labels, begins
  with an *alpha* character.

-

 A dotted-quad IPv4 address of the form
  *digit*`+.`*digit*`+.`*digit*`+.`*digit*`+`,
  where no *digit* sequence is longer than three characters and no
  sequence has a value larger than 255.

-

 An IPv6 address enclosed in square brackets (`'['` and
  `']'`) and consisting of hexadecimal digits, colon characters
  (`':'`), and possibly an embedded IPv4 address.  The full
  syntax of IPv6 addresses is specified in *RFC 2373: IPv6
  Addressing Architecture*.

The host component of a URI cannot contain escaped octets, hence this
method does not perform any decoding.

**Returns:** The host component of this URI,
         or `null` if the host is undefined

## URI.getPort()

```java
public int getPort()
```

Returns the port number of this URI.

 The port component of a URI, if defined, is a non-negative
integer.

**Returns:** The port component of this URI,
         or `-1` if the port is undefined

## URI.getRawPath()

```java
public String getRawPath()
```

Returns the raw path component of this URI.

 The path component of a URI, if defined, only contains the slash
character (`'/'`), the commercial-at character (`'@'`),
and characters in the *unreserved*, *punct*, *escaped*,
and *other* categories.

**Returns:** The path component of this URI,
         or `null` if the path is undefined

## URI.getPath()

```java
public String getPath()
```

Returns the decoded path component of this URI.

 The string returned by this method is equal to that returned by the
getRawPath method except that all sequences of
escaped octets are decoded.

**Returns:** The decoded path component of this URI,
         or `null` if the path is undefined

## URI.getRawQuery()

```java
public String getRawQuery()
```

Returns the raw query component of this URI.

 The query component of a URI, if defined, only contains legal URI
characters.

**Returns:** The raw query component of this URI,
         or `null` if the query is undefined

## URI.getQuery()

```java
public String getQuery()
```

Returns the decoded query component of this URI.

 The string returned by this method is equal to that returned by the
getRawQuery method except that all sequences of
escaped octets are decoded.

**Returns:** The decoded query component of this URI,
         or `null` if the query is undefined

## URI.getRawFragment()

```java
public String getRawFragment()
```

Returns the raw fragment component of this URI.

 The fragment component of a URI, if defined, only contains legal URI
characters.

**Returns:** The raw fragment component of this URI,
         or `null` if the fragment is undefined

## URI.getFragment()

```java
public String getFragment()
```

Returns the decoded fragment component of this URI.

 The string returned by this method is equal to that returned by the
getRawFragment method except that all
sequences of escaped octets are decoded.

**Returns:** The decoded fragment component of this URI,
         or `null` if the fragment is undefined

## URI.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this URI for equality with another object.

 If the given object is not a URI then this method immediately
returns `false`.

 For two URIs to be considered equal requires that either both are
opaque or both are hierarchical.  Their schemes must either both be
undefined or else be equal without regard to case. Their fragments
must either both be undefined or else be equal.

 For two opaque URIs to be considered equal, their scheme-specific
parts must be equal.

 For two hierarchical URIs to be considered equal, their paths must
be equal and their queries must either both be undefined or else be
equal.  Their authorities must either both be undefined, or both be
registry-based, or both be server-based.  If their authorities are
defined and are registry-based, then they must be equal.  If their
authorities are defined and are server-based, then their hosts must be
equal without regard to case, their port numbers must be equal, and
their user-information components must be equal.

 When testing the user-information, path, query, fragment, authority,
or scheme-specific parts of two URIs for equality, the raw forms rather
than the encoded forms of these components are compared and the
hexadecimal digits of escaped octets are compared without regard to
case.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `ob`: The object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is a URI that
         is identical to this URI

## URI.hashCode()

```java
public int hashCode()
```

Returns a hash-code value for this URI.  The hash code is based upon all
of the URI's components, and satisfies the general contract of the
Object.hashCode method.

**Returns:** A hash-code value for this URI
