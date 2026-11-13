---
title: "Set operations"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/linq/standard-query-operators/set-operations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Set operations (C#)

Set operations in LINQ refer to query operations that produce a result set based on the presence or absence of equivalent elements within the same or separate collections.

> **Important:**
>
> These samples use an `System.Collections.Generic.IEnumerable`1` data source. Data sources based on `System.Linq.IQueryProvider` use `System.Linq.IQueryable`1` data sources and expression trees. Expression trees have limitations on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as EF Core may impose more restrictions. Check the documentation for your data source.

| Method names | Description | C# query expression syntax | More information |
|--|--|--|--|
| `Distinct` or `DistinctBy` | Removes duplicate values from a collection. | Not applicable. | `System.Linq.Enumerable.Distinct*``System.Linq.Enumerable.DistinctBy*``System.Linq.Queryable.Distinct*``System.Linq.Queryable.DistinctBy*` |
| `Except` or `ExceptBy` | Returns the set difference, which means the elements of one collection that don't appear in a second collection. | Not applicable. | `System.Linq.Enumerable.Except*``System.Linq.Enumerable.ExceptBy*``System.Linq.Queryable.Except*``System.Linq.Queryable.ExceptBy*` |
| `Intersect` or `IntersectBy` | Returns the set intersection, which means elements that appear in each of two collections. | Not applicable. | `System.Linq.Enumerable.Intersect*``System.Linq.Enumerable.IntersectBy*``System.Linq.Queryable.Intersect*``System.Linq.Queryable.IntersectBy*` |
| `Union` or `UnionBy` | Returns the set union, which means unique elements that appear in either of two collections. | Not applicable. | `System.Linq.Enumerable.Union*``System.Linq.Enumerable.UnionBy*``System.Linq.Queryable.Union*``System.Linq.Queryable.UnionBy*` |

## `Distinct` and `DistinctBy`

The following example depicts the behavior of the `System.Linq.Enumerable.Distinct*` method on a sequence of strings. The returned sequence contains the unique elements from the input sequence.

```csharp
string[] words = ["the", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"];

IEnumerable<string> query = from word in words.Distinct()
                            select word;

foreach (var str in query)
{
    Console.WriteLine(str);
}

/* This code produces the following output:
 *
 * the
 * quick
 * brown
 * fox
 * jumped
 * over
 * lazy
 * dog
 */
```
The `DistinctBy` is an alternative approach to `Distinct` that takes a `keySelector`. The `keySelector` is used as the comparative discriminator of the source type. In the following code, words are discriminated based on their `Length`, and the first word of each length is displayed:

```csharp
string[] words = ["the", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"];

foreach (string word in words.DistinctBy(p => p.Length))
{
    Console.WriteLine(word);
}

// This code produces the following output:
//     the
//     quick
//     jumped
//     over
```
## `Except` and `ExceptBy`

The following example depicts the behavior of `System.Linq.Enumerable.Except*`. The returned sequence contains only the elements from the first input sequence that aren't in the second input sequence.

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

```csharp
string[] words1 = ["the", "quick", "brown", "fox"];
string[] words2 = ["jumped", "over", "the", "lazy", "dog"];

IEnumerable<string> query = from word in words1.Except(words2)
                            select word;

foreach (var str in query)
{
    Console.WriteLine(str);
}

/* This code produces the following output:
 *
 * quick
 * brown
 * fox
 */
```
The `System.Linq.Enumerable.ExceptBy*` method is an alternative approach to `Except` that takes two sequences of possibly heterogenous types and a `keySelector`. The `keySelector` is the same type as the first collection's type. Consider the following `Teacher` array and teacher IDs to exclude. To find teachers in the first collection that aren't in the second collection, you can project the teacher's ID onto the second collection:

```csharp
int[] teachersToExclude =
[
    901,    // English
    965,    // Mathematics
    932,    // Engineering
    945,    // Economics
    987,    // Physics
    901     // Chemistry
];

foreach (Teacher teacher in
    teachers.ExceptBy(
        teachersToExclude, teacher => teacher.ID))
{
    Console.WriteLine($"{teacher.First} {teacher.Last}");
}
```
In the preceding C# code:

- The `teachers` array is filtered to only those teachers that aren't in the `teachersToExclude` array.
- The `teachersToExclude` array contains the `ID` value for all department heads.
- The call to `ExceptBy` results in a new set of values that are written to the console.

The new set of values is of type `Teacher`, which is the type of the first collection. Each `teacher` in the `teachers` array that doesn't have a corresponding ID value in the `teachersToExclude` array is written to the console.

## `Intersect` and `IntersectBy`

The following example depicts the behavior of `System.Linq.Enumerable.Intersect*`. The returned sequence contains the elements that are common to both of the input sequences.

```csharp
string[] words1 = ["the", "quick", "brown", "fox"];
string[] words2 = ["jumped", "over", "the", "lazy", "dog"];

IEnumerable<string> query = from word in words1.Intersect(words2)
                            select word;

foreach (var str in query)
{
    Console.WriteLine(str);
}

/* This code produces the following output:
 *
 * the
 */
```
The `System.Linq.Enumerable.IntersectBy*` method is an alternative approach to `Intersect` that takes two sequences of possibly heterogenous types and a `keySelector`. The `keySelector` is used as the comparative discriminator of the second collection's type. Consider the following student and teacher arrays. The query matches items in each sequence by name to find those students who are also teachers:

```csharp
foreach (Student person in
    students.IntersectBy(
        teachers.Select(t => (t.First, t.Last)), s => (s.FirstName, s.LastName)))
{
    Console.WriteLine($"{person.FirstName} {person.LastName}");
}
```
In the preceding C# code:

- The query produces the intersection of the `Teacher` and `Student` by comparing names.
- Only people that are found in both arrays are present in the resulting sequence.
- The resulting `Student` instances are written to the console.

## `Union` and `UnionBy`

The following example depicts a union operation on two sequences of strings. The returned sequence contains the unique elements from both input sequences.

```csharp
string[] words1 = ["the", "quick", "brown", "fox"];
string[] words2 = ["jumped", "over", "the", "lazy", "dog"];

IEnumerable<string> query = from word in words1.Union(words2)
                            select word;

foreach (var str in query)
{
    Console.WriteLine(str);
}

/* This code produces the following output:
 *
 * the
 * quick
 * brown
 * fox
 * jumped
 * over
 * lazy
 * dog
*/
```
The `System.Linq.Enumerable.UnionBy*` method is an alternative approach to `Union` that takes two sequences of the same type and a `keySelector`. The `keySelector` is used as the comparative discriminator of the source type. The following query produces the list of all people that are either students or teachers. Students who are also teachers are added to the union set only once:

```csharp
foreach (var person in
    students.Select(s => (s.FirstName, s.LastName)).UnionBy(
        teachers.Select(t => (FirstName: t.First, LastName: t.Last)), s => (s.FirstName, s.LastName)))
{
    Console.WriteLine($"{person.FirstName} {person.LastName}");
}
```
In the preceding C# code:

- The `teachers` and `students` arrays are woven together using their names as the key selector.
- The resulting names are written to the console.

## See also

- `System.Linq`
- How to find the set difference between two lists (LINQ) (C#)
