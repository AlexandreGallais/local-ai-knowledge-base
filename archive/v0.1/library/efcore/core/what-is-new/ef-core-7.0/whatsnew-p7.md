---
title: "What's New in EF Core 7.0 (part 7 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 7 of 16)

### TPC query performance

For queries, the TPC strategy is an improvement over TPT because it ensures that the information for a given entity instance is always stored in a single table. This means the TPC strategy can be useful when the mapped hierarchy is large and has many concrete (usually leaf) types, each with a large number of properties, and where only a small subset of types are used in most queries.

The SQL generated for three simple LINQ queries can be used to observe where TPC does well when compared to TPH and TPT. These queries are:

1. A query that returns entities of all types in the hierarchy:

   ```csharp
   context.Animals.ToList();
   ```

2. A query that returns entities from a subset of types in the hierarchy:

   ```csharp
   context.Pets.ToList();
   ```

3. A query that returns only entities from a single leaf type in the hierarchy:

   ```csharp
   context.Cats.ToList();
   ```

#### TPH queries

When using TPH, all three queries only query a single table, but with different filters on the discriminator column:

1. TPH SQL returning entities of all types in the hierarchy:

   ```sql
   SELECT [a].[Id], [a].[Discriminator], [a].[FoodId], [a].[Name], [a].[Species], [a].[Value], [a].[FavoriteAnimalId], [a].[Vet], [a].[EducationLevel], [a].[FavoriteToy]
   FROM [Animals] AS [a]
   ```

2. TPH SQL returning entities from a subset of types in the hierarchy:

   ```sql
   SELECT [a].[Id], [a].[Discriminator], [a].[FoodId], [a].[Name], [a].[Vet], [a].[EducationLevel], [a].[FavoriteToy]
   FROM [Animals] AS [a]
   WHERE [a].[Discriminator] IN (N'Cat', N'Dog')
   ```

3. TPH SQL returning only entities from a single leaf type in the hierarchy:

   ```sql
   SELECT [a].[Id], [a].[Discriminator], [a].[FoodId], [a].[Name], [a].[Vet], [a].[EducationLevel]
   FROM [Animals] AS [a]
   WHERE [a].[Discriminator] = N'Cat'
   ```

All these queries should perform well, especially with an appropriate database index on the discriminator column.

#### TPT queries

When using TPT, all of these queries require joining multiple tables, since the data for any given concrete type is split across many tables:

1. TPT SQL returning entities of all types in the hierarchy:

   ```sql
   SELECT [a].[Id], [a].[FoodId], [a].[Name], [f].[Species], [f].[Value], [h].[FavoriteAnimalId], [p].[Vet], [c].[EducationLevel], [d].[FavoriteToy], CASE
       WHEN [d].[Id] IS NOT NULL THEN N'Dog'
       WHEN [c].[Id] IS NOT NULL THEN N'Cat'
       WHEN [h].[Id] IS NOT NULL THEN N'Human'
       WHEN [f].[Id] IS NOT NULL THEN N'FarmAnimal'
   END AS [Discriminator]
   FROM [Animals] AS [a]
   LEFT JOIN [FarmAnimals] AS [f] ON [a].[Id] = [f].[Id]
   LEFT JOIN [Humans] AS [h] ON [a].[Id] = [h].[Id]
   LEFT JOIN [Pets] AS [p] ON [a].[Id] = [p].[Id]
   LEFT JOIN [Cats] AS [c] ON [a].[Id] = [c].[Id]
   LEFT JOIN [Dogs] AS [d] ON [a].[Id] = [d].[Id]
   ```

2. TPT SQL returning entities from a subset of types in the hierarchy:

   ```sql
   SELECT [a].[Id], [a].[FoodId], [a].[Name], [p].[Vet], [c].[EducationLevel], [d].[FavoriteToy], CASE
       WHEN [d].[Id] IS NOT NULL THEN N'Dog'
       WHEN [c].[Id] IS NOT NULL THEN N'Cat'
   END AS [Discriminator]
   FROM [Animals] AS [a]
   INNER JOIN [Pets] AS [p] ON [a].[Id] = [p].[Id]
   LEFT JOIN [Cats] AS [c] ON [a].[Id] = [c].[Id]
   LEFT JOIN [Dogs] AS [d] ON [a].[Id] = [d].[Id]
   ```

3. TPT SQL returning only entities from a single leaf type in the hierarchy:

   ```sql
   SELECT [a].[Id], [a].[FoodId], [a].[Name], [p].[Vet], [c].[EducationLevel]
   FROM [Animals] AS [a]
   INNER JOIN [Pets] AS [p] ON [a].[Id] = [p].[Id]
   INNER JOIN [Cats] AS [c] ON [a].[Id] = [c].[Id]
   ```

> **Note:**
> EF Core uses “discriminator synthesis” to determine which table the data comes from, and hence the correct type to use. This works because the LEFT JOIN returns nulls for the dependent ID column (the “sub-tables”) which aren’t the correct type. So for a dog, `[d].[Id]` will be non-null, and all the other (concrete) IDs will be null.

All of these queries can suffer from performance issues due to the table joins. This is why TPT is never a good choice for query performance.

#### TPC queries

TPC improves over TPT for all of these queries because the number of tables that need to be queried is reduced. In addition, the results from each table are combined using `UNION ALL`, which can be considerably faster than a table join, since it does not need to perform any matching between rows or de-duplication of rows.

1. TPC SQL returning entities of all types in the hierarchy:

   ```sql
   SELECT [f].[Id], [f].[FoodId], [f].[Name], [f].[Species], [f].[Value], NULL AS [FavoriteAnimalId], NULL AS [Vet], NULL AS [EducationLevel], NULL AS [FavoriteToy], N'FarmAnimal' AS [Discriminator]
   FROM [FarmAnimals] AS [f]
   UNION ALL
   SELECT [h].[Id], [h].[FoodId], [h].[Name], NULL AS [Species], NULL AS [Value], [h].[FavoriteAnimalId], NULL AS [Vet], NULL AS [EducationLevel], NULL AS [FavoriteToy], N'Human' AS [Discriminator]
   FROM [Humans] AS [h]
   UNION ALL
   SELECT [c].[Id], [c].[FoodId], [c].[Name], NULL AS [Species], NULL AS [Value], NULL AS [FavoriteAnimalId], [c].[Vet], [c].[EducationLevel], NULL AS [FavoriteToy], N'Cat' AS [Discriminator]
   FROM [Cats] AS [c]
   UNION ALL
   SELECT [d].[Id], [d].[FoodId], [d].[Name], NULL AS [Species], NULL AS [Value], NULL AS [FavoriteAnimalId], [d].[Vet], NULL AS [EducationLevel], [d].[FavoriteToy], N'Dog' AS [Discriminator]
   FROM [Dogs] AS [d]
   ```

2. TPC SQL returning entities from a subset of types in the hierarchy:

   ```sql
   SELECT [c].[Id], [c].[FoodId], [c].[Name], [c].[Vet], [c].[EducationLevel], NULL AS [FavoriteToy], N'Cat' AS [Discriminator]
   FROM [Cats] AS [c]
   UNION ALL
   SELECT [d].[Id], [d].[FoodId], [d].[Name], [d].[Vet], NULL AS [EducationLevel], [d].[FavoriteToy], N'Dog' AS [Discriminator]
   FROM [Dogs] AS [d]
   ```

3. TPC SQL returning only entities from a single leaf type in the hierarchy:

   ```sql
   SELECT [c].[Id], [c].[FoodId], [c].[Name], [c].[Vet], [c].[EducationLevel]
   FROM [Cats] AS [c]
   ```

Even though TPC is better than TPT for all of these queries, the TPH queries are still better when returning instances of multiple types. This is one of the reasons that TPH is the default strategy used by EF Core.

As the SQL for query #3 shows, TPC really excels when querying for entities of a single leaf type. The query only uses a single table and needs no filtering.

### TPC inserts and updates

TPC also performs well when saving a new entity, since this requires inserting only a single row into a single table. This is also true for TPH. With TPT, rows must be inserted into many tables, which will perform less well.

The same is often true for updates, although in this case if all columns being updated are in the same table, even for TPT, then the difference may not be significant.

### Space considerations

Both TPT and TPC can use less storage than TPH when there are many subtypes with many properties that are often not used. This is because every row in the TPH table must store a `NULL` for each of these unused properties. In practice, this is rarely an issue, but it could be worth considering when storing large amounts of data with these characteristics.

> **Tip:**
> If your database system supports it (e.g. SQL Server), then consider using "sparse columns" for TPH columns that will be rarely populated.

### Key <example-value>

The inheritance mapping strategy chosen has consequences for how primary key <example-value> are generated and managed. Keys in TPH are easy since each entity instance is represented by a single row in a single table. Any kind of key value generation can be used, and no additional constraints are needed.

For the TPT strategy, there is always a row in the table mapped to the base type of the hierarchy. Any kind of key <example-value> can be used on this row, and the keys for other tables are linked to this table using foreign key constraints.

Things get a bit more complicated for TPC. First, it’s important to understand that EF Core requires that all entities in a hierarchy must have a unique key value, even if the entities have different types. So, using our example model, a Dog cannot have the same Id key value as a Cat. Second, unlike TPT, there is no common table that can act as the single place where key <example-value> live and can be generated. This means a simple `Identity` column cannot be used.

For databases that support sequences, key <example-value> can be generated by using a single sequence referenced in the default constraint for each table. This is the strategy used in the TPC tables shown above, where each table has the following:

```sql
[Id] int NOT NULL DEFAULT (NEXT VALUE FOR [AnimalSequence])
```

`AnimalSequence` is a database sequence created by EF Core. This strategy is used by default for TPC hierarchies when using the EF Core database provider for SQL Server. Database providers for other databases that support sequences should have a similar default. Other key <example-value> strategies that use sequences, such as Hi-Lo patterns, may also be used with TPC.

While standard Identity columns will not work with TPC, it is possible to use Identity columns if each table is configured with an appropriate seed and increment such that the values generated for each table will never conflict. For example:

```csharp
modelBuilder.Entity<Cat>().ToTable("Cats", tb => tb.Property(e => e.Id).UseIdentityColumn(1, 4));
modelBuilder.Entity<Dog>().ToTable("Dogs", tb => tb.Property(e => e.Id).UseIdentityColumn(2, 4));
modelBuilder.Entity<FarmAnimal>().ToTable("FarmAnimals", tb => tb.Property(e => e.Id).UseIdentityColumn(3, 4));
modelBuilder.Entity<Human>().ToTable("Humans", tb => tb.Property(e => e.Id).UseIdentityColumn(4, 4));
```

SQLite does not support sequences or Identity seed/increment, and hence integer key value generation is not supported when using SQLite with the TPC strategy. However, client-side generation or globally unique keys--for example, GUID keys--are supported on any database, including SQLite.

### Foreign key <example-value>

The TPC mapping strategy creates a denormalized SQL schema--this is one reason why some database purists are against it. For example, consider the foreign key <example-value> `FavoriteAnimalId`. The value in this column must match the primary key value of some animal. This can be enforced in the database with a simple FK constraint when using TPH or TPT. For example:

```sql
CONSTRAINT [FK_Animals_Animals_FavoriteAnimalId] FOREIGN KEY ([FavoriteAnimalId]) REFERENCES [Animals] ([Id])
```

But when using TPC, the primary key for an animal is stored in the table for the concrete type of that animal. For example, a cat's primary key is stored in the `Cats.Id` column, while a dog's primary key is stored in the `Dogs.Id` column, and so on. This means an FK constraint cannot be created for this relationship.

In practice, this is not a problem as long as the application does not attempt to insert invalid data. For example, if all the data is inserted by EF Core and uses navigations to relate entities, then it is guaranteed that the FK column will contain valid PK value at all times.

### Summary and guidance

In summary, TPC is a good mapping strategy to use when your code will mostly query for entities of a single leaf type. This is because the storage requirements are smaller, and there is no discriminator column that may need an index. Inserts and updates are also efficient.

That being said, TPH is usually fine for most applications, and is a good default for a wide range of scenarios, so don't add the complexity of TPC if you don't need it. Specifically, if your code will mostly query for entities of many types, such as writing queries against the base type, then lean towards TPH over TPC.

Use TPT only if constrained to do so by external factors.

## Custom Reverse Engineering Templates

You can now customize the scaffolded code when reverse engineering an EF model from a database. Get started by adding the default templates to your project:

```dotnetcli
dotnet new install Microsoft.EntityFrameworkCore.Templates
dotnet new ef-templates
```

The templates can then be customize and will automatically be used by `dotnet ef dbcontext scaffold` and `Scaffold-DbContext`.

For more details, see Custom Reverse Engineering Templates.

> **Tip:**
> The EF Team demonstrated and talked in depth about reverse engineering templates in an episode of the .NET Data Community Standup. As with all Community Standup episodes, you can watch the T4 templates episode now on YouTube.
