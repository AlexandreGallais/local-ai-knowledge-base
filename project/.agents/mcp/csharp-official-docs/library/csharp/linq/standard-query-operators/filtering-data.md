---
title: "Filtering Data with LINQ"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/linq/standard-query-operators/filtering-data.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Filtering Data in C# with LINQ

Filtering refers to the operation of restricting the result set to contain only those elements that satisfy a specified condition. It's also referred to as *selecting* elements that match the specified condition.

> **Important:**
>
> These samples use an `System.Collections.Generic.IEnumerable`1` data source. Data sources based on `System.Linq.IQueryProvider` use `System.Linq.IQueryable`1` data sources and expression trees. Expression trees have limitations on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as EF Core may impose more restrictions. Check the documentation for your data source.

The following illustration shows the results of filtering a sequence of characters. The predicate for the filtering operation specifies that the character must be 'A'.

The standard query operator methods that perform selection are listed in the following table:

|Method Name|Description|C# Query Expression Syntax|More Information|
|-----------------|-----------------|---------------------------------|----------------------|
|OfType|Selects values, depending on their ability to be cast to a specified type.|Not applicable.|`System.Linq.Enumerable.OfType*` `System.Linq.Queryable.OfType*`|
|Where|Selects values that are based on a predicate function.|`where`|`System.Linq.Enumerable.Where*` `System.Linq.Queryable.Where*`|

The following example uses the `where` clause to filter from an array those strings that have a specific length.

> **Note:**
> You can refer to the common data sources for this area in the Standard Query Operators Overview article.

```csharp
string[] words = ["the", "quick", "brown", "fox", "jumps"];

IEnumerable<string> query = from word in words
                            where word.Length == 3
                            select word;

foreach (string str in query)
{
    Console.WriteLine(str);
}

/* This code produces the following output:

    the
    fox
*/
```
The equivalent query using method syntax is shown in the following code:

```csharp
string[] words = ["the", "quick", "brown", "fox", "jumps"];

IEnumerable<string> query =
    words.Where(word => word.Length == 3);

foreach (string str in query)
{
    Console.WriteLine(str);
}

/* This code produces the following output:

    the
    fox
*/
```
## See also

- `System.Linq`
- where clause
- How to query an assembly's metadata with Reflection (LINQ) (C#)
- How to query for files with a specified attribute or name (C#)
- How to sort or filter text data by any word or field (LINQ) (C#)
