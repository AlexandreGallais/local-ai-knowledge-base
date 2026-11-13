---
title: "Join Operations (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/linq/standard-query-operators/join-operations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Join Operations (part 2 of 3)

## Perform inner joins

In relational database terms, an *inner join* produces a result set in which each element of the first collection appears one time for every matching element in the second collection. If an element in the first collection has no matching elements, it doesn't appear in the result set. The `System.Linq.Enumerable.Join*` method, which the `join` clause in C# calls, implements an inner join. The following examples show you how to perform four variations of an inner join:

- A simple inner join that correlates elements from two data sources based on a simple key.
- An inner join that correlates elements from two data sources based on a *composite* key. A composite key, which is a key that consists of more than one value, enables you to correlate elements based on more than one property.
- A *multiple join* in which you append successive join operations to each other.
- An inner join that uses a group join.

### Single key join

The following example matches `Teacher` objects with `Department` objects whose `TeacherId` matches that `Teacher`. The `select` clause in C# defines how the resulting objects look. In the following example, the resulting objects are anonymous types that consist of the department name and the name of the teacher that leads the department.

```csharp
var query = from department in departments
            join teacher in teachers on department.TeacherID equals teacher.ID
            select new
            {
                DepartmentName = department.Name,
                TeacherName = $"{teacher.First} {teacher.Last}"
            };

foreach (var departmentAndTeacher in query)
{
    Console.WriteLine($"{departmentAndTeacher.DepartmentName} is managed by {departmentAndTeacher.TeacherName}");
}
```
You achieve the same results by using the `System.Linq.Enumerable.Join*` method syntax:

```csharp
var query = teachers
    .Join(departments, teacher => teacher.ID, department => department.TeacherID,
        (teacher, department) =>
        new { DepartmentName = department.Name, TeacherName = $"{teacher.First} {teacher.Last}" });

foreach (var departmentAndTeacher in query)
{
    Console.WriteLine($"{departmentAndTeacher.DepartmentName} is managed by {departmentAndTeacher.TeacherName}");
}
```
Teachers who aren't department heads don't appear in the final results.

### Composite key join

Instead of correlating elements based on just one property, use a composite key to compare elements based on multiple properties. Specify the key selector function for each collection to return an anonymous type that consists of the properties you want to compare. If you label the properties, they must have the same label in each key's anonymous type. The properties must also appear in the same order.

The following example uses a list of `Teacher` objects and a list of `Student` objects to determine which teachers are also students. Both of these types have properties that represent the first and family name of each person. The functions that create the join keys from each list's elements return an anonymous type that consists of the properties. The join operation compares these composite keys for equality and returns pairs of objects from each list where both the first name and the family name match.

```csharp
// Join the two data sources based on a composite key consisting of first and last name,
// to determine which employees are also students.
IEnumerable<string> query =
    from teacher in teachers
    join student in students on new
    {
        FirstName = teacher.First,
        LastName = teacher.Last
    } equals new
    {
        student.FirstName,
        student.LastName
    }
    select teacher.First + " " + teacher.Last;

string result = "The following people are both teachers and students:\r\n";
foreach (string name in query)
{
    result += $"{name}\r\n";
}
Console.Write(result);
```
You can use the `System.Linq.Enumerable.Join*` method, as shown in the following example:

```csharp
IEnumerable<string> query = teachers
    .Join(students,
        teacher => new { FirstName = teacher.First, LastName = teacher.Last },
        student => new { student.FirstName, student.LastName },
        (teacher, student) => $"{teacher.First} {teacher.Last}"
 );

Console.WriteLine("The following people are both teachers and students:");
foreach (string name in query)
{
    Console.WriteLine(name);
}
```
### Multiple join

You can append any number of join operations to perform a multiple join. Each `join` clause in C# correlates a specified data source with the results of the previous join.

The first `join` clause matches students and departments based on a `Student` object's `DepartmentID` matching a `Department` object's `ID`. It returns a sequence of anonymous types that contain the `Student` object and `Department` object.

The second `join` clause correlates the anonymous types returned by the first join with `Teacher` objects based on that teacher's ID matching the department head ID. It returns a sequence of anonymous types that contain the student's name, the department name, and the department leader's name. Because this operation is an inner join, the query returns only those objects from the first data source that have a match in the second data source.

```csharp
// The first join matches Department.ID and Student.DepartmentID from the list of students and
// departments, based on a common ID. The second join matches teachers who lead departments
// with the students studying in that department.
var query = from student in students
    join department in departments on student.DepartmentID equals department.ID
    join teacher in teachers on department.TeacherID equals teacher.ID
    select new {
        StudentName = $"{student.FirstName} {student.LastName}",
        DepartmentName = department.Name,
        TeacherName = $"{teacher.First} {teacher.Last}"
    };

foreach (var obj in query)
{
    Console.WriteLine($"""The student "{obj.StudentName}" studies in the department run by "{obj.TeacherName}".""");
}
```
The equivalent query that uses multiple `System.Linq.Enumerable.Join*` methods uses the same approach with the anonymous type:

```csharp
var query = students
    .Join(departments, student => student.DepartmentID, department => department.ID,
        (student, department) => new { student, department })
    .Join(teachers, commonDepartment => commonDepartment.department.TeacherID, teacher => teacher.ID,
        (commonDepartment, teacher) => new
        {
            StudentName = $"{commonDepartment.student.FirstName} {commonDepartment.student.LastName}",
            DepartmentName = commonDepartment.department.Name,
            TeacherName = $"{teacher.First} {teacher.Last}"
        });

foreach (var obj in query)
{
    Console.WriteLine($"""The student "{obj.StudentName}" studies in the department run by "{obj.TeacherName}".""");
}
```
### Inner join by using grouped join

The following example shows how to implement an inner join by using a group join. The list of `Department` objects is group-joined to the list of `Student` objects based on the `Department.ID` matching the `Student.DepartmentID` property. The group join creates a collection of intermediate groups, where each group consists of a `Department` object and a sequence of matching `Student` objects. The second `from` clause combines (or flattens) this sequence of sequences into one longer sequence. The `select` clause specifies the type of elements in the final sequence. That type is an anonymous type that consists of the student's name and the matching department name.

```csharp
var query1 =
    from department in departments
    join student in students on department.ID equals student.DepartmentID into gj
    from subStudent in gj
    select new
    {
        DepartmentName = department.Name,
        StudentName = $"{subStudent.FirstName} {subStudent.LastName}"
    };
Console.WriteLine("Inner join using GroupJoin():");
foreach (var v in query1)
{
    Console.WriteLine($"{v.DepartmentName} - {v.StudentName}");
}
```
You can achieve the same results by using the `System.Linq.Enumerable.GroupJoin*` method, as shown in the following example:

```csharp
var queryMethod1 = departments
    .GroupJoin(students, department => department.ID, student => student.DepartmentID,
        (department, gj) => new { department, gj })
    .SelectMany(departmentAndStudent => departmentAndStudent.gj,
        (departmentAndStudent, subStudent) => new
        {
            DepartmentName = departmentAndStudent.department.Name,
            StudentName = $"{subStudent.FirstName} {subStudent.LastName}"
        });

Console.WriteLine("Inner join using GroupJoin():");
foreach (var v in queryMethod1)
{
    Console.WriteLine($"{v.DepartmentName} - {v.StudentName}");
}
```
The result is equivalent to the result set obtained by using the `join` clause without the `into` clause to perform an inner join. The following code demonstrates this equivalent query:

```csharp
var query2 = from department in departments
    join student in students on department.ID equals student.DepartmentID
    select new
    {
        DepartmentName = department.Name,
        StudentName = $"{student.FirstName} {student.LastName}"
    };

Console.WriteLine("The equivalent operation using Join():");
foreach (var v in query2)
{
    Console.WriteLine($"{v.DepartmentName} - {v.StudentName}");
}
```
To avoid chaining, use the single `System.Linq.Enumerable.Join*` method as presented here:

```csharp
var queryMethod2 = departments.Join(students, departments => departments.ID, student => student.DepartmentID,
    (department, student) => new
    {
        DepartmentName = department.Name,
        StudentName = $"{student.FirstName} {student.LastName}"
    });

Console.WriteLine("The equivalent operation using Join():");
foreach (var v in queryMethod2)
{
    Console.WriteLine($"{v.DepartmentName} - {v.StudentName}");
}
```
## Perform grouped joins

The group join is useful for producing hierarchical data structures. It pairs each element from the first collection with a set of correlated elements from the second collection.

> **Note:**
> Each element of the first collection appears in the result set of a group join regardless of whether correlated elements are found in the second collection. If no correlated elements are found, the sequence of correlated elements for that element is empty. The result selector therefore has access to every element of the first collection. This behavior differs from the result selector in a non-group join, which can't access elements from the first collection that have no match in the second collection.

> **Warning:**
> `System.Linq.Enumerable.GroupJoin*` has no direct equivalent in traditional relational database terms. However, this method does implement a superset of inner joins and left outer joins. Both of these operations can be written in terms of a grouped join. For more information, see Entity Framework Core, GroupJoin.

The first example in this article shows how to perform a group join. The second example shows how to use a group join to create XML elements.

### Group join

The following example performs a group join of objects of type `Department` and `Student` based on the `Department.ID` matching the `Student.DepartmentID` property. Unlike a non-group join, which produces a pair of elements for each match, the group join produces only one resulting object for each element of the first collection. In this example, the first collection is a `Department` object. The corresponding elements from the second collection, which in this example are `Student` objects, are grouped into a collection. Finally, the result selector function creates an anonymous type for each match that consists of `Department.Name` and a collection of `Student` objects.

```csharp
var query = from department in departments
    join student in students on department.ID equals student.DepartmentID into studentGroup
    select new
    {
        DepartmentName = department.Name,
        Students = studentGroup
    };

foreach (var v in query)
{
    // Output the department's name.
    Console.WriteLine($"{v.DepartmentName}:");

    // Output each of the students in that department.
    foreach (Student? student in v.Students)
    {
        Console.WriteLine($"  {student.FirstName} {student.LastName}");
    }
}
```
In the preceding example, the `query` variable contains the query that creates a list where each element is an anonymous type that contains the department's name and a collection of students that study in that department.

The equivalent query using method syntax is shown in the following code:

```csharp
var query = departments.GroupJoin(students, department => department.ID, student => student.DepartmentID,
    (department, Students) => new { DepartmentName = department.Name, Students });

foreach (var v in query)
{
    // Output the department's name.
    Console.WriteLine($"{v.DepartmentName}:");

    // Output each of the students in that department.
    foreach (Student? student in v.Students)
    {
        Console.WriteLine($"  {student.FirstName} {student.LastName}");
    }
}
```
### Group join to create XML

Group joins are ideal for creating XML by using LINQ to XML. The following example is similar to the previous example except that instead of creating anonymous types, the result selector function creates XML elements that represent the joined objects.

```csharp
XElement departmentsAndStudents = new("DepartmentEnrollment",
    from department in departments
    join student in students on department.ID equals student.DepartmentID into studentGroup
    select new XElement("Department",
        new XAttribute("Name", department.Name),
        from student in studentGroup
        select new XElement("Student",
            new XAttribute("FirstName", student.FirstName),
            new XAttribute("LastName", student.LastName)
        )
    )
);

Console.WriteLine(departmentsAndStudents);
```
The equivalent query using method syntax is shown in the following code:

```csharp
XElement departmentsAndStudents = new("DepartmentEnrollment",
    departments.GroupJoin(students, department => department.ID, student => student.DepartmentID,
        (department, Students) => new XElement("Department",
            new XAttribute("Name", department.Name),
            from student in Students
            select new XElement("Student",
                new XAttribute("FirstName", student.FirstName),
                new XAttribute("LastName", student.LastName)
            )
        )
    )
);

Console.WriteLine(departmentsAndStudents);
```
