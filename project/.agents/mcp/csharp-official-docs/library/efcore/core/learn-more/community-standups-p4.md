---
title: ".NET Data Community Standups (part 4 of 8)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/learn-more/community-standups.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# .NET Data Community Standups (part 4 of 8)

## 2023

### November 29: A tour of what's new in EF8

Arthur and Shay from the EF team are joined by members of the community to demo some of the key new features available now in Entity Framework Core 8. For example:

- Primitive collections
- Complex types
- HierarchyId in .NET and EF Core
- Raw SQL queries for unmapped types
- Lazy-loading enhancements
- Lookup tracked entities by PK/AK/FK
- DateOnly/TimeOnly supported on SQL Server
- Sentinel values and database defaults

Featuring:

- Erik Ejlskov Jensen (Special guest)
- Julie Lerman (Special guest)
- Jeremy Likness (Alumnus)
- Diego Vega (Alumnus)
- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Brice Lambson (Host)

Links:

- Blog: EF8 release post on the .NET Blog
- Docs: What's new in EF8, with runnable samples
- Video: Entity Framework Core 8: Improved JSON, queryable collections, and more… | .NET Conf 2023
- Docs: EF Core daily builds

### October 18: Introducing the MongoDB provider for EF Core

In this episode of the .NET Data Community Standup, we talk to the engineers from MongoDB who have just released the first preview of an official EF Core provider. The EF team has collaborated closely with MongoDB on this provider, which now joins the Cosmos provider as flagship document database providers for EF Core. We will demo the provider, talk about what it can and cannot do, and of course answer all your questions!

Featuring:

- James Kovacs (Special guest)
- Damien Guard (Special guest)
- Patrick Gilfether (Special guest)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Blog: MongoDB Provider for Entity Framework Core Now Available in Public Preview
- Blog: Trying out MongoDB with EF Core using Testcontainers
- Docs: What's new in EF8, with runnable samples
- Video: Entity Framework Core 8: Improved JSON, queryable collections, and more… | .NET Conf 2023
- Docs: EF Core daily builds

### October 4: Size doesn't matter: Smaller features in EF8

In addition to the big features such as primitive collections and complex types, EF8 contains many smaller features and minor improvements. In this session, Arthur and Shay from the EF team will take a look at a few of these smaller features, including:

- Sentinels to control when the database generates a value
- Massive performance improvements for IN and EXISTS in LINQ queries
- DateOnly/TimeOnly on SQL Server
- Raw SQL queries for unmapped types
- More flexible ExecuteUpdate
- Numeric SQL rowversion properties
- Cleaner SQL through parentheses elimination

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### September 20: Complex types as value objects in EF8

The Entity Framework team returns with new community standups after a summer break heads-down working on EF8. In this session, we’ll look at the new “complex types” feature in EF8. Complex types do not have a key or any identity outside of the object’s value, but can still be deconstructed by property to map to different columns in the database. This allows either reference or value types to be used as DDD value objects with much better fidelity than when owned types are used. We’ll show examples of using complex types and talk about and answer your questions on the behavioral differences between entity types, owned entity types, complex types, and primitive types.

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: Unicode and UTF-8 in SQL Server with EF Core
- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### June 14: Synchronizing data between the cloud and the client (using SQLite)

In this session, we'll invite Eric Sink to discuss a solution for keeping a synchronized copy of the DB (using SQLite) on the client, rather than asking data for the cloud every time. This is helpful for mobile scenarios where the connectivity may be poor, but the "rep and sync" approach can reduce the time the user spends waiting on the network.  Local writes are fast, sync happens in the background. We'll explore how this can be done efficiently, how to deal with conflict resolution, and other data sync-related concerns.
Featuring:

- Eric Sink (Special guest)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Product: Zumero
- Docs: EF Core daily builds

### May 31: New CLI edition of EF Core Power Tools

In today's standup, Erik will demonstrate the new CLI edition of EF Core Power Tools and show how he used a number of community NuGet packages to improve the user experience when creating a CLI tool.

Featuring:

- Erik Ejlskov Jensen (Special guest)
- Arthur Vickers (Host)
- Brice Lambson (Host)

Links:

- Visual Studio Marketplace: EF Core Power Tools
- GitHub: ErikEJ/EFCorePowerTools
- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### May 17: Collections of primitive values in EF Core

In this episode of the .NET Data Community Standup, the .NET Data Access team dive into new support for collections of primitive values, just released in EF Core 8 Preview 4. Collections of a primitive type can now be used as properties of an entity type and will be mapped to a JSON column in the relational database. In addition, parameters of primitive values can be passed to the database. In either case, the native JSON processing capabilities of the database are then used to exact and manipulate the primitive values, just as if they were in a table. This opens up powerful query possibilities, as well as optimizations to common problems such as translating queries that use Contains.

Featuring:

- Shay Rojansky (Host)
- Arthur Vickers (Host)

Links:

- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### Apr 19: EF Core Internals – Model Building

In this session, the .NET Data Access team will dig into the EF Core internals for building a model. EF models are built using a combination of three mechanisms: conventions, mapping attributes, and the model builder API. We will explain each of these mechanisms and show how they interact. We’ll also cover how models are cached, and ways in which that caching can be controlled. And, as always, we’ll answer your questions live!
Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### Mar 22: Using hierarchical data in SQL Server and PostgreSQL with EF Core

Join the .NET Data Access Team to learn about mapping hierarchical data structures to relational databases using EF Core. We’ll look at “hierarchyid” on SQL Server/Azure SQL and “ltree” on PostgresSQL, and show how to map tree structures such as a family tree, file system, or organization structure. EF Core can then be used to write LINQ queries against the hierarchy to find ancestors and descendants in various ways, as well as perform manipulation of subtrees for updates. And, as always, we’ll be here to answer your questions!

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Brice Lambson (Host)

Links:

- GitHub: ajcvickers/HierarchySample
- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### Mar 8: EF Core internals: IQueryable, LINQ and the EF Core query pipeline

In this standup, we'll dive deep under the hood to see how EF Core processes LINQ queries, translates them to SQL and executes them on your database. We'll introduce key <example-value> such as IQueryable and LINQ providers, and see how EF Core uses caching to make your querying lightning-fast. Join us to understand how the magic works!

Featuring:

- Shay Rojansky (Host)
- Arthur Vickers (Host)

Links:

- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### Feb 22: MySQL and .NET: MySqlConnector and the Pomelo EF Core Provider

This week, we'll be hosting Bradley Grainger and Laurents Meyer, authors of the open-source MySQL ADO.NET driver and of the Pomelo EF Core provider. Both these components work together to provide a 1st-class MySQL data access experience in .NET. We'll discuss some of the specifities of MySQL as a database, what it's like to work on open source data projects in .NET, and whatever else comes to mind!

Featuring:

- Bradley Grainger (Special guest)
- Laurents Meyer (Special guest)
- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Jiachen Jiang (Host)

Links:

- GitHub:
  - Pomelo.EntityFrameworkCore.MySql
  - MySqlConnector
- NuGet:
  - Pomelo.EntityFrameworkCore.MySql
  - Pomelo.EntityFrameworkCore.MySql.Json.Microsoft
  - Pomelo.EntityFrameworkCore.MySql.Json.Newtonsoft
  - Pomelo.EntityFrameworkCore.MySql.Json.NetTopologySuite
  - MySqlConnector
- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### Feb 8: SQLite with .NET and EF Core

This week, Eric Sink (creator of SQLitePCL.raw) and Brice Lambson (creator of Microsoft.Data.Sqlite) join the .NET Data Access Team to discuss everything SQLite on .NET. We’ll start down low digging into different ways to get the SQLite native binaries using Eric’s packages. Then we’ll move up the stack to look at the basics of SQLite on .NET with Brice’s ADO.NET provider. Going higher still, we’ll look at how to get the most from SQLite with the EF Core provider. And, as always, we’ll be there to answer any questions you have about SQLite on .NET.

Featuring:

- Eric Sink (Special guest)
- Brice Lambson (Host)
- Arthur Vickers (Host)

Links:

- GitHub:
  - SQLitePCL.raw
  - Microsoft.Data.Sqlite (Contained in the EF Core repo.)
- NuGet:
  - SQLitePCLRaw.bundle_e_sqlite3
  - Other SQLitePCLRaw packages
  - Microsoft.Data.Sqlite
  - Microsoft.Data.Sqlite.Core
- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### Jan 11: Entity Framework Core FAQs

Join the Microsoft .NET Data team to get answers to many frequently asked questions about EF Core. For example:

- What's the difference between EF Core and EF6?
- What NuGet packages to I need to install to use EF Core?
- Should I always use no-tracking queries?
- Why does EF Core sometimes ignore Includes?
- What's wrong with using owned types for value objects?
- Should I create a repository over EF Core?
- Why does the in-memory database not work in my tests?
- How do I call stored procedures from EF Core?
- How do I see the SQL for a LINQ query?

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Jiachen Jiang (Host)

Links:

- Docs: What's new in EF7, with runnable samples
- Docs: EF8 plan
- Docs: EF Core daily builds
