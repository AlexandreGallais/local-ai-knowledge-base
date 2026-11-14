---
title: "CertPathBuilderResult interface (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertPathBuilderResult.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertPathBuilderResult interface (java.security.cert)

```java
public interface CertPathBuilderResult extends Cloneable
```

A specification of the result of a certification path builder algorithm.
All results returned by the CertPathBuilder.build method must implement this interface.

At a minimum, a `CertPathBuilderResult` contains the
`CertPath` built by the `CertPathBuilder` instance.
Implementations of this interface may add methods to return implementation
or algorithm specific information, such as debugging information or
certification path validation results.

**Concurrent Access**

Unless otherwise specified, the methods defined in this interface are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CertPathBuilder

**Since:** 1.4

## CertPathBuilderResult.getCertPath()

```java
CertPath getCertPath()
```

Returns the built certification path.

**Returns:** the certification path (never `null`)

## CertPathBuilderResult.clone()

```java
Object clone()
```

Makes a copy of this `CertPathBuilderResult`. Changes to the
copy will not affect the original and vice versa.

**Returns:** a copy of this `CertPathBuilderResult`
