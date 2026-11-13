---
title: "What's new in .NET 6 (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-6.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET 6

.NET 6 delivers the final parts of the .NET unification plan that started with .NET 5. .NET 6 unifies the SDK, base libraries, and runtime across mobile, desktop, IoT, and cloud apps. In addition to this unification, the .NET 6 ecosystem offers:

- **Simplified development**: Getting started is easy. New language features in C# 10 reduce the amount of code you need to write. And investments in the web stack and minimal APIs make it easy to quickly write smaller, faster microservices.

- **Better performance**: .NET 6 is the fastest full stack web framework, which lowers compute costs if you're running in the cloud.

- **Ultimate productivity**: .NET 6 and Visual Studio 2022 provide hot reload, new git tooling, intelligent code editing, robust diagnostics and testing tools, and better team collaboration.

.NET 6 will be supported for three years as a long-term support (LTS) release.

*Preview* features are disabled by default. They are also not supported for use in production and may be removed in a future version. The new `System.Runtime.Versioning.RequiresPreviewFeaturesAttribute` is used to annotate preview APIs, and a corresponding analyzer alerts you if you're using these preview APIs.

.NET 6 is supported by Visual Studio 2022 and later versions.

This article does not cover all of the new features of .NET 6. To see all of the new features, and for further information about the features listed in this article, see the Announcing .NET 6 blog post.

## Performance

.NET 6 includes numerous performance improvements. This section lists some of the improvements—in FileStream, profile-guided optimization, and AOT compilation. For detailed information, see the Performance improvements in .NET 6 blog post.

### FileStream

The `System.IO.FileStream` type has been rewritten for .NET 6 to provide better performance and reliability on Windows. Now, `System.IO.FileStream` never blocks when created for asynchronous I/O on Windows. For more information, see the File IO improvements in .NET 6 blog post.

### Profile-guided optimization

Profile-guided optimization (PGO) is where the JIT compiler generates optimized code in terms of the types and code paths that are most frequently used. .NET 6 introduces *dynamic* PGO. Dynamic PGO works hand-in-hand with tiered compilation to further optimize code based on additional instrumentation that's put in place during tier 0. Dynamic PGO is disabled by default, but you can enable it with the `DOTNET_TieredPGO` environment variable. For more information, see JIT performance improvements.

### Crossgen2

.NET 6 introduces Crossgen2, the successor to Crossgen, which has been removed. Crossgen and Crossgen2 are tools that provide ahead-of-time (AOT) compilation to improve the startup time of an app. Crossgen2 is written in C# instead of C++, and can perform analysis and optimization that weren't possible with the previous version. For more information, see Conversation about Crossgen2.

## Arm64 support

The .NET 6 release includes support for macOS Arm64 (or "Apple Silicon") and Windows Arm64 operating systems, for both native Arm64 execution and x64 emulation. In addition, the x64 and Arm64 .NET installers now install side by side. For more information, see .NET Support for macOS 11 and Windows 11 for Arm64 and x64.

## Hot reload

*Hot reload* is a feature that lets you modify your app's source code and instantly apply those changes to your running app. The feature's purpose is to increase your productivity by avoiding app restarts between edits. Hot reload is available in Visual Studio 2022 and the `dotnet watch` command-line tool. Hot reload works with most types of .NET apps, and for C#, Visual Basic, and C++ source code. For more information, see the Hot reload blog post.

## .NET MAUI

.NET Multi-platform App UI (.NET MAUI) is still in *preview*, with a release candidate coming in the first quarter of 2022 and general availability (GA) in the second quarter of 2022. .NET MAUI makes it possible to build native client apps for desktop and mobile operating systems with a single codebase. For more information, see the Update on .NET Multi-platform App UI blog post.

## C# 10 and templates

C# 10 includes innovations such as `global using` directives, file-scoped namespace declarations, and record structs. For more information, see C# Language version history.

In concert with that work, the .NET SDK project templates for C# have been modernized to use some of the new language features:

- `async Main` method
- Top-level statements
- Target-typed new expressions
- Implicit `global using` directives
- File-scoped namespaces
- Nullable reference types

By adding these new language features to the project templates, new code starts with the features enabled. However, existing code isn't affected when you upgrade to .NET 6. For more information about these template changes, see the .NET SDK: C# project templates modernized blog post.

## F# and Visual Basic

F# 6 adds several improvements to the F# language and F# Interactive. For more information, see What's new in F# 6.

Visual Basic has improvements in the Visual Studio experience and Windows Forms project startup.

## SDK Workloads

To keep the size of the .NET SDK smaller, some components have been placed in new, optional *SDK workloads*. These components include .NET MAUI and Blazor WebAssembly AOT. If you use Visual Studio, it will take care of installing any SDK workloads that you need. If you use the .NET CLI, you can manage workloads using the new `dotnet workload` commands:

| Command | Description |
| - | - |
| dotnet workload search | Searches for available workloads. |
| dotnet workload install | Installs a specified workload. |
| dotnet workload uninstall | Removes a specified workload. |
| dotnet workload update | Updates installed workloads. |
| dotnet workload repair | Reinstalls all installed workloads to repair a broken installation. |
| dotnet workload list | Lists installed workloads. |

For more information, see Optional SDK workloads.

## System.Text.Json APIs

Many improvements have been made in `System.Text.Json` in .NET 6, such that it is now an "industrial strength" serialization solution.

### Source generator

.NET 6 adds a new source generator for `System.Text.Json`. Source generation works with `System.Text.Json.JsonSerializer` and can be configured in multiple ways. It can improve performance, reduce memory usage, and facilitate assembly trimming. For more information, see How to choose reflection or source generation in System.Text.Json and How to use source generation in System.Text.Json.

### Writeable DOM

A new, writeable document object model (DOM) has been added, which supplements the pre-existing read-only DOM. The new API provides a lightweight serialization alternative for cases when use of plain old CLR object (POCO) types isn't possible. It also allows you to efficiently navigate to a subsection of a large JSON tree and read an array or deserialize a POCO from that subsection. The following new types have been added to support the writeable DOM:

- `System.Text.Json.Nodes.JsonNode`
- `System.Text.Json.Nodes.JsonArray`
- `System.Text.Json.Nodes.JsonObject`
- `System.Text.Json.Nodes.JsonValue`

For more information, see JSON DOM choices.

### IAsyncEnumerable serialization

`System.Text.Json` now supports serialization and deserialization with `System.Collections.Generic.IAsyncEnumerable`1` instances. Asynchronous serialization methods enumerate any `System.Collections.Generic.IAsyncEnumerable`1` instances in an object graph and then serialize them as JSON arrays. For deserialization, the new method `System.Text.Json.JsonSerializer.DeserializeAsyncEnumerable``1(System.IO.Stream,System.Text.Json.JsonSerializerOptions,System.Threading.CancellationToken)` was added. For more information, see IAsyncEnumerable serialization.

### Other new APIs

New serialization interfaces for validation and defaulting values:

- `System.Text.Json.Serialization.IJsonOnDeserialized`
- `System.Text.Json.Serialization.IJsonOnDeserializing`
- `System.Text.Json.Serialization.IJsonOnSerialized`
- `System.Text.Json.Serialization.IJsonOnSerializing`

For more information, see Callbacks.

New property ordering attribute:

- `System.Text.Json.Serialization.JsonPropertyOrderAttribute`

  For more information, see Configure the order of serialized properties.

New method to write "raw" JSON:

- `System.Text.Json.Utf8JsonWriter.WriteRawValue*`

  For more information, see Write Raw JSON.

Synchronous serialization and deserialization to a stream:

- `System.Text.Json.JsonSerializer.Deserialize(System.IO.Stream,System.Type,System.Text.Json.JsonSerializerOptions)`
- `System.Text.Json.JsonSerializer.Deserialize(System.IO.Stream,System.Type,System.Text.Json.Serialization.JsonSerializerContext)`
- `System.Text.Json.JsonSerializer.Deserialize``1(System.IO.Stream,System.Text.Json.JsonSerializerOptions)`
- `System.Text.Json.JsonSerializer.Deserialize``1(System.IO.Stream,System.Text.Json.Serialization.Metadata.JsonTypeInfo{``0})`
- `System.Text.Json.JsonSerializer.Serialize(System.IO.Stream,System.Object,System.Type,System.Text.Json.JsonSerializerOptions)`
- `System.Text.Json.JsonSerializer.Serialize(System.IO.Stream,System.Object,System.Type,System.Text.Json.Serialization.JsonSerializerContext)`
- `System.Text.Json.JsonSerializer.Serialize``1(System.IO.Stream,``0,System.Text.Json.JsonSerializerOptions)`
- `System.Text.Json.JsonSerializer.Serialize``1(System.IO.Stream,``0,System.Text.Json.Serialization.Metadata.JsonTypeInfo{``0})`

New option to ignore an object when a reference cycle is detected during serialization:

- `System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles`

  For more information, see Ignore circular references.

For more information about serializing and deserializing with `System.Text.Json`, see JSON serialization and deserialization in .NET.

## HTTP/3

.NET 6 includes preview support for HTTP/3, a new version of HTTP. HTTP/3 solves some existing functional and performance challenges by using a new underlying connection protocol called QUIC. QUIC establishes connections more quickly, and connections are independent of the IP address, allowing mobile clients to roam between Wi-fi and cellular networks. For more information, see Use HTTP/3 with HttpClient.

## ASP.NET Core

ASP.NET Core includes improvements in minimal APIs, ahead-of-time (AOT) compilation for Blazor WebAssembly apps, and single-page apps. In addition, Blazor components can now be rendered from JavaScript and integrated with existing JavaScript based apps. For more information, see What's new in ASP.NET Core 6.

## OpenTelemetry

.NET 6 brings improved support for OpenTelemetry, which is a collection of tools, APIs, and SDKs that help you analyze your software's performance and behavior. APIs in the `System.Diagnostics.Metrics` namespace implement the OpenTelemetry Metrics API specification. For example, there are four instrument classes to support different metrics scenarios. The instrument classes are:

- `System.Diagnostics.Metrics.Counter`1`
- `System.Diagnostics.Metrics.Histogram`1`
- `System.Diagnostics.Metrics.ObservableCounter`1`
- `System.Diagnostics.Metrics.ObservableGauge`1`

## Security

.NET 6 adds preview support for two key security mitigations: Control-flow Enforcement Technology (CET) and "write exclusive execute" (W^X).

CET is an Intel technology available in some newer Intel and AMD processors. It adds capabilities to the hardware that protect against some control-flow hijacking attacks. .NET 6 provides support for CET for Windows x64 apps, and you must explicitly enable it. For more information, see .NET 6 compatibility with Intel CET shadow stacks.

W^X is available all operating systems with .NET 6 but only enabled by default on Apple Silicon. W^X blocks the simplest attack path by disallowing memory pages to be writeable and executable at the same time.

## IL trimming

Trimming of self-contained deployments is improved. In .NET 5, only unused assemblies were trimmed. .NET 6 adds trimming of unused types and members too. In addition, trim warnings, which alert you to places where trimming may remove code that's used at runtime, are now *enabled* by default. For more information, see Trim self-contained deployments and executables.

## Code analysis

The .NET 6 SDK includes a handful of new code analyzers that concern API compatibility, platform compatibility, trimming safety, use of span in string concatenation and splitting, faster string APIs, and faster collection APIs. For a full list of new (and removed) analyzers, see Analyzer releases - .NET 6.

## Custom platform guards

The Platform compatibility analyzer recognizes the `Is<Platform>` methods in the `System.OperatingSystem` class, for example, `System.OperatingSystem.IsWindows`, as platform guards. To allow for custom platform guards, .NET 6 introduces two new attributes that you can use to annotate fields, properties, or methods with a supported or unsupported platform name:

- `System.Runtime.Versioning.SupportedOSPlatformGuardAttribute`
- `System.Runtime.Versioning.UnsupportedOSPlatformGuardAttribute`

## Windows Forms

`System.Windows.Forms.Application.SetDefaultFont(System.Drawing.Font)` is a new method in .NET 6 that sets the default font across your application.

The templates for C# Windows Forms apps have been updated to support `global using` directives, file-scoped namespaces, and nullable reference types. In addition, they include application bootstrap code, which reduces boilerplate code and allows the Windows Forms designer to render the design surface in the preferred font. The bootstrap code is a call to `ApplicationConfiguration.Initialize()`, which is a source-generated method that emits calls to other configuration methods, such as `System.Windows.Forms.Application.EnableVisualStyles`. Additionally, if you set a non-default font via the ApplicationDefaultFont MSBuild property, `ApplicationConfiguration.Initialize()` emits a call to `System.Windows.Forms.Application.SetDefaultFont(System.Drawing.Font)`.

For more information, see the What's new in Windows Forms blog post.

## Source build

The *source tarball*, which contains all the source for the .NET SDK, is now a product of the .NET SDK build. Other organizations, such as Red Hat, can build their own version of the SDK using this source tarball.

## Target framework monikers

Additional OS-specific target framework monikers (TFMs) have been added for .NET 6, for example, `net6.0-android`, `net6.0-ios`, and `net6.0-macos`. For more information, see OS-specific TFMs.
