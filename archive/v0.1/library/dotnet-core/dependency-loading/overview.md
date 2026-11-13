---
title: "Dependency loading - .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/dependency-loading/overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dependency loading in .NET

Every .NET application has dependencies. Even the simple `hello world` app has dependencies on portions of the .NET class libraries.

Understanding the default assembly loading logic in .NET can help you troubleshoot typical deployment issues.

In some applications, dependencies are dynamically determined at runtime. In these situations, it's critical to understand how managed assemblies and unmanaged dependencies are loaded.

## AssemblyLoadContext

The `System.Runtime.Loader.AssemblyLoadContext` API is central to the .NET loading design. The Understanding AssemblyLoadContext article provides a conceptual overview of the design.

## Loading details

The loading algorithm details are covered briefly in several articles:

- Managed assembly loading algorithm
- Satellite assembly loading algorithm
- Unmanaged (native) library loading algorithm
- Default probing

## Create an app with plugins

The tutorial Create a .NET application with plugins describes how to create a custom AssemblyLoadContext. It uses an `System.Runtime.Loader.AssemblyDependencyResolver` to resolve the dependencies of the plugin. The tutorial correctly isolates the plugin's dependencies from the hosting application.

## Assembly unloadability

The How to use and debug assembly unloadability in .NET article is a step-by-step tutorial. It shows how to load a .NET application, execute it, and then unload it. The article also provides debugging tips.

## Collect detailed assembly loading information

The Collect detailed assembly loading information article describes how to collect detailed information about managed assembly loading in the runtime. It uses the dotnet-trace tool to capture assembly loader events in a trace of a running process.
