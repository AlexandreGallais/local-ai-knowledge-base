---
title: "Certificate class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/Certificate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Certificate class (java.security.cert)

```java
public abstract class Certificate implements java.io.Serializable
```

Abstract class for managing a variety of identity certificates.
An identity certificate is a binding of a principal to a public key which
is vouched for by another principal.  (A principal represents
an entity such as an individual user, a group, or a corporation.)

This class is an abstraction for certificates that have different
formats but important common uses.  For example, different types of
certificates, such as X.509 and PGP, share general certificate
functionality (like encoding and verifying) and
some types of information (like a public key).

X.509, PGP, and SDSI certificates can all be implemented by
subclassing the Certificate class, even though they contain different
sets of information, and they store and retrieve the information in
different ways.

**See also:** X509Certificate

**See also:** CertificateFactory

**Since:** 1.2

## Certificate.Certificate(String)

```java
protected Certificate(String type)
```

Creates a certificate of the specified type.

Parameters:

- `type`: the standard name of the certificate type. See the CertificateFactory section in the  Java Security Standard Algorithm Names Specification for information about standard certificate types.

## Certificate.getType()

```java
public final String getType()
```

Returns the type of this certificate.

**Returns:** the type of this certificate.

## Certificate.equals(Object)

```java
public boolean equals(Object other)
```

Compares this certificate for equality with the specified
object. If the `other` object is an
`instanceof` `Certificate`, then
its encoded form is retrieved and compared with the
encoded form of this certificate.

Parameters:

- `other`: the object to test for equality with this certificate.

**Returns:** true iff the encoded forms of the two certificates
match, false otherwise.

## Certificate.hashCode()

```java
public int hashCode()
```

## Certificate.getEncoded()

```java
public abstract byte[] getEncoded() throws CertificateEncodingException
```

Returns the encoded form of this certificate. It is
assumed that each certificate type would have only a single
form of encoding; for example, X.509 certificates would
be encoded as ASN.1 DER.

**Returns:** the encoded form of this certificate

Throws:

- `CertificateEncodingException`: if an encoding error occurs.

## Certificate.verify(PublicKey)

```java
public abstract void verify(PublicKey key) throws CertificateException, NoSuchAlgorithmException, InvalidKeyException, NoSuchProviderException, SignatureException
```

Verifies that this certificate was signed using the
private key that corresponds to the specified public key.

Parameters:

- `key`: the PublicKey used to carry out the verification.

Throws:

- `NoSuchAlgorithmException`: on unsupported signature algorithms.
- `InvalidKeyException`: on incorrect key.
- `NoSuchProviderException`: if there's no default provider.
- `SignatureException`: on signature errors.
- `CertificateException`: on encoding errors.

## Certificate.verify(PublicKey, String)

```java
public abstract void verify(PublicKey key, String sigProvider) throws CertificateException, NoSuchAlgorithmException, InvalidKeyException, NoSuchProviderException, SignatureException
```

Verifies that this certificate was signed using the
private key that corresponds to the specified public key.
This method uses the signature verification engine
supplied by the specified provider.

Parameters:

- `key`: the PublicKey used to carry out the verification.
- `sigProvider`: the name of the signature provider.

Throws:

- `NoSuchAlgorithmException`: on unsupported signature algorithms.
- `InvalidKeyException`: on incorrect key.
- `NoSuchProviderException`: on incorrect provider.
- `SignatureException`: on signature errors.
- `CertificateException`: on encoding errors.

## Certificate.verify(PublicKey, Provider)

```java
public void verify(PublicKey key, Provider sigProvider) throws CertificateException, NoSuchAlgorithmException, InvalidKeyException, SignatureException
```

Verifies that this certificate was signed using the
private key that corresponds to the specified public key.
This method uses the signature verification engine
supplied by the specified provider. Note that the specified
Provider object does not have to be registered in the provider list.

 This method was added to version 1.8 of the Java Platform
Standard Edition. In order to maintain backwards compatibility with
existing service providers, this method cannot be `abstract`
and by default throws an `UnsupportedOperationException`.

Parameters:

- `key`: the PublicKey used to carry out the verification.
- `sigProvider`: the signature provider.

**Since:** 1.8

Throws:

- `NoSuchAlgorithmException`: on unsupported signature algorithms.
- `InvalidKeyException`: on incorrect key.
- `SignatureException`: on signature errors.
- `CertificateException`: on encoding errors.
- `UnsupportedOperationException`: if the method is not supported

## Certificate.toString()

```java
public abstract String toString()
```

Returns a string representation of this certificate.

**Returns:** a string representation of this certificate.

## Certificate.getPublicKey()

```java
public abstract PublicKey getPublicKey()
```

Gets the public key from this certificate.

**Returns:** the public key.

## Certificate.CertificateRep(String, byte[])

```java
protected CertificateRep(String type, byte[] data)
```

Construct the alternate `Certificate` class with the
`Certificate` type and `Certificate` encoding bytes.

Parameters:

- `type`: the standard name of the `Certificate` type.
- `data`: the `Certificate` data.

## Certificate.readResolve()

```java
protected Object readResolve() throws java.io.ObjectStreamException
```

Returns a `Certificate` with the type and data of this
`CertificateRep`.

**Returns:** the resolved `Certificate` object

Throws:

- `java.io.ObjectStreamException`: if the `Certificate` could not be resolved

## Certificate.writeReplace()

```java
protected Object writeReplace() throws java.io.ObjectStreamException
```

Replace the `Certificate` to be serialized with a
CertificateRep object containing the type and
encoded bytes of the `Certificate`.

**Returns:** a `CertificateRep` object containing the type and encoded
        bytes of the `Certificate`

**Since:** 1.3

Throws:

- `java.io.ObjectStreamException`: if a `CertificateRep` object representing this `Certificate` could not be created
