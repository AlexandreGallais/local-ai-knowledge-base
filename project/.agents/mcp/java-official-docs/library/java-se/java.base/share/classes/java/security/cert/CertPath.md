---
title: "CertPath class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertPath.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertPath class (java.security.cert)

```java
public abstract class CertPath implements Serializable
```

An immutable sequence of certificates (a certification path).

This is an abstract class that defines the methods common to all
`CertPath`s. Subclasses can handle different kinds of
certificates (X.509, PGP, etc.).

All `CertPath` objects have a type, a list of
`Certificate`s, and one or more supported encodings. Because the
`CertPath` class is immutable, a `CertPath` cannot
change in any externally visible way after being constructed. This
stipulation applies to all public fields and methods of this class and any
added or overridden by subclasses.

The type is a `String` that identifies the type of
`Certificate`s in the certification path. For each
certificate `cert` in a certification path `certPath`,
`cert.getType().equals(certPath.getType())` must be
`true`.

The list of `Certificate`s is an ordered `List` of
zero or more `Certificate`s. This `List` and all
of the `Certificate`s contained in it must be immutable.

Each `CertPath` object must support one or more encodings
so that the object can be translated into a byte array for storage or
transmission to other parties. Preferably, these encodings should be
well-documented standards (such as PKCS#7). One of the encodings supported
by a `CertPath` is considered the default encoding. This
encoding is used if no encoding is explicitly requested (for the
getEncoded() method, for instance).

All `CertPath` objects are also `Serializable`.
`CertPath` objects are resolved into an alternate
CertPathRep object during serialization. This allows
a `CertPath` object to be serialized into an equivalent
representation regardless of its underlying implementation.

`CertPath` objects can be created with a
`CertificateFactory` or they can be returned by other classes,
such as a `CertPathBuilder`.

By convention, X.509 `CertPath`s (consisting of
`X509Certificate`s), are ordered starting with the target
certificate and ending with a certificate issued by the trust anchor. That
is, the issuer of one certificate is the subject of the following one. The
certificate representing the TrustAnchor should not be
included in the certification path. Unvalidated X.509 `CertPath`s
may not follow these conventions. PKIX `CertPathValidator`s will
detect any departure from these conventions that cause the certification
path to be invalid and throw a `CertPathValidatorException`.

 Every implementation of the Java platform is required to support the
following standard `CertPath` encodings:

- `PKCS7`

- `PkiPath`

These encodings are described in the
CertPath Encodings section of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other encodings are supported.

**Concurrent Access**

All `CertPath` objects must be thread-safe. That is, multiple
threads may concurrently invoke the methods defined in this class on a
single `CertPath` object (or more than one) with no
ill effects. This is also true for the `List` returned by
`CertPath.getCertificates`.

Requiring `CertPath` objects to be immutable and thread-safe
allows them to be passed around to various pieces of code without worrying
about coordinating access.  Providing this thread-safety is
generally not difficult, since the `CertPath` and
`List` objects in question are immutable.

**See also:** CertificateFactory

**See also:** CertPathBuilder

**Since:** 1.4

## CertPath.CertPath(String)

```java
protected CertPath(String type)
```

Creates a `CertPath` of the specified type.

This constructor is protected because most users should use a
`CertificateFactory` to create `CertPath`s.

Parameters:

- `type`: the standard name of the type of `Certificate`s in this path

## CertPath.getType()

```java
public String getType()
```

Returns the type of `Certificate`s in this certification
path. This is the same string that would be returned by
cert.getType()
for all `Certificate`s in the certification path.

**Returns:** the type of `Certificate`s in this certification
path (never null)

## CertPath.getEncodings()

```java
public abstract Iterator<String> getEncodings()
```

Returns an iteration of the encodings supported by this certification
path, with the default encoding first. Attempts to modify the returned
`Iterator` via its `remove` method result in an
`UnsupportedOperationException`.

**Returns:** an `Iterator` over the names of the supported
        encodings (as Strings)

## CertPath.equals(Object)

```java
public boolean equals(Object other)
```

Compares this certification path for equality with the specified
object. Two `CertPath`s are equal if and only if their
types are equal and their certificate `List`s (and by
implication the `Certificate`s in those `List`s)
are equal. A `CertPath` is never equal to an object that is
not a `CertPath`.

This algorithm is implemented by this method. If it is overridden,
the behavior specified here must be maintained.

Parameters:

- `other`: the object to test for equality with this certification path

**Returns:** true if the specified object is equal to this certification path,
false otherwise

## CertPath.hashCode()

```java
public int hashCode()
```

The hash code of a certification path is defined to be the result of
the following calculation:

```java
 hashCode = path.getType().hashCode();
 hashCode = 31*hashCode + path.getCertificates().hashCode();
```

This ensures that `path1.equals(path2)` implies that
`path1.hashCode()==path2.hashCode()` for any two certification
paths, `path1` and `path2`, as required by the
general contract of `Object.hashCode`.

## CertPath.toString()

```java
public String toString()
```

Returns a string representation of this certification path.
This calls the `toString` method on each of the
`Certificate`s in the path.

**Returns:** a string representation of this certification path

## CertPath.getEncoded()

```java
public abstract byte[] getEncoded() throws CertificateEncodingException
```

Returns the encoded form of this certification path, using the default
encoding.

**Returns:** the encoded bytes

Throws:

- `CertificateEncodingException`: if an encoding error occurs

## CertPath.getEncoded(String)

```java
public abstract byte[] getEncoded(String encoding) throws CertificateEncodingException
```

Returns the encoded form of this certification path, using the
specified encoding.

Parameters:

- `encoding`: the name of the encoding to use

**Returns:** the encoded bytes

Throws:

- `CertificateEncodingException`: if an encoding error occurs or the encoding requested is not supported

## CertPath.getCertificates()

```java
public abstract List<? extends Certificate> getCertificates()
```

Returns the list of certificates in this certification path.
The `List` returned must be immutable and thread-safe.

**Returns:** an immutable `List` of `Certificate`s
        (may be empty, but not null)

## CertPath.writeReplace()

```java
protected Object writeReplace() throws ObjectStreamException
```

Replaces the `CertPath` to be serialized with a
CertPathRep object containing the
`Certificate` type and encoded bytes of the `CertPath`.

**Returns:** a `CertPathRep` containing the `Certificate` type
        and encoded bytes of the `CertPath`

Throws:

- `ObjectStreamException`: if a `CertPathRep` object representing this certification path could not be created

## CertPath.CertPathRep(String, byte[])

```java
protected CertPathRep(String type, byte[] data)
```

Creates a `CertPathRep` with the specified
type and encoded form of a certification path.

Parameters:

- `type`: the standard name of a `Certificate` type
- `data`: the encoded form of the certification path

## CertPath.readResolve()

```java
protected Object readResolve() throws ObjectStreamException
```

Returns a `CertPath` constructed from the type and data of
this `CertPathRep`.

**Returns:** the resolved `CertPath` object

Throws:

- `ObjectStreamException`: if a `CertPath` object could not be constructed
