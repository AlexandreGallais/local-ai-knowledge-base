---
title: "Breaking change: CreateEncryptor methods throw exception for incorrect feedback size"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/cryptography/6.0/cfb-mode-feedback-size-exception.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CreateEncryptor methods throw exception for incorrect feedback size

The `CreateEncryptor` and `CreateDecryptor` methods for `System.Security.Cryptography.AesCng` and `System.Security.Cryptography.TripleDESCng` now throw a `System.Security.Cryptography.CryptographicException` when the object instance is being used with a CNG persisted (or named) key for Cipher Feedback (CFB) mode, with a feedback size other than eight (CFB8).

## Previous behavior

Previously, these classes allowed CFB128 (`AesCng`) or CFB64 (`TripleDESCng`) to be selected. However, if the key was a persisted key, then the computation was always done as if CFB8 was selected.

## New behavior

The `CreateEncryptor` and `CreateDecryptor` methods throw a `System.Security.Cryptography.CryptographicException` when both of the following conditions are met:

- CFB128 or CFB64 mode is selected (that is, `System.Security.Cryptography.SymmetricAlgorithm.FeedbackSize` is set to 128 or 64).
- The instance is backed by a persisted key.

## Version introduced

.NET 6

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

This change was introduced to indicate that the requested work cannot be performed correctly.

## Recommended action

If you encounter this exception, consider switching from CFB128 or CFB64 to CFB8. Making that switch will produce results compatible with the behavior in previous releases.

## Affected APIs

- `System.Security.Cryptography.AesCng.CreateEncryptor`
- `System.Security.Cryptography.AesCng.CreateDecryptor`
- `System.Security.Cryptography.TripleDESCng.CreateEncryptor`
- `System.Security.Cryptography.TripleDESCng.CreateDecryptor`
