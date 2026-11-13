---
title: "RSA.EncryptValue and RSA.DecryptValue are obsolete"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/cryptography/8.0/rsa-encrypt-decrypt-value-obsolete.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# RSA.EncryptValue and RSA.DecryptValue are obsolete

The following methods are obsolete in .NET 8 (and later versions):

- `System.Security.Cryptography.RSA.EncryptValue(System.Byte[])`
- `System.Security.Cryptography.RSA.DecryptValue(System.Byte[])`
- `System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte[])`
- `System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte[])`

All references to these methods will result in a SYSLIB0048 warning at compile time.

## Previous behavior

Previously, code could call the affected methods without any compilation warnings. However, they threw a `System.NotSupportedException` at runtime.

## New behavior

Starting in .NET 8, calling the affected methods produces a `SYSLIB0048` compilation warning.

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The affected methods were never implemented and always threw a `System.NotSupportedException`. Since the purpose of these methods is unclear and they shouldn't be called, they were marked as obsolete.

## Recommended action

To encrypt or decrypt with RSA, use `System.Security.Cryptography.RSA.Encrypt*` or `System.Security.Cryptography.RSA.Decrypt*` instead.

## Affected APIs

- `System.Security.Cryptography.RSA.EncryptValue(System.Byte[])`
- `System.Security.Cryptography.RSA.DecryptValue(System.Byte[])`
- `System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte[])`
- `System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte[])`
