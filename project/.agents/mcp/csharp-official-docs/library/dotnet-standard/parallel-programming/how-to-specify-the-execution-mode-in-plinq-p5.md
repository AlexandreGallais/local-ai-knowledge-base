---
title: "How to: Specify the Execution Mode in PLINQ (part 5 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-specify-the-execution-mode-in-plinq.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Specify the Execution Mode in PLINQ (part 5 of 5)

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

 PLINQ is designed to exploit opportunities for parallelization. However, not all queries benefit from parallel execution. For example, when a query contains a single user delegate that does little work, the query will usually run faster sequentially. Sequential execution is faster because the overhead involved in enabling parallelizing execution is more expensive than the speedup that's obtained. Therefore, PLINQ does not automatically parallelize every query. It first examines the shape of the query and the various operators that comprise it. Based on this analysis, PLINQ in the default execution mode may decide to execute some or all of the query sequentially. However, in some cases you may know more about your query than PLINQ is able to determine from its analysis. For example, you may know that a delegate is expensive and that the query will definitely benefit from parallelization. In such cases, you can use the `System.Linq.ParallelEnumerable.WithExecutionMode*` method and specify the `System.Linq.ParallelExecutionMode.ForceParallelism` value to instruct PLINQ to always run the query as parallel.

## Compiling the Code

 Cut and paste this code into the PLINQ Data Sample and call the method from `Main`.

## See also

- `System.Linq.ParallelEnumerable.AsSequential*`
- Parallel LINQ (PLINQ)
