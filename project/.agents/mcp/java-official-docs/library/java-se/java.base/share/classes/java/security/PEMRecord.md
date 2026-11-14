---
title: "PEMRecord record (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/PEMRecord.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PEMRecord record (java.security)

```java
public record PEMRecord(String type, String content, byte[] leadingData) implements DEREncodable
```

`PEMRecord` is a `DEREncodable` that represents Privacy-Enhanced
Mail (PEM) data by its type and Base64 form.  `PEMDecoder` and
`PEMEncoder` use `PEMRecord` when representing the data as a
cryptographic object is not desired or the type has no
`DEREncodable`.

 `type` and `content` may not be `null`.
`leadingData` may be null if no non-PEM data preceded PEM header
during decoding.  `leadingData` may be useful for reading metadata
that accompanies PEM data.

 No validation is performed during instantiation to ensure that
`type` conforms to `RFC 7468`, that `content` is valid
Base64, or that `content` matches the `type`.
`leadingData` is not defensively copied and does not return a
clone when `leadingData()` is called.

Parameters:

- `type`: the type identifier in the PEM header without PEM syntax labels. For a public key, `type` would be "PUBLIC KEY".
- `content`: the Base64-encoded data, excluding the PEM header and footer
- `leadingData`: any non-PEM data preceding the PEM header when decoding.

**See also:** PEMDecoder

**See also:** PEMEncoder

**Since:** 25

## PEMRecord.PEMRecord

```java
public PEMRecord
```

Creates a `PEMRecord` instance with the given parameters.

Parameters:

- `type`: the type identifier
- `content`: the Base64-encoded data, excluding the PEM header and footer
- `leadingData`: any non-PEM data read during the decoding process before the PEM header. This value maybe `null`.

Throws:

- `IllegalArgumentException`: if `type` is incorrectly formatted.
- `NullPointerException`: if `type` and/or `content` are `null`.

## PEMRecord.PEMRecord(String, String)

```java
public PEMRecord(String type, String content)
```

Creates a `PEMRecord` instance with a given `type` and
`content` data in String form.  `leadingData` is set to null.

Parameters:

- `type`: the PEM type identifier
- `content`: the Base64-encoded data, excluding the PEM header and footer

Throws:

- `IllegalArgumentException`: if `type` is incorrectly formatted.
- `NullPointerException`: if `type` and/or `content` are `null`.

## PEMRecord.toString()

```java
public String toString()
```

Returns the type and Base64 encoding in PEM format.  `leadingData`
is not returned by this method.
