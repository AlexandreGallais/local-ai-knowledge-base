---
title: "Microsoft Fakes support for Microsoft.Testing.Platform (MTP)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-fakes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Microsoft Fakes

This feature requires the Microsoft.Testing.Extensions.Fakes NuGet package.

> **Tip:**
> When using Microsoft.Testing.Platform.MSBuild (included transitively by MSTest, NUnit, and xUnit runners), this extension is auto-registered when you install its NuGet package — no code changes needed.

The `Microsoft.Testing.Extensions.Fakes` extension provides support to execute a test project that makes use of `Microsoft Fakes`.

Microsoft Fakes allows you to better test your code by either generating `Stub`s (for instance creating a testable implementation of `INotifyPropertyChanged`) or by `Shim`ing methods and static methods (replacing the implementation of `File.Open` with a one you can control in your tests).

> **Note:**
> This extension requires a Visual Studio Enterprise installation with the minimum version of 17.11 preview 1 in order to work correctly.

## Upgrade your project to the new extension

To use the new extension with an existing project, update the existing `Microsoft.QualityTools.Testing.Fakes` reference with `Microsoft.Testing.Extensions.Fakes`.

```diff
- <Reference Include="Microsoft.QualityTools.Testing.Fakes, Version=12.0.0.0, Culture=Neutral">
-   <SpecificVersion>False</SpecificVersion>
- </Reference>
+ <PackageReference Include="Microsoft.Testing.Extensions.Fakes" Version="17.12.0" />
```

If you are using MSTest.Sdk 3.7 or later, use the `EnableMicrosoftTestingExtensionsFakes` property to enable the extension and don't add the package reference.
