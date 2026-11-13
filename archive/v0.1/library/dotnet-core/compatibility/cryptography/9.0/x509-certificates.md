---
title: "Some X509Certificate2 and X509Certificate constructors are obsolete"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/cryptography/9.0/x509-certificates.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Some X509Certificate2 and X509Certificate constructors are obsolete

The constructors on `System.Security.Cryptography.X509Certificates.X509Certificate` and `System.Security.Cryptography.X509Certificates.X509Certificate2` that accept content as a `byte[]`, `ReadOnlySpan<byte>`, or a `string` file path are obsolete, starting in .NET 9. The `System.Security.Cryptography.X509Certificates.X509Certificate2Collection.Import*` methods on X509Certificate2Collection are also obsolete. Calling them in code generates warning `SYSLIB0057` at compile time.

## Previous behavior

Developers could use the affected APIs without an obsolete warning.

## New behavior

Affected APIs will receive an obsolete compilation warning with ID SYSLIB0057.

## Version introduced

.NET 9 Preview 7

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The affected APIs supported loading certificates in multiple formats. For example, `new X509Certificate2(data)` loaded a certificate from a `byte[]` called `data`. `data` could be one of any supported format, including X.509, PKCS7, or PKCS12/PFX.

While this method was easy to use, it created issues where user-supplied data was passed with a different format than intended. This might allow loading PKCS12 where only X.509 content was intended to be loaded. Or it might create interoperability issues from handling the data in different ways.

## Recommended action

For workarounds, see Workaround.

## Affected APIs

For affected APIs, see SYSLIB0057.
