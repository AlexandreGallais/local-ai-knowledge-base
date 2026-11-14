---
title: "Database Providers - EF Core (part 4 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/providers/index.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Database Providers - EF Core (part 4 of 4)

| FileContextCore                                                   | Stores data in files                                        | Morris Janatzek                                                | For development purposes                                                        | 3                 | readme                                                                                           |
| FileBaseContext                                                   | Store tables in files                                       | k.D.g                                                            | For development purposes                                                        | 8, 9, 10          | readme                                                                                               |
| EntityFrameworkCore.SqlServerCompact35      | SQL Server Compact 3.5                                      | Erik Ejlskov Jensen                                               | .NET Framework                                                                  | 2                 | wiki                          |
| EntityFrameworkCore.SqlServerCompact40      | SQL Server Compact 4.0                                      | Erik Ejlskov Jensen                                               | .NET Framework                                                                  | 2                 | wiki                          |
| EntityFrameworkCore.OpenEdge                         | Progress OpenEdge                                           | Alex Wiese                                                      |                                                                                 | 2                 | readme                                                                               |
| EFCore.Snowflake                                                 | Snowflake                                                   | Krzysztof Sielaff                                                 |                                                                                 | 8                 | readme                                                                                               |
| EFCore.Kusto                                                         | Azure Data Explorer (Kusto)                                 | Anas Ismail Khan                                                   |                                                                                 | 8                 | readme                                                                                                    |
| EntityFrameworkCore.Ydb                                    | YDB                                                         | YDB Team                                                    |                                                                                 | 9, 10             | website                                                                                      |
| DuckDB.EFCore                                                        | DuckDB                                                      | Denis Ivanov                                                 |                                                                                 | 10                | readme                                                                                           |
| DuckDB.EFCoreProvider                                        | DuckDB, DuckLake                                            | skuirrels                                                       |                                                                                 | 10                | readme                                                                                        |
| GraphBridge.EntityFrameworkCore                    | Neo4j 2026.09                                               | Jose Luis Latorre Millas                                           | Developer preview                                                               | 10                | docs                                                                                                                    |

## Adding a database provider to your application

Most database providers for EF Core are distributed as NuGet packages, and can be installed as follows:

## .NET CLI

```dotnetcli
dotnet add package provider_package_name
```

## Visual Studio

```powershell
install-package provider_package_name
```

***

Once installed, you will configure the provider in your `DbContext`, either in the `OnConfiguring` method or in the `AddDbContext` method if you are using a dependency injection container.
For example, the following line configures the SQL Server provider with the passed connection string:

```csharp
optionsBuilder.UseSqlServer(
    @"Server=(localdb)\mssqllocaldb;Database=MyDatabase;Trusted_Connection=True;");
```

Database providers can extend EF Core to enable functionality unique to specific databases. Some concepts are common to most databases, and are included in the primary EF Core components. Such concepts include expressing queries in LINQ, transactions, and tracking changes to objects once they are loaded from the database.
Some concepts are specific to a particular provider. For example, the SQL Server provider allows you to configure memory-optimized tables (a feature specific to SQL Server). Other concepts are specific to a class of providers.
For example, EF Core providers for relational databases build on the common `Microsoft.EntityFrameworkCore.Relational` library, which provides APIs for configuring table and column mappings, foreign key <example-value>, etc. Providers are usually distributed as NuGet packages.

> **Important:**
> When a new patch version of EF Core is released, it often includes updates to the `Microsoft.EntityFrameworkCore.Relational` package.
> When you add a relational database provider, this package becomes a transitive dependency of your application.
> But many providers are released independently from EF Core and may not be updated to depend on the newer patch version of that package.
> In order to make sure you will get all bug fixes, it is recommended that you add the patch version of `Microsoft.EntityFrameworkCore.Relational` as a direct dependency of your application.
