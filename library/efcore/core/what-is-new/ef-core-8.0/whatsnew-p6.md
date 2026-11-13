---
title: "What's New in EF Core 8 (part 6 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 8 (part 6 of 11)

## HierarchyId in .NET and EF Core

Azure SQL and SQL Server have a special data type called `hierarchyid` that is used to store hierarchical data. In this case, "hierarchical data" essentially means data that forms a tree structure, where each item can have a parent and/or children. Examples of such data are:

- An organizational structure
- A file system
- A set of tasks in a project
- A taxonomy of language terms
- A graph of links between Web pages

The database is then able to run queries against this data using its hierarchical structure. For example, a query can find ancestors and dependents of given items, or find all items at a certain depth in the hierarchy.

### Support in .NET and EF Core

Official support for the SQL Server `hierarchyid` type has only recently come to modern .NET platforms. This support is in the form of the Microsoft.SqlServer.Types NuGet package, which brings in low-level SQL Server-specific types. In this case, the low-level type is called `SqlHierarchyId`.

At the next level, a new Microsoft.EntityFrameworkCore.SqlServer.Abstractions package has been introduced, which includes a higher-level `HierarchyId` type intended for use in entity types.

> **Tip:**
> The `HierarchyId` type is more idiomatic to the norms of .NET than `SqlHierarchyId`, which is instead modeled after how .NET Framework types are hosted inside the SQL Server database engine.  `HierarchyId` is designed to work with EF Core, but it can also be used outside of EF Core in other applications. The `Microsoft.EntityFrameworkCore.SqlServer.Abstractions` package doesn't reference any other packages, and so has minimal impact on deployed application size and dependencies.

Use of `HierarchyId` for EF Core functionality such as queries and updates requires the Microsoft.EntityFrameworkCore.SqlServer.HierarchyId package. This package brings in `Microsoft.EntityFrameworkCore.SqlServer.Abstractions` and `Microsoft.SqlServer.Types` as transitive dependencies, and so is often the only package needed. Once the package is installed, use of `HierarchyId` is enabled by calling `UseHierarchyId` as part of the application's call to `UseSqlServer`. For example:

```csharp
options.UseSqlServer(
    connectionString,
    x => x.UseHierarchyId());
```

> **Note:**
> Unofficial support for `hierarchyid` in EF Core has been available for many years via the EntityFrameworkCore.SqlServer.HierarchyId package. This package has been maintained as a collaboration between the community and the EF team. Now that there is official support for `hierarchyid` in .NET, the code from this community package forms, with the permission of the original contributors, the basis for the official package described here. Many thanks to all those involved over the years, including @aljones, @cutig3r, @huan086, @kmataru, @mehdihaghshenas, and @vyrotek

### Modeling hierarchies

The `HierarchyId` type can be used for properties of an entity type. For example, assume we want to model the paternal family tree of some fictional halflings. In the entity type for `Halfling`, a `HierarchyId` property can be used to locate each halfling in the family tree.

```csharp
public class Halfling
{
    public Halfling(HierarchyId pathFromPatriarch, string name, int? yearOfBirth = null)
    {
        PathFromPatriarch = pathFromPatriarch;
        Name = name;
        YearOfBirth = yearOfBirth;
    }

    public int Id { get; private set; }
    public HierarchyId PathFromPatriarch { get; set; }
    public string Name { get; set; }
    public int? YearOfBirth { get; set; }
}
```

> **Tip:**
> The code shown here and in the examples below comes from HierarchyIdSample.cs.

> **Tip:**
> If desired, `HierarchyId` is suitable for use as a key property type.

In this case, the family tree is rooted with the patriarch of the family. Each halfling can be traced from the patriarch down the tree using its `PathFromPatriarch` property. SQL Server uses a compact binary format for these paths, but it is common to parse to and from a human-readable string representation when when working with code. In this representation, the position at each level is separated by a `/` character. For example, consider the family tree in the diagram below:

In this tree:

- Balbo is at the root of the tree, represented by `/`.
- Balbo has five children, represented by `/1/`, `/2/`, `/3/`, `/4/`, and `/5/`.
- Balbo's first child, Mungo, also has five children, represented by `/1/1/`, `/1/2/`, `/1/3/`, `/1/4/`, and `/1/5/`. Notice that the `HierarchyId` for Balbo (`/1/`) is the prefix for all his children.
- Similarly, Balbo's third child, Ponto, has two children, represented by `/3/1/` and `/3/2/`. Again the each of these children is prefixed by the `HierarchyId` for Ponto, which is represented as `/3/`.
- And so on down the tree...

The following code inserts this family tree into a database using EF Core:

```csharp
await AddRangeAsync(
    new Halfling(HierarchyId.Parse("/"), "Balbo", 1167),
    new Halfling(HierarchyId.Parse("/1/"), "Mungo", 1207),
    new Halfling(HierarchyId.Parse("/2/"), "Pansy", 1212),
    new Halfling(HierarchyId.Parse("/3/"), "Ponto", 1216),
    new Halfling(HierarchyId.Parse("/4/"), "Largo", 1220),
    new Halfling(HierarchyId.Parse("/5/"), "Lily", 1222),
    new Halfling(HierarchyId.Parse("/1/1/"), "Bungo", 1246),
    new Halfling(HierarchyId.Parse("/1/2/"), "Belba", 1256),
    new Halfling(HierarchyId.Parse("/1/3/"), "Longo", 1260),
    new Halfling(HierarchyId.Parse("/1/4/"), "Linda", 1262),
    new Halfling(HierarchyId.Parse("/1/5/"), "Bingo", 1264),
    new Halfling(HierarchyId.Parse("/3/1/"), "Rosa", 1256),
    new Halfling(HierarchyId.Parse("/3/2/"), "Polo"),
    new Halfling(HierarchyId.Parse("/4/1/"), "Fosco", 1264),
    new Halfling(HierarchyId.Parse("/1/1/1/"), "Bilbo", 1290),
    new Halfling(HierarchyId.Parse("/1/3/1/"), "Otho", 1310),
    new Halfling(HierarchyId.Parse("/1/5/1/"), "Falco", 1303),
    new Halfling(HierarchyId.Parse("/3/2/1/"), "Posco", 1302),
    new Halfling(HierarchyId.Parse("/3/2/2/"), "Prisca", 1306),
    new Halfling(HierarchyId.Parse("/4/1/1/"), "Dora", 1302),
    new Halfling(HierarchyId.Parse("/4/1/2/"), "Drogo", 1308),
    new Halfling(HierarchyId.Parse("/4/1/3/"), "Dudo", 1311),
    new Halfling(HierarchyId.Parse("/1/3/1/1/"), "Lotho", 1310),
    new Halfling(HierarchyId.Parse("/1/5/1/1/"), "Poppy", 1344),
    new Halfling(HierarchyId.Parse("/3/2/1/1/"), "Ponto", 1346),
    new Halfling(HierarchyId.Parse("/3/2/1/2/"), "Porto", 1348),
    new Halfling(HierarchyId.Parse("/3/2/1/3/"), "Peony", 1350),
    new Halfling(HierarchyId.Parse("/4/1/2/1/"), "Frodo", 1368),
    new Halfling(HierarchyId.Parse("/4/1/3/1/"), "Daisy", 1350),
    new Halfling(HierarchyId.Parse("/3/2/1/1/1/"), "Angelica", 1381));

await SaveChangesAsync();
```

> **Tip:**
> If needed, decimal values can be used to create new nodes between two existing nodes. For example, `/3/2.5/2/` goes between `/3/2/2/` and `/3/3/2/`.
