---
title: "Join Operations (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/linq/standard-query-operators/join-operations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Join operations in LINQ

A *join* associates objects in one data source with objects that share a common attribute in another data source.

> **Important:**
>
> These samples use an `System.Collections.Generic.IEnumerable`1` data source. Data sources based on `System.Linq.IQueryProvider` use `System.Linq.IQueryable`1` data sources and expression trees. Expression trees have limitations on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as EF Core may impose more restrictions. Check the documentation for your data source.

Joining is an important operation in queries that target data sources whose relationships to each other you can't follow directly. In object-oriented programming, joining could mean a correlation between objects that isn't modeled, such as the backwards direction of a one-way relationship. An example of a one-way relationship is a `Student` class that has a property of type `Department` that represents the major, but the `Department` class doesn't have a property that is a collection of `Student` objects. If you have a list of `Department` objects and you want to find all the students in each department, you could use a join operation to find them.

The LINQ framework provides join methods: `System.Linq.Enumerable.Join*` and `System.Linq.Enumerable.GroupJoin*`. These methods perform equijoins, or joins that match two data sources based on equality of their keys. For comparison, Transact-SQL supports join operators other than `equals`, such as the `less than` operator. In relational database terms, `System.Linq.Enumerable.Join*` implements an inner join, a type of join in which only those objects that have a match in the other data set are returned. The `System.Linq.Enumerable.GroupJoin*` method has no direct equivalent in relational database terms, but it implements a superset of inner joins and left outer joins. A left outer join is a join that returns each element of the first (left) data source, even if it has no correlated elements in the other data source.

The following illustration shows a conceptual view of two sets and the elements within those sets that are included in either an inner join or a left outer join.

## Methods

|Method Name|Description|C# Query Expression Syntax|More Information|
|-----------------|-----------------|---------------------------------|----------------------|
|Join|Joins two sequences based on key <example-value> functions and extracts pairs of values.|`join … in … on … equals …`|`System.Linq.Enumerable.Join*` `System.Linq.Queryable.Join*`|
|GroupJoin|Joins two sequences based on key <example-value> functions and groups the resulting matches for each element.|`join … in … on … equals … into …`|`System.Linq.Enumerable.GroupJoin*` `System.Linq.Queryable.GroupJoin*`|
|LeftJoin|Correlates the elements of two sequences based on matching keys.| N/A | `System.Linq.Enumerable.LeftJoin*` `System.Linq.Queryable.LeftJoin*`|
|RightJoin|Correlates the elements of two sequences based on matching keys.| N/A | `System.Linq.Enumerable.RightJoin*` `System.Linq.Queryable.RightJoin*`|

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

The following example uses the `join … in … on … equals …` clause to join two sequences based on a specific value:

```csharp
var query = from student in students
            join department in departments on student.DepartmentID equals department.ID
            select new { Name = $"{student.FirstName} {student.LastName}", DepartmentName = department.Name };

foreach (var item in query)
{
    Console.WriteLine($"{item.Name} - {item.DepartmentName}");
}
```
You can express the preceding query by using method syntax, as shown in the following code:

```csharp
var query = students.Join(departments,
    student => student.DepartmentID, department => department.ID,
    (student, department) => new { Name = $"{student.FirstName} {student.LastName}", DepartmentName = department.Name });

foreach (var item in query)
{
    Console.WriteLine($"{item.Name} - {item.DepartmentName}");
}
```
The following example uses the `join … in … on … equals … into …` clause to join two sequences based on a specific value and group the resulting matches for each element:

```csharp
IEnumerable<IEnumerable<Student>> studentGroups = from department in departments
                    join student in students on department.ID equals student.DepartmentID into studentGroup
                    select studentGroup;

foreach (IEnumerable<Student> studentGroup in studentGroups)
{
    Console.WriteLine("Group");
    foreach (Student student in studentGroup)
    {
        Console.WriteLine($"  - {student.FirstName}, {student.LastName}");
    }
}
```
You can express the preceding query by using method syntax, as shown in the following example:

```csharp
// Join department and student based on DepartmentId and grouping result
IEnumerable<IEnumerable<Student>> studentGroups = departments.GroupJoin(students,
    department => department.ID, student => student.DepartmentID,
    (department, studentGroup) => studentGroup);

foreach (IEnumerable<Student> studentGroup in studentGroups)
{
    Console.WriteLine("Group");
    foreach (Student student in studentGroup)
    {
        Console.WriteLine($"  - {student.FirstName}, {student.LastName}");
    }
}
```
