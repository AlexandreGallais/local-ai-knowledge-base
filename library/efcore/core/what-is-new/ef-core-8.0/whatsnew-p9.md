---
title: "What's New in EF Core 8 (part 9 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 8 (part 9 of 11)

## Model building

### Discriminator columns have max length

In EF8, string discriminator columns used for TPH inheritance mapping are now configured with a max length. This length is calculated as the smallest Fibonacci number that covers all defined discriminator values. For example, consider the following hierarchy:

```csharp
public abstract class Document
{
    public int Id { get; set; }
    public string Title { get; set; }
}

public abstract class Book : Document
{
    public string? Isbn { get; set; }
}

public class PaperbackEdition : Book
{
}

public class HardbackEdition : Book
{
}

public class Magazine : Document
{
    public int IssueNumber { get; set; }
}
```

With the convention of using the class names for discriminator values, the possible values here are "PaperbackEdition", "HardbackEdition", and "Magazine", and hence the discriminator column is configured for a max length of 21. For example, when using SQL Server:

```sql
CREATE TABLE [Documents] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Discriminator] nvarchar(21) NOT NULL,
    [Isbn] nvarchar(max) NULL,
    [IssueNumber] int NULL,
    CONSTRAINT [PK_Documents] PRIMARY KEY ([Id]),
```

> **Tip:**
> Fibonacci numbers are used to limit the number of times a migration is generated to change the column length as new types are added to the hierarchy.

### DateOnly/TimeOnly supported on SQL Server

The `System.DateOnly` and `System.TimeOnly` types were introduced in .NET 6 and have been supported for several database providers (e.g. SQLite, MySQL, and PostgreSQL) since their introduction. For SQL Server, the recent release of a Microsoft.Data.SqlClient package targeting .NET 6 has allowed ErikEJ to add support for these types at the ADO.NET level. This in turn paved the way for support in EF8 for `DateOnly` and `TimeOnly` as properties in entity types.

> **Tip:**
> `DateOnly` and `TimeOnly` can be used in EF Core 6 and 7 using the ErikEJ.EntityFrameworkCore.SqlServer.DateOnlyTimeOnly community package from @ErikEJ.

For example, consider the following EF model for British schools:

```csharp
public class School
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public DateOnly Founded { get; set; }
    public List<Term> Terms { get; } = new();
    public List<OpeningHours> OpeningHours { get; } = new();
}

public class Term
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public DateOnly FirstDay { get; set; }
    public DateOnly LastDay { get; set; }
    public School School { get; set; } = null!;
}

[Owned]
public class OpeningHours
{
    public OpeningHours(DayOfWeek dayOfWeek, TimeOnly? opensAt, TimeOnly? closesAt)
    {
        DayOfWeek = dayOfWeek;
        OpensAt = opensAt;
        ClosesAt = closesAt;
    }

    public DayOfWeek DayOfWeek { get; private set; }
    public TimeOnly? OpensAt { get; set; }
    public TimeOnly? ClosesAt { get; set; }
}
```

> **Tip:**
> The code shown here comes from DateOnlyTimeOnlySample.cs.

> **Note:**
> This model represents only British schools and stores times as local (GMT) times. Handling different timezones would complicate this code significantly. Note that using `DateTimeOffset` would not help here, since opening and closing times have different offsets depending whether daylight saving time is active or not.

These entity types map to the following tables when using SQL Server. Notice that the `DateOnly` properties map to `date` columns, and the `TimeOnly` properties map to `time` columns.

```sql
CREATE TABLE [Schools] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Founded] date NOT NULL,
    CONSTRAINT [PK_Schools] PRIMARY KEY ([Id]));

CREATE TABLE [OpeningHours] (
    [SchoolId] int NOT NULL,
    [Id] int NOT NULL IDENTITY,
    [DayOfWeek] int NOT NULL,
    [OpensAt] time NULL,
    [ClosesAt] time NULL,
    CONSTRAINT [PK_OpeningHours] PRIMARY KEY ([SchoolId], [Id]),
    CONSTRAINT [FK_OpeningHours_Schools_SchoolId] FOREIGN KEY ([SchoolId]) REFERENCES [Schools] ([Id]) ON DELETE CASCADE);

CREATE TABLE [Term] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [FirstDay] date NOT NULL,
    [LastDay] date NOT NULL,
    [SchoolId] int NOT NULL,
    CONSTRAINT [PK_Term] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Term_Schools_SchoolId] FOREIGN KEY ([SchoolId]) REFERENCES [Schools] ([Id]) ON DELETE CASCADE);
```

Queries using `DateOnly` and `TimeOnly` work in the expected manner. For example, the following LINQ query finds schools that are currently open:

```csharp
openSchools = await context.Schools
    .Where(
        s => s.Terms.Any(
                 t => t.FirstDay <= today
                      && t.LastDay >= today)
             && s.OpeningHours.Any(
                 o => o.DayOfWeek == dayOfWeek
                      && o.OpensAt < time && o.ClosesAt >= time))
    .ToListAsync();
```

This query translates to the following SQL, as shown by `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.ToQueryString*`:

```sql
DECLARE @__today_0 date = '2023-02-07';
DECLARE @__dayOfWeek_1 int = 2;
DECLARE @__time_2 time = '19:53:40.4798052';

SELECT [s].[Id], [s].[Founded], [s].[Name], [o0].[SchoolId], [o0].[Id], [o0].[ClosesAt], [o0].[DayOfWeek], [o0].[OpensAt]
FROM [Schools] AS [s]
LEFT JOIN [OpeningHours] AS [o0] ON [s].[Id] = [o0].[SchoolId]
WHERE EXISTS (
    SELECT 1
    FROM [Term] AS [t]
    WHERE [s].[Id] = [t].[SchoolId] AND [t].[FirstDay] <= @__today_0 AND [t].[LastDay] >= @__today_0) AND EXISTS (
    SELECT 1
    FROM [OpeningHours] AS [o]
    WHERE [s].[Id] = [o].[SchoolId] AND [o].[DayOfWeek] = @__dayOfWeek_1 AND [o].[OpensAt] < @__time_2 AND [o].[ClosesAt] >= @__time_2)
ORDER BY [s].[Id], [o0].[SchoolId]
```

`DateOnly` and `TimeOnly` can also be used in JSON columns. For example, `OpeningHours` can be saved as a JSON document, resulting in data that looks like this:

| Column       | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Id           | 2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Name         | Farr High School                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Founded      | 1964-05-01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| OpeningHours | <pre>[  { "DayOfWeek": "Sunday", "ClosesAt": null, "OpensAt": null },  { "DayOfWeek": "Monday", "ClosesAt": "15:35:00", "OpensAt": "08:45:00" },  { "DayOfWeek": "Tuesday", "ClosesAt": "15:35:00", "OpensAt": "08:45:00" },  { "DayOfWeek": "Wednesday", "ClosesAt": "15:35:00", "OpensAt": "08:45:00" },  { "DayOfWeek": "Thursday", "ClosesAt": "15:35:00", "OpensAt": "08:45:00" },  { "DayOfWeek": "Friday", "ClosesAt": "12:50:00", "OpensAt": "08:45:00" },  { "DayOfWeek": "Saturday", "ClosesAt": null, "OpensAt": null }] |

Combining two features from EF8, we can now query for opening hours by indexing into the JSON collection. For example:

```csharp
openSchools = await context.Schools
    .Where(
        s => s.Terms.Any(
                 t => t.FirstDay <= today
                      && t.LastDay >= today)
             && s.OpeningHours[(int)dayOfWeek].OpensAt < time
             && s.OpeningHours[(int)dayOfWeek].ClosesAt >= time)
    .ToListAsync();
```

This query translates to the following SQL, as shown by `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.ToQueryString*`:

```sql
DECLARE @__today_0 date = '2023-02-07';
DECLARE @__dayOfWeek_1 int = 2;
DECLARE @__time_2 time = '20:14:34.7795877';

SELECT [s].[Id], [s].[Founded], [s].[Name], [s].[OpeningHours]
FROM [Schools] AS [s]
WHERE EXISTS (
    SELECT 1
    FROM [Term] AS [t]
    WHERE [s].[Id] = [t].[SchoolId] AND [t].[FirstDay] <= @__today_0
      AND [t].[LastDay] >= @__today_0)
      AND CAST(JSON_VALUE([s].[OpeningHours],'$[' + CAST(CAST(@__dayOfWeek_1 AS int) AS nvarchar(max)) + '].OpensAt') AS time) < @__time_2
      AND CAST(JSON_VALUE([s].[OpeningHours],'$[' + CAST(CAST(@__dayOfWeek_1 AS int) AS nvarchar(max)) + '].ClosesAt') AS time) >= @__time_2
```

Finally, updates and deletes can be accomplished with tracking and SaveChanges, or using ExecuteUpdate/ExecuteDelete. For example:

```csharp
await context.Schools
    .Where(e => e.Terms.Any(t => t.LastDay.Year == 2022))
    .SelectMany(e => e.Terms)
    .ExecuteUpdateAsync(s => s.SetProperty(t => t.LastDay, t => t.LastDay.AddDays(1)));
```

This update translates to the following SQL:

```sql
UPDATE [t0]
SET [t0].[LastDay] = DATEADD(day, CAST(1 AS int), [t0].[LastDay])
FROM [Schools] AS [s]
INNER JOIN [Term] AS [t0] ON [s].[Id] = [t0].[SchoolId]
WHERE EXISTS (
    SELECT 1
    FROM [Term] AS [t]
    WHERE [s].[Id] = [t].[SchoolId] AND DATEPART(year, [t].[LastDay]) = 2022)
```

### Reverse engineer Synapse and Dynamics 365 TDS

EF8 reverse engineering (a.k.a. scaffolding from an existing database) now supports Synapse Serverless SQL Pool and Dynamics 365 TDS Endpoint databases.

> **Warning:**
> These database systems have differences from normal SQL Server and Azure SQL databases. These differences mean that not all EF Core functionality is supported when writing queries against or performing other operations with these database systems.

## Enhancements to Math translations

Generic math interfaces were introduced in .NET 7. Concrete types like `double` and `float` implemented these interfaces adding new APIs mirroring the existing functionality of Math and MathF.

EF Core 8 translates calls to these generic math APIs in LINQ using providers' existing SQL translations for `Math` and `MathF`. This means you're now free to choose between calls either like `Math.Sin` or `double.Sin` in your EF queries.

We worked with the .NET team to add two new generic math methods in .NET 8 that are implemented on `double` and `float`. These are also translated to SQL in EF Core 8.

| .NET             | SQL     |
|------------------|---------|
| DegreesToRadians | RADIANS |
| RadiansToDegrees | DEGREES |

Finally, we worked with Eric Sink in the SQLitePCLRaw project to enable the SQLite math functions in their builds of the native SQLite library. This includes the native library you get by default when you install the EF Core SQLite provider. This enables several new SQL translations in LINQ including: Acos, Acosh, Asin, Asinh, Atan, Atan2, Atanh, Ceiling, Cos, Cosh, DegreesToRadians, Exp, Floor, Log, Log2, Log10, Pow, RadiansToDegrees, Sign, Sin, Sinh, Sqrt, Tan, Tanh, and Truncate.

## Checking for pending model changes

We've added a new `dotnet ef` command to check whether any model changes have been made since the last migration. This can be useful in CI/CD scenarios to ensure you or a teammate didn't forget to add a migration.

```dotnetcli
dotnet ef migrations has-pending-model-changes
```

You can also perform this check programmatically in your application or tests using the new `dbContext.Database.HasPendingModelChanges()` method.
