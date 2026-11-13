---
title: "Plan for Entity Framework Core 8"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/plan.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Plan for Entity Framework Core 8

As described in the planning process, we have gathered input from stakeholders into a plan for Entity Framework Core 8 (EF Core 8) and other .NET Data Access work for the .NET 8 timeframe. For brevity, EF Core 8 is also referred to as just EF8.

> **Important:**
> This plan is not a commitment; it will evolve as we continue to learn throughout the release. Some things not currently planned for EF8 may get pulled in. Some things currently planned for EF8 may get punted out.

## General information

EF Core 8 is the next release after EF Core 7 and is scheduled for release in November 2023, at the same time as .NET 8. There are no plans for an EF Core 7.1 release.

### Supported platforms

EF8 currently targets .NET 6. This will likely be updated to .NET 8 as we near the release. EF8 does not target any .NET Standard version; for more information see the future of .NET Standard. EF8 will not run on .NET Framework.

EF8 will align with .NET 8 as a long-term support (LTS) release. See the .NET support policy for more information.

### Breaking changes

EF8 will contain a small number of breaking changes as we continue to evolve both EF Core and the .NET platform. Our goal is to minimize breaking changes as much as possible without stagnating the platform.

## Themes

Large investments for EF8 and data access in .NET 8 fall under the following themes:

- Highly requested features
- Cloud native and devices
- Performance
- Visual tooling
- Developer experience

Each of these themes is described in detail below. The high-level status of each theme can be tracked in the .NET Data Biweekly Updates. Please comment on GitHub Issue #26994 with any feedback or suggestions.

## Theme: Highly requested features

As always, a major input into the planning process comes from votes (👍) for features on GitHub. Based on these votes and user input, we plan to work on the following highly requested features for EF8.

### JSON columns

Tracked by issues labeled with 'area-json' and 'consider-for-current-release'

Value proposition: Build on EF7 JSON support to further power the document/relational hybrid pattern.

EF7 introduced mapping of SQL Server JSON columns to aggregate types in the EF model, but with some limitations. In EF8, we plan to address many of these limitations, and also test and improve performance. In EF7, JSON mapping to aggregates is limited to SQL Server. In EF8, we plan to bring support to SQLite and work with the owners of other providers to align JSON columns support across all providers.

### Value objects

Tracked by Issue #9906: Use C# structs or classes as value objects

Value proposition: Applications can use DDD-style value objects in EF models.

It was previously the team view that owned entities, intended for aggregate support, would also be a reasonable approximation to value objects. Experience has shown this not to be the case. Therefore, in EF8, we plan to introduce a better experience focused on the needs of value objects in domain-driven design. This approach will be based on value converters rather than owned entities.

### SQL queries for unmapped types

Tracked by Issue #10753: Support raw SQL queries without defining an entity type for the result

Value proposition: Applications can execute more types of SQL query without dropping down to ADO.NET or using third-party libraries.

Currently SQL queries must return a type in the model or a scalar type. In EF8, we plan to allow SQL queries that directly return types that are not contained in the EF model.

## Theme: Cloud native and devices

EF Core is most often used in traditional ASP.NET Core web applications. However, EF Core is increasingly used in microservices and on mobile devices. These environments generally favor smaller application size, faster start-up times, and no reliance on dynamic code generation. We significantly improved trimming for EF Core apps in EF7, and we plan further investment in these areas for EF8.

### AOT and trimming with EF Core

Tracked by issues labeled with 'area-aot' and 'consider-for-current-release'

Value proposition: Small, fast-starting EF Core applications with no dynamic code generation.

EF Core has several characteristics that are a challenge for trimmed, ahead-of-time (AOT) compiled applications:

- Use of imperative application code and reflection to discover the EF model and mappings
- Use of reflection and dynamically generated types for queries and change tracking
- Dynamically generated code for imperatively constructed arbitrary LINQ queries

In EF8, we plan to investigate and prototype these areas to find a way forward for AOT and trimming that retains the current EF Core user experience.

### AOT and trimming for ADO.NET

Value proposition: Low-level data access can be used in cloud native applications.

Higher-level data access technologies such as EF Core make use of ADO.NET data providers, such as Microsoft.Data.SqlClient, Microsoft.Data.Sqlite, and Npgsql. For .NET 8, we will ensure that the Npgsql provider for PostgreSQL and the Microsoft.Data.Sqlite provider for SQLite are full working in trimmed and AOT-compiled applications. We will also work with the authors of other ADO.NET data providers to help make them AOT and trimming friendly.

## Theme: Performance

Great performance is a fundamental for all of .NET, including both EF Core and lower-level data access. Woodstar (see below) will be our primary performance push in the .NET 8 timeframe. However, we also plan to work on performance in some other areas, such as in JSON columns, as described above. In addition, the work on AOT and trimming (see above) has a strong relationship to performance.

### Woodstar

Tracked in the .NET Data Lab repo

Value proposition: Fast, fully managed access to SQL Server and Azure SQL for .NET applications.

Microsoft.Data.SqlClient is a fully-featured ADO.NET database provider for SQL Server. It supports a broad range of SQL Server features on both .NET and .NET Framework. However, it is also a large and old codebase with many complex interactions between its behaviors. This makes it difficult to leverage newer .NET performance features such as Pipelines. It also has several performance issues (most notably for reading large data) that have proved very hard to fix.

We plan to invest more heavily on Woodstar in the .NET 8 timeframe. Our tentative goal is to run the TechEmpower Fortunes benchmark using Woodstar by the end of the release.

> **Important:**
> Investment in Microsoft.Data.SqlClient is not changing. It will continue to be the recommended way to connect to SQL Server and Azure SQL, both with and without EF Core. It will continue to support new SQL Server features as they are introduced.

## Theme: Visual Tooling

EF Core features powerful, cross-platform command line tooling for database migrations, reverse engineering, and more. In addition, the EF Core Power Tools offer a visual experience for some of these things. However, EF Core is virtually absent from the default Visual Studio UI experience. In the .NET 8 timeframe, we plan to make EF Core tooling a built-in part of the Visual Studio experience.

### First-class T4 templates in Visual Studio

Value proposition: Leverage T4 templating across multiple areas in Visual Studio.

EF7 introduced T4 templates for scaffolding (reverse engineering) an EF model from an existing database. However, editing T4 templates can be difficult without a good editor experience. In the .NET 8 timeframe, we plan to bring a better T4 editing experience to Visual Studio so that it can be used for both EF and other templates.

### EF Core Database First in Visual Studio

Value proposition: Out-of-the-box Database First tooling in Visual Studio.

The EF Core Power Tools offer a great visual experience for EF Core tooling. However, the Power Tools are not installed out-of-the-box with Visual Studio and so can be hard to discover. In the .NET 8 timeframe, we plan to make EF Core tooling easily discoverable in Visual Studio. The primary focus of this work will be scaffolding (reverse engineering) an EF model from an existing database, otherwise known as "Database First", but may also include other areas.

## Theme: Developer experience

Creating a great experience for developers has always been a primary driving force for the team. Almost everything in the themes outlined here above relates to this in some way. In addition, a large part of the work planned for EF8 involves improving the developer experience in many small ways across multiple areas.

All the issues that we may potentially work on for EF8 are tracked on GitHub by the 'consider-for-current-release' label. We will reassess these issues throughout the release and move issues into the 8.0 milestone as we commit to working on them. Make sure to vote for issues that are important to you (👍) so that we can use this information when deciding which issues to work on.

EF Core GitHub issues are all assigned to one or more "areas". The queries below filter issues we are considering for EF8 by major areas:

- Queries
- Model building and metadata
- Change tracking
- Performance
- Migrations
- DbContext and related APIs
- Tooling
- Azure Cosmos provider
- Model building conventions
- Relational-specific mapping
- SQL Server provider
- SaveChanges
- Model to database mapping
- SQLite provider
- Scaffolding (reverse engineering)
- Logging
- Dynamic proxies
- Type mapping
- ADO.NET SQLite provider
- Temporal tables

## Suggestions

Your feedback on planning is important. Please comment on GitHub Issue #29853 with any feedback or general suggestions about the plan. The best way to indicate the importance of an issue is to vote (👍) for that issue on GitHub. This data will then feed into the planning process for the next release.
