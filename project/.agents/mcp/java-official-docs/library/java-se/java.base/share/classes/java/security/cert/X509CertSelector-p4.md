---
title: "X509CertSelector class (java.security.cert) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/X509CertSelector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# X509CertSelector class (java.security.cert) (part 4 of 4)

## X509CertSelector.toString()

```java
public String toString()
```

Return a printable representation of the `CertSelector`.

**Returns:** a `String` describing the contents of the
        `CertSelector`

## X509CertSelector.match(Certificate)

```java
public boolean match(Certificate cert)
```

Decides whether a `Certificate` should be selected.

Parameters:

- `cert`: the `Certificate` to be checked

**Returns:** `true` if the `Certificate` should be
        selected, `false` otherwise

## X509CertSelector.clone()

```java
public Object clone()
```

Returns a copy of this object.

**Returns:** the copy
