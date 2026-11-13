---
title: "Merge Options in PLINQ (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/merge-options-in-plinq.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Merge Options in PLINQ (part 4 of 4)

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

 For the complete example, see How to: Specify Merge Options in PLINQ.

 If the particular query cannot support the requested option, then the option will just be ignored. In most cases, you do not have to specify a merge option for a PLINQ query. However, in some cases you may find by testing and measurement that a query executes best in a non-default mode. A common use of this option is to force a chunk-merging operator to stream its results in order to provide a more responsive user interface.

## ParallelMergeOptions

 The `System.Linq.ParallelMergeOptions` enumeration includes the following options that specify, for supported query shapes, how the final output of the query is yielded when the results are consumed on one thread:

- `Not Buffered`

     The `System.Linq.ParallelMergeOptions.NotBuffered` option causes each processed element to be returned from each thread as soon as it is produced. This behavior is analogous to "streaming" the output. If the `System.Linq.ParallelEnumerable.AsOrdered*` operator is present in the query, `NotBuffered` preserves the order of the source elements. Although `NotBuffered` starts yielding results as soon as they're available, the total time to produce all the results might still be longer than using one of the other merge options.

- `Auto Buffered`

     The `System.Linq.ParallelMergeOptions.AutoBuffered` option causes the query to collect elements into a buffer and then periodically yield the buffer contents all at once to the consuming thread. This is analogous to yielding the source data in "chunks" instead of using the "streaming" behavior of `NotBuffered`. `AutoBuffered` may take longer than `NotBuffered` to make the first element available on the consuming thread. The size of the buffer and the exact yielding behavior are not configurable and may vary, depending on various factors that relate to the query.

- `FullyBuffered`

     The `System.Linq.ParallelMergeOptions.FullyBuffered` option causes the output of the whole query to be buffered before any of the elements are yielded. When you use this option, it can take longer before the first element is available on the consuming thread, but the complete results might still be produced faster than by using the other options.

## Query Operators that Support Merge Options

 The following table lists the operators that support all merge option modes, subject to the specified restrictions.

|Operator|Restrictions|
|--------------|------------------|
|`System.Linq.ParallelEnumerable.AsEnumerable*`|None|
|`System.Linq.ParallelEnumerable.Cast*`|None|
|`System.Linq.ParallelEnumerable.Concat*`|Non-ordered queries that have an Array or List source only.|
|`System.Linq.ParallelEnumerable.DefaultIfEmpty*`|None|
|`System.Linq.ParallelEnumerable.OfType*`|None|
|`System.Linq.ParallelEnumerable.Reverse*`|Non-ordered queries that have an Array or List source only.|
|`System.Linq.ParallelEnumerable.Select*`|None|
|`System.Linq.ParallelEnumerable.SelectMany*`|None|
|`System.Linq.ParallelEnumerable.Skip*`|None|
|`System.Linq.ParallelEnumerable.Take*`|None|
|`System.Linq.ParallelEnumerable.Where*`|None|

 All other PLINQ query operators might ignore user-provided merge options. Some query operators, for example, `System.Linq.ParallelEnumerable.Reverse*` and `System.Linq.ParallelEnumerable.OrderBy*`, cannot yield any elements until all have been produced and reordered. Therefore, when `System.Linq.ParallelMergeOptions` is used in a query that also contains an operator such as `System.Linq.ParallelEnumerable.Reverse*`, the merge behavior will not be applied in the query until after that operator has produced its results.

 The ability of some operators to handle merge options depends on the type of the source sequence, and whether the `System.Linq.ParallelEnumerable.AsOrdered*` operator was used earlier in the query. `System.Linq.ParallelEnumerable.ForAll*` is always `System.Linq.ParallelMergeOptions.NotBuffered` ; it yields its elements immediately. `System.Linq.ParallelEnumerable.OrderBy*` is always `System.Linq.ParallelMergeOptions.FullyBuffered`; it must sort the whole list before it yields.

## See also

- Parallel LINQ (PLINQ)
- How to: Specify Merge Options in PLINQ
