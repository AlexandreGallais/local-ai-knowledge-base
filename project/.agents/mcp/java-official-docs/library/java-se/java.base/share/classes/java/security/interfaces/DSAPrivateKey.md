---
title: "DSAPrivateKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/DSAPrivateKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DSAPrivateKey <example-value> (java.security.interfaces)

```java
public interface DSAPrivateKey <example-value> DSAKey, java.security.PrivateKey
```

The standard interface to a DSA private key. DSA (Digital Signature
Algorithm) is defined in NIST's FIPS-186.

**See also:** java.security.Key

**See also:** java.security.Signature

**See also:** DSAKey

**See also:** DSAPublicKey

**Since:** 1.1

## DSAPrivateKey.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate
serialization compatibility with a previous
version of the class.

**Deprecated:** A `serialVersionUID` field in an interface is
ineffectual. Do not use; no replacement.

## DSAPrivateKey.getX()

```java
BigInteger getX()
```

Returns the value of the private key, `x`.

**Returns:** the value of the private key, `x`.

## DSAPrivateKey.getParams()

```java
default DSAParams getParams()
```

(inherited documentation)

**Implementation requirements:** The default implementation returns `null`.

**Returns:** (inherited documentation)
