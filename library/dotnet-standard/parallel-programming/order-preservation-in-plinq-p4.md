---
title: "Order Preservation in PLINQ (part 4 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/order-preservation-in-plinq.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Order Preservation in PLINQ (part 4 of 10)

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

 This query does not necessarily produce the first 1000 cities in the source sequence that meet the condition, but rather some set of 1000 cities that meet the condition. PLINQ query operators partition the source sequence into multiple subsequences that are processed as concurrent tasks. If order preservation is not specified, the results from each partition are handed off to the next stage of the query in an arbitrary order. Also, a partition may yield a subset of its results before it continues to process the remaining elements. The resulting order may be different every time. Your application cannot control this because it depends on how the operating system schedules the threads.

 The following example overrides the default behavior by using the `System.Linq.ParallelEnumerable.AsOrdered*` operator on the source sequence. This ensures that the `System.Linq.ParallelEnumerable.Take*` method returns the first 1000 cities in the source sequence that meet the condition.
