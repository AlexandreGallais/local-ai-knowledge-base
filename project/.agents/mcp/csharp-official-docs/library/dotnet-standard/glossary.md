---
title: ".NET glossary (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/glossary.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET glossary

The primary goal of this glossary is to clarify meanings of selected terms and acronyms that appear frequently in the .NET documentation.

## AOT

Ahead-of-time compiler.

Similar to JIT, this compiler also translates IL to machine code. In contrast to JIT compilation, AOT compilation happens before the application is executed and is usually performed on a different machine. Because AOT tool chains don't compile at runtime, they don't have to minimize time spent compiling. That means they can spend more time optimizing. Since the context of AOT is the entire application, the AOT compiler also performs cross-module linking and whole-program analysis, which means that all references are followed and a single executable is produced.

See CoreRT and .NET Native.

## app model

A workload-specific API. Here are some examples:

- Aspire
- ASP.NET
- ASP.NET Web API
- Entity Framework (EF)
- Windows Presentation Foundation (WPF)
- Windows Communication Foundation (WCF)
- Windows Workflow Foundation (WF)
- Windows Forms (WinForms)

## ASP.NET

The original ASP.NET implementation that ships with the .NET Framework, also known as ASP.NET 4.x and ASP.NET Framework.

Sometimes ASP.NET is an umbrella term that refers to both the original ASP.NET and ASP.NET Core. The meaning that the term carries in any given instance is determined by the context. Refer to ASP.NET 4.x when you want to make it clear that you're not using ASP.NET to mean both implementations.

See ASP.NET documentation.

## ASP.NET Core

A cross-platform, high-performance, open-source implementation of ASP.NET.

See ASP.NET Core documentation.

## assembly

A *.dll* or *.exe* file that can contain a collection of APIs that can be called by applications or other assemblies.

An assembly contains types such as interfaces, classes, structures, enumerations, and delegates. Assemblies in a project's *bin* folder are sometimes referred to as *binaries*. See also library.

## BCL

Base Class Library.

A set of libraries that comprise the System.\* (and to a limited extent Microsoft.\*) namespaces. The BCL is a general purpose, lower-level framework that higher-level application frameworks, such as ASP.NET Core, build on.

The source code of the BCL for .NET is contained in the .NET runtime repository. Most of these BCL APIs are also available in .NET Framework, so you can think of this source code as a fork of the .NET Framework BCL source code.

The following terms often refer to the same collection of APIs that BCL refers to:

- core .NET libraries
- framework libraries
- runtime libraries
- shared framework

## CLR

Common Language Runtime.

The exact meaning depends on the context. Common Language Runtime usually refers to the runtime of .NET Framework or the runtime of .NET.

A CLR handles memory allocation and management. A CLR is also a virtual machine that not only executes apps but also generates and compiles code on-the-fly using a JIT compiler.

The CLR implementation for .NET Framework is Windows only.

The CLR implementation for .NET (also known as the Core CLR) is built from the same code base as the .NET Framework CLR. Originally, the Core CLR was the runtime of Silverlight and was designed to run on multiple platforms, specifically Windows and OS X. It's still a cross-platform runtime, now including support for many Linux distributions.

See also runtime.

## Core CLR

The Common Language Runtime for .NET.

See CLR.

## CoreRT

In contrast to the CLR, CoreRT is not a virtual machine, which means it doesn't include the facilities to generate and run code on-the-fly because it doesn't include a JIT. It does, however, include the GC and the ability for runtime type identification (RTTI) and reflection. However, its type system is designed so that metadata for reflection isn't required. Not requiring metadata enables having an AOT tool chain that can link away superfluous metadata and (more importantly) identify code that the app doesn't use. CoreRT is in development.

See Intro to CoreRT and .NET Runtime Lab.

## cross-platform

The ability to develop and execute an application that can be used on multiple different operating systems, such as Linux, Windows, and iOS, without having to rewrite specifically for each one. This enables code reuse and consistency between applications on different platforms.

See platform.

## ecosystem

All of the runtime software, development tools, and community resources that are used to build and run applications for a given technology.

The term ".NET ecosystem" differs from similar terms such as ".NET stack" in its inclusion of third-party apps and libraries. Here's an example in a sentence:

- "The motivation behind .NET Standard was to establish greater uniformity in the .NET ecosystem."

## framework

In general, a comprehensive collection of APIs that facilitates development and deployment of applications that are based on a particular technology. In this general sense, ASP.NET Core and Windows Forms are examples of application frameworks. The words framework and library are often used synonymously.

The word "framework" has a different meaning in the following terms:

- framework libraries
- .NET Framework
- shared framework
- target framework
- TFM (target framework moniker)
- framework-dependent app

Sometimes "framework" refers to an implementation of .NET.

## framework libraries

Meaning depends on context. Might refer to the framework libraries for .NET, in which case it refers to the same libraries that BCL refers to. It might also refer to the ASP.NET Core framework libraries, which build on the BCL and provide additional APIs for web apps.

## GC

Garbage collector.

The garbage collector is an implementation of automatic memory management. The GC frees memory occupied by objects that are no longer in use.

See Garbage Collection.

## IL

Intermediate language.

Higher-level .NET languages, such as C#, compile down to a hardware-agnostic instruction set, which is called Intermediate Language (IL). IL is sometimes referred to as MSIL (Microsoft IL) or CIL (Common IL).

## JIT

Just-in-time compiler.

Similar to AOT, this compiler translates IL to machine code that the processor understands. Unlike AOT, JIT compilation happens on demand and is performed on the same machine that the code needs to run on. Since JIT compilation occurs during execution of the application, the compile time is part of the runtime. Thus, JIT compilers have to balance time spent optimizing code against the savings that the resulting code can produce. But a JIT knows the actual hardware and can free developers from having to ship different implementations.

## implementation of .NET

An implementation of .NET includes:

- One or more runtimes. Examples: CLR, CoreRT.
- A class library that implements a version of .NET Standard and can include additional APIs. Examples: the BCLs for .NET Framework and .NET.
- Optionally, one or more application frameworks. Examples: ASP.NET, Windows Forms, and WPF are included in .NET Framework and .NET.
- Optionally, development tools. Some development tools are shared among multiple implementations.

Examples of .NET implementations:

- .NET Framework
- .NET
- Universal Windows Platform (UWP)
- Mono

For more information, see .NET implementations.

## library

A collection of APIs that can be called by apps or other libraries. A .NET library is composed of one or more assemblies.

The words library and framework are often used synonymously.

## Mono

An open source, cross-platform .NET implementation that's used when a small runtime is required. It's the runtime that powered Xamarin applications (unsupported as of May 2024) on Android, Mac, iOS, tvOS, and watchOS. Mono focuses primarily on apps that require a small footprint.

It supports all of the currently published .NET Standard versions.

Historically, Mono implemented the larger API of the .NET Framework and emulated some of the most popular capabilities on Unix. It's sometimes used to run .NET applications that rely on those capabilities on Unix.

Mono is typically used with a just-in-time compiler, but it also features a full static compiler (ahead-of-time compilation) that is used on platforms like iOS.

For more information, see the Mono documentation.

## Native AOT

A deployment mode where the app is self-contained and is ahead-of-time compiled to native code at the time of publish. Native AOT apps don't use a JIT compiler at runtime. They can run on machines that don't have the .NET runtime installed.

For more information, see Native AOT deployment.

## .NET

*.NET* has two meanings, and the one that is intended depends on the context:

* *.NET* can be used as the umbrella term for .NET Standard and all .NET implementations and workloads.
* *.NET* more frequently refers to the cross-platform, high-performance, open-source implementation of .NET that used to be called .NET Core. It can also be referred to as *.NET 5 (and .NET Core) and later versions* or just *.NET 5+*.

For example, the first meaning is intended in phrases such as "implementations of .NET." The second meaning is intended in names such as .NET SDK and .NET CLI. In the absence of context that indicates the first meaning is intended, assume that the second meaning is intended.

Earlier versions of .NET are known as .NET Core 1 through 3.1. The version numbers skip 4, and the version that followed 3.1 is known as .NET 5, dropping "Core" from the name. Dropping "Core" was done to emphasize that this implementation of .NET is the one that is recommended for all new development. Skipping version 4 was done to help avoid confusing this newer implementation of .NET with the older implementation that is known as .NET Framework. The current version of .NET Framework is 4.8.1.

.NET is always fully capitalized, never ".Net".

See .NET documentation.

## .NET CLI

A cross-platform toolchain for developing applications and libraries for .NET. Also known as the *.NET Core CLI*.

See .NET CLI.

## .NET Core

See .NET.

## .NET Framework

An implementation of .NET that runs only on Windows. Includes the Common Language Runtime (CLR), the Base Class Library (BCL), and application framework libraries such as ASP.NET, Windows Forms, and WPF.

See .NET Framework Guide.

## .NET Native

A compiler tool chain that produces native code ahead-of-time (AOT), as opposed to just-in-time (JIT).

Compilation happens on the developer's machine similar to the way a C++ compiler and linker works. It removes unused code and spends more time optimizing it. It extracts code from libraries and merges them into the executable. The result is a single module that represents the entire app.

UWP is the application framework supported by .NET Native.

See .NET Native documentation.

## .NET SDK

A set of libraries and tools that enable developers to create applications and libraries for .NET. Also known as the *.NET Core SDK*.

Includes the .NET CLI for building apps, .NET libraries and runtime for building and running apps, and the dotnet executable (*dotnet.exe*) that runs CLI commands and runs applications.

See .NET SDK Overview.

## .NET Standard

A formal specification of .NET APIs that are available in each .NET implementation.

The .NET Standard specification is sometimes called a library. Because a library includes API implementations, not only specifications (interfaces), it's misleading to call .NET Standard a "library."

See .NET Standard.

## NGen

Native (image) generation.

You can think of this technology as a persistent JIT compiler. It usually compiles code on the machine where the code is executed, but compilation typically occurs at install time.

## package

A NuGet package—or just a package—is a *.zip* file with one or more assemblies of the same name along with additional metadata such as the author name.

The *.zip* file has a *.nupkg* extension and can contain assets, such as *.dll* files and *.xml* files, for use with multiple target frameworks and versions. When installed in an app or library, the appropriate assets are selected based on the target framework specified by the app or library. The assets that define the interface are in the *ref* folder, and the assets that define the implementation are in the *lib* folder.

## platform

An operating system and the hardware it runs on, such as Windows, macOS, Linux, iOS, and Android.

Here are examples of usage in sentences:

- ".NET Core is a cross-platform implementation of .NET."
- "PCL profiles represent Microsoft platforms, while .NET Standard is agnostic to platform."

Legacy .NET documentation sometimes uses ".NET platform" to mean either an implementation of .NET or the .NET stack including all implementations. Both of these usages tend to get confused with the primary (OS/hardware) meaning, so we try to avoid these usages.

"Platform" has a different meaning in the phrase "developer platform," which refers to software that provides tools and libraries for building and running apps. .NET is a cross-platform, open-source developer platform for building many different types of applications.

## POCO

A POCO—or a plain old class/CLR object—is a .NET data structure that contains only public properties or fields. A POCO shouldn't contain any other members, such as:

- methods
- events
- delegates

These objects are used primarily as data transfer objects (DTOs). A pure *POCO* won't inherit another object, or implement an interface. It's common for POCOs to be used with serialization.
