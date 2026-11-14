---
title: "PEMEncoder class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/PEMEncoder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PEMEncoder class (java.security)

```java
public final class PEMEncoder
```

`PEMEncoder` implements an encoder for Privacy-Enhanced Mail (PEM)
data.  PEM is a textual encoding used to store and transfer security
objects, such as asymmetric keys, certificates, and certificate revocation
lists (CRL).  It is defined in RFC 1421 and RFC 7468.  PEM consists of a
Base64-formatted binary encoding enclosed by a type-identifying header
and footer.

 Encoding may be performed on Java API cryptographic objects that
implement `DEREncodable`. The `encode(DEREncodable)`
and `encodeToString(DEREncodable)` methods encode a DEREncodable
into PEM and return the data in a byte array or String.

 Private keys can be encrypted and encoded by configuring a
`PEMEncoder` with the `withEncryption(char[])` method,
which takes a password and returns a new `PEMEncoder` instance
configured to encrypt the key with that password. Alternatively, a
private key <example-value> as an `EncryptedKeyInfo` object can be encoded
directly to PEM by passing it to the `encode` or
`encodeToString` methods.

 PKCS #8 2.0 defines the ASN.1 OneAsymmetricKey <example-value>, which may
contain both private and public keys.
`KeyPair` objects passed to the `encode` or
`encodeToString` methods are encoded as a
OneAsymmetricKey <example-value> using the "PRIVATE KEY" type.

 When encoding a `PEMRecord`, the API surrounds the
`PEMRecord.content()` with the PEM header and footer
from `PEMRecord.type()`. `PEMRecord.leadingData()` is
not included in the encoding.  `PEMRecord` will not perform
validity checks on the data.

The following lists the supported `DEREncodable` classes and
the PEM types that each are encoded as:

- `X509Certificate` : CERTIFICATE

- `X509CRL` : X509 CRL

- `PublicKey`: PUBLIC KEY

- `PrivateKey` : PRIVATE KEY

- `PrivateKey` (if configured with encryption):
 ENCRYPTED PRIVATE KEY

- `EncryptedPrivateKeyInfo` : ENCRYPTED PRIVATE KEY

- `KeyPair` : PRIVATE KEY

- `X509EncodedKeySpec` : PUBLIC KEY

- `PKCS8EncodedKeySpec` : PRIVATE KEY

- `PEMRecord` : `PEMRecord.type()`

 This class is immutable and thread-safe.

 Here is an example of encoding a `PrivateKey` object:

 Here is an example that encrypts and encodes a private key using the
specified password:

**Implementation note:** An implementation may support other PEM types and
`DEREncodable` objects.

**See also:** PEMDecoder

**See also:** PEMRecord

**See also:** EncryptedPrivateKeyInfo

**Since:** 25

## PEMEncoder.of()

```java
public static PEMEncoder of()
```

Returns an instance of `PEMEncoder`.

**Returns:** a `PEMEncoder`

## PEMEncoder.encodeToString(DEREncodable)

```java
public String encodeToString(DEREncodable de)
```

Encodes the specified `DEREncodable` and returns a PEM encoded
string.

Parameters:

- `de`: the `DEREncodable` to be encoded

**Returns:** a `String` containing the PEM encoded data

**See also:** #withEncryption(char[])

Throws:

- `IllegalArgumentException`: if the `DEREncodable` cannot be encoded
- `NullPointerException`: if `de` is `null`

## PEMEncoder.encode(DEREncodable)

```java
public byte[] encode(DEREncodable de)
```

Encodes the specified `DEREncodable` and returns the PEM encoding
in a byte array.

Parameters:

- `de`: the `DEREncodable` to be encoded

**Returns:** a PEM encoded byte array

**See also:** #withEncryption(char[])

Throws:

- `IllegalArgumentException`: if the `DEREncodable` cannot be encoded
- `NullPointerException`: if `de` is `null`

## PEMEncoder.withEncryption(char[])

```java
public PEMEncoder withEncryption(char[] password)
```

Returns a new `PEMEncoder` instance configured for encryption
with the default algorithm and a given password.

 Only `PrivateKey` objects can be encrypted with this newly
configured instance.  Encoding other `DEREncodable` objects will
throw an `IllegalArgumentException`.

Parameters:

- `password`: the encryption password. The array is cloned and stored in the new instance.

**Implementation note:** The default password-based encryption algorithm is defined
by the `jdk.epkcs8.defaultAlgorithm` security property and
uses the default encryption parameters of the provider that is selected.
For greater flexibility with encryption options and parameters, use
Key, String, AlgorithmParameterSpec, Provider, SecureRandom) and use the
returned object with `encode(DEREncodable)`.

**Returns:** a new `PEMEncoder` instance configured for encryption

Throws:

- `NullPointerException`: when password is `null`
