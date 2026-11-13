---
title: "Breaking change: Built-in support for WinRT is removed from .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/interop/5.0/built-in-support-for-winrt-removed.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Built-in support for WinRT is removed from .NET

Built-in support for consumption of Windows runtime (WinRT) APIs in .NET is removed.

## Version introduced

5.0

## Change description

Previously, CoreCLR could consume Windows metadata (WinMD) files to active and consume WinRT types. Starting in .NET 5, CoreCLR can no longer consume WinMD files directly.

If you attempt to reference an unsupported assembly, you'll get a `System.IO.FileNotFoundException`. If you activate a WinRT class, you'll get a `System.PlatformNotSupportedException`.

This breaking change was made for the following reasons:

- So WinRT can be developed and improved separately from the .NET runtime.
- For symmetry with interop systems provided for other operating systems, such as iOS and Android.
- To take advantage of other .NET features, such as C# features, intermediate language (IL) trimming, and ahead-of-time (AOT) compilation.
- To simplify the .NET runtime codebase.

## Recommended action

- Remove references to the Microsoft.Windows.SDK.Contracts package.  Instead, specify the version of the Windows APIs that you want to access via the `TargetFramework` property of the project.  For example:

  ```xml
  <TargetFramework>net5.0-windows10.0.19041.0</TargetFramework>
  ```

- If you're consuming a third-party runtime component that's defined in a *.winmd* file, add a reference to the Microsoft.Windows.CsWinRT NuGet package. For information on how to generate the C# projection, see the C#/WinRT documentation.

For more information, see Call Windows Runtime APIs in desktop apps.

## Affected APIs

- `System.IO.WindowsRuntimeStorageExtensions`
- `System.IO.WindowsRuntimeStreamExtensions`
- `System.Runtime.InteropServices.WindowsRuntime`
- `System.WindowsRuntimeSystemExtensions`
- `Windows.Foundation.Point`
- `Windows.Foundation.Size`
- `Windows.UI.Color`
