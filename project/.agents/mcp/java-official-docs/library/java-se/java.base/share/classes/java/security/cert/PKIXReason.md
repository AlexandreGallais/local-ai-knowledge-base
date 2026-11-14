# PKIXReason enum (java.security.cert)

```java
public enum PKIXReason implements CertPathValidatorException.Reason
```

The {@code PKIXReason} enumerates the potential PKIX-specific reasons
that an X.509 certification path may be invalid according to the PKIX
(RFC 5280) standard. These reasons are in addition to those of the
{@code CertPathValidatorException.BasicReason} enumeration.

@since 1.7