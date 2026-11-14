---
title: "KeySpec interface (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/KeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeySpec interface (java.security.spec)

```java
public interface KeySpec
```

A (transparent) specification of the key <example-value>
that constitutes a cryptographic key.

If the key is stored on a hardware device, its
specification may contain information that helps identify the key on the
device.

 A key may be specified in an algorithm-specific way, or in an
algorithm-independent encoding format (such as ASN.1).
For example, a DSA private key may be specified by its components
`x`, `p`, `q`, and `g`
(see `DSAPrivateKeySpec`), or it may be
specified using its DER encoding
(see `PKCS8EncodedKeySpec`).

 This interface contains no methods or constants. Its only purpose
is to group (and provide type safety for) all key specifications.
All key <example-value> must implement this interface.

**See also:** java.security.Key

**See also:** java.security.KeyFactory

**See also:** EncodedKeySpec

**See also:** X509EncodedKeySpec

**See also:** PKCS8EncodedKeySpec

**See also:** DSAPrivateKeySpec

**See also:** DSAPublicKeySpec

**Since:** 1.2
