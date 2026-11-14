---
title: "PKIXRevocationChecker class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/PKIXRevocationChecker.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PKIXRevocationChecker class (java.security.cert)

```java
public abstract class PKIXRevocationChecker extends PKIXCertPathChecker
```

A `PKIXCertPathChecker` for checking the revocation status of
certificates with the PKIX algorithm.

A `PKIXRevocationChecker` checks the revocation status of
certificates with the Online Certificate Status Protocol (OCSP) or
Certificate Revocation Lists (CRLs). OCSP is described in RFC 2560 and
is a network protocol for determining the status of a certificate. A CRL
is a time-stamped list identifying revoked certificates, and RFC 5280
describes an algorithm for determining the revocation status of certificates
using CRLs.

Each `PKIXRevocationChecker` must be able to check the revocation
status of certificates with OCSP and CRLs. By default, OCSP is the
preferred mechanism for checking revocation status, with CRLs as the
fallback mechanism. However, this preference can be switched to CRLs with
the PREFER_CRLS option. In addition, the fallback
mechanism can be disabled with the NO_FALLBACK
option.

A `PKIXRevocationChecker` is obtained by calling the
getRevocationChecker method
of a PKIX `CertPathValidator`. Additional parameters and options
specific to revocation can be set (by calling the
setOcspResponder method for instance). The
`PKIXRevocationChecker` is added to a `PKIXParameters` object
using the addCertPathChecker
or setCertPathCheckers method,
and then the `PKIXParameters` is passed along with the `CertPath`
to be validated to the validate method
of a PKIX `CertPathValidator`. When supplying a revocation checker in
this manner, it will be used to check revocation irrespective of the setting
of the RevocationEnabled flag,
and will override the default revocation checking mechanism of the PKIX
service provider. Similarly, a `PKIXRevocationChecker` may be added
to a `PKIXBuilderParameters` object for use with a PKIX
`CertPathBuilder`.

Note that when a `PKIXRevocationChecker` is added to
`PKIXParameters`, it clones the `PKIXRevocationChecker`;
thus any subsequent modifications to the `PKIXRevocationChecker`
have no effect.

Any parameter that is not set (or is set to `null`) will be set to
the default value for that parameter.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single object
concurrently should synchronize amongst themselves and provide the
necessary locking. Multiple threads each manipulating separate objects
need not synchronize.

**Since:** 1.8

## PKIXRevocationChecker.PKIXRevocationChecker()

```java
protected PKIXRevocationChecker()
```

Default constructor.

## PKIXRevocationChecker.setOcspResponder(URI)

```java
public void setOcspResponder(URI uri)
```

Sets the URI that identifies the location of the OCSP responder. This
overrides the `ocsp.responderURL` security property and any
responder specified in a certificate's Authority Information Access
Extension, as defined in RFC 5280.

Parameters:

- `uri`: the responder URI

## PKIXRevocationChecker.getOcspResponder()

```java
public URI getOcspResponder()
```

Gets the URI that identifies the location of the OCSP responder. This
overrides the `ocsp.responderURL` security property. If this
parameter or the `ocsp.responderURL` property is not set, the
location is determined from the certificate's Authority Information
Access Extension, as defined in RFC 5280.

**Returns:** the responder URI, or `null` if not set

## PKIXRevocationChecker.setOcspResponderCert(X509Certificate)

```java
public void setOcspResponderCert(X509Certificate cert)
```

Sets the OCSP responder's certificate. This overrides the
`ocsp.responderCertSubjectName`,
`ocsp.responderCertIssuerName`,
and `ocsp.responderCertSerialNumber` security properties.

Parameters:

- `cert`: the responder's certificate

## PKIXRevocationChecker.getOcspResponderCert()

```java
public X509Certificate getOcspResponderCert()
```

Gets the OCSP responder's certificate. This overrides the
`ocsp.responderCertSubjectName`,
`ocsp.responderCertIssuerName`,
and `ocsp.responderCertSerialNumber` security properties. If this
parameter or the aforementioned properties are not set, then the
responder's certificate is determined as specified in RFC 2560.

**Returns:** the responder's certificate, or `null` if not set

## PKIXRevocationChecker.setOcspExtensions(List<Extension>)

```java
public void setOcspExtensions(List<Extension> extensions)
```

Sets the optional OCSP request extensions.

Parameters:

- `extensions`: a list of extensions. The list is copied to protect against subsequent modification.

## PKIXRevocationChecker.getOcspExtensions()

```java
public List<Extension> getOcspExtensions()
```

Gets the optional OCSP request extensions.

**Returns:** an unmodifiable list of extensions. The list is empty if no
        extensions have been specified.

## PKIXRevocationChecker.setOcspResponses(Map<X509Certificate, byte[]>)

```java
public void setOcspResponses(Map<X509Certificate, byte[]> responses)
```

Sets the OCSP responses. These responses are used to determine
the revocation status of the specified certificates when OCSP is used.

Parameters:

- `responses`: a map of OCSP responses. Each key is an `X509Certificate` that maps to the corresponding DER-encoded OCSP response for that certificate. A deep copy of the map is performed to protect against subsequent modification.

## PKIXRevocationChecker.getOcspResponses()

```java
public Map<X509Certificate, byte[]> getOcspResponses()
```

Gets the OCSP responses. These responses are used to determine
the revocation status of the specified certificates when OCSP is used.

**Returns:** a map of OCSP responses. Each key is an
       `X509Certificate` that maps to the corresponding
       DER-encoded OCSP response for that certificate. A deep copy of
       the map is returned to protect against subsequent modification.
       Returns an empty map if no responses have been specified.

## PKIXRevocationChecker.setOptions(Set<Option>)

```java
public void setOptions(Set<Option> options)
```

Sets the revocation options.

Parameters:

- `options`: a set of revocation options. The set is copied to protect against subsequent modification.

## PKIXRevocationChecker.getOptions()

```java
public Set<Option> getOptions()
```

Gets the revocation options.

**Returns:** an unmodifiable set of revocation options. The set is empty if
        no options have been specified.

## PKIXRevocationChecker.getSoftFailExceptions()

```java
public abstract List<CertPathValidatorException> getSoftFailExceptions()
```

Returns a list containing the exceptions that are ignored by the
revocation checker when the SOFT_FAIL option
is set. The list is cleared each time init is called.
The list is ordered in ascending order according to the certificate
index returned by getIndex
method of each entry.

An implementation of `PKIXRevocationChecker` is responsible for
adding the ignored exceptions to the list.

**Returns:** an unmodifiable list containing the ignored exceptions. The list
        is empty if no exceptions have been ignored.
