---
title: "NETSDK1130: Can't reference a Windows Metadata component directly"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1130.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1130: Can't reference a Windows Metadata component directly

NETSDK1130 indicates that you're trying to reference a Windows Metadata component directly from an app that targets .NET 5 or later. The full error message is similar to the following example:

> *\<Component name>* cannot be referenced. Referencing a Windows Metadata component directly when targeting .NET 5 or higher is not supported.

To resolve this error:

* Remove references to the Microsoft.Windows.SDK.Contracts package. Instead, specify the version of the Windows APIs that you want to access via the `TargetFramework` property of the project. For example:

  ```xml
  <TargetFramework>net5.0-windows10.0.19041.0</TargetFramework>
  ```

* If you're consuming a third-party runtime component that's defined in a *.winmd* file, add a reference to the Microsoft.Windows.CsWinRT NuGet package. For information on how to generate the C# projection, see the C#/WinRT documentation.

For more information, see Built-in support for WinRT is removed from .NET and Call Windows Runtime APIs in desktop apps.
