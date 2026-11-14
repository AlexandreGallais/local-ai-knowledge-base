---
title: "DSASignatureFormat enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSASignatureFormat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSASignatureFormat enum

Namespace: `System.Security.Cryptography`

```csharp
public enum DSASignatureFormat
```

Specifies the data format for signatures with the DSA family of algorithms.

#### Remarks

> **Important:**
> The creators of the DSA algorithm have withdrawn their support for it. Consider using the `RSA` class or the `ECDsa` class instead of the `DSA` class. Use `DSA` only for compatibility with legacy applications and data.

## DSASignatureFormat.IeeeP1363FixedFieldConcatenation field

```csharp
IeeeP1363FixedFieldConcatenation
```

The signature format from IEEE P1363, which produces a fixed-size signature for a given key.

#### Remarks

This signature format encodes the `(r, s)` tuple as the concatenation of the
big-endian representation of `r` and the big-endian representation of `s`, each
value encoding using the number of bytes required for encoding the maximum integer
value in the key's mathematical field. For example, an ECDSA signature from the curve
`secp521r1`, a 521-bit field, will encode each of `r` and `s` as 66 bytes, producing
a signature output of 132 bytes.

## DSASignatureFormat.Rfc3279DerSequence field

```csharp
Rfc3279DerSequence
```

The signature format from IETF RFC 3279, which produces a variably-sized signature.

#### Remarks

This signature format encodes the `(r, s)` tuple as the DER encoding of
`SEQUENCE(INTEGER(r), INTEGER(s))`. Because the length of a DER INTEGER encoding
varies according to the value being encoded, this signature format does not produce
a consistent signature length. Signatures in this format always start with `0x30`,
and on average are 7 bytes longer than signatures in the
`IeeeP1363FixedFieldConcatenation` format.
