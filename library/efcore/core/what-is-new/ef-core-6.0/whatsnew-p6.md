---
title: "What's New in EF Core 6.0 (part 6 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-6.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 6.0 (part 6 of 11)

## LINQ query enhancements

EF Core 6.0 contains several improvements in the translation and execution of LINQ queries.

### Improved GroupBy support

GitHub Issues: #12088, #13805, and #22609.

EF Core 6.0 contains better support for `GroupBy` queries. Specifically, EF Core now:

* Translate GroupBy followed by `FirstOrDefault` (or similar) over a group
* Supports selecting the top N results from a group
* Expands navigations after the `GroupBy` operator has been applied

The following are example queries from customer reports and their translation on SQL Server.

**Example 1:**

```csharp
var people = await context.People
    .Include(e => e.Shoes)
    .GroupBy(e => e.FirstName)
    .Select(
        g => g.OrderBy(e => e.FirstName)
            .ThenBy(e => e.LastName)
            .FirstOrDefault())
    .ToListAsync();
```

```sql
SELECT [t0].[Id], [t0].[Age], [t0].[FirstName], [t0].[LastName], [t0].[MiddleInitial], [t].[FirstName], [s].[Id], [s].[Age], [s].[PersonId], [s].[Style]
FROM (
    SELECT [p].[FirstName]
    FROM [People] AS [p]
    GROUP BY [p].[FirstName]
) AS [t]
LEFT JOIN (
    SELECT [t1].[Id], [t1].[Age], [t1].[FirstName], [t1].[LastName], [t1].[MiddleInitial]
    FROM (
        SELECT [p0].[Id], [p0].[Age], [p0].[FirstName], [p0].[LastName], [p0].[MiddleInitial], ROW_NUMBER() OVER(PARTITION BY [p0].[FirstName] ORDER BY [p0].[FirstName], [p0].[LastName]) AS [row]
        FROM [People] AS [p0]
    ) AS [t1]
    WHERE [t1].[row] <= 1
) AS [t0] ON [t].[FirstName] = [t0].[FirstName]
LEFT JOIN [Shoes] AS [s] ON [t0].[Id] = [s].[PersonId]
ORDER BY [t].[FirstName], [t0].[FirstName]
```

**Example 2:**

```csharp
var group = await context.People
    .Select(
        p => new
        {
            p.FirstName,
            FullName = p.FirstName + " " + p.MiddleInitial + " " + p.LastName
        })
    .GroupBy(p => p.FirstName)
    .Select(g => g.First())
    .FirstAsync();
```

```sql
SELECT [t0].[FirstName], [t0].[FullName], [t0].[c]
FROM (
    SELECT TOP(1) [p].[FirstName]
    FROM [People] AS [p]
    GROUP BY [p].[FirstName]
) AS [t]
LEFT JOIN (
    SELECT [t1].[FirstName], [t1].[FullName], [t1].[c]
    FROM (
        SELECT [p0].[FirstName], (((COALESCE([p0].[FirstName], N'') + N' ') + COALESCE([p0].[MiddleInitial], N'')) + N' ') + COALESCE([p0].[LastName], N'') AS [FullName], 1 AS [c], ROW_NUMBER() OVER(PARTITION BY [p0].[FirstName] ORDER BY [p0].[FirstName]) AS [row]
        FROM [People] AS [p0]
    ) AS [t1]
    WHERE [t1].[row] <= 1
) AS [t0] ON [t].[FirstName] = [t0].[FirstName]
```

**Example 3:**

```csharp
var people = await context.People
    .Where(e => e.MiddleInitial == "Q" && e.Age == 20)
    .GroupBy(e => e.LastName)
    .Select(g => g.First().LastName)
    .OrderBy(e => e.Length)
    .ToListAsync();
```

```sql
SELECT (
    SELECT TOP(1) [p1].[LastName]
    FROM [People] AS [p1]
    WHERE (([p1].[MiddleInitial] = N'Q') AND ([p1].[Age] = 20)) AND (([p].[LastName] = [p1].[LastName]) OR ([p].[LastName] IS NULL AND [p1].[LastName] IS NULL)))
FROM [People] AS [p]
WHERE ([p].[MiddleInitial] = N'Q') AND ([p].[Age] = 20)
GROUP BY [p].[LastName]
ORDER BY CAST(LEN((
    SELECT TOP(1) [p1].[LastName]
    FROM [People] AS [p1]
    WHERE (([p1].[MiddleInitial] = N'Q') AND ([p1].[Age] = 20)) AND (([p].[LastName] = [p1].[LastName]) OR ([p].[LastName] IS NULL AND [p1].[LastName] IS NULL)))) AS int)
```

**Example 4:**

```csharp
var results = await (from person in context.People
               join shoes in context.Shoes on person.Age equals shoes.Age
               group shoes by shoes.Style
               into people
               select new
               {
                   people.Key,
                   Style = people.Select(p => p.Style).FirstOrDefault(),
                   Count = people.Count()
               })
    .ToListAsync();
```

```sql
SELECT [s].[Style] AS [Key], (
    SELECT TOP(1) [s0].[Style]
    FROM [People] AS [p0]
    INNER JOIN [Shoes] AS [s0] ON [p0].[Age] = [s0].[Age]
    WHERE ([s].[Style] = [s0].[Style]) OR ([s].[Style] IS NULL AND [s0].[Style] IS NULL)) AS [Style], COUNT(*) AS [Count]
FROM [People] AS [p]
INNER JOIN [Shoes] AS [s] ON [p].[Age] = [s].[Age]
GROUP BY [s].[Style]
```

**Example 5:**

```csharp
var results = await context.People
    .GroupBy(e => e.FirstName)
    .Select(g => g.First().LastName)
    .OrderBy(e => e)
    .ToListAsync();
```

```sql
SELECT (
    SELECT TOP(1) [p1].[LastName]
    FROM [People] AS [p1]
    WHERE ([p].[FirstName] = [p1].[FirstName]) OR ([p].[FirstName] IS NULL AND [p1].[FirstName] IS NULL))
FROM [People] AS [p]
GROUP BY [p].[FirstName]
ORDER BY (
    SELECT TOP(1) [p1].[LastName]
    FROM [People] AS [p1]
    WHERE ([p].[FirstName] = [p1].[FirstName]) OR ([p].[FirstName] IS NULL AND [p1].[FirstName] IS NULL))
```

**Example 6:**

```csharp
var results = await context.People
    .Where(e => e.Age == 20)
    .GroupBy(e => e.Id)
    .Select(g => g.First().MiddleInitial)
    .OrderBy(e => e)
    .ToListAsync();
```

```sql
SELECT (
    SELECT TOP(1) [p1].[MiddleInitial]
    FROM [People] AS [p1]
    WHERE ([p1].[Age] = 20) AND ([p].[Id] = [p1].[Id]))
FROM [People] AS [p]
WHERE [p].[Age] = 20
GROUP BY [p].[Id]
ORDER BY (
    SELECT TOP(1) [p1].[MiddleInitial]
    FROM [People] AS [p1]
    WHERE ([p1].[Age] = 20) AND ([p].[Id] = [p1].[Id]))
```

**Example 7:**

```csharp
var size = 11;
var results
    = await context.People
        .Where(
            p => p.Feet.Size == size
                 && p.MiddleInitial != null
                 && p.Feet.Id != 1)
        .GroupBy(
            p => new
            {
                p.Feet.Size,
                p.Feet.Person.LastName
            })
        .Select(
            g => new
            {
                g.Key.LastName,
                g.Key.Size,
                Min = g.Min(p => p.Feet.Size),
            })
        .ToListAsync();
```

```sql
Executed DbCommand (12ms) [Parameters=[@__size_0='11'], CommandType='Text', CommandTimeout='30']
SELECT [p0].[LastName], [f].[Size], MIN([f0].[Size]) AS [Min]
FROM [People] AS [p]
LEFT JOIN [Feet] AS [f] ON [p].[Id] = [f].[Id]
LEFT JOIN [People] AS [p0] ON [f].[Id] = [p0].[Id]
LEFT JOIN [Feet] AS [f0] ON [p].[Id] = [f0].[Id]
WHERE (([f].[Size] = @__size_0) AND [p].[MiddleInitial] IS NOT NULL) AND (([f].[Id] <> 1) OR [f].[Id] IS NULL)
GROUP BY [f].[Size], [p0].[LastName]
```

**Example 8:**

```csharp
var result = await context.People
    .Include(x => x.Shoes)
    .Include(x => x.Feet)
    .GroupBy(
        x => new
        {
            x.Feet.Id,
            x.Feet.Size
        })
    .Select(
        x => new
        {
            Key = x.Key.Id + x.Key.Size,
            Count = x.Count(),
            Sum = x.Sum(el => el.Id),
            SumOver60 = x.Sum(el => el.Id) / (decimal)60,
            TotalCallOutCharges = x.Sum(el => el.Feet.Size == 11 ? 1 : 0)
        })
    .CountAsync();
```

```sql
SELECT COUNT(*)
FROM (
    SELECT [f].[Id], [f].[Size]
    FROM [People] AS [p]
    LEFT JOIN [Feet] AS [f] ON [p].[Id] = [f].[Id]
    GROUP BY [f].[Id], [f].[Size]
) AS [t]
```

**Example 9:**

```csharp
var results = await context.People
    .GroupBy(n => n.FirstName)
    .Select(g => new
    {
        Feet = g.Key,
        Total = g.Sum(n => n.Feet.Size)
    })
    .ToListAsync();
```

```sql
SELECT [p].[FirstName] AS [Feet], COALESCE(SUM([f].[Size]), 0) AS [Total]
FROM [People] AS [p]
LEFT JOIN [Feet] AS [f] ON [p].[Id] = [f].[Id]
GROUP BY [p].[FirstName]
```

**Example 10:**

```csharp
var results = from Person person1
                  in from Person person2
                         in context.People
                     select person2
              join Shoes shoes
                  in context.Shoes
                  on person1.Age equals shoes.Age
              group shoes by
                  new
                  {
                      person1.Id,
                      shoes.Style,
                      shoes.Age
                  }
              into temp
              select
                  new
                  {
                      temp.Key.Id,
                      temp.Key.Age,
                      temp.Key.Style,
                      Values = from t
                                   in temp
                               select
                                   new
                                   {
                                       t.Id,
                                       t.Style,
                                       t.Age
                                   }
                  };
```

```sql
SELECT [t].[Id], [t].[Age], [t].[Style], [t0].[Id], [t0].[Style], [t0].[Age], [t0].[Id0]
FROM (
    SELECT [p].[Id], [s].[Age], [s].[Style]
    FROM [People] AS [p]
    INNER JOIN [Shoes] AS [s] ON [p].[Age] = [s].[Age]
    GROUP BY [p].[Id], [s].[Style], [s].[Age]
) AS [t]
LEFT JOIN (
    SELECT [s0].[Id], [s0].[Style], [s0].[Age], [p0].[Id] AS [Id0]
    FROM [People] AS [p0]
    INNER JOIN [Shoes] AS [s0] ON [p0].[Age] = [s0].[Age]
) AS [t0] ON (([t].[Id] = [t0].[Id0]) AND (([t].[Style] = [t0].[Style]) OR ([t].[Style] IS NULL AND [t0].[Style] IS NULL))) AND ([t].[Age] = [t0].[Age])
ORDER BY [t].[Id], [t].[Style], [t].[Age], [t0].[Id0]
```

**Example 11:**

```csharp
var grouping = await context.People
    .GroupBy(i => i.LastName)
    .Select(g => new { LastName = g.Key, Count = g.Count() , First = g.FirstOrDefault(), Take = g.Take(2)})
    .OrderByDescending(e => e.LastName)
    .ToListAsync();
```

```sql
SELECT [t].[LastName], [t].[c], [t0].[Id], [t2].[Id], [t2].[Age], [t2].[FirstName], [t2].[LastName], [t2].[MiddleInitial], [t0].[Age], [t0].[FirstName], [t0].[LastName], [t0].[MiddleInitial]
FROM (
    SELECT [p].[LastName], COUNT(*) AS [c]
    FROM [People] AS [p]
    GROUP BY [p].[LastName]
) AS [t]
LEFT JOIN (
    SELECT [t1].[Id], [t1].[Age], [t1].[FirstName], [t1].[LastName], [t1].[MiddleInitial]
    FROM (
        SELECT [p0].[Id], [p0].[Age], [p0].[FirstName], [p0].[LastName], [p0].[MiddleInitial], ROW_NUMBER() OVER(PARTITION BY [p0].[LastName] ORDER BY [p0].[Id]) AS [row]
        FROM [People] AS [p0]
    ) AS [t1]
    WHERE [t1].[row] <= 1
) AS [t0] ON [t].[LastName] = [t0].[LastName]
LEFT JOIN (
    SELECT [t3].[Id], [t3].[Age], [t3].[FirstName], [t3].[LastName], [t3].[MiddleInitial]
    FROM (
        SELECT [p1].[Id], [p1].[Age], [p1].[FirstName], [p1].[LastName], [p1].[MiddleInitial], ROW_NUMBER() OVER(PARTITION BY [p1].[LastName] ORDER BY [p1].[Id]) AS [row]
        FROM [People] AS [p1]
    ) AS [t3]
    WHERE [t3].[row] <= 2
) AS [t2] ON [t].[LastName] = [t2].[LastName]
ORDER BY [t].[LastName] DESC, [t0].[Id], [t2].[LastName], [t2].[Id]
```

**Example 12:**

```csharp
var grouping = await context.People
    .Include(e => e.Shoes)
    .OrderBy(e => e.FirstName)
    .ThenBy(e => e.LastName)
    .GroupBy(e => e.FirstName)
    .Select(g => new { Name = g.Key, People = g.ToList()})
    .ToListAsync();
```

```sql
SELECT [t].[FirstName], [t0].[Id], [t0].[Age], [t0].[FirstName], [t0].[LastName], [t0].[MiddleInitial], [t0].[Id0], [t0].[Age0], [t0].[PersonId], [t0].[Style]
FROM (
    SELECT [p].[FirstName]
    FROM [People] AS [p]
    GROUP BY [p].[FirstName]
) AS [t]
LEFT JOIN (
    SELECT [p0].[Id], [p0].[Age], [p0].[FirstName], [p0].[LastName], [p0].[MiddleInitial], [s].[Id] AS [Id0], [s].[Age] AS [Age0], [s].[PersonId], [s].[Style]
    FROM [People] AS [p0]
    LEFT JOIN [Shoes] AS [s] ON [p0].[Id] = [s].[PersonId]
) AS [t0] ON [t].[FirstName] = [t0].[FirstName]
ORDER BY [t].[FirstName], [t0].[Id]
```

**Example 13:**

```csharp
var grouping = await context.People
    .GroupBy(m => new {m.FirstName, m.MiddleInitial })
    .Select(am => new
    {
        Key = am.Key,
        Items = am.ToList()
    })
    .ToListAsync();
```

```sql
SELECT [t].[FirstName], [t].[MiddleInitial], [p0].[Id], [p0].[Age], [p0].[FirstName], [p0].[LastName], [p0].[MiddleInitial]
FROM (
    SELECT [p].[FirstName], [p].[MiddleInitial]
    FROM [People] AS [p]
    GROUP BY [p].[FirstName], [p].[MiddleInitial]
) AS [t]
LEFT JOIN [People] AS [p0] ON (([t].[FirstName] = [p0].[FirstName]) OR ([t].[FirstName] IS NULL AND [p0].[FirstName] IS NULL)) AND (([t].[MiddleInitial] = [p0].[MiddleInitial]) OR ([t].[MiddleInitial] IS NULL AND [p0].[MiddleInitial] IS NULL))
ORDER BY [t].[FirstName], [t].[MiddleInitial]
```

**Model**

The entity types used for these examples are:

```csharp
public class Person
{
    public int Id { get; set; }
    public int Age { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string MiddleInitial { get; set; }
    public Feet Feet { get; set; }
    public ICollection<Shoes> Shoes { get; } = new List<Shoes>();
}

public class Shoes
{
    public int Id { get; set; }
    public int Age { get; set; }
    public string Style { get; set; }
    public Person Person { get; set; }
}

public class Feet
{
    public int Id { get; set; }
    public int Size { get; set; }
    public Person Person { get; set; }
}
```

### Translate String.Concat with multiple arguments

GitHub Issue: #23859. This feature was contributed by @wmeints. Many thanks!

Starting with EF Core 6.0, calls to `System.String.Concat*` with multiple arguments are now translated to SQL. For example, the following query:

```csharp
var shards = await context.Shards
    .Where(e => string.Concat(e.Token1, e.Token2, e.Token3) != e.TokensProcessed).ToListAsync();
```

Will be translated to the following SQL when using SQL Server:

```sql
SELECT [s].[Id], [s].[Token1], [s].[Token2], [s].[Token3], [s].[TokensProcessed]
FROM [Shards] AS [s]
WHERE (([s].[Token1] + ([s].[Token2] + [s].[Token3])) <> [s].[TokensProcessed]) OR [s].[TokensProcessed] IS NULL
```

### Smoother integration with System.Linq.Async

GitHub Issue: #24041.

The System.Linq.Async package adds client-side async LINQ processing. Using this package with previous versions of EF Core was cumbersome due to a namespace clash for the async LINQ methods. In EF Core 6.0 we have taken advantage of C# pattern matching for `System.Collections.Generic.IAsyncEnumerable`1` such that the exposed EF Core `Microsoft.EntityFrameworkCore.DbSet`1` does not need to implement the interface directly.

Note that most applications do not need to use System.Linq.Async since EF Core queries are usually fully translated on the server.
