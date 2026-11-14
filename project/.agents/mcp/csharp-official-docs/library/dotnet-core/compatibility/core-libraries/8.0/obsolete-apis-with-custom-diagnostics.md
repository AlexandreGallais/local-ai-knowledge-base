---
title: "Breaking change: .NET 8 obsoletions with custom IDs (part 1 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/8.0/obsolete-apis-with-custom-diagnostics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# API obsoletions with non-default diagnostic IDs (.NET 8)

Some APIs have been marked as obsolete, starting in .NET 8. This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is CS0618 for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 8 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID | Description | Severity |
| - | - | - |
| SYSLIB0011 | BinaryFormatter serialization is obsolete | Warning/error |
| SYSLIB0048 | `System.Security.Cryptography.RSA.EncryptValue(System.Byte[])` and `System.Security.Cryptography.RSA.DecryptValue(System.Byte[])` are obsolete. Use `System.Security.Cryptography.RSA.Encrypt*` and `System.Security.Cryptography.RSA.Decrypt*` instead. | Warning |
| SYSLIB0049 | JsonSerializerOptions.AddContext is obsolete. To register a JsonSerializerContext, use either the TypeInfoResolver or TypeInfoResolverChain property. | Warning |
| SYSLIB0050 | Formatter-based serialization is obsolete and should not be used. | Warning |
| SYSLIB0051 | APIs that support obsolete formatter-based serialization are obsolete. They should not be called or extended by application code. | Warning |
| SYSLIB0052 | APIs that support obsolete mechanisms for Regex extensibility are obsolete. | Warning |
| SYSLIB0053 | `System.Security.Cryptography.AesGcm` should indicate the required tag size for encryption and decryption. Use a constructor that accepts the tag size. | Warning |

## Version introduced

.NET 8

## Type of breaking change

These obsoletions can affect source compatibility.

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.
