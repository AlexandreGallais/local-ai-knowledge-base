---
title: "How to: Cancel a PLINQ Query (part 5 of 9)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-cancel-a-plinq-query.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Cancel a PLINQ Query (part 5 of 9)

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

The PLINQ framework does not roll a single `System.OperationCanceledException` into an `System.AggregateException`; the `System.OperationCanceledException` must be handled in a separate catch block. If one or more user delegates throws an OperationCanceledException(externalCT) (by using an external `System.Threading.CancellationToken`) but no other exception, and the query was defined as `AsParallel().WithCancellation(externalCT)`, then PLINQ will issue a single `System.OperationCanceledException` (externalCT) rather than an `System.AggregateException`. However, if one user delegate throws an `System.OperationCanceledException`, and another delegate throws another exception type, then both exceptions will be rolled into an `System.AggregateException`.

The general guidance on cancellation is as follows:

1. If you perform user-delegate cancellation, you should inform PLINQ about the external `System.Threading.CancellationToken` and throw an `System.OperationCanceledException`(externalCT).

2. If cancellation occurs and no other exceptions are thrown, then handle an `System.OperationCanceledException` rather than an `System.AggregateException`.
