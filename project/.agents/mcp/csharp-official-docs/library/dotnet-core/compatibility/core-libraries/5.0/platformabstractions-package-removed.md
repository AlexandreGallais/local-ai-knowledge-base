---
title: "Breaking change: Microsoft.DotNet.PlatformAbstractions package removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/5.0/platformabstractions-package-removed.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Microsoft.DotNet.PlatformAbstractions package removed

No new versions of the Microsoft.DotNet.PlatformAbstractions NuGet package will be produced.

## Change description

Previously, new versions of the `Microsoft.DotNet.PlatformAbstractions` library were produced alongside new versions of .NET Core. Going forward, no new functionality will be added to the library, and no new major versions will be released. However, existing versions of the library will continue to work and be serviced.

The `Microsoft.DotNet.PlatformAbstractions` library overlaps with APIs that are already established in the System.\* namespaces. Also, some `Microsoft.DotNet.PlatformAbstractions` APIs weren't designed with the same level of scrutiny and long-term supportability as the rest of the System.\* APIs. For example, `Microsoft.DotNet.PlatformAbstractions` uses the `Platform` enumeration to describe the current operating system platform. This enumeration design was explicitly rejected when the `System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform)` API was designed, to allow for new platforms and future flexibility.

The scenarios enabled by the `Microsoft.DotNet.PlatformAbstractions` library are now possible without it. Existing versions will continue to work, even in .NET 5 and later, and will be serviced along with previous versions of .NET Core. However, new functionality won't be added to the library. Instead, new functionality will be added to other libraries and APIs.

## Version introduced

5.0

## Recommended action

- You can continue to use older versions of the library if they meet your requirements.

- If the older versions don't meet your requirements, replace usages of the `PlatformAbstractions` APIs with the recommended replacements.

  | `PlatformAbstractions` API | Recommended replacement |
  |-|-|
  | `ApplicationEnvironment.ApplicationBasePath` | `System.AppContext.BaseDirectory` |
  | `Microsoft.DotNet.PlatformAbstractions.HashCodeCombiner` | `System.HashCode` |
  | `RuntimeEnvironment.GetRuntimeIdentifier()` | `System.Runtime.InteropServices.RuntimeInformation.RuntimeIdentifier` |
  | `RuntimeEnvironment.OperatingSystemPlatform` | `System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform)` |
  | `RuntimeEnvironment.RuntimeArchitecture` | `System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture` |
  | `RuntimeEnvironment.OperatingSystem` | `System.Runtime.InteropServices.RuntimeInformation.OSDescription` |
  | `RuntimeEnvironment.OperatingSystemVersion` | `System.Runtime.InteropServices.RuntimeInformation.OSDescription` and `System.Environment.OSVersion` |

  > **Note:**
  > Most use cases for `RuntimeEnvironment.OperatingSystem` and `RuntimeEnvironment.OperatingSystemVersion` are for display purposes, for example, displaying to a user, logging, and telemetry. It's not recommended to make runtime decisions based on an operating system (OS) version. `System.Environment.OSVersion` now returns the correct version for Windows and macOS operating systems. However, for most Unix distributions, what is considered to be the "OS version" is not as straightforward. For example, it could be the Linux kernel version, or it could be the distro version. For most Unix platforms, `System.Environment.OSVersion` and `System.Runtime.InteropServices.RuntimeInformation.OSDescription` return the version that's returned by `uname`. To get the Linux distro name and version information, the recommended approach is to read the */etc/os-release* file.

## Affected APIs

- `Microsoft.DotNet.PlatformAbstractions.ApplicationEnvironment.ApplicationBasePath`
- `Microsoft.DotNet.PlatformAbstractions.HashCodeCombiner`
- `Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.GetRuntimeIdentifier()`
- `Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.OperatingSystem`
- `Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.OperatingSystemPlatform`
- `Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.OperatingSystemVersion`
- `Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.RuntimeArchitecture`
