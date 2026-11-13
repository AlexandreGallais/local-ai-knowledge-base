---
title: "Introduction to PLINQ (part 5 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/introduction-to-plinq.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Introduction to PLINQ (part 5 of 6)

```csharp
                        Console.WriteLine("The data source is corrupt. Query stopped.");
                }
            }
        }

        // Paste into PLINQDataSample class.
        static void PLINQExceptions_2()
        {
            var customers = GetCustomersAsStrings().ToArray();
            // Using the raw string array here.
            // First, we must simulate some corrupt input
            customers[54] = "###";

            // Assume that in this app, we expect malformed data
            // occasionally and by design we just report it and continue.
            static bool IsTrue(string[] f, string c)
            {
                try
                {
                    string s = f[3];
                    return s.StartsWith(c);
                }
                catch (IndexOutOfRangeException)
                {
                    Console.WriteLine($"Malformed cust: {f}");
                    return false;
                }
            };

            // Using the raw string array here
            var parallelQuery =
                from cust in customers.AsParallel()
                let fields = cust.Split(',')
                where IsTrue(fields, "C") //use a named delegate with a try-catch
                select new { City = fields[3] };

            try
            {
                // We use ForAll although it doesn't really improve performance
                // since all output must be serialized through the Console.
                parallelQuery.ForAll(e => Console.WriteLine(e.City));
            }

            // IndexOutOfRangeException will not bubble up
            // because we handle it where it is thrown.
            catch (AggregateException e)
            {
                foreach (var ex in e.InnerExceptions)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
    }
}
```

In cases where a query is performing a significant amount of non-compute-bound work such as File I/O, it might be beneficial to specify a degree of parallelism greater than the number of cores on the machine.

## Ordered Versus Unordered Parallel Queries

In some queries, a query operator must produce results that preserve the ordering of the source sequence. PLINQ provides the `System.Linq.ParallelEnumerable.AsOrdered*` operator for this purpose. `System.Linq.ParallelEnumerable.AsOrdered*` is distinct from `System.Linq.ParallelEnumerable.AsSequential*`. An `System.Linq.ParallelEnumerable.AsOrdered*` sequence is still processed in parallel, but its results are buffered and sorted. Because order preservation typically involves extra work, an `System.Linq.ParallelEnumerable.AsOrdered*` sequence might be processed more slowly than the default `System.Linq.ParallelEnumerable.AsUnordered*` sequence. Whether a particular ordered parallel operation is faster than a sequential version of the operation depends on many factors.

The following code example shows how to opt in to order preservation.

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

For more information, see Order Preservation in PLINQ.

## Parallel vs. Sequential Queries

Some operations require that the source data be delivered in a sequential manner. The `System.Linq.ParallelEnumerable` query operators revert to sequential mode automatically when it is required. For user-defined query operators and user delegates that require sequential execution, PLINQ provides the `System.Linq.ParallelEnumerable.AsSequential*` method. When you use `System.Linq.ParallelEnumerable.AsSequential*`, all subsequent operators in the query are executed sequentially until `System.Linq.ParallelEnumerable.AsParallel*` is called again. For more information, see How to: Combine Parallel and Sequential LINQ Queries.

## Options for Merging Query Results

When a PLINQ query executes in parallel, its results from each worker thread must be merged back onto the main thread for consumption by a `foreach` loop (`For Each` in Visual Basic), or insertion into a list or array. In some cases, it might be beneficial to specify a particular kind of merge operation, for example, to begin producing results more quickly. For this purpose, PLINQ supports the `System.Linq.ParallelEnumerable.WithMergeOptions*` method, and the `System.Linq.ParallelMergeOptions` enumeration. For more information, see Merge Options in PLINQ.

## The ForAll Operator

In sequential LINQ queries, execution is deferred until the query is enumerated either in a `foreach` (`For Each` in Visual Basic) loop or by invoking a method such as `System.Linq.ParallelEnumerable.ToList*` , `System.Linq.ParallelEnumerable.ToArray*` , or `System.Linq.ParallelEnumerable.ToDictionary*`. In PLINQ, you can also use `foreach` to execute the query and iterate through the results. However, `foreach` itself does not run in parallel, and therefore, it requires that the output from all parallel tasks be merged back into the thread on which the loop is running. In PLINQ, you can use `foreach` when you must preserve the final ordering of the query results, and also whenever you are processing the results in a serial manner, for example when you are calling `Console.WriteLine` for each element. For faster query execution when order preservation is not required and when the processing of the results can itself be parallelized, use the `System.Linq.ParallelEnumerable.ForAll*` method to execute a PLINQ query. `System.Linq.ParallelEnumerable.ForAll*` does not perform this final merge step. The following code example shows how to use the `System.Linq.ParallelEnumerable.ForAll*` method. `System.Collections.Concurrent.ConcurrentBag`1` is used here because it is optimized for multiple threads adding concurrently without attempting to remove any items.

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

The following illustration shows the difference between `foreach` and `System.Linq.ParallelEnumerable.ForAll*` with regard to query execution.

## Cancellation

PLINQ is integrated with the cancellation types in .NET. (For more information, see Cancellation in Managed Threads.) Therefore, unlike sequential LINQ to Objects queries, PLINQ queries can be canceled. To create a cancelable PLINQ query, use the `System.Linq.ParallelEnumerable.WithCancellation*` operator on the query and provide a `System.Threading.CancellationToken` instance as the argument. When the `System.Threading.CancellationToken.IsCancellationRequested` property on the token is set to true, PLINQ will notice it, stop processing on all threads, and throw an `System.OperationCanceledException`.

It is possible that a PLINQ query might continue to process some elements after the cancellation token is set.

For greater responsiveness, you can also respond to cancellation requests in long-running user delegates. For more information, see How to: Cancel a PLINQ Query.

## Exceptions

When a PLINQ query executes, multiple exceptions might be thrown from different threads simultaneously. Also, the code to handle the exception might be on a different thread than the code that threw the exception. PLINQ uses the `System.AggregateException` type to encapsulate all the exceptions that were thrown by a query, and marshal those exceptions back to the calling thread. On the calling thread, only one try-catch block is required. However, you can iterate through all of the exceptions that are encapsulated in the `System.AggregateException` and catch any that you can safely recover from. In rare cases, some exceptions may be thrown that are not wrapped in an `System.AggregateException`, and `System.Threading.ThreadAbortException`s  are also not wrapped.

When exceptions are allowed to bubble up back to the joining thread, then it is possible that a query may continue to process some items after the exception is raised.

For more information, see How to: Handle Exceptions in a PLINQ Query.
