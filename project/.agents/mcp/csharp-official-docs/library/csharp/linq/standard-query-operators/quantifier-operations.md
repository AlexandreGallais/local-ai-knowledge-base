---
title: "Quantifier Operations"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/linq/standard-query-operators/quantifier-operations.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Quantifier operations in LINQ (C#)

Quantifier operations return a `System.Boolean` value that indicates whether some or all of the elements in a sequence satisfy a condition.

> **Important:**
>
> These samples use an `System.Collections.Generic.IEnumerable`1` data source. Data sources based on `System.Linq.IQueryProvider` use `System.Linq.IQueryable`1` data sources and expression trees. Expression trees have limitations on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as EF Core may impose more restrictions. Check the documentation for your data source.

The following illustration depicts two different quantifier operations on two different source sequences. The first operation asks if any of the elements are the character 'A'. The second operation asks if all the elements are the character 'A'. Both methods return `true` in this example.

|Method Name|Description|C# Query Expression Syntax|More Information|
|-----------------|-----------------|---------------------------------|----------------------|
|All|Determines whether all the elements in a sequence satisfy a condition.|Not applicable.|`System.Linq.Enumerable.All*``System.Linq.Queryable.All*`|
|Any|Determines whether any elements in a sequence satisfy a condition.|Not applicable.|`System.Linq.Enumerable.Any*``System.Linq.Queryable.Any*`|
|Contains|Determines whether a sequence contains a specified element.|Not applicable.|`System.Linq.Enumerable.Contains*``System.Linq.Queryable.Contains*`|

## All

The following example uses the `All` to find students that scored above 70 on all exams.

> **Note:**
> You can refer to the common data sources for this area in the Standard Query Operators Overview article.

```csharp
IEnumerable<string> names = from student in students
                            where student.Scores.All(score => score > 70)
                            select $"{student.FirstName} {student.LastName}: {string.Join(", ", student.Scores.Select(s => s.ToString()))}";

foreach (string name in names)
{
    Console.WriteLine($"{name}");
}

// This code produces the following output:
//
// Cesar Garcia: 71, 86, 77, 97
// Nancy Engström: 75, 73, 78, 83
// Ifunanya Ugomma: 84, 82, 96, 80
```
## Any

The following example uses the `Any` to find students that scored greater than 95 on any exam.

```csharp
IEnumerable<string> names = from student in students
                            where student.Scores.Any(score => score > 95)
                            select $"{student.FirstName} {student.LastName}: {student.Scores.Max()}";

foreach (string name in names)
{
    Console.WriteLine($"{name}");
}

// This code produces the following output:
//
// Svetlana Omelchenko: 97
// Cesar Garcia: 97
// Debra Garcia: 96
// Ifeanacho Jamuike: 98
// Ifunanya Ugomma: 96
// Michelle Caruana: 97
// Nwanneka Ifeoma: 98
// Martina Mattsson: 96
// Anastasiya Sazonova: 96
// Jesper Jakobsson: 98
// Max Lindgren: 96
```
## Contains

The following example uses the `Contains` to find students that scored exactly 95 on an exam.

```csharp
IEnumerable<string> names = from student in students
                            where student.Scores.Contains(95)
                            select $"{student.FirstName} {student.LastName}: {string.Join(", ", student.Scores.Select(s => s.ToString()))}";

foreach (string name in names)
{
    Console.WriteLine($"{name}");
}

// This code produces the following output:
//
// Claire O'Donnell: 56, 78, 95, 95
// Donald Urquhart: 92, 90, 95, 57
```
## See also

- `System.Linq`
- Dynamically specify predicate filters at run time
- How to query for sentences that contain a specified set of words (LINQ) (C#)
