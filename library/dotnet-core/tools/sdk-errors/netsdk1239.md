---
title: "NETSDK1239: The current .NET SDK is end of life"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1239.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1239: The current .NET SDK is end of life

This warning indicates that the .NET SDK used to build your project is end of life (EOL) and no longer receives security updates. The full warning message is similar to the following example:

> NETSDK1239: The current .NET SDK (\<version>) is end of life as of \<date>. It will receive no further security updates: <https://dotnet.microsoft.com/download>

To resolve the warning, install a supported .NET SDK from <https://dotnet.microsoft.com/download> and update your `global.json` (if present) to select the new version. For the current support timeline, see .NET releases and support.

This warning is distinct from NETSDK1138, which is raised when your project's *target framework* is out of support. NETSDK1239 is raised when the *SDK that runs the build* is out of support, regardless of which framework you target.

> **Note:**
> This check is available in .NET 11 and later versions.

## How the check works

The check is opt-in and only runs when the MSBuild property `CheckSdkVulnerabilities` is set to `true`:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <CheckSdkVulnerabilities>true</CheckSdkVulnerabilities>
  </PropertyGroup>
</Project>
```

You can also pass `/p:CheckSdkVulnerabilities=true` to a .NET CLI command, such as `dotnet build`.

By default, the .NET CLI refreshes a local cache of SDK release metadata in the background at most once every 24 hours under `~/.dotnet/sdk-vulnerability-cache/`. Set `DOTNET_SDK_VULNERABILITY_CHECK_INTERVAL_HOURS` to change the refresh interval. The MSBuild check reads only that cache; it doesn't make network calls during the build.

## Suppress the warning

To suppress the warning without updating the SDK:

- Add `NETSDK1239` to `NoWarn`:

  ```xml
  <NoWarn>$(NoWarn);NETSDK1239</NoWarn>
  ```

- Set `CheckSdkVulnerabilities` to `false` (the default) to turn off NETSDK1238, NETSDK1239, and NETSDK1240.
- Set the `DOTNET_SDK_VULNERABILITY_CHECK_DISABLE` environment variable to `true`.

## See also

- NETSDK1238: The current .NET SDK has known vulnerabilities
- NETSDK1240: The current .NET SDK feature band is discontinued
- .NET releases and support
