---
title: "Order Preservation in PLINQ (part 10 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/order-preservation-in-plinq.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Order Preservation in PLINQ (part 10 of 10)

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

 Note that PLINQ preserves the ordering of a sequence produced by order-imposing operators for the rest of the query. In other words, operators such as `System.Linq.ParallelEnumerable.OrderBy*` and `System.Linq.ParallelEnumerable.ThenBy*` are treated as if they were followed by a call to `System.Linq.ParallelEnumerable.AsOrdered*`.

## Query Operators and Ordering

 The following query operators introduce order preservation into all subsequent operations in a query, or until `System.Linq.ParallelEnumerable.AsUnordered*` is called:

- `System.Linq.ParallelEnumerable.OrderBy*`

- `System.Linq.ParallelEnumerable.OrderByDescending*`

- `System.Linq.ParallelEnumerable.ThenBy*`

- `System.Linq.ParallelEnumerable.ThenByDescending*`

 The following PLINQ query operators may in some cases require ordered source sequences to produce correct results:

- `System.Linq.ParallelEnumerable.Reverse*`

- `System.Linq.ParallelEnumerable.SequenceEqual*`

- `System.Linq.ParallelEnumerable.TakeWhile*`

- `System.Linq.ParallelEnumerable.SkipWhile*`

- `System.Linq.ParallelEnumerable.Zip*`

 Some PLINQ query operators behave differently, depending on whether their source sequence is ordered or unordered. The following table lists these operators.

|Operator|Result when the source sequence is ordered|Result when the source sequence is unordered|
|--------------|------------------------------------------------|--------------------------------------------------|
|`System.Linq.ParallelEnumerable.Aggregate*`|Nondeterministic output for nonassociative or noncommutative operations|Nondeterministic output for nonassociative or noncommutative operations|
|`System.Linq.ParallelEnumerable.All*`|Not applicable|Not applicable|
|`System.Linq.ParallelEnumerable.Any*`|Not applicable|Not applicable|
|`System.Linq.ParallelEnumerable.AsEnumerable*`|Not applicable|Not applicable|
|`System.Linq.ParallelEnumerable.Average*`|Nondeterministic output for nonassociative or noncommutative operations|Nondeterministic output for nonassociative or noncommutative operations|
|`System.Linq.ParallelEnumerable.Cast*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.Concat*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.Count*`|Not applicable|Not applicable|
|`System.Linq.ParallelEnumerable.DefaultIfEmpty*`|Not applicable|Not applicable|
|`System.Linq.ParallelEnumerable.Distinct*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.ElementAt*`|Return specified element|Arbitrary element|
|`System.Linq.ParallelEnumerable.ElementAtOrDefault*`|Return specified element|Arbitrary element|
|`System.Linq.ParallelEnumerable.Except*`|Unordered results|Unordered results|
|`System.Linq.ParallelEnumerable.First*`|Return specified element|Arbitrary element|
|`System.Linq.ParallelEnumerable.FirstOrDefault*`|Return specified element|Arbitrary element|
|`System.Linq.ParallelEnumerable.ForAll*`|Executes nondeterministically in parallel|Executes nondeterministically in parallel|
|`System.Linq.ParallelEnumerable.GroupBy*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.GroupJoin*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.Intersect*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.Join*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.Last*`|Return specified element|Arbitrary element|
|`System.Linq.ParallelEnumerable.LastOrDefault*`|Return specified element|Arbitrary element|
|`System.Linq.ParallelEnumerable.LongCount*`|Not applicable|Not applicable|
|`System.Linq.ParallelEnumerable.Min*`|Not applicable|Not applicable|
|`System.Linq.ParallelEnumerable.OrderBy*`|Reorders the sequence|Starts new ordered section|
|`System.Linq.ParallelEnumerable.OrderByDescending*`|Reorders the sequence|Starts new ordered section|
|`System.Linq.ParallelEnumerable.Range*`|Not applicable (same default as `System.Linq.ParallelEnumerable.AsParallel*` )|Not applicable|
|`System.Linq.ParallelEnumerable.Repeat*`|Not applicable (same default as `System.Linq.ParallelEnumerable.AsParallel*`)|Not applicable|
|`System.Linq.ParallelEnumerable.Reverse*`|Reverses|Does nothing|
|`System.Linq.ParallelEnumerable.Select*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.Select*` (indexed)|Ordered results|Unordered results.|
|`System.Linq.ParallelEnumerable.SelectMany*`|Ordered results.|Unordered results|
|`System.Linq.ParallelEnumerable.SelectMany*` (indexed)|Ordered results.|Unordered results.|
|`System.Linq.ParallelEnumerable.SequenceEqual*`|Ordered comparison|Unordered comparison|
|`System.Linq.ParallelEnumerable.Single*`|Not applicable|Not applicable|
|`System.Linq.ParallelEnumerable.SingleOrDefault*`|Not applicable|Not applicable|
|`System.Linq.ParallelEnumerable.Skip*`|Skips first *n* elements|Skips any *n* elements|
|`System.Linq.ParallelEnumerable.SkipWhile*`|Ordered results.|Nondeterministic. Performs SkipWhile on the current arbitrary order|
|`System.Linq.ParallelEnumerable.Sum*`|Nondeterministic output for nonassociative or noncommutative operations|Nondeterministic output for nonassociative or noncommutative operations|
|`System.Linq.ParallelEnumerable.Take*`|Takes first `n` elements|Takes any `n` elements|
|`System.Linq.ParallelEnumerable.TakeWhile*`|Ordered results|Nondeterministic. Performs TakeWhile on the current arbitrary order|
|`System.Linq.ParallelEnumerable.ThenBy*`|Supplements `OrderBy`|Supplements `OrderBy`|
|`System.Linq.ParallelEnumerable.ThenByDescending*`|Supplements `OrderBy`|Supplements `OrderBy`|
|`System.Linq.ParallelEnumerable.ToArray*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.ToDictionary*`|Not applicable|Not applicable|
|`System.Linq.ParallelEnumerable.ToList*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.ToLookup*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.Union*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.Where*`|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.Where*` (indexed)|Ordered results|Unordered results|
|`System.Linq.ParallelEnumerable.Zip*`|Ordered results|Unordered results|

 Unordered results are not actively shuffled; they simply do not have any special ordering logic applied to them. In some cases, an unordered query may retain the ordering of the source sequence. For queries that use the indexed Select operator, PLINQ guarantees that the output elements will come out in the order of increasing indices, but makes no guarantees about which indices will be assigned to which elements.

## See also

- Parallel LINQ (PLINQ)
- Parallel Programming
