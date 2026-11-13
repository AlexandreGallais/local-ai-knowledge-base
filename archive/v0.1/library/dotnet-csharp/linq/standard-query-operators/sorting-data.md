---
title: "Sorting Data"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/linq/standard-query-operators/sorting-data.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Sorting Data (C#)

A sorting operation orders the elements of a sequence based on one or more attributes. The first sort criterion performs a primary sort on the elements. By specifying a second sort criterion, you can sort the elements within each primary sort group.

> **Important:**
>
> These samples use an `System.Collections.Generic.IEnumerable`1` data source. Data sources based on `System.Linq.IQueryProvider` use `System.Linq.IQueryable`1` data sources and expression trees. Expression trees have limitations on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as EF Core may impose more restrictions. Check the documentation for your data source.

The following illustration shows the results of an alphabetical sort operation on a sequence of characters:

The standard query operator methods that sort data are listed in the following section.

## Methods

|Method Name|Description|C# Query Expression Syntax|More Information|
|-----------------|-----------------|---------------------------------|----------------------|
|OrderBy|Sorts values in ascending order.|`orderby`|`System.Linq.Enumerable.OrderBy*` `System.Linq.Queryable.OrderBy*`|
|OrderByDescending|Sorts values in descending order.|`orderby … descending`|`System.Linq.Enumerable.OrderByDescending*` `System.Linq.Queryable.OrderByDescending*`|
|ThenBy|Performs a secondary sort in ascending order.|`orderby …, …`|`System.Linq.Enumerable.ThenBy*` `System.Linq.Queryable.ThenBy*`|
|ThenByDescending|Performs a secondary sort in descending order.|`orderby …, … descending`|`System.Linq.Enumerable.ThenByDescending*` `System.Linq.Queryable.ThenByDescending*`|
|Reverse|Reverses the order of the elements in a collection.|Not applicable.|`System.Linq.Enumerable.Reverse*` `System.Linq.Queryable.Reverse*`|

> **Note:**
> The following examples in this article use the common data sources for this area.
> Each `Student` has a grade level, a primary department, and a series of scores. A `Teacher` also has a `City` property that identifies the campus where the teacher holds classes. A `Department` has a name, and a reference to a `Teacher` who serves as the department head.
> You can find the example data set in the source repo.

```csharp
public enum GradeLevel
{
    FirstYear = 1,
    SecondYear,
    ThirdYear,
    FourthYear
};

public class Student
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required int ID { get; init; }

    public required GradeLevel Year { get; init; }
    public required List<int> Scores { get; init; }

    public required int DepartmentID { get; init; }
}

public class Teacher
{
    public required string First { get; init; }
    public required string Last { get; init; }
    public required int ID { get; init; }
    public required string City { get; init; }
}

public class Department
{
    public required string Name { get; init; }
    public int ID { get; init; }

    public required int TeacherID { get; init; }
}
```
> **Note:**
> You can refer to the common data sources for this area in the Standard Query Operators Overview article.

## Primary Ascending Sort

The following example demonstrates how to use the `orderby` clause in a LINQ query to sort the array of teachers by family name, in ascending order.

```csharp
IEnumerable<string> query = from teacher in teachers
                            orderby teacher.Last
                            select teacher.Last;

foreach (string str in query)
{
    Console.WriteLine(str);
}
```
The equivalent query written using method syntax is shown in the following code:

```csharp
IEnumerable<string> query = teachers
    .OrderBy(teacher => teacher.Last)
    .Select(teacher => teacher.Last);

foreach (string str in query)
{
    Console.WriteLine(str);
}
```
## Primary Descending Sort

The next example demonstrates how to use the `orderby descending` clause in a LINQ query to sort the teachers by family name, in descending order.

```csharp
IEnumerable<string> query = from teacher in teachers
                            orderby teacher.Last descending
                            select teacher.Last;

foreach (string str in query)
{
    Console.WriteLine(str);
}
```
The equivalent query written using method syntax is shown in the following code:

```csharp
IEnumerable<string> query = teachers
    .OrderByDescending(teacher => teacher.Last)
    .Select(teacher => teacher.Last);

foreach (string str in query)
{
    Console.WriteLine(str);
}
```
## Secondary Ascending Sort

The following example demonstrates how to use the `orderby` clause in a LINQ query to perform a primary and secondary sort. The teachers are sorted primarily by city and secondarily by their family name, both in ascending order.

```csharp
IEnumerable<(string, string)> query = from teacher in teachers
                            orderby teacher.City, teacher.Last
                            select (teacher.Last, teacher.City);

foreach ((string last, string city) in query)
{
    Console.WriteLine($"City: {city}, Last Name: {last}");
}
```
The equivalent query written using method syntax is shown in the following code:

```csharp
IEnumerable<(string, string)> query = teachers
    .OrderBy(teacher => teacher.City)
    .ThenBy(teacher => teacher.Last)
    .Select(teacher => (teacher.Last, teacher.City));

foreach ((string last, string city) in query)
{
    Console.WriteLine($"City: {city}, Last Name: {last}");
}
```
## Secondary Descending Sort

The next example demonstrates how to use the `orderby descending` clause in a LINQ query to perform a primary sort, in ascending order, and a secondary sort, in descending order. The teachers are sorted primarily by city and secondarily by their family name.

```csharp
IEnumerable<(string, string)> query = from teacher in teachers
                            orderby teacher.City, teacher.Last descending
                            select (teacher.Last, teacher.City);

foreach ((string last, string city) in query)
{
    Console.WriteLine($"City: {city}, Last Name: {last}");
}
```
The equivalent query written using method syntax is shown in the following code:

```csharp
IEnumerable<(string, string)> query = teachers
    .OrderBy(teacher => teacher.City)
    .ThenByDescending(teacher => teacher.Last)
    .Select(teacher => (teacher.Last, teacher.City));

foreach ((string last, string city) in query)
{
    Console.WriteLine($"City: {city}, Last Name: {last}");
}
```
## See also

- `System.Linq`
- orderby clause
- How to sort or filter text data by any word or field (LINQ) (C#)
