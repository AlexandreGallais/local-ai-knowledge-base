---
title: "Breaking change - UnwindNativeCode isn't supported on Apple targets"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/maui/11/unwind-native-code-apple.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# UnwindNativeCode isn't supported on Apple targets

In .NET 11, UnwindNativeCode isn't supported on Apple targets.

## Version introduced

.NET 11

## Previous behavior

Apple projects that used Mono could set
`MarshalManagedExceptionMode=UnwindNativeCode`.

## New behavior

CoreCLR doesn't support `MarshalManagedExceptionMode=UnwindNativeCode`. The
Apple workload reports error 0185.

## Type of breaking change

This change affects source compatibility and is a behavioral change.

## Reason for change

CoreCLR doesn't support unwinding managed exceptions through native stack
frames in this mode.

## Recommended action

- Remove `MarshalManagedExceptionMode=UnwindNativeCode`.
- Catch managed exceptions before they cross native code.
- Return a status value, create an Objective-C exception, or use a supported
  abort policy.

## Affected APIs

None. This change affects the `MarshalManagedExceptionMode` MSBuild property.
