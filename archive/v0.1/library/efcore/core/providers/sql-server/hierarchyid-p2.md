---
title: "Microsoft SQL Server Database Provider - Hierarchical Data - EF Core (part 2 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/sql-server/hierarchyid.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Microsoft SQL Server Database Provider - Hierarchical Data - EF Core (part 2 of 4)

## Using HierarchyId in .NET and EF Core

At the lowest level, the Microsoft.SqlServer.Types NuGet package includes a type called `SqlHierarchyId`. While this type supports working hierarchyid values, it is a bit cumbersome to work with in LINQ.

At the next level, a new Microsoft.EntityFrameworkCore.SqlServer.Abstractions package has been introduced, which includes a higher-level `HierarchyId` type intended for use in entity types.

> **Tip:**
> The `HierarchyId` type is more idiomatic to the norms of .NET than `SqlHierarchyId`, which is instead modeled after how .NET Framework types are hosted inside the SQL Server database engine.  `HierarchyId` is designed to work with EF Core, but it can also be used outside of EF Core in other applications. The `Microsoft.EntityFrameworkCore.SqlServer.Abstractions` package doesn't reference any other packages, and so has minimal impact on deployed application size and dependencies.

Use of `HierarchyId` for EF Core functionality such as queries and updates requires the Microsoft.EntityFrameworkCore.SqlServer.HierarchyId package. This package brings in `Microsoft.EntityFrameworkCore.SqlServer.Abstractions` and `Microsoft.SqlServer.Types` as transitive dependencies, and so is often the only package needed.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.EntityFrameworkCore.SqlServer.HierarchyId
```
