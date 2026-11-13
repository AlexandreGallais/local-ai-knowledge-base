---
title: ".NET environment variables (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-environment-variables.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET environment variables (part 3 of 3)

### Configure MSBuild in the .NET CLI

To execute MSBuild out-of-process, set the `DOTNET_CLI_RUN_MSBUILD_OUTOFPROC` environment variable to either `1`, `true`, or `yes`. By default, MSBuild will execute in-proc. To force MSBuild to use an external working node long-living process for building projects, set `DOTNET_CLI_USE_MSBUILDNOINPROCNODE` to `1`, `true`, or `yes`. This will set the `MSBUILDNOINPROCNODE` environment variable to `1`, which is referred to as _MSBuild Server V1_, as the entry process forwards most of the work to it.

#### `DOTNET_MSBUILD_SDK_RESOLVER_*`

These are overrides that are used to force the resolved SDK tasks and targets to come from a given base directory and report a given version to MSBuild, which may be `null` if unknown. One key use case for this is to test SDK tasks and targets without deploying them by using the .NET Core SDK.

- `DOTNET_MSBUILD_SDK_RESOLVER_SDKS_DIR`: Overrides the .NET SDK directory.
- `DOTNET_MSBUILD_SDK_RESOLVER_SDKS_VER`: Overrides the .NET SDK version.
- `DOTNET_MSBUILD_SDK_RESOLVER_CLI_DIR`: Overrides the _dotnet.exe_ directory path.

### `DOTNET_NEW_PREFERRED_LANG`

Configures the default programming language for the `dotnet new` command when the `-lang|--language` switch is omitted. The default value is `C#`. Valid values are `C#`, `F#`, or `VB`. For more information, see dotnet new.

### `dotnet watch` environment variables

For information about `dotnet watch` settings that are available as environment variables, see dotnet watch environment variables.

## See also

- dotnet command
- Runtime Configuration Files
- .NET runtime configuration settings
