---
title: "Performance considerations for EF4, EF5, and EF6 - EF6 (part 1 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/performance/perf-whitepaper.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Performance considerations for EF 4, 5, and 6
By David Obando, Eric Dettinger and others

Published: April 2012

Last updated: May 2014

------------------------------------------------------------------------

## 1. Introduction

Object-Relational Mapping frameworks are a convenient way to provide an abstraction for data access in an object-oriented application. For .NET applications, Microsoft's recommended O/RM is Entity Framework. With any abstraction though, performance can become a concern.

This whitepaper was written to show the performance considerations when developing applications using Entity Framework, to give developers an idea of the Entity Framework internal algorithms that can affect performance, and to provide tips for investigation and improving performance in their applications that use Entity Framework. There are a number of good topics on performance already available on the web, and we've also tried pointing to these resources where possible.

Performance is a tricky topic. This whitepaper is intended as a resource to help you make performance related decisions for your applications that use Entity Framework. We have included some test metrics to demonstrate performance, but these metrics aren't intended as absolute indicators of the performance you will see in your application.

For practical purposes, this document assumes Entity Framework 4 is run under .NET 4.0 and Entity Framework 5 and 6 are run under .NET 4.5. Many of the performance improvements made for Entity Framework 5 reside within the core components that ship with .NET 4.5.

Entity Framework 6 is an out of band release and does not depend on the Entity Framework components that ship with .NET. Entity Framework 6 work on both .NET 4.0 and .NET 4.5, and can offer a big performance benefit to those who haven’t upgraded from .NET 4.0 but want the latest Entity Framework bits in their application. When this document mentions Entity Framework 6, it refers to the latest version available at the time of this writing: version 6.1.0.
