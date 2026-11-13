---
title: "Accessing Tracked Entities - EF Core (part 1 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/change-tracking/entity-entries.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Accessing Tracked Entities

There are four main APIs for accessing entities tracked by a `Microsoft.EntityFrameworkCore.DbContext`:

- `Microsoft.EntityFrameworkCore.DbContext.Entry*` returns an `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1` instance for a given entity instance.
- `Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries*` returns `Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1` instances for all tracked entities, or for all tracked entities of a given type.
- `Microsoft.EntityFrameworkCore.DbContext.Find*`, `Microsoft.EntityFrameworkCore.DbContext.FindAsync*`, `Microsoft.EntityFrameworkCore.DbSet`1.Find*`, and `Microsoft.EntityFrameworkCore.DbSet`1.FindAsync*` find a single entity by primary key, first looking in tracked entities, and then querying the database if needed.
- `Microsoft.EntityFrameworkCore.DbSet`1.Local` returns actual entities (not EntityEntry instances) for entities of the entity type represented by the DbSet.

Each of these is described in more detail in the sections below.

> **Tip:**
> This document assumes that entity states and the basics of EF Core change tracking are understood. See Change Tracking in EF Core for more information on these topics.

> **Tip:**
> You can run and debug into all the code in this document by downloading the sample code from GitHub.
