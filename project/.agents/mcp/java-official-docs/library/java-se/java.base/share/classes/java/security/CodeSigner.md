---
title: "CodeSigner class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/CodeSigner.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeSigner class (java.security)

```java
public final class CodeSigner implements Serializable
```

This class encapsulates information about a code signer.
It is immutable.

**Since:** 1.5

## CodeSigner.CodeSigner(CertPath, Timestamp)

```java
public CodeSigner(CertPath signerCertPath, Timestamp timestamp)
```

Constructs a `CodeSigner` object.

Parameters:

- `signerCertPath`: The signer's certificate path. It must not be `null`.
- `timestamp`: A signature timestamp. If `null` then no timestamp was generated for the signature.

Throws:

- `NullPointerException`: if `signerCertPath` is `null`.

## CodeSigner.getSignerCertPath()

```java
public CertPath getSignerCertPath()
```

Returns the signer's certificate path.

**Returns:** A certificate path.

## CodeSigner.getTimestamp()

```java
public Timestamp getTimestamp()
```

Returns the signature timestamp.

**Returns:** The timestamp or `null` if none is present.

## CodeSigner.hashCode()

```java
public int hashCode()
```

The hash code is generated using the signer's certificate path and the
timestamp, if present.

## CodeSigner.equals(Object)

```java
public boolean equals(Object obj)
```

Tests for equality between the specified object and this
code signer. Two code signers are considered equal if their
signer certificate paths are equal and if their timestamps are equal,
if present in both.

Parameters:

- `obj`: the object to test for equality with this object.

**Returns:** `true` if the objects are considered equal,
`false` otherwise.

## CodeSigner.toString()

```java
public String toString()
```

Returns a string describing this code signer.

**Returns:** A string comprising the signer's certificate and a timestamp,
        if present.
