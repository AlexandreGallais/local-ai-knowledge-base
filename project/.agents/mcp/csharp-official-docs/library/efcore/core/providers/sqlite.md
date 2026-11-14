---
title: "SQLite Database Provider - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/providers/sqlite/index.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# SQLite EF Core Database Provider

This database provider allows Entity Framework Core to be used with SQLite. The provider is maintained as part of the Entity Framework Core project.

## Install

Install the Microsoft.EntityFrameworkCore.Sqlite NuGet package.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

### Visual Studio

```powershell
Install-Package Microsoft.EntityFrameworkCore.Sqlite
```

***

## Supported Database Engines

* SQLite (3.46.1 onwards)

## Limitations

See SQLite Limitations for some important limitations of the SQLite provider.
