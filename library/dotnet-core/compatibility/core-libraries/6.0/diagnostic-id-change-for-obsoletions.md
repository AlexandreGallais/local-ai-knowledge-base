---
title: ".NET 6 breaking change: New diagnostic IDs for obsoleted APIs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/6.0/diagnostic-id-change-for-obsoletions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# New diagnostic IDs for obsoleted APIs

Previously, a few APIs were obsoleted without using custom diagnostic IDs. Starting in .NET 6, those APIs report as obsolete using different, custom diagnostic IDs. If you suppressed warnings for usage of those APIs through CS0618, modify the suppressions to use the new diagnostic IDs, which are SYSLIB0003, SYSLIB0019, and SYSLIB0020.

## Change description

The following table shows the old and new diagnostic IDs for the listed obsolete API.

| API | Previous diagnostic ID | New diagnostic ID |
| --- | ---------------------- | ----------------- |
| `System.Threading.Thread.GetCompressedStack` | CS0618 | SYSLIB0003 |
| `System.Threading.Thread.SetCompressedStack(System.Threading.CompressedStack)` | CS0618 | SYSLIB0003 |
| `System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile` | CS0618 | SYSLIB0019 |
| `System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid,System.Guid)` | CS0618 | SYSLIB0019 |
| `System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid,System.Guid)` | CS0618 | SYSLIB0019 |
| `System.Text.Json.JsonSerializerOptions.IgnoreNullValues` | CS0618 | SYSLIB0020 |

## Version introduced

.NET 6

## Reason for change

Starting in .NET 5, obsoletions are intended to use custom diagnostic ID values to allow fine-grained suppression of the warnings. This yields a better experience when the obsolete APIs need to remain referenced. The obsoletions affected here should have had custom diagnostic ID values applied when the APIs were originally marked as `[Obsolete]`.

## Recommended action

If the SYSLIB0003, SYSLIB0019, or SYSLIB0020 diagnostic IDs are produced from your build, review the usage of the affected APIs. If possible, avoid using those APIs and refer to the messages and documentation for alternatives. If you need to retain the references to the obsolete APIs and suppress the diagnostics, suppress the warnings using the new diagnostic IDs instead of CS0618.

## Affected APIs

- `System.Threading.Thread.GetCompressedStack`
- `System.Threading.Thread.SetCompressedStack(System.Threading.CompressedStack)`
- `System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile`
- `System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid,System.Guid)`
- `System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid,System.Guid)`
- `System.Text.Json.JsonSerializerOptions.IgnoreNullValues`

## See also

- SYSLIB0003: Code access security is not supported
- SYSLIB0019: Some RuntimeEnvironment APIs are obsolete
- SYSLIB0020: IgnoreNullValues is obsolete
- CS0618
