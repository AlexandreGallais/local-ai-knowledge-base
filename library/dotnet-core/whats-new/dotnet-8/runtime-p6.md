---
title: "What's new in .NET 8 runtime (part 6 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-8/runtime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET 8 runtime (part 6 of 6)

## Native AOT support

The option to publish as Native AOT was first introduced in .NET 7. Publishing an app with Native AOT creates a fully self-contained version of your app that doesn't need a runtime—everything is included in a single file. .NET 8 brings the following improvements to Native AOT publishing:

- Adds support for the x64 and Arm64 architectures on *macOS*.
- Reduces the sizes of Native AOT apps on Linux by up to 50%. The following table shows the size of a "Hello World" app published with Native AOT that includes the entire .NET runtime on .NET 7 vs. .NET 8:

  | Operating system                        | .NET 7  | .NET 8  |
  |-----------------------------------------|---------|---------|
  | Linux x64 (with `-p:StripSymbols=true`) | 3.76 MB | 1.84 MB |
  | Windows x64                             | 2.85 MB | 1.77 MB |

- Lets you specify an optimization preference: size or speed. By default, the compiler chooses to generate fast code while being mindful of the size of the application. However, you can use the `<OptimizationPreference>` MSBuild property to optimize specifically for one or the other. For more information, see Optimize AOT deployments.

### Target iOS-like platforms with Native AOT

.NET 8 starts the work to enable Native AOT support for iOS-like platforms. You can now build and run .NET iOS and .NET MAUI applications with Native AOT on the following platforms:

- `ios`
- `iossimulator`
- `maccatalyst`
- `tvos`
- `tvossimulator`

Preliminary testing shows that app size on disk decreases by about 35% for .NET iOS apps that use Native AOT instead of Mono. App size on disk for .NET MAUI iOS apps decreases up to 50%. Additionally, the startup time is also faster. .NET iOS apps have about 28% faster startup time, while .NET MAUI iOS apps have about 50% better startup performance compared to Mono. The .NET 8 support is experimental and only the first step for the feature as a whole. For more information, see the .NET 8 Performance Improvements in .NET MAUI blog post.

Native AOT support is available as an opt-in feature intended for app deployment; Mono is still the default runtime for app development and deployment. To build and run a .NET MAUI application with Native AOT on an iOS device, use `dotnet workload install maui` to install the .NET MAUI workload and `dotnet new maui -n HelloMaui` to create the app. Then, set the MSBuild property `PublishAot` to `true` in the project file.

```xml
<PropertyGroup>
  <PublishAot>true</PublishAot>
</PropertyGroup>
```

When you set the required property and run `dotnet publish` as shown in the following example, the app will be deployed by using Native AOT.

```dotnetcli
dotnet publish -f net8.0-ios -c Release -r ios-arm64  /t:Run
```

#### Limitations

Not all iOS features are compatible with Native AOT. Similarly, not all libraries commonly used in iOS are compatible with NativeAOT. And in addition to the existing limitations of Native AOT deployment, the following list shows some of the other limitations when targeting iOS-like platforms:

- Using Native AOT is only enabled during app deployment (`dotnet publish`).
- Managed code debugging is only supported with Mono.
- Compatibility with the .NET MAUI framework is limited.

### AOT compilation for Android apps

To decrease app size, .NET and .NET MAUI apps that target Android use *profiled* ahead-of-time (AOT) compilation mode when they're built in Release mode. Profiled AOT compilation affects fewer methods than regular AOT compilation. .NET 8 introduces the `<AndroidStripILAfterAOT>` property that lets you opt-in to further AOT compilation for Android apps to decrease app size even more.

```xml
<PropertyGroup>
  <AndroidStripILAfterAOT>true</AndroidStripILAfterAOT>
</PropertyGroup>
```

By default, setting `AndroidStripILAfterAOT` to `true` overrides the default `AndroidEnableProfiledAot` setting, allowing (nearly) all methods that were AOT-compiled to be trimmed. You can also use profiled AOT and IL stripping together by explicitly setting both properties to `true`:

```xml
<PropertyGroup>
  <AndroidStripILAfterAOT>true</AndroidStripILAfterAOT>
  <AndroidEnableProfiledAot>true</AndroidEnableProfiledAot>
</PropertyGroup>
```

## Cross-built Windows apps

When you build apps that target Windows on non-Windows platforms, the resulting executable is now updated with any specified Win32 resources—for example, application icon, manifest, version information.

Previously, applications had to be built on Windows in order to have such resources. Fixing this gap in cross-building support has been a popular request, as it was a significant pain point affecting both infrastructure complexity and resource usage.

## See also

- What's new in .NET 8
