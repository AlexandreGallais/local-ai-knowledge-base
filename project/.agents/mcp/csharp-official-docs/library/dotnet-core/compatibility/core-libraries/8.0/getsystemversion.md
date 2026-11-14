---
title: ".NET 8 breaking change: GetSystemVersion no longer returns ImageRuntimeVersion"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/8.0/getsystemversion.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# GetSystemVersion no longer returns ImageRuntimeVersion

`System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion` no longer returns `System.Reflection.Assembly.ImageRuntimeVersion`, which is a .NET Framework-oriented value. It's been updated to return a more relevant value, however, the historical leading `v` has been maintained.

## Previous behavior

`System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion` returned `System.Reflection.Assembly.ImageRuntimeVersion`, which is an indicator of .NET Framework in-place replacement, not a product release.

Example: `v4.0.30319`

## New behavior

Starting in .NET 8, `System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion` returns `"v"` concatenated with `System.Environment.Version`, which is the version of the CLR.

Example: `v8.0.0`

## Version introduced

.NET 8 RC 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

The existing version wasn't useful or meaningful for .NET.

## Recommended action

Update your code to expect the new version, or use `typeof(object).Assembly.ImageRuntimeVersion` instead.

## Affected APIs

- `System.Runtime.InteropServices.RuntimeEnvironment.GetSystemVersion`

## See also

The following changes are related:

- Improved .NET Core version APIs
- FrameworkDescription's value is .NET instead of .NET Core
