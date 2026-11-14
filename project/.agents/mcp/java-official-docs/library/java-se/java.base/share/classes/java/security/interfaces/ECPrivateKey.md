---
title: "ECPrivateKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/ECPrivateKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ECPrivateKey <example-value> (java.security.interfaces)

```java
public interface ECPrivateKey <example-value> PrivateKey, ECKey
```

The interface to an elliptic curve (EC) private key.

**See also:** PrivateKey

**See also:** ECKey

**Since:** 1.5

## ECPrivateKey.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate
serialization compatibility.

**Deprecated:** A `serialVersionUID` field in an interface is
ineffectual. Do not use; no replacement.

## ECPrivateKey.getS()

```java
BigInteger getS()
```

Returns the private value S.

**Returns:** the private value S.

## ECPrivateKey.getParams()

```java
default ECParameterSpec getParams()
```

(inherited documentation)

**Implementation requirements:** The default implementation returns `null`.

**Returns:** (inherited documentation)
