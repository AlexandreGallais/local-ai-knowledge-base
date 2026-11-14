---
title: "Breaking change - CompositeMLDsa updated to draft-08"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/10.0/composite-mldsa-draft-08.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CompositeMLDsa updated to draft-08

`System.Security.Cryptography.CompositeMLDsa` has moved from draft-07 to draft-08 of the Composite ML-DSA for use in X.509 Public Key <example-value> specification. The draft-08 format is not compatible with the draft-07 signatures, and key <example-value> formats are also incompatible across the draft-07/draft-08 boundary. draft-08 and draft-09 are compatible.

## Version introduced

.NET 10 GA

## Previous behavior

In preview and RC releases of .NET 10, signatures were generated and validated according to draft-07 of Composite ML-DSA for use in X.509 Public Key Infrastructure.

Public key and private key <example-value> and import used the format from draft-07 of Composite ML-DSA for use in X.509 Public Key Infrastructure.

## New behavior

Starting in the .NET 10 GA release, signatures are generated and validated according to draft-08 of Composite ML-DSA for use in X.509 Public Key Infrastructure.

Public key and private key <example-value> and import use the format from draft-08 of Composite ML-DSA for use in X.509 Public Key Infrastructure.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made to stay current with the underlying specification.

## Recommended action

The `System.Security.Cryptography.CompositeMLDsa` class is marked as `[Experimental]`, partly because the specification isn't yet complete. Do not depend on this class in production.

Discard any previously generated keys and signatures.

## Affected APIs

- `System.Security.Cryptography.CompositeMLDsa`
