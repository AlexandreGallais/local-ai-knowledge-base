---
title: "Runtime libraries overview"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/runtime-libraries-overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Runtime libraries overview

The .NET runtime has an expansive standard set of class libraries, known as runtime libraries, framework libraries, or the base class library (BCL). In addition, there are extensions to the runtime libraries, which are provided in NuGet packages.

These libraries provide implementations for many general and app-specific types, algorithms, and utility functionality.

## Runtime libraries

The runtime libraries provide the foundational types and utility functionality and are the base of all other .NET class libraries. An example is the `System.String` class, which provides APIs for working with strings. Another example is the serialization libraries.

## Extensions to the runtime libraries

Some libraries are provided in NuGet packages rather than as part of the runtime's shared framework. These libraries are often made available to apps that target downlevel .NET versions, such as .NET Framework, as well.

The following table shows some examples of package-provided libraries.

| NuGet package                   | Conceptual content                     |
|---------------------------------|----------------------------------------|
| `Microsoft.Extensions.AI` | AI |
| `Microsoft.Extensions.Configuration` | Configuration |
| `Microsoft.Extensions.DependencyInjection` | Dependency injection |
| `Microsoft.Extensions.FileSystemGlobbing` | File globbing |
| `Microsoft.Extensions.Hosting` | Generic Host |
| `Microsoft.Extensions.Http` | HTTP |
| `Microsoft.Extensions.Localization` | Localization |
| `Microsoft.Extensions.Logging` | Logging |

## See also

* Introduction to .NET
* Install .NET SDK or runtime
* Select the installed .NET SDK or runtime version to use
* Publish framework-dependent apps
