---
title: "What's new in .NET Core 3.0 (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-core-3-0.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET Core 3.0

This article describes what is new in .NET Core 3.0. One of the biggest enhancements is support for Windows desktop applications (Windows only). By using the .NET Core 3.0 SDK component Windows Desktop, you can port your Windows Forms and Windows Presentation Foundation (WPF) applications. To be clear, the Windows Desktop component is only supported and included on Windows. For more information, see the Windows desktop section later in this article.

.NET Core 3.0 adds support for C# 8.0. It's highly recommended that you use Visual Studio 2019 version 16.3 or newer, or Visual Studio Code with the latest **C# extension**.

Download and get started with .NET Core 3.0 right now on Windows, macOS, or Linux.

For more information about the release, see the .NET Core 3.0 announcement.

.NET Core 3.0 RC 1 was considered production ready by Microsoft and was fully supported. If you're using a preview release, you must move to the RTM version for continued support.

## Language improvements C# 8.0

C# 8.0 is also part of this release, which includes the nullable reference types feature, async streams, and more patterns. For more information about C# 8.0 features, see What's new in C# 8.0.

Tutorials related to C# 8.0 language features:

- Tutorial: Express your design intent more clearly with nullable and non-nullable reference types
- Tutorial: Generate and consume async streams using C# 8.0 and .NET Core 3.0
- Tutorial: Build algorithms using pattern matching

Language enhancements were added to support the following API features detailed below:

- Ranges and indices
- Async streams

## .NET Standard 2.1

.NET Core 3.0 implements **.NET Standard 2.1**. However, the default `dotnet new classlib` template generates a project that still targets **.NET Standard 2.0**. To target **.NET Standard 2.1**, edit your project file and change the `TargetFramework` property to `netstandard2.1`:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>
  </PropertyGroup>

</Project>
```

If you're using Visual Studio, you need Visual Studio 2019, as Visual Studio 2017 doesn't support **.NET Standard 2.1** or **.NET Core 3.0**.

## Compile/Deploy

### Default executables

.NET Core now builds framework-dependent executables by default. This behavior is new for applications that use a globally installed version of .NET Core. Previously, only self-contained deployments would produce an executable.

During `dotnet build` or `dotnet publish`, an executable (known as the **appHost**) is created that matches the environment and platform of the SDK you're using. You can expect the same things with these executables as you would other native executables, such as:

- You can double-click on the executable.
- You can launch the application from a command prompt directly, such as `myapp.exe` on Windows, and `./myapp` on Linux and macOS.

### macOS appHost and notarization

*macOS only*

Starting with the notarized .NET Core SDK 3.0 for macOS, the setting to produce a default executable (known as the appHost) is disabled by default. For more information, see macOS Catalina Notarization and the impact on .NET Core downloads and projects.

When the appHost setting is enabled, .NET Core generates a native Mach-O executable when you build or publish. Your app runs in the context of the appHost when it is run from source code with the `dotnet run` command, or by starting the Mach-O executable directly.

Without the appHost, the only way a user can start a framework-dependent app is with the `dotnet <filename.dll>` command. An appHost is always created when you publish your app self-contained.

You can either configure the appHost at the project level, or toggle the appHost for a specific `dotnet` command with the `-p:UseAppHost` parameter:

- Project file

  ```xml
  <PropertyGroup>
    <UseAppHost>true</UseAppHost>
  </PropertyGroup>
  ```

- Command-line parameter

  ```dotnetcli
  dotnet run -p:UseAppHost=true
  ```

For more information about the `UseAppHost` setting, see MSBuild properties for Microsoft.NET.Sdk.

### Single-file executables

The `dotnet publish` command supports packaging your app into a platform-specific single-file executable. The executable is self-extracting and contains all dependencies (including native) that are required to run your app. When the app is first run, the application is extracted to a directory based on the app name and build identifier. Startup is faster when the application is run again. The application doesn't need to extract itself a second time unless a new version was used.

To publish a single-file executable, set the `PublishSingleFile` in your project or on the command line with the `dotnet publish` command:

```xml
<PropertyGroup>
  <RuntimeIdentifier>win10-x64</RuntimeIdentifier>
  <PublishSingleFile>true</PublishSingleFile>
</PropertyGroup>
```

-or-

```dotnetcli
dotnet publish -r win10-x64 -p:PublishSingleFile=true
```

For more information about single-file publishing, see the single-file bundler design document.

### Assembly trimming

The .NET core 3.0 SDK comes with a tool that can reduce the size of apps by analyzing IL and trimming unused assemblies.

Self-contained apps include everything needed to run your code, without requiring .NET to be installed on the host computer. However, many times the app only requires a small subset of the framework to function, and other unused libraries could be removed.

.NET Core now includes a setting that will use the IL Trimmer tool to scan the IL of your app. This tool detects what code is required, and then trims unused libraries. This tool can significantly reduce the deployment size of some apps.

To enable this tool, add the `<PublishTrimmed>` setting in your project and publish a self-contained app:

```xml
<PropertyGroup>
  <PublishTrimmed>true</PublishTrimmed>
</PropertyGroup>
```

```dotnetcli
dotnet publish -r <rid> -c Release
```

As an example, the basic "hello world" new console project template that is included, when published, hits about 70 MB in size. By using `<PublishTrimmed>`, that size is reduced to about 30 MB.

It's important to consider that applications or frameworks (including ASP.NET Core and WPF) that use reflection or related dynamic features, will often break when trimmed. This breakage occurs because the trimmer doesn't know about this dynamic behavior and can't determine which framework types are required for reflection. The IL Trimmer tool can be configured to be aware of this scenario.

Above all else, be sure to test your app after trimming.

For more information about the IL Trimmer tool, see the documentation or visit the mono/linker repo.

### Tiered compilation

Tiered compilation (TC) is on by default with .NET Core 3.0. This feature enables the runtime to more adaptively use the just-in-time (JIT) compiler to achieve better performance.

The main benefit of tiered compilation is to provide two ways of jitting methods: in a lower-quality-but-faster tier or a higher-quality-but-slower tier. The quality refers to how well the method is optimized. TC helps to improve the performance of an application as it goes through various stages of execution, from startup through steady state. When tiered compilation is disabled, every method is compiled in a single way that's biased to steady-state performance over startup performance.

When TC is enabled, the following behavior applies for method compilation when an app starts up:

- If the method has ahead-of-time-compiled code, or ReadyToRun, the pregenerated code is used.
- Otherwise, the method is jitted. Typically, these methods are generics over value types.
  - *Quick JIT* produces lower-quality (or less optimized) code more quickly. In .NET Core 3.0, Quick JIT is enabled by default for methods that don't contain loops and is preferred during startup.
  - The fully optimizing JIT produces higher-quality (or more optimized) code more slowly. For methods where Quick JIT would not be used (for example, if the method is attributed with `System.Runtime.CompilerServices.MethodImplOptions.AggressiveOptimization`), the fully optimizing JIT is used.

For frequently called methods, the just-in-time compiler eventually creates fully optimized code in the background. The optimized code then replaces the pre-compiled code for that method.

Code generated by Quick JIT may run slower, allocate more memory, or use more stack space. If there are issues, you can disabled Quick JIT using this MSBuild property in the project file:

```xml
<PropertyGroup>
  <TieredCompilationQuickJit>false</TieredCompilationQuickJit>
</PropertyGroup>
```

To disable TC completely, use this MSBuild property in your project file:

```xml
<PropertyGroup>
  <TieredCompilation>false</TieredCompilation>
</PropertyGroup>
```

> **Tip:**
> If you change these settings in the project file, you may need to perform a clean build for the new settings to be reflected (delete the `obj` and `bin` directories and rebuild).

For more information about configuring compilation at runtime, see Runtime configuration options for compilation.

### ReadyToRun images

You can improve the startup time of your .NET Core application by compiling your application assemblies as ReadyToRun (R2R) format. R2R is a form of ahead-of-time (AOT) compilation.

R2R binaries improve startup performance by reducing the amount of work the just-in-time (JIT) compiler needs to do as your application loads. The binaries contain similar native code compared to what the JIT would produce. However, R2R binaries are larger because they contain both intermediate language (IL) code, which is still needed for some scenarios, and the native version of the same code. R2R is only available when you publish a self-contained app that targets specific runtime environments (RID) such as Linux x64 or Windows x64.

To compile your project as ReadyToRun, do the following:

01. Add the `<PublishReadyToRun>` setting to your project:

    ```xml
    <PropertyGroup>
      <PublishReadyToRun>true</PublishReadyToRun>
    </PropertyGroup>
    ```

01. Publish a self-contained app. For example, this command creates a self-contained app for the 64-bit version of Windows:

    ```dotnetcli
    dotnet publish -c Release -r win-x64 --self-contained
    ```

#### Cross platform/architecture restrictions

The ReadyToRun compiler doesn't currently support cross-targeting. You must compile on a given target. For example, if you want R2R images for Windows x64, you need to run the publish command on that environment.

Exceptions to cross-targeting:

- Windows x64 can be used to compile Windows Arm32, Arm64, and x86 images.
- Windows x86 can be used to compile Windows Arm32 images.
- Linux x64 can be used to compile Linux Arm32 and Arm64 images.

For more information, see Ready to Run.
