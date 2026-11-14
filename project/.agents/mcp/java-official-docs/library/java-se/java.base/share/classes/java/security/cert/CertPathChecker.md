---
title: "CertPathChecker interface (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertPathChecker.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertPathChecker interface (java.security.cert)

```java
public interface CertPathChecker
```

Performs one or more checks on each `Certificate` of a
`CertPath`.

A `CertPathChecker` implementation is typically created to extend
a certification path validation algorithm. For example, an implementation
may check for and process a critical private extension of each certificate
in a certification path.

**Since:** 1.8

## CertPathChecker.init(boolean)

```java
void init(boolean forward) throws CertPathValidatorException
```

Initializes the internal state of this `CertPathChecker`.

The `forward` flag specifies the order that certificates will
be passed to the check method (forward or reverse).

Parameters:

- `forward`: the order that certificates are presented to the `check` method. If `true`, certificates are presented from target to trust anchor (forward); if `false`, from trust anchor to target (reverse).

Throws:

- `CertPathValidatorException`: if this `CertPathChecker` is unable to check certificates in the specified order

## CertPathChecker.isForwardCheckingSupported()

```java
boolean isForwardCheckingSupported()
```

Indicates if forward checking is supported. Forward checking refers
to the ability of the `CertPathChecker` to perform its checks
when certificates are presented to the `check` method in the
forward direction (from target to trust anchor).

**Returns:** `true` if forward checking is supported, `false`
        otherwise

## CertPathChecker.check(Certificate)

```java
void check(Certificate cert) throws CertPathValidatorException
```

Performs the check(s) on the specified certificate using its internal
state. The certificates are presented in the order specified by the
`init` method.

Parameters:

- `cert`: the `Certificate` to be checked

Throws:

- `CertPathValidatorException`: if the specified certificate does not pass the check
