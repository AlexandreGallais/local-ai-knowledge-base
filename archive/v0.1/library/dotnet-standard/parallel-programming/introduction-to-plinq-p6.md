---
title: "Introduction to PLINQ (part 6 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/introduction-to-plinq.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Introduction to PLINQ (part 6 of 6)

## Custom Partitioners

In some cases, you can improve query performance by writing a custom partitioner that takes advantage of some characteristic of the source data. In the query, the custom partitioner itself is the enumerable object that is queried.

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

PLINQ supports a fixed number of partitions (although data may be dynamically reassigned to those partitions during runtime for load balancing.). `System.Threading.Tasks.Parallel.For*` and `System.Threading.Tasks.Parallel.ForEach*` support only dynamic partitioning, which means that the number of partitions changes at runtime. For more information, see Custom Partitioners for PLINQ and TPL.

## Measuring PLINQ Performance

In many cases, a query can be parallelized, but the overhead of setting up the parallel query outweighs the performance benefit gained. If a query does not perform much computation or if the data source is small, a PLINQ query may be slower than a sequential LINQ to Objects query. You can use the Parallel Performance Analyzer in Visual Studio Team Server to compare the performance of various queries, to locate processing bottlenecks, and to determine whether your query is running in parallel or sequentially. For more information, see Concurrency Visualizer and How to: Measure PLINQ Query Performance.

## See also

- Parallel LINQ (PLINQ)
- Understanding Speedup in PLINQ
