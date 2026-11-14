# CRLReason enum (java.security.cert)

```java
public enum CRLReason
```

The CRLReason enumeration specifies the reason that a certificate
is revoked, as defined in <a href="https://tools.ietf.org/html/rfc5280">
RFC 5280: Internet X.509 Public Key Infrastructure Certificate and CRL
Profile</a>.

@spec https://www.rfc-editor.org/info/rfc5280
     RFC 5280: Internet X.509 Public Key Infrastructure Certificate
             and Certificate Revocation List (CRL) Profile
@author Sean Mullan
@since 1.7
@see X509CRLEntry#getRevocationReason
@see CertificateRevokedException#getRevocationReason