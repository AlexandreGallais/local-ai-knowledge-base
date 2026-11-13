---
title: "Join Operations (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/linq/standard-query-operators/join-operations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Join Operations (part 3 of 3)

## Perform outer joins

.NET 10 includes `LeftJoin` and `RightJoin` methods in the `System.Linq.Enumerable` and `System.Linq.Queryable` classes. These methods perform an *outer left equijoin*, and an *outer right equijoin*, respectively. An outer left equijoin is a join where every member of the first sequence is included in the output sequence, even if the second sequence doesn't include a match. An outer right equijoin is a join where every member of the second sequence is included in the output sequence, even if the first sequence doesn't include a match.

## Emulate a left outer join

Before .NET 10, use LINQ to perform a left outer join by calling the `System.Linq.Enumerable.DefaultIfEmpty*` method on the results of a group join.

The following example demonstrates how to use the `System.Linq.Enumerable.DefaultIfEmpty*` method on the results of a group join to perform a left outer join.

The first step in producing a left outer join of two collections is to perform an inner join by using a group join. (See Perform inner joins for an explanation of this process.) In this example, the list of `Department` objects is inner-joined to the list of `Student` objects based on a `Department` object's ID that matches the student's `DepartmentID`.

The second step is to include each element of the first (left) collection in the result set even if that element has no matches in the right collection. You accomplish this step by calling `System.Linq.Enumerable.DefaultIfEmpty*` on each sequence of matching elements from the group join. In this example, you call `System.Linq.Enumerable.DefaultIfEmpty*` on each sequence of matching `Student` objects. The method returns a collection that contains a single, default value if the sequence of matching `Student` objects is empty for any `Department` object, ensuring that each `Department` object is represented in the result collection.

> **Note:**
> The default value for a reference type is `null`; therefore, the example checks for a null reference before accessing each element of each `Student` collection.

```csharp
var query =
    from student in students
    join department in departments on student.DepartmentID equals department.ID into gj
    from subgroup in gj.DefaultIfEmpty()
    select new
    {
        student.FirstName,
        student.LastName,
        Department = subgroup?.Name ?? string.Empty
    };

foreach (var v in query)
{
    Console.WriteLine($"{v.FirstName:-15} {v.LastName:-15}: {v.Department}");
}
```
The equivalent query using method syntax is shown in the following code:

```csharp
var query = students
    .GroupJoin(
        departments,
        student => student.DepartmentID,
        department => department.ID,
        (student, departmentList) => new { student, subgroup = departmentList })
    .SelectMany(
        joinedSet => joinedSet.subgroup.DefaultIfEmpty(),
        (student, department) => new
        {
            student.student.FirstName,
            student.student.LastName,
            Department = department?.Name ?? string.Empty
        });

foreach (var v in query)
{
    Console.WriteLine($"{v.FirstName:-15} {v.LastName:-15}: {v.Department}");
}
```
## See also

- `System.Linq.Enumerable.Join*`
- `System.Linq.Enumerable.GroupJoin*`
- Anonymous types
- Formulate Joins and Cross-Product Queries
- join clause
- group clause
- How to join content from dissimilar files (LINQ) (C#)
- How to populate object collections from multiple sources (LINQ) (C#)
