# PKIXRevocationChecker class (java.security.cert)

```java
public abstract class PKIXRevocationChecker extends PKIXCertPathChecker
```

A {@code PKIXCertPathChecker} for checking the revocation status of
certificates with the PKIX algorithm.

<p>A {@code PKIXRevocationChecker} checks the revocation status of
certificates with the Online Certificate Status Protocol (OCSP) or
Certificate Revocation Lists (CRLs). OCSP is described in RFC 2560 and
is a network protocol for determining the status of a certificate. A CRL
is a time-stamped list identifying revoked certificates, and RFC 5280
describes an algorithm for determining the revocation status of certificates
using CRLs.

<p>Each {@code PKIXRevocationChecker} must be able to check the revocation
status of certificates with OCSP and CRLs. By default, OCSP is the
preferred mechanism for checking revocation status, with CRLs as the
fallback mechanism. However, this preference can be switched to CRLs with
the {@link Option#PREFER_CRLS PREFER_CRLS} option. In addition, the fallback
mechanism can be disabled with the {@link Option#NO_FALLBACK NO_FALLBACK}
option.

<p>A {@code PKIXRevocationChecker} is obtained by calling the
{@link CertPathValidator#getRevocationChecker getRevocationChecker} method
of a PKIX {@code CertPathValidator}. Additional parameters and options
specific to revocation can be set (by calling the
{@link #setOcspResponder setOcspResponder} method for instance). The
{@code PKIXRevocationChecker} is added to a {@code PKIXParameters} object
using the {@link PKIXParameters#addCertPathChecker addCertPathChecker}
or {@link PKIXParameters#setCertPathCheckers setCertPathCheckers} method,
and then the {@code PKIXParameters} is passed along with the {@code CertPath}
to be validated to the {@link CertPathValidator#validate validate} method
of a PKIX {@code CertPathValidator}. When supplying a revocation checker in
this manner, it will be used to check revocation irrespective of the setting
of the {@link PKIXParameters#isRevocationEnabled RevocationEnabled} flag,
and will override the default revocation checking mechanism of the PKIX
service provider. Similarly, a {@code PKIXRevocationChecker} may be added
to a {@code PKIXBuilderParameters} object for use with a PKIX
{@code CertPathBuilder}.

<p>Note that when a {@code PKIXRevocationChecker} is added to
{@code PKIXParameters}, it clones the {@code PKIXRevocationChecker};
thus any subsequent modifications to the {@code PKIXRevocationChecker}
have no effect.

<p>Any parameter that is not set (or is set to {@code null}) will be set to
the default value for that parameter.

<p><b>Concurrent Access</b>

<p>Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single object
concurrently should synchronize amongst themselves and provide the
necessary locking. Multiple threads each manipulating separate objects
need not synchronize.

@spec https://www.rfc-editor.org/info/rfc2560
     RFC 2560: X.509 Internet Public Key Infrastructure Online Certificate
             Status Protocol - OCSP
@spec https://www.rfc-editor.org/info/rfc5280
     RFC 5280: Internet X.509 Public Key Infrastructure Certificate
             and Certificate Revocation List (CRL) Profile
@since 1.8

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
overrides the {@code ocsp.responderURL} security property and any
responder specified in a certificate's Authority Information Access
Extension, as defined in RFC 5280.

@param uri the responder URI

## PKIXRevocationChecker.getOcspResponder()

```java
public URI getOcspResponder()
```

Gets the URI that identifies the location of the OCSP responder. This
overrides the {@code ocsp.responderURL} security property. If this
parameter or the {@code ocsp.responderURL} property is not set, the
location is determined from the certificate's Authority Information
Access Extension, as defined in RFC 5280.

@return the responder URI, or {@code null} if not set

## PKIXRevocationChecker.setOcspResponderCert(X509Certificate)

```java
public void setOcspResponderCert(X509Certificate cert)
```

Sets the OCSP responder's certificate. This overrides the
{@code ocsp.responderCertSubjectName},
{@code ocsp.responderCertIssuerName},
and {@code ocsp.responderCertSerialNumber} security properties.

@param cert the responder's certificate

## PKIXRevocationChecker.getOcspResponderCert()

```java
public X509Certificate getOcspResponderCert()
```

Gets the OCSP responder's certificate. This overrides the
{@code ocsp.responderCertSubjectName},
{@code ocsp.responderCertIssuerName},
and {@code ocsp.responderCertSerialNumber} security properties. If this
parameter or the aforementioned properties are not set, then the
responder's certificate is determined as specified in RFC 2560.

@return the responder's certificate, or {@code null} if not set

## PKIXRevocationChecker.setOcspExtensions(List<Extension>)

```java
public void setOcspExtensions(List<Extension> extensions)
```

Sets the optional OCSP request extensions.

@param extensions a list of extensions. The list is copied to protect
       against subsequent modification.

## PKIXRevocationChecker.getOcspExtensions()

```java
public List<Extension> getOcspExtensions()
```

Gets the optional OCSP request extensions.

@return an unmodifiable list of extensions. The list is empty if no
        extensions have been specified.

## PKIXRevocationChecker.setOcspResponses(Map<X509Certificate, byte[]>)

```java
public void setOcspResponses(Map<X509Certificate, byte[]> responses)
```

Sets the OCSP responses. These responses are used to determine
the revocation status of the specified certificates when OCSP is used.

@param responses a map of OCSP responses. Each key is an
       {@code X509Certificate} that maps to the corresponding
       DER-encoded OCSP response for that certificate. A deep copy of
       the map is performed to protect against subsequent modification.

## PKIXRevocationChecker.getOcspResponses()

```java
public Map<X509Certificate, byte[]> getOcspResponses()
```

Gets the OCSP responses. These responses are used to determine
the revocation status of the specified certificates when OCSP is used.

@return a map of OCSP responses. Each key is an
       {@code X509Certificate} that maps to the corresponding
       DER-encoded OCSP response for that certificate. A deep copy of
       the map is returned to protect against subsequent modification.
       Returns an empty map if no responses have been specified.

## PKIXRevocationChecker.setOptions(Set<Option>)

```java
public void setOptions(Set<Option> options)
```

Sets the revocation options.

@param options a set of revocation options. The set is copied to protect
       against subsequent modification.

## PKIXRevocationChecker.getOptions()

```java
public Set<Option> getOptions()
```

Gets the revocation options.

@return an unmodifiable set of revocation options. The set is empty if
        no options have been specified.

## PKIXRevocationChecker.getSoftFailExceptions()

```java
public abstract List<CertPathValidatorException> getSoftFailExceptions()
```

Returns a list containing the exceptions that are ignored by the
revocation checker when the {@link Option#SOFT_FAIL SOFT_FAIL} option
is set. The list is cleared each time {@link #init init} is called.
The list is ordered in ascending order according to the certificate
index returned by {@link CertPathValidatorException#getIndex getIndex}
method of each entry.
<p>
An implementation of {@code PKIXRevocationChecker} is responsible for
adding the ignored exceptions to the list.

@return an unmodifiable list containing the ignored exceptions. The list
        is empty if no exceptions have been ignored.