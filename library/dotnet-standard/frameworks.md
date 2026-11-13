---
title: "Target frameworks in SDK-style projects - .NET (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/frameworks.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Target frameworks in SDK-style projects

When you target a framework in an app or library, you're specifying the set of APIs that you'd like to make available to the app or library. You specify the target framework in your project file using a target framework moniker (TFM).

An app or library can target a version of .NET Standard. .NET Standard versions represent standardized sets of APIs across all .NET implementations. For example, a library can target .NET Standard 1.6 and gain access to APIs that function across .NET Core and .NET Framework using the same codebase.

An app or library can also target a specific .NET implementation to gain access to implementation-specific APIs. For example, an app that targets Universal Windows Platform (UWP, `uap10.0`) has access to APIs that compile for devices that run Windows 10.

For some target frameworks, such as .NET Framework, the APIs are defined by the assemblies that the framework installs on a system and may include application framework APIs (for example, ASP.NET).

For package-based target frameworks (for example, .NET 5+, .NET Core, and .NET Standard), the APIs are defined by the NuGet packages included in the app or library.

## Latest versions

The following table defines the most common target frameworks, how they're referenced, and which version of .NET Standard they implement. These target framework versions are the latest stable versions. Prerelease versions aren't shown. A *target framework moniker* (TFM) is a standardized token format for specifying the target framework of a .NET app or library.

| Target framework | Latest  stable version | Target framework moniker (TFM) | Implemented  .NET Standard version |
|:----------------:|:---------------------------:|:------------------------------:|:---------------------------------------:|
| .NET 11          | 11                          | net11.0                        | 2.1                                     |
| .NET 10          | 10                          | net10.0                        | 2.1                                     |
| .NET 9           | 9                           | net9.0                         | 2.1                                     |
| .NET 8           | 8                           | net8.0                         | 2.1                                     |
| .NET Standard    | 2.1                         | netstandard2.1                 | N/A                                     |
| .NET Core        | 3.1                         | netcoreapp3.1                  | 2.1                                     |
| .NET Framework   | 4.8.1                       | net481                         | 2.0                                     |

## Supported target frameworks

A target framework is typically referenced by a TFM. The following table shows the target frameworks supported by the .NET SDK and the NuGet client. Equivalents are shown within brackets. For example, `win81` is an equivalent TFM to `netcore451`.

| Target Framework           | TFM |
| -------------------------- | --- |
| .NET 5+ (and .NET Core)    | netcoreapp1.0netcoreapp1.1netcoreapp2.0netcoreapp2.1netcoreapp2.2netcoreapp3.0netcoreapp3.1net5.0*net6.0*net7.0*net8.0*net9.0*net10.0*net11.0* |
| .NET Standard              | netstandard1.0netstandard1.1netstandard1.2netstandard1.3netstandard1.4netstandard1.5netstandard1.6netstandard2.0netstandard2.1 |
| .NET Framework             | net11net20net35net40net403net45net451net452net46net461net462net47net471net472net48net481 |
| Windows Store              | netcore [netcore45]netcore45 [win] [win8]netcore451 [win81] |
| .NET nanoFramework         | netnano1.0 |
| .NET Micro Framework       | netmf |
| Silverlight                | sl4sl5 |
| Windows Phone              | wp [wp7]wp7wp75wp8wp81wpa81 |
| Universal Windows Platform | uap [uap10.0]uap10.0 [win10] [netcore50] |

\* .NET 5 and later TFMs include some operating system-specific variations. For more information, see the following section, OS-specific TFMs.

### OS-specific TFMs

The `net8.0`, `net9.0`, `net10.0`, and `net11.0` TFMs include technologies that work across different platforms. Specifying an *OS-specific TFM* makes APIs that are specific to an operating system available to your app, for example, Windows Forms or iOS bindings. OS-specific TFMs also inherit every API available to their base TFM, for example, the `net11.0` TFM.

The following table shows the compatibility of the .NET 8+ TFMs.

| TFM                  | Compatible with                                                  |
|----------------------|------------------------------------------------------------------|
| `net8.0`             | (Subsequent version of `net7.0`)                                 |
| `net8.0-android`     | (Subsequent version of `net7.0-android`)                         |
| `net8.0-browser`     | Everything inherited from `net8.0`                               |
| `net8.0-ios`         | (Subsequent version of `net7.0-ios`)                             |
| `net8.0-maccatalyst` | (Subsequent version of `net7.0-maccatalyst`)                     |
| `net8.0-macos`       | (Subsequent version of `net7.0-macos`)                           |
| `net8.0-tizen`       | (Subsequent version of `net7.0-tizen`)                           |
| `net8.0-tvos`        | (Subsequent version of `net7.0-tvos`)                            |
| `net8.0-windows`     | (Subsequent version of `net7.0-windows`)                         |
| `net9.0`             | (Subsequent version of `net8.0`)                                 |
| `net9.0-android`     | (Subsequent version of `net8.0-android`)                         |
| `net9.0-browser`     | (Subsequent version of `net8.0-browser`)                         |
| `net9.0-ios`         | (Subsequent version of `net8.0-ios`)                             |
| `net9.0-maccatalyst` | (Subsequent version of `net8.0-maccatalyst`)                     |
| `net9.0-macos`       | (Subsequent version of `net8.0-macos`)                           |
| `net9.0-tizen`       | (Subsequent version of `net8.0-tizen`)                           |
| `net9.0-tvos`        | (Subsequent version of `net8.0-tvos`)                            |
| `net9.0-windows`     | (Subsequent version of `net8.0-windows`)                         |
| `net10.0`             | (Subsequent version of `net9.0`)                                |
| `net10.0-android`     | (Subsequent version of `net9.0-android`)                        |
| `net10.0-browser`     | (Subsequent version of `net9.0-browser`)                        |
| `net10.0-ios`         | (Subsequent version of `net9.0-ios`)                            |
| `net10.0-maccatalyst` | (Subsequent version of `net9.0-maccatalyst`)                    |
| `net10.0-macos`       | (Subsequent version of `net9.0-macos`)                          |
| `net10.0-tizen`       | (Subsequent version of `net9.0-tizen`)                          |
| `net10.0-tvos`        | (Subsequent version of `net9.0-tvos`)                           |
| `net10.0-windows`     | (Subsequent version of `net9.0-windows`)                        |
| `net11.0`             | (Subsequent version of `net10.0`)                               |
| `net11.0-android`     | (Subsequent version of `net10.0-android`)                       |
| `net11.0-browser`     | Everything inherited from `net11.0`                             |
| `net11.0-ios`         | (Subsequent version of `net10.0-ios`)                           |
| `net11.0-maccatalyst` | (Subsequent version of `net10.0-maccatalyst`)                   |
| `net11.0-macos`       | (Subsequent version of `net10.0-macos`)                         |
| `net11.0-tvos`        | (Subsequent version of `net10.0-tvos`)                          |
| `net11.0-windows`     | (Subsequent version of `net10.0-windows`)                       |

To make your app portable across different platforms but still have access to OS-specific APIs, you can target multiple OS-specific TFMs and add platform guards around OS-specific API calls using `#if` preprocessor directives. For a list of the available symbols, see Preprocessor symbols.

#### Suggested targets

Use these guidelines to determine which TFM to use in your app:

- Apps that are portable to multiple platforms should target a base TFM, for example, `net11.0`. This includes most libraries but also ASP.NET Core and Entity Framework.
- Platform-specific libraries should target platform-specific flavors. For example, WinForms and WPF projects should target `net11.0-windows`.
- Cross-platform application models (for example, ASP.NET Core) should at least target the base TFM, for example, `net11.0`, but might also target additional platform-specific flavors to light-up more APIs or features.

#### OS version in TFMs

You can also specify an optional OS version at the end of an OS-specific TFM, for example, `net8.0-ios17.2`. The version indicates which APIs are available to your app or library. It doesn't control the OS version that your app or library supports at runtime. It's used to select the reference assemblies that your project compiles against, and to select assets from NuGet packages. Think of this version as the "platform version" or "OS API version" to disambiguate it from the runtime OS version.

The .NET SDK is designed to be able to support newly released APIs for an individual platform without a new version of the base TFM. This enables you to access platform-specific functionality without waiting for a major release of .NET. You can gain access to these newly released APIs by incrementing the platform version in the TFM. For example, if the Android platform added API level 34 APIs in a .NET 8.0.x SDK update, you could access them by using the TFM `net8.0-android34.0`.

When an OS-specific TFM doesn't specify the platform version explicitly, it has an implied value that can be inferred from the base TFM and platform name. For example, the default platform version for Android in .NET 9 is `35.0`, which means that `net9.0-android` is shorthand for the canonical `net9.0-android35.0` TFM. The shorthand form is intended for use in project files only, and is expanded to the canonical form by the .NET SDK's MSBuild targets before being passed to other tools, such as NuGet.

The following table shows the *default* target platform version (TPV) for Android and iOS for each .NET release. **If you want to use the latest bindings, use the default (that is, don't specify an OS version).**

| .NET version | Android | iOS  |
|--------------|--------:|-----:|
| .NET 8       |    34.0 | 17.2 |
| .NET 9       |    35.0 | 18.0 |
| .NET 10      |    36.0 | 18.7 |
| .NET 11      |    37.0 | 27.0 |

Starting in .NET 9, when service releases introduce support for a later TPV (which will always have the same *major* version number as when the .NET version was initially released), the earliest supported TPV for that .NET version will remain supported. For example, for .NET 9, the earliest supported iOS version, 18.0, will remain supported, even when a service release adds support for the latest iOS 18.x version. **If you need to use the earliest bindings for a .NET release, use a specific OS version number in your TFM.**

> **Note:**
> On Apple platforms (iOS, macOS, tvOS, and Mac Catalyst) in .NET 8 and earlier,
> the default TPV is the latest supported version in the currently installed workload.
> That means that updating the iOS workload in .NET 8, for example, might result in a higher default
> TPV, if support for a new version of iOS has been added in that workload. In the preceding table,
> the default TPV is the version in the initial release for the stated .NET version.
>
> Starting in .NET 9, this special behavior only applies to *executable* projects. The default TPV for library projects now stays the same for the entirety of a major .NET release, like all other platforms.

#### Precedence

If your app references a package that has multiple assets for different TFMs, the assets that are closer in version number are preferred. For example, if your app targets `net9.0-ios` and the package offers assets for `net9.0` and `net8.0-ios`, the `net9.0` assets are used. For more information, see Precedences.

#### Support older OS versions

Although a platform-specific app or library is compiled against APIs from a specific version of that OS, you can make it compatible with earlier OS versions by adding the `SupportedOSPlatformVersion` property to your project file. The `SupportedOSPlatformVersion` property indicates the minimum OS version required to run your app or library. If you don't explicitly specify this minimum runtime OS version in the project, it defaults to the platform version from the TFM.

For your app to run correctly on an older OS version, it can't call APIs that don't exist on that version of the OS. However, you can add guards around calls to newer APIs so they are only called when running on a version of the OS that supports them. This pattern allows you to design your app or library to support running on older OS versions while taking advantage of newer OS functionality when running on newer OS versions.

The `SupportedOSPlatformVersion` value (whether explicit or default) is used by the platform compatibility analyzer, which detects and warns about unguarded calls to newer APIs. It's burned into the project's compiled assembly as an `System.Runtime.Versioning.UnsupportedOSPlatformAttribute` assembly attribute, so that the platform compatibility analyzer can detect unguarded calls to that assembly's APIs from projects with a lower `SupportedOSPlatformVersion` value. On some platforms, the `SupportedOSPlatformVersion` value affects platform-specific app packaging and build processes, which is covered in the documentation for those platforms.

The following example is an excerpt of a project file that uses the `TargetFramework` and `SupportedOSPlatformVersion` MSBuild properties to specify that the app or library has access to iOS 15.0 APIs but supports running on iOS 13.0 and higher:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net6.0-ios15.0</TargetFramework>
    <SupportedOSPlatformVersion>13.0</SupportedOSPlatformVersion>
  </PropertyGroup>
  ...

</Project>
```
