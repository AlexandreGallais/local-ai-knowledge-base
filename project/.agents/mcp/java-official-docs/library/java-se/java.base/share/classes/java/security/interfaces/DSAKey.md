---
title: "DSAKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/DSAKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DSAKey <example-value> (java.security.interfaces)

```java
public interface DSAKey
```

The interface to a DSA public or private key. DSA (Digital Signature
Algorithm) is defined in NIST's FIPS-186.

**See also:** DSAParams

**See also:** java.security.Key

**See also:** java.security.Signature

**Since:** 1.1

## DSAKey.getParams()

```java
DSAParams getParams()
```

Returns the DSA-specific key parameters. These parameters are
never secret.

**Returns:** the DSA-specific key parameters.

**See also:** DSAParams
