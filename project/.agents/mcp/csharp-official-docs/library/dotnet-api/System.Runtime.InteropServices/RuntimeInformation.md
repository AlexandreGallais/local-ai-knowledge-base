---
title: "RuntimeInformation class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/RuntimeInformation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeInformation class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class RuntimeInformation
```

Provides information about the .NET runtime installation.

To be added.

## RuntimeInformation.FrameworkDescription property

```csharp
public static string FrameworkDescription { get; }
```

Gets the name of the .NET installation on which an app is running.

Returns: The name of the .NET installation on which the app is running.

#### Remarks

The property returns a string that indicates the name of the currently executing .NET implementation. The string starts with one of the following descriptions, usually followed by the current version:

- ".NET" (for .NET 5 and later versions)
- ".NET Core" (for .NET Core 1.0 - 3.1)

## RuntimeInformation.OSArchitecture property

```csharp
public static System.Runtime.InteropServices.Architecture OSArchitecture { get; }
```

Gets the platform architecture on which the current app is running.

Returns: The platform architecture on which the current app is running.

#### Remarks

The returned value is intended to represent the actual architecture of the underlying operating system. It's a best effort to ignore the architecture emulation infrastructure that might be involved to run the process. The returned value takes into account emulation built into Windows and macOS operating systems. The returned value does not take into account emulation using QEMU that's typically used on Linux.

> **Note:**
> For more information about the behavior of this property for emulated processes, see RuntimeInformation.OSArchitecture under emulation.

## RuntimeInformation.OSDescription property

```csharp
public static string OSDescription { get; }
```

Gets a string that describes the operating system on which the app is running.

Returns: An opaque string that describes the operating system on which the app is running.

#### Remarks

This property returns a string that describes the operating system for presentation to the user.

It's not recommended to parse the string for information.

## RuntimeInformation.ProcessArchitecture property

```csharp
public static System.Runtime.InteropServices.Architecture ProcessArchitecture { get; }
```

Gets the process architecture of the currently running app.

Returns: The process architecture of the currently running app.

To be added.

## RuntimeInformation.RuntimeIdentifier property

```csharp
public static string RuntimeIdentifier { get; }
```

Gets the platform for which the runtime was built (or on which an app is running).

Returns: An opaque string that identifies the platform for which the runtime was built (or on which an app is running).

#### Remarks

This property returns a string that identifies the operating system and processor architecture for which the runtime was built. For example, the value on Windows 11 is `win-x64`, and on Debian 12, it's `linux-x64`. Since this value represents the platform for which the runtime was built, it may differ depending on the installation source. Microsoft-built runtimes use portable RIDs like `linux-x64` that can run on multiple Linux distributions. However, some Linux distributions provide their own packages built specifically for that distribution and version, which may return more specific RIDs like `ubuntu.24.10-x64`.

Since this string is opaque, it's not recommended to parse the string into its constituent parts.

For more information, see .NET RID catalog.

## RuntimeInformation.IsOSPlatform(OSPlatform) method

```csharp
public static bool IsOSPlatform (System.Runtime.InteropServices.OSPlatform osPlatform);
```

Indicates whether the current application is running on the specified platform.

Parameters:

- `osPlatform`: A platform.

Returns: `true` if the current app is running on the specified platform; otherwise, `false`.

To be added.
