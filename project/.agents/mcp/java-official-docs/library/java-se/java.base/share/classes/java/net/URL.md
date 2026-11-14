---
title: "URL class (java.net) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URL.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URL class (java.net)

```java
public final class URL implements java.io.Serializable
```

Class `URL` represents a Uniform Resource
Locator, a pointer to a "resource" on the World
Wide Web. A resource can be something as simple as a file or a
directory, or it can be a reference to a more complicated object,
such as a query to a database or to a search engine. More
information on the types of URLs and their formats can be found at:

*Types of URL*

In general, a URL can be broken into several parts. Consider the
following example:

```java
    http://www.example.com/docs/resource1.html
```

The URL above indicates that the protocol to use is
`http` (HyperText Transfer Protocol) and that the
information resides on a host machine named
`www.example.com`. The information on that host
machine is named `/docs/resource1.html`. The exact
meaning of this name on the host machine is both protocol
dependent and host dependent. The information normally resides in
a file, but it could be generated on the fly. This component of
the URL is called the *path* component.

A URL can optionally specify a "port", which is the
port number to which the TCP connection is made on the remote host
machine. If the port is not specified, the default port for
the protocol is used instead. For example, the default port for
`http` is `80`. An alternative port could be
specified as:

```java
    http://www.example.com:1080/docs/resource1.html
```

The syntax of `URL` is defined by  *RFC 2396: Uniform
Resource Identifiers (URI): Generic Syntax*, amended by *RFC 2732: Format for
Literal IPv6 Addresses in URLs*. The Literal IPv6 address format
also supports scope_ids. The syntax and usage of scope_ids is described
here.

A URL may have appended to it a "fragment", also known
as a "ref" or a "reference". The fragment is indicated by the sharp
sign character "#" followed by more characters. For example,

```java
    http://www.example.com/index.html#chapter1
```

This fragment is not technically part of the URL. Rather, it
indicates that after the specified resource is retrieved, the
application is specifically interested in that part of the
document that has the tag `chapter1` attached to it. The
meaning of a tag is resource specific.

An application can also specify a "relative URL",
which contains only enough information to reach the resource
relative to another URL. Relative URLs are frequently used within
HTML pages. For example, if the contents of the URL:

```java
    http://www.example.com/index.html
```

contained within it the relative URL:

```java
    FAQ.html
```

it would be a shorthand for:

```java
    http://www.example.com/FAQ.html
```

The relative URL need not specify all the components of a URL. If
the protocol, host name, or port number is missing, the value is
inherited from the fully specified URL. The file component must be
specified. The optional fragment is not inherited.

#### Constructing instances of `URL`

The `java.net.URL` constructors are deprecated.
Developers are encouraged to use java.net.URI to parse
or construct a `URL`. In cases where an instance of `java.net.URL` is needed to open a connection, `URI` can be used
to construct or parse the URL string, possibly calling `URI.parseServerAuthority()` to validate that the authority component
can be parsed as a server-based authority, and then calling
`URI.toURL()` to create the `URL` instance.

The URL constructors are specified to throw
`MalformedURLException` but the actual parsing/validation
that is performed is implementation dependent. Some parsing/validation
may be delayed until later, when the underlying stream handler's implementation is called.
Being able to construct an instance of `URL` doesn't
provide any guarantee about its conformance to the URL
syntax specification.

The URL class does not itself encode or decode any URL components
according to the escaping mechanism defined in RFC2396. It is the
responsibility of the caller to encode any fields, which need to be
escaped prior to calling URL, and also to decode any escaped fields,
that are returned from URL. Furthermore, because URL has no knowledge
of URL escaping, it does not recognise equivalence between the encoded
or decoded form of the same URL. For example, the two URLs:

```java
    http://foo.com/hello world/ and http://foo.com/hello%20world
```

would be considered not equal to each other.

Note, the `java.net.URI` class does perform escaping of its
component fields in certain circumstances. The recommended way
to manage the encoding and decoding of URLs is to use `java.net.URI`,
and to convert between these two classes using `toURI()` and
`URI.toURL()`.

The `URLEncoder` and `URLDecoder` classes can also be
used, but only for HTML form encoding, which is not the same
as the encoding scheme defined in RFC2396.

**API note:** Applications working with file paths and file URIs should take great
care to use the appropriate methods to convert between the two.
The `Path.of(URI)` factory method and the `File.File(URI)`
constructor can be used to create `Path` or `File`
objects from a file URI. `Path.toUri()` and `File.toURI()`
can be used to create a `URI` from a file path, which can be
converted to URL using `URI.toURL()`.
Applications should never try to String, String) construct or parse a `URL`
from the direct string representation of a `File` or `Path`
instance.

Before constructing a `URL` from a `URI`, and depending
on the protocol involved, applications should consider validating
whether the URI authority can be parsed as server-based.

Some components of a URL or URI, such as *userinfo*, may
be abused to construct misleading URLs or URIs. Applications
that deal with URLs or URIs should take into account
the recommendations advised in RFC3986,
Section 7, Security Considerations.

All `URL` constructors may throw `MalformedURLException`.
In particular, if the underlying `URLStreamHandler`
implementation rejects, or is known to reject, any of the parameters,
`MalformedURLException` may be thrown.
Typically, a constructor that calls the stream handler's String, int, int) parseURL method may
throw `MalformedURLException` if the underlying stream handler
implementation of that method throws `IllegalArgumentException`.
However, which checks are performed, or not, by the stream handlers
is implementation dependent, and callers should not rely on such
checks for full URL validation.

**Since:** 1.0

## URL.URL(String, String, int, String)

```java
public URL(String protocol, String host, int port, String file) throws MalformedURLException
```

Creates a `URL` object from the specified
`protocol`, `host`, `port`
number, and `file`.

`host` can be expressed as a host name or a literal
IP address. If IPv6 literal address is used, it should be
enclosed in square brackets (`'['` and `']'`), as
specified by RFC 2732;
However, the literal IPv6 address format defined in *RFC 2373: IP
Version 6 Addressing Architecture* is also accepted.

Specifying a `port` number of `-1`
indicates that the URL should use the default port for the
protocol.

If this is the first URL object being created with the specified
protocol, a *stream protocol handler* object, an instance of
class `URLStreamHandler`, is created for that protocol:

- If the application has previously set up an instance of
    `URLStreamHandlerFactory` as the stream handler factory,
    then the `createURLStreamHandler` method of that instance
    is called with the protocol string as an argument to create the
    stream protocol handler.

- If no `URLStreamHandlerFactory` has yet been set up,
    or if the factory's `createURLStreamHandler` method
    returns `null`, then the ServiceLoader mechanism is used to locate URLStreamHandlerProvider
    implementations using the system class
    loader. The order that providers are located is implementation
    specific, and an implementation is free to cache the located
    providers. A ServiceConfigurationError, `Error` or `RuntimeException`
    thrown from the `createURLStreamHandler`, if encountered, will
    be propagated to the calling thread. The `createURLStreamHandler` method of each provider, if instantiated, is
    invoked, with the protocol string, until a provider returns non-null,
    or all providers have been exhausted.

- If the previous step fails to find a protocol handler, the
    constructor reads the value of the system property:
    `java.protocol.handler.pkgs`
    If the value of that system property is not `null`,
    it is interpreted as a list of packages separated by a vertical
    slash character '`|`'. The constructor tries to load
    the class named:
    `<package>.<protocol>.Handler`
    where `<package>` is replaced by the name of the package
    and `<protocol>` is replaced by the name of the protocol.
    If this class does not exist, or if the class exists but it is not
    a subclass of `URLStreamHandler`, then the next package
    in the list is tried.

- If the previous step fails to find a protocol handler, then the
    constructor tries to load a built-in protocol handler.
    If this class does not exist, or if the class exists but it is not a
    subclass of `URLStreamHandler`, then a
    `MalformedURLException` is thrown.

Protocol handlers for the following protocols are guaranteed
to exist on the search path:

- `http`

- `https`

- `file`

- `jar`

Protocol handlers for additional protocols may also be  available.
Some protocol handlers, for example those used for loading platform
classes or classes on the class path, may not be overridden. The details
of such restrictions, and when those restrictions apply (during
initialization of the runtime for example), are implementation specific
and therefore not specified

No validation of the inputs is performed by this constructor.

Parameters:

- `protocol`: the name of the protocol to use.
- `host`: the name of the host.
- `port`: the port number on the host.
- `file`: the file on the host

**See also:** java.lang.System#getProperty(java.lang.String)

**See also:** java.net.URL#setURLStreamHandlerFactory(
                 java.net.URLStreamHandlerFactory)

**See also:** java.net.URLStreamHandler

**See also:** java.net.URLStreamHandlerFactory#createURLStreamHandler(
                 java.lang.String)

**Deprecated:** Use `URI.toURL()` to construct an instance of URL. See the note on
constructor deprecation for more
details.

Throws:

- `MalformedURLException`: if an unknown protocol or the port is a negative number other than -1, or if the underlying stream handler implementation rejects, or is known to reject, the `URL`

## URL.URL(String, String, String)

```java
public URL(String protocol, String host, String file) throws MalformedURLException
```

Creates a URL from the specified `protocol`
name, `host` name, and `file` name. The
default port for the specified protocol is used.

This constructor is equivalent to the four-argument
constructor with the only difference of using the
default port for the specified protocol.

No validation of the inputs is performed by this constructor.

Parameters:

- `protocol`: the name of the protocol to use.
- `host`: the name of the host.
- `file`: the file on the host.

**See also:** java.net.URL#URL(java.lang.String, java.lang.String,
                 int, java.lang.String)

**Deprecated:** Use `URI.toURL()` to construct an instance of URL. See the note on
constructor deprecation for more
details.

Throws:

- `MalformedURLException`: if an unknown protocol is specified, or if the underlying stream handler implementation rejects, or is known to reject, the `URL`

## URL.URL(String, String, int, String, URLStreamHandler)

```java
public URL(String protocol, String host, int port, String file, URLStreamHandler handler) throws MalformedURLException
```

Creates a `URL` object from the specified
`protocol`, `host`, `port`
number, `file`, and `handler`. Specifying
a `port` number of `-1` indicates that
the URL should use the default port for the protocol. Specifying
a `handler` of `null` indicates that the URL
should use a default stream handler for the protocol, as outlined
for:
    java.lang.String, int, java.lang.String)

No validation of the inputs is performed by this constructor.

Parameters:

- `protocol`: the name of the protocol to use.
- `host`: the name of the host.
- `port`: the port number on the host.
- `file`: the file on the host
- `handler`: the stream handler for the URL.

**See also:** java.lang.System#getProperty(java.lang.String)

**See also:** java.net.URL#setURLStreamHandlerFactory(
                 java.net.URLStreamHandlerFactory)

**See also:** java.net.URLStreamHandler

**See also:** java.net.URLStreamHandlerFactory#createURLStreamHandler(
                 java.lang.String)

**Deprecated:** Use URLStreamHandler) to construct an instance of URL
associated with a custom protocol handler.
See the note on constructor deprecation
for more details.

Throws:

- `MalformedURLException`: if an unknown protocol or the port is a negative number other than -1, or if the underlying stream handler implementation rejects, or is known to reject, the `URL`

## URL.URL(String)

```java
public URL(String spec) throws MalformedURLException
```

Creates a `URL` object from the `String`
representation.

This constructor is equivalent to a call to the two-argument
constructor with a `null` first argument.

Parameters:

- `spec`: the `String` to parse as a URL.

**See also:** java.net.URL#URL(java.net.URL, java.lang.String)

**Deprecated:** Use `URI.toURL()` to construct an instance of URL. See the note on
constructor deprecation for more
details.

Throws:

- `MalformedURLException`: if no protocol is specified, or an unknown protocol is found, or `spec` is `null`, or the parsed URL fails to comply with the specific syntax of the associated protocol, or the underlying stream handler's parseURL method throws `IllegalArgumentException`
