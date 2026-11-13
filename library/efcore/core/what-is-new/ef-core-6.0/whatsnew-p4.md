---
title: "What's New in EF Core 6.0 (part 4 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-6.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 6.0 (part 4 of 11)

## Azure Cosmos DB provider enhancements

EF Core 6.0 contains many improvements to the Azure Cosmos DB database provider.

> **Tip:**
> You can run and debug into all the Cosmos-specific samples by downloading the sample code from GitHub.

### Default to implicit ownership

GitHub Issue: #24803.

When building a model for the Azure Cosmos DB provider, EF Core 6.0 will mark child entity types as owned by their parent entity by default. This removes the need for much of the `OwnsMany` and `OwnsOne` calls in the Azure Cosmos DB model. This makes it easier to embed child types into the document for the parent type, which is usually the appropriate way to model parents and children in a document database.

For example, consider these entity types:

```csharp
public class Family
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    public string LastName { get; set; }
    public bool IsRegistered { get; set; }

    public Address Address { get; set; }

    public IList<Parent> Parents { get; } = new List<Parent>();
    public IList<Child> Children { get; } = new List<Child>();
}

public class Parent
{
    public string FamilyName { get; set; }
    public string FirstName { get; set; }
}

public class Child
{
    public string FamilyName { get; set; }
    public string FirstName { get; set; }
    public int Grade { get; set; }

    public string Gender { get; set; }

    public IList<Pet> Pets { get; } = new List<Pet>();
}
```

In EF Core 5.0, these types would have been modeled for Azure Cosmos DB with the following configuration:

```csharp
modelBuilder.Entity<Family>()
    .HasPartitionKey(e => e.LastName)
    .OwnsMany(f => f.Parents);

modelBuilder.Entity<Family>()
    .OwnsMany(f => f.Children)
    .OwnsMany(c => c.Pets);

modelBuilder.Entity<Family>()
    .OwnsOne(f => f.Address);
```

In EF Core 6.0, the ownership is implicit, reducing the model configuration to:

```csharp
modelBuilder.Entity<Family>().HasPartitionKey(e => e.LastName);
```

The resulting Azure Cosmos DB documents have the family's parents, children, pets, and address embedded in the family document. For example:

```json
{
  "Id": "Wakefield.7",
  "LastName": "Wakefield",
  "Discriminator": "Family",
  "IsRegistered": true,
  "id": "Family|Wakefield.7",
  "Address": {
    "City": "NY",
    "County": "Manhattan",
    "State": "NY"
  },
  "Children": [
    {
      "FamilyName": "Merriam",
      "FirstName": "Jesse",
      "Gender": "female",
      "Grade": 8,
      "Pets": [
        {
          "GivenName": "Goofy"
        },
        {
          "GivenName": "Shadow"
        }
      ]
    },
    {
      "FamilyName": "Miller",
      "FirstName": "Lisa",
      "Gender": "female",
      "Grade": 1,
      "Pets": []
    }
  ],
  "Parents": [
    {
      "FamilyName": "Wakefield",
      "FirstName": "Robin"
    },
    {
      "FamilyName": "Miller",
      "FirstName": "Ben"
    }
  ],
  "_rid": "x918AKh6p20CAAAAAAAAAA==",
  "_self": "dbs/x918AA==/colls/x918AKh6p20=/docs/x918AKh6p20CAAAAAAAAAA==/",
  "_etag": "\"00000000-0000-0000-adee-87f30c8c01d7\"",
  "_attachments": "attachments/",
  "_ts": 1632121802
}
```

> **Note:**
> It's important to remember that the `OwnsOne`/`OwnsMany` configuration must be used if you need to further configure these owned types.

### Collections of primitive types

GitHub Issue: #14762.

EF Core 6.0 natively maps collections of primitive types when using the Azure Cosmos DB database provider. For example, consider this entity type:

```csharp
public class Book
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public IList<string> Quotes { get; set; }
    public IDictionary<string, string> Notes { get; set; }
}
```

Both the list and the dictionary can be populated and inserted into the database in the normal way:

```csharp
using var context = new BooksContext();

var book = new Book
{
    Title = "How It Works: Incredible History",
    Quotes = new List<string>
    {
        "Thomas (Tommy) Flowers was the British engineer behind the design of the Colossus computer.",
        "Invented originally for Guinness, plastic widgets are nitrogen-filled spheres.",
        "For 20 years after its introduction in 1979, the Walkman dominated the personal stereo market."
    },
    Notes = new Dictionary<string, string>
    {
        { "121", "Fridges" },
        { "144", "Peter Higgs" },
        { "48", "Saint Mark's Basilica" },
        { "36", "The Terracotta Army" }
    }
};

context.Add(book);
await context.SaveChangesAsync();
```

This results in the following JSON document:

```json
{
    "Id": "0b32283e-22a8-4103-bb4f-6052604868bd",
    "Discriminator": "Book",
    "Notes": {
        "36": "The Terracotta Army",
        "48": "Saint Mark's Basilica",
        "121": "Fridges",
        "144": "Peter Higgs"
    },
    "Quotes": [
        "Thomas (Tommy) Flowers was the British engineer behind the design of the Colossus computer.",
        "Invented originally for Guinness, plastic widgets are nitrogen-filled spheres.",
        "For 20 years after its introduction in 1979, the Walkman dominated the personal stereo market."
    ],
    "Title": "How It Works: Incredible History",
    "id": "Book|0b32283e-22a8-4103-bb4f-6052604868bd",
    "_rid": "t-E3AIxaencBAAAAAAAAAA==",
    "_self": "dbs/t-E3AA==/colls/t-E3AIxaenc=/docs/t-E3AIxaencBAAAAAAAAAA==/",
    "_etag": "\"00000000-0000-0000-9b50-fc769dc901d7\"",
    "_attachments": "attachments/",
    "_ts": 1630075016
}
```

These collections can then be updated, again in the normal way:

```csharp
book.Quotes.Add("Pressing the emergency button lowered the rods again.");
book.Notes["48"] = "Chiesa d'Oro";

await context.SaveChangesAsync();
```

Limitations:

* Only dictionaries with string keys are supported
* Querying into the contents of primitive collections is not currently supported. Vote for #16926, #25700, and #25701 if these features are important to you.

### Translations to built-in functions

GitHub Issue: #16143.

The Azure Cosmos DB provider now translates more Base Class Library (BCL) methods to Azure Cosmos DB built-in-functions. The following tables show translations that are new in EF Core 6.0.

**String translations**

| BCL method         | Built-in function | Notes                       |
|:-------------------|-------------------|-----------------------------|
| `String.Length`    | `LENGTH`          |                             |
| `String.ToLower`   | `LOWER`           |                             |
| `String.TrimStart` | `LTRIM`           |                             |
| `String.TrimEnd`   | `RTRIM`           |                             |
| `String.Trim`      | `TRIM`            |                             |
| `String.ToUpper`   | `UPPER`           |                             |
| `String.Substring` | `SUBSTRING`       |                             |
| `+` operator       | `CONCAT`          |                             |
| `String.IndexOf`   | `INDEX_OF`        |                             |
| `String.Replace`   | `REPLACE`         |                             |
| `String.Equals`    | `STRINGEQUALS`    | Only case-insensitive calls |

Translations for `LOWER`, `LTRIM`, `RTRIM`, `TRIM`, `UPPER`, and `SUBSTRING` were contributed by @Marusyk. Many thanks!

For Example:

```csharp
var stringResults = await context.Triangles.Where(
        e => e.Name.Length > 4
             && e.Name.Trim().ToLower() != "obtuse"
             && e.Name.TrimStart().Substring(2, 2).Equals("uT", StringComparison.OrdinalIgnoreCase))
    .ToListAsync();
```

Which translates to:

```sql
SELECT c
FROM root c
WHERE ((c["Discriminator"] = "Triangle") AND (((LENGTH(c["Name"]) > 4) AND (LOWER(TRIM(c["Name"])) != "obtuse")) AND STRINGEQUALS(SUBSTRING(LTRIM(c["Name"]), 2, 2), "uT", true)))
```

**Math translations**

| BCL method                          | Built-in function |
|:------------------------------------|-------------------|
| `Math.Abs` or `MathF.Abs`           | `ABS`             |
| `Math.Acos` or `MathF.Acos`         | `ACOS`            |
| `Math.Asin` or `MathF.Asin`         | `ASIN`            |
| `Math.Atan` or `MathF.Atan`         | `ATAN`            |
| `Math.Atan2` or `MathF.Atan2`       | `ATN2`            |
| `Math.Ceiling` or `MathF.Ceiling`   | `CEILING`         |
| `Math.Cos` or `MathF.Cos`           | `COS`             |
| `Math.Exp` or `MathF.Exp`           | `EXP`             |
| `Math.Floor` or `MathF.Floor`       | `FLOOR`           |
| `Math.Log` or `MathF.Log`           | `LOG`             |
| `Math.Log10` or `MathF.Log10`       | `LOG10`           |
| `Math.Pow` or `MathF.Pow`           | `POWER`           |
| `Math.Round` or `MathF.Round`       | `ROUND`           |
| `Math.Sign` or `MathF.Sign`         | `SIGN`            |
| `Math.Sin` or `MathF.Sin`           | `SIN`             |
| `Math.Sqrt` or `MathF.Sqrt`         | `SQRT`            |
| `Math.Tan` or `MathF.Tan`           | `TAN`             |
| `Math.Truncate` or `MathF.Truncate` | `TRUNC`           |
| `DbFunctions.Random`                | `RAND`            |

These translations were contributed by @Marusyk. Many thanks!

For Example:

```csharp
var hypotenuse = 42.42;
var mathResults = await context.Triangles.Where(
        e => (Math.Round(e.Angle1) == 90.0
              || Math.Round(e.Angle2) == 90.0)
             && (hypotenuse * Math.Sin(e.Angle1) > 30.0
                 || hypotenuse * Math.Cos(e.Angle2) > 30.0))
    .ToListAsync();
```

Which translates to:

```sql
SELECT c
FROM root c
WHERE ((c["Discriminator"] = "Triangle") AND (((ROUND(c["Angle1"]) = 90.0) OR (ROUND(c["Angle2"]) = 90.0)) AND (((@__hypotenuse_0 * SIN(c["Angle1"])) > 30.0) OR ((@__hypotenuse_0 * COS(c["Angle2"])) > 30.0))))
```

**DateTime translations**

| BCL method        | Built-in function    |
|:------------------|----------------------|
| `DateTime.UtcNow` | `GetCurrentDateTime` |

These translations were contributed by @Marusyk. Many thanks!

For Example:

```csharp
var timeResults = await context.Triangles.Where(
        e => e.InsertedOn <= DateTime.UtcNow)
    .ToListAsync();
```

Which translates to:

```sql
SELECT c
FROM root c
WHERE ((c["Discriminator"] = "Triangle") AND (c["InsertedOn"] <= GetCurrentDateTime()))
```

### Raw SQL queries with FromSql

GitHub Issue: #17311.

Sometimes it is necessary to execute a raw SQL query instead of using LINQ. This is now supported with the Azure Cosmos DB provider through use of the `FromSql` method. This works the same way it always has done with relational providers. For example:

```csharp
var maxAngle = 60;
var results = await context.Triangles.FromSqlRaw(
        @"SELECT * FROM root c WHERE c[""Angle1""] <= {0} OR c[""Angle2""] <= {0}", maxAngle)
    .ToListAsync();
```

Which is executed as:

```sql
SELECT c
FROM (
    SELECT * FROM root c WHERE c["Angle1"] <= @p0 OR c["Angle2"] <= @p0
) c
```

### Distinct queries

GitHub Issue: #16144.

Simple queries using `Distinct` are now translated. For example:

```csharp
var distinctResults = await context.Triangles
    .Select(e => e.Angle1).OrderBy(e => e).Distinct()
    .ToListAsync();
```

Which translates to:

```sql
SELECT DISTINCT c["Angle1"]
FROM root c
WHERE (c["Discriminator"] = "Triangle")
ORDER BY c["Angle1"]
```
