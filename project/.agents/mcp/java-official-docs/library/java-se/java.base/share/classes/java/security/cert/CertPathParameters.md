---
title: "CertPathParameters interface (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertPathParameters.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertPathParameters interface (java.security.cert)

```java
public interface CertPathParameters extends Cloneable
```

A specification of certification path algorithm parameters.
The purpose of this interface is to group (and provide type safety for)
all `CertPath` parameter specifications. All
`CertPath` parameter specifications must implement this
interface.

**See also:** CertPathValidator#validate(CertPath, CertPathParameters)

**See also:** CertPathBuilder#build(CertPathParameters)

**Since:** 1.4

## CertPathParameters.clone()

```java
Object clone()
```

Makes a copy of this `CertPathParameters`. Changes to the
copy will not affect the original and vice versa.

**Returns:** a copy of this `CertPathParameters`
