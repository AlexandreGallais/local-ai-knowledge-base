---
title: "Partitioning data"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/linq/standard-query-operators/partitioning-data.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Partitioning data (C#)

Partitioning in LINQ refers to the operation of dividing an input sequence into two sections, without rearranging the elements, and then returning one of the sections.

> **Important:**
>
> These samples use an `System.Collections.Generic.IEnumerable`1` data source. Data sources based on `System.Linq.IQueryProvider` use `System.Linq.IQueryable`1` data sources and expression trees. Expression trees have limitations on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as EF Core may impose more restrictions. Check the documentation for your data source.

The following illustration shows the results of three different partitioning operations on a sequence of characters. The first operation returns the first three elements in the sequence. The second operation skips the first three elements and returns the remaining elements. The third operation skips the first two elements in the sequence and returns the next three elements.

The standard query operator methods that partition sequences are listed in the following section.

## Operators

| Method names | Description | C# query expression syntax | More information |
|--|--|--|--|
| Skip | Skips elements up to a specified position in a sequence. | Not applicable. | `System.Linq.Enumerable.Skip*``System.Linq.Queryable.Skip*` |
| SkipWhile | Skips elements based on a predicate function until an element doesn't satisfy the condition. | Not applicable. | `System.Linq.Enumerable.SkipWhile*``System.Linq.Queryable.SkipWhile*` |
| Take | Takes elements up to a specified position in a sequence. | Not applicable. | `System.Linq.Enumerable.Take*``System.Linq.Queryable.Take*` |
| TakeWhile | Takes elements based on a predicate function until an element doesn't satisfy the condition. | Not applicable. | `System.Linq.Enumerable.TakeWhile*``System.Linq.Queryable.TakeWhile*` |
| Chunk | Splits the elements of a sequence into chunks of a specified maximum size. | Not applicable. | `System.Linq.Enumerable.Chunk*``System.Linq.Queryable.Chunk*` |

All the following examples use `System.Linq.Enumerable.Range(System.Int32,System.Int32)` to generate a sequence of numbers from 0 through 7.

> **Note:**
> You can refer to the common data sources for this area in the Standard Query Operators Overview article.

You use the `Take` method to take only the first elements in a sequence:

```csharp
foreach (int number in Enumerable.Range(0, 8).Take(3))
{
    Console.WriteLine(number);
}
// This code produces the following output:
// 0
// 1
// 2
```
You use the `Skip` method to skip the first elements in a sequence, and use the remaining elements:

```csharp
foreach (int number in Enumerable.Range(0, 8).Skip(3))
{
    Console.WriteLine(number);
}
// This code produces the following output:
// 3
// 4
// 5
// 6
// 7
```
The `TakeWhile` and `SkipWhile` methods also take and skip elements in a sequence. However, instead of a set number of elements, these methods skip or take elements based on a condition. `TakeWhile` takes the elements of a sequence until an element doesn't match the condition.

```csharp
foreach (int number in Enumerable.Range(0, 8).TakeWhile(n => n < 5))
{
    Console.WriteLine(number);
}
// This code produces the following output:
// 0
// 1
// 2
// 3
// 4
```
`SkipWhile` skips the first elements, as long as the condition is true. The first element not matching the condition, and all subsequent elements, are returned.

```csharp
foreach (int number in Enumerable.Range(0, 8).SkipWhile(n => n < 5))
{
    Console.WriteLine(number);
}
// This code produces the following output:
// 5
// 6
// 7
```
The `Chunk` operator is used to split elements of a sequence based on a given `size`.

```csharp
int chunkNumber = 1;
foreach (int[] chunk in Enumerable.Range(0, 8).Chunk(3))
{
    Console.WriteLine($"Chunk {chunkNumber++}:");
    foreach (int item in chunk)
    {
        Console.WriteLine($"    {item}");
    }

    Console.WriteLine();
}
// This code produces the following output:
// Chunk 1:
//    0
//    1
//    2
//
//Chunk 2:
//    3
//    4
//    5
//
//Chunk 3:
//    6
//    7
```
The preceding C# code:

- Relies on `System.Linq.Enumerable.Range(System.Int32,System.Int32)` to generate a sequence of numbers.
- Applies the `Chunk` operator, splitting the sequence into chunks with a max size of three.

## See also

- `System.Linq`
