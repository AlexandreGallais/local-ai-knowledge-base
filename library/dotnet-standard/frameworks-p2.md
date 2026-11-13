---
title: "Target frameworks in SDK-style projects - .NET (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/frameworks.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Target frameworks in SDK-style projects - .NET (part 2 of 2)

## How to specify a target framework

Target frameworks are specified in a project file. When a single target framework is specified, use the TargetFramework element. The following console app project file demonstrates how to target .NET 11:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net11.0</TargetFramework>
  </PropertyGroup>

</Project>
```

When you specify multiple target frameworks, you can conditionally reference assemblies for each target framework. In your code, you can conditionally compile against those assemblies by using preprocessor symbols with *if-then-else* logic.

The following library project targets APIs of .NET Standard (`netstandard1.4`) and .NET Framework (`net40` and `net45`). Use the plural TargetFrameworks element with multiple target frameworks. The `Condition` attributes include implementation-specific packages when the library is compiled for the two .NET Framework TFMs:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFrameworks>netstandard1.4;net40;net45</TargetFrameworks>
  </PropertyGroup>

  <!-- Conditionally obtain references for the .NET Framework 4.0 target -->
  <ItemGroup Condition=" '$(TargetFramework)' == 'net40' ">
    <Reference Include="System.Net" />
  </ItemGroup>

  <!-- Conditionally obtain references for the .NET Framework 4.5 target -->
  <ItemGroup Condition=" '$(TargetFramework)' == 'net45' ">
    <Reference Include="System.Net.Http" />
    <Reference Include="System.Threading.Tasks" />
  </ItemGroup>

</Project>
```

Within your library or app, you write conditional code using preprocessor directives to compile for each target framework:

```csharp
public class MyClass
{
    static void Main()
    {
#if NET40
        Console.WriteLine("Target framework: .NET Framework 4.0");
#elif NET45
        Console.WriteLine("Target framework: .NET Framework 4.5");
#else
        Console.WriteLine("Target framework: .NET Standard 1.4");
#endif
    }
}
```

### TargetFramework values are aliases

The `TargetFramework` property value (for example, `net10.0`) is a friendly name—an alias—that the .NET SDK translates into canonical moniker properties. Specifically, the SDK sets the following properties from the `TargetFramework` value:

- `TargetFrameworkMoniker` (for example, `.NETCoreApp,Version=v10.0`)
- `TargetFrameworkIdentifier` (for example, `.NETCoreApp`)
- `TargetFrameworkVersion` (for example, `v10.0`)
- `TargetPlatformMoniker`, `TargetPlatformIdentifier`, and `TargetPlatformVersion` (when targeting a specific platform)

NuGet and the .NET SDK use these moniker properties—not the `TargetFramework` string—for package compatibility checks and build logic. This translation already happens for OS-specific TFMs. For example, `net10.0-windows` translates to `TargetFrameworkMoniker` = `.NETCoreApp,Version=v10.0` and `TargetPlatformMoniker` = `Windows,Version=7.0`.

Because the alias is just a name, the `TargetFramework` value can be any alphanumeric string, as long as the corresponding moniker properties are set correctly. The following project file uses a custom alias named `banana` and explicitly sets the moniker properties so that the project builds and restores for .NET 10.0:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>banana</TargetFramework>
  </PropertyGroup>

  <PropertyGroup Condition=" '$(TargetFramework)' == 'banana' ">
    <TargetFrameworkIdentifier>.NETCoreApp</TargetFrameworkIdentifier>
    <TargetFrameworkVersion>v10.0</TargetFrameworkVersion>
    <TargetFrameworkMoniker>.NETCoreApp,Version=v10.0</TargetFrameworkMoniker>
  </PropertyGroup>
</Project>
```

For more information about these properties, see the TargetFramework MSBuild property reference.

## Preprocessor symbols

The build system is aware of preprocessor symbols representing the target frameworks shown in the Supported target framework versions table when you're using SDK-style projects. To convert a .NET Standard, .NET Core, or .NET 5+ TFM to a preprocessor symbol, replace dots and hyphens with an underscore, and change lowercase letters to uppercase (for example, the symbol for `netstandard2.0` is `NETSTANDARD2_0`).

You can disable generation of these symbols via the `DisableImplicitFrameworkDefines` property. For more information about this property, see DisableImplicitFrameworkDefines.

The complete list of preprocessor symbols for .NET target frameworks is:

| Target Frameworks | Symbols | Additional symbols(available in .NET 5+ SDKs) | Platform symbols (available onlywhen you specify an OS-specific TFM) |
| ------------------| ------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| .NET Framework    | `NETFRAMEWORK`, `NET481`, `NET48`, `NET472`, `NET471`, `NET47`, `NET462`, `NET461`, `NET46`, `NET452`, `NET451`, `NET45`, `NET40`, `NET35`, `NET20` | `NET48_OR_GREATER`, `NET472_OR_GREATER`, `NET471_OR_GREATER`, `NET47_OR_GREATER`, `NET462_OR_GREATER`, `NET461_OR_GREATER`, `NET46_OR_GREATER`, `NET452_OR_GREATER`, `NET451_OR_GREATER`, `NET45_OR_GREATER`, `NET40_OR_GREATER`, `NET35_OR_GREATER`, `NET20_OR_GREATER` | |
| .NET Standard     | `NETSTANDARD`, `NETSTANDARD2_1`, `NETSTANDARD2_0`, `NETSTANDARD1_6`, `NETSTANDARD1_5`, `NETSTANDARD1_4`, `NETSTANDARD1_3`, `NETSTANDARD1_2`, `NETSTANDARD1_1`, `NETSTANDARD1_0` | `NETSTANDARD2_1_OR_GREATER`, `NETSTANDARD2_0_OR_GREATER`, `NETSTANDARD1_6_OR_GREATER`, `NETSTANDARD1_5_OR_GREATER`, `NETSTANDARD1_4_OR_GREATER`, `NETSTANDARD1_3_OR_GREATER`, `NETSTANDARD1_2_OR_GREATER`, `NETSTANDARD1_1_OR_GREATER`, `NETSTANDARD1_0_OR_GREATER` | |
| .NET 5+ (and .NET Core) | `NET`, `NET11_0`, `NET10_0`, `NET9_0`, `NET8_0`, `NET7_0`, `NET6_0`, `NET5_0`, `NETCOREAPP`, `NETCOREAPP3_1`, `NETCOREAPP3_0`, `NETCOREAPP2_2`, `NETCOREAPP2_1`, `NETCOREAPP2_0`, `NETCOREAPP1_1`, `NETCOREAPP1_0` | `NET11_0_OR_GREATER`, `NET10_0_OR_GREATER`, `NET9_0_OR_GREATER`, `NET8_0_OR_GREATER`, `NET7_0_OR_GREATER`, `NET6_0_OR_GREATER`, `NET5_0_OR_GREATER`, `NETCOREAPP3_1_OR_GREATER`, `NETCOREAPP3_0_OR_GREATER`, `NETCOREAPP2_2_OR_GREATER`, `NETCOREAPP2_1_OR_GREATER`, `NETCOREAPP2_0_OR_GREATER`, `NETCOREAPP1_1_OR_GREATER`, `NETCOREAPP1_0_OR_GREATER` | `ANDROID`, `BROWSER`, `IOS`, `MACCATALYST`, `MACOS`, `TVOS`, `WINDOWS`,`OS` (for example `IOS15_1`),`OS_OR_GREATER` (for example `IOS15_1_OR_GREATER`) |

> **Note:**
>
> * Versionless symbols are defined regardless of the version you're targeting.
> * Version-specific symbols are only defined for the version you're targeting.
> * The `<framework>_OR_GREATER` symbols are defined for the version you're targeting and all earlier versions. For example, if you're targeting .NET Framework 2.0, the following symbols are defined: `NET20`, `NET20_OR_GREATER`, `NET11_OR_GREATER`, and `NET10_OR_GREATER`.
> * The `NETSTANDARD<x>_<y>_OR_GREATER` symbols are only defined for .NET Standard targets, and not for targets that implement .NET Standard, such as .NET Core and .NET Framework.
> * These are different from the target framework monikers (TFMs) used by the MSBuild `TargetFramework` property and NuGet.

## Deprecated target frameworks

The following target frameworks are deprecated. Packages that target these target frameworks should migrate to the indicated replacements.

| Deprecated TFM                                                                             | Replacement |
| ------------------------------------------------------------------------------------------ | ----------- |
| aspnet50aspnetcore50dnxcore50dnxdnx45dnx451dnx452                  | netcoreapp  |
| dotnetdotnet50dotnet51dotnet52dotnet53dotnet54dotnet55dotnet56 | netstandard |
| netcore50                                                                                  | uap10.0     |
| win                                                                                        | netcore45   |
| win8                                                                                       | netcore45   |
| win81                                                                                      | netcore451  |
| win10                                                                                      | uap10.0     |
| winrt                                                                                      | netcore45   |

## See also

- Target framework names in .NET 5
- .NET Standard
- .NET versioning
- Windows 11 release information
