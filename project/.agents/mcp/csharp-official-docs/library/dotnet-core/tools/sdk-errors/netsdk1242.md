---
title: "NETSDK1242: Building projects with the Mono runtime is not supported in .NET 11.0 and later"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/sdk-errors/netsdk1242.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NETSDK1242: Building projects with the Mono runtime is not supported in .NET 11.0 and later

This error indicates that the project selects the Mono runtime (the `UseMonoRuntime` property is set to `true`) for a mobile target platform while targeting .NET 11.0 or later, where the Mono runtime is no longer supported for that platform. The full error message is similar to the following example:

> NETSDK1242: Building ios projects with the Mono runtime is not supported in .NET 11.0 and later. Use the CoreCLR runtime or target .NET 10.0.

The error applies to the `android`, `ios`, `maccatalyst`, and `tvos` target platforms.

## Resolve the error

Choose one of the following options:

- Build the project with the CoreCLR runtime. Remove the `UseMonoRuntime` property from the project, or set it to `false`.
- If the project requires the Mono runtime, target .NET 10. Change the target framework to a .NET 10 mobile target framework moniker, for example `net10.0-android` or `net10.0-ios`

## See also

- .NET SDK error and warning reference
