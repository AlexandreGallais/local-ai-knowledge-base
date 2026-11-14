---
title: "Implement CRUD - ASP.NET MVC with EF Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/data/ef-mvc/crud.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Implement CRUD - ASP.NET MVC with EF Core (part 3 of 3)

## Disable tracking of entity objects (no-tracking queries)

When a database context retrieves table rows and creates entity objects that represent them, it tracks whether the entities in memory are in sync with the database, by default. The data in memory acts as a cache and is used when you update an entity. This caching is often unnecessary in a web application because context instances are typically short-lived (a new one is created and disposed for each request). The context that reads an entity is typically disposed before that entity is used again.

You can disable tracking of entity objects in memory by calling the `AsNoTracking` method. Here are some of the common scenarios for this action:

* During the context lifetime, you don't need to update any entities, and you don't need Entity Framework to automatically load navigation properties with entities retrieved by separate queries. These conditions are frequently met in a controller's HttpGet action methods.

* You're running a query that retrieves a large volume of data, and only a small portion of the returned data gets updated. It can be more efficient to turn off tracking for the large query, and run a query later for the few entities that need updates.

* You want to attach an entity to make updates, but earlier you retrieved the same entity for a different purpose. Because the database context already tracks the entity, you can't attach the entity you want to change. One way to handle this situation is to call the `AsNoTracking` method on the earlier query.

For more information, see Tracking versus no-tracking queries.

## Get the code

Download or view the completed application,

## Next step

> Tutorial: Add sorting, filtering, and paging - ASP.NET MVC with EF Core
