---
title: "Managing Database Schemas - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/managing-schemas/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Managing Database Schemas

EF Core provides two primary ways of keeping your EF Core model and database schema in sync. To choose between the two,
decide whether your EF Core model or the database schema is the source of truth.

If you want your EF Core model to be the source of truth, use Migrations. As you make changes to your EF Core
model, this approach incrementally applies the corresponding schema changes to your database so that it remains
compatible with your EF Core model.

Use Reverse Engineering if you want your database schema to be the source of truth. This approach allows you to
scaffold a DbContext and the entity type classes by reverse engineering your database schema into an EF Core model.

> **Note:**
> The create and drop APIs can also create the database schema from your EF Core model. However, they are primarily
> for testing, prototyping, and other scenarios where dropping the database is acceptable.
