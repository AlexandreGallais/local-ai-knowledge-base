---
title: "ECField interface (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/ECField.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ECField interface (java.security.spec)

```java
public interface ECField
```

This interface represents an elliptic curve (EC) finite field.
All specialized EC fields must implements this interface.

**See also:** ECFieldFp

**See also:** ECFieldF2m

**Since:** 1.5

## ECField.getFieldSize()

```java
int getFieldSize()
```

Returns the field size in bits. Note: For prime finite
field ECFieldFp, size of prime p in bits is returned.
For characteristic 2 finite field ECFieldF2m, m is returned.

**Returns:** the field size in bits.
