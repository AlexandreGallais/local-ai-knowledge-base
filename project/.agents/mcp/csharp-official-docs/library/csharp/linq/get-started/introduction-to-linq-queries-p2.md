---
title: "Introduction to LINQ Queries (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/linq/get-started/introduction-to-linq-queries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Introduction to LINQ Queries (part 2 of 2)

## Classification table

The following table classifies each standard query operator method according to its method of execution.

> **Note:**
> If an operator is marked in two columns, two input sequences are involved in the operation, and each sequence is evaluated differently. In these cases, it is always the first sequence in the parameter list that is evaluated in a deferred, streaming manner.

| Standard query operator                             | Return type | Immediate execution | Deferred streaming execution | Deferred nonstreaming execution |
|-----------------------------------------------------|-------------|---------------------|------------------------------|----------------------------------|
| `System.Linq.Enumerable.Aggregate*`          | `TSource`                                         | ✓ |   |   |
| `System.Linq.Enumerable.All*`                | `System.Boolean`                             | ✓ |   |   |
| `System.Linq.Enumerable.Any*`                | `System.Boolean`                             | ✓ |   |   |
| `System.Linq.Enumerable.AsEnumerable*`       | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.Average*`            | Single numeric value                              | ✓ |   |   |
| `System.Linq.Enumerable.Cast*`               | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.Concat*`             | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.Contains*`           | `System.Boolean`                             | ✓ |   |   |
| `System.Linq.Enumerable.Count*`              | `System.Int32`                               | ✓ |   |   |
| `System.Linq.Enumerable.DefaultIfEmpty*`     | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.Distinct*`           | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.ElementAt*`          | `TSource`                                         | ✓ |   |   |
| `System.Linq.Enumerable.ElementAtOrDefault*` | `TSource?`                                        | ✓ |   |   |
| `System.Linq.Enumerable.Empty*`              | `System.Collections.Generic.IEnumerable`1` | ✓ |   |   |
| `System.Linq.Enumerable.Except*`             | `System.Collections.Generic.IEnumerable`1` |   | ✓ | ✓ |
| `System.Linq.Enumerable.First*`              | `TSource`                                         | ✓ |   |   |
| `System.Linq.Enumerable.FirstOrDefault*`     | `TSource?`                                        | ✓ |   |   |
| `System.Linq.Enumerable.GroupBy*`            | `System.Collections.Generic.IEnumerable`1` |   |   | ✓ |
| `System.Linq.Enumerable.GroupJoin*`          | `System.Collections.Generic.IEnumerable`1` |   | ✓ | ✓ |
| `System.Linq.Enumerable.Intersect*`          | `System.Collections.Generic.IEnumerable`1` |   | ✓ | ✓ |
| `System.Linq.Enumerable.Join*`               | `System.Collections.Generic.IEnumerable`1` |   | ✓ | ✓ |
| `System.Linq.Enumerable.Last*`               | `TSource`                                         | ✓ |   |   |
| `System.Linq.Enumerable.LastOrDefault*`      | `TSource?`                                        | ✓ |   |   |
| `System.Linq.Enumerable.LongCount*`          | `System.Int64`                               | ✓ |   |   |
| `System.Linq.Enumerable.Max*`                | Single numeric value, `TSource`, or `TResult?`    | ✓ |   |   |
| `System.Linq.Enumerable.Min*`                | Single numeric value, `TSource`, or `TResult?`    | ✓ |   |   |
| `System.Linq.Enumerable.OfType*`             | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.OrderBy*`            | `System.Linq.IOrderedEnumerable`1`         |   |   | ✓ |
| `System.Linq.Enumerable.OrderByDescending*`  | `System.Linq.IOrderedEnumerable`1`         |   |   | ✓ |
| `System.Linq.Enumerable.Range*`              | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.Repeat*`             | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.Reverse*`            | `System.Collections.Generic.IEnumerable`1` |   |   | ✓ |
| `System.Linq.Enumerable.Select*`             | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.SelectMany*`         | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.SequenceEqual*`      | `System.Boolean`                             | ✓ |   |   |
| `System.Linq.Enumerable.Single*`             | `TSource`                                         | ✓ |   |   |
| `System.Linq.Enumerable.SingleOrDefault*`    | `TSource?`                                        | ✓ |   |   |
| `System.Linq.Enumerable.Skip*`               | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.SkipWhile*`          | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.Sum*`                | Single numeric value                              | ✓ |   |   |
| `System.Linq.Enumerable.Take*`               | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.TakeWhile*`          | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.ThenBy*`             | `System.Linq.IOrderedEnumerable`1`         |   |   | ✓ |
| `System.Linq.Enumerable.ThenByDescending*`   | `System.Linq.IOrderedEnumerable`1`         |   |   | ✓ |
| `System.Linq.Enumerable.ToArray*`            | `TSource[]` array                                 | ✓ |   |   |
| `System.Linq.Enumerable.ToDictionary*`       | `System.Collections.Generic.Dictionary`2`  | ✓ |   |   |
| `System.Linq.Enumerable.ToList*`             | `System.Collections.Generic.IList`1`       | ✓ |   |   |
| `System.Linq.Enumerable.ToLookup*`           | `System.Linq.ILookup`2`                    | ✓ |   |   |
| `System.Linq.Enumerable.Union*`              | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |
| `System.Linq.Enumerable.Where*`              | `System.Collections.Generic.IEnumerable`1` |   | ✓ |   |

## LINQ to objects

"LINQ to Objects" refers to the use of LINQ queries with any `System.Collections.IEnumerable` or `System.Collections.Generic.IEnumerable`1` collection directly. You can use LINQ to query any enumerable collections, such as `System.Collections.Generic.List`1`, `System.Array`, or `System.Collections.Generic.Dictionary`2`. The collection can be user-defined or a type returned by a .NET API. In the LINQ approach, you write declarative code that describes what you want to retrieve. LINQ to Objects provides a great introduction to programming with LINQ.

LINQ queries offer three main advantages over traditional `foreach` loops:

- They're more concise and readable, especially when filtering multiple conditions.
- They provide powerful filtering, ordering, and grouping capabilities with a minimum of application code.
- They can be ported to other data sources with little or no modification.

The more complex the operation you want to perform on the data, the more benefit you realize using LINQ instead of traditional iteration techniques.

## Store the results of a query in memory

A query is basically a set of instructions for how to retrieve and organize data. Queries are executed lazily, as each subsequent item in the result is requested. When you use `foreach` to iterate the results, items are returned as accessed. To evaluate a query and store its results without executing a `foreach` loop, just call one of the following methods on the query variable:

- `System.Linq.Enumerable.ToList*`
- `System.Linq.Enumerable.ToArray*`
- `System.Linq.Enumerable.ToDictionary*`
- `System.Linq.Enumerable.ToLookup*`

You should assign the returned collection object to a new variable when you store the query results, as shown in the following example:

```csharp
List<int> numbers = [ 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ];

IEnumerable<int> queryFactorsOfFour = from num in numbers
                                      where num % 4 == 0
                                      select num;

// Store the results in a new variable
// without executing a foreach loop.
var factorsofFourList = queryFactorsOfFour.ToList();

// Read and write from the newly created list to demonstrate that it holds data.
Console.WriteLine(factorsofFourList[2]);
factorsofFourList[2] = 0;
Console.WriteLine(factorsofFourList[2]);
```
## See also

- Walkthrough: Writing Queries in C#
- foreach, in
- Query Keywords (LINQ)
