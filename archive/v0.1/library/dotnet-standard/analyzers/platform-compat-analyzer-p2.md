---
title: "Platform compatibility analyzer (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/analyzers/platform-compat-analyzer.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Platform compatibility analyzer (part 2 of 3)

## How the analyzer recognizes TFM target platforms

The analyzer does not check target framework moniker (TFM) target platforms from MSBuild properties, such as `<TargetFramework>` or `<TargetFrameworks>`. If the TFM has a target platform, MSBuild injects a `SupportedOSPlatform` attribute with the targeted platform name in the *AssemblyInfo.cs* file, which is consumed by the analyzer. For example, if the TFM is `net5.0-windows10.0.19041`, MSBuild injects the `[assembly: System.Runtime.Versioning.SupportedOSPlatform("windows10.0.19041")]` attribute into the *AssemblyInfo.cs* file, and the entire assembly is considered to be Windows only. Therefore, calling Windows-only APIs versioned with 7.0 or below  would not cause any warnings in the project.

  > **Note:**
  > If the *AssemblyInfo.cs* file generation is disabled for the project (that is, the `<GenerateAssemblyInfo>` property is set to `false`), the required assembly level `SupportedOSPlatform` attribute can't be added by MSBuild. In this case, you could see warnings for a platform-specific APIs usage even if you're targeting that platform. To resolve the warnings, enable the *AssemblyInfo.cs* file generation or add the attribute manually in your project.

### Platform inclusion

.NET 6 introduced the concept of *platform inclusion*, where one platform can be a subset of another platform. An annotation for the subset platform implies the same support (or lack thereof) for the superset platform. If a platform check method in the `System.OperatingSystem` type has a `SupportedOSPlatformGuard("supersetPlatform")]` attribute, then `supersetPlatform` is considered a superset of the OS platform that the method checks for.

For example, the `System.OperatingSystem.IsIOS` method is attributed `[SupportedOSPlatformGuard("MacCatalyst")]`. Therefore, the following statements apply:

- The `System.OperatingSystem.IsIOS` and `System.OperatingSystem.IsIOSVersionAtLeast*` methods check not only the `iOS` platform, but also the `MacCatalyst` platform.
- `[SupportedOSPlatform("iOS")]` implies that the API is supported on `iOS` and also on its superset platform, `MacCatalyst`. You can use the `[UnsupportedOSPlatform("MacCatalyst")]` attribute to exclude this implied support.
- `[UnsupportedOSPlatform("iOS")` implies that the API is not supported on `iOS` and `MacCatalyst`. You can use the `[SupportedOSPlatform("MacCatalyst")]` attribute to exclude this implied lack of support.

Consider the following coverage matrix, where ✔️ indicates that the platform is supported, and ❌ indicates that the platform is *not* supported.

| Platform | `SupportedOSPlatform(subset)` | `SupportedOSPlatform(superset)` | `UnsupportedOSPlatform(subset)` | `UnsupportedOSPlatform(superset)` |
| - | - | - | - | - |
| **Subset** | ✔️ | ❌ | ✔️ | ❌ |
| **Superset** | ✔️ | ✔️ | ✔️ | ✔️ |

> **Tip:**
> The same rules apply for the `SupportedOSPlatformGuard` and `UnsupportedOSPlatformGuard` attributes.

The following code snippet shows how you can combine attributes to set the right level of support.

```csharp
  // MacCatalyst is a superset of iOS therefore supported on iOS and MacCatalyst
  [SupportedOSPlatform("iOS")]
  public void ApiOnlySupportedOnIOSAndMacCatalyst() { }

  // Does not imply iOS, only supported on MacCatalyst
  [SupportedOSPlatform("MacCatalyst")]
  public void ApiOnlySupportedOnMacCatalyst() { }

  [SupportedOSPlatform("iOS")] // Supported on iOS and MacCatalyst
  [UnsupportedOSPlatform("MacCatalyst")] // Removes implied MacCatalyst support
  public void ApiOnlySupportedOnIos() { }

  // Unsupported on iOS and MacCatalyst
  [UnsupportedOSPlatform("iOS")]
  public void ApiUnsupportedOnIOSAndMacCatalyst();

  // Does not imply iOS, only unsupported on MacCatalyst
  [UnsupportedOSPlatform("MacCatalyst")]
  public void ApiUnsupportedOnMacCatalyst() { }

  [UnsupportedOSPlatform("iOS")] // Unsupported on iOS and MacCatalyst
  [SupportedOSPlatform("MacCatalyst")] // Removes implied MacCatalyst unsupportedness
  public void ApiUnsupportedOnIos() { }
```

### Advanced scenarios for attribute combinations

- If a combination of `[SupportedOSPlatform]` and `[UnsupportedOSPlatform]` attributes are present, all attributes are grouped by OS platform identifier:
  - **Supported only list**. If the lowest version for each OS platform is a `[SupportedOSPlatform]` attribute, the API is considered to only be supported by the listed platforms and unsupported by all other platforms. The optional `[UnsupportedOSPlatform]` attributes for each platform can only have higher version of the minimum supported version, which denotes that the API is removed starting from the specified version.

    ```csharp
    // API is only supported on Windows from version 6.2 to 10.0.19041.0 and all versions of Linux
    // The API is considered not supported for all other platforms.
    [SupportedOSPlatform("windows6.2")]
    [UnsupportedOSPlatform("windows10.0.19041.0")]
    [SupportedOSPlatform("linux")]
    public void ApiSupportedFromWindows80SupportFromCertainVersion();
    ```

  - **Unsupported only list**. If the lowest version for each OS platform is an `[UnsupportedOSPlatform]` attribute, then the API is considered to only be unsupported by the listed platforms and supported by all other platforms. The list could have `[SupportedOSPlatform]` attribute with the same platform but a higher version, which denotes that the API is supported starting from that version.

    ```csharp
    // The API is unsupported on all Linux versions was unsupported on Windows until version 10.0.19041.0.
    // The API is considered supported everywhere else without constraints.
    [UnsupportedOSPlatform("windows")]
    [SupportedOSPlatform("windows10.0.19041.0")]
    [UnsupportedOSPlatform("linux")]
    public void ApiSupportedFromWindows8UnsupportedFromWindows10();
    ```

  - **Inconsistent list**. If the lowest version for some platforms is `[SupportedOSPlatform]` while it is `[UnsupportedOSPlatform]` for other platforms, it's considered to be inconsistent, which is not supported for the analyzer. If inconsistency occurs, the analyzer ignores the `[UnsupportedOSPlatform]` platforms.
    - If the lowest versions of `[SupportedOSPlatform]` and `[UnsupportedOSPlatform]` attributes are equal, the analyzer considers the platform as part of the **Supported only list**.
- Platform attributes can be applied to types, members (methods, fields, properties, and events) and assemblies with different platform names or versions.
  - Attributes applied at the top level `target` affect all of its members and types.
  - Child-level attributes only apply if they adhere to the rule "child annotations can narrow the platforms support, but they cannot widen it".
    - When parent has **Supported only** list, then child member attributes cannot add a new platform support, as that would be extending parent support. Support for a new platform can only be added to the parent itself. But the child can have the `Supported` attribute for the same platform with later versions as that narrows the support. Also, the child can have the `Unsupported` attribute with the same platform as that also narrows parent support.
    - When parent has **Unsupported only** list, then child member attributes can add support for a new platform, as that narrows parent support. But it cannot have the `Supported` attribute for the same platform as the parent, because that extends parent support. Support for the same platform can only be added to the parent where the original `Unsupported` attribute was applied.
  - If `[SupportedOSPlatform("platformVersion")]` is applied more than once for an API with the same `platform` name, the analyzer only considers the one with the minimum version.
  - If `[UnsupportedOSPlatform("platformVersion")]` is applied more than twice for an API with the same `platform` name, the analyzer only considers the two with the earliest versions.

  > **Note:**
  > An API that was supported initially but unsupported (removed) in a later version is not expected to get re-supported in an even later version.

### Examples of how the attributes work and what diagnostics they produce

  ```csharp
  // An API supported only on Windows all versions.
  [SupportedOSPlatform("Windows")]
  public void WindowsOnlyApi() { }

  // an API supported on Windows and Linux.
  [SupportedOSPlatform("Windows")]
  [SupportedOSPlatform("Linux")]
  public void SupportedOnWindowsAndLinuxOnly() { }

  // an API only supported on Windows 6.2 and later, not supported for all other.
  // an API is removed/unsupported from version 10.0.19041.0.
  [SupportedOSPlatform("windows6.2")]
  [UnsupportedOSPlatform("windows10.0.19041.0")]
  public void ApiSupportedFromWindows8UnsupportedFromWindows10() { }

  // an Assembly supported on Windows, the API added from version 10.0.19041.0.
  [assembly: SupportedOSPlatform("Windows")]
  [SupportedOSPlatform("windows10.0.19041.0")]
  public void AssemblySupportedOnWindowsApiSupportedFromWindows10() { }

  public void Caller()
  {
      WindowsOnlyApi(); // warns: This call site is reachable on all platforms. 'WindowsOnlyApi()' is only supported on: 'windows'

      // This call site is reachable on all platforms. 'SupportedOnWindowsAndLinuxOnly()' is only supported on: 'Windows', 'Linux'
      SupportedOnWindowsAndLinuxOnly();

      // This call site is reachable on all platforms. 'ApiSupportedFromWindows8UnsupportedFromWindows10()' is only supported on: 'windows' from version 6.2 to 10.0.19041.0
      ApiSupportedFromWindows8UnsupportedFromWindows10();

      // for same platform analyzer only warn for the latest version.
      // This call site is reachable on all platforms. 'AssemblySupportedOnWindowsApiSupportedFromWindows10()' is only supported on: 'windows' 10.0.19041.0 and later
      AssemblySupportedOnWindowsApiSupportedFromWindows10();
  }

  // an API not supported on android but supported on all other.
  [UnsupportedOSPlatform("android")]
  public void DoesNotWorkOnAndroid() { }

  // an API was unsupported on Windows until version 6.2.
  // The API is considered supported everywhere else without constraints.
  [UnsupportedOSPlatform("windows")]
  [SupportedOSPlatform("windows6.2")]
  public void StartedWindowsSupportFromVersion8() { }

  // an API was unsupported on Windows until version 6.2.
  // Then the API is removed (unsupported) from version 10.0.19041.0.
  // The API is considered supported everywhere else without constraints.
  [UnsupportedOSPlatform("windows")]
  [SupportedOSPlatform("windows6.2")]
  [UnsupportedOSPlatform("windows10.0.19041.0")]
  public void StartedWindowsSupportFrom8UnsupportedFrom10() { }

  public void Caller2()
  {
      DoesNotWorkOnAndroid(); // This call site is reachable on all platforms.'DoesNotWorkOnAndroid()' is unsupported on: 'android'

      // This call site is reachable on all platforms. 'StartedWindowsSupportFromVersion8()' is unsupported on: 'windows' 6.2 and before.
      StartedWindowsSupportFromVersion8();

      // This call site is reachable on all platforms. 'StartedWindowsSupportFrom8UnsupportedFrom10()' is supported on: 'windows' from version 6.2 to 10.0.19041.0
      StartedWindowsSupportFrom8UnsupportedFrom10();
  }
  ```
