---
title: "Additional tools"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/additional-tools/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET additional tools overview

This section compiles a list of tools that support and extend the .NET functionality, in addition to the .NET CLI.

## .NET Uninstall Tool

The .NET Uninstall Tool (`dotnet-core-uninstall`) lets you clean up .NET SDKs and Runtimes on a system such that only the specified versions remain. A collection of options is available to specify which versions are uninstalled.

## .NET diagnostic tools

dotnet-counters is a performance monitoring tool for first-level health monitoring and performance investigation.

dotnet-dump provides a way to collect and analyze Windows and Linux core dumps without a native debugger.

dotnet-gcdump provides a way to collect GC (Garbage Collector) dumps of live .NET processes.

dotnet-monitor provides a way to monitor .NET applications in production environments and to collect diagnostic artifacts (for example, dumps, traces, logs, and metrics) on-demand or using automated rules for collecting under specified conditions.

dotnet-trace collects profiling data from your app that can help in scenarios where you need to find out what causes an app to run slow.

## .NET Install tool for extension authors

The .NET Install tool for extension authors is a Visual Studio Code extension that allows acquisition of the .NET runtime specifically for VS Code extension authors. This tool is intended to be leveraged in extensions that are written in .NET and require .NET to boot pieces of the extension (for example, a language server). The extension is not intended to be used directly by users to install .NET for development.

## WCF Web Service Reference tool

The WCF (Windows Communication Foundation) Web Service Reference tool is a Visual Studio connected service provider that made its debut in Visual Studio 2017 version 15.5. This tool retrieves metadata from a web service in the current solution, on a network location, or from a WSDL file. It generates a source file compatible with .NET, defining a WCF proxy class with methods that you can use to access the web service operations.

## WCF dotnet-svcutil tool

The WCF dotnet-svcutil tool is a .NET tool that retrieves metadata from a web service on a network location or from a WSDL file. It generates a source file compatible with .NET, defining a WCF proxy class with methods that you can use to access the web service operations.

The **dotnet-svcutil** tool is an alternative to the **WCF Web Service Reference** Visual Studio connected service provider, which first shipped with Visual Studio 2017 version 15.5. The **dotnet-svcutil** tool, as a .NET tool, is available on Linux, macOS, and Windows.

## WCF dotnet-svcutil.xmlserializer tool

On the .NET Framework, you can pre-generate a serialization assembly using the svcutil tool. The WCF dotnet-svcutil.xmlserializer tool provides similar functionality on .NET 5 (and .NET Core) and later versions. It pre-generates C# serialization code for the types in the client application that are used by the WCF Service Contract and that can be serialized by the `System.Xml.Serialization.XmlSerializer`. This improves the startup performance of XML serialization when serializing or deserializing objects of those types.

## XML Serializer Generator

Like the Xml Serializer Generator (sgen.exe) for the .NET Framework, the Microsoft.XmlSerializer.Generator NuGet package is the solution for libraries that target .NET 5 (and .NET Core) and later versions. It creates an XML serialization assembly for types contained in an assembly to improve the startup performance of XML serialization when serializing or de-serializing objects of those types using `System.Xml.Serialization.XmlSerializer`.

## Generating Self-Signed Certificates

You can use dotnet dev-certs to create self-signed certificates for development and testing scenarios.

## .NET code coverage tool

You can use dotnet-coverage to collect code coverage from any .NET process.

## .NET Install Manager

Use the .NET Install Manager to detect, uninstall, or update .NET installations on Windows to remediate devices flagged by software vulnerability scanners.
