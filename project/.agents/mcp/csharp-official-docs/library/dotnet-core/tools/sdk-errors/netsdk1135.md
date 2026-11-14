---
title: "NETSDK1135: SupportedOSPlatformVersion can't be higher than TargetPlatformVersion"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/sdk-errors/netsdk1135.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NETSDK1135: SupportedOSPlatformVersion can't be higher than TargetPlatformVersion

The value that your project file specifies for `SupportedOSPlatformVersion` is too high. The full error message is similar to the following example:

> SupportedOSPlatformVersion `<Version>` cannot be higher than `TargetPlatformVersion` `<Version>`.

Check your project files for `SupportedOSPlatformVersion`. `TargetPlatformVersion` (TPV) is inferred from the `TargetFramework` value. For example, `net6.0-windows10.0.19041` will set the TPV to be `10.0.19041`. .NET uses `TargetPlatformVersion` to determine which APIs are available at compile time.
