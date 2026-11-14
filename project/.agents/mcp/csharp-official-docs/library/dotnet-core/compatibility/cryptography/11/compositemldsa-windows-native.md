---
title: "Breaking change: Composite ML-DSA on Windows uses native implementation"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/11/compositemldsa-windows-native.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Composite ML-DSA on Windows uses native implementation

Starting in .NET 11, `System.Security.Cryptography.CompositeMLDsa` on Windows uses the native Windows implementation of Composite ML-DSA instead of a managed implementation layered over ML-DSA, RSA, and ECDSA. Because Windows only implements a subset of the Composite ML-DSA parameter sets natively, this change reduces the number of Composite ML-DSA algorithms supported on Windows.

## Version introduced

.NET 11

## Previous behavior

Previously, `System.Security.Cryptography.CompositeMLDsa` APIs on Windows worked for any composite algorithm as long as its underlying components (ML-DSA, RSA, and ECDSA) were supported, including all the RSA-based composite algorithms. Algorithms that combine ML-DSA with EdDSA (Ed25519 or Ed448) always threw `System.PlatformNotSupportedException` on Windows, because Windows doesn't support EdDSA.

## New behavior

Starting in .NET 11, `System.Security.Cryptography.CompositeMLDsa` APIs on Windows only support the composite algorithms that Windows implements natively in CNG. Windows currently implements native support for exactly these four parameter sets, all of which pair ML-DSA with ECDSA:

| Windows parameter set          | Composite ML-DSA algorithm       | `CompositeMLDsaAlgorithm` member |
|---------------------------------|-----------------------------------|-----------------------------------|
| `44-ECDSA-P256-SHA256`          | Composite ML-DSA-44 and ECDSA P256 | `MLDsa44WithECDsaP256` |
| `65-ECDSA-P256-SHA512`          | Composite ML-DSA-65 and ECDSA P256 | `MLDsa65WithECDsaP256` |
| `65-ECDSA-P384-SHA512`          | Composite ML-DSA-65 and ECDSA P384 | `MLDsa65WithECDsaP384` |
| `87-ECDSA-P384-SHA512`          | Composite ML-DSA-87 and ECDSA P384 | `MLDsa87WithECDsaP384` |

All other composite algorithms now throw `System.PlatformNotSupportedException` on Windows. This includes every algorithm that pairs ML-DSA with RSA, which worked previously, and every algorithm that pairs ML-DSA with EdDSA (Ed25519 or Ed448), which already threw `System.PlatformNotSupportedException` before this change.

For more information, see the `cbParameterSet` field of the `BCRYPT_PQDSA_KEY_BLOB` structure.

## Type of breaking change

This change is a behavioral change.

## Reason for change

It's preferable to use the native implementation the operating system provides rather than a managed layer built on top of other primitives. Windows added native support for a subset of Composite ML-DSA parameter sets in recent Windows Insider Preview builds, and .NET now uses that native support when it's available.

## Recommended action

Before you use a specific Composite ML-DSA algorithm on Windows, call `System.Security.Cryptography.CompositeMLDsa.IsAlgorithmSupported*` to check whether the algorithm is supported. If an algorithm isn't supported, choose a supported algorithm or handle the resulting `System.PlatformNotSupportedException`.

```csharp
if (CompositeMLDsa.IsAlgorithmSupported(CompositeMLDsaAlgorithm.MLDsa65WithECDsaP384))
{
    using CompositeMLDsa mldsa = CompositeMLDsa.GenerateKey(CompositeMLDsaAlgorithm.MLDsa65WithECDsaP384);
    // Use mldsa.
}
else
{
    // Fall back to another algorithm, or handle the lack of support.
}
```

This change doesn't affect the Composite ML-DSA certificate APIs. Those APIs continue to throw `System.PlatformNotSupportedException` on Windows, as before.

## Affected APIs

- `System.Security.Cryptography.CompositeMLDsa`
