---
title: "Breaking change: .NET 11 obsoletions in cryptography"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/11/obsolete-apis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Cryptography obsoletions (.NET 11)

Some cryptography APIs are marked as obsolete, starting in .NET 11.

For obsoletions in other core .NET library areas, see API obsoletions with non-default diagnostic IDs (.NET 11).

## Previous behavior

Previously, you could use these APIs without any compile-time warnings about obsoletion.

## New behavior

In .NET 11 and later versions, using these APIs produces a compile-time diagnostic.

The following table lists the custom diagnostic IDs and their corresponding warning messages.

| Diagnostic ID | Description | Severity |
|---------------|-------------|----------|
| SYSLIB0065 | The `set` accessor of `System.Security.Cryptography.AsnEncodedData.RawData` is obsolete. Use the constructor of the appropriate type to decode data, or use `System.Security.Cryptography.AsnEncodedData.CopyFrom(System.Security.Cryptography.AsnEncodedData)` for mutable scenarios. | Warning |

## Version introduced

.NET 11

## Type of breaking change

These obsoletions can affect source compatibility.

## Recommended action

If you must keep use the obsolete APIs, suppress the warning by using the custom diagnostic ID.

## Affected APIs

### SYSLIB0065

- `set` accessor of `System.Security.Cryptography.AsnEncodedData.RawData`

## See also

- SYSLIB0065: AsnEncodedData.RawData setter is obsolete
- API obsoletions with non-default diagnostic IDs (.NET 11)
