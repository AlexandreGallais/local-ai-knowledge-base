---
title: ".NET glossary (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/glossary.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET glossary (part 2 of 2)

## runtime

In general, the execution environment for a managed program. The OS is part of the runtime environment but is not part of the .NET runtime. Here are some examples of .NET runtimes in this sense of the word:

- Common Language Runtime (CLR)
- .NET Native (for UWP)
- Mono runtime

The word "runtime" has a different meaning in some contexts:

- *.NET runtime* on the .NET 5 download page.

  You can download the *.NET runtime* or other runtimes, such as the *ASP.NET Core runtime*. A *runtime* in this usage is the set of components that must be installed on a machine to run a framework-dependent app on the machine. The .NET runtime includes the CLR and the .NET shared framework, which provides the BCL.

- *.NET runtime libraries*

  Refers to the same libraries that BCL refers to. However, other runtimes, such as the ASP.NET Core runtime, have different shared frameworks, with additional libraries that build on the BCL.

- Runtime Identifier (RID).

  *Runtime* here means the OS platform and CPU architecture that a .NET app runs on, for example: `linux-x64`.

- Sometimes "runtime" is used in the sense of an implementation of .NET, as in the following examples:

  - "The various .NET runtimes implement specific versions of .NET Standard. … Each .NET runtime version advertises the highest .NET Standard version it supports …"
  - "Libraries that are intended to run on multiple runtimes should target this framework." (referring to .NET Standard)

## shared framework

Meaning depends on context. The *.NET shared framework* refers to the libraries included in the .NET runtime. In this case, the *shared framework* for .NET refers to the same libraries that BCL refers to.

There are other shared frameworks. The *ASP.NET Core shared framework* refers to the libraries included in the ASP.NET Core runtime, which includes the BCL plus additional APIs for use by web apps.

For framework-dependent apps, the shared framework consists of libraries that are contained in assemblies installed in a folder on the machine that runs the app. For self-contained apps, the shared framework assemblies are included with the app.

## stack

A set of programming technologies that are used together to build and run applications.

"The .NET stack" refers to .NET Standard and all .NET implementations. The phrase "a .NET stack" can refer to one implementation of .NET.

## target framework

The collection of APIs that a .NET app or library relies on.

An app or library can target a version of .NET Standard (for example, .NET Standard 2.0), which is a specification for a standardized set of APIs across all .NET implementations. An app or library can also target a version of a specific .NET implementation, in which case it gets access to implementation-specific APIs.

For some target frameworks (for example, .NET Framework) the available APIs are defined by the assemblies that a .NET implementation installs on a system, which can include application framework APIs (for example, ASP.NET, WinForms). For package-based target frameworks, the framework APIs are defined by the packages installed in the app or library.

See Target Frameworks.

## TFM

Target framework moniker.

A standardized token <example-value> for specifying the target framework of a .NET app or library. Target frameworks are typically referenced by a short name, such as `net462`. Long-form TFMs (such as `.NETFramework,Version=4.6.2`) exist but aren't generally used to specify a target framework.

See Target Frameworks.

## UWP

Universal Windows Platform.

An implementation of .NET that is used for building touch-enabled Windows applications and software for the Internet of Things (IoT). It's designed to unify the different types of devices that you might want to target, including PCs, tablets, phones, and even the Xbox. UWP provides many services, such as a centralized app store, an execution environment (AppContainer), and a set of Windows APIs to use instead of Win32 (WinRT). Apps can be written in C++, C#, Visual Basic, and JavaScript. When using C# and Visual Basic, the .NET APIs are provided by .NET.

## workload

A type of app someone is building. More generic than app model. For example, at the top of every .NET documentation page, including this one, is a drop-down list for **Workloads**, which lets you switch to documentation for **Web**, **Mobile**, **Cloud**, **Cloud-native**, and **Desktop**.

In some contexts, *workload* refers to a collection of Visual Studio features that you can choose to install to support a particular type of app. For an example, see Configure Visual Studio workloads.

## See also

- .NET fundamentals
- .NET Framework Guide
- ASP.NET Overview
- ASP.NET Core Overview
