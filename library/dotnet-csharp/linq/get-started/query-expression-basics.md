---
title: "Query expression basics (LINQ) (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/linq/get-started/query-expression-basics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Query expression basics

This article introduces the basic <example-value> related to query expressions in C#.

## What is a query and what does it do?

A *query* is a set of instructions that describes what data to retrieve from a given data source (or sources) and what shape and organization the returned data should have. A query is distinct from the results that it produces.

Generally, the source data is organized logically as a sequence of elements of the same kind. For example, an SQL database table contains a sequence of rows. In an XML file, there's a "sequence" of XML elements (although XML elements are organized hierarchically in a tree structure). An in-memory collection contains a sequence of objects.

From an application's viewpoint, the specific type and structure of the original source data isn't important. The application always sees the source data as an `System.Collections.Generic.IEnumerable`1` or `System.Linq.IQueryable`1` collection. For example, in LINQ to XML, the source data is made visible as an `IEnumerable`\<`System.Xml.Linq.XElement`>.

Given this source sequence, a query might do one of three things:

- Retrieve a subset of the elements to produce a new sequence without modifying the individual elements. The query might then sort or group the returned sequence in various ways, as shown in the following example (assume `scores` is an `int[]`):

```csharp
IEnumerable<int> highScoresQuery =
    from score in scores
    where score > 80
    orderby score descending
    select score;
```
- Retrieve a sequence of elements as in the previous example but transform them to a new type of object. For example, a query might retrieve only the family names from certain customer records in a data source. Or it might retrieve the complete record and then use it to construct another in-memory object type or even XML data before generating the final result sequence. The following example shows a projection from an `int` to a `string`. Note the new type of `highScoresQuery`.

```csharp
IEnumerable<string> highScoresQuery2 =
    from score in scores
    where score > 80
    orderby score descending
    select $"The score is {score}";
```
- Retrieve a singleton value about the source data, such as:

  - The number of elements that match a certain condition.

  - The element that has the greatest or least value.

  - The first element that matches a condition, or the sum of particular values in a specified set of elements. For example, the following query returns the number of scores greater than 80 from the `scores` integer array:

```csharp
var highScoreCount = (
    from score in scores
    where score > 80
    select score
).Count();
```
    In the previous example, note the use of parentheses around the query expression before the call to the `System.Linq.Enumerable.Count*` method. You can also use a new variable to store the concrete result.

```csharp
IEnumerable<int> highScoresQuery3 =
    from score in scores
    where score > 80
    select score;

var scoreCount = highScoresQuery3.Count();
```
In the previous example, the query is executed in the call to `Count`, because `Count` must iterate over the results in order to determine the number of elements returned by `highScoresQuery`.
