---
title: "where clause"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/where-clause.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# where clause (C# Reference)

Use the `where` clause in a query expression to specify which elements from the data source to return. It applies a Boolean condition (*predicate*) to each source element (referenced by the range variable) and returns those elements for which the specified condition is true. A single query expression can contain multiple `where` clauses, and a single clause can contain multiple predicate subexpressions.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

In the following example, the `where` clause filters out all numbers except those that are less than five. If you remove the `where` clause, the query returns all numbers from the data source. The expression `num < 5` is the predicate that the query applies to each element.

```csharp
﻿namespace Where;

class WhereSample
{
    static void Main()
    {
        // Simple data source. Arrays support IEnumerable<T>.
        int[] numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];

        // Simple query with one predicate in where clause.
        var queryLowNums =
            from num in numbers
            where num < 5
            select num;

        // Execute the query.
        foreach (var s in queryLowNums)
        {
            Console.Write(s.ToString() + " ");
        }
    }
}
//Output: 4 1 3 2 0

class WhereSample2
{
static void Main()
{
    // Data source.
    int[] numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];

    // Create the query with two predicates in where clause.
    var queryLowNums2 =
        from num in numbers
        where num < 5 && num % 2 == 0
        select num;

    // Execute the query
    foreach (var s in queryLowNums2)
    {
        Console.Write(s.ToString() + " ");
    }
    Console.WriteLine();

    // Create the query with two where clause.
    var queryLowNums3 =
        from num in numbers
        where num < 5
        where num % 2 == 0
        select num;

    // Execute the query
    foreach (var s in queryLowNums3)
    {
        Console.Write(s.ToString() + " ");
    }
}
}
// Output:
// 4 2 0
// 4 2 0

class WhereSample3
{
    static void Main()
    {
        // Data source
        int[] numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];

        // Create the query with a method call in the where clause.
        // Note: This won't work in LINQ to SQL unless you have a
        // stored procedure that is mapped to a method by this name.
        var queryEvenNums =
            from num in numbers
            where IsEven(num)
            select num;

         // Execute the query.
        foreach (var s in queryEvenNums)
        {
            Console.Write(s.ToString() + " ");
        }
    }

    // Method may be instance method or static method.
    static bool IsEven(int i) => i % 2 == 0;
}
//Output: 4 8 6 2 0
```
Within a single `where` clause, you can specify as many predicates as necessary by using the && and &#124;&#124; operators. In the following example, the query specifies two predicates in order to select only the even numbers that are less than five.

```csharp
﻿namespace Where;

class WhereSample
{
    static void Main()
    {
        // Simple data source. Arrays support IEnumerable<T>.
        int[] numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];

        // Simple query with one predicate in where clause.
        var queryLowNums =
            from num in numbers
            where num < 5
            select num;

        // Execute the query.
        foreach (var s in queryLowNums)
        {
            Console.Write(s.ToString() + " ");
        }
    }
}
//Output: 4 1 3 2 0

class WhereSample2
{
static void Main()
{
    // Data source.
    int[] numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];

    // Create the query with two predicates in where clause.
    var queryLowNums2 =
        from num in numbers
        where num < 5 && num % 2 == 0
        select num;

    // Execute the query
    foreach (var s in queryLowNums2)
    {
        Console.Write(s.ToString() + " ");
    }
    Console.WriteLine();

    // Create the query with two where clause.
    var queryLowNums3 =
        from num in numbers
        where num < 5
        where num % 2 == 0
        select num;

    // Execute the query
    foreach (var s in queryLowNums3)
    {
        Console.Write(s.ToString() + " ");
    }
}
}
// Output:
// 4 2 0
// 4 2 0

class WhereSample3
{
    static void Main()
    {
        // Data source
        int[] numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];

        // Create the query with a method call in the where clause.
        // Note: This won't work in LINQ to SQL unless you have a
        // stored procedure that is mapped to a method by this name.
        var queryEvenNums =
            from num in numbers
            where IsEven(num)
            select num;

         // Execute the query.
        foreach (var s in queryEvenNums)
        {
            Console.Write(s.ToString() + " ");
        }
    }

    // Method may be instance method or static method.
    static bool IsEven(int i) => i % 2 == 0;
}
//Output: 4 8 6 2 0
```
A `where` clause can contain one or more methods that return Boolean values. In the following example, the `where` clause uses a method to determine whether the current value of the range variable is even or odd.

```csharp
﻿namespace Where;

class WhereSample
{
    static void Main()
    {
        // Simple data source. Arrays support IEnumerable<T>.
        int[] numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];

        // Simple query with one predicate in where clause.
        var queryLowNums =
            from num in numbers
            where num < 5
            select num;

        // Execute the query.
        foreach (var s in queryLowNums)
        {
            Console.Write(s.ToString() + " ");
        }
    }
}
//Output: 4 1 3 2 0

class WhereSample2
{
static void Main()
{
    // Data source.
    int[] numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];

    // Create the query with two predicates in where clause.
    var queryLowNums2 =
        from num in numbers
        where num < 5 && num % 2 == 0
        select num;

    // Execute the query
    foreach (var s in queryLowNums2)
    {
        Console.Write(s.ToString() + " ");
    }
    Console.WriteLine();

    // Create the query with two where clause.
    var queryLowNums3 =
        from num in numbers
        where num < 5
        where num % 2 == 0
        select num;

    // Execute the query
    foreach (var s in queryLowNums3)
    {
        Console.Write(s.ToString() + " ");
    }
}
}
// Output:
// 4 2 0
// 4 2 0

class WhereSample3
{
    static void Main()
    {
        // Data source
        int[] numbers = [5, 4, 1, 3, 9, 8, 6, 7, 2, 0];

        // Create the query with a method call in the where clause.
        // Note: This won't work in LINQ to SQL unless you have a
        // stored procedure that is mapped to a method by this name.
        var queryEvenNums =
            from num in numbers
            where IsEven(num)
            select num;

         // Execute the query.
        foreach (var s in queryEvenNums)
        {
            Console.Write(s.ToString() + " ");
        }
    }

    // Method may be instance method or static method.
    static bool IsEven(int i) => i % 2 == 0;
}
//Output: 4 8 6 2 0
```
## Remarks

The `where` clause is a filtering mechanism. You can position it almost anywhere in a query expression, except it can't be the first or last clause. A `where` clause can appear either before or after a group clause depending on whether you need to filter the source elements before or after they are grouped.

If you specify a predicate that's not valid for the elements in the data source, the query results in a compile-time error. This error is one benefit of the strong type-checking that LINQ provides.

At compile time, the `where` keyword is converted into a call to the `System.Linq.Enumerable.Where*` Standard Query Operator method.

## See also

- Query Keywords (LINQ)
- from clause
- select clause
- Filtering Data
- LINQ in C#
