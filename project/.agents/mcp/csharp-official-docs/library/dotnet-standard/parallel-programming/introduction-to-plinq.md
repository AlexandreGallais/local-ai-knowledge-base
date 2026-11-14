---
title: "Introduction to PLINQ (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/introduction-to-plinq.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Introduction to PLINQ

Parallel LINQ (PLINQ) is a parallel implementation of the Language-Integrated Query (LINQ) pattern. PLINQ implements the full set of LINQ standard query operators as extension methods for the `System.Linq` namespace and has additional operators for parallel operations. PLINQ combines the simplicity and readability of LINQ syntax with the power of parallel programming.

> **Tip:**
> If you're not familiar with LINQ, it features a unified model for querying any enumerable data source in a type-safe manner. LINQ to Objects is the name for LINQ queries that are run against in-memory collections such as `System.Collections.Generic.List`1` and arrays. This article assumes that you have a basic <example-value> of LINQ. For more information, see Language-Integrated Query (LINQ).

## What is a Parallel query?

A PLINQ query in many ways resembles a non-parallel LINQ to Objects query. PLINQ queries, just like sequential LINQ queries, operate on any in-memory `System.Collections.IEnumerable` or `System.Collections.Generic.IEnumerable`1` data source, and have deferred execution, which means they do not begin executing until the query is enumerated. The primary difference is that PLINQ attempts to make full use of all the processors on the system. It does this by partitioning the data source into segments, and then executing the query on each segment on separate worker threads in parallel on multiple processors. In many cases, parallel execution means that the query runs significantly faster.

Through parallel execution, PLINQ can achieve significant performance improvements over legacy code for certain kinds of queries, often just by adding the `System.Linq.ParallelEnumerable.AsParallel*` query operation to the data source. However, parallelism can introduce its own complexities, and not all query operations run faster in PLINQ. In fact, parallelization actually slows down certain queries. Therefore, you should understand how issues such as ordering affect parallel queries. For more information, see Understanding Speedup in PLINQ.

> **Note:**
> This documentation uses lambda expressions to define delegates in PLINQ. If you are not familiar with lambda expressions in C# or Visual Basic, see Lambda Expressions in PLINQ and TPL.

The remainder of this article gives an overview of the main PLINQ classes and discusses how to create PLINQ queries. Each section contains links to more detailed information and code examples.

## The ParallelEnumerable Class

The `System.Linq.ParallelEnumerable` class exposes almost all of PLINQ's functionality. It and the rest of the `System.Linq` namespace types are compiled into the System.Core.dll assembly. The default C# and Visual Basic <example-value> in Visual Studio both reference the assembly and import the namespace.

`System.Linq.ParallelEnumerable` includes implementations of all the standard query operators that LINQ to Objects supports, although it does not attempt to parallelize each one. If you are not familiar with LINQ, see Introduction to LINQ (C#) and Introduction to LINQ (Visual Basic).

In addition to the standard query operators, the `System.Linq.ParallelEnumerable` class contains a set of methods that enable behaviors specific to parallel execution. These PLINQ-specific methods are listed in the following table.

|ParallelEnumerable Operator|Description|
|---------------------------------|-----------------|
|`System.Linq.ParallelEnumerable.AsParallel*`|The entry point for PLINQ. Specifies that the rest of the query should be parallelized, if it is possible.|
|`System.Linq.ParallelEnumerable.AsSequential*`|Specifies that the rest of the query should be run sequentially, as a non-parallel LINQ query.|
|`System.Linq.ParallelEnumerable.AsOrdered*`|Specifies that PLINQ should preserve the ordering of the source sequence for the rest of the query, or until the ordering is changed, for example by the use of an orderby (Order By in Visual Basic) clause.|
|`System.Linq.ParallelEnumerable.AsUnordered*`|Specifies that PLINQ for the rest of the query is not required to preserve the ordering of the source sequence.|
|`System.Linq.ParallelEnumerable.WithCancellation*`|Specifies that PLINQ should periodically monitor the state of the provided cancellation token and cancel execution if it is requested.|
|`System.Linq.ParallelEnumerable.WithDegreeOfParallelism*`|Specifies the maximum number of processors that PLINQ should use to parallelize the query.|
|`System.Linq.ParallelEnumerable.WithMergeOptions*`|Provides a hint about how PLINQ should, if it is possible, merge parallel results back into just one sequence on the consuming thread.|
|`System.Linq.ParallelEnumerable.WithExecutionMode*`|Specifies whether PLINQ should parallelize the query even when the default behavior would be to run it sequentially.|
|`System.Linq.ParallelEnumerable.ForAll*`|A multithreaded enumeration method that, unlike iterating over the results of the query, enables results to be processed in parallel without first merging back to the consumer thread.|
|`System.Linq.ParallelEnumerable.Aggregate*` overload|An overload that is unique to PLINQ and enables intermediate aggregation over thread-local partitions, plus a final aggregation function to combine the results of all partitions.|

## The Opt-in Model

When you write a query, opt in to PLINQ by invoking the `System.Linq.ParallelEnumerable.AsParallel*` extension method on the data source, as shown in the following example.

```csharp
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

class Example
{
    public static void Main()
    {
        IntroTopic_OptInModel();
        IntroTopic_OptIntoOrdering();
        ForAllOperator();
        CustomPartitioners();
    }

    static void IntroTopic_OptInModel()
    {
        var source = Enumerable.Range(1, 10000);

        // Opt in to PLINQ with AsParallel.
        var evenNums = from num in source.AsParallel()
                       where num % 2 == 0
                       select num;
        Console.WriteLine($"{evenNums.Count()} even numbers out of {source.Count()} total");
        // The example displays the following output:
        //       5000 even numbers out of 10000 total
    }

    static int Compute(int i)
    {
        return 1;
    }

    static void IntroTopic_OptIntoOrdering()
    {
        var numbers = Enumerable.Range(0, 1000);
        var evenNums =
            from num in numbers.AsParallel().AsOrdered()
            where num % 2 == 0
            select num;
    }

    static void ForAllOperator()
    {
        var concurrentBag = new ConcurrentBag<int>();

        var nums = Enumerable.Range(10, 10000);
        var query =
            from num in nums.AsParallel()
            where num % 10 == 0
            select num;

        // Process the results as each thread completes
        // and add them to a System.Collections.Concurrent.ConcurrentBag(Of Int)
        // which can safely accept concurrent add operations
        query.ForAll(e => concurrentBag.Add(Compute(e)));
    }

    static void CustomPartitioners()
    {
        int[] arr = new int[9999];
        Partitioner<int> partitioner = new MyArrayPartitioner<int>(arr);
        var query = partitioner.AsParallel().Select(SomeFunction);
    }

    public static int SomeFunction(int x)
    {
        return x * x;
    }
}

class MyArrayPartitioner<T> : Partitioner<T>
{
    private readonly List<T> _list = new();

    public MyArrayPartitioner(T[] arr)
    {
        foreach (var element in arr)
        {
            _list.Add(element);
        }
    }

    public override IList<IEnumerator<T>> GetPartitions(int partitionCount)
    {
        List<IEnumerator<T>> enumList = new();
        enumList.Add(_list.GetEnumerator());
        return enumList;
    }
}
```

The `System.Linq.ParallelEnumerable.AsParallel*` extension method binds the subsequent query operators, in this case, `where` and `select`, to the `System.Linq.ParallelEnumerable` implementations.

## Execution Modes

By default, PLINQ is conservative. At runtime, the PLINQ infrastructure analyzes the overall structure of the query. If the query is likely to yield speedups by parallelization, PLINQ partitions the source sequence into tasks that can be run concurrently. If it is not safe to parallelize a query, PLINQ just runs the query sequentially. If PLINQ has a choice between a potentially expensive parallel algorithm or an inexpensive sequential algorithm, it chooses the sequential algorithm by default. You can use the `System.Linq.ParallelEnumerable.WithExecutionMode*` method and the `System.Linq.ParallelExecutionMode` enumeration to instruct PLINQ to select the parallel algorithm. This is useful when you know by testing and measurement that a particular query executes faster in parallel. For more information, see How to: Specify the Execution Mode in PLINQ.
