---
title: "Standard query operators overview"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/linq/standard-query-operators/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Standard query operators overview

The *standard query operators* are the keywords and methods that form the LINQ pattern. The C# language defines LINQ query keywords that you use for the most common query expressions. The compiler translates expressions using these keywords to the equivalent method calls. The two forms are synonymous. Other methods that are part of the `System.Linq` namespace don't have equivalent query keywords. In those cases, you must use the method syntax. This section covers all the query operator keywords. The runtime and other NuGet packages add more methods designed to work with LINQ queries each release. The most common methods, including those that have query keyword equivalents, are covered in this section. For the full list of query methods supported by the .NET Runtime, see the `System.Linq.Enumerable` API documentation. In addition to the methods covered here, this class contains methods for concatenating data sources, computing a single value from a data source, such as a sum, average, or other value.

> **Important:**
>
> These samples use an `System.Collections.Generic.IEnumerable`1` data source. Data sources based on `System.Linq.IQueryProvider` use `System.Linq.IQueryable`1` data sources and expression trees. Expression trees have limitations on the allowed C# syntax. Furthermore, each `IQueryProvider` data source, such as EF Core may impose more restrictions. Check the documentation for your data source.

Most of these methods operate on sequences, where a sequence is an object whose type implements the `System.Collections.Generic.IEnumerable`1` interface or the `System.Linq.IQueryable`1` interface. The standard query operators provide query capabilities including filtering, projection, aggregation, sorting, and more. The methods that make up each set are extension members defined in the `System.Linq.Enumerable` and `System.Linq.Queryable` classes, respectively. They're defined as *extension members* where the receiver type is either the `IEnumerable<T>` or `IQueryable<T>` type that they operate on.

The distinction between `System.Collections.Generic.IEnumerable`1` and `System.Linq.IQueryable`1` sequences determines how the query is executed at runtime.

For `IEnumerable<T>`, the returned enumerable object captures the arguments that were passed to the method. When that object is enumerated, the logic of the query operator is employed and the query results are returned.

For `IQueryable<T>`, the query is translated into an expression tree. The expression tree can be translated to a native query when the data source can optimize the query. Libraries such as Entity Framework translate LINQ queries into native SQL queries that execute at the database.

The following code example demonstrates how you can use the standard query operators to obtain information about a sequence.

```csharp
string sentence = "the quick brown fox jumps over the lazy dog";
// Split the string into individual words to create a collection.
string[] words = sentence.Split(' ');

// Using query expression syntax.
var query = from word in words
            group word.ToUpper() by word.Length into gr
            orderby gr.Key
            select new { Length = gr.Key, Words = gr };

// Using method-based query syntax.
var query2 = words.
    GroupBy(w => w.Length, w => w.ToUpper()).
    Select(g => new { Length = g.Key, Words = g }).
    OrderBy(o => o.Length);

foreach (var obj in query)
{
    Console.WriteLine($"Words of length {obj.Length}:");
    foreach (string word in obj.Words)
        Console.WriteLine(word);
}

// This code example produces the following output:
//
// Words of length 3:
// THE
// FOX
// THE
// DOG
// Words of length 4:
// OVER
// LAZY
// Words of length 5:
// QUICK
// BROWN
// JUMPS
```
Where possible, the queries in this section use a sequence of words or numbers as the input source. For queries where more complicated relationships between objects are used, the following sources that model a school are used:

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
Each `Student` has a grade level, a primary department, and a series of scores. A `Teacher` also has a `City` property that identifies the campus where the teacher holds classes. A `Department` has a name and a reference to a `Teacher` who serves as the department head.

You can find the data set in the source repo.

## Types of query operators

The standard query operators differ in the timing of their execution, depending on whether they return a singleton value or a sequence of values. Those methods that return a singleton value (such as `System.Linq.Enumerable.Average*` and `System.Linq.Enumerable.Sum*`) execute immediately. Methods that return a sequence defer the query execution and return an enumerable object. You can use the output sequence of one query as the input sequence to another query. You chain query methods together in one query, which enables queries to become arbitrarily complex.

## Query operators

In a LINQ query, the first step is to specify the data source. In a LINQ query, the `from` clause comes first in order to introduce the data source (`students`) and the *range variable* (`student`).

```csharp
//queryAllStudents is an IEnumerable<Student>
var queryAllStudents = from student in students
                        select student;
```
The range variable is like the iteration variable in a `foreach` loop except that no actual iteration occurs in a query expression. When the query is executed, the range variable serves as a reference to each successive element in `students`. Because the compiler can infer the type of `student`, you don't have to specify it explicitly. You can introduce more range variables in a `let` clause. For more information, see let clause.

> **Note:**
> For non-generic data sources such as `System.Collections.ArrayList`, you must explicitly type the range variable. For more information, see How to query an ArrayList with LINQ (C#) and from clause.

Once you obtain a data source, you can perform any number of operations on that data source:

- Filter data using the `where` keyword.
- Order data using the `orderby` and optionally `descending` keywords.
- Group data using the `group` and optionally `into` keywords.
- Join data using the `join` keyword.
- Project data using the `select` keyword.

## Query expression syntax table

The following table lists the standard query operators that have equivalent query expression clauses.

| Method | C# query expression syntax |
|------------|---------------------------------|
|`System.Linq.Enumerable.Cast*`|Use an explicitly typed range variable: `from int i in numbers` (For more information, see from clause.)|
|`System.Linq.Enumerable.GroupBy*`|`group … by …` -or- `group … by … into …` (For more information, see group clause.)|
|`System.Linq.Enumerable.GroupJoin``4(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEnumerable{``1},System.Func{``0,``2},System.Func{``1,``2},System.Func{``0,System.Collections.Generic.IEnumerable{``1},``3})`|`join … in … on … equals … into …` (For more information, see join clause.)|
|`System.Linq.Enumerable.Join``4(System.Collections.Generic.IEnumerable{``0},System.Collections.Generic.IEnumerable{``1},System.Func{``0,``2},System.Func{``1,``2},System.Func{``0,``1,``3})`|`join … in … on … equals …` (For more information, see join clause.)|
|`System.Linq.Enumerable.OrderBy``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1})`|`orderby` (For more information, see orderby clause.)|
|`System.Linq.Enumerable.OrderByDescending``2(System.Collections.Generic.IEnumerable{``0},System.Func{``0,``1})`|`orderby … descending` (For more information, see orderby clause.)|
|`System.Linq.Enumerable.Select*`|`select` (For more information, see select clause.)|
|`System.Linq.Enumerable.SelectMany*`|Multiple `from` clauses. (For more information, see from clause.)|
|`System.Linq.Enumerable.ThenBy``2(System.Linq.IOrderedEnumerable{``0},System.Func{``0,``1})`|`orderby …, …` (For more information, see orderby clause.)|
|`System.Linq.Enumerable.ThenByDescending``2(System.Linq.IOrderedEnumerable{``0},System.Func{``0,``1})`|`orderby …, … descending` (For more information, see orderby clause.)|
|`System.Linq.Enumerable.Where*`|`where` (For more information, see where clause.)|

## Data transformations with LINQ

Language-Integrated Query (LINQ) isn't only about retrieving data. It's also a powerful tool for transforming data. By using a LINQ query, you can use a source sequence as input and modify it in many ways to create a new output sequence. You can modify the sequence itself without modifying the elements themselves by sorting and grouping. But perhaps the most powerful feature of LINQ queries is the ability to create new types. The select clause creates an output element from an input element. You use it to transform an input element into an output element:

- Merge multiple input sequences into a single output sequence that has a new type.
- Create output sequences whose elements consist of only one or several properties of each element in the source sequence.
- Create output sequences whose elements consist of the results of operations performed on the source data.
- Create output sequences in a different format. For example, you can transform data from SQL rows or text files into XML.

You combine these transformations in various ways in the same query. Furthermore, you can use the output sequence of one query as the input sequence for a new query. The following example transforms objects in an in-memory data structure into XML elements.

```csharp

// Create the query.
var studentsToXML = new XElement("Root",
    from student in students
    let scores = string.Join(",", student.Scores)
    select new XElement("student",
                new XElement("First", student.FirstName),
                new XElement("Last", student.LastName),
                new XElement("Scores", scores)
            ) // end "student"
        ); // end "Root"

// Execute the query.
Console.WriteLine(studentsToXML);
```
The code produces the following XML output:

```xml
<Root>
  <student>
    <First>Svetlana</First>
    <Last>Omelchenko</Last>
    <Scores>97,90,73,54</Scores>
  </student>
  <student>
    <First>Claire</First>
    <Last>O'Donnell</Last>
    <Scores>56,78,95,95</Scores>
  </student>
  ...
  <student>
    <First>Max</First>
    <Last>Lindgren</Last>
    <Scores>86,88,96,63</Scores>
  </student>
  <student>
    <First>Arina</First>
    <Last>Ivanova</Last>
    <Scores>93,63,70,80</Scores>
  </student>
</Root>
```
For more information, see Creating XML Trees in C# (LINQ to XML).

You can use the results of one query as the data source for a subsequent query. This example shows how to order the results of a join operation. This query creates a group join and then sorts the groups based on the `department` element, which is still in scope. Inside the anonymous type initializer, a subquery orders all the matching elements from the `students` sequence.

```csharp
var orderedQuery = from department in departments
                   join student in students on department.ID equals student.DepartmentID into studentGroup
                   orderby department.Name
                   select new
                   {
                       DepartmentName = department.Name,
                       Students = from student in studentGroup
                                  orderby student.LastName
                                    select student
                   };

foreach (var departmentList in orderedQuery)
{
    Console.WriteLine(departmentList.DepartmentName);
    foreach (var student in departmentList.Students)
    {
        Console.WriteLine($"  {student.LastName,-10} {student.FirstName,-10}");
    }
}
/* Output:
Chemistry
  Balzan     Josephine
  Fakhouri   Fadi
  Popov      Innocenty
  Seleznyova Sofiya
  Vella      Carmen
Economics
  Adams      Terry
  Adaobi     Izuchukwu
  Berggren   Jeanette
  Garcia     Cesar
  Ifeoma     Nwanneka
  Jamuike    Ifeanacho
  Larsson    Naima
  Svensson   Noel
  Ugomma     Ifunanya
Engineering
  Axelsson   Erik
  Berg       Veronika
  Engström   Nancy
  Hicks      Cassie
  Keever     Bruce
  Micallef   Nicholas
  Mortensen  Sven
  Nilsson    Erna
  Tucker     Michael
  Yermolayeva Anna
English
  Andersson  Sarah
  Feng       Hanying
  Ivanova    Arina
  Jakobsson  Jesper
  Jensen     Christiane
  Johansson  Mark
  Kolpakova  Nadezhda
  Omelchenko Svetlana
  Urquhart   Donald
Mathematics
  Frost      Gaby
  Garcia     Hugo
  Hedlund    Anna
  Kovaleva   Katerina
  Lindgren   Max
  Maslova    Evgeniya
  Olsson     Ruth
  Sammut     Maria
  Sazonova   Anastasiya
Physics
  Åkesson    Sami
  Edwards    Amy E.
  Falzon     John
  Garcia     Debra
  Hansson    Sanna
  Mattsson   Martina
  Richardson Don
  Zabokritski Eugene
*/
```
The equivalent query using method syntax is shown in the following code:

```csharp
var orderedQuery = departments
    .GroupJoin(students, department => department.ID, student => student.DepartmentID,
    (department, studentGroup) => new
    {
        DepartmentName = department.Name,
        Students = studentGroup.OrderBy(student => student.LastName)
    })
    .OrderBy(department => department.DepartmentName);

foreach (var departmentList in orderedQuery)
{
    Console.WriteLine(departmentList.DepartmentName);
    foreach (var student in departmentList.Students)
    {
        Console.WriteLine($"  {student.LastName,-10} {student.FirstName,-10}");
    }
}
```
Although you can use an `orderby` clause with one or more of the source sequences before the join, we generally don't recommend it. Some LINQ providers might not preserve that ordering after the join. For more information, see join clause.

## See also

- `System.Linq.Enumerable`
- `System.Linq.Queryable`
- select clause
- Extension members
- Query Keywords (LINQ)
- Anonymous Types
