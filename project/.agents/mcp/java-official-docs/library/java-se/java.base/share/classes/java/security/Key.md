---
title: "Key <example-value> (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Key.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Key <example-value> (java.security)

```java
public interface Key <example-value> java.io.Serializable
```

The `Key` interface is the top-level interface for all keys. It
defines the functionality shared by all `Key` objects. All keys
have three characteristics:

- An Algorithm

This is the key <example-value> for that key. The key <example-value> is usually
an encryption or asymmetric operation algorithm (such as DSA or
RSA), which will work with those algorithms and with related
algorithms (such as MD5 with RSA, SHA-1 with RSA, Raw DSA, etc.)
The name of the algorithm of a key is obtained using the
getAlgorithm method.

- An Encoded Form

This is an external encoded form for the key used when a standard
representation of the key is needed outside the Java Virtual Machine,
as when transmitting the key to some other party. The key
is encoded according to a standard format (such as
X.509 `SubjectPublicKeyInfo` or PKCS#8), and
is returned using the getEncoded method.
Note: The syntax of the ASN.1 type `SubjectPublicKeyInfo`
is defined as follows:

```java
SubjectPublicKeyInfo ::= SEQUENCE {
  algorithm AlgorithmIdentifier,
  subjectPublicKey BIT STRING }

AlgorithmIdentifier ::= SEQUENCE {
  algorithm OBJECT IDENTIFIER,
  parameters ANY DEFINED BY algorithm OPTIONAL
```

For more information, see
RFC 5280:
Internet X.509 Public Key <example-value> Certificate and CRL Profile.

- A Format

This is the name of the format of the encoded key. It is returned
by the getFormat method.

Keys are generally obtained through key <example-value>, certificates,
key <example-value> or other classes used to manage keys.
Keys may also be obtained from key <example-value> (transparent
representations of the underlying key <example-value>) through the use of a key
factory (see `KeyFactory`).

 A Key <example-value> use KeyRep as its serialized representation.
Note that a serialized Key may contain sensitive information
which should not be exposed in untrusted environments.  See the

Security Appendix
of the *Java Object Serialization Specification* for more information.

**See also:** PublicKey

**See also:** PrivateKey

**See also:** KeyPair

**See also:** KeyPairGenerator

**See also:** KeyFactory

**See also:** KeyRep

**See also:** java.security.spec.KeySpec

**Since:** 1.1

## Key.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate
serialization compatibility with a previous
version of the class.

**Deprecated:** A `serialVersionUID` field in an interface is
ineffectual. Do not use; no replacement.

## Key.getAlgorithm()

```java
String getAlgorithm()
```

Returns the standard algorithm name for this key. For
example, "RSA" would indicate that this key is an RSA key.
See the Key <example-value> section in the

Java Security Standard Algorithm Names Specification
for information about standard key <example-value> names.

**Returns:** the name of the algorithm associated with this key.

## Key.getFormat()

```java
String getFormat()
```

Returns the name of the primary encoding format of this key,
or `null` if this key does not support encoding.
The primary encoding format is
named in terms of the appropriate ASN.1 data format, if an
ASN.1 specification for this key exists.
For example, the name of the ASN.1 data format for public
keys is *SubjectPublicKeyInfo*, as
defined by the X.509 standard; in this case, the returned format is
`"X.509"`. Similarly,
the name of the ASN.1 data format for private keys is
*PrivateKeyInfo*,
as defined by the PKCS #8 standard; in this case, the returned format is
`"PKCS#8"`.

**Returns:** the primary encoding format of the key.

## Key.getEncoded()

```java
byte[] getEncoded()
```

Returns the key in its primary encoding format, or `null`
if this key does not support encoding.

**Returns:** the encoded key, or `null` if the key does not support
encoding.
