---
title: "CodeSource class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/CodeSource.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeSource class (java.security)

```java
public class CodeSource implements java.io.Serializable
```

This class extends the concept of a codebase to
encapsulate not only the location (URL) but also the certificate chains
that were used to verify signed code originating from that location.

**Since:** 1.2

## CodeSource.CodeSource(URL, java.security.cert.Certificate[])

```java
public CodeSource(URL url, java.security.cert.Certificate[] certs)
```

Constructs a `CodeSource` and associates it with the specified
location and set of certificates.

Parameters:

- `url`: the location (URL). It may be `null`.
- `certs`: the certificate(s). It may be `null`. The contents of the array are copied to protect against subsequent modification.

## CodeSource.CodeSource(URL, CodeSigner[])

```java
public CodeSource(URL url, CodeSigner[] signers)
```

Constructs a `CodeSource` and associates it with the specified
location and set of code signers.

Parameters:

- `url`: the location (URL). It may be `null`.
- `signers`: the code signers. It may be `null`. The contents of the array are copied to protect against subsequent modification.

**Since:** 1.5

## CodeSource.hashCode()

```java
public int hashCode()
```

## CodeSource.equals(Object)

```java
public boolean equals(Object obj)
```

Tests for equality between the specified object and this
object. Two `CodeSource` objects are considered equal if their
locations are of identical value and if their signer certificate
chains are of identical value. It is not required that
the certificate chains be in the same order.

Parameters:

- `obj`: the object to test for equality with this object.

**Returns:** `true` if the objects are considered equal,
`false` otherwise.

## CodeSource.getLocation()

```java
public final URL getLocation()
```

Returns the location associated with this `CodeSource`.

**Returns:** the location (URL), or `null` if no URL was supplied
during construction.

## CodeSource.getCertificates()

```java
public final java.security.cert.Certificate[] getCertificates()
```

Returns the certificates associated with this `CodeSource`.

If this `CodeSource` object was created using the
url, CodeSigner[] signers)
constructor then its certificate chains are extracted and used to
create an array of `Certificate` objects. Each signer certificate
is followed by its supporting certificate chain (which may be empty).
Each signer certificate and its supporting certificate chain is ordered
bottom-to-top (i.e., with the signer certificate first and the (root)
certificate authority last).

**Returns:** a copy of the certificate array, or `null` if there
is none.

## CodeSource.getCodeSigners()

```java
public final CodeSigner[] getCodeSigners()
```

Returns the code signers associated with this `CodeSource`.

If this `CodeSource` object was created using the
url, java.security.cert.Certificate[] certs)
constructor then its certificate chains are extracted and used to
create an array of `CodeSigner` objects. Note that only X.509
certificates are examined - all other certificate types are ignored.

**Returns:** a copy of the code signer array, or `null` if there
is none.

**Since:** 1.5

## CodeSource.implies(CodeSource)

```java
public boolean implies(CodeSource codesource)
```

Returns true if this `CodeSource` object "implies" the specified
`CodeSource`.

More specifically, this method makes the following checks.
If any fail, it returns `false`. If they all succeed, it returns
`true`.

-  *codesource* must not be null.

-  If this object's certificates are not null, then all
of this object's certificates must be present in *codesource*'s
certificates.

-  If this object's location (getLocation()) is not null, then the
following checks are made against this object's location and
*codesource*'s:

-   *codesource*'s location must not be null.

-   If this object's location
          equals *codesource*'s location, then return true.

-   This object's protocol (getLocation().getProtocol()) must be
          equal to *codesource*'s protocol, ignoring case.

-   If this object's host (getLocation().getHost()) is not null,
          then the SocketPermission
          constructed with this object's host must imply the
          SocketPermission constructed with *codesource*'s host.

-   If this object's port (getLocation().getPort()) is not
          equal to -1 (that is, if a port is specified), it must equal
          *codesource*'s port or default port
          (codesource.getLocation().getDefaultPort()).

-   If this object's file (getLocation().getFile()) doesn't equal
          *codesource*'s file, then the following checks are made:
          If this object's file ends with "/-",
          then *codesource*'s file must start with this object's
          file (exclusive the trailing "-").
          If this object's file ends with a "/*",
          then *codesource*'s file must start with this object's
          file and must not have any further "/" separators.
          If this object's file doesn't end with a "/",
          then *codesource*'s file must match this object's
          file with a '/' appended.

-   If this object's reference (getLocation().getRef()) is
          not null, it must equal *codesource*'s reference.

For example, the codesource objects with the following locations
and `null` certificates all imply the codesource with the location
`http://www.example.com/classes/foo.jar`
and `null` certificates:

```java
    http:
    http://*.example.com/classes/*
    http://www.example.com/classes/-
    http://www.example.com/classes/foo.jar
```

Note that if this `CodeSource` has a `null` location and a
`null` certificate chain, then it implies every other
`CodeSource`.

Parameters:

- `codesource`: `CodeSource` to compare against.

**Returns:** `true` if the specified codesource is implied by this
codesource, `false` if not.

## CodeSource.toString()

```java
public String toString()
```

Returns a string describing this `CodeSource`, telling its
URL and certificates.

**Returns:** information about this `CodeSource`.
