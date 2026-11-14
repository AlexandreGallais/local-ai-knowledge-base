---
title: "CRLSelector interface (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CRLSelector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CRLSelector interface (java.security.cert)

```java
public interface CRLSelector extends Cloneable
```

A selector that defines a set of criteria for selecting `CRL`s.
Classes that implement this interface are often used to specify
which `CRL`s should be retrieved from a `CertStore`.

**Concurrent Access**

Unless otherwise specified, the methods defined in this interface are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CRL

**See also:** CertStore

**See also:** CertStore#getCRLs

**Since:** 1.4

## CRLSelector.match(CRL)

```java
boolean match(CRL crl)
```

Decides whether a `CRL` should be selected.

Parameters:

- `crl`: the `CRL` to be checked

**Returns:** `true` if the `CRL` should be selected,
`false` otherwise

## CRLSelector.clone()

```java
Object clone()
```

Makes a copy of this `CRLSelector`. Changes to the
copy will not affect the original and vice versa.

**Returns:** a copy of this `CRLSelector`
