---
title: ".NET Data Community Standups (part 7 of 8)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/learn-more/community-standups.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# .NET Data Community Standups (part 7 of 8)

## 2021

### Dec 1: Hot Chocolate 12 and GraphQL 2021

Hot Chocolate 12 allows for more schema-building options with deeper integrations into EF core. Hot Chocolate has already implemented the new GraphQL October 2021 spec, and we will explore the new capabilities. We now support the complete stream and defer spec and will look into these new data fetching capabilities.

Featuring:

- Michael Staib (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Product: Hot Chocolate for GraphQL
- Docs: Hot Chocolate and Entity Framework Core
- Blog: Get to Know EF Core 6
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Nov 17: Make History and Explore the Cosmos, an EF Core 6 Retrospective

EF Core 6 has been released with a long list of features from performance improvements, temporal tables support, CI/CD-friendly migration bundles, compiled models, query improvements, enhanced Azure Cosmos DB capabilities and much more. Join the EF Core team and our community panelists as we review what's new, share the EF Core 6 story and answer your questions live.

Featuring:

- Julie Lerman (Special guest)
- Jon P Smith (Special guest)
- Erik Ejlskov Jensen (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Video: New Blazor WebAssembly capabilities in .NET 6
- Video: Modern data APIs with EF Core and GraphQL
- Blog: Updating your ASP.NET Core / EF Core application to NET 6
- Video: Entity Framework Community Standup - Introducing EF Core Compiled Models
- Video: Entity Framework Community Standup - SQL Server Temporal Tables and EF Core 6
- Blog: Taking the EF Core Azure Cosmos DB Provider for a Test Drive
- Video: EF Core 6 and Azure Cosmos DB
- Video: What's New in EF Core 6
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Nov 3: Noda Time

Noda Time is an alternative date and time API for .NET. It helps you to think about your data more clearly, and express operations on that data more precisely.

Featuring:

- Jon Skeet (Special guest)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Blog: Noda Time
- Blog: STORING UTC IS NOT A SILVER BULLET
- Product: nodatime.org
- GitHub: nodatime/nodatime
- Blog: Date/Time Mapping with NodaTime in Npgsql
- GitHub: StevenRasmussen/EFCore.SqlServer.NodaTime
- GitHub: khellang/EFCore.Sqlite.NodaTime
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Oct 6: SQL Server Temporal Tables and EF Core 6

Learn about the new support in EF Core 6 for temporal tables, including creating them from migrations, transforming existing tables into temporal tables, querying historical data and point-in-time restore.

Featuring:

- Jeremy Likness (Host)
- Arthur Vickers (Host)

Links:

- GitHub: ajcvickers/TemporalTables
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Oct 20: EF Core and ASP.NET Core from the ASP.NET documentation team

Back to the basics: EF Core and ASP.NET Core from the documentation team.

Featuring:

- Rick Anderson (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: Razor Pages with Entity Framework Core in ASP.NET Core - Tutorial
- Docs: ASP.NET Core MVC with EF Core - Tutorial
- Blog: Prime your flux capacitor: SQL Server temporal tables in EF Core 6.0
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Sep 22: PostgreSQL and EF Core

PostgreSQL has some advanced capabilities not usually found in other relational databases. In this session we'll go over some of them, and see how EF Core makes these accessible.

Featuring:

- Shay Rojansky (Host)
- Arthur Vickers (Host)
- Brice Lambson (Host)

Links:

- Product: Npgsql Entity Framework Core Provider
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Aug 25: Dapper

Dapper maintainers and key contributors Nick and Marc will show people the glorious power of Dapper and everything it can do, so they are fully informed and can choose something much better, like EF Core (their words).

Featuring:

- Marc Gravell
- Nick Craver
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- GitHub: JeremyLikness/EFCosmosQuickstart
- GitHub: DapperLib/Dapper
- GitHub: DapperLib/DapperAOT
- Product: Dapper
- GitHub: SqlServer.Core: Performance-oriented SQL Server .NET driver
- Blog: Is the era of reflection-heavy C# libraries at an end?
- Blog: .NET Core, .NET 5; the exodus of .NET Framework?
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Aug 11: EF Core's Global Query Filter

Why do customers want "soft delete"? What's a good practice for handling multi-tenancy in EF Core apps? The reformed programmer, Jon P. Smith, shares how to use a powerful tool in the EF Core platform, global query filters, to handle scenarios like "soft delete."

Featuring:

- Jon P Smith (Special guest)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: Global Query Filters
- Blog: EF Core In depth – Soft deleting data with Global Query Filters
- Blog: Introducing the EfCore.SoftDeleteServices library to automate soft deletes
- Blog: Part 2: Handling data authorization in ASP.NET Core and Entity Framework Core
- Blog: Part 4: Building a robust and secure data authorization with EF Core
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Jul 28: OData

OData is one of the best protocols out there to supercharge your ASP.NET Core APIs with so many capabilities such as shaping, filtering, batching and ordering the data on the fly - it executes it's queries on the server which tremendously improves the performance on client side. Hassan talks all things OData on the Community Standup.

Featuring:

- Hassan Rezk Habib (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Blog: Up & Running w/ OData in ASP.NET 6
- GitHub: OData NxT - The Future of OData (Project Proposal)
- Video: Enabling OData in ASP.NET 6.0
- Video: OData NxT 002: OData Queries Deep Dive
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Jul 14: Visualizing database query plans

Learn what a query plan is, how to view EF Core query plan in LINQPad, find missing indexes, and improve performance of your queries.

Featuring:

- Giorgi Dalakishvili
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- GitHub: Giorgi/LINQPad.QueryPlanVisualizer
- GitHub: dalibo/pev2
- GitHub: JustinPealing/html-query-plan
- Docs: SQL Server: Execution plan overview
- Docs: SQL Server: Logical and physical showplan operator reference
- Docs: SQL Server: Statistics
- Blog: Announcing Entity Framework Core 6.0 Preview 6: Configure Conventions
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Jun 16: Azure Cosmos DB and EF Core

EF Core may be an object relational mapper, but it also can ditch the relational and connect directly to the Azure Cosmos DB NoSQL engine. In this standup, the team will discuss the rationale behind a Cosmos DB provider, show code examples, discuss the major differences between SQL and NoSQL data and share the roadmap for future enhancements to the Azure Cosmos DB provider.

Featuring:

- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- GitHub: JeremyLikness/PlanetaryDocs
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Jun 2: Introducing EF Core Compiled Models

EF Core creates an internal model for entity types and their database mappings. This model is typically built once when the application starts. Starting with EF Core 6.0, it is now possible to instead build this model at compile time. This can reduce startup time by up to 67% for large models. Join us for this Community Standup, where the team will introduce compiled models and demo their use.

Featuring:

- Arthur Vickers (Host)
- Shay Rojansky (Host)
- Andriy Svyryd (Host)

Links:

- GitHub: Reduce EF Core application startup time via compiled models
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### May 19: Building Modern Apps with GraphQL

GraphQL is a great way to expose data whether you expose your business layer in a much richer way or just map your data models to get started quickly. GraphQL gives backend engineers the tools to mold the service layer without compromises and lets the frontend engineer decide what data he or she needs to build that awesome application. Learn the what, why, and see how to build apps with GraphQL.

Featuring:

- Michael Staib (Special guest)
- Jeremy Likness (Host)
- Shay Rojansky (Host)

Links:

- Interview: Deep Diving into EF Core: Q&A with Jeremy Likness
- Book: Entity Framework Core in Action, Second Edition
- Blog: Azure Cosmos DB With EF Core on Blazor Server
- GitHub: ChilliCream/graphql-platform
- Product: Hot Chocolate - Introduction
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### May 5: Triggers for EF Core

Guest Koen Bekkenutte will introduce us to the EFCore.Triggered project and discuss its advantages and how it differs from domain events and database triggers. See how it is implemented and how the project uses EF Core's ChangeTracker and SaveChanges interception. As always, the EF Core team and Koen will be responding to live Q&A.

Featuring:

- Koen
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Blog: Multi-tenancy with EF Core in Blazor Server Apps
- Blog: Triggers for Entity Framework Core
- GitHub: koenbeuk/EntityFrameworkCore.Triggered
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Apr 21: Open Source Contributions: How to Add a Feature to EF Core

Do you want to contribute to EF Core but are uncertain where to begin? We’re here to help! In this episode of the EF Core Community Standup, we will add an EF Core feature live. We’ll go through everything from forking the repo, adding the code and related tests, and generating the pull request. Learn how the codebase is organized, how to build and how to run tests and receive answers to your questions in real time direct from the team that brings you magic unicorns!

Featuring:

- Erik Ejlskov Jensen (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Blog: Entity Framework Core 5 — Table-per-Type and Table-per-Hierarchy
- Blog: Integration testing with EF Core, part 1
- Blog: Look ma, no passwords - using Entity Framework Core with Azure Managed Identity, App Service/Functions and Azure SQL DB
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Apr 7: Azure SQL for Cloud-Born Applications and Developers

Join Davide Mauri and the EF Core team for an interactive discussion about how Azure SQL helps cloud developers create cloud native solutions. From simple REST APIs to scalable backends, Azure SQL provides the required flexibility, scalability, and features to simplify the developer's life. Davide will cover topics ranging from JSON support and CI/CD to column-store, geospatial and graph models.

Featuring:

- Davide Mauri (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)

Links:

- Docs: Connection Resiliency
- Docs: What's new in EF Core 6, with runnable samples
- Book: Practical Azure SQL Database for Modern Developers: Building Applications in the Microsoft Cloud
- GitHub: yorek/azure-sql-db-samples
- GitHub: azure-samples/azure-sql-db-dynamic-schema
- Product: TodoMVC
- Product: Todo-Backend
- Docs: EF Core daily builds

### Mar 24: EF Core Power Tools: the New Batch

Learn how to take advantage of the new advanced features recently added to EF Core Power Tools: - reverse engineer .dacpac files, renaming of tables, columns and even navigations, excluding columns, working with multiple DbContexts in the same project, map spatial columns and SQL Server stored procedures. The session will also include a look under the hood of EF Core Power Tools reverse engineering.

Featuring:

- Erik Ejlskov Jensen (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- GitHub: ErikEJ/EFCorePowerTools
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Mar 10: Julie Lerman and EF Core Ask Me Anything (AMA)

Julie Lerman is an independent authority and community luminary for Entity Framework. She has been programming for nearly 30 years and has been an independent consultant since 1989. Julie is one of 150 Microsoft Regional Directors worldwide and has been awarded Microsoft MVP annually since 2003. Join Julie and the EF Core team for an "ask me anything" session: your questions answered in real-time!

Featuring:

- Julie Lerman (Special guest)
- Erik Ejlskov Jensen (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Product: The Data Farm is Julie Lerman
- Videos: Julie Lerman on Pluralsight
- Docs: What's new in EF Core 6, with runnable samples
- Docs: EF Core daily builds

### Feb 24: Performance Tuning an EF Core App

Guest Jon P Smith shows how he built a demo e-commerce book selling site that uses EF Core. He started with 700 books then scaled through 100,000 books to ½ million books. At each stage he compares the performance of each improvement, and the extra work to get that performance.

Featuring:

- Jon P Smith (Special guest)
- Jeremy Likness (Host)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- Docs: Introduction to Performance
- Blog: Entity Framework Core 5 – Pitfalls To Avoid and Ideas to Try
- Blog: Five levels of performance tuning for an EF Core query
- Docs: EF Core daily builds

### Feb 10: Typed Exceptions for Entity Framework Core

When using Entity Framework Core for data access all database exceptions are wrapped in DbUpdateException. If you need to know whether the exception was caused by a unique constraint, the value being too long, or the value missing for a required column, you need to dig into the concrete DbException subclass instance and check the error number to determine the exact cause. In this episode, learn how EntityFramework.Exceptions handles all the database-specific details and allows you to use typed exceptions for Entity Framework Core when your query violates database constraints.

Featuring:

- Giorgi Dalakishvili (Special guest)
- Arthur Vickers (Host)
- Shay Rojansky (Host)

Links:

- GitHub: Giorgi/EntityFramework.Exceptions
- Docs: The Plan for Entity Framework Core 6.0
- Docs: EF Core daily builds
