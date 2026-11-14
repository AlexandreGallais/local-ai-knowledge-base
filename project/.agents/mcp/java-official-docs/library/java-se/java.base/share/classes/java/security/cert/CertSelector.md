---
title: "CertSelector interface (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertSelector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertSelector interface (java.security.cert)

```java
public interface CertSelector extends Cloneable
```

A selector that defines a set of criteria for selecting
`Certificate`s. Classes that implement this interface
are often used to specify which `Certificate`s should
be retrieved from a `CertStore`.

**Concurrent Access**

Unless otherwise specified, the methods defined in this interface are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** Certificate

**See also:** CertStore

**See also:** CertStore#getCertificates

**Since:** 1.4

## CertSelector.match(Certificate)

```java
boolean match(Certificate cert)
```

Decides whether a `Certificate` should be selected.

Parameters:

- `cert`: the `Certificate` to be checked

**Returns:** `true` if the `Certificate`
should be selected, `false` otherwise

## CertSelector.clone()

```java
Object clone()
```

Makes a copy of this `CertSelector`. Changes to the
copy will not affect the original and vice versa.

**Returns:** a copy of this `CertSelector`
