---
title: "CertificateFactory class (java.security.cert) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertificateFactory.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertificateFactory class (java.security.cert) (part 2 of 2)

## CertificateFactory.generateCRLs(InputStream)

```java
public final Collection<? extends CRL> generateCRLs(InputStream inStream) throws CRLException
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
`inStream` may contain a sequence of DER-encoded CRLs.
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
