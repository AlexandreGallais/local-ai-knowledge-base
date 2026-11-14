---
title: "KeyRep class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyRep.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyRep class (java.security)

```java
public class KeyRep implements Serializable
```

Standardized representation for serialized Key objects.

Note that a serialized Key may contain sensitive information
which should not be exposed in untrusted environments.  See the

Security Appendix
of the *Java Object Serialization Specification* for more information.

**See also:** Key

**See also:** KeyFactory

**See also:** javax.crypto.spec.SecretKeySpec

**See also:** java.security.spec.X509EncodedKeySpec

**See also:** java.security.spec.PKCS8EncodedKeySpec

**Since:** 1.5

## KeyRep.KeyRep(Type, String, String, byte[])

```java
public KeyRep(Type type, String algorithm, String format, byte[] encoded)
```

Construct the alternate Key class.

Parameters:

- `type`: either one of Type.SECRET, Type.PUBLIC, or Type.PRIVATE
- `algorithm`: the algorithm returned from `Key.getAlgorithm()`
- `format`: the encoding format returned from `Key.getFormat()`
- `encoded`: the encoded bytes returned from `Key.getEncoded()`

Throws:

- `NullPointerException`: if type is `null`, if algorithm is `null`, if format is `null`, or if encoded is `null`

## KeyRep.readResolve()

```java
protected Object readResolve() throws ObjectStreamException
```

Resolve the Key object.

 This method supports three Type/format combinations:

-  Type.SECRET/"RAW" - returns a SecretKeySpec object
constructed using encoded key bytes and algorithm

-  Type.PUBLIC/"X.509" - gets a KeyFactory instance for
the key <example-value>, constructs an X509EncodedKeySpec with the
encoded key bytes, and generates a public key from the spec

-  Type.PRIVATE/"PKCS#8" - gets a KeyFactory instance for
the key <example-value>, constructs a PKCS8EncodedKeySpec with the
encoded key bytes, and generates a private key from the spec

**Returns:** the resolved Key <example-value>

Throws:

- `ObjectStreamException`: if the Type/format combination is unrecognized, if the algorithm, key <example-value>, or encoded key bytes are unrecognized/invalid, of if the resolution of the key fails for any reason
