---
title: "Prepare .NET libraries for trimming (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/deploying/trimming/prepare-libraries-for-trimming.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Prepare .NET libraries for trimming

The .NET SDK makes it possible to reduce the size of self-contained apps by trimming. Trimming removes unused code from the app and its dependencies. Not all code is compatible with trimming. .NET provides trim analysis warnings to detect patterns that might break trimmed apps. This article:

* Describes how to prepare libraries for trimming.
* Provides recommendations for resolving common trimming warnings.

## Prerequisites

.NET 8 SDK or later.

## Enable library trim warnings

Trim warnings in a library can be found with either of the following methods:

* Enabling project-specific trimming using the `IsTrimmable` property.
* Creating a trimming test app that uses the library and enabling trimming for the test app. It's not necessary to reference all the APIs in the library.

We recommend using both approaches. Project-specific trimming is convenient and shows trim warnings for one project, but relies on the references being marked trim-compatible to see all warnings. Trimming a test app is more work, but shows all warnings.

### Enable project-specific trimming

Set `<IsTrimmable>true</IsTrimmable>` in the project file.

```xml
<PropertyGroup>
	<IsTrimmable>true</IsTrimmable>
</PropertyGroup>
```
Setting the MSBuild property `IsTrimmable` to `true` marks the assembly as "trimmable" and enables trim warnings. "Trimmable" means the project:

* Is considered compatible with trimming.
* Shouldn't generate trim-related warnings when building. When used in a trimmed app, the assembly has its unused members trimmed in the final output.

The `IsTrimmable` property defaults to `true` when configuring a project as AOT-compatible with `<IsAotCompatible>true</IsAotCompatible>`. For more information, see AOT-compatibility analyzers.

To generate trim warnings without marking the project as trim-compatible, use `<EnableTrimAnalyzer>true</EnableTrimAnalyzer>` rather than `<IsTrimmable>true</IsTrimmable>`.

#### Verify referenced assemblies are trim-compatible

When you enable trim analysis for a library, you can optionally enable verification that all referenced assemblies are also annotated for trim compatibility by setting the `VerifyReferenceTrimCompatibility` property to `true`:

```xml
<PropertyGroup>
  <IsTrimmable>true</IsTrimmable>
  <VerifyReferenceTrimCompatibility>true</VerifyReferenceTrimCompatibility>
</PropertyGroup>
```

When this property is enabled, the analyzer warns about any referenced assemblies that don't have the `IsTrimmable` metadata. This helps ensure that all dependencies in your project are annotated for trim compatibility. The warning that's emitted is IL2125.

This verification is opt-in because:

- Not all trim-compatible libraries have been updated to include the `IsTrimmable` metadata.
- The warning can be noisy if you have many dependencies that work correctly with trimming but aren't explicitly marked as such.

Consider enabling this verification when you want to ensure that all your dependencies are explicitly marked as trim-compatible by their authors.

### Show all warnings with test app

To show all analysis warnings for a library, the trimmer must analyze the implementation of the library and of all dependencies the library uses.

When building and publishing a library:

* The implementations of the dependencies aren't available.
* The available reference assemblies don't have enough information for the trimmer to determine if they're compatible with trimming.

Because of the dependency limitations, a self-contained test app which uses the library and its dependencies must be created. The test app includes all the information the trimmer requires to issue warning on trim incompatibilities in:

* The library code.
* The code that the library references from its dependencies.

> **Note:**
> If the library has different behavior depending on the target framework, create a trimming test app for each of the target frameworks that support trimming. For example, if the library uses conditional compilation such as `#if NET7_0` to change behavior.

To create the trimming test app:

* Create a separate console application project.
* Add a reference to the library.
* Modify the project similar to the project shown below using the following list:

If library targets a TFM that is not trimmable, for example `net472` or `netstandard2.0`, there's no benefit to creating a trimming test app. Trimming is only supported for .NET 6 and later.

* Add `<PublishTrimmed>true</PublishTrimmed>`.
* Add a reference to the library project with `<ProjectReference Include="/Path/To/YourLibrary.csproj" />`.
* Specify the library as a trimmer root assembly with `<TrimmerRootAssembly Include="YourLibraryName" />`.
  * `TrimmerRootAssembly` ensures that every part of the library is analyzed. It tells the trimmer that this assembly is a "root". A "root" assembly means the trimmer analyzes every call in the library and traverses all code paths that originate from that assembly.

### .csproj file

```xml
﻿<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <PublishTrimmed>true</PublishTrimmed>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\MyLibrary\MyLibrary.csproj" />
    <TrimmerRootAssembly Include="MyLibrary" />
  </ItemGroup>

</Project>
```
Once the project file is updated, run `dotnet publish` with the target runtime identifier (RID).

```dotnetcli
dotnet publish -c Release -r <RID>
```

Follow the preceding pattern for multiple libraries. To see trim analysis warnings for more than one library at a time, add them all to the same project as `ProjectReference` and `TrimmerRootAssembly` items. Adding all the libraries to the same project with `ProjectReference` and `TrimmerRootAssembly` items warns about dependencies if ***any*** of the root libraries use a trim-unfriendly API in a dependency. To see warnings that have to do with only a particular library, reference that library only.

> **Note:**
> The analysis results depend on the implementation details of the dependencies. Updating to a new version of a dependency might introduce analysis warnings:

* If the new version added non-understood reflection patterns.
* Even if there were no API changes.
* Introducing trim analysis warnings is a breaking change when the library is used with `PublishTrimmed`.

## Target framework requirements

When preparing libraries for trimming, target the latest supported TFM. This helps you benefit from the latest analyzer improvements. At a minimum, target `net6.0` or later. This version is required for trim analysis warnings.

If your library also targets frameworks earlier than `net6.0` (such as `netstandard2.0`, or `net472`), multi-target to include `net6.0`. This ensures that apps targeting `net6.0` or later get a version of your library that supports trim analysis.

Use the `IsTargetFrameworkCompatible` MSBuild function to conditionally enable `IsTrimmable` for `net6.0` and later:

```xml
<PropertyGroup>
  <TargetFrameworks>netstandard2.0;net6.0;net10.0</TargetFrameworks>
  <IsTrimmable Condition="$([MSBuild]::IsTargetFrameworkCompatible('$(TargetFramework)', 'net6.0'))">true</IsTrimmable>
</PropertyGroup>
```

For more information, see Trimming may not be used with .NET Standard or .NET Framework.

## Resolve trim warnings

The preceding steps produce warnings about code that might cause problems when used in a trimmed app. The following examples show the most common warnings with recommendations for fixing them.

### RequiresUnreferencedCode

Consider the following code that uses `[RequiresUnreferencedCode]` to indicate that the specified method requires dynamic access to code that is not referenced statically, for example, through `System.Reflection`.

```csharp
public class MyLibrary
{
    public static void MyMethod()
    {
        // warning IL2026 :
        // MyLibrary.MyMethod: Using 'MyLibrary.DynamicBehavior'
        // which has [RequiresUnreferencedCode] can break functionality
        // when trimming app code.
        DynamicBehavior();
    }

    [RequiresUnreferencedCode(
        "DynamicBehavior is incompatible with trimming.")]
    static void DynamicBehavior()
    {
    }
}
```
The preceding highlighted code indicates the library calls a method that has explicitly been annotated as incompatible with trimming. To get rid of the warning, consider whether `MyMethod` needs to call `DynamicBehavior`. If so, annotate the caller `MyMethod` with `[RequiresUnreferencedCode]` which propagates the warning so that callers of `MyMethod` get a warning instead:

```csharp
public class MyLibrary
{
    [RequiresUnreferencedCode("Calls DynamicBehavior.")]
    public static void MyMethod()
    {
        DynamicBehavior();
    }

    [RequiresUnreferencedCode(
        "DynamicBehavior is incompatible with trimming.")]
    static void DynamicBehavior()
    {
    }
}
```
Once you have propagated up the attribute all the way to public API, apps calling the library:

* Get warnings only for public methods that aren't trimmable.
* Don't get warnings like `IL2104: Assembly 'MyLibrary' produced trim warnings`.

### DynamicallyAccessedMembers

```csharp
public class MyLibrary3
{
    static void UseMethods(Type type)
    {
        // warning IL2070: MyLibrary.UseMethods(Type): 'this' argument does not satisfy
        // 'DynamicallyAccessedMemberTypes.PublicMethods' in call to
        // 'System.Type.GetMethods()'.
        // The parameter 't' of method 'MyLibrary.UseMethods(Type)' doesn't have
        // matching annotations.
        foreach (var method in type.GetMethods())
        {
            // ...
        }
    }
}
```
In the preceding code, `UseMethods` is calling a reflection method that has a `[DynamicallyAccessedMembers]` requirement. The requirement states that the type's public methods are available. Satisfy the requirement by adding the same requirement to the parameter of `UseMethods`.

```csharp
static void UseMethods(
   // State the requirement in the UseMethods parameter.
   [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicMethods)] Type type)
{
    // ...
}
```
Now any calls to `UseMethods` produce warnings if they pass in values that don't satisfy the `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.PublicMethods` requirement. Similar to `[RequiresUnreferencedCode]`, once you have propagated up such warnings to public APIs, you're done.

In the following example, an unknown Type flows into the annotated method parameter. The unknown `Type` is from a field:

```csharp
static Type type;
static void UseMethodsHelper()
{
    // warning IL2077: MyLibrary.UseMethodsHelper(Type): 'type' argument does not satisfy
    // 'DynamicallyAccessedMemberTypes.PublicMethods' in call to
    // 'MyLibrary.UseMethods(Type)'.
    // The field 'System.Type MyLibrary::type' does not have matching annotations.
    UseMethods(type);
}
```
Similarly, here the problem is that the field `type` is passed into a parameter with these requirements. It's fixed by adding  `[DynamicallyAccessedMembers]` to the field. `[DynamicallyAccessedMembers]` warns about code that assigns incompatible values to the field. Sometimes this process continues until a public API is annotated, and other times it ends when a concrete type flows into a location with these requirements. For example:

```csharp
[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicMethods)]
static Type type;

static void UseMethodsHelper()
{
    MyLibrary.type = typeof(System.Tuple);
}
```
In this case, the trim analysis keeps public methods of `System.Tuple`, and produces further warnings.

## Recommendations

* ***Avoid*** reflection when possible. When using reflection, minimize reflection scope so that it's reachable only from a small part of the library.
* Annotate code with `DynamicallyAccessedMembers` to statically express the trimming requirements when possible.
* Consider reorganizing code to make it follow an analyzable pattern that can be annotated with `DynamicallyAccessedMembers`
* When code is incompatible with trimming, annotate it with `RequiresUnreferencedCode` and propagate this annotation to callers until the relevant public APIs are annotated.
* Avoid using code that uses reflection in a way not understood by the static analysis. For example, reflection in static constructors should be avoided. Using statically unanalyzable reflection in static constructors result in the warning propagating to all members of the class.
* Avoid annotating virtual methods or interface methods. Annotating virtual or interface methods requires all overrides to have matching annotations.
* If an API is mostly trim-incompatible, alternative coding approaches to the API might need to be considered. A common example is reflection-based serializers. In these cases, consider adopting other technology like source generators to produce code that is more easily statically analyzed. For example, see How to use source generation in System.Text.Json.
