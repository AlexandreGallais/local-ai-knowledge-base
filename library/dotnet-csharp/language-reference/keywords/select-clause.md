---
title: "select clause (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/select-clause.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# select clause (C# Reference)

In a query expression, the `select` clause specifies the type of values that the query produces when it runs. The result comes from evaluating all the previous clauses and any expressions in the `select` clause itself. A query expression must end with either a `select` clause or a group clause.

The following example shows a simple `select` clause in a query expression.

```csharp
namespace SelectClause;

class SelectSample1
{
    static void Main()
    {
        //Create the data source
        List<int> Scores = [97, 92, 81, 60];

        // Create the query.
        IEnumerable<int> queryHighScores =
            from score in Scores
            where score > 80
            select score;

        // Execute the query.
        foreach (int i in queryHighScores)
        {
            Console.Write(i + " ");
        }
    }
}
//Output: 97 92 81

class SelectSample2
{
    // Define some classes
    public class Student
    {
        public required string First { get; init; }
        public required string Last { get; init; }
        public required int ID { get; init; }
        public required List<int> Scores;
        public ContactInfo? GetContactInfo(SelectSample2 app, int id)
        {
            ContactInfo? cInfo =
                (from ci in app.contactList
                where ci.ID == id
                select ci)
                .FirstOrDefault();

            return cInfo;
        }

        public override string ToString() => $"{First} {Last}:{ID}";
    }

    public class ContactInfo
    {
        public required int ID { get; init; }
        public required string Email { get; init; }
        public required string Phone { get; init; }
        public override string ToString() => $"{Email},{Phone}";
    }

    public class ScoreInfo
    {
        public double Average { get; init; }
        public int ID { get; init; }
    }

    // The primary data source
    List<Student> students =
    [
         new Student {First="Svetlana", Last="Omelchenko", ID=111, Scores= new List<int>() {97, 92, 81, 60}},
         new Student {First="Claire", Last="O'Donnell", ID=112, Scores= new List<int>() {75, 84, 91, 39}},
         new Student {First="Sven", Last="Mortensen", ID=113, Scores= new List<int>() {88, 94, 65, 91}},
         new Student {First="Cesar", Last="Garcia", ID=114, Scores= new List<int>() {97, 89, 85, 82}},
    ];

    // Separate data source for contact info.
    List<ContactInfo> contactList =
    [
        new ContactInfo {ID=111, Email="user@example.com", Phone="206-555-0108"},
        new ContactInfo {ID=112, Email="user@example.com", Phone="206-555-0298"},
        new ContactInfo {ID=113, Email="user@example.com", Phone="206-555-1130"},
        new ContactInfo {ID=114, Email="user@example.com", Phone="206-555-0521"}
    ];

    static void Main(string[] args)
    {
        SelectSample2 app = new SelectSample2();

        // Produce a filtered sequence of unmodified Students.
        IEnumerable<Student> studentQuery1 =
            from student in app.students
            where student.ID > 111
            select student;

        Console.WriteLine("Query1: select range_variable");
        foreach (Student s in studentQuery1)
        {
            Console.WriteLine(s.ToString());
        }

        // Produce a filtered sequence of elements that contain
        // only one property of each Student.
        IEnumerable<String> studentQuery2 =
            from student in app.students
            where student.ID > 111
            select student.Last;

        Console.WriteLine("\r\n studentQuery2: select range_variable.Property");
        foreach (string s in studentQuery2)
        {
            Console.WriteLine(s);
        }

        // Produce a filtered sequence of objects created by
        // a method call on each Student.
        IEnumerable<ContactInfo> studentQuery3 =
            from student in app.students
            where student.ID > 111
            select student.GetContactInfo(app, student.ID);

        Console.WriteLine("\r\n studentQuery3: select range_variable.Method");
        foreach (ContactInfo ci in studentQuery3)
        {
            Console.WriteLine(ci.ToString());
        }

        // Produce a filtered sequence of ints from
        // the internal array inside each Student.
        IEnumerable<int> studentQuery4 =
            from student in app.students
            where student.ID > 111
            select student.Scores[0];

        Console.WriteLine("\r\n studentQuery4: select range_variable[index]");
        foreach (int i in studentQuery4)
        {
            Console.WriteLine($"First score = {i}");
        }

        // Produce a filtered sequence of doubles
        // that are the result of an expression.
        IEnumerable<double> studentQuery5 =
            from student in app.students
            where student.ID > 111
            select student.Scores[0] * 1.1;

        Console.WriteLine("\r\n studentQuery5: select expression");
        foreach (double d in studentQuery5)
        {
            Console.WriteLine($"Adjusted first score = {d}");
        }

        // Produce a filtered sequence of doubles that are
        // the result of a method call.
        IEnumerable<double> studentQuery6 =
            from student in app.students
            where student.ID > 111
            select student.Scores.Average();

        Console.WriteLine("\r\n studentQuery6: select expression2");
        foreach (double d in studentQuery6)
        {
            Console.WriteLine($"Average = {d}");
        }

        // Produce a filtered sequence of anonymous types
        // that contain only two properties from each Student.
        var studentQuery7 =
            from student in app.students
            where student.ID > 111
            select new { student.First, student.Last };

        Console.WriteLine("\r\n studentQuery7: select new anonymous type");
        foreach (var item in studentQuery7)
        {
            Console.WriteLine("{0}, {1}", item.Last, item.First);
        }

        // Produce a filtered sequence of named objects that contain
        // a method return value and a property from each Student.
        // Use named types if you need to pass the query variable
        // across a method boundary.
        IEnumerable<ScoreInfo> studentQuery8 =
            from student in app.students
            where student.ID > 111
            select new ScoreInfo
            {
                Average = student.Scores.Average(),
                ID = student.ID
            };

        Console.WriteLine("\r\n studentQuery8: select new named type");
        foreach (ScoreInfo si in studentQuery8)
        {
            Console.WriteLine("ID = {0}, Average = {1}", si.ID, si.Average);
        }

        // Produce a filtered sequence of students who appear on a contact list
        // and whose average is greater than 85.
        IEnumerable<ContactInfo> studentQuery9 =
            from student in app.students
            where student.Scores.Average() > 85
            join ci in app.contactList on student.ID equals ci.ID
            select ci;

        Console.WriteLine("\r\n studentQuery9: select result of join clause");
        foreach (ContactInfo ci in studentQuery9)
        {
            Console.WriteLine("ID = {0}, Email = {1}", ci.ID, ci.Email);
        }
    }
}
/* Output
    Query1: select range_variable
    Claire O'Donnell:112
    Sven Mortensen:113
    Cesar Garcia:114

    studentQuery2: select range_variable.Property
    O'Donnell
    Mortensen
    Garcia

    studentQuery3: select range_variable.Method
    user@example.com,206-555-0298
    user@example.com,206-555-1130
    user@example.com,206-555-0521

    studentQuery4: select range_variable[index]
    First score = 75
    First score = 88
    First score = 97

    studentQuery5: select expression
    Adjusted first score = 82.5
    Adjusted first score = 96.8
    Adjusted first score = 106.7

    studentQuery6: select expression2
    Average = 72.25
    Average = 84.5
    Average = 88.25

    studentQuery7: select new anonymous type
    O'Donnell, Claire
    Mortensen, Sven
    Garcia, Cesar

    studentQuery8: select new named type
    ID = 112, Average = 72.25
    ID = 113, Average = 84.5
    ID = 114, Average = 88.25

    studentQuery9: select result of join clause
    ID = 114, Email = user@example.com
*/
//class SelectClause
```
The type of the sequence that the `select` clause produces determines the type of the query variable `queryHighScores`. In the simplest case, the `select` clause just specifies the range variable. This approach makes the returned sequence contain elements of the same type as the data source. For more information, see Type Relationships in LINQ Query Operations. However, the `select` clause also provides a powerful mechanism for transforming (or *projecting*) source data into new types. For more information, see Data Transformations with LINQ (C#).

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following example shows all the different forms that a `select` clause can take. In each query, note the relationship between the `select` clause and the type of the *query variable* (`studentQuery1`, `studentQuery2`, and so on).
