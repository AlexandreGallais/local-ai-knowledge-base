---
title: "PEMDecoder class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/PEMDecoder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PEMDecoder class (java.security)

```java
public final class PEMDecoder
```

`PEMDecoder` implements a decoder for Privacy-Enhanced Mail (PEM) data.
PEM is a textual encoding used to store and transfer security
objects, such as asymmetric keys, certificates, and certificate revocation
lists (CRLs).  It is defined in RFC 1421 and RFC 7468.  PEM consists of a
Base64-formatted binary encoding enclosed by a type-identifying header
and footer.

 The `decode(String)` and `decode(InputStream)`
methods return an instance of a class that matches the data
type and implements `DEREncodable`.

 The following lists the supported PEM types and the `DEREncodable`
types that each are decoded as:

- CERTIFICATE : `X509Certificate`

- X509 CRL : `X509CRL`

- PUBLIC KEY : `PublicKey`

- PUBLIC KEY : `X509EncodedKeySpec` (Only supported when passed as
 a `Class` parameter)

- PRIVATE KEY : `PrivateKey`

- PRIVATE KEY : `PKCS8EncodedKeySpec` (Only supported when passed
 as a `Class` parameter)

- PRIVATE KEY : `KeyPair` (if the encoding also contains a
 public key)

- ENCRYPTED PRIVATE KEY : `EncryptedPrivateKeyInfo`

- ENCRYPTED PRIVATE KEY : `PrivateKey` (if configured with
 Decryption)

- Other types : `PEMRecord`

 The `PublicKey` and `PrivateKey` types, an algorithm specific
subclass is returned if the underlying algorithm is supported. For example an
ECPublicKey and ECPrivateKey for Elliptic Curve keys.

 If the PEM type does not have a corresponding class,
`decode(String)` and `decode(InputStream)` will return a
`PEMRecord`.

 The Class) and
Class) methods take a class parameter
which determines the type of `DEREncodable` that is returned. These
methods are useful when extracting or changing the return class.
For example, if the PEM contains both public and private keys, the
class parameter can specify which to return. Use
`PrivateKey.class` to return only the private key.
If the class parameter is set to `X509EncodedKeySpec.class`, the
public key will be returned in that format.  Any type of PEM data can be
decoded into a `PEMRecord` by specifying `PEMRecord.class`.
If the class parameter doesn't match the PEM content, a
`ClassCastException` will be thrown.

 A new `PEMDecoder` instance is created when configured
with `withFactory(Provider)` and/or
`withDecryption(char[])`. `withFactory(Provider)`
configures the decoder to use only `KeyFactory` and
`CertificateFactory` instances from the given `Provider`.
`withDecryption(char[])` configures the decoder to decrypt all
encrypted private key PEM data using the given password.
Configuring an instance for decryption does not prevent decoding with
unencrypted PEM. Any encrypted PEM that fails decryption
will throw a `RuntimeException`. When an encrypted private key PEM is
used with a decoder not configured for decryption, an
`EncryptedPrivateKeyInfo` object is returned.

This class is immutable and thread-safe.

 Here is an example of decoding a `PrivateKey` object:

 Here is an example of a `PEMDecoder` configured with decryption
and a factory provider:

**Implementation note:** An implementation may support other PEM types and
`DEREncodable` objects. This implementation additionally supports
the following PEM types:  `X509 CERTIFICATE`,
`X.509 CERTIFICATE`, `CRL`, and `RSA PRIVATE KEY`.

**See also:** PEMEncoder

**See also:** PEMRecord

**See also:** EncryptedPrivateKeyInfo

**Since:** 25

## PEMDecoder.of()

```java
public static PEMDecoder of()
```

Returns an instance of `PEMDecoder`.

**Returns:** a `PEMDecoder` instance

## PEMDecoder.decode(String)

```java
public DEREncodable decode(String str)
```

Decodes and returns a `DEREncodable` from the given `String`.

 This method reads the `String` until PEM data is found
or the end of the `String` is reached.  If no PEM data is found,
an `IllegalArgumentException` is thrown.

 This method returns a Java API cryptographic object,
such as a `PrivateKey`, if the PEM type is supported.
Any non-PEM data preceding the PEM header is ignored by the decoder.
Otherwise, a `PEMRecord` will be returned containing
the type identifier and Base64-encoded data.
Any non-PEM data preceding the PEM header will be stored in
`leadingData`.

 Input consumed by this method is read in as
UTF-8.

Parameters:

- `str`: a String containing PEM data

**Returns:** a `DEREncodable`

Throws:

- `IllegalArgumentException`: on error in decoding or no PEM data found
- `NullPointerException`: when `str` is null

## PEMDecoder.decode(InputStream)

```java
public DEREncodable decode(InputStream is) throws IOException
```

Decodes and returns a `DEREncodable` from the given
`InputStream`.

 This method reads from the `InputStream` until the end of
the PEM footer or the end of the stream. If an I/O error occurs,
the read position in the stream may become inconsistent.
It is recommended to perform no further decoding operations
on the `InputStream`.

 This method returns a Java API cryptographic object,
such as a `PrivateKey`, if the PEM type is supported.
Any non-PEM data preceding the PEM header is ignored by the decoder.
Otherwise, a `PEMRecord` will be returned containing
the type identifier and Base64-encoded data.
Any non-PEM data preceding the PEM header will be stored in
`leadingData`.

 If no PEM data is found, an `IllegalArgumentException` is
thrown.

Parameters:

- `is`: InputStream containing PEM data

**Returns:** a `DEREncodable`

Throws:

- `IOException`: on IO or PEM syntax error where the `InputStream` did not complete decoding.
- `EOFException`: at the end of the `InputStream`
- `IllegalArgumentException`: on error in decoding
- `NullPointerException`: when `is` is null

## PEMDecoder.decode(String, Class)

```java
public <S extends DEREncodable> S decode(String str, Class<S> tClass)
```

Decodes and returns a `DEREncodable` of the specified class from
the given PEM string. `tClass` must extend `DEREncodable`
and be an appropriate class for the PEM type.

 This method reads the `String` until PEM data is found
or the end of the `String` is reached.  If no PEM data is found,
an `IllegalArgumentException` is thrown.

 If the class parameter is `PEMRecord.class`,
a `PEMRecord` is returned containing the
type identifier and Base64 encoding. Any non-PEM data preceding
the PEM header will be stored in `leadingData`.  Other
class parameters will not return preceding non-PEM data.

 Input consumed by this method is read in as
UTF-8.

Parameters:

- ``: Class type parameter that extends `DEREncodable`
- `str`: the String containing PEM data
- `tClass`: the returned object class that implements `DEREncodable`

**Returns:** a `DEREncodable` specified by `tClass`

Throws:

- `IllegalArgumentException`: on error in decoding or no PEM data found
- `ClassCastException`: if `tClass` is invalid for the PEM type
- `NullPointerException`: when any input values are null

## PEMDecoder.decode(InputStream, Class)

```java
public <S extends DEREncodable> S decode(InputStream is, Class<S> tClass) throws IOException
```

Decodes and returns the specified class for the given
`InputStream`.  The class must extend `DEREncodable` and be
an appropriate class for the PEM type.

 This method reads from the `InputStream` until the end of
the PEM footer or the end of the stream. If an I/O error occurs,
the read position in the stream may become inconsistent.
It is recommended to perform no further decoding operations
on the `InputStream`.

 If the class parameter is `PEMRecord.class`,
a `PEMRecord` is returned containing the
type identifier and Base64 encoding. Any non-PEM data preceding
the PEM header will be stored in `leadingData`.  Other
class parameters will not return preceding non-PEM data.

 If no PEM data is found, an `IllegalArgumentException` is
thrown.

Parameters:

- ``: Class type parameter that extends `DEREncodable`.
- `is`: an InputStream containing PEM data
- `tClass`: the returned object class that implements `DEREncodable`.

**Returns:** a `DEREncodable` typecast to `tClass`

**See also:** #decode(InputStream)

**See also:** #decode(String, Class)

Throws:

- `IOException`: on IO or PEM syntax error where the `InputStream` did not complete decoding.
- `EOFException`: at the end of the `InputStream`
- `IllegalArgumentException`: on error in decoding
- `ClassCastException`: if `tClass` is invalid for the PEM type
- `NullPointerException`: when any input values are null

## PEMDecoder.withFactory(Provider)

```java
public PEMDecoder withFactory(Provider provider)
```

Returns a copy of this `PEMDecoder` instance that uses
`KeyFactory` and `CertificateFactory` implementations
from the specified `Provider` to produce cryptographic objects.
Any errors using the `Provider` will occur during decoding.

Parameters:

- `provider`: the factory provider

**Returns:** a new PEMEncoder instance configured to the `Provider`.

Throws:

- `NullPointerException`: if `provider` is null

## PEMDecoder.withDecryption(char[])

```java
public PEMDecoder withDecryption(char[] password)
```

Returns a copy of this `PEMDecoder` that decodes and decrypts
encrypted private keys using the specified password.
Non-encrypted PEM can still be decoded from this instance.

Parameters:

- `password`: the password to decrypt encrypted PEM data. This array is cloned and stored in the new instance.

**Returns:** a new PEMEncoder instance configured for decryption

Throws:

- `NullPointerException`: if `password` is null
