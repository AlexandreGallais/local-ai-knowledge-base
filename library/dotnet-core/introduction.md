---
title: "Introduction to .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/introduction.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Introduction to .NET

.NET is a free, cross-platform, open-source developer platform for building many kinds of applications. It can run programs written in multiple languages, with C# being the most popular. It relies on a high-performance runtime used in production by many high-scale apps.

To learn how to download .NET and start writing your first app, see Getting started.

The .NET platform is designed to deliver productivity, performance, security, and reliability. It provides automatic memory management via a garbage collector (GC). It's type-safe and memory-safe, because it uses a GC and strict language compilers. It offers concurrency via `async`/`await` and `Task` primitives. It includes a large set of libraries that have broad functionality and that are optimized for performance on multiple operating systems and chip architectures.

.NET has the following design points:

* **Productivity is full-stack** with runtime, libraries, languages, and tools all contributing to developer user experience.
* **Safe code** is the primary compute model, while unsafe code enables more manual optimizations.
* **Static and dynamic code** are both supported, enabling a broad set of distinct scenarios.
* **Native code interop and hardware intrinsics** are low cost and high-fidelity (raw API and instruction access).
* **Code is portable across platforms** (OS and chip architecture), while platform targeting enables specialization and optimization.
* **Adaptability across programming domains** (cloud, client, gaming) is enabled with specialized implementations of the general-purpose programming model.
* **Industry standards** like OpenTelemetry and gRPC are favored over bespoke solutions.

.NET is maintained collaboratively by Microsoft and a global community. Regular updates ensure users deploy secure and reliable applications to production environments.

## Components

.NET includes the following components:

- Runtime — executes application code.
- Libraries — provide utility functionality like JSON parsing.
- Compiler — compiles C# (and other languages) source code into (runtime) executable code.
- SDK and other tools — enable building and monitoring apps with modern workflows.
- App stacks — like ASP.NET Core and Windows Forms that enable writing apps.

The runtime, libraries, and languages are the pillars of the .NET stack. Higher-level components, like .NET tools, and app stacks, like ASP.NET Core, build on top of these pillars. C# is the primary programming language for .NET and much of .NET is written in C#.

C# is object-oriented and the runtime supports object orientation. C# requires garbage collection and the runtime provides a tracing garbage collector. The libraries (and also the app stacks) shape those capabilities into concepts and object models that enable developers to productively write algorithms in intuitive workflows.

The core libraries expose thousands of types, many of which integrate with and fuel the C# language. For example, C#’s `foreach` statement lets you enumerate arbitrary collections. Pattern-based optimizations enable collections like `List<T>` to be processed simply and efficiently. You can leave resource management up to garbage collection, but prompt cleanup is possible via `IDisposable` and direct language support in the `using` statement.

Support for doing multiple things at the same time is fundamental to practically all workloads. That could be client applications doing background processing while keeping the UI responsive, services handling many thousands of simultaneous requests, devices responding to a multitude of simultaneous stimuli, or high-powered machines parallelizing the processing of compute-intensive operations. Asynchronous programming support is a first-class feature of the C# programming language, which provides the `async` and `await` keywords that make it easy to write and compose asynchronous operations while still enjoying the full benefits of all the control flow constructs the language has to offer.

The type system offers significant breadth, catering somewhat equally to safety, descriptiveness, dynamism, and native interop. First and foremost, the type system enables an object-oriented programming model. It includes types, (single base class) inheritance, interfaces (including default method implementations), and virtual method dispatch to provide a sensible behavior for all the type layering that object orientation allows. Generic types are ubiquitous and let you specialize classes to one or more types.

The .NET runtime provides automatic memory management via a garbage collector. For any language, its memory management model is likely its most defining characteristic. This is true for .NET languages. .NET has a self-tuning, tracing GC. It aims to deliver "hands-off" use in the general case while offering configuration options for more extreme workloads. The current GC is the result of many years of investment and learnings from a multitude of workloads.

Value types and stack-allocated memory blocks offer more direct, low-level control over data and native platform interop, in contrast to .NET's GC-managed types. Most of the primitive types in .NET, like integer types, are value types, and users can define their own types with similar semantics. Value types are fully supported through .NET's generics system, meaning that generic types like `List<T>` can provide flat, no-overhead memory representations of value type collections.

Reflection is a "programs as data" paradigm, allowing one part of a program to dynamically query and invoke another, in terms of assemblies, types, and members. It's particularly useful for late-bound programming models and tools.

Exceptions are the primary error handling model in .NET. Exceptions have the benefit that error information does not need to be represented in method signatures or handled by every method. Proper exception handling is essential for application reliability. To prevent your app from crashing, you can intentionally handle expected exceptions in your code. A crashed app is more reliable and diagnosable than an app with undefined behavior.

App stacks, like ASP.NET Core and Windows Forms, build on and take advantage of low-level libraries, language, and runtime. The app stacks define the way that apps are constructed and their lifecycle of execution.

The SDK and other tools enable a modern developer experience, both on a developer desktop and for continuous integration (CI). The modern developer experience includes building, analyzing, and testing code. .NET projects can often be built by a single `dotnet build` command, which orchestrates restoring NuGet packages and building dependencies.

NuGet is the package manager for .NET. It contains hundreds of thousands of packages that implement functionality for many scenarios. A majority of apps rely on NuGet packages for some functionality. The NuGet Gallery is maintained by Microsoft.

## Free and open source

.NET is free, open source, and is a .NET Foundation project. .NET is maintained by Microsoft and the community on GitHub in several repositories.

.NET source and binaries are licensed with the MIT license. Other licenses apply on Windows.

## Support

.NET is supported by multiple organizations that work to ensure that .NET can run on multiple operating systems and is kept up to date. It can be used on Arm64, x64, and x86 architectures.

New versions of .NET are released annually in November, per the releases and support policies. It's updated monthly on Patch Tuesday (second Tuesday), typically at 10 AM Pacific time.

## .NET ecosystem

Multiple variants of .NET exist, each supporting a different type of app for both historical and technical reasons.

.NET implementations:

* **.NET (Core)** — Modern .NET. A cross-platform and open-source implementation of .NET, rethought for the cloud age while remaining significantly compatible. It's evolving and actively supported.
* **.NET Framework** — The original .NET. It provides access to the broad capabilities of Windows and Windows Server. It's actively supported, in maintenance.
* **Mono** — The original community and open-source .NET. A cross-platform implementation of .NET Framework.

## Next steps

* Choose a .NET tutorial
* Take a tour of C#
* Take a tour of F#
