---
title: ".NET Data Community Standups (part 5 of 8)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/learn-more/community-standups.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# .NET Data Community Standups (part 5 of 8)

## 2022

### Dec 14: The Plan for Entity Framework Core 8

The plan has been published for EF Core 8 and other data access work in .NET 8. This includes work in five major themes:

- Highly requested features
- Cloud native and devices
- Performance
- Visual tooling
- Developer experience

Join the .NET Data Team for a discussion of what’s in and what’s out, and to get your questions answered.

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Jiachen Jiang (Host)

Links:

- Docs: What's new in EF7, with runnable samples
- Docs: EF8 plan
- Docs: EF Core daily builds

### Nov 16: A Whirlwind Tour of EF7

Join the .NET Data team as we take a whirlwind tour through new features of EF Core 7.0 (EF7). This includes JSON columns, bulk updates, TPC mapping, and more!

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Nov 7: EF7 Custom Model Conventions

EF Core uses a metadata "model" to describe how the application's entity types are mapped to the underlying database. This model is built using a set of around 60 "conventions". The model built by conventions can then be customized using mapping attributes (aka "data annotations") and/or calls to the DbModelBuilder API in OnModelCreating. EF7 allows applications to remove or modify existing conventions, as well as create new conventions. Join us for this .NET Data Community Standup to learn how to take advantage of custom model building conventions in your EF Core 7.0 applications.

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Jiachen Jiang (Host)

Links:

- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds
- Docs: Model Bulk Configuration

### Oct 19: New EF Core 7.0 APIs (Bulk Update)

EF Core 7.0 introduces the ExecuteUpdate and ExecuteDelete APIs, which allow you to easily use LINQ to express a database update or delete operation. These APIs can be far more efficient for applying changes to multiple rows based on a condition, e.g. “delete rows which have InActive set to true” (AKA bulk update scenarios). But in some scenarios, they also allow you to express changes over a single row in a much more succinct and simple way, simplifying your code. ExecuteUpdate and ExecuteDelete completely bypass EF’s change tracking and execute immediately, as opposed to when SaveChanges is called. Tune in to learn more and to explore the new possibilities that these new APIs bring!

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Jiachen Jiang (Host)

Links:

- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds
- Docs: ExecuteUpdate and ExecuteDelete

### Oct 5: JSON Columns

JSON columns allow relational databases to directly store documents while retaining the overall relational structure of the data. EF7 contains provider-agnostic support for JSON columns, with an implementation for SQL Server.  The JSON in these columns can queried using LINQ, allowing filtering and sorting by the elements of the documents, as well as projection of elements out of the documents into results. In addition, EF7 supports element-level change tracking of the documents and partial updates for only the changed elements when SaveChanges is called.

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Jiachen Jiang (Host)

Links:

- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Sep 21: Azure Mobile Apps and offline sync

Learn how Azure Mobile Apps provides the tools and libraries you need to easily synchronize data between an Entity Framework Core-backed Web API and your mobile or desktop app.

Featuring:

- Adrian Hall (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Product: About Azure Mobile Apps
- Blog: Adrian Hall's Blog
- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Aug 24: New aggregate function support in EF Core 7

Aggregate functions such as COUNT, MAX or AVG compute a single value from multiple rows. EF7 adds support for custom provider aggregate functions, adding support for many new translations. In this episode of the .NET Data Community Standup, we’ll explore these new translations across different EF providers, and see what they could mean for more efficient data loading from the database. We’ll also go into some tricky design problems and under the hood query translation details which the team discussed while working on this feature.

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Jiachen Jiang (Host)

Links:

- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Aug 10: CoreWCF: Roadmap and Q&A

CoreWCF is a port of the service side of Windows Communication Foundation (WCF) to .NET. The goal of this project is to enable existing WCF services to move to .NET. The CoreWCF team recently conducted a survey and will be talking about some of  the responses, answering questions, and sharing insights into their roadmap for the future.

Featuring:

- Matt Connew (Special guest)
- Mike Rousos (Special guest)
- Sam Spencer (Special guest)
- Hong Li (Special guest)
- Heather Arbon (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- GitHub: CoreWCF

### Jul 27: DbDataSource, a new System.Data abstraction

In this episode of the .NET data community standup, we'll explore DbDataSource, a new abstraction being introduced to System.Data in .NET 7.0. DbDataSource unlocks easier integration of ADO.NET drivers with dependency injection, better management of advanced driver configuration, helps performance and more. Tune in to see improvements at the lower levels of the .NET data stack.

Featuring:

- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Jul 13: Intercept this EF7 Preview 6 Event

EF7 includes a variety of new interceptors and events, as well as many improvements to the existing lifecycle hooks. In this session, Arthur and others from the .NET Data team will dive into this new functionality, including examples for intercepting materialization of entities, query expression trees, identity resolution when tracking, and optimistic concurrency violations. Join us for a fun-packed ride into the world of modifying EF behavior through interception with code galore!

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Blog: Announcing Entity Framework Core 7 Preview 6: Performance Edition
- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Jun 29: DbContext Configuration and Lifetime - EF Core Architecture Part 2

Arthur and others from the EF Team continue their deep dive into the architecture of Entity Framework Core. This is a code-driven discussion looking at how and why things are designed and implemented the way they are. In this session, we look at the initialization and configuration of a DbContext instance, including selection of the provider, creating DbSet instances, reading DbContextOptions, and DbContext pooling.

Featuring:

- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: DbContext Lifetime, Configuration, and Initialization
- Docs: DbContext pooling
- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Jun 15: TPH, TPT, and TPC Inheritance mapping with EF Core

Type inheritance hierarchies as used in object-oriented programming do not map naturally to relational database schemas. In this live stream, we will look at different strategies for inheritance mapping when using EF Core with a relational database. This includes table-per-hierarchy (TPH) mapping, table-per-type (TPT) mapping, and table-per-concrete type (TPC) mapping, which is new in EF Core 7.0 preview 5. We will look at the consequences of the mapping on the generated SQL and consider the performance and storage implications. This will result in some guidance as to when each strategy should be used.

Featuring:

- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Blog: Announcing Entity Framework 7 Preview 5
- Docs: Inheritance
- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Jun 1: EF Core Architecture: Internal Dependency Injection

Join Arthur Vickers and others from the EF Team as we start a deep dive into the architecture of Entity Framework Core. This won’t be a formal talk, but rather a free-form discussion driven by the code where we look how and why things are designed and implemented the way they are. This week, we’ll start with the use of dependency injection (D.I.) and the “internal service provider.” This is the backbone of how EF Core works as a service-oriented architecture, where the core code, database providers, and plugins all implement services that work together to provide EF’s functionality.

Featuring:

- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### May 18: Testing EF Core Apps (part 2)

In this second part of testing EF Core Apps, guest Jon P Smith will focus on the actual code and approaches that you need to test applications using EF Core and will address some key "pain points."

Featuring:

- Jon P Smith (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Blog: New features for testing your Entity Framework Core 5 and above
- Docs: Testing against your production database system
- GitHub: JonPSmith/EfCore.TestSupport
- Blog: Announcing Entity Framework 7 Preview 4
- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### May 4: Database Pagination

Lots of data? Time to page it. But what's the best approach? TAKE, SKIP, and OFFSET? What about keyset pagination? Join the .NET Data team when we page the author of "keyset pagination for EF Core" Mohammed Rahhal to discuss paging and answer your questions live.

Featuring:

- Mohammad Rahhal (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- GitHub: mrahhal/MR.EntityFrameworkCore.KeysetPagination
- GitHub: mrahhal/MR.AspNetCore.Pagination
- Blog: Pagination Done the Right Way
- Blog: We need tool support for keyset pagination
- Docs: Pagination
- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Apr 20: Performance Improvements to the EF7 Update Pipeline

Join the Entity Framework team as they review optimizations to the update pipeline to improve performance. Come prepared with your EF7 questions as we plan to spend time in Q&A to answer your questions live.

Featuring:

- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Apr 6: Database-first with T4 Templates in EF7: Early look

Prefer null setters? Property initializers? Constructor initialization? What about auto-generating database diagrams that render in markdown using Mermaid? Learn how to take control of your database scaffolding in this early look at an EF7 feature that's hot off the press

Featuring:

- Brice Lambson (Host)
- Arthur Vickers (Host)
- Jeremy Likness (Host)

Links:

- Docs: Code Generation and T4 Text Templates
- GitHub: mono/t4
- GitHub: JeremyLikness/MvpSummitTaskList
- Docs: What's new in EF7, with runnable samples
- Docs: EF Core daily builds

### Mar 9: GraphQL and OData: An In-Depth Discussion

The creator of the GraphQL library HotChocolate, Michael Staib, and Microsoft engineer and OData expert Hassan Habib discuss the various capabilities of GraphQL and OData and how they empower developers to go beyond REST.

Featuring:

- Michael Staib (Special guest)
- Hassan Rezk Habib (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Product: OData - the best way to REST
- Product: Hot Chocolate - Introduction
- Blog: The Future of OData NxT (Neo)
- Docs: The Planetary Docs Sample
- Docs: Multi-tenancy

### Feb 23: Celebrating 20 Years of .NET: Entity Framework

As .NET celebrates its 20th birthday, Entity Framework approaches its 10-year anniversary of going open source. The Entity Framework team will celebrate these milestones by inviting back the engineers and program managers who helped shipped previous versions to share their stories, demos, and anecdotes. Join Tim Laverty, Rowan Miller, Danny Simmons, Diego Vega, and more for this special edition of the .NET Data community standup.

Featuring:

- Danny Simmons (Alumnus)
- Rowan Miller (Alumnus)
- Julie Lerman (Special guest)
- Diego Vega (Alumnus)
- Andrew Peters (Alumnus)
- Tim Laverty (Alumnus)
- Jeremy Likness (Host)
- Shay Rojansky (Host)

Links:

- Historic links:
  - The ADO.NET Entity Framework Overview
  - ADO.NET vNext: The Entity Framework, LINQ and more
  - Entity Framework Vote of No Confidence Signatories
  - DP Advisory Council
  - RTM is Finally Here!
  - Update on LINQ to SQL and LINQ to Entities Roadmap
  - Simple Code First with Entity Framework 4 - Magic Unicorn Feature CTP 4
  - Entity Framework and Open Source
  - Introducing ADO.NET Entity Framework
  - Code First Databases with Entity Framework (Magic Unicorn Edition)
  - Visual Studio 2008 and .NET Framework 3.5 Service Pack 1 Beta
  - EF5 Released
  - EF6 RTM Available
  - EF7 - New Platforms, New Data Stores
  - ASP.NET 5 is dead - Introducing ASP.NET Core 1.0 and .NET Core 1.0
  - Announcing Entity Framework Core 1.0
  - Announcing Entity Framework Core 2.0
  - Announcing Entity Framework Core 3.0 and Entity Framework 6.3 General Availability
  - Announcing the Release of EF Core 5.0
  - Get to Know EF Core 6
  - Announcing Entity Framework 7 Preview 1

### Feb 9: Software version and "stuff"

Join the .NET Data team and Jon Skeet in a discussion around software versioning, issues with versioning in .NET, and… stuff. Who knows what topics may come up? Join us live to find out and have your questions answered in real time.

Featuring:

- Jon Skeet (Special guest)
- Jeremy Likness (Host)
- Shay Rojansky (Host)

Links:

- Jon Skeet's blog:
  - WHY I DON’T START VERSIONS AT 0.X ANY MORE
  - OPTIONS FOR .NET’S VERSIONING ISSUES
  - VERSIONING LIMITATIONS IN .NET
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds
