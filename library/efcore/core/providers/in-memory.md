---
title: "In-memory Database Provider - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/in-memory/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# EF Core In-Memory Database Provider

This database provider allows Entity Framework Core to be used with an in-memory database. While some users use the in-memory database for testing, this is discouraged. For more information on how to test EF Core applications, see the _Testing EF Core Applications_. The provider is maintained by Microsoft as part of the Entity Framework Core Project.

> **Warning:**
> The EF Core in-memory database is not designed for performance or robustness and should not be used outside of testing environments. It is not designed for production use.

> **Important:**
> New features are not being added to the in-memory database.

## Install

Install the Microsoft.EntityFrameworkCore.InMemory NuGet package.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.EntityFrameworkCore.InMemory
```

### Visual Studio

```powershell
Install-Package Microsoft.EntityFrameworkCore.InMemory
```

***

## Get Started

The following resources will help you get started with this provider.

* Testing with in-memory (not recommended)
* UnicornStore Sample Application Tests

## Supported Database Engines

In-process naive, non-performant, and non-persisted in-memory database. Not designed for production use.
