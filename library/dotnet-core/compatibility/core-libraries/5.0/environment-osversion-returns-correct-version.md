---
title: "Breaking change: Environment.OSVersion returns the correct operating system version"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/environment-osversion-returns-correct-version.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Environment.OSVersion returns the correct operating system version

`System.Environment.OSVersion` returns the actual version of the operating system (OS) instead of, for example, the OS that's selected for application compatibility.

## Change description

In previous .NET versions, `System.Environment.OSVersion` returns an OS version that may be incorrect when an application runs under Windows compatibility mode. For more information, see GetVersionExA function remarks. On macOS, `System.Environment.OSVersion` returns the underlying Darwin kernel version.

Starting in .NET 5, `System.Environment.OSVersion` returns the actual version of the operating system for Windows and macOS.

The following table shows the difference in behavior.

|  | Previous .NET versions | .NET 5+ |
|--|------------------------|---------|
| **Windows** | 6.2.9200.0 | 10.0.19042.0 |
| **macOS** | 19.6.0.0 | 10.15.7 |

## Reason for change

Users of this property expect it to return the actual version of the operating system. Most .NET apps don't specify their supported version in their application manifest, and thus get the default supported version from the dotnet host. As a result, the compatibility shim is rarely meaningful for the app that's running. When Windows releases a new version and an older dotnet host is still in use, these apps may get an incorrect OS version. Returning the actual version is more inline with developers' expectations of this API.

With the introduction of `System.OperatingSystem.IsWindowsVersionAtLeast*`, `System.OperatingSystem.IsMacOSVersionAtLeast*`, and `System.Runtime.Versioning.SupportedOSPlatformAttribute` in .NET 5, `System.Environment.OSVersion` was changed to be consistent for Windows and macOS.

## Version introduced

5.0

## Recommended action

Review and test any code that uses `System.Environment.OSVersion` to ensure it behaves as desired.

## Affected APIs

- `System.Environment.OSVersion`
