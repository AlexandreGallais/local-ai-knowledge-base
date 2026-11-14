---
title: "PrivateKey <example-value> (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/PrivateKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PrivateKey <example-value> (java.security)

```java
public interface PrivateKey <example-value> AsymmetricKey, javax.security.auth.Destroyable
```

A private key.
The purpose of this interface is to group (and provide type safety
for) all private key interfaces.

Note: The specialized private key <example-value> extend this interface.
See, for example, the `DSAPrivateKey` interface in
`java.security.interfaces`.

Implementations should override the default `destroy` and
`isDestroyed` methods from the
`javax.security.auth.Destroyable` interface to enable
sensitive key <example-value> to be destroyed, cleared, or in the case
where such information is immutable, unreferenced.
Finally, since `PrivateKey` is `Serializable`, implementations
should also override
`java.io.ObjectOutputStream.writeObject(java.lang.Object)`
to prevent keys that have been destroyed from being serialized.

**See also:** Key

**See also:** PublicKey

**See also:** java.security.cert.Certificate

**See also:** Signature#initVerify

**See also:** java.security.interfaces.DSAPrivateKey

**See also:** java.security.interfaces.RSAPrivateKey

**See also:** java.security.interfaces.RSAPrivateCrtKey

**Since:** 1.1

## PrivateKey.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate serialization
compatibility with a previous version of the class.

**Deprecated:** A `serialVersionUID` field in an interface is
ineffectual. Do not use; no replacement.
