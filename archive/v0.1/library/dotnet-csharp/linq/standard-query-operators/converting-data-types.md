---
title: "Converting Data Types"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/linq/standard-query-operators/converting-data-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Converting Data Types (C#)

Conversion methods change the type of input objects.

> **Important:**
>
> These samples use an `System.Collections.Generic.IEnumerable`1` data source. Data sources based on `System.Linq.IQueryProvider` use `System.Linq.IQueryable`1` data sources and expression trees. Expression trees have limitations on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as EF Core may impose more restrictions. Check the documentation for your data source.

Conversion operations in LINQ queries are useful in various applications. Following are some examples:

- The `System.Linq.Enumerable.AsEnumerable*` method can be used to hide a type's custom implementation of a standard query operator.
- The `System.Linq.Enumerable.OfType*` method can be used to enable non-parameterized collections for LINQ querying.
- The `System.Linq.Enumerable.ToArray*`, `System.Linq.Enumerable.ToDictionary*`, `System.Linq.Enumerable.ToList*`, and `System.Linq.Enumerable.ToLookup*` methods can be used to force immediate query execution instead of deferring it until the query is enumerated.

## Methods

The following table lists the standard query operator methods that perform data-type conversions.

The conversion methods in this table whose names start with "As" change the static type of the source collection but don't enumerate it. The methods whose names start with "To" enumerate the source collection and put the items into the corresponding collection type.

|Method Name|Description|C# Query Expression Syntax|More Information|
|-----------------|-----------------|---------------------------------|----------------------|
|AsEnumerable|Returns the input typed as `System.Collections.Generic.IEnumerable`1`.|Not applicable.|`System.Linq.Enumerable.AsEnumerable*`|
|AsQueryable|Converts a (generic) `System.Collections.IEnumerable` to a (generic) `System.Linq.IQueryable`.|Not applicable.|`System.Linq.Queryable.AsQueryable*`|
|Cast|Casts the elements of a collection to a specified type.|Use an explicitly typed range variable. For example: `from string str in words`|`System.Linq.Enumerable.Cast*` `System.Linq.Queryable.Cast*`|
|OfType|Filters values, depending on their ability to be cast to a specified type.|Not applicable.|`System.Linq.Enumerable.OfType*` `System.Linq.Queryable.OfType*`|
|ToArray|Converts a collection to an array. This method forces query execution.|Not applicable.|`System.Linq.Enumerable.ToArray*`|
|ToDictionary|Puts elements into a `System.Collections.Generic.Dictionary`2` based on a key <example-value> function. This method forces query execution.|Not applicable.|`System.Linq.Enumerable.ToDictionary*`|
|ToList|Converts a collection to a `System.Collections.Generic.List`1`. This method forces query execution.|Not applicable.|`System.Linq.Enumerable.ToList*`|
|ToLookup|Puts elements into a `System.Linq.Lookup`2` (a one-to-many dictionary) based on a key <example-value> function. This method forces query execution.|Not applicable.|`System.Linq.Enumerable.ToLookup*`|

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

## Query Expression Syntax Example

The following code example uses an explicitly typed range variable to cast a type to a subtype before accessing a member that is available only on the subtype.

```csharp
IEnumerable people = students;

var query = from Student student in people
            where student.Year == GradeLevel.ThirdYear
            select student;

foreach (Student student in query)
{
    Console.WriteLine(student.FirstName);
}
```
The equivalent query can be expressed using method syntax as shown in the following example:

```csharp
IEnumerable people = students;

var query = people
    .Cast<Student>()
    .Where(student => student.Year == GradeLevel.ThirdYear);

foreach (Student student in query)
{
    Console.WriteLine(student.FirstName);
}
```
## See also

- `System.Linq`
- from clause
