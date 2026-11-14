---
title: "Plan for Entity Framework Core 7.0 (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-7.0/plan.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Plan for Entity Framework Core 7.0

As described in the planning process, we have gathered input from stakeholders into a plan for Entity Framework Core 7.0 (EF Core 7.0.) For brevity, EF Core 7.0 is also referred to as just EF7.

> **Important:**
> This plan is not a commitment; it will evolve as we continue to learn throughout the release. Some things not currently planned for EF7 may get pulled in. Some things currently planned for EF7 may get punted out.

## General information

EF Core 7.0 is the next release after EF Core 6.0 and is currently scheduled for release in November 2022 at the same time as .NET 7. There are no plans for an EF Core 6.1 release.

### Supported platforms

EF7 currently targets .NET 6. This may be updated to .NET 7 as we near the release. EF7 does not target any .NET Standard version; for more information see the future of .NET Standard. EF7 will not run on .NET Framework.

EF7 will align with the .NET support policy and will therefore **not** be a long-term support (LTS) release.

### Breaking changes

EF7 will contain a small number of breaking changes as we continue to evolve both EF Core and the .NET platform. Our goal is to minimize breaking changes as much as possible.

## Themes

The large investments in EF7 will fall mainly under the following themes:

- Highly requested features
- NET platforms and ecosystem
- Clear path forward from EF6
- Performance

Each of these themes is described in detail below. The high-level status of each theme can be tracked in the EF Core biweekly updates. Please comment on GitHub Issue #26994 with any feedback or suggestions.

## Theme: Highly requested features

As always, a major input into the planning process comes from votes (👍) for features on GitHub. Based on these votes in addition to other factors, we plan to work on the following highly requested features for EF7.

### JSON columns

Tracked by Issue #4021: Map JSON values stored in database to EF properties

Value proposition: Save and query into JSON-based documents stored in relational database columns.

This feature will introduce a common mechanism and patterns for JSON support that can be implemented by any database provider. We will work with the community to align existing implementations for Npgsql and Pomelo MySQL, and also add support for SQL Server and SQLite.

### Bulk updates

Tracked by Issue #795: Bulk (i.e. set-based) CUD operations (without loading data into memory)

Value proposition: Efficient, predicate-based updates for many database rows without loading data into memory.

Change tracking followed by SaveChanges is the primary mechanism in EF Core for inserting, updating, and deleting entities. This mechanism ensures that database operations are ordered to satisfy constraints, and that tracked entities are kept in sync with the changes made to the database. However, it requires a database roundtrip to load entities into memory in order to create the appropriate database commands, followed by a database roundtrip to execute these commands.

In contrast, bulk, or set-based, updates involve defining the changes that should be made to the database and then executing those changes without first loading entities into memory. This can be significantly faster than tracked updates, especially when the same modification must be applied to many different entities/rows.

For EF7, we plan to implement bulk updates and deletes (but not inserts). Note that bulk updates is not the same as batching updates. EF Core already combines changes to many tracked entities into batches when sending updates to the database via `SaveChanges`.

### Lifecycle hooks

Tracked by Issue #626: Lifecycle hooks

Value proposition: Allow applications to react when interesting things happen in EF code.

Lifecycle hooks enable notification of an application or library whenever certain interesting conditions or actions occur for entities, properties, relationships, queries, context instances, and other EF constructs. We have implemented many lifecycle hooks over the previous versions of EF Core, including various interceptors and events. For EF7, we plan to add important missing hooks. For example, a hook for manipulation of entity instances after they are created, commonly known as ObjectMaterialized.

### Table-per-concrete-type (TPC) mapping

Tracked by Issue #3170: TPC inheritance mapping pattern

Value proposition: Map entities in a hierarchy to separate tables without taking the performance hit of TPT mapping.

EF Core supports table-per-hierarchy (TPH) and table-per-type (TPT) mapping for .NET inheritance hierarchies. Table-per-concrete-type (TPC) mapping is similar to TPT mapping in that each entity type in the hierarchy is mapped to a different database table. However, while TPT maps properties from a base type to columns in a table for the base type, TPC maps properties of the base type to the same table as the actual concrete type being mapped. This can result in considerably faster performance since multiple tables do not need to be joined when querying for a specific type. This comes at the expense of data denormalization, since columns are duplicated across in the tables mapped to each concrete type in the hierarchy.

The work for TPC mapping also covers more general entity splitting, and support for specifying different facets per table in TPT, TPC or entity splitting.

### Map CUD operations to stored procedures

Tracked by Issue #245: Map inserts, updates, and deletes (CUD operations) to stored procedures

Value proposition: Use stored procedures to manage data modifications.

EF Core already supports querying data from stored procedures. This feature will allow mapping the inserts, updates, and deletes generated by `SaveChanges` to stored procedures in the database.

### Value objects

Tracked by Issue #9906: Use C# structs or classes as value objects

Value proposition: Applications can use DDD-style value objects in EF models.

It was previously the team view that owned entities, intended for aggregate support, would also be a reasonable approximation to value objects. Experience has shown this not to be the case. Therefore, in EF7, we plan to introduce a better experience focused on the needs of value objects in domain-driven design. This approach will be based on value converters rather than owned entities.

This work is initially scoped to allow value converters which map to multiple columns. We may pull in additional support based on feedback during the release.

### Support value generation when using value converters

Tracked by Issue #11597: Support more types of value generation with converters

Value proposition: DDD-style encapsulated key types can make full use of automatically generated key values.

EF Core 6.0 allowed more types of value generation to be used with keys mapped through value converters. We plan to generalize and expand this support in EF7.

### Raw SQL queries for unmapped types

Tracked by Issue #10753: Support raw SQL queries without defining an entity type for the result

Value proposition: Applications can execute more types of raw SQL query without dropping down to ADO.NET or using third-party libraries.

Currently raw SQL queries must return a type in the model, either with or without a key defined. In EF7, we plan to allow raw SQL queries that directly return types that are not contained in the EF model.

The work here will also cover raw SQL queries that return simple/scalar types, such as `Guid`, `DateTime`, `int`, and `string`.

### Database scaffolding templates

Tracked by Issue #4038: Code templates for scaffolding entity types and DbContext from an existing database

Value proposition: The code generated by `dotnet ef database scaffold` can be fully customized.

We frequently receive requests to adjust the code generated when scaffolding (reverse engineering) from an existing database. We plan to address these requests in EF7 by supporting T4 templates for the generated entity types and `DbContext`. Developers will be able to customize the standard templates, or create new templates from scratch.
