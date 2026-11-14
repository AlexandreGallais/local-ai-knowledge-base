---
title: "CertPathValidatorResult interface (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertPathValidatorResult.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertPathValidatorResult interface (java.security.cert)

```java
public interface CertPathValidatorResult extends Cloneable
```

A specification of the result of a certification path validator algorithm.

The purpose of this interface is to group (and provide type safety
for) all certification path validator results. All results returned
by the CertPathValidator.validate
method must implement this interface.

**See also:** CertPathValidator

**Since:** 1.4

## CertPathValidatorResult.clone()

```java
Object clone()
```

Makes a copy of this `CertPathValidatorResult`. Changes to the
copy will not affect the original and vice versa.

**Returns:** a copy of this `CertPathValidatorResult`
