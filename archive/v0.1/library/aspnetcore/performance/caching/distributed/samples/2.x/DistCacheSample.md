---
title: "ASP.NET Core Distributed Cache Sample"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/caching/distributed/samples/2.x/DistCacheSample/README.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Distributed Cache Sample

This sample illustrates the use of a distributed cache. This sample demonstrates the scenario described in the Work with a distributed cache in ASP.NET Core topic.

In the `Production` environment, the sample app is configured to use a distributed SQL Server cache. To reconfigure the app to use a distributed Redis cache, change the preprocessor directive at the top of the `Startup.cs` file to use Redis (`#define Redis // SQLServer`). For more information, see Preprocessor directives in sample code.
