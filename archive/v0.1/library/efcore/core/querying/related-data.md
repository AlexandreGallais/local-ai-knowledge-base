---
title: "Loading Related Data - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/querying/related-data/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Loading Related Data

Entity Framework Core allows you to use the navigation properties in your model to load related entities. There are three common O/RM patterns used to load related data.

* **Eager loading** means that the related data is loaded from the database as part of the initial query.
* **Explicit loading** means that the related data is explicitly loaded from the database at a later time.
* **Lazy loading** means that the related data is transparently loaded from the database when the navigation property is accessed.

> **Tip:**
> You can view the samples under this section on GitHub.
