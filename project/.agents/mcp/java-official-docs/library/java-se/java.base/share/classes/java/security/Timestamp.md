---
title: "Timestamp class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Timestamp.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Timestamp class (java.security)

```java
public final class Timestamp implements Serializable
```

This class encapsulates information about a signed timestamp.
It is immutable.
It includes the timestamp's date and time as well as information about the
Timestamping Authority (TSA) which generated and signed the timestamp.

**Since:** 1.5

## Timestamp.Timestamp(Date, CertPath)

```java
public Timestamp(Date timestamp, CertPath signerCertPath)
```

Constructs a `Timestamp`.

Parameters:

- `timestamp`: is the timestamp's date and time. It must not be `null`.
- `signerCertPath`: is the TSA's certificate path. It must not be `null`.

Throws:

- `NullPointerException`: if timestamp or signerCertPath is `null`.

## Timestamp.getTimestamp()

```java
public Date getTimestamp()
```

Returns the date and time when the `Timestamp` was generated.

**Returns:** The timestamp's date and time.

## Timestamp.getSignerCertPath()

```java
public CertPath getSignerCertPath()
```

Returns the certificate path for the Timestamping Authority.

**Returns:** The TSA's certificate path.

## Timestamp.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this `Timestamp`.
The hash code is generated using the date and time of the
`Timestamp` and the TSA's certificate path.

**Returns:** a hash code value for this `Timestamp`.

## Timestamp.equals(Object)

```java
public boolean equals(Object obj)
```

Tests for equality between the specified object and this
`Timestamp`. Two timestamps are considered equal if the date and
time of their timestamp's and their signer's certificate paths are equal.

Parameters:

- `obj`: the object to test for equality with this `Timestamp`.

**Returns:** `true` if the timestamps are considered equal,
`false` otherwise.

## Timestamp.toString()

```java
public String toString()
```

Returns a string describing this `Timestamp`.

**Returns:** A string comprising the date and time of the `Timestamp`
        and its signer's certificate.
