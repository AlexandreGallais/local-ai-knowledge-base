---
title: "PKIXReason enum (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/PKIXReason.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PKIXReason enum (java.security.cert)

```java
public enum PKIXReason implements CertPathValidatorException.Reason
```

The `PKIXReason` enumerates the potential PKIX-specific reasons
that an X.509 certification path may be invalid according to the PKIX
(RFC 5280) standard. These reasons are in addition to those of the
`CertPathValidatorException.BasicReason` enumeration.

**Since:** 1.7
