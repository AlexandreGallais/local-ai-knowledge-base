---
title: "Identity class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Identity.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Identity class (java.security)

```java
public abstract class Identity implements Principal, Serializable
```

This class represents identities: real-world objects such as people,
companies or organizations whose identities can be authenticated using
their public keys. Identities may also be more abstract (or concrete)
constructs, such as daemon threads or smart cards.

All `Identity` objects have a name and a public key. Names are
immutable. Identities may also be scoped. That is, if an `Identity` is
specified to have a particular scope, then the name and public
key of the `Identity` are unique within that scope.

An `Identity` also has a set of certificates (all certifying its own
public key). The Principal names specified in these certificates need
not be the same, only the key.

An `Identity` can be subclassed, to include postal and email
addresses, telephone numbers, images of faces and logos, and so on.

**See also:** IdentityScope

**See also:** Signer

**See also:** Principal

**Since:** 1.1

**Deprecated:** This class is deprecated and subject to removal in a future
    version of Java SE. It has been replaced by
    `java.security.KeyStore`, the `java.security.cert` package,
    and `java.security.Principal`.

## Identity.Identity()

```java
protected Identity()
```

Constructor for serialization only.

## Identity.Identity(String, IdentityScope)

```java
public Identity(String name, IdentityScope scope) throws KeyManagementException
```

Constructs an `Identity` with the specified name and scope.

Parameters:

- `name`: the `Identity` name.
- `scope`: the scope of the `Identity`.

Throws:

- `KeyManagementException`: if there is already an `Identity` with the same name in the scope.

## Identity.Identity(String)

```java
public Identity(String name)
```

Constructs an `Identity` with the specified name and no scope.

Parameters:

- `name`: the identity name.

## Identity.getName()

```java
public final String getName()
```

Returns this identity's name.

**Returns:** the name of this `Identity`.

## Identity.getScope()

```java
public final IdentityScope getScope()
```

Returns this identity's scope.

**Returns:** the scope of this `Identity`.

## Identity.getPublicKey()

```java
public PublicKey getPublicKey()
```

Returns this identity's public key.

**Returns:** the public key for this `Identity`.

**See also:** #setPublicKey

## Identity.setPublicKey(PublicKey)

```java
/* Should we throw an exception if this is already set? */ public void setPublicKey(PublicKey key) throws KeyManagementException
```

Sets this identity's public key. The old key and all of this
identity's certificates are removed by this operation.

Parameters:

- `key`: the public key for this `Identity`.

**See also:** #getPublicKey

Throws:

- `KeyManagementException`: if another identity in the identity's scope has the same public key, or if another exception occurs.

## Identity.setInfo(String)

```java
public void setInfo(String info)
```

Specifies a general information string for this `Identity`.

Parameters:

- `info`: the information string.

**See also:** #getInfo

## Identity.getInfo()

```java
public String getInfo()
```

Returns general information previously specified for this `Identity`.

**Returns:** general information about this `Identity`.

**See also:** #setInfo

## Identity.addCertificate(Certificate)

```java
public void addCertificate(Certificate certificate) throws KeyManagementException
```

Adds a certificate for this `Identity`. If the `Identity` has a public
key, the public key in the certificate must be the same, and if
the `Identity` does not have a public key, the identity's
public key is set to be that specified in the certificate.

Parameters:

- `certificate`: the certificate to be added.

Throws:

- `KeyManagementException`: if the certificate is not valid, if the public key in the certificate being added conflicts with this identity's public key, or if another exception occurs.

## Identity.removeCertificate(Certificate)

```java
public void removeCertificate(Certificate certificate) throws KeyManagementException
```

Removes a certificate from this `Identity`.

Parameters:

- `certificate`: the certificate to be removed.

Throws:

- `KeyManagementException`: if the certificate is missing, or if another exception occurs.

## Identity.certificates()

```java
public Certificate[] certificates()
```

Returns a copy of all the certificates for this `Identity`.

**Returns:** a copy of all the certificates for this `Identity`.

## Identity.equals(Object)

```java
public final boolean equals(Object identity)
```

Tests for equality between the specified object and this
`Identity`.
This first tests to see if the entities actually refer to the same
object, in which case it returns `true`. Next, it checks to see if
the entities have the same name and the same scope. If they do,
the method returns `true`. Otherwise, it calls
identityEquals, which subclasses should
override.

Parameters:

- `identity`: the object to test for equality with this `Identity`.

**Returns:** `true` if the objects are considered equal,
`false` otherwise.

**See also:** #identityEquals

## Identity.identityEquals(Identity)

```java
protected boolean identityEquals(Identity identity)
```

Tests for equality between the specified `Identity` and this
`Identity`.
This method should be overridden by subclasses to test for equality.
The default behavior is to return `true` if the names and public
keys are equal.

Parameters:

- `identity`: the identity to test for equality with this `identity`.

**Returns:** `true` if the identities are considered equal,
`false` otherwise.

**See also:** #equals

## Identity.toString()

```java
public String toString()
```

Returns a short string describing this `Identity`, telling its
name and its scope (if any).

**Returns:** information about this `Identity`, such as its name and the
name of its scope (if any).

## Identity.toString(boolean)

```java
public String toString(boolean detailed)
```

Returns a string representation of this `Identity`, with
optionally more details than that provided by the
`toString` method without any arguments.

Parameters:

- `detailed`: whether or not to provide detailed information.

**Returns:** information about this `Identity`. If `detailed`
is `true`, then this method returns more information than that
provided by the `toString` method without any arguments.

**See also:** #toString

## Identity.hashCode()

```java
public int hashCode()
```
