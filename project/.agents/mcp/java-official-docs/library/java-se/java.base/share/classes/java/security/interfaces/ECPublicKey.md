---
title: "ECPublicKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/ECPublicKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ECPublicKey <example-value> (java.security.interfaces)

```java
public interface ECPublicKey <example-value> PublicKey, ECKey
```

The interface to an elliptic curve (EC) public key.

**See also:** PublicKey

**See also:** ECKey

**See also:** java.security.spec.ECPoint

**Since:** 1.5

## ECPublicKey.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate
serialization compatibility.

**Deprecated:** A `serialVersionUID` field in an interface is
ineffectual. Do not use; no replacement.

## ECPublicKey.getW()

```java
ECPoint getW()
```

Returns the public point W.

**Returns:** the public point W.

## ECPublicKey.getParams()

```java
default ECParameterSpec getParams()
```

(inherited documentation)

**Implementation requirements:** The default implementation returns `null`.

**Returns:** (inherited documentation)
