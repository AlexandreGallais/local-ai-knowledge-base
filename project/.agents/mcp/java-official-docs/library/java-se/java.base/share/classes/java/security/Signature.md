---
title: "Signature class (java.security) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Signature.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Signature class (java.security)

```java
public abstract class Signature extends SignatureSpi
```

The `Signature` class is used to provide applications the functionality
of a digital signature algorithm. Digital signatures are used for
authentication and integrity assurance of digital data.

 The signature algorithm can be, among others, the NIST standard
DSA, using DSA and SHA-256. The DSA algorithm using the
SHA-256 message digest algorithm can be specified as `SHA256withDSA`.
In the case of RSA the signing algorithm could be specified as, for example,
`SHA256withRSA`.
The algorithm name must be specified, as there is no default.

 A `Signature` object can be used to generate and verify digital
signatures.

 There are three phases to the use of a `Signature` object for
either signing data or verifying a signature:

- Initialization, with either

- a public key, which initializes the signature for
    verification (see initVerify), or

- a private key (and optionally a Secure Random Number Generator),
    which initializes the signature for signing
    (see `initSign(PrivateKey)`
    and SecureRandom)).

- Updating

Depending on the type of initialization, this will update the
bytes to be signed or verified. See the
update methods.

- Signing or Verifying a signature on all updated bytes. See the
sign methods and the verify
method.

Note that this class is abstract and extends from
`SignatureSpi` for historical reasons.
Application developers should only take notice of the methods defined in
this `Signature` class; all the methods in
the superclass are intended for cryptographic service providers who wish to
supply their own implementations of digital signature algorithms.

 Every implementation of the Java platform is required to support the
following standard `Signature` algorithms. For the "RSASSA-PSS"
algorithm, implementations must support the parameters in parentheses. For
the "SHA256withECDSA" and "SHA384withECDSA" algorithms, implementations must
support the curves in parentheses.

- `RSASSA-PSS` (MGF1 mask generation function and SHA-256 or SHA-384
     hash algorithms)

- `SHA1withDSA`

- `SHA256withDSA`

- `SHA256withECDSA` (secp256r1)

- `SHA384withECDSA` (secp384r1)

- `SHA1withRSA`

- `SHA256withRSA`

- `SHA384withRSA`

These algorithms are described in the
Signature section of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

**Since:** 1.1

## Signature.UNINITIALIZED

```java
protected static final int UNINITIALIZED
```

Possible `state` value, signifying that
this `Signature` object has not yet been initialized.

## Signature.SIGN

```java
protected static final int SIGN
```

Possible `state` value, signifying that
this `Signature` object has been initialized for signing.

## Signature.VERIFY

```java
protected static final int VERIFY
```

Possible `state` value, signifying that
this `Signature` object has been initialized for verification.

## Signature.state

```java
protected int state
```

Current state of this `Signature` object.

## Signature.Signature(String)

```java
protected Signature(String algorithm)
```

Creates a `Signature` object for the specified algorithm.

Parameters:

- `algorithm`: the standard string name of the algorithm. See the Signature section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.

## Signature.getInstance(String)

```java
public static Signature getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a `Signature` object that implements the specified
signature algorithm.

 This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new `Signature` object encapsulating the
`SignatureSpi` implementation from the first
provider that supports the specified algorithm is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the standard name of the algorithm requested. See the Signature section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred`
Security property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
Security.getProviders().

**Returns:** the new `Signature` object

**See also:** Provider

Throws:

- `NoSuchAlgorithmException`: if no `Provider` supports a `Signature` implementation for the specified algorithm
- `NullPointerException`: if `algorithm` is `null`

## Signature.getInstance(String, String)

```java
public static Signature getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a `Signature` object that implements the specified
signature algorithm.

 A new `Signature` object encapsulating the
`SignatureSpi` implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the algorithm requested. See the Signature section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the name of the provider.

**Returns:** the new `Signature` object

**See also:** Provider

Throws:

- `IllegalArgumentException`: if the provider name is `null` or empty
- `NoSuchAlgorithmException`: if a `SignatureSpi` implementation for the specified algorithm is not available from the specified provider
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `algorithm` is `null`

## Signature.getInstance(String, Provider)

```java
public static Signature getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a `Signature` object that implements the specified
signature algorithm.

 A new `Signature` object encapsulating the
`SignatureSpi` implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

Parameters:

- `algorithm`: the name of the algorithm requested. See the Signature section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the provider.

**Returns:** the new `Signature` object

**See also:** Provider

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if the provider is `null`
- `NoSuchAlgorithmException`: if a `SignatureSpi` implementation for the specified algorithm is not available from the specified `Provider` object
- `NullPointerException`: if `algorithm` is `null`

## Signature.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this `Signature` object.

**Returns:** the provider of this `Signature` object

## Signature.initVerify(PublicKey)

```java
public final void initVerify(PublicKey <example-value>) throws InvalidKeyException
```

Initializes this object for verification. If this method is called
again with a different argument, it negates the effect
of this call.

Parameters:

- `publicKey`: the public key of the identity whose signature is going to be verified.

Throws:

- `InvalidKeyException`: if the key is invalid.

## Signature.initVerify(Certificate)

```java
public final void initVerify(Certificate certificate) throws InvalidKeyException
```

Initializes this object for verification, using the public key from
the given certificate.

If the certificate is of type X.509 and has a *key usage*
extension field marked as critical, and the value of the *key usage*
extension field implies that the public key in
the certificate and its corresponding private key are not
supposed to be used for digital signatures, an
`InvalidKeyException` is thrown.

Parameters:

- `certificate`: the certificate of the identity whose signature is going to be verified.

**Since:** 1.3

Throws:

- `InvalidKeyException`: if the public key in the certificate is not encoded properly or does not include required parameter information or cannot be used for digital signature purposes.

## Signature.initSign(PrivateKey)

```java
public final void initSign(PrivateKey <example-value>) throws InvalidKeyException
```

Initialize this object for signing. If this method is called
again with a different argument, it negates the effect
of this call.

Parameters:

- `privateKey`: the private key of the identity whose signature is going to be generated.

Throws:

- `InvalidKeyException`: if the key is invalid.

## Signature.initSign(PrivateKey, SecureRandom)

```java
public final void initSign(PrivateKey <example-value>, SecureRandom random) throws InvalidKeyException
```

Initialize this object for signing. If this method is called
again with a different argument, it negates the effect
of this call.

Parameters:

- `privateKey`: the private key of the identity whose signature is going to be generated
- `random`: the source of randomness for this `Signature` object

Throws:

- `InvalidKeyException`: if the key is invalid.

## Signature.sign()

```java
public final byte[] sign() throws SignatureException
```

Returns the signature bytes of all the data updated.
The format of the signature depends on the underlying
signature scheme.

A call to this method resets this `Signature` object to the
state it was in when previously initialized for signing via a
call to `initSign(PrivateKey)`. That is, the object is
reset and available to generate another signature from the same
signer, if desired, via new calls to `update` and
`sign`.

**Returns:** the signature bytes of the signing operation's result.

Throws:

- `SignatureException`: if this `Signature` object is not initialized properly or if this signature algorithm is unable to process the input data provided.

## Signature.sign(byte[], int, int)

```java
public final int sign(byte[] outbuf, int offset, int len) throws SignatureException
```

Finishes the signature operation and stores the resulting signature
bytes in the provided buffer `outbuf`, starting at
`offset`.
The format of the signature depends on the underlying
signature scheme.

This `Signature` object is reset to its initial state (the
state it was in after a call to one of the `initSign` methods) and
can be reused to generate further signatures with the same private key.

Parameters:

- `outbuf`: buffer for the signature result.
- `offset`: offset into `outbuf` where the signature is stored.
- `len`: number of bytes within `outbuf` allotted for the signature.

**Returns:** the number of bytes placed into `outbuf`.

**Since:** 1.2

Throws:

- `SignatureException`: if this `Signature` object is not initialized properly, if this signature algorithm is unable to process the input data provided, or if `len` is less than the actual signature length.
- `IllegalArgumentException`: if `outbuf` is `null`, or `offset` or `len` is less than 0, or the sum of `offset` and `len` is greater than the length of `outbuf`.

## Signature.verify(byte[])

```java
public final boolean verify(byte[] signature) throws SignatureException
```

Verifies the passed-in signature.

A call to this method resets this `Signature` object to the
state it was in when previously initialized for verification via a
call to `initVerify(PublicKey)`. That is, the object is
reset and available to verify another signature from the identity
whose public key was specified in the call to `initVerify`.

Parameters:

- `signature`: the signature bytes to be verified.

**Returns:** `true` if the signature was verified, `false` if not.

Throws:

- `SignatureException`: if this `Signature` object is not initialized properly, the passed-in signature is improperly encoded or of the wrong type, if this signature algorithm is unable to process the input data provided, etc.

## Signature.verify(byte[], int, int)

```java
public final boolean verify(byte[] signature, int offset, int length) throws SignatureException
```

Verifies the passed-in signature in the specified array
of bytes, starting at the specified offset.

A call to this method resets this `Signature` object to the
state it was in when previously initialized for verification via a
call to `initVerify(PublicKey)`. That is, the object is
reset and available to verify another signature from the identity
whose public key was specified in the call to `initVerify`.

Parameters:

- `signature`: the signature bytes to be verified.
- `offset`: the offset to start from in the array of bytes.
- `length`: the number of bytes to use, starting at offset.

**Returns:** `true` if the signature was verified, `false` if not.

**Since:** 1.4

Throws:

- `SignatureException`: if this `Signature` object is not initialized properly, the passed-in signature is improperly encoded or of the wrong type, if this signature algorithm is unable to process the input data provided, etc.
- `IllegalArgumentException`: if the `signature` byte array is `null`, or the `offset` or `length` is less than 0, or the sum of the `offset` and `length` is greater than the length of the `signature` byte array.

## Signature.update(byte)

```java
public final void update(byte b) throws SignatureException
```

Updates the data to be signed or verified by a byte.

Parameters:

- `b`: the byte to use for the update.

Throws:

- `SignatureException`: if this `Signature` object is not initialized properly.

## Signature.update(byte[])

```java
public final void update(byte[] data) throws SignatureException
```

Updates the data to be signed or verified, using the specified
array of bytes.

Parameters:

- `data`: the byte array to use for the update.

Throws:

- `SignatureException`: if this `Signature` object is not initialized properly.

## Signature.update(byte[], int, int)

```java
public final void update(byte[] data, int off, int len) throws SignatureException
```

Updates the data to be signed or verified, using the specified
array of bytes, starting at the specified offset.

Parameters:

- `data`: the array of bytes.
- `off`: the offset to start from in the array of bytes.
- `len`: the number of bytes to use, starting at offset.

Throws:

- `SignatureException`: if this `Signature` object is not initialized properly.
- `IllegalArgumentException`: if `data` is `null`, or `off` or `len` is less than 0, or the sum of `off` and `len` is greater than the length of `data`.
