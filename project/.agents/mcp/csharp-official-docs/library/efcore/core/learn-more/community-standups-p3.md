---
title: ".NET Data Community Standups (part 3 of 8)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/learn-more/community-standups.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# .NET Data Community Standups (part 3 of 8)

## 2024

### November 20: EF Core 9: Release extravaganza

EF Core 9 was just released. Join us in this special session talking with industry experts about all topic EF Core.

Featuring:

- Erik Ejlskov Jensen (Special guest)
- Julie Lerman (Special guest)
- Jiri Cincura (Host)
- Shay Rojansky (Host)

### June 26: Improve your SQL schema and scripts with .NET based static code analysis

By harnessing the power of the .NET DacFX framework and the related .NET T-SQL parser, you can improve the quality of your database schema and scripts with static T-SQL analysis.

@ErikEJ has recently revived this 15-year-old technology with support for .NET 6 and later, and has brought a number of third-party rules back from the grave.

In this EF Core community standup we will have a closer look - from generation of a simple HTML report with findings to managing and creating your own analyzer rules using modern .NET.

Featuring:

- Erik Ejlskov Jensen (Special guest)
- Jiri Cincura (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Blog: How to: Code analyze your SQL Server T-SQL scripts in Visual Studio
- Blog: Create a Custom Static Code Analysis Rule for Azure SQL Database / SQL Server with .NET
- Product: EF Core Power Tools - Visual Studio Marketplace

### May 15: Harnessing the Power of Firebird in .NET

In this community talk, we delve into the integration of Firebird, an open-source SQL relational database management system, with .NET, a free, cross-platform, open-source developer platform. This session aims to provide an understanding of how these two powerful technologies can be combined to create robust, scalable, and efficient applications.

This talk is designed for developers of all levels interested in expanding their knowledge on database management and .NET development. Whether you're a seasoned developer or a beginner looking to broaden your skill set, this talk will provide valuable insights into the effective use of Firebird with .NET.

Join us for this enlightening session and discover how you can harness the power of Firebird in .NET to take your applications to the next level.

Featuring:

- Jiri Cincura (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Product: Firebird
- NuGet: FirebirdSql.Data.FirebirdClient
- Blog: FbNetExternalEngine
- Tool used in the stream: Database.NET
- Docs: What's new in EF9, with runnable samples
- Docs: EF Core daily builds

### Apr 17: All about EF Core property mapping

In this episode, Arthur Vickers and Jiri Cincura from the EF team discuss everything about mapping properties in EF Core. We’ll look at:

- The differences between properties and navigations.
- How EF decides to map a property, and whether it is mapped to a nullable column, has a max length defined, etc.
- When backing fields are used, and mapping fields directly.
- Shadow properties.
- Indexer properties.

And if we get time, we’ll look at how value converters influence all this!

Featuring:

- Arthur Vickers (Host)
- Jiri Cincura (Host)

Links:

- GitHub: Code from the standup
- Docs: What's new in EF9, with runnable samples
- Docs: EF Core daily builds

### Mar 20: Building Distributed Applications with Hot Chocolate 14, Aspire, and Entity Framework

Building and debugging distributed systems challenges developers to balance complexity with the need for simplicity. Ideally, we aim for the simplicity of a monolith while benefiting from microservices' scalability and isolation. In todays meetup we will have an early look at what we are doing with Hot Chocolate 14 to integrate well with Aspire and bridge this gap, offering an approach that combines microservices' advantages with the ease of a monolith for our consumers. Also we will have a look at a lot of the new feature around Hot Chocolate 14 that will make it so much easier to build layered services with entity framework. Do not worry! We will start slow with just the simplest of services accessing a database and then go all the way in.

Featuring:

- Michael Staib (Special guest)
- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Jiri Cincura (Host)

Links:

- Product: Hot Chocolate for GraphQL
- Docs: Hot Chocolate and Entity Framework Core

### Mar 6: EF Core keys and value generation

In this episode, Arthur and members of the EF Team will explore generated property values and how value generation interacts with keys in the model. We will look at fully client-side value generation, as well as how to use identity columns, database sequences, or a hi-lo pattern for server-side generation. In addition, we’ll investigate how generated key <example-value> impact EF Core change tracking by determining if an entity will go into the `Added` state or not. And finally, if we have time, we’ll look at special considerations for TPC mapping, and customizations such as setting before and after save behaviors, and sentinel values.

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- GitHub: Code from the standup
- Docs: What's new in EF9, with runnable samples
- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### February 21: Window and binary functions using Zomp EF Core extensions

Window functions are one of the most powerful features of SQL. Did you know that you can use Window Functions in EF Core today instead of writing raw SQL? Victor Irzak joins Shay and Arthur to explore real use cases of window functions with EF Core.

Featuring:

- Victor Irzak (Special guest)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- GutHub: Zomp EF Core Extensions
- NuGet:
  - Zomp.EFCore.WindowFunctions.SqlServer
  - Zomp.EFCore.WindowFunctions.Npgsql
  - Zomp.EFCore.WindowFunctions.Sqlite
- Blog: EF8 release post on the .NET Blog
- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### February 7: Database concurrency and EF Core: Beyond optimistic concurrency

In the 3rd installment of our series on concurrency, we'll dive deep into SQL isolation levels, how they work (and work differently!) across SQL Server and PostgreSQL. We'll hopefully learn a bit about how database locks, snapshots and isolation levels work together to bring some sanity into the world of concurrency.

Featuring:

- Shay Rojansky (Host)
- Arthur Vickers (Host)

Links:

- Blog: SQL Server Isolation Levels : A Series
- Blog: Transaction isolation in PostgreSQL
- Blog: EF8 release post on the .NET Blog
- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### January 24: Database concurrency and EF Core: ASP.NET and Blazor

In the last episode, we dug deep into the underpinnings of optimistic concurrency handling in EF Core. In this episode, we continue that journey to cover disconnected scenarios. That is, where the entity travels to a client and then back to the server before being updated in the database. We’ll look at the different patterns for doing updates like this in ASP.NET Core and Blazor apps and see how concurrency tokens work with each of these. We’ll also look at how `ExecuteUpdate` can be used with concurrency tokens, and take a look at ETag concurrency in Azure Cosmos DB.

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: Handling Concurrency Conflicts
- Blog: EF8 release post on the .NET Blog
- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds

### January 10: Database concurrency and EF Core

What happens when one user is reading a record while another user is updating it? What if both users try to update the same record at the same time? In this episode of the .NET Data Community Standup, Shay and Arthur take a look at how different database isolation levels impact concurrency and performance, and then extend this to optimistic concurrency patterns supported by Entity Framework Core. This includes both manual concurrency tokens and automatic concurrency tokens like SQL Server’s “rowversion”. We’ll also dig into what happens in disconnected scenarios, and when to use the original value as opposed to the current value of the concurrency token. Finally, we’ll look at how EF Core handles optimistic concurrency with ETags when using a document database like Azure Cosmos DB.

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: Handling Concurrency Conflicts
- Blog: EF8 release post on the .NET Blog
- Docs: What's new in EF8, with runnable samples
- Docs: EF Core daily builds
