---
title: "What's new in .NET Standard"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/whats-new/whats-new-in-dotnet-standard.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET Standard

.NET Standard is a formal specification that defines a versioned set of APIs that must be available on .NET implementations that comply with that version of the standard. .NET Standard is targeted at library developers. A library that targets a .NET Standard version can be used on any .NET implementation that supports that version of the standard.

.NET Standard is included with the .NET SDK. It's also included with Visual Studio if you select the .NET workload.

.NET Standard 2.1 is the last version of .NET Standard that will be released. For more information, see .NET 5+ and .NET Standard.

## Supported .NET implementations

.NET Standard 2.1 is supported by the following .NET implementations:

- .NET Core 3.0 or later (including .NET 5 and later)
- Mono 6.4 or later

.NET Standard 2.0 is supported by the following .NET implementations:

- .NET Core 2.0 or later (including .NET 5 and later)
- .NET Framework 4.6.1 or later
- Mono 5.4 or later
- Universal Windows Platform 10.0.16299 or later

## What's new in .NET Standard 2.1

.NET Standard 2.1 adds many APIs to the standard. Some of them are new APIs, and others are existing APIs that help to converge the .NET implementations even further. For a list of the APIs that have been added to .NET Standard 2.1, see .NET Standard 2.1 vs 2.0.

For more information, see the Announcing .NET Standard 2.1 blog post.

## What's new in .NET Standard 2.0

.NET Standard 2.0 includes the following new features.

### A vastly expanded set of APIs

Through version 1.6, .NET Standard included a comparatively small subset of APIs. Among those excluded were many APIs that were commonly used in .NET Framework. This complicates development, since it requires that developers find suitable replacements for familiar APIs when they develop applications and libraries that target multiple .NET implementations. .NET Standard 2.0 addresses this limitation by adding over 20,000 more APIs than were available in  the previous version of the standard, .NET Standard 1.6. For a list of the APIs that have been added to .NET Standard 2.0, see .NET Standard 2.0 vs 1.6.

Some of the additions to the `System` namespace in .NET Standard 2.0 include:

- Support for the `System.AppDomain` class.
- Better support for working with arrays from additional members in the `System.Array` class.
- Better support for working with attributes from additional members in the `System.Attribute` class.
- Better calendar support and additional formatting options for `System.DateTime` values.
- Additional `System.Decimal` rounding functionality.
- Additional functionality in the `System.Environment` class.
- Enhanced control over the garbage collector through the `System.GC` class.
- Enhanced support for string comparison, enumeration, and normalization in the `System.String` class.
- Support for daylight saving adjustments and transition times in the `System.TimeZoneInfo.AdjustmentRule` and `System.TimeZoneInfo.TransitionTime` classes.
- Significantly enhanced functionality in the `System.Type` class.
- Better support for deserialization of exception objects by adding an exception constructor with `System.Runtime.Serialization.SerializationInfo` and `System.Runtime.Serialization.StreamingContext` parameters.

### Support for .NET Framework libraries

Many libraries target .NET Framework rather than .NET Standard. However, most of the calls in those libraries are to APIs that are included in .NET Standard 2.0. Starting with .NET Standard 2.0, you can access .NET Framework libraries from a .NET Standard library by using a compatibility shim. This compatibility layer is transparent to developers; you don't have to do anything to take advantage of .NET Framework libraries.

The single requirement is that the APIs called by the .NET Framework class library must be included in .NET Standard 2.0.

### Support for Visual Basic

You can now develop .NET Standard libraries in Visual Basic. Visual Studio 2019 and Visual Studio 2017 version 15.3 or later with the .NET Core workload installed include a .NET Standard Class Library template. For Visual Basic <example-value> who use other development tools and environments, you can use the dotnet new command to create a .NET Standard Library project. For more information, see the Tooling support for .NET Standard libraries.

### Tooling support for .NET Standard libraries

With the release of .NET Core 2.0 and .NET Standard 2.0, both Visual Studio 2017 and the .NET CLI include tooling support for creating .NET Standard libraries.

If you install Visual Studio with the **.NET Core cross-platform development** workload, you can create a .NET Standard 2.0 library project by using a project template, as the following figure shows:

# C#

If you're using the .NET CLI, the following dotnet new command creates a class library project that targets .NET Standard 2.0:

```dotnetcli
dotnet new classlib
```

# Visual Basic

If you're using the .NET CLI, the following dotnet new command creates a class library project that targets .NET Standard 2.0:

```dotnetcli
dotnet new classlib -lang vb
```

---

## See also

- .NET Standard
- Introducing .NET Standard
- Download the .NET SDK
