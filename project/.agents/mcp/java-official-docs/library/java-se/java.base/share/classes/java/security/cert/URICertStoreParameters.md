---
title: "URICertStoreParameters class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/URICertStoreParameters.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URICertStoreParameters class (java.security.cert)

```java
public final class URICertStoreParameters implements CertStoreParameters
```

Parameters used as input for `CertStore` algorithms which use
information contained in a URI to retrieve certificates and CRLs.

This class is used to provide necessary configuration parameters
through a URI as defined in RFC 5280 to implementations of
`CertStore` algorithms.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**Since:** 9

**See also:** CertStore

**See also:** java.net.URI

## URICertStoreParameters.URICertStoreParameters(URI)

```java
public URICertStoreParameters(URI uri)
```

Creates an instance of `URICertStoreParameters` with the
specified URI.

Parameters:

- `uri`: the URI which contains configuration information.

Throws:

- `NullPointerException`: if `uri` is null

## URICertStoreParameters.getURI()

```java
public URI getURI()
```

Returns the URI used to construct this
`URICertStoreParameters` object.

**Returns:** the URI.

## URICertStoreParameters.clone()

```java
public URICertStoreParameters clone()
```

Returns a copy of this object. Changes to the copy will not affect
the original and vice versa.

**Returns:** the copy

## URICertStoreParameters.hashCode()

```java
public int hashCode()
```

The hash code is generated using the URI supplied at construction.

## URICertStoreParameters.equals(Object)

```java
public boolean equals(Object p)
```

Compares the specified object with this parameters object for equality.
Two URICertStoreParameters are considered equal if the URIs used
to construct them are equal.

Parameters:

- `p`: the object to test for equality with this parameters object.

**Returns:** true if the specified object is equal to this parameters object.

## URICertStoreParameters.toString()

```java
public String toString()
```

Returns a formatted string describing the parameters
including the URI used to construct this object.

**Returns:** a formatted string describing the parameters
