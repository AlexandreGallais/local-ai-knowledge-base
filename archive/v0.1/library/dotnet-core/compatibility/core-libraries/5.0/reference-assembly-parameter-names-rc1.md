---
title: "Breaking change: Parameter names changed in RC2"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/reference-assembly-parameter-names-rc1.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Parameter names changed in RC2

Some reference assembly parameter names have changed to match parameter names in the implementation assemblies.

## Change description

In previous .NET 5 preview and RC versions, some reference assembly parameter names are different to their corresponding parameters in the implementation assembly. This can cause problems while using named arguments and reflection.

In .NET 5 RC2, these mismatched parameter names were updated in the reference assemblies to exactly match the corresponding parameter names in the implementation assemblies.

The following table shows the APIs and parameter names that changed.

| API | Old parameter name | New parameter name |
| - | - | - |
| `System.Diagnostics.ActivityContext.#ctor(System.Diagnostics.ActivityTraceId,System.Diagnostics.ActivitySpanId,System.Diagnostics.ActivityTraceFlags,System.String,System.Boolean)` | `traceOptions` | `traceFlags` |
| `System.Globalization.CompareInfo.IsPrefix(System.ReadOnlySpan{System.Char},System.ReadOnlySpan{System.Char},System.Globalization.CompareOptions,System.Int32@)` | `suffix` | `prefix` |

## Reason for change

The parameter names were changed for consistency and to avoid failures when using named arguments and reflection.

## Version introduced

5.0 RC2

## Recommended action

If you encounter a compiler error due to a parameter name change, update the parameter name accordingly.

## Affected APIs

- `System.Diagnostics.ActivityContext.#ctor(System.Diagnostics.ActivityTraceId,System.Diagnostics.ActivitySpanId,System.Diagnostics.ActivityTraceFlags,System.String,System.Boolean)`
- `System.Globalization.CompareInfo.IsPrefix(System.ReadOnlySpan{System.Char},System.ReadOnlySpan{System.Char},System.Globalization.CompareOptions,System.Int32@)`
