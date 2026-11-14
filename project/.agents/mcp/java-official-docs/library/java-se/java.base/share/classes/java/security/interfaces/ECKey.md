---
title: "ECKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/ECKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ECKey <example-value> (java.security.interfaces)

```java
public interface ECKey
```

The interface to an elliptic curve (EC) key.

**Since:** 1.5

## ECKey.getParams()

```java
ECParameterSpec getParams()
```

Returns the domain parameters associated
with this key. The domain parameters are
either explicitly specified or implicitly
created during key generation.

**Returns:** the associated domain parameters.
