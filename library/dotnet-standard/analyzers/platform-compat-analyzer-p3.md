---
title: "Platform compatibility analyzer (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/analyzers/platform-compat-analyzer.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Platform compatibility analyzer (part 3 of 3)

## Handle reported warnings

The recommended way to deal with these diagnostics is to make sure you only call platform-specific APIs when running on an appropriate platform. Following are the options you can use to address the warnings; choose whichever is most appropriate for your situation:

- **Guard the call**. You can achieve this by conditionally calling the code at runtime. Check whether you're running on a desired `Platform` by using one of platform-check methods, for example, `OperatingSystem.Is<Platform>()` or `OperatingSystem.Is<Platform>VersionAtLeast(int major, int minor = 0, int build = 0, int revision = 0)`. Example.

- **Mark the call site as platform-specific**. You can also choose to mark your own APIs as being platform-specific, thus effectively just forwarding the requirements to your callers. Mark the containing method or type or the entire assembly with the same attributes as the referenced platform-dependent call. Examples.

- **Assert the call site with platform check**. If you don't want the overhead of an additional `if` statement at runtime, use `System.Diagnostics.Debug.Assert(System.Boolean)`. Example.

- **Delete the code**. Generally not what you want because it means you lose fidelity when your code is used by Windows users. For cases where a cross-platform alternative exists, you're likely better off using that over platform-specific APIs.

- **Suppress the warning**. You can also simply suppress the warning, either via an EditorConfig entry or `#pragma warning disable CA1416`. However, this option should be a last resort when using platform-specific APIs.

  > **Tip:**
  > When disabling warnings using the `#pragma` pre-compiler directives, the identifiers you're targeting are case sensitive. For example, `ca1416` would not actually disable warning CA1416.

### Guard platform-specific APIs with guard methods

The guard method's platform name should match with the calling platform-dependent API platform name. If the platform string of the calling API includes the version:

- For the `[SupportedOSPlatform("platformVersion")]` attribute, the guard method platform `version` should be greater than or equal to the calling platform's `Version`.
- For the `[UnsupportedOSPlatform("platformVersion")]` attribute, the guard method's platform `version` should be less than or equal to the calling platform's `Version`.

  ```csharp
  public void CallingSupportedOnlyApis() // Allow list calls
  {
      if (OperatingSystem.IsWindows())
      {
          WindowsOnlyApi(); // will not warn
      }

      if (OperatingSystem.IsLinux())
      {
          SupportedOnWindowsAndLinuxOnly(); // will not warn, within one of the supported context
      }

      // Can use &&, || logical operators to guard combined attributes
      if (OperatingSystem.IsWindowsVersionAtLeast(6, 2) && !OperatingSystem.IsWindowsVersionAtLeast(10, 0, 19041)))
      {
          ApiSupportedFromWindows8UnsupportedFromWindows10();
      }

      if (OperatingSystem.IsWindowsVersionAtLeast(10, 0, 19041, 0))
      {
          AssemblySupportedOnWindowsApiSupportedFromWindows10(); // Only need to check latest supported version
      }
  }

  public void CallingUnsupportedApis()
  {
      if (!OperatingSystem.IsAndroid())
      {
          DoesNotWorkOnAndroid(); // will not warn
      }

      if (!OperatingSystem.IsWindows() || OperatingSystem.IsWindowsVersionAtLeast(6, 2))
      {
          StartedWindowsSupportFromVersion8(); // will not warn
      }

      if (!OperatingSystem.IsWindows() || // supported all other platforms
         (OperatingSystem.IsWindowsVersionAtLeast(6, 2) && !OperatingSystem.IsWindowsVersionAtLeast(10, 0, 19041)))
      {
          StartedWindowsSupportFrom8UnsupportedFrom10(); // will not warn
      }
  }
  ```

- If you need to guard code that targets `netstandard` or `netcoreapp` where new `System.OperatingSystem` APIs are not available, the `System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform*` API can be used and will be respected by the analyzer. But it's not as optimized as the new APIs added in `System.OperatingSystem`. If the platform is not supported in the `System.Runtime.InteropServices.OSPlatform` struct, you can call `System.Runtime.InteropServices.OSPlatform.Create(System.String)` and pass in the platform name, which the analyzer also respects.

  ```csharp
  public void CallingSupportedOnlyApis()
  {
      if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
      {
          SupportedOnWindowsAndLinuxOnly(); // will not warn
      }

      if (RuntimeInformation.IsOSPlatform(OSPlatform.Create("browser")))
      {
          ApiOnlySupportedOnBrowser(); // call of browser specific API
      }
  }
  ```

#### Annotate APIs with platform guard attributes and use it as a custom guard

As shown previously, the analyzer recognizes the platform-guard static methods in the `System.OperatingSystem` type, such as `OperatingSystem.IsWindows`, and also `System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform*`. However, you might want to cache the guard result in a field and reuse it, or use custom guard methods for checking a platform. The analyzer needs to recognize such APIs as a custom guard and should not warn for the APIs guarded by them. The guard attributes were introduced in .NET 6 to support this scenario:

- `SupportedOSPlatformGuardAttribute` annotates APIs that can be used as a guard for APIs annotated with `System.Runtime.Versioning.SupportedOSPlatformAttribute`.
- `UnsupportedOSPlatformGuardAttribute` annotates APIs that can be used as a guard for APIs annotated with `System.Runtime.Versioning.UnsupportedOSPlatformAttribute`.

These attributes can optionally include a version number. They can be applied multiple times to guard more than one platform and can be used for annotating a field, property, or method.

```cs
class Test
{
    [UnsupportedOSPlatformGuard("browser")] // The platform guard attribute
#if TARGET_BROWSER
    internal bool IsSupported => false;
#else
    internal bool IsSupported => true;
#endif

    [UnsupportedOSPlatform("browser")]
    void ApiNotSupportedOnBrowser() { }

    void M1()
    {
        ApiNotSupportedOnBrowser();  // Warns: This call site is reachable on all platforms.'ApiNotSupportedOnBrowser()' is unsupported on: 'browser'

        if (IsSupported)
        {
            ApiNotSupportedOnBrowser();  // Not warn
        }
    }

    [SupportedOSPlatform("Windows")]
    [SupportedOSPlatform("Linux")]
    void ApiOnlyWorkOnWindowsLinux() { }

    [SupportedOSPlatformGuard("Linux")]
    [SupportedOSPlatformGuard("Windows")]
    private readonly bool _isWindowOrLinux = OperatingSystem.IsLinux() || OperatingSystem.IsWindows();

    void M2()
    {
        ApiOnlyWorkOnWindowsLinux();  // This call site is reachable on all platforms.'ApiOnlyWorkOnWindowsLinux()' is only supported on: 'Linux', 'Windows'.

        if (_isWindowOrLinux)
        {
            ApiOnlyWorkOnWindowsLinux();  // Not warn
        }
    }
}
```

### Mark call site as platform-specific

Platform names should match the calling platform-dependent API. If the platform string includes a version:

- For the `[SupportedOSPlatform("platformVersion")]` attribute, the call site platform `version` should be greater than or equal to the calling platform's `Version`
- For the `[UnsupportedOSPlatform("platformVersion")]` attribute, the call site platform `version` should be less than or equal to the calling platform's `Version`

  ```csharp
  // an API supported only on Windows.
  [SupportedOSPlatform("windows")]
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

  [SupportedOSPlatform("windows6.2")] // call site attributed Windows 6.2 or above.
  public void Caller()
  {
      WindowsOnlyApi(); // will not warn as call site is for Windows.

      // will not warn as call site is for Windows all versions.
      SupportedOnWindowsAndLinuxOnly();

      // will not warn for the [SupportedOSPlatform("windows6.2")] attribute, but warns for [UnsupportedOSPlatform("windows10.0.19041.0")]
      // This call site is reachable on: 'windows' 6.2 and later. 'ApiSupportedFromWindows8UnsupportedFromWindows10()' is unsupported on: 'windows' 10.0.19041.0 and later.
      ApiSupportedFromWindows8UnsupportedFromWindows10();

      // The call site version is lower than the calling version, so warns:
      // This call site is reachable on: 'windows' 6.2 and later. 'AssemblySupportedOnWindowsApiSupportedFromWindows10()' is only supported on: 'windows' 10.0.19041.0 and later
      AssemblySupportedOnWindowsApiSupportedFromWindows10();
  }

  [SupportedOSPlatform("windows10.0.22000")] // call site attributed with windows 10.0.22000 or above.
  public void Caller2()
  {
      // This call site is reachable on: 'windows' 10.0.22000 and later. 'ApiSupportedFromWindows8UnsupportedFromWindows10()' is unsupported on: 'windows' 10.0.19041.0 and later.
      ApiSupportedFromWindows8UnsupportedFromWindows10();

      // will not warn as call site version higher than calling API.
      AssemblySupportedOnWindowsApiSupportedFromWindows10();
  }

  [SupportedOSPlatform("windows6.2")]
  [UnsupportedOSPlatform("windows10.0.19041.0")] // call site supports Windows from version 6.2 to 10.0.19041.0.
  public void Caller3()
  {
      // will not warn as caller has exact same attributes.
      ApiSupportedFromWindows8UnsupportedFromWindows10();

      // The call site reachable for the version not supported in the calling API, therefore warns:
      // This call site is reachable on: 'windows' from version 6.2 to 10.0.19041.0. 'AssemblySupportedOnWindowsApiSupportedFromWindows10()' is only supported on: 'windows' 10.0.19041.0 and later.
      AssemblySupportedOnWindowsApiSupportedFromWindows10();
  }

  // an API not supported on Android but supported on all other.
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

  [UnsupportedOSPlatform("windows")] // Caller no support Windows for any version.
  public void Caller4()
  {
      // This call site is reachable on all platforms.'DoesNotWorkOnAndroid()' is unsupported on: 'android'
      DoesNotWorkOnAndroid();

      // will not warns as the call site not support Windows at all, but supports all other.
      StartedWindowsSupportFromVersion8();

      // same, will not warns as the call site not support Windows at all, but supports all other.
      StartedWindowsSupportFrom8UnsupportedFrom10();
  }

  [UnsupportedOSPlatform("windows")]
  [UnsupportedOSPlatform("android")] // Caller not support Windows and Android for any version.
  public void Caller4()
  {
      DoesNotWorkOnAndroid(); // will not warn as call site not supports Android.

      // will not warns as the call site not support Windows at all, but supports all other.
      StartedWindowsSupportFromVersion8();

      // same, will not warns as the call site not support Windows at all, but supports all other.
      StartedWindowsSupportFrom8UnsupportedFrom10();
  }
  ```

### Assert the call-site with platform check

All the conditional checks used in the platform guard examples can also be used as the condition for `System.Diagnostics.Debug.Assert(System.Boolean)`.

  ```csharp
  // An API supported only on Linux.
  [SupportedOSPlatform("linux")]
  public void LinuxOnlyApi() { }

  public void Caller()
  {
      Debug.Assert(OperatingSystem.IsLinux());

      LinuxOnlyApi(); // will not warn
  }
  ```

## See also

- Target Framework Names in .NET 5
- Annotating platform-specific APIs and detecting its use
- Annotating APIs as unsupported on specific platforms
- CA1416 Platform compatibility analyzer
