---
title: "What's New in EF Core 6.0 (part 7 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-6.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 6.0 (part 7 of 11)

### More flexible SQL Server free-text search

GitHub Issue: #23921.

In EF Core 6.0, we have relaxed the parameter requirements for `Microsoft.EntityFrameworkCore.SqlServerDbFunctionsExtensions.FreeText(Microsoft.EntityFrameworkCore.DbFunctions,System.String,System.String)` and `Microsoft.EntityFrameworkCore.SqlServerDbFunctionsExtensions.Contains*`. This allows these functions to be used with binary columns, or with columns mapped using a value converter. For example, consider an entity type with a `Name` property defined as a value object:

```csharp
public class Customer
{
    public int Id { get; set; }

    public Name Name{ get; set; }
}

public class Name
{
    public string First { get; set; }
    public string MiddleInitial { get; set; }
    public string Last { get; set; }
}
```

This is mapped to JSON in the database:

```csharp
modelBuilder.Entity<Customer>()
    .Property(e => e.Name)
    .HasConversion(
        v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
        v => JsonSerializer.Deserialize<Name>(v, (JsonSerializerOptions)null));
```

A query can now be executed using `Contains` or `FreeText` even though the type of the property is `Name` not `string`. For example:

```csharp
var result = await context.Customers.Where(e => EF.Functions.Contains(e.Name, "Martin")).ToListAsync();
```

This generates the following SQL, when using SQL Server:

```sql
SELECT [c].[Id], [c].[Name]
FROM [Customers] AS [c]
WHERE CONTAINS([c].[Name], N'Martin')
```

### Translate ToString on SQLite

GitHub Issue: #17223. This feature was contributed by @ralmsdeveloper. Many thanks!

Calls to `System.Object.ToString` are now translated to SQL when using the SQLite database provider. This can be useful for text searches involving non-string columns. For example, consider a `User` entity type that stores phone numbers as numeric values:

```csharp
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public long PhoneNumber { get; set; }
}
```

`ToString` can be used to convert the number to a string in the database. We can then use this string with a function such as `LIKE` to find numbers that match a pattern. For example, to find all numbers containing 555:

```csharp
var users = await context.Users.Where(u => EF.Functions.Like(u.PhoneNumber.ToString(), "%555%")).ToListAsync();
```

This translates to the following SQL when using a SQLite database:

```sql
SELECT "u"."Id", "u"."PhoneNumber", "u"."Username"
FROM "Users" AS "u"
WHERE CAST("u"."PhoneNumber" AS TEXT) LIKE '%555%'
```

Note that translation of `System.Object.ToString` for SQL Server is already supported in EF Core 5.0, and may also be supported by other database providers.

### EF.Functions.Random

GitHub Issue: #16141. This feature was contributed by @RaymondHuy. Many thanks!

`EF.Functions.Random` maps to a database function returning a pseudo-random number between 0 and 1 exclusive. Translations have been implemented in the EF Core repo for SQL Server, SQLite, and Azure Cosmos DB. For example, consider a `User` entity type with a `Popularity` property:

```csharp
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public int Popularity { get; set; }
}
```

`Popularity` can have values from 1 to 5 inclusive. Using `EF.Functions.Random` we can write a query to return all users with a randomly chosen popularity:

```csharp
var users = await context.Users.Where(u => u.Popularity == (int)(EF.Functions.Random() * 4.0) + 1).ToListAsync();
```

This translates to the following SQL when using a SQL Server database:

```sql
SELECT [u].[Id], [u].[Popularity], [u].[Username]
FROM [Users] AS [u]
WHERE [u].[Popularity] = (CAST((RAND() * 4.0E0) AS int) + 1)
```

### Improved SQL Server translation for IsNullOrWhitespace

GitHub Issue: #22916. This feature was contributed by @Marusyk. Many thanks!

Consider the following query:

```csharp
var users = await context.Users.Where(
    e => string.IsNullOrWhiteSpace(e.FirstName)
         || string.IsNullOrWhiteSpace(e.LastName)).ToListAsync();
```

Before EF Core 6.0, this was translated to the following on SQL Server:

```sql
SELECT [u].[Id], [u].[FirstName], [u].[LastName]
FROM [Users] AS [u]
WHERE ([u].[FirstName] IS NULL OR (LTRIM(RTRIM([u].[FirstName])) = N'')) OR ([u].[LastName] IS NULL OR (LTRIM(RTRIM([u].[LastName])) = N''))
```

This translation has been improved for EF Core 6.0 to:

```sql
SELECT [u].[Id], [u].[FirstName], [u].[LastName]
FROM [Users] AS [u]
WHERE ([u].[FirstName] IS NULL OR ([u].[FirstName] = N'')) OR ([u].[LastName] IS NULL OR ([u].[LastName] = N''))
```

### Defining query for in-memory provider

GitHub Issue: #24600.

A new method `ToInMemoryQuery` can be used to write a defining query against the in-memory database for a given entity type. This is most useful for creating the equivalent of views on the in-memory database, especially when those views return keyless entity types. For example, consider a customer database for customers based in the United Kingdom. Each customer has an address:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Address Address { get; set; }
}

public class Address
{
    public int Id { get; set; }
    public string House { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string Postcode { get; set; }
}
```

Now, imagine we want a view over this data that shows how many customers their are into each postcode area. We can create a keyless entity type to represent this:

```csharp
public class CustomerDensity
{
    public string Postcode { get; set; }
    public int CustomerCount { get; set; }
}
```

And define a DbSet property for it on the DbContext, along with sets for other top-level entity types:

```csharp
public DbSet<Customer> Customers { get; set; }
public DbSet<CustomerDensity> CustomerDensities { get; set; }
```

Then, in `OnModelCreating`, we can write a LINQ query that defines the data to be returned for `CustomerDensities`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<CustomerDensity>()
        .HasNoKey()
        .ToInMemoryQuery(
            () => Customers
                .GroupBy(c => c.Address.Postcode.Substring(0, 3))
                .Select(
                    g =>
                        new CustomerDensity
                        {
                            Postcode = g.Key,
                            CustomerCount = g.Count()
                        }));
}
```

This can then be queried just like any other DbSet property:

```csharp
var results = await context.CustomerDensities.ToListAsync();
```

### Translate Substring with single parameter

GitHub Issue: #20173. This feature was contributed by @stevendarby. Many thanks!

EF Core 6.0 now translates uses of `string.Substring` with a single argument. For example:

```csharp
var result = await context.Customers
    .Select(a => new { Name = a.Name.Substring(3) })
    .FirstOrDefaultAsync(a => a.Name == "hur");
```

This translates to the following SQL when using SQL Server:

```sql
SELECT TOP(1) SUBSTRING([c].[Name], 3 + 1, LEN([c].[Name])) AS [Name]
FROM [Customers] AS [c]
WHERE SUBSTRING([c].[Name], 3 + 1, LEN([c].[Name])) = N'hur'
```

### Split-queries for non-navigation collections

GitHub Issue: #21234.

EF Core supports splitting a single LINQ query into multiple SQL queries. In EF Core 6.0, this support has been expanded to include cases where non-navigation collections are contained in the query projection.

The following are example queries showing the translation on SQL Server into either a single query or multiple queries.

**Example 1:**

LINQ query:

```csharp
await context.Customers
    .Select(
        c => new
        {
            c,
            Orders = c.Orders
                .Where(o => o.Id > 1)
        })
    .ToListAsync();
```

Single SQL query:

```sql
SELECT [c].[Id], [t].[Id], [t].[CustomerId], [t].[OrderDate]
FROM [Customers] AS [c]
LEFT JOIN (
    SELECT [o].[Id], [o].[CustomerId], [o].[OrderDate]
    FROM [Order] AS [o]
    WHERE [o].[Id] > 1
) AS [t] ON [c].[Id] = [t].[CustomerId]
ORDER BY [c].[Id]
```

Multiple SQL queries:

```sql
SELECT [c].[Id]
FROM [Customers] AS [c]
ORDER BY [c].[Id]

SELECT [t].[Id], [t].[CustomerId], [t].[OrderDate], [c].[Id]
FROM [Customers] AS [c]
INNER JOIN (
    SELECT [o].[Id], [o].[CustomerId], [o].[OrderDate]
    FROM [Order] AS [o]
    WHERE [o].[Id] > 1
) AS [t] ON [c].[Id] = [t].[CustomerId]
ORDER BY [c].[Id]
```

**Example 2:**

LINQ query:

```csharp
await context.Customers
    .Select(
        c => new
        {
            c,
            OrderDates = c.Orders
                .Where(o => o.Id > 1)
                .Select(o => o.OrderDate)
        })
    .ToListAsync();
```

Single SQL query:

```sql
SELECT [c].[Id], [t].[OrderDate], [t].[Id]
FROM [Customers] AS [c]
  LEFT JOIN (
  SELECT [o].[OrderDate], [o].[Id], [o].[CustomerId]
  FROM [Order] AS [o]
  WHERE [o].[Id] > 1
  ) AS [t] ON [c].[Id] = [t].[CustomerId]
ORDER BY [c].[Id]
```

Multiple SQL queries:

```sql
SELECT [c].[Id]
FROM [Customers] AS [c]
ORDER BY [c].[Id]

SELECT [t].[Id], [t].[CustomerId], [t].[OrderDate], [c].[Id]
FROM [Customers] AS [c]
INNER JOIN (
    SELECT [o].[Id], [o].[CustomerId], [o].[OrderDate]
    FROM [Order] AS [o]
    WHERE [o].[Id] > 1
) AS [t] ON [c].[Id] = [t].[CustomerId]
ORDER BY [c].[Id]
```

**Example 3:**

LINQ query:

```csharp
await context.Customers
    .Select(
        c => new
        {
            c,
            OrderDates = c.Orders
                .Where(o => o.Id > 1)
                .Select(o => o.OrderDate)
                .Distinct()
        })
    .ToListAsync();
```

Single SQL query:

```sql
SELECT [c].[Id], [t].[OrderDate]
FROM [Customers] AS [c]
  OUTER APPLY (
  SELECT DISTINCT [o].[OrderDate]
  FROM [Order] AS [o]
  WHERE ([c].[Id] = [o].[CustomerId]) AND ([o].[Id] > 1)
  ) AS [t]
ORDER BY [c].[Id]
```

Multiple SQL queries:

```sql
SELECT [c].[Id]
FROM [Customers] AS [c]
ORDER BY [c].[Id]

SELECT [t].[OrderDate], [c].[Id]
FROM [Customers] AS [c]
  CROSS APPLY (
  SELECT DISTINCT [o].[OrderDate]
  FROM [Order] AS [o]
  WHERE ([c].[Id] = [o].[CustomerId]) AND ([o].[Id] > 1)
  ) AS [t]
ORDER BY [c].[Id]
```

### Remove last ORDER BY clause when joining for collection

GitHub Issue: #19828.

When loading related one-to-many entities, EF Core adds ORDER BY clauses to make sure all related entities for a given entity are grouped together.  However, the last ORDER BY clause is not necessary for EF generate the needed groupings, and can have an impact in performance. Therefore, EF Core 6.0 this clause is removed.

For example, consider this query:

```csharp
await context.Customers
    .Select(
        e => new
        {
            e.Id,
            FirstOrder = e.Orders.Where(i => i.Id == 1).ToList()
        })
    .ToListAsync();
```

With EF Core 5.0 on SQL Server, this query is translated to:

```sql
SELECT [c].[Id], [t].[Id], [t].[CustomerId], [t].[OrderDate]
FROM [Customers] AS [c]
LEFT JOIN (
    SELECT [o].[Id], [o].[CustomerId], [o].[OrderDate]
    FROM [Order] AS [o]
    WHERE [o].[Id] = 1
) AS [t] ON [c].[Id] = [t].[CustomerId]
ORDER BY [c].[Id], [t].[Id]
```

With EF Core 6.0, it is instead translated to:

```sql
SELECT [c].[Id], [t].[Id], [t].[CustomerId], [t].[OrderDate]
FROM [Customers] AS [c]
LEFT JOIN (
    SELECT [o].[Id], [o].[CustomerId], [o].[OrderDate]
    FROM [Order] AS [o]
    WHERE [o].[Id] = 1
) AS [t] ON [c].[Id] = [t].[CustomerId]
ORDER BY [c].[Id]
```

### Tag queries with file name and line number

GitHub Issue: #14176. This feature was contributed by @michalczerwinski. Many thanks!

Query tags allow adding a textural tag to a LINQ query such that it is then included in the generated SQL. In EF Core 6.0, this can be used to tag queries with the filename and line number of the LINQ code. For example:

```csharp
var results1 = await context
    .Customers
    .TagWithCallSite()
    .Where(c => c.Name.StartsWith("A"))
    .ToListAsync();
```

This results in the following generated SQL when using SQL Server:

```sql
-- file: C:\dotnet\efdocs\samples\core\Miscellaneous\NewInEFCore6\TagWithFileAndLineSample.cs:21

SELECT [c].[Id], [c].[Name]
FROM [Customers] AS [c]
WHERE [c].[Name] IS NOT NULL AND ([c].[Name] LIKE N'A%')
```
