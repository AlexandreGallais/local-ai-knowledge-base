---
title: "How to: Cancel a PLINQ Query (part 9 of 9)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-cancel-a-plinq-query.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Cancel a PLINQ Query (part 9 of 9)

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

When you handle the cancellation in user code, you do not have to use `System.Linq.ParallelEnumerable.WithCancellation*` in the query definition. However, we recommend that you do use `System.Linq.ParallelEnumerable.WithCancellation*`, because `System.Linq.ParallelEnumerable.WithCancellation*` has no effect on query performance and it enables the cancellation to be handled by query operators and your user code.

In order to ensure system responsiveness, we recommend that you check for cancellation around once per millisecond; however, any period up to 10 milliseconds is considered acceptable. This frequency should not have a negative impact on your code's performance.

When an enumerator is disposed, for example when code breaks out of a foreach (For Each in Visual Basic) loop that is iterating over query results, then the query is canceled, but no exception is thrown.

## See also

- `System.Linq.ParallelEnumerable`
- Parallel LINQ (PLINQ)
- Cancellation in Managed Threads
