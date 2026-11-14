---
title: "MSBuild properties for Microsoft.NET.Sdk (part 7 of 9)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/project-sdk/msbuild-props.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSBuild properties for Microsoft.NET.Sdk (part 7 of 9)

## Runtime configuration properties

You can configure some runtime behaviors by specifying MSBuild properties in the project file of the app. For information about other ways of configuring runtime behavior, see Runtime configuration settings.

- AutoreleasePoolSupport
- ConcurrentGarbageCollection
- InvariantGlobalization
- PredefinedCulturesOnly
- RetainVMGarbageCollection
- ServerGarbageCollection
- ThreadPoolMaxThreads
- ThreadPoolMinThreads
- TieredCompilation
- TieredCompilationQuickJit
- TieredCompilationQuickJitForLoops
- TieredPGO
- UseWindowsThreadPool

### AutoreleasePoolSupport

The `AutoreleasePoolSupport` property configures whether each managed thread receives an implicit NSAutoreleasePool when running on a supported macOS platform. For more information, see `AutoreleasePool` for managed threads.

```xml
<PropertyGroup>
  <AutoreleasePoolSupport>true</AutoreleasePoolSupport>
</PropertyGroup>
```

### ConcurrentGarbageCollection

The `ConcurrentGarbageCollection` property configures whether background (concurrent) garbage collection is enabled. Set the value to `false` to disable background garbage collection. For more information, see Background GC.

```xml
<PropertyGroup>
  <ConcurrentGarbageCollection>false</ConcurrentGarbageCollection>
</PropertyGroup>
```

### InvariantGlobalization

The `InvariantGlobalization` property configures whether the app runs in *globalization-invariant* mode, which means it doesn't have access to culture-specific data. Set the value to `true` to run in globalization-invariant mode. For more information, see Invariant mode.

```xml
<PropertyGroup>
  <InvariantGlobalization>true</InvariantGlobalization>
</PropertyGroup>
```

### PredefinedCulturesOnly

In .NET 6 and later versions, the `PredefinedCulturesOnly` property configures whether apps can create cultures other than the invariant culture when globalization-invariant mode is enabled. The default is `true`. Set the value to `false` to allow creation of any new culture in globalization-invariant mode.

```xml
<PropertyGroup>
  <PredefinedCulturesOnly>false</PredefinedCulturesOnly>
</PropertyGroup>
```

For more information, see Culture creation and case mapping in globalization-invariant mode.

### RetainVMGarbageCollection

The `RetainVMGarbageCollection` property configures the garbage collector to put deleted memory segments on a standby list for future use or release them. Setting the value to `true` tells the garbage collector to put the segments on a standby list. For more information, see Retain VM.

```xml
<PropertyGroup>
  <RetainVMGarbageCollection>true</RetainVMGarbageCollection>
</PropertyGroup>
```

### ServerGarbageCollection

The `ServerGarbageCollection` property configures whether the application uses workstation garbage collection or server garbage collection. Set the value to `true` to use server garbage collection. For more information, see Workstation vs. server.

```xml
<PropertyGroup>
  <ServerGarbageCollection>true</ServerGarbageCollection>
</PropertyGroup>
```

### ThreadPoolMaxThreads

The `ThreadPoolMaxThreads` property configures the maximum number of threads for the worker thread pool. For more information, see Maximum threads.

```xml
<PropertyGroup>
  <ThreadPoolMaxThreads>20</ThreadPoolMaxThreads>
</PropertyGroup>
```

### ThreadPoolMinThreads

The `ThreadPoolMinThreads` property configures the minimum number of threads for the worker thread pool. For more information, see Minimum threads.

```xml
<PropertyGroup>
  <ThreadPoolMinThreads>4</ThreadPoolMinThreads>
</PropertyGroup>
```

### TieredCompilation

The `TieredCompilation` property configures whether the just-in-time (JIT) compiler uses tiered compilation. Set the value to `false` to disable tiered compilation. For more information, see Tiered compilation.

```xml
<PropertyGroup>
  <TieredCompilation>false</TieredCompilation>
</PropertyGroup>
```

### TieredCompilationQuickJit

The `TieredCompilationQuickJit` property configures whether the JIT compiler uses quick JIT. Set the value to `false` to disable quick JIT. For more information, see Quick JIT.

```xml
<PropertyGroup>
  <TieredCompilationQuickJit>false</TieredCompilationQuickJit>
</PropertyGroup>
```

### TieredCompilationQuickJitForLoops

The `TieredCompilationQuickJitForLoops` property configures whether the JIT compiler uses quick JIT on methods that contain loops. Set the value to `true` to enable quick JIT on methods that contain loops. For more information, see Quick JIT for loops.

```xml
<PropertyGroup>
  <TieredCompilationQuickJitForLoops>true</TieredCompilationQuickJitForLoops>
</PropertyGroup>
```

### TieredPGO

The `TieredPGO` property controls whether dynamic or tiered profile-guided optimization (PGO) is enabled. Set the value to `true` to enable tiered PGO. For more information, see Profile-guided optimization.

```xml
<PropertyGroup>
  <TieredPGO>true</TieredPGO>
</PropertyGroup>
```

### UseWindowsThreadPool

The `UseWindowsThreadPool` property configures whether thread pool thread management is delegated to the Windows thread pool (Windows only). The default value is `false`, in which case the .NET thread pool is used. For more information, see Windows thread pool.

```xml
<PropertyGroup>
  <UseWindowsThreadPool>true</UseWindowsThreadPool>
</PropertyGroup>
```

## Reference-related properties

The following MSBuild properties are documented in this section:

- AssetTargetFallback
- DisableImplicitFrameworkReferences
- DisableTransitiveFrameworkReferenceDownloads
- DisableTransitiveProjectReferences
- ManagePackageVersionsCentrally
- Restore-related properties
- UseMauiEssentials
- ValidateExecutableReferencesMatchSelfContained

### AssetTargetFallback

The `AssetTargetFallback` property lets you specify additional compatible framework versions for project references and NuGet packages. For example, if you specify a package dependency using `PackageReference` but that package doesn't contain assets that are compatible with your projects's `TargetFramework`, the `AssetTargetFallback` property comes into play. The compatibility of the referenced package is rechecked using each target framework that's specified in `AssetTargetFallback`. This property replaces the deprecated property `PackageTargetFallback`.

You can set the `AssetTargetFallback` property to one or more target framework versions.

```xml
<PropertyGroup>
  <AssetTargetFallback>net461</AssetTargetFallback>
</PropertyGroup>
```

### DisableImplicitFrameworkReferences

The `DisableImplicitFrameworkReferences` property controls implicit `FrameworkReference` items when targeting .NET Core 3.0 and later versions. When targeting .NET Core 2.1 or .NET Standard 2.0 and earlier versions, it controls implicit PackageReference items to packages in a metapackage. (A metapackage is a framework-based package that consists only of dependencies on other packages.) This property also controls implicit references such as `System` and `System.Core` when targeting .NET Framework.

Set this property to `true` to disable implicit FrameworkReference or PackageReference items. If you set this property to `true`, you can add explicit references to just the frameworks or packages you need.

```xml
<PropertyGroup>
  <DisableImplicitFrameworkReferences>true</DisableImplicitFrameworkReferences>
</PropertyGroup>
```

### DisableTransitiveFrameworkReferenceDownloads

Set the `DisableTransitiveFrameworkReferenceDownloads` property to `true` to avoid downloading extra runtime and targeting packs that aren't directly referenced by your project.

```xml
<PropertyGroup>
  <DisableTransitiveFrameworkReferenceDownloads>true</DisableTransitiveFrameworkReferenceDownloads>
</PropertyGroup>
```

### DisableTransitiveProjectReferences

The `DisableTransitiveProjectReferences` property controls implicit project references. Set this property to `true` to disable implicit `ProjectReference` items. Disabling implicit project references results in non-transitive behavior similar to the legacy project system.

When this property is `true`, it has a similar effect to that of setting `PrivateAssets="All"` on all of the dependencies of the depended-upon project.

If you set this property to `true`, you can add explicit references to just the projects you need.

```xml
<PropertyGroup>
  <DisableTransitiveProjectReferences>true</DisableTransitiveProjectReferences>
</PropertyGroup>
```

### ManagePackageVersionsCentrally

The `ManagePackageVersionsCentrally` property was introduced in .NET 7. By setting it to `true` in a *Directory.Packages.props* file in the root of your repository, you can manage common dependencies in your projects from one location. Add versions for common package dependencies using `PackageVersion` items in the *Directory.Packages.props* file. Then, in the individual project files, you can omit `Version` attributes from any `PackageReference` items that refer to centrally managed packages.

Example *Directory.Packages.props* file:

```xml
<PropertyGroup>
  <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
</PropertyGroup>
...
<ItemGroup>
  <PackageVersion Include="Microsoft.Extensions.Configuration" Version="9.0.0" />
</ItemGroup>
```

Individual project file:

```xml
<ItemGroup>
  <PackageReference Include="Microsoft.Extensions.Configuration" />
</ItemGroup>
```

For more information, see central package management (CPM).

### Restore-related properties

Restoring a referenced package installs all of its direct dependencies and all the dependencies of those dependencies. You can customize package restoration by specifying properties such as `RestorePackagesPath` and `RestoreIgnoreFailedSources`. For more information about these and other properties, see restore target.

```xml
<PropertyGroup>
  <RestoreIgnoreFailedSource>true</RestoreIgnoreFailedSource>
</PropertyGroup>
```

### UseMauiEssentials

Set the `UseMauiEssentials` property to `true` to declare an explicit reference to a project or package that depends on MAUI Essentials. This setting ensures that your project pulls in the correct known framework reference for MAUI Essentials. If your project references a project that uses MAUI Essentials but you don't set this property to `true`, you might encounter build warning `NETSDK1186`.

```xml
<PropertyGroup>
  <UseMauiEssentials>true</UseMauiEssentials>
</PropertyGroup>
```

### ValidateExecutableReferencesMatchSelfContained

The `ValidateExecutableReferencesMatchSelfContained` property can be used to disable errors related to executable project references. If .NET detects that a self-contained executable project references a framework-dependent executable project, or vice versa, it generates errors NETSDK1150 and NETSDK1151, respectively. To avoid these errors when the reference is intentional, set the `ValidateExecutableReferencesMatchSelfContained` property to `false`.

```xml
<PropertyGroup>
  <ValidateExecutableReferencesMatchSelfContained>false</ValidateExecutableReferencesMatchSelfContained>
</PropertyGroup>
```

### WindowsSdkPackageVersion

The `WindowsSdkPackageVersion` property can be used to override the version of the Windows SDK targeting package. This property was introduced in .NET 5, and replaces the use of the `FrameworkReference` item for this purpose.

```xml
<PropertyGroup>
  <WindowsSdkPackageVersion>10.0.19041.18</WindowsSdkPackageVersion>
</PropertyGroup>
```

> **Note:**
> We don't recommend overriding the Windows SDK version, because the Windows SDK targeting packages are included with the .NET 5+ SDK. Instead, to reference the latest Windows SDK package, update your version of the .NET SDK. This property should only be used in rare cases such as using preview packages or needing to override the version of C#/WinRT.

## Run-related properties

The following properties are used for launching an app with the `dotnet run` command:

- RunArguments
- RunWorkingDirectory

### RunArguments

The `RunArguments` property defines the arguments that are passed to the app when it's run.

```xml
<PropertyGroup>
  <RunArguments>-mode dryrun</RunArguments>
</PropertyGroup>
```

> **Tip:**
> You can specify additional arguments to be passed to the app by using the `--` option for `dotnet run`.

### RunWorkingDirectory

The `RunWorkingDirectory` property defines the working directory for the application process to be started in. It can be an absolute path or a path that's relative to the project directory. If you don't specify a directory, `OutDir` is used as the working directory.

```xml
<PropertyGroup>
  <RunWorkingDirectory>c:\temp</RunWorkingDirectory>
</PropertyGroup>
```
