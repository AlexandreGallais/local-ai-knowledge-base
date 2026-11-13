---
title: "NETSDK1238: The current .NET SDK has known vulnerabilities"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1238.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1238: The current .NET SDK has known vulnerabilities

This warning indicates that the .NET SDK used to build your project has one or more known Common Vulnerabilities and Exposures (CVEs). The full warning message is similar to the following example:

> NETSDK1238: The current .NET SDK (\<version>) has known vulnerabilities (\<CVE list>). Update to version \<version>. See <https://dotnet.microsoft.com/download>

To resolve the warning, install a patched .NET SDK from <https://dotnet.microsoft.com/download> and update your `global.json` (if present) to select the new version.

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

By default, the .NET CLI refreshes a local cache of SDK release metadata in the background at most once every 24 hours under `~/.dotnet/sdk-vulnerability-cache/`. To change that interval, set `DOTNET_SDK_VULNERABILITY_CHECK_INTERVAL_HOURS`. The MSBuild check reads only that cache; it does not make network calls during the build. On machines that have never had network access, no warning is emitted.

## Suppress the warning

To suppress the warning without updating the SDK:

- Add `NETSDK1238` to `NoWarn`:

  ```xml
  <NoWarn>$(NoWarn);NETSDK1238</NoWarn>
  ```

- Set `CheckSdkVulnerabilities` to `false` (the default) to turn off NETSDK1238, NETSDK1239, and NETSDK1240.
- Set the `DOTNET_SDK_VULNERABILITY_CHECK_DISABLE` environment variable to `true` to disable both the cache refresh and the build-time check.

## See also

- NETSDK1239: The current .NET SDK is end of life
- NETSDK1240: The current .NET SDK feature band is discontinued
- .NET releases and support
