---
title: "What's new in .NET 5"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-5.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET 5

.NET 5 is the next major release of .NET Core following 3.1. This release was named .NET 5 instead of .NET Core 4 for two reasons:

- Version numbers 4.x were skipped to avoid confusion with .NET Framework 4.x.
- "Core" was dropped from the name to emphasize that this is the main implementation of .NET going forward. .NET 5 supports more types of apps and more platforms than .NET Core or .NET Framework.

ASP.NET Core 5.0 is based on .NET 5 but retains the name "Core" to avoid confusing it with ASP.NET MVC 5. Likewise, Entity Framework Core 5.0 retains the name "Core" to avoid confusing it with Entity Framework 5 and 6.

.NET 5 includes the following improvements and new features compared to .NET Core 3.1:

- C# updates
- F# updates
- Visual Basic <example-value>
- System.Text.Json new features
- Single file apps
- App trimming
- Windows Arm64 and Arm64 intrinsics
- Tooling support for dump debugging
- The runtime libraries are 80% annotated for nullable reference types
- Performance improvements:
  - Garbage Collection (GC)
  - System.Text.Json
  - System.Text.RegularExpressions
  - Async ValueTask pooling
  - Container size optimizations
  - Many more areas

## .NET 5 doesn't replace .NET Framework

.NET 5 and later versions are the main implementation of .NET going forward, but .NET Framework 4.x is still supported. There are no plans to port the following technologies from .NET Framework to .NET 5, but there are alternatives in .NET:

| Technology            | Recommended alternative                                                                         |
|-----------------------|-------------------------------------------------------------------------------------------------|
| Web Forms             | ASP.NET Core Blazor or Razor Pages |
| Windows Workflow (WF) | Elsa-Workflows                                   |

### Windows Communication Foundation

The original implementation of Windows Communication Foundation (WCF) was only supported on Windows. However, there's a client port available from the .NET Foundation. It's entirely open source, cross platform, and supported by Microsoft. The core NuGet packages are listed below:

- System.ServiceModel.Duplex
- System.ServiceModel.Federation
- System.ServiceModel.Http
- System.ServiceModel.NetTcp
- System.ServiceModel.Primitives
- System.ServiceModel.Security

The server components that complement the aforementioned client libraries are available through CoreWCF. As of April 2022, CoreWCF is officially supported by Microsoft. However, for an alternative to WCF, consider gRPC.

## .NET 5 doesn't replace .NET Standard

New application development can specify the `net5.0` Target Framework Moniker (TFM) for all project types, including class libraries. Sharing code between .NET 5 workloads is simplified: all you need is the `net5.0` TFM.

For .NET 5 apps and libraries, the `net5.0` TFM combines and replaces the `netcoreapp` and `netstandard` TFMs. However, if you plan to share code between .NET Framework, .NET Core, and .NET 5 workloads, you can do so by specifying `netstandard2.0` as your TFM. For more information, see .NET Standard.

## C# updates

Developers writing .NET 5 apps will have access to the latest C# version and features. .NET 5 is paired with C# 9, which brings many new features to the language. Here are a few highlights:

- **Records**: Reference types with value-based equality semantics and non-destructive mutation supported by a new `with` expression.
- **Relational pattern matching**: Extends pattern matching capabilities to relational operators for comparative evaluations and expressions, including logical patterns - new keywords `and`, `or`, and `not`.
- **Top-level statements**: As a means for accelerating the adoption and learning of C#, the `Main` method can be omitted, and an application as simple as the following example is valid:

   ```csharp
   System.Console.Write("Hello world!");
   ```

- **Function pointers**: Language constructs that expose the following intermediate language (IL) opcodes: `ldftn` and `calli`.

For more information on the available C# 9 features, see What's new in C# 9.

### Source generators

In addition to some of the highlighted new C# features, source generators are making their way into developer projects. Source generators allow code that runs during compilation to inspect your program and produce additional files that are compiled together with the rest of your code.

For more information on source generators, see Introducing C# source generators and C# source generator samples.

## F# updates

F# is the .NET functional programming language, and with .NET 5, developers have access to F# 5. One of the new features is interpolated strings, similar to interpolated strings in C#, and even JavaScript.

```fsharp
let name = "David"
let age = 36
let message = $"{name} is {age} years old."
```

In addition to basic <example-value> interpolation, there's typed interpolation. With typed interpolation, a given type must match the format specifier.

```fsharp
let name = "David"
let age = 36
let message = $"%s{name} is %d{age} years old."
```

This format is similar to the `sprintf` function that formats a string based on type-safe inputs.

For more information, see What's new in F# 5.

## Visual Basic <example-value>

There are no new language features for Visual Basic in .NET 5. However, with .NET 5, Visual Basic <example-value> is extended to:

| Description                            | `dotnet new` parameter |
|----------------------------------------|------------------------|
| Console Application                    | `console`              |
| Class library                          | `classlib`             |
| WPF Application                        | `wpf`                  |
| WPF Class library                      | `wpflib`               |
| WPF Custom Control Library             | `wpfcustomcontrollib`  |
| WPF User Control Library               | `wpfusercontrollib`    |
| Windows Forms (WinForms) Application   | `winforms`             |
| Windows Forms (WinForms) Class library | `winformslib`          |
| Unit Test Project                      | `mstest`               |
| NUnit 3 Test Project                   | `nunit`                |
| NUnit 3 Test Item                      | `nunit-test`           |
| xUnit Test Project                     | `xunit`                |

For more information on project templates from the .NET CLI, see `dotnet new`.

## System.Text.Json new features

There are new features in and for System.Text.Json:

- Preserve references and handle circular references
- Serialization extension methods on HttpClient
- Allow or write numbers in quotes
- Support immutable types and C# 9 Records
- Support non-public property accessors
- Support fields
- Conditionally ignore properties
- Support non-string-key <example-value>
- Allow custom converters to handle null
- Copy JsonSerializerOptions
- Create JsonSerializerOptions with web defaults

## See also

- The Journey to one .NET
- Performance improvements in .NET 5
- Download the .NET SDK
