---
title: "Breaking change - CoseSigner.Key may now be null"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/10.0/cosesigner-key-null.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CoseSigner.Key can now be null

In .NET 10, the `System.Security.Cryptography.Cose.CoseSigner.Key` property can now return `null`. If `CoseSigner` is backed by an RSA or ECDSA key, then `CoseSigner.Key` returns a non-null key. However, when `CoseSigner` is backed by a key that doesn't derive from `System.Security.Cryptography.AsymmetricAlgorithm`, like `MLDsa` (a new Post-Quantum Cryptography (PQC) signing algorithm), `CoseSigner.Key` returns `null`.

## Version introduced

.NET 10

## Previous behavior

Previously, `CoseSigner.Key` couldn't be `null`. It had type `AsymmetricAlgorithm`.

## New behavior

Starting in .NET 10, `CoseSigner.Key` can be `null`. Its type is `AsymmetricAlgorithm?`.

```csharp
using RSA rsaKey = RSA.Create();

CoseSigner signer = new CoseSigner(rsaKey, RSASignaturePadding.Pss, HashAlgorithmName.SHA512);
// signer.Key is rsaKey here.

// CoseKey is a new abstraction for all keys used in COSE.
CoseKey <example-value> = new CoseKey(rsaKey, RSASignaturePadding.Pss, HashAlgorithmName.SHA512);
signer = new CoseSigner(coseKey);
// signer.Key is rsaKey here.

using MLDsa mldsa = MLDsa.GenerateKey(MLDsaAlgorithm.MLDsa44);

coseKey = new CoseKey(mldsa);
signer = new CoseSigner(coseKey);
// signer.Key is null here.
```

## Type of breaking change

This is a behavioral change but it can also affect source compatibility.

## Reason for change

With the introduction of new signing algorithms such as ML-DSA, .NET has moved away from using `AsymmetricAlgorithm` as the universal base class for all asymmetric algorithms. Likewise, `CoseSigner` can now be constructed with a key that doesn't derive from `AsymmetricAlgorithm`. In this case `CoseSigner.Key` can't return an `AsymmetricAlgorithm` representing the underlying key and thus returns `null` instead.

## Recommended action

It's still okay to use `CoseSigner.Key` but be sure to handle `null` values.

## Affected APIs

- `System.Security.Cryptography.Cose.CoseSigner.Key`
