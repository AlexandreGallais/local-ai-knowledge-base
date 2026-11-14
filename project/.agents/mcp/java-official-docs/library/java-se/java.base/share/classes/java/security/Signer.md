---
title: "Signer class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Signer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Signer class (java.security)

```java
public abstract class Signer extends Identity
```

This class is used to represent an Identity that can also digitally
sign data.

The management of a signer's private keys is an important and
sensitive issue that should be handled by subclasses as appropriate
to their intended use.

**See also:** Identity

**Since:** 1.1

**Deprecated:** This class is deprecated and subject to removal in a future
    version of Java SE. It has been replaced by
    `java.security.KeyStore`, the `java.security.cert` package,
    and `java.security.Principal`.

## Signer.Signer()

```java
protected Signer()
```

Creates a `Signer`. This constructor should only be used for
serialization.

## Signer.Signer(String)

```java
public Signer(String name)
```

Creates a `Signer` with the specified identity name.

Parameters:

- `name`: the identity name.

## Signer.Signer(String, IdentityScope)

```java
public Signer(String name, IdentityScope scope) throws KeyManagementException
```

Creates a `Signer` with the specified identity name and scope.

Parameters:

- `name`: the identity name.
- `scope`: the scope of the identity.

Throws:

- `KeyManagementException`: if there is already an identity with the same name in the scope.

## Signer.getPrivateKey()

```java
public PrivateKey getPrivateKey()
```

Returns this signer's private key.

**Returns:** this signer's private key, or `null` if the private key has
not yet been set.

## Signer.setKeyPair(KeyPair)

```java
public final void setKeyPair(KeyPair pair) throws InvalidParameterException, KeyException
```

Sets the key pair (public key and private key) for this `Signer`.

Parameters:

- `pair`: an initialized key pair.

Throws:

- `InvalidParameterException`: if the key pair is not properly initialized.
- `KeyException`: if the key pair cannot be set for any other reason.

## Signer.toString()

```java
public String toString()
```

Returns a string of information about the `Signer`.

**Returns:** a string of information about the `Signer`.
