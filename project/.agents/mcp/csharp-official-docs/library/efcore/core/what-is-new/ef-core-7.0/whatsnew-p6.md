---
title: "What's New in EF Core 7.0 (part 6 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 6 of 16)

## Table-per-concrete-type (TPC) inheritance mapping

By default, EF Core maps an inheritance hierarchy of .NET types to a single database table. This is known as the table-per-hierarchy (TPH) mapping strategy. EF Core 5.0 introduced the table-per-type (TPT) strategy, which supports mapping each .NET type to a different database table. EF7 introduces the table-per-concrete-type (TPC) strategy. TPC also maps .NET types to different tables, but in a way that addresses some common performance issues with the TPT strategy.

> **Tip:**
> The code shown here comes from TpcInheritanceSample.cs.

> **Tip:**
> The EF Team demonstrated and talked in depth about TPC mapping in an episode of the .NET Data Community Standup. As with all Community Standup episodes, you can watch the TPC episode now on YouTube.

### TPC database schema

The TPC strategy is similar to the TPT strategy except that a different table is created for every _concrete_ type in the hierarchy, but tables are **not** created for _abstract_ types--hence the name “table-per-concrete-type”. As with TPT, the table itself indicates the type of the saved object. However, unlike TPT mapping, each table contains columns for every property in the concrete type and its base types. TPC database schemas are denormalized.

For example, consider mapping this hierarchy:

```csharp
public abstract class Animal
{
    protected Animal(string name)
    {
        Name = name;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public abstract string Species { get; }

    public Food? Food { get; set; }
}

public abstract class Pet : Animal
{
    protected Pet(string name)
        : base(name)
    {
    }

    public string? Vet { get; set; }

    public ICollection<Human> Humans { get; } = new List<Human>();
}

public class FarmAnimal : Animal
{
    public FarmAnimal(string name, string species)
        : base(name)
    {
        Species = species;
    }

    public override string Species { get; }

    [Precision(18, 2)]
    public decimal Value { get; set; }

    public override string ToString()
        => $"Farm animal '{Name}' ({Species}/{Id}) worth {Value:C} eats {Food?.ToString() ?? "<Unknown>"}";
}

public class Cat : Pet
{
    public Cat(string name, string educationLevel)
        : base(name)
    {
        EducationLevel = educationLevel;
    }

    public string EducationLevel { get; set; }
    public override string Species => "Felis catus";

    public override string ToString()
        => $"Cat '{Name}' ({Species}/{Id}) with education '{EducationLevel}' eats {Food?.ToString() ?? "<Unknown>"}";
}

public class Dog : Pet
{
    public Dog(string name, string favoriteToy)
        : base(name)
    {
        FavoriteToy = favoriteToy;
    }

    public string FavoriteToy { get; set; }
    public override string Species => "Canis familiaris";

    public override string ToString()
        => $"Dog '{Name}' ({Species}/{Id}) with favorite toy '{FavoriteToy}' eats {Food?.ToString() ?? "<Unknown>"}";
}

public class Human : Animal
{
    public Human(string name)
        : base(name)
    {
    }

    public override string Species => "Homo sapiens";

    public Animal? FavoriteAnimal { get; set; }
    public ICollection<Pet> Pets { get; } = new List<Pet>();

    public override string ToString()
        => $"Human '{Name}' ({Species}/{Id}) with favorite animal '{FavoriteAnimal?.Name ?? "<Unknown>"}'" +
           $" eats {Food?.ToString() ?? "<Unknown>"}";
}
```

When using SQL Server, the tables created for this hierarchy are:

```sql
CREATE TABLE [Cats] (
    [Id] int NOT NULL DEFAULT (NEXT VALUE FOR [AnimalSequence]),
    [Name] nvarchar(max) NOT NULL,
    [FoodId] uniqueidentifier NULL,
    [Vet] nvarchar(max) NULL,
    [EducationLevel] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Cats] PRIMARY KEY ([Id]));

CREATE TABLE [Dogs] (
    [Id] int NOT NULL DEFAULT (NEXT VALUE FOR [AnimalSequence]),
    [Name] nvarchar(max) NOT NULL,
    [FoodId] uniqueidentifier NULL,
    [Vet] nvarchar(max) NULL,
    [FavoriteToy] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Dogs] PRIMARY KEY ([Id]));

CREATE TABLE [FarmAnimals] (
    [Id] int NOT NULL DEFAULT (NEXT VALUE FOR [AnimalSequence]),
    [Name] nvarchar(max) NOT NULL,
    [FoodId] uniqueidentifier NULL,
    [Value] decimal(18,2) NOT NULL,
    [Species] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_FarmAnimals] PRIMARY KEY ([Id]));

CREATE TABLE [Humans] (
    [Id] int NOT NULL DEFAULT (NEXT VALUE FOR [AnimalSequence]),
    [Name] nvarchar(max) NOT NULL,
    [FoodId] uniqueidentifier NULL,
    [FavoriteAnimalId] int NULL,
    CONSTRAINT [PK_Humans] PRIMARY KEY ([Id]));
```

Notice that:

- There are no tables for the `Animal` or `Pet` types, since these are `abstract` in the object model. Remember that C# does not allow instances of abstract types, and there is therefore no situation where an abstract type instance will be saved to the database.
- The mapping of properties in base types is repeated for each concrete type. For example, every table has a `Name` column, and both Cats and Dogs have a `Vet` column.

- Saving some data into this database results in the following:

**Cats table**

| Id  | Name   | FoodId                               | Vet                  | EducationLevel |
|:----|:-------|:-------------------------------------|:---------------------|:---------------|
| 1   | Alice  | 99ca3e98-b26d-4a0c-d4ae-08da7aca624f | Pengelly             | MBA            |
| 2   | Mac    | 99ca3e98-b26d-4a0c-d4ae-08da7aca624f | Pengelly             | Preschool      |
| 8   | Baxter | 5dc5019e-6f72-454b-d4b0-08da7aca624f | Bothell Pet Hospital | BSc            |

**Dogs table**

| Id  | Name  | FoodId                               | Vet      | FavoriteToy  |
|:----|:------|:-------------------------------------|:---------|:-------------|
| 3   | Toast | 011aaf6f-d588-4fad-d4ac-08da7aca624f | Pengelly | Mr. Squirrel |

**FarmAnimals table**

| Id  | Name  | FoodId                               | Value  | Species                |
|:----|:------|:-------------------------------------|:-------|:-----------------------|
| 4   | Clyde | 1d495075-f527-4498-d4af-08da7aca624f | 100.00 | Equus africanus asinus |

**Humans table**

| Id  | Name   | FoodId                               | FavoriteAnimalId      |
|:----|:-------|:-------------------------------------|:----------------------|
| 5   | Wendy  | 5418fd81-7660-432f-d4b1-08da7aca624f | 2                     |
| 6   | Arthur | 59b495d4-0414-46bf-d4ad-08da7aca624f | 1                     |
| 9   | Katie  | null                                 | 8                     |

Notice that, unlike with TPT mapping, all the information for a single object is contained in a single table. And, unlike with TPH mapping, there is no combination of column and row in any table where that is never used by the model. We'll see below how these characteristics can be important for queries and storage.

### Configuring TPC inheritance

All types in an inheritance hierarchy must be explicitly included in the model when mapping the hierarchy with EF Core. This can be done by creating `DbSet` properties on your `DbContext` for every type:

```csharp
public DbSet<Animal> Animals => Set<Animal>();
public DbSet<Pet> Pets => Set<Pet>();
public DbSet<FarmAnimal> FarmAnimals => Set<FarmAnimal>();
public DbSet<Cat> Cats => Set<Cat>();
public DbSet<Dog> Dogs => Set<Dog>();
public DbSet<Human> Humans => Set<Human>();
```

Or by using the `Entity` method in `OnModelCreating`:

```csharp
modelBuilder.Entity<Animal>();
modelBuilder.Entity<Pet>();
modelBuilder.Entity<Cat>();
modelBuilder.Entity<Dog>();
modelBuilder.Entity<FarmAnimal>();
modelBuilder.Entity<Human>();
```

> **Important:**
> This is different from the legacy EF6 behavior, where derived types of mapped base types would be automatically discovered if they were contained in the same assembly.

Nothing else needs to be done to map the hierarchy as TPH, since it is the default strategy. However, starting with EF7, TPH can be made explicit by calling `UseTphMappingStrategy` on the base type of the hierarchy:

```csharp
modelBuilder.Entity<Animal>().UseTphMappingStrategy();
```

To use TPT instead, change this to `UseTptMappingStrategy`:

```csharp
modelBuilder.Entity<Animal>().UseTptMappingStrategy();
```

Likewise, `UseTpcMappingStrategy` is used to configure TPC:

```csharp
modelBuilder.Entity<Animal>().UseTpcMappingStrategy();
```

In each case, the table name used for each type is taken from the `DbSet` property name on your `DbContext`, or can be configured using the `ToTable` builder method, or the `[Table]` attribute.
