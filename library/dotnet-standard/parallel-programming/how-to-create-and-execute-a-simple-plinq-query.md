---
title: "How to: Create and Execute a Simple PLINQ Query"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-create-and-execute-a-simple-plinq-query.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Create and Execute a Simple PLINQ Query

The example in this article shows how to create a simple Parallel Language Integrated Query (LINQ) query by using the `System.Linq.ParallelEnumerable.AsParallel*` extension method on the source sequence and executing the query by using the `System.Linq.ParallelEnumerable.ForAll*` method.

> **Note:**
> This documentation uses lambda expressions to define delegates in PLINQ. If you are not familiar with lambda expressions in C# or Visual Basic, see Lambda Expressions in PLINQ and TPL.

## Example

 ```csharp
using System;
using System.Linq;

class ExampleForAll
{
    public static void Main()
    {
        var source = Enumerable.Range(100, 20000);

        // Result sequence might be out of order.
        var parallelQuery =
            from num in source.AsParallel()
            where num % 10 == 0
            select num;

        // Process result sequence in parallel
        parallelQuery.ForAll((e) => DoSomething(e));

        // Or use foreach to merge results first.
        foreach (var n in parallelQuery)
        {
            Console.WriteLine(n);
        }

        // You can also use ToArray, ToList, etc as with LINQ to Objects.
        var parallelQuery2 =
            (from num in source.AsParallel()
             where num % 10 == 0
             select num).ToArray();

        // Method syntax is also supported
        var parallelQuery3 =
            source.AsParallel()
                .Where(n => n % 10 == 0)
                .Select(n => n);

        Console.WriteLine("\nPress any key to exit...");
        Console.ReadLine();
    }

    static void DoSomething(int _) { }
}
```

 This example demonstrates the basic <example-value> for creating and executing any Parallel LINQ query when the ordering of the result sequence is not important. Unordered queries are generally faster than ordered queries. The query partitions the source into tasks that are executed asynchronously on multiple threads. The order in which each task completes depends not only on the amount of work involved to process the elements in the partition, but also on external factors such as how the operating system schedules each thread. This example is intended to demonstrate usage, and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see Understanding Speedup in PLINQ. For more information about how to preserve the ordering of elements in a query, see How to: Control Ordering in a PLINQ Query.

## See also

- Parallel LINQ (PLINQ)
