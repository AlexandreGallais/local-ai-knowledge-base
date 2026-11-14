---
title: "CollectionCertStoreParameters class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CollectionCertStoreParameters.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CollectionCertStoreParameters class (java.security.cert)

```java
public class CollectionCertStoreParameters implements CertStoreParameters
```

Parameters used as input for the Collection `CertStore`
algorithm.

This class is used to provide necessary configuration parameters
to implementations of the Collection `CertStore`
algorithm. The only parameter included in this class is the
`Collection` from which the `CertStore` will
retrieve certificates and CRLs.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**Since:** 1.4

**See also:** java.util.Collection

**See also:** CertStore

## CollectionCertStoreParameters.CollectionCertStoreParameters(Collection<?>)

```java
public CollectionCertStoreParameters(Collection<?> collection)
```

Creates an instance of `CollectionCertStoreParameters`
which will allow certificates and CRLs to be retrieved from the
specified `Collection`. If the specified
`Collection` contains an object that is not a
`Certificate` or `CRL`, that object will be
ignored by the Collection `CertStore`.

The `Collection` is **not** copied. Instead, a
reference is used. This allows the caller to subsequently add or
remove `Certificates` or `CRL`s from the
`Collection`, thus changing the set of
`Certificates` or `CRL`s available to the
Collection `CertStore`. The Collection `CertStore`
will not modify the contents of the `Collection`.

If the `Collection` will be modified by one thread while
another thread is calling a method of a Collection `CertStore`
that has been initialized with this `Collection`, the
`Collection` must have fail-fast iterators.

Parameters:

- `collection`: a `Collection` of `Certificate`s and `CRL`s

Throws:

- `NullPointerException`: if `collection` is `null`

## CollectionCertStoreParameters.CollectionCertStoreParameters()

```java
public CollectionCertStoreParameters()
```

Creates an instance of `CollectionCertStoreParameters` with
the default parameter values (an empty and immutable
`Collection`).

## CollectionCertStoreParameters.getCollection()

```java
public Collection<?> getCollection()
```

Returns the `Collection` from which `Certificate`s
and `CRL`s are retrieved. This is **not** a copy of the
`Collection`, it is a reference. This allows the caller to
subsequently add or remove `Certificates` or
`CRL`s from the `Collection`.

**Returns:** the `Collection` (never null)

## CollectionCertStoreParameters.clone()

```java
public Object clone()
```

Returns a copy of this object. Note that only a reference to the
`Collection` is copied, and not the contents.

**Returns:** the copy

## CollectionCertStoreParameters.toString()

```java
public String toString()
```

Returns a formatted string describing the parameters.

**Returns:** a formatted string describing the parameters
