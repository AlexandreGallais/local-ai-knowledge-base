---
title: "PublicKey <example-value> (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/PublicKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PublicKey <example-value> (java.security)

```java
public interface PublicKey <example-value> AsymmetricKey
```

A public key. This interface contains no methods or constants.
It merely serves to group (and provide type safety for) all public key
interfaces.

Note: The specialized public key <example-value> extend this interface.
See, for example, the DSAPublicKey <example-value> in
`java.security.interfaces`.

**Since:** 1.1

**See also:** Key

**See also:** PrivateKey

**See also:** java.security.cert.Certificate

**See also:** Signature#initVerify

**See also:** java.security.interfaces.DSAPublicKey

**See also:** java.security.interfaces.RSAPublicKey

## PublicKey.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate serialization
compatibility with a previous version of the class.

**Deprecated:** A `serialVersionUID` field in an interface is
ineffectual. Do not use; no replacement.
