---
title: "Breaking change: HKDF on Windows uses CNG implementation"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/cryptography/11/hkdf-windows-cng.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# HKDF on Windows uses CNG implementation

Starting in .NET 11, `System.Security.Cryptography.HKDF` on Windows uses Windows' built-in Cryptography API: Next Generation (CNG) implementation. The Windows implementation restricts some input sizes more than the previous .NET implementation, so some inputs that worked in earlier .NET versions now throw `System.Security.Cryptography.CryptographicException`.

## Version introduced

.NET 11

## Previous behavior

Previously, on Windows, `System.Security.Cryptography.HKDF.DeriveKey*` and `System.Security.Cryptography.HKDF.Expand*` accepted inputs of arbitrary size as long as the inputs were permitted by the HKDF specification.

## New behavior

Starting in .NET 11, on Windows, `System.Security.Cryptography.HKDF.DeriveKey*` and `System.Security.Cryptography.HKDF.Expand*` limit the maximum input length for input keying material and pseudorandom keys. If the input keying material passed to `DeriveKey` or the pseudorandom key passed to `Expand` exceeds the limit, the method throws `System.Security.Cryptography.CryptographicException`.

Both limits are currently 2,048 bytes.

## Type of breaking change

This change is a behavioral change.

## Reason for change

On Windows, .NET 11 changed from a managed HKDF implementation to the implementation provided by Windows CNG. The .NET cryptography libraries prefer platform implementations for cryptographic algorithms.

## Recommended action

Typical uses of HKDF shouldn't reach these limits. If your application passes input keying material or pseudorandom keys larger than 2,048 bytes on Windows, consider smaller inputs.

## Affected APIs

- `System.Security.Cryptography.HKDF.DeriveKey*`
- `System.Security.Cryptography.HKDF.Expand*`
