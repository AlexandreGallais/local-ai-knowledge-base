---
title: "DEREncodable interface (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/DEREncodable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DEREncodable interface (java.security)

```java
public sealed interface DEREncodable permits AsymmetricKey, KeyPair, PKCS8EncodedKeySpec, X509EncodedKeySpec, EncryptedPrivateKeyInfo, X509Certificate, X509CRL, PEMRecord
```

This interface is implemented by security API classes that contain
binary-encodable key or certificate material.
These APIs or their subclasses typically provide methods to convert
their instances to and from byte arrays in the Distinguished
Encoding Rules (DER) format.

**See also:** AsymmetricKey

**See also:** KeyPair

**See also:** PKCS8EncodedKeySpec

**See also:** X509EncodedKeySpec

**See also:** EncryptedPrivateKeyInfo

**See also:** X509Certificate

**See also:** X509CRL

**See also:** PEMRecord

**Since:** 25
