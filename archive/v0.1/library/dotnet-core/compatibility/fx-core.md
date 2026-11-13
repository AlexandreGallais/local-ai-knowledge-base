---
title: "Breaking changes - .NET Framework to .NET Core (part 1 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/fx-core.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Breaking changes for migration from .NET Framework to .NET Core

If you're migrating an app from .NET Framework to .NET Core versions 1.0 through 3.1, the breaking changes listed in this article might affect you. Breaking changes are grouped by category, and within those categories, by the version of .NET Core in which they were introduced.

> **Note:**
> This article is not a complete list of breaking changes between .NET Framework and .NET Core. The most important breaking changes are added here as we become aware of them.

## Core .NET libraries

- Change in default value of UseShellExecute
- IDispatchImplAttribute API is removed
- UnauthorizedAccessException thrown by FileSystemInfo.Attributes
- Handling corrupted-process-state exceptions is not supported
- UriBuilder properties no longer prepend leading characters
- Process.StartInfo throws InvalidOperationException for processes you didn't start

### .NET 8

IDispatchImplAttribute API is removed

### Change in default value of UseShellExecute

`System.Diagnostics.ProcessStartInfo.UseShellExecute` has a default value of `false` on .NET Core. On .NET Framework, its default value is `true`.

#### Change description

`System.Diagnostics.Process.Start*` lets you launch an application directly, for example, with code such as `Process.Start("mspaint.exe")` that launches Paint. It also lets you indirectly launch an associated application if `System.Diagnostics.ProcessStartInfo.UseShellExecute` is set to `true`. On .NET Framework, the default value for `System.Diagnostics.ProcessStartInfo.UseShellExecute` is `true`, meaning that code such as `Process.Start("mytextfile.txt")` would launch Notepad, if you've associated *.txt* files with that editor. To prevent indirectly launching an app on .NET Framework, you must explicitly set `System.Diagnostics.ProcessStartInfo.UseShellExecute` to `false`. On .NET Core, the default value for `System.Diagnostics.ProcessStartInfo.UseShellExecute` is `false`. This means that, by default, associated applications are not launched when you call `Process.Start`.

The following properties on `System.Diagnostics.ProcessStartInfo` are only functional when `System.Diagnostics.ProcessStartInfo.UseShellExecute` is `true`:

- `System.Diagnostics.ProcessStartInfo.CreateNoWindow`
- `System.Diagnostics.ProcessStartInfo.ErrorDialog`
- `System.Diagnostics.ProcessStartInfo.Verb`
- `System.Diagnostics.ProcessStartInfo.WindowStyle`.

This change was introduced in .NET Core for performance reasons. Typically, `System.Diagnostics.Process.Start*` is used to launch an application directly. Launching an app directly does not need to involve the Windows shell and incur the associated performance cost. To make this default case faster, .NET Core changes the default value of `System.Diagnostics.ProcessStartInfo.UseShellExecute` to `false`. You can opt in to the slower path if you need it.

#### Version introduced

2.1

> **Note:**
> In earlier versions of .NET Core, `UseShellExecute` was not implemented for Windows.

#### Recommended action

If your app relies on the old behavior, call `System.Diagnostics.Process.Start(System.Diagnostics.ProcessStartInfo)` with `System.Diagnostics.ProcessStartInfo.UseShellExecute` set to `true` on the `System.Diagnostics.ProcessStartInfo` object.

#### Category

Core .NET libraries

#### Affected APIs

- `System.Diagnostics.Process.Start*`
- `System.Diagnostics.ProcessStartInfo`

***

### UnauthorizedAccessException thrown by FileSystemInfo.Attributes

In .NET Core, an `System.UnauthorizedAccessException` is thrown when the caller attempts to set a file attribute value but doesn't have write permission.

#### Change description

In .NET Framework, an `System.ArgumentException` is thrown when the caller attempts to set a file attribute value in `System.IO.FileSystemInfo.Attributes` but doesn't have write permission. In .NET Core, an `System.UnauthorizedAccessException` is thrown instead. (In .NET Core, an `System.ArgumentException` is still thrown if the caller attempts to set an invalid file attribute.)

#### Version introduced

1.0

#### Recommended action

Modify any `catch` statements to catch an `System.UnauthorizedAccessException` instead of, or in addition to, an `System.ArgumentException`, as necessary.

#### Category

Core .NET libraries

#### Affected APIs

- `System.IO.FileSystemInfo.Attributes`

***

### Handling corrupted state exceptions is not supported

Handling corrupted-process-state exceptions in .NET Core is not supported.

#### Change description

Previously, corrupted-process-state exceptions could be caught and handled by managed code exception handlers, for example, by using a try-catch statement in C#.

Starting in .NET Core 1.0, corrupted-process-state exceptions cannot be handled by managed code. The common language runtime doesn't deliver corrupted-process-state exceptions to managed code.

#### Version introduced

1.0

#### Recommended action

Avoid the need to handle corrupted-process-state exceptions by addressing the situations that lead to them instead. If it's absolutely necessary to handle corrupted-process-state exceptions, write the exception handler in C or C++ code.

#### Category

Core .NET libraries

#### Affected APIs

- `System.Runtime.ExceptionServices.HandleProcessCorruptedStateExceptionsAttribute`
- legacyCorruptedStateExceptionsPolicy element

***

### UriBuilder properties no longer prepend leading characters

`System.UriBuilder.Fragment` no longer prepends a leading `#` character and `System.UriBuilder.Query` no longer prepends a leading `?` character when one is already present.

#### Change description

In .NET Framework, the `System.UriBuilder.Fragment` and `System.UriBuilder.Query` properties always prepend a `#` or `?` character, respectively, to the value being stored. This behavior can result in multiple `#` or `?` characters in the stored value if the string already contains one of these leading characters. For example, the value of `System.UriBuilder.Fragment` might become `##main`.

Starting in .NET Core 1.0, these properties no longer prepend the `#` or `?` characters to the stored value if one is already present at the beginning of the string.

#### Version introduced

1.0

#### Recommended action

You no longer need to explicitly remove any of these leading characters when setting the property values. This is especially useful when you're appending values, because you no longer have to remove the leading `#` or `?` each time you append.

For example, the following code snippet shows the behavior difference between .NET Framework and .NET Core.

```csharp
var builder = new UriBuilder();
builder.Query = "one=1";
builder.Query += "&two=2";
builder.Query += "&three=3";
builder.Query += "&four=4";

Console.WriteLine(builder.Query);
```

- In .NET Framework, the output is `????one=1&two=2&three=3&four=4`.
- In .NET Core, the output is `?one=1&two=2&three=3&four=4`.

#### Category

Core .NET libraries

#### Affected APIs

- `System.UriBuilder.Fragment`
- `System.UriBuilder.Query`

***

### Process.StartInfo throws InvalidOperationException for processes you didn't start

Reading the `System.Diagnostics.Process.StartInfo` property for processes that your code didn't start throws an `System.InvalidOperationException`.

#### Change description

In .NET Framework, accessing the `System.Diagnostics.Process.StartInfo` property for processes that your code didn't start returns a dummy `System.Diagnostics.ProcessStartInfo` object. The dummy object contains default values for all of its properties except `System.Diagnostics.ProcessStartInfo.EnvironmentVariables`.

Starting in .NET Core 1.0, if you read the `System.Diagnostics.Process.StartInfo` property for a process that you didn't start (that is, by calling `System.Diagnostics.Process.Start*`), an `System.InvalidOperationException` is thrown.

#### Version introduced

1.0

#### Recommended action

Do not access the `System.Diagnostics.Process.StartInfo` property for processes that your code didn't start. For example, don't read this property for processes returned by `System.Diagnostics.Process.GetProcesses*`.

#### Category

Core .NET libraries

#### Affected APIs

- `System.Diagnostics.Process.StartInfo`

***

## Cryptography

- Boolean parameter of SignedCms.ComputeSignature is respected

### Boolean parameter of SignedCms.ComputeSignature is respected

In .NET Core, the Boolean `silent` parameter of the `System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner,System.Boolean)` method is respected. A PIN prompt is not shown if this parameter is set to `true`.

#### Change description

In .NET Framework, the `silent` parameter of the `System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner,System.Boolean)` method is ignored, and a PIN prompt is always shown if required by the provider. In .NET Core, the `silent` parameter is respected, and if set to `true`, a PIN prompt is never shown, even if it's required by the provider.

Support for CMS/PKCS #7 messages was introduced into .NET Core in version 2.1.

#### Version introduced

2.1

#### Recommended action

To ensure a PIN prompt appears if required, desktop applications should call `System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner,System.Boolean)` and set the Boolean parameter to `false`. The resulting behavior is the same as on .NET Framework regardless of whether the silent context is disabled there.

#### Category

Cryptography

#### Affected APIs

- `System.Security.Cryptography.Pkcs.SignedCms.ComputeSignature(System.Security.Cryptography.Pkcs.CmsSigner,System.Boolean)`

***

## MSBuild

- Resource manifest file name change

### Resource manifest file name change

Starting in .NET Core 3.0, in the default case, MSBuild generates a different manifest file name for resource files.

#### Version introduced

3.0

#### Change description

Prior to .NET Core 3.0, if no `LogicalName`, `ManifestResourceName`, or `DependentUpon` metadata was specified for an `EmbeddedResource` item in the project file, MSBuild generated a manifest file name in the pattern `<RootNamespace>.<ResourceFilePathFromProjectRoot>.resources`. If `RootNamespace` is not defined in the project file, it defaults to the project name. For example, the generated manifest name for a resource file named *Form1.resx* in the root project directory was *MyProject.Form1.resources*.

Starting in .NET Core 3.0, if a resource file is colocated with a source file of the same name (for example, *Form1.resx* and *Form1.cs*), MSBuild uses type information from the source file to generate the manifest file name in the pattern `<Namespace>.<ClassName>.resources`. The namespace and class name are extracted from the first type in the colocated source file. For example, the generated manifest name for a resource file named *Form1.resx* that's colocated with a source file named *Form1.cs* is *MyNamespace.Form1.resources*. The key thing to note is that the first part of the file name is different to prior versions of .NET Core (*MyNamespace* instead of *MyProject*).

> **Note:**
> If you have `LogicalName`, `ManifestResourceName`, or `DependentUpon` metadata specified on an `EmbeddedResource` item in the project file, then this change does not affect that resource file.

This breaking change was introduced with the addition of the `EmbeddedResourceUseDependentUponConvention` property to .NET Core projects. By default, resource files aren't explicitly listed in a .NET Core project file, so they have no `DependentUpon` metadata to specify how to name the generated *.resources* file. When `EmbeddedResourceUseDependentUponConvention` is set to `true`, which is the default, MSBuild looks for a colocated source file and extracts a namespace and class name from that file. If you set `EmbeddedResourceUseDependentUponConvention` to `false`, MSBuild generates the manifest name according to the previous behavior, which combines `RootNamespace` and the relative file path.

#### Recommended action

In most cases, no action is required on the part of the developer, and your app should continue to work. However, if this change breaks your app, you can either:

- Change your code to expect the new manifest name.

- Opt out of the new naming convention by setting `EmbeddedResourceUseDependentUponConvention` to `false` in your project file.

  ```xml
  <PropertyGroup>
    <EmbeddedResourceUseDependentUponConvention>false</EmbeddedResourceUseDependentUponConvention>
  </PropertyGroup>
  ```

#### Category

MSBuild

#### Affected APIs

N/A

***

## Networking

- WebClient.CancelAsync doesn't always cancel immediately

### WebClient.CancelAsync doesn't always cancel immediately

Starting in .NET Core 2.0, calling `System.Net.WebClient.CancelAsync` doesn't cancel the request immediately if the response has started to fetch.

#### Change description

Previously, calling `System.Net.WebClient.CancelAsync` canceled the request immediately. Starting in .NET Core 2.0, calling `System.Net.WebClient.CancelAsync` cancels the request immediately only if the response hasn't started fetching. If the response has started to fetch, the request is cancelled only after a complete response is read.

This change was implemented because the `System.Net.WebClient` API is deprecated in favor of `System.Net.Http.HttpClient`.

#### Version introduced

2.0

#### Recommended action

Use the `System.Net.Http.HttpClient` class instead of `System.Net.WebClient`, which is deprecated.

#### Category

Networking

#### Affected APIs

- `System.Net.WebClient.CancelAsync`

***
