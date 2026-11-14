---
title: "Tools & Extensions - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/extensions/index.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# EF Core Tools & Extensions

These tools and extensions provide additional functionality for Entity Framework Core.

> **Important:**
> Extensions are built by a variety of sources and aren't maintained as part of the Entity Framework Core project. When considering a third party extension, be sure to evaluate its quality, licensing, compatibility, support, etc. to ensure it meets your requirements. In particular, an extension built for an older version of EF Core may need updating before it will work with the latest versions.

## Tools

### EF Core Power Tools

EF Core Power Tools is a Visual Studio extension that exposes various EF Core design-time tasks in a simple user interface. It includes reverse engineering of DbContext and entity classes from existing databases and SQL Server DACPACs, and model visualizations and diagrams. For EF Core: 8-10.

GitHub wiki

### EF Core Power Tools CLI

EF Core Power Tools CLI is a .NET global command line tool. It enables advanced reverse engineering of DbContext and entity classes from existing databases and SQL Server DACPACs. For EF Core: 8-10.

NuGet

### LLBLGen Pro

LLBLGen Pro is an entity modeling solution with support for Entity Framework and Entity Framework Core. It lets you easily define your entity model and map it to your database, using database first or model first, so you can get started writing queries right away. For EF Core: 2-9.

Website

### Devart Entity Developer

Entity Developer is a powerful O/RM designer for ADO.NET Entity Framework, NHibernate, LinqConnect, Telerik Data Access, and LINQ to SQL. It supports designing EF Core models visually, using model first or database first approaches, and C# or Visual Basic code generation. For EF Core: 2-9.

Website

### DevMagic EF Core Sidekick

EF Core Sidekick is a Visual Studio extension that enhances the power of auto code generation in Visual Studio. It provides a set of tools and templates for generating EF Core entities and derived DbContext from existing database, and then generating services and REST APIs from the entities. For EF Core: 6-9.

Visual Studio Marketplace |
Website

### Entity Framework Visual Editor

Entity Framework Visual Editor is a Visual Studio extension that adds an O/RM designer for visual design of EF 6, and EF Core classes. Code is generated using T4 templates so can be customized to suit any needs. It supports inheritance, unidirectional and bidirectional associations, enumerations, and the ability to color-code your classes and add text blocks to explain potentially arcane parts of your design. For EF Core: 2-8.

Visual Studio Marketplace

### efmig

efmig is a multi-platform GUI application that speeds up daily development when working with Entity Framework Core. It covers the most popular use cases such as migration code and script generation with simple, one-click interface. For EF Core: 2-8.

GitHub repository

### EFCore.Visualizer

With Entity Framework Core query plan debugger visualizer, you can view the query plan of your queries directly inside Visual Studio. Currently, the visualizer supports SQL Server and PostgreSQL. For EF Core: 7-8.

Visual Studio Marketplace

## Extensions

### EFCoreSecondLevelCacheInterceptor

Second level caching is a query cache. The results of EF commands will be stored in the cache, so that the same EF commands will retrieve their data from the cache rather than executing them against the database again. For EF Core: 3-8.

GitHub repository | NuGet

### EntityFrameworkCore.Scaffolding.Handlebars

Allows customization of classes reverse engineered from an existing database using the Entity Framework Core tool chain with Handlebars templates. For EF Core: 2-8.

GitHub repository | NuGet

### NeinLinq.EntityFrameworkCore

NeinLinq extends LINQ providers such as Entity Framework to enable reusing functions, rewriting queries, and building dynamic queries using translatable predicates and selectors. For EF Core: 3-8.

GitHub repository | NuGet

### EFCore.BulkExtensions

EF Core extensions for Bulk operations (Insert, Update, Delete). For EF Core: 2-8.

GitHub repository | NuGet

### EFCore.ReturningExtensions

EF Core extensions to retrieve rows affected by UPDATE or DELETE query within single round trip. For EF Core: 8-11.

GitHub repository | NuGet

### Bricelam.EntityFrameworkCore.Pluralizer

Adds design-time pluralization. For EF Core: 2-9.

GitHub repository | NuGet

### Verify.EntityFramework

Extends Verify to allow snapshot testing with Entity Framework. For EF Core: 3-8.

GitHub repository | NuGet

### LocalDb

Provides a wrapper around SQL Server Express LocalDB to simplify running tests against Entity Framework.

GitHub repository | NuGet

### EfCore.InMemory.Transactions

Seamless transaction support for EF Core InMemory provider. Eliminates "transactions with isolation level are not supported" errors in tests without changing production code. Provides safe extension methods and NoOpDbContextTransaction for UnitOfWork patterns. For EF Core: 8-10.

GitHub repository | NuGet

### EntityFrameworkCore.Projectables

Flexible projection magic for EF Core. Use properties, methods, and extension methods in your query without client evaluation. For EF Core: 3-6, 8.

GitHub repository | NuGet

### Entity Framework Plus

Extends your DbContext with features such as: Include Filter, Auditing, Caching, Query Future, Batch Delete, Batch Update, and more. For EF Core: 2-10.

Website | GitHub repository | NuGet

### Entity Framework Extensions

Extends your DbContext with high-performance bulk operations: BulkSaveChanges, BulkInsert, BulkUpdate, BulkDelete, BulkMerge, and more. For EF Core: 2-10.

Website | NuGet

### Expressionify

Add support for calling extension methods in LINQ lambdas. For EF Core: 3-9.

GitHub repository | NuGet

### EntityLinq

Alternative (not MS based) Language Integrated Query (LINQ) technology for relational databases. It allows you to use C# to write strongly typed SQL queries. For EF Core: 3-8.

- Full C# support for query creation: multiple statements inside lambda, variables, functions, etc.
- No semantic gap with SQL. EntityLinq declares SQL statements (like `SELECT`, `FROM`, `WHERE`) as first class C# methods, combining familiar syntax with intellisense, type safety and refactoring.

As a result SQL becomes just "another" class library exposing its API locally, literally *"Language Integrated SQL"*.

Website | NuGet

### EFCore.NamingConventions

This will automatically make all your table and column names have snake_case, all UPPER or all lower case naming. For EF Core: 3-9.

GitHub repository | NuGet

### EFCore.CheckConstraints

This plugin allows you to opt into some check constraints - just activate it and they'll automatically get created for you. For EF Core: 5-9.

GitHub repository | NuGet

### SimplerSoftware.EntityFrameworkCore.SqlServer.NodaTime

Adds native support to EntityFrameworkCore for SQL Server for the NodaTime types. For EF Core: 3-9.

GitHub repository | NuGet

### linq2db.EntityFrameworkCore

Alternative translator of LINQ queries to SQL expressions. For EF Core: 2-8.

Includes support for advanced SQL features such as CTEs, bulk copy, table hints, windowed functions, temporary tables, and database-side create/update/delete operations.

GitHub repository | NuGet

### EntityFrameworkCore.ConfigurationManager

Extends EF Core to resolve connection strings from App.config. For EF Core: 3-9.

GitHub repository | NuGet

### Detached Mapper

A DTO-Entity mapper with composition/aggregation handling (similar to GraphDiff). For EF Core: 3-8.

GitHub repository | NuGet

### EntityFrameworkCore.Sqlite.NodaTime

Adds support for NodaTime types when using SQLite. For EF Core: 5-9.

GitHub repository | NuGet

### ErikEJ.EntityFrameworkCore.SqlServer.Dacpac

Enables reverse engineering an EF Core model from a SQL Server data-tier application package (.dacpac). For EF Core: 6-9.

GitHub repository | NuGet

### ErikEJ.EntityFrameworkCore.DgmlBuilder

Generate DGML (Graph) content that visualizes your DbContext. Adds the AsDgml() extension method to the DbContext class. For EF Core: 6-9.

GitHub repository | NuGet

### EntityFramework.Exceptions

When using Entity Framework Core all database exceptions are wrapped in DbUpdateException. EntityFramework.Exceptions handles all the database-specific details to find which constraint was violated and allows you to use typed exceptions such as `UniqueConstraintException`, `CannotInsertNullException`, `MaxLengthExceededException`, `NumericOverflowException`, `ReferenceConstraintException` when your query violates database constraints.

Supports SQL Server, Postgres, MySql, SQLite and Oracle. For EF Core: 3-8.

GitHub Repository

### EntityFrameworkCore.VisualBasic

Adds VB design-time support to EF Core. For EF Core: 5-8.

GitHub repository | NuGet

### Laraue.EfCoreTriggers

Fluent API to declare triggers in `Context.OnModelCreating` which are later built into migrations. Providers to Postgres, MySQL, SQL Server and SQLite. For EF Core: 5-8.

GitHub repository | NuGet

### EntityCloner.Microsoft.EntityFrameworkCore

Cloning entities using EF Core configuration. You can use the `Include` method to specify related data to be cloned. For EF Core: 5-8.

GitHub repository | NuGet

### Zomp EF Core Extensions

Provides window (analytics) functions and binary functions for EF Core. Providers: SQL Server, SQLite, PostgreSQL. For EF Core: 6-8.

GitHub repository | NuGet

### Entity Framework Ruler

Adds design-time customization of the reverse engineered model including:

- Class, property and navigation naming
- Skipping the scaffolding of any schema, table, or column.
- Overriding property types, especially for enums.
- EF6 EDMX support, providing a smooth 3-step upgrade path from EF6 to EF Core.

For EF Core: 6-8.

GitHub repository | CLI Tool NuGet | Design NuGet

### Microsoft.EntityFrameworkCore.DynamicLinq

The Dynamic LINQ library let you execute query with dynamic string and provide some utilities methods such as ParseLambda, Parse, and CreateClass. For EF Core: 2-10.

Website | GitHub repository | NuGet

### EfCoreNexus.Framework

EfCoreNexus helps integrating the entity framework core into blazor apps. Via reflection it adds the entity classes automatically and provides you with basic crud functionality for them without writing additional code. For EF Core: 8.

GitHub repository | NuGet

### Reconciler

Update an entity graph in store to a given one by inserting, updating and removing the respective entities. For EF Core: 6-7.

GitHub repository

### AutoCompute

Persisted computed properties in EF Core that update automatically on save changes. For EF Core: 8.

GitHub repository | NuGet

### EntityFramework.OrderBy

Applies default ordering to Entity Framework queries based on fluent configuration, ensuring consistent and deterministic query results. Supports nested collections in `.Include()` expressions, multi-column ordering, and automatic database index creation for ordering columns.

GitHub repository | NuGet

### EntityFrameworkCore.AuditInterceptor

A library that provides seamless auditing capabilities for Entity Framework Core. It automatically tracks entity changes including who made the changes and when they were made. The library integrates with .NET Dependency Injection and supports various auditing scenarios through a simple configuration process. For EF Core: 6-8.

GitHub repository | NuGet

### PhenX.EntityFrameworkCore.BulkInsert

A high-performance bulk insert extension for Entity Framework Core. Supports SQL Server, PostgreSQL, SQLite, MySQL and Oracle. For EF Core: 8-9.

Website | GitHub repository

### SanderTenBrinke.EntityFrameworkCore.Extensions.SqlServer.DataMasking

This package focuses on adding data masking support for SQL Server to EF Core. For EF Core: 8-9.

GitHub repository | NuGet

### EFCommenter

All xml summaries of entities, properties, and enums will be added as comments on the corresponding database tables and columns. For EF Core: 9.

GitHub repository | NuGet

### EFCore.Migrations.AutoComments

Automatically applies database comments to tables and columns from XML `<summary>` tags. For EF Core: 6-10.

GitHub repository | NuGet

### EFCore.Migrations.CustomSql

Tracks custom SQL and database objects (views, functions, triggers, etc.) as part of the EF model with auto-generated Up/Down migration code. Provider packages add support for specific database engines. For EF Core: 6-9.

GitHub repository | NuGet

### DataArc.EntityFrameworkCore

Extends Entity Framework Core with bulk and parallel operations, transaction-aware persistence, and optional commercial SQL Server tooling. The core package is free. For EF Core: 6-10.

Website | GitHub repository | NuGet | Documentation

### EfQueryComplexity

Detects overly complex queries and either logs them or throws. Checks include unbounded result sets, maximum `Take`, expression node count and depth, navigation and include depth, collections in a single query, and `IN` list size. Useful for bounding queries shaped by untrusted clients, such as through GraphQL or OData. For EF Core: 10.

GitHub repository | NuGet

### EFCore.ComplexIndexes

Adds migrations support for indexes on properties of complex types, which EF Core 10 cannot index. Includes composite, unique, filtered and descending indexes, with PostgreSQL (GIN/GiST, expression indexes, exclusion and temporal constraints) and SQL Server (clustered, covering, online) options. For EF Core: 10.

GitHub repository | NuGet

## API Integrations

These packages are designed to integrate directly with EF Core to expose various APIs.

### Aspire

Enhance the local development experience by simplifying the management of your cloud-native app's configuration and interconnections. For EF Core: 8-10.

Website | GitHub repository | NuGet

### HotChocolate

Build your own GraphQL endpoint on top of any resource.

GitHub repository | NuGet

### GraphQL.EntityFramework

Add Entity Framework `IQueryable` support to GraphQL. For EF Core: 6-8.

GitHub repository | NuGet

### EntityGraphQL

GraphQL server with tight EntityFramework integration. For EF Core: 5-8.

GitHub repository | NuGet

### OData

A standard for implementing REST APIs with specifications for discovery, filtering, sorting, projections, navigations, bulk operations, and more.

GitHub repository | NuGet

### Raffinert.Expressions.EntityFrameworkCore

Enables composition and reuse of strongly typed predicates and projections in EF Core queries. Expands nested expression invocations for SQL translation and supports dynamic query composition. For EF Core: 10.

GitHub repository | NuGet
