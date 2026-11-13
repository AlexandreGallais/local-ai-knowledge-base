---
title: "Breaking change - CompositeMLDsa updated to draft-08"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/cryptography/10.0/composite-mldsa-draft-08.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CompositeMLDsa updated to draft-08

`System.Security.Cryptography.CompositeMLDsa` has moved from draft-07 to draft-08 of the Composite ML-DSA for use in X.509 Public Key Infrastructure specification. The draft-08 format is not compatible with the draft-07 signatures, and key export/import formats are also incompatible across the draft-07/draft-08 boundary. draft-08 and draft-09 are compatible.

## Version introduced

.NET 10 GA

## Previous behavior

In preview and RC releases of .NET 10, signatures were generated and validated according to draft-07 of Composite ML-DSA for use in X.509 Public Key Infrastructure.

Public key and private key export and import used the format from draft-07 of Composite ML-DSA for use in X.509 Public Key Infrastructure.

## New behavior

Starting in the .NET 10 GA release, signatures are generated and validated according to draft-08 of Composite ML-DSA for use in X.509 Public Key Infrastructure.

Public key and private key export and import use the format from draft-08 of Composite ML-DSA for use in X.509 Public Key Infrastructure.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made to stay current with the underlying specification.

## Recommended action

The `System.Security.Cryptography.CompositeMLDsa` class is marked as `[Experimental]`, partly because the specification isn't yet complete. Do not depend on this class in production.

Discard any previously generated keys and signatures.

## Affected APIs

- `System.Security.Cryptography.CompositeMLDsa`
