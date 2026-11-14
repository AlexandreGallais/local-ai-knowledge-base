---
title: "Breaking change: .NET 11 obsoletions with custom IDs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/11/obsolete-apis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# API obsoletions with non-default diagnostic IDs (.NET 11)

Some APIs are marked as obsolete, starting in .NET 11.

This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is CS0618 for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 11 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID                                                           | Description | Severity |
|-------------------------------------------------------------------------|-------------|----------|
| SYSLIB0064 | `System.Security.Cryptography.RSACryptoServiceProvider.Encrypt(System.Byte[],System.Boolean)` and `System.Security.Cryptography.RSACryptoServiceProvider.Decrypt(System.Byte[],System.Boolean)` are obsolete. Use the overloads that accept an `System.Security.Cryptography.RSAEncryptionPadding` instead. | Warning |
| SYSLIB0066 | `Microsoft.Extensions.Options.IStartupValidator` is obsolete. Implement and register a custom `Microsoft.Extensions.Options.IAsyncStartupValidator` instead; don't register the same implementation under both startup-validator interfaces. | Warning |

## Version introduced

.NET 11

## Type of breaking change

These obsoletions can affect source compatibility.

## Recommended action

- Follow the specific guidance provided for each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.

## Affected APIs

### SYSLIB0064

- `System.Security.Cryptography.RSACryptoServiceProvider.Encrypt(System.Byte[],System.Boolean)`
- `System.Security.Cryptography.RSACryptoServiceProvider.Decrypt(System.Byte[],System.Boolean)`

### SYSLIB0066

- `Microsoft.Extensions.Options.IStartupValidator`

## See also

- Cryptography obsoletions (.NET 11)
- API obsoletions with non-default diagnostic IDs (.NET 10)
- API obsoletions with non-default diagnostic IDs (.NET 9)
- API obsoletions with non-default diagnostic IDs (.NET 8)
- Obsolete features in .NET 5+
