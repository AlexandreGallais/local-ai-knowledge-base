---
title: "Write LINQ queries (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/linq/get-started/write-linq-queries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Write LINQ queries (part 2 of 2)

## Handle null values in query expressions

This example shows how to handle possible null values in source collections. An object collection such as an `System.Collections.Generic.IEnumerable`1` can contain elements whose value is null. If a source collection is `null` or contains an element whose value is `null`, and your query doesn't handle `null` values, a `System.NullReferenceException` is thrown when you execute the query.

The following example uses these types and static data arrays:

```csharp
record Product(string Name, int CategoryID);
record Category(string Name, int ID);
```
```csharp
static Category?[] categories =
[
    new ("brass", 1),
    null,
    new ("winds", 2),
    default,
    new ("percussion", 3)
];

static Product?[] products =
[
    new Product("Trumpet", 1),
    new Product("Trombone", 1),
    new Product("French Horn", 1),
    null,
    new Product("Clarinet", 2),
    new Product("Flute", 2),
    null,
    new Product("Cymbal", 3),
    new Product("Drum", 3)
];
```
You can code defensively to avoid a null reference exception as shown in the following example:

```csharp
var query1 = from c in categories
             where c != null
             join p in products on c.ID equals p?.CategoryID
             select new
             {
                 Category = c.Name,
                 Name = p.Name
             };
```
In the previous example, the `where` clause filters out all null elements in the categories sequence. This technique is independent of the null check in the join clause. The conditional expression with null in this example works because `Products.CategoryID` is of type `int?`, which is shorthand for `Nullable<int>`.

In a join clause, if only one of the comparison keys is a nullable value type, you can cast the other to a nullable value type in the query expression. In the following example, assume that `EmployeeID` is a column that contains values of type `int?`:

```csharp
var query =
    from o in db.Orders
    join e in db.Employees
        on o.EmployeeID equals (int?)e.EmployeeID
    select new { o.OrderID, e.FirstName };
```

In each of the examples, the `equals` query keyword is used. You can also use pattern matching, which includes patterns for `is null` and `is not null`. These patterns aren't recommended in LINQ queries because query providers might not interpret the new C# syntax correctly. A query provider is a library that translates C# query expressions into a native data format, such as Entity Framework Core. Query providers implement the `System.Linq.IQueryProvider` interface to create data sources that implement the `System.Linq.IQueryable`1` interface.

## Handle exceptions in query expressions

You can call any method in the context of a query expression. Don't call any method in a query expression that can create a side effect such as modifying the contents of the data source or throwing an exception. This example shows how to avoid raising exceptions when you call methods in a query expression without violating the general .NET guidelines on exception handling. Those guidelines state that it's acceptable to catch a specific exception when you understand why it's thrown in a given context. For more information, see Best Practices for Exceptions.

The final example shows how to handle those cases when you must throw an exception during execution of a query.

The following example shows how to move exception handling code outside a query expression. You can only refactor this way when the method doesn't depend on any variables local to the query. It's easier to deal with exceptions outside of the query expression.

```csharp
// A data source that is very likely to throw an exception!
IEnumerable<int> GetData() => throw new InvalidOperationException();

// DO THIS with a datasource that might
// throw an exception.
IEnumerable<int>? dataSource = null;
try
{
    dataSource = GetData();
}
catch (InvalidOperationException)
{
    Console.WriteLine("Invalid operation");
}

if (dataSource is not null)
{
    // If we get here, it is safe to proceed.
    var query = from i in dataSource
                select i * i;

    foreach (var i in query)
    {
        Console.WriteLine(i.ToString());
    }
}
```
In the `catch (InvalidOperationException)` block in the preceding example, handle (or don't handle) the exception in the way that's appropriate for your application.

In some cases, the best response to an exception that's thrown from within a query might be to stop the query execution immediately. The following example shows how to handle exceptions that might be thrown from inside a query body. Assume that `SomeMethodThatMightThrow` can potentially cause an exception that requires the query execution to stop.

The `try` block encloses the `foreach` loop, and not the query itself. The `foreach` loop is the point at which the query is executed. Run-time exceptions are thrown when the query is executed. Therefore, handle them in the `foreach` loop.

```csharp
// Not very useful as a general purpose method.
string SomeMethodThatMightThrow(string s) =>
    s[4] == 'C' ?
        throw new InvalidOperationException() :
        $"""C:\newFolder\{s}""";

// Data source.
string[] files = ["fileA.txt", "fileB.txt", "fileC.txt"];

// Demonstration query that throws.
var exceptionDemoQuery = from file in files
                         let n = SomeMethodThatMightThrow(file)
                         select n;

try
{
    foreach (var item in exceptionDemoQuery)
    {
        Console.WriteLine($"Processing {item}");
    }
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}

/* Output:
    Processing C:\newFolder\fileA.txt
    Processing C:\newFolder\fileB.txt
    Operation is not valid due to the current state of the object.
 */
```
Catch whatever exception you expect to raise, and do any necessary cleanup in a `finally` block.

## See also

- where clause
- Querying based on runtime state
- `System.Nullable`1`
- Nullable value types
