# Certificate class (java.security.cert)

```java
public abstract class Certificate implements java.io.Serializable
```

<p>Abstract class for managing a variety of identity certificates.
An identity certificate is a binding of a principal to a public key which
is vouched for by another principal.  (A principal represents
an entity such as an individual user, a group, or a corporation.)
<p>
This class is an abstraction for certificates that have different
formats but important common uses.  For example, different types of
certificates, such as X.509 and PGP, share general certificate
functionality (like encoding and verifying) and
some types of information (like a public key).
<p>
X.509, PGP, and SDSI certificates can all be implemented by
subclassing the Certificate class, even though they contain different
sets of information, and they store and retrieve the information in
different ways.

@see X509Certificate
@see CertificateFactory

@author Hemma Prafullchandra
@since 1.2

## Certificate.Certificate(String)

```java
protected Certificate(String type)
```

Creates a certificate of the specified type.

@param type the standard name of the certificate type.
See the CertificateFactory section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#certificatefactory-types">
Java Security Standard Algorithm Names Specification</a>
for information about standard certificate types.
@spec security/standard-names.html Java Security Standard Algorithm Names

## Certificate.getType()

```java
public final String getType()
```

Returns the type of this certificate.

@return the type of this certificate.

## Certificate.equals(Object)

```java
public boolean equals(Object other)
```

Compares this certificate for equality with the specified
object. If the {@code other} object is an
{@code instanceof} {@code Certificate}, then
its encoded form is retrieved and compared with the
encoded form of this certificate.

@param other the object to test for equality with this certificate.
@return true iff the encoded forms of the two certificates
match, false otherwise.

## Certificate.hashCode()

```java
public int hashCode()
```

{@return the hashcode value for this certificate from its
encoded form}

## Certificate.getEncoded()

```java
public abstract byte[] getEncoded() throws CertificateEncodingException
```

Returns the encoded form of this certificate. It is
assumed that each certificate type would have only a single
form of encoding; for example, X.509 certificates would
be encoded as ASN.1 DER.

@return the encoded form of this certificate

@throws    CertificateEncodingException if an encoding error occurs.

## Certificate.verify(PublicKey)

```java
public abstract void verify(PublicKey key) throws CertificateException, NoSuchAlgorithmException, InvalidKeyException, NoSuchProviderException, SignatureException
```

Verifies that this certificate was signed using the
private key that corresponds to the specified public key.

@param key the PublicKey used to carry out the verification.

@throws    NoSuchAlgorithmException on unsupported signature
algorithms.
@throws    InvalidKeyException on incorrect key.
@throws    NoSuchProviderException if there's no default provider.
@throws    SignatureException on signature errors.
@throws    CertificateException on encoding errors.

## Certificate.verify(PublicKey, String)

```java
public abstract void verify(PublicKey key, String sigProvider) throws CertificateException, NoSuchAlgorithmException, InvalidKeyException, NoSuchProviderException, SignatureException
```

Verifies that this certificate was signed using the
private key that corresponds to the specified public key.
This method uses the signature verification engine
supplied by the specified provider.

@param key the PublicKey used to carry out the verification.
@param sigProvider the name of the signature provider.

@throws    NoSuchAlgorithmException on unsupported signature
algorithms.
@throws    InvalidKeyException on incorrect key.
@throws    NoSuchProviderException on incorrect provider.
@throws    SignatureException on signature errors.
@throws    CertificateException on encoding errors.

## Certificate.verify(PublicKey, Provider)

```java
public void verify(PublicKey key, Provider sigProvider) throws CertificateException, NoSuchAlgorithmException, InvalidKeyException, SignatureException
```

Verifies that this certificate was signed using the
private key that corresponds to the specified public key.
This method uses the signature verification engine
supplied by the specified provider. Note that the specified
Provider object does not have to be registered in the provider list.

<p> This method was added to version 1.8 of the Java Platform
Standard Edition. In order to maintain backwards compatibility with
existing service providers, this method cannot be {@code abstract}
and by default throws an {@code UnsupportedOperationException}.

@param key the PublicKey used to carry out the verification.
@param sigProvider the signature provider.

@throws    NoSuchAlgorithmException on unsupported signature
algorithms.
@throws    InvalidKeyException on incorrect key.
@throws    SignatureException on signature errors.
@throws    CertificateException on encoding errors.
@throws    UnsupportedOperationException if the method is not supported
@since 1.8

## Certificate.toString()

```java
public abstract String toString()
```

Returns a string representation of this certificate.

@return a string representation of this certificate.

## Certificate.getPublicKey()

```java
public abstract PublicKey getPublicKey()
```

Gets the public key from this certificate.

@return the public key.

## Certificate.CertificateRep(String, byte[])

```java
protected CertificateRep(String type, byte[] data)
```

Construct the alternate {@code Certificate} class with the
{@code Certificate} type and {@code Certificate} encoding bytes.

@param type the standard name of the {@code Certificate} type.

@param data the {@code Certificate} data.

## Certificate.readResolve()

```java
protected Object readResolve() throws java.io.ObjectStreamException
```

Returns a {@code Certificate} with the type and data of this
{@code CertificateRep}.

@return the resolved {@code Certificate} object

@throws java.io.ObjectStreamException if the {@code Certificate}
     could not be resolved

## Certificate.writeReplace()

```java
protected Object writeReplace() throws java.io.ObjectStreamException
```

Replace the {@code Certificate} to be serialized with a
{@link CertificateRep CertificateRep} object containing the type and
encoded bytes of the {@code Certificate}.

@return a {@code CertificateRep} object containing the type and encoded
        bytes of the {@code Certificate}

@throws java.io.ObjectStreamException if a {@code CertificateRep} object
        representing this {@code Certificate} could not be created
@since 1.3