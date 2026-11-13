---
title: "Plan for Entity Framework Core 7.0 (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/plan.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Plan for Entity Framework Core 7.0 (part 2 of 3)

## Theme: .NET platforms and ecosystem

Much of the work planned for EF7 involves improving the data access experience for .NET across different platforms and domains. This involves work in EF Core where needed, but also work in other areas to ensure a great experience across .NET technologies. We will focus on the following platforms/technologies for the EF7 release:

- .NET MAUI
- ASP.NET Core
- Azure Synapse
- Blazor Server
- Blazor WebAssembly
- Windows Forms
- Windows Presentation Foundation (WPF)

This list is based on many factors, including customer data, strategic direction, and available resources. The general areas we will be working on for these platforms are outlined below.

### Distributed transactions

Tracked by Issue #715 in dotnet/runtime: Implement distributed/promoted transactions in System.Transactions

Value proposition: .NET Framework applications using distributed transactions can be ported to .NET 7.

The `System.Transactions` library in .NET Framework contains native code that makes use of the Windows Distributed Transactions Coordinator (DTC) to support distributed transactions. This code was never ported to .NET Core. In the .NET 7 timeframe, we plan to investigate and begin the process of bringing this functionality to modern .NET. This will be initially for Windows only, and will support only database scenarios where the ADO.NET provider also supports distributed transactions. Other uses of distributed transactions, such as in WCF, will not be supported in .NET 7. Based on feedback and cost, we may implement support for other scenarios and/or non-Windows platforms in a future release.

### EF Core tooling

Tracked by Issue #26798: Modernize EF Core tooling

Value proposition: `dotnet ef` commands are easy to use and work with modern platforms and technologies.

.NET platforms have evolved since we first introduced tooling for migrations, database scaffolding, etc. in EF Core 1.0. In EF7, we plan to update the tooling architecture to better support new platforms, like .NET MAUI, and to streamline the process in areas such as the use of multiple projects. This includes providing better feedback when things go wrong, better integration with logging, performance, and new sugar.

### EF Core and graphical user interfaces

Tracked by Issue #26799: Improve experience for data binding and graphical interfaces

Value proposition: It is easy to build data-bound graphical applications with EF Core.

EF Core is designed to work well with data binding scenarios, such as those in Windows Forms and .NET MAUI. However, connecting the dots between these technologies is not always easy. For EF7, we plan to improve the experience with both work in EF Core and in Visual Studio to make it easier to build data-bound applications with EF Core.

### SqlServer.Core (Woodstar)

Tracked in the .NET Data Lab repo

Value proposition: Fast, fully managed access to SQL Server and Azure SQL for modern .NET applications.

Microsoft.Data.SqlClient is a fully-featured ADO.NET database provider for SQL Server. It supports a broad range of SQL Server features on both .NET and .NET Framework. However, it is also a large and old codebase with many complex interactions between its behaviors. This makes it difficult to investigate the potential gains that could be made using newer .NET features.

We began a project last year, colloquially known as "Woodstar", to investigate the potential for a highly performing SQL Server driver for .NET. We plan to make significant further investment into this project in the EF7 timeframe.

> **Important:**
> Investment in Microsoft.Data.SqlClient is not changing. It will continue to be the recommended way to connect to SQL Server and Azure SQL, both with and without EF Core. It will continue to support new SQL Server features as they are introduced.

### Azure Cosmos DB provider

Tracked by issues labeled with 'area-cosmos' and in the 7.0 milestone

Value proposition: Continue to make EF Core the easiest and most productive way to work with Azure Cosmos DB.

We made significant improvements to the EF Core Azure Cosmos DB database provider for the 6.0 release. These improvements created a first-class experience for working with Azure Cosmos DB from EF Core, which is reflected by significant growth in adoption. We plan to continue this momentum in EF7 with the following further Azure Cosmos DB provider enhancements:

- Issue #16146: Support aggregate operators
- Issue #17306: Allow to use a custom JSON serializer
- Issue #17670: Translate non-persisted property in query when possible
- Issue #19944: Support trigger execution
- Issue #20350: Detect partition key filters in more queries
- Issue #20910: Add translation for string.Compare for Azure Cosmos DB
- Issue #23538: Improve query tree during translation
- Issue #24571: Allow terminating operators after Skip and Take
- Issue #24513: Add support for pagination (MaxItemCount)
- Issue #25700: translate Length/Count on collections
- Issue #25701: translate indexing into collection
- Issue #26478: Implement interceptors for Azure Cosmos DB
- Issue #26491: Support AAD RBAC via the ClientSecretCredential

Please make sure to vote (👍) for the Azure Cosmos DB provider features that you need so that we can assess where to invest for the most benefit.

### Migrations experience

Tracked by Issue #22946: Improvements to database migrations

Value proposition: It is easy to get started with migrations and later use them effectively in CI/CD pipelines.

EF Core 6.0 introduced migrations bundles, significantly improving the experience for cloud-native applications and database deployment within continuous integration and deployment systems. In EF7, we plan to make additional improvements in this area based on customer feedback. For example, we plan to support executing all migrations in a single transaction to facilitate easier recovery if something goes wrong.

In addition, we plan to improve the experience for developers getting started with migrations. This includes being able to create the database automatically when learning or beginning a project, and then easily switching to managed migrations as the project matures. Alternately, for projects with an existing database, we plan to make it easy to create an initial EF model and then switch to managing the database using migrations going forward.

### Modern .NET

As .NET continues to evolve we want to ensure that accessing data continues to be a great experience. To facilitate this, we plan to make progress on three areas during the EF7 timeframe.

#### Trimming

Tracked by Issue #21894: Improve trimming support for EF Core apps to reduce application size

Value proposition: Smaller applications that can be efficiently AOT compiled.

EF Core performs large amounts of runtime code generation. This is challenging for app models that depend on linker tree shaking, such as .NET MAUI and Blazor, and platforms that don't allow dynamic compilation, such as iOS. We plan to greatly improve trimming of unused code in EF7. This will facilitate smaller assembly sizes when using EF Core, thus helping deployment and making ahead-of-time (AOT) compilation more efficient.

#### Evolve System.Linq.Expression

Value proposition: Use modern C# language features in LINQ queries.

We are working with the Roslyn team on a plan to allow more C# features to be used in LINQ expressions. This is ongoing work which will mostly be tracked outside the EF Core repo.

#### Translate new LINQ operators

Tracked by Issue #25570: Support new .NET LINQ features

Value proposition: Use new LINQ operators when translating LINQ queries to SQL.

New LINQ operators have recently been added to the BCL, and we expect more to be added going forward.  Issue #25570 tracks adding support for these to the EF7 LINQ provider. This issue will be updated as new LINQ operators are added. As with all existing LINQ operators, we will only add support when the operator has a reasonable and useful translation to the database.

### Open telemetry for ADO.NET providers

Tracked by Issue #22336: Standardize on DiagnosticSource/OpenTelemetry for database tracing

Value proposition: Cross-platform, industry-standard telemetry that can be monitored in your tool of choice.

Open telemetry is an initiative of the Cloud Native Foundation to foster a common telemetry mechanism for cloud-native software. With regard to databases, this includes establishing a database client telemetry standard. We plan to do work in the EF7 timeframe to help bring open telemetry to ADO.NET providers in the .NET ecosystem. This includes work with the community on the open source MySQL and Npgsql providers, as well as Microsoft.Data.Sqlite. We will also reach out to other providers, and we encourage maintainers of ADO.NET providers to get in touch if interested.

### Enhancements to System.Data

Tracked by issues in the dotnet\runtime repo labeled with `area-System.Data` in the 7.0 milestone

Value proposition: Better low-level data access to benefit all higher-level code.

As with every release, we intend to explore improvements to .NET's low-level database access API, System.Data. We will focus on performance improvements (e.g. reduce memory allocations by eliminating boxing when using the API), as well as some usability improvements.

The scope of the precise improvements will be determined later based on feasibility.

### Research data access for cloud-native

Value proposition: Future evolution of .NET data access that supports modern approaches such as microservices and cloud native.

In the EF7 timeframe, we plan to research modern approaches to data access across .NET platforms, especially in reference to microservices and cloud-native applications. This research will help drive future investments in data access technologies for .NET.

## Theme: Clear path forward from EF6

Tracked by Docs issue #1180: Provide a more complete guide to porting from EF6

Value proposition: Easily move your application from EF6 to EF7.

EF Core has always supported many scenarios not covered by the legacy EF6 stack, as well as being generally much higher performing. However, EF6 has likewise supported scenarios not covered by EF Core. EF7 will add support for many of these scenarios, allowing more applications to port from legacy EF6 to EF7. At the same time, we are planning a comprehensive porting guide for applications moving from legacy EF6 to EF Core.

Much of the work in this theme overlaps with work already outlined above. Some of the more significant work items are:

- Issue #214: Expose model building conventions to applications
- Issue #245: Map inserts, updates, and deletes (CUD operations) to stored procedures
- Issue #620: Entity splitting support
- Issue #3170: TPC inheritance mapping pattern
- Issue #3864: Support unidirectional many-to-many relationships through shadow navigations
- Issue #4038: Code templates for scaffolding entity types and DbContext from an existing database
- Issue #10753: Support raw SQL queries without defining an entity type for the result
- Issue #11003: KeyAttribute support for composite primary key
- Issue #11624: Support raw SQL Queries for basic types like Guid, DateTime and int
- Issue #15911: Implement ObjectMaterialized event
- Issue #17653: Support for GroupBy entityType
- Issue #19929: Support GroupBy when it is final operator
- Issue #19930: Support GroupJoin when it is final query operator
- issue #26626: Use EF6 as an oracle for procedural testing of EF Core queries

In addition, we plan to make it clear on the legacy EF6 GitHub repo that we are not planning any future work on EF6. The exception to this is that we plan to add support for using EF6 with Microsoft.Data.SqlClient. This will be limited to runtime support. Use of the EF6 designer in Visual Studio will still require `System.Data.SqlClient`.

Note that EF Core has a fundamentally different architecture to EF6. In particular, it does not make use of an Entity Data Model (EDM) specification. This means certain features such as EDMX and EntitySQL will never be supported in EF Core.

## Theme: Performance

Great performance is a fundamental tenet of EF Core, lower-level data access, and indeed all of .NET. Every release includes significant work on improving performance. As always, this theme will involve a lot of iterative investigation, which will then inform where we focus resources.

### Performance of database inserts and updates

Tracked by Issue 26797: Improve change tracking and update performance

Value proposition: High performance database inserts and updates from EF Core.

Over the past few releases, we have focused on improving EF Core performance on non-tracking queries. For EF7, we plan to focus on performance related to database inserts and updates. This includes performance of change-tracking queries, performance of `DetectChanges`, and performance of the insert and update commands sent to the database.

Part of this work includes implementation of bulk (set-based) updates, which is tracked above as a highly-requested feature. However, we also plan to improve the performance of traditional updates using `SaveChanges`.

### TechEmpower composite score

Tracked by Issue 26796: Improve performance in the TechEmpower composite score

Value proposition: High performing low-level data updates for all .NET applications.

We have been running the industry standard TechEmpower benchmarks on .NET against a PostgreSQL database for several years. In the last couple of releases, we have significantly improved the Fortunes benchmark for both low-level data access and EF Core.

In the EF7 timeframe we plan to specifically target improvements to the TechEmpower composite score. This measures performance over a wider range of scenarios.
