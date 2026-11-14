---
title: "URI class (java.net) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URI.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URI class (java.net) (part 2 of 4)

Some components of a URL or URI, such as *userinfo*, may
be abused to construct misleading URLs or URIs. Applications
that deal with URLs or URIs should take into account
the recommendations advised in RFC3986,
Section 7, Security Considerations.

**Since:** 1.4

**See also:** *RFC 2279: UTF-8, a
transformation format of ISO 10646*

**See also:** *RFC 2373: IPv6 Addressing
Architecture*

**See also:** *RFC 2396: Uniform
Resource Identifiers (URI): Generic Syntax*

**See also:** *RFC 2732: Format for
Literal IPv6 Addresses in URLs*

**See also:** URISyntaxException

## URI.URI(String)

```java
public URI(String str) throws URISyntaxException
```

Constructs a URI by parsing the given string.

 This constructor parses the given string exactly as specified by the
grammar in RFC 2396,
Appendix A, ***except for the following deviations:***

-

 An empty authority component is permitted as long as it is
  followed by a non-empty path, a query component, or a fragment
  component.  This allows the parsing of URIs such as
  `"file:///foo/bar"`, which seems to be the intent of
  RFC 2396 although the grammar does not permit it.  If the
  authority component is empty then the user-information, host, and port
  components are undefined.

-

 Empty relative paths are permitted; this seems to be the
  intent of RFC 2396 although the grammar does not permit it.  The
  primary consequence of this deviation is that a standalone fragment
  such as `"#foo"` parses as a relative URI with an empty path
  and the given fragment, and can be usefully resolved against a base URI.

-

 IPv4 addresses in host components are parsed rigorously, as
  specified by RFC 2732: Each
  element of a dotted-quad address must contain no more than three
  decimal digits.  Each element is further constrained to have a value
  no greater than 255.

-

 Hostnames in host components that comprise only a single
  domain label are permitted to start with an *alphanum*
  character. This seems to be the intent of RFC 2396
  section 3.2.2 although the grammar does not permit it. The
  consequence of this deviation is that the authority component of a
  hierarchical URI such as `s://123`, will parse as a server-based
  authority.

-

 IPv6 addresses are permitted for the host component.  An IPv6
  address must be enclosed in square brackets (`'['` and
  `']'`) as specified by RFC 2732.  The
  IPv6 address itself must parse according to RFC 2373.  IPv6
  addresses are further constrained to describe no more than sixteen
  bytes of address information, a constraint implicit in RFC 2373
  but not expressible in the grammar.

-

 Characters in the *other* category are permitted wherever
  RFC 2396 permits *escaped* octets, that is, in the
  user-information, path, query, and fragment components, as well as in
  the authority component if the authority is registry-based.  This
  allows URIs to contain Unicode characters beyond those in the US-ASCII
  character set.

Parameters:

- `str`: The string to be parsed into a URI

Throws:

- `NullPointerException`: If `str` is `null`
- `URISyntaxException`: If the given string violates RFC 2396, as augmented by the above deviations

## URI.URI(String, String, String, int, String, String, String)

```java
public URI(String scheme, String userInfo, String host, int port, String path, String query, String fragment) throws URISyntaxException
```

Constructs a hierarchical URI from the given components.

 If a scheme is given then the path, if also given, must either be
empty or begin with a slash character (`'/'`).  Otherwise a
component of the new URI may be left undefined by passing `null`
for the corresponding parameter or, in the case of the `port`
parameter, by passing `-1`.

 This constructor first builds a URI string from the given components
according to the rules specified in RFC 2396,
section 5.2, step 7:

-

 Initially, the result string is empty.

-

 If a scheme is given then it is appended to the result,
  followed by a colon character (`':'`).

-

 If user information, a host, or a port are given then the
  string `"//"` is appended.

-

 If user information is given then it is appended, followed by
  a commercial-at character (`'@'`).  Any character not in the
  *unreserved*, *punct*, *escaped*, or *other*
  categories is quoted.

-

 If a host is given then it is appended.  If the host is a
  literal IPv6 address but is not enclosed in square brackets
  (`'['` and `']'`) then the square brackets are added.

-

 If a port number is given then a colon character
  (`':'`) is appended, followed by the port number in decimal.

-

 If a path is given then it is appended.  Any character not in
  the *unreserved*, *punct*, *escaped*, or *other*
  categories, and not equal to the slash character (`'/'`) or the
  commercial-at character (`'@'`), is quoted.

-

 If a query is given then a question-mark character
  (`'?'`) is appended, followed by the query.  Any character that
  is not a legal URI character is quoted.

-

 Finally, if a fragment is given then a hash character
  (`'#'`) is appended, followed by the fragment.  Any character
  that is not a legal URI character is quoted.

 The resulting URI string is then parsed as if by invoking the `URI(String)` constructor and then invoking the `parseServerAuthority()` method upon the result; this may cause a `URISyntaxException` to be thrown.

Parameters:

- `scheme`: Scheme name
- `userInfo`: User name and authorization information
- `host`: Host name
- `port`: Port number
- `path`: Path
- `query`: Query
- `fragment`: Fragment

Throws:

- `URISyntaxException`: If both a scheme and a path are given but the path is relative, if the URI string constructed from the given components violates RFC 2396, or if the authority component of the string is present but cannot be parsed as a server-based authority

## URI.URI(String, String, String, String, String)

```java
public URI(String scheme, String authority, String path, String query, String fragment) throws URISyntaxException
```

Constructs a hierarchical URI from the given components.

 If a scheme is given then the path, if also given, must either be
empty or begin with a slash character (`'/'`).  Otherwise a
component of the new URI may be left undefined by passing `null`
for the corresponding parameter.

 This constructor first builds a URI string from the given components
according to the rules specified in RFC 2396,
section 5.2, step 7:

-

 Initially, the result string is empty.

-

 If a scheme is given then it is appended to the result,
  followed by a colon character (`':'`).

-

 If an authority is given then the string `"//"` is
  appended, followed by the authority.  If the authority contains a
  literal IPv6 address then the address must be enclosed in square
  brackets (`'['` and `']'`).  Any character not in the
  *unreserved*, *punct*, *escaped*, or *other*
  categories, and not equal to the commercial-at character
  (`'@'`), is quoted.

-

 If a path is given then it is appended.  Any character not in
  the *unreserved*, *punct*, *escaped*, or *other*
  categories, and not equal to the slash character (`'/'`) or the
  commercial-at character (`'@'`), is quoted.

-

 If a query is given then a question-mark character
  (`'?'`) is appended, followed by the query.  Any character that
  is not a legal URI character is quoted.

-

 Finally, if a fragment is given then a hash character
  (`'#'`) is appended, followed by the fragment.  Any character
  that is not a legal URI character is quoted.

 The resulting URI string is then parsed as if by invoking the `URI(String)` constructor and then invoking the `parseServerAuthority()` method upon the result; this may cause a `URISyntaxException` to be thrown.

Parameters:

- `scheme`: Scheme name
- `authority`: Authority
- `path`: Path
- `query`: Query
- `fragment`: Fragment

Throws:

- `URISyntaxException`: If both a scheme and a path are given but the path is relative, if the URI string constructed from the given components violates RFC 2396, or if the authority component of the string is present but cannot be parsed as a server-based authority

## URI.URI(String, String, String, String)

```java
public URI(String scheme, String host, String path, String fragment) throws URISyntaxException
```

Constructs a hierarchical URI from the given components.

 A component may be left undefined by passing `null`.

 This convenience constructor works as if by invoking the
seven-argument constructor as follows:

`new` String, String, int, String, String, String) URI`(scheme, null, host, -1, path, null, fragment);`

Parameters:

- `scheme`: Scheme name
- `host`: Host name
- `path`: Path
- `fragment`: Fragment

Throws:

- `URISyntaxException`: If the URI string constructed from the given components violates RFC 2396

## URI.URI(String, String, String)

```java
public URI(String scheme, String ssp, String fragment) throws URISyntaxException
```

Constructs a URI from the given components.

 A component may be left undefined by passing `null`.

 This constructor first builds a URI in string form using the given
components as follows:

-

 Initially, the result string is empty.

-

 If a scheme is given then it is appended to the result,
  followed by a colon character (`':'`).

-

 If a scheme-specific part is given then it is appended.  Any
  character that is not a legal URI character
  is quoted.

-

 Finally, if a fragment is given then a hash character
  (`'#'`) is appended to the string, followed by the fragment.
  Any character that is not a legal URI character is quoted.

 The resulting URI string is then parsed in order to create the new
URI instance as if by invoking the `URI(String)` constructor;
this may cause a `URISyntaxException` to be thrown.

Parameters:

- `scheme`: Scheme name
- `ssp`: Scheme-specific part
- `fragment`: Fragment

Throws:

- `URISyntaxException`: If the URI string constructed from the given components violates RFC 2396

## URI.create(String)

```java
public static URI create(String str)
```

Creates a URI by parsing the given string.

 This convenience factory method works as if by invoking the `URI(String)` constructor; any `URISyntaxException` thrown by the
constructor is caught and wrapped in a new `IllegalArgumentException` object, which is then thrown.

 This method is provided for use in situations where it is known that
the given string is a legal URI, for example for URI constants declared
within a program, and so it would be considered a programming error
for the string not to parse as such.  The constructors, which throw
`URISyntaxException` directly, should be used in situations where a
URI is being constructed from user input or from some other source that
may be prone to errors.

Parameters:

- `str`: The string to be parsed into a URI

**Returns:** The new URI

Throws:

- `NullPointerException`: If `str` is `null`
- `IllegalArgumentException`: If the given string violates RFC 2396

## URI.parseServerAuthority()

```java
public URI parseServerAuthority() throws URISyntaxException
```

Attempts to parse this URI's authority component, if defined, into
user-information, host, and port components.

 If this URI's authority component has already been recognized as
being server-based then it will already have been parsed into
user-information, host, and port components.  In this case, or if this
URI has no authority component, this method simply returns this URI.

 Otherwise this method attempts once more to parse the authority
component into user-information, host, and port components, and throws
an exception describing why the authority component could not be parsed
in that way.

 This method is provided because the generic URI syntax specified in
RFC 2396
cannot always distinguish a malformed server-based authority from a
legitimate registry-based authority.  It must therefore treat some
instances of the former as instances of the latter.  The authority
component in the URI string `"//foo:bar"`, for example, is not a
legal server-based authority but it is legal as a registry-based
authority.

 In many common situations, for example when working URIs that are
known to be either URNs or URLs, the hierarchical URIs being used will
always be server-based.  They therefore must either be parsed as such or
treated as an error.  In these cases a statement such as

`URI`*u*`= new URI(str).parseServerAuthority();`

 can be used to ensure that *u* always refers to a URI that, if
it has an authority component, has a server-based authority with proper
user-information, host, and port components.  Invoking this method also
ensures that if the authority could not be parsed in that way then an
appropriate diagnostic message can be issued based upon the exception
that is thrown.

**Returns:** A URI whose authority field has been parsed
         as a server-based authority

Throws:

- `URISyntaxException`: If the authority component of this URI is defined but cannot be parsed as a server-based authority according to RFC 2396

## URI.normalize()

```java
public URI normalize()
```

Normalizes this URI's path.

 If this URI is opaque, or if its path is already in normal form,
then this URI is returned.  Otherwise a new URI is constructed that is
identical to this URI except that its path is computed by normalizing
this URI's path in a manner consistent with RFC 2396,
section 5.2, step 6, sub-steps c through f; that is:

-

 All `"."` segments are removed.

-

 If a `".."` segment is preceded by a non-`".."`
  segment then both of these segments are removed.  This step is
  repeated until it is no longer applicable.

-

 If the path is relative, and if its first segment contains a
  colon character (`':'`), then a `"."` segment is
  prepended.  This prevents a relative URI with a path such as
  `"a:b/c/d"` from later being re-parsed as an opaque URI with a
  scheme of `"a"` and a scheme-specific part of `"b/c/d"`.
  ***(Deviation from RFC 2396)***

 A normalized path will begin with one or more `".."` segments
if there were insufficient non-`".."` segments preceding them to
allow their removal.  A normalized path will begin with a `"."`
segment if one was inserted by step 3 above.  Otherwise, a normalized
path will not contain any `"."` or `".."` segments.

**Returns:** A URI equivalent to this URI,
         but whose path is in normal form
