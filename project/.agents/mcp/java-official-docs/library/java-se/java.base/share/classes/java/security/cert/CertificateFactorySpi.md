---
title: "CertificateFactorySpi class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertificateFactorySpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertificateFactorySpi class (java.security.cert)

```java
public abstract class CertificateFactorySpi
```

This class defines the *Service Provider Interface* (**SPI**)
for the `CertificateFactory` class.
All the abstract methods in this class must be implemented by each
cryptographic service provider who wishes to supply the implementation
of a certificate factory for a particular certificate type, e.g., X.509.

Certificate factories are used to generate certificate, certification path
(`CertPath`) and certificate revocation list (CRL) objects from
their encodings.

A certificate factory for X.509 must return certificates that are an
instance of `java.security.cert.X509Certificate`, and CRLs
that are an instance of `java.security.cert.X509CRL`.

**See also:** CertificateFactory

**See also:** Certificate

**See also:** X509Certificate

**See also:** CertPath

**See also:** CRL

**See also:** X509CRL

**Since:** 1.2

## CertificateFactorySpi.CertificateFactorySpi()

```java
public CertificateFactorySpi()
```

Constructor for subclasses to call.

## CertificateFactorySpi.engineGenerateCertificate(InputStream)

```java
public abstract Certificate engineGenerateCertificate(InputStream inStream) throws CertificateException
```

Generates a certificate object and initializes it with
the data read from the input stream `inStream`.

In order to take advantage of the specialized certificate format
supported by this certificate factory,
the returned certificate object can be typecast to the corresponding
certificate class. For example, if this certificate
factory implements X.509 certificates, the returned certificate object
can be typecast to the `X509Certificate` class.

In the case of a certificate factory for X.509 certificates, the
certificate provided in `inStream` must be DER-encoded and
may be supplied in binary or printable (Base64) encoding. If the
certificate is provided in Base64 encoding, it must be bounded at
the beginning by -----BEGIN CERTIFICATE-----, and must be bounded at
the end by -----END CERTIFICATE-----.

Note that if the given input stream does not support
mark and
reset, this method will
consume the entire input stream. Otherwise, each call to this
method consumes one certificate and the read position of the input stream
is positioned to the next available byte after the inherent
end-of-certificate marker. If the data in the
input stream does not contain an inherent end-of-certificate marker (other
than EOF) and there is trailing data after the certificate is parsed, a
`CertificateException` is thrown.

Parameters:

- `inStream`: an input stream with the certificate data.

**Returns:** a certificate object initialized with the data
from the input stream.

Throws:

- `CertificateException`: on parsing errors.

## CertificateFactorySpi.engineGenerateCertPath(InputStream)

```java
public CertPath engineGenerateCertPath(InputStream inStream) throws CertificateException
```

Generates a `CertPath` object and initializes it with
the data read from the `InputStream` inStream. The data
is assumed to be in the default encoding.

 This method was added to version 1.4 of the Java 2 Platform
Standard Edition. In order to maintain backwards compatibility with
existing service providers, this method cannot be `abstract`
and by default throws an `UnsupportedOperationException`.

Parameters:

- `inStream`: an `InputStream` containing the data

**Returns:** a `CertPath` initialized with the data from the
  `InputStream`

**Since:** 1.4

Throws:

- `CertificateException`: if an exception occurs while decoding
- `UnsupportedOperationException`: if the method is not supported

## CertificateFactorySpi.engineGenerateCertPath(InputStream, String)

```java
public CertPath engineGenerateCertPath(InputStream inStream, String encoding) throws CertificateException
```

Generates a `CertPath` object and initializes it with
the data read from the `InputStream` inStream. The data
is assumed to be in the specified encoding.

 This method was added to version 1.4 of the Java 2 Platform
Standard Edition. In order to maintain backwards compatibility with
existing service providers, this method cannot be `abstract`
and by default throws an `UnsupportedOperationException`.

Parameters:

- `inStream`: an `InputStream` containing the data
- `encoding`: the encoding used for the data

**Returns:** a `CertPath` initialized with the data from the
  `InputStream`

**Since:** 1.4

Throws:

- `CertificateException`: if an exception occurs while decoding or the encoding requested is not supported
- `UnsupportedOperationException`: if the method is not supported

## CertificateFactorySpi.engineGenerateCertPath(List<? extends Certificate>)

```java
public CertPath engineGenerateCertPath(List<? extends Certificate> certificates) throws CertificateException
```

Generates a `CertPath` object and initializes it with
a `List` of `Certificate`s.

The certificates supplied must be of a type supported by the
`CertificateFactory`. They will be copied out of the supplied
`List` object.

 This method was added to version 1.4 of the Java 2 Platform
Standard Edition. In order to maintain backwards compatibility with
existing service providers, this method cannot be `abstract`
and by default throws an `UnsupportedOperationException`.

Parameters:

- `certificates`: a `List` of `Certificate`s

**Returns:** a `CertPath` initialized with the supplied list of
  certificates

**Since:** 1.4

Throws:

- `CertificateException`: if an exception occurs
- `UnsupportedOperationException`: if the method is not supported

## CertificateFactorySpi.engineGetCertPathEncodings()

```java
public Iterator<String> engineGetCertPathEncodings()
```

Returns an iteration of the `CertPath` encodings supported
by this certificate factory, with the default encoding first. See
the CertPath Encodings section in the
Java Security Standard Algorithm Names Specification
for information about standard encoding names.

Attempts to modify the returned `Iterator` via its
`remove` method result in an
`UnsupportedOperationException`.

 This method was added to version 1.4 of the Java 2 Platform
Standard Edition. In order to maintain backwards compatibility with
existing service providers, this method cannot be `abstract`
and by default throws an `UnsupportedOperationException`.

**Returns:** an `Iterator` over the names of the supported
        `CertPath` encodings (as `String`s)

**Since:** 1.4

Throws:

- `UnsupportedOperationException`: if the method is not supported

## CertificateFactorySpi.engineGenerateCertificates(InputStream)

```java
public abstract Collection<? extends Certificate> engineGenerateCertificates(InputStream inStream) throws CertificateException
```

Returns a (possibly empty) collection view of the certificates read
from the given input stream `inStream`.

In order to take advantage of the specialized certificate format
supported by this certificate factory, each element in
the returned collection view can be typecast to the corresponding
certificate class. For example, if this certificate
factory implements X.509 certificates, the elements in the returned
collection can be typecast to the `X509Certificate` class.

In the case of a certificate factory for X.509 certificates,
`inStream` may contain a single DER-encoded certificate
in the formats described for
generateCertificate.
In addition, `inStream` may contain a PKCS#7 certificate
chain. This is a PKCS#7 *SignedData* object, with the only
significant field being *certificates*. In particular, the
signature and the contents are ignored. This format allows multiple
certificates to be downloaded at once. If no certificates are present,
an empty collection is returned.

Note that if the given input stream does not support
mark and
reset, this method will
consume the entire input stream.

Parameters:

- `inStream`: the input stream with the certificates.

**Returns:** a (possibly empty) collection view of
java.security.cert.Certificate objects
initialized with the data from the input stream.

Throws:

- `CertificateException`: on parsing errors.

## CertificateFactorySpi.engineGenerateCRL(InputStream)

```java
public abstract CRL engineGenerateCRL(InputStream inStream) throws CRLException
```

Generates a certificate revocation list (CRL) object and initializes it
with the data read from the input stream `inStream`.

In order to take advantage of the specialized CRL format
supported by this certificate factory,
the returned CRL object can be typecast to the corresponding
CRL class. For example, if this certificate
factory implements X.509 CRLs, the returned CRL object
can be typecast to the `X509CRL` class.

Note that if the given input stream does not support
mark and
reset, this method will
consume the entire input stream. Otherwise, each call to this
method consumes one CRL and the read position of the input stream
is positioned to the next available byte after the inherent
end-of-CRL marker. If the data in the
input stream does not contain an inherent end-of-CRL marker (other
than EOF) and there is trailing data after the CRL is parsed, a
`CRLException` is thrown.

Parameters:

- `inStream`: an input stream with the CRL data.

**Returns:** a CRL object initialized with the data
from the input stream.

Throws:

- `CRLException`: on parsing errors.

## CertificateFactorySpi.engineGenerateCRLs(InputStream)

```java
public abstract Collection<? extends CRL> engineGenerateCRLs (InputStream inStream) throws CRLException
```

Returns a (possibly empty) collection view of the CRLs read
from the given input stream `inStream`.

In order to take advantage of the specialized CRL format
supported by this certificate factory, each element in
the returned collection view can be typecast to the corresponding
CRL class. For example, if this certificate
factory implements X.509 CRLs, the elements in the returned
collection can be typecast to the `X509CRL` class.

In the case of a certificate factory for X.509 CRLs,
`inStream` may contain a single DER-encoded CRL.
In addition, `inStream` may contain a PKCS#7 CRL
set. This is a PKCS#7 *SignedData* object, with the only
significant field being *crls*. In particular, the
signature and the contents are ignored. This format allows multiple
CRLs to be downloaded at once. If no CRLs are present,
an empty collection is returned.

Note that if the given input stream does not support
mark and
reset, this method will
consume the entire input stream.

Parameters:

- `inStream`: the input stream with the CRLs.

**Returns:** a (possibly empty) collection view of
java.security.cert.CRL objects initialized with the data from the input
stream.

Throws:

- `CRLException`: on parsing errors.
