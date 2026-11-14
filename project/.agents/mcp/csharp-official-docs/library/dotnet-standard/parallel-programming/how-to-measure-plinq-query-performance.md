---
title: "How to: Measure PLINQ Query Performance"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-measure-plinq-query-performance.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Measure PLINQ Query Performance

This example shows how to use the `System.Diagnostics.Stopwatch` class to measure the time it takes for a PLINQ query to execute.

## Example

 This example uses an empty `foreach` loop (`For Each` in Visual Basic) to measure the time it takes for the query to execute. In real-world code, the loop typically contains additional processing steps that add to the total query execution time. Notice that the stopwatch is not started until just before the loop, because that's when the query execution begins. If you require more fine-grained measurement, you can use the `ElapsedTicks` property instead of `ElapsedMilliseconds`.

 ```csharp
using System;
using System.Diagnostics;
using System.Linq;

class ExampleMeasure
{
    static void Main()
    {
        var source = Enumerable.Range(0, 3000000);

        var queryToMeasure =
             from num in source.AsParallel()
             where num % 3 == 0
             select Math.Sqrt(num);

        Console.WriteLine("Measuring...");

        // The query does not run until it is enumerated.
        // Therefore, start the timer here.
        var sw = Stopwatch.StartNew();

        // For pure query cost, enumerate and do nothing else.
        foreach (var n in queryToMeasure) { }

        sw.Stop();
        long elapsed = sw.ElapsedMilliseconds; // or sw.ElapsedTicks
        Console.WriteLine($"Total query time: {elapsed} ms");

        Console.WriteLine("Press any key to exit.");
        Console.ReadKey();
    }
}
```

 The total execution time is a useful metric when you are experimenting with query implementations, but it doesn't always tell the whole story. To get a deeper and richer view of the interaction of the query threads with one another and with other running processes, use the Concurrency Visualizer.

## See also

- Parallel LINQ (PLINQ)
