---
title: "Platform compatibility analyzer (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/analyzers/platform-compat-analyzer.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Platform compatibility analyzer

.NET is a single, unified platform for building any type of application. It strives to provide an experience where you don't have to reason about the different flavors of .NET, but doesn't attempt to fully abstract away the underlying operating system (OS). You can continue to call platform-specific APIs, for example, P/Invokes and WinRT.

But using platform-specific APIs on a component means the code no longer works across all platforms. The platform compatibility analyzer and complementary APIs provide diagnostics to help you identify and use platform-specific APIs where appropriate.

The complementary APIs include:

- `System.Runtime.Versioning.SupportedOSPlatformAttribute` to annotate APIs as being platform-specific and `System.Runtime.Versioning.UnsupportedOSPlatformAttribute` to annotate APIs as being unsupported on a particular OS. These attributes can optionally include the version number, and have already been applied to some platform-specific APIs in the core .NET libraries.
- `Is<Platform>()` and `Is<Platform>VersionAtLeast(int major, int minor = 0, int build = 0, int revision = 0)` static methods in the `System.OperatingSystem` class for safely calling platform-specific APIs. For example, `System.OperatingSystem.IsWindows` can be used to guard a call to a Windows-specific API, and `System.OperatingSystem.IsWindowsVersionAtLeast*`() can be used to guard a versioned Windows-specific API call. See these examples of how these methods can be used as guards of platform-specific API references.

## Prerequisites

The platform compatibility analyzer is one of the Roslyn code quality analyzers. These analyzers are included with the .NET SDK. The platform compatibility analyzer is enabled by default only for projects that target `net5.0` or a later version. However, you can enable it for projects that target other frameworks.

## How the analyzer determines platform dependency

- An **unattributed API** is considered to work on **all OS platforms**.
- An API marked with `[SupportedOSPlatform("platform")]` is considered only portable to the specified platform and any platforms it's a subset of.
  - The attribute can be applied multiple times to indicate **multiple platform support**, for example `[SupportedOSPlatform("windows"), SupportedOSPlatform("Android29.0")]`.
  - If the platform is a subset of another platform, the attribute implies that the superset platform is also supported. For example, `[SupportedOSPlatform("iOS")]` implies that the API is supported on `iOS` and also on its superset platform, `MacCatalyst`.
  - The analyzer will produce a **warning** if platform-specific APIs are referenced without a proper **platform context**:
    - **Warns** if the project doesn't target the supported platform (for example, a Windows-specific API called from a project targeting iOS `<TargetFramework>net5.0-ios14.0</TargetFramework>`).
    - **Warns** if the project is cross-platform and calls platform-specific APIs (for example, a Windows-specific API called from cross platform TFM `<TargetFramework>net5.0</TargetFramework>`).
    - **Doesn't warn** if the platform-specific API is referenced within a project that targets any of the **specified platforms** (for example, for a Windows-specific API called from a project targeting windows `<TargetFramework>net5.0-windows</TargetFramework>` and the *AssemblyInfo.cs* file generation is enabled for the project).
    - **Doesn't warn** if the platform-specific API call is guarded by corresponding platform-check methods (for example, a Windows-specific API call guarded by `OperatingSystem.IsWindows()`).
    - **Doesn't warn** if the platform-specific API is referenced from the same platform-specific context (**call site also attributed** with `[SupportedOSPlatform("platform")`).
- An API marked with `[UnsupportedOSPlatform("platform")]` is considered to be unsupported on the specified platform and any platforms it's a subset of, but supported for all other platforms.
  - The attribute can be applied multiple times with different platforms, for example, `[UnsupportedOSPlatform("iOS"), UnsupportedOSPlatform("Android29.0")]`.
  - If the platform is a subset of another platform, the attribute implies that the superset platform is also unsupported. For example, `[UnsupportedOSPlatform("iOS")]` implies that the API is unsupported on `iOS` and also on its superset platform, `MacCatalyst`.
  - The analyzer produces a **warning** only if the `platform` is effective for the call site:
    - **Warns** if the project targets the platform that's attributed as unsupported (for example, if the API is attributed with `[UnsupportedOSPlatform("windows")]` and the call site targets `<TargetFramework>net5.0-windows</TargetFramework>`).
    - **Warns** if the project is multi-targeted and the `platform` is included in the default MSBuild `<SupportedPlatform>` items group, or the `platform` is manually included within the `MSBuild` `<SupportedPlatform>` items group:

      ```xml
      <ItemGroup>
          <SupportedPlatform Include="platform" />
      </ItemGroup>
      ```

    - **Doesn't warn** if you're building an app that doesn't target the unsupported platform or is multi-targeted and the platform is not included in the default MSBuild `<SupportedPlatform>` items group.

- Both attributes can be instantiated with or without version numbers as part of the platform name. Version numbers are in the format of `major.minor[.build[.revision]]`; `major.minor` is required and the `build` and `revision` parts are optional. For example, "Windows6.1" indicates Windows version 6.1, but "Windows" is interpreted as Windows 0.0.

For more information, see examples of how the attributes work and what diagnostics they cause.
