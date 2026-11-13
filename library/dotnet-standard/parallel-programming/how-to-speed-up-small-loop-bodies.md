---
title: "How to: Speed Up Small Loop Bodies"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-speed-up-small-loop-bodies.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Speed Up Small Loop Bodies

When a `System.Threading.Tasks.Parallel.For*` loop has a small body, it might perform more slowly than the equivalent sequential loop, such as the for loop in C# and the For loop in Visual Basic. Slower performance is caused by the overhead involved in partitioning the data and the cost of invoking a delegate on each loop iteration. To address such scenarios, the `System.Collections.Concurrent.Partitioner` class provides the `System.Collections.Concurrent.Partitioner.Create*` method, which enables you to provide a sequential loop for the delegate body, so that the delegate is invoked only once per partition, instead of once per iteration. For more information, see Custom Partitioners for PLINQ and TPL.

## Example

 ```csharp
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {

        // Source must be array or IList.
        var source = Enumerable.Range(0, 100000).ToArray();

        // Partition the entire source array.
        var rangePartitioner = Partitioner.Create(0, source.Length);

        double[] results = new double[source.Length];

        // Loop over the partitions in parallel.
        Parallel.ForEach(rangePartitioner, (range, loopState) =>
        {
            // Loop over each range element without a delegate invocation.
            for (int i = range.Item1; i < range.Item2; i++)
            {
                results[i] = source[i] * Math.PI;
            }
        });

        Console.WriteLine("Operation complete. Print results? y/n");
        char input = Console.ReadKey().KeyChar;
        if (input == 'y' || input == 'Y')
        {
            foreach(double d in results)
            {
                Console.Write("{0} ", d);
            }
        }
    }
}
```

 The approach demonstrated in this example is useful when the loop performs a minimal amount of work. As the work becomes more computationally expensive, you will probably get the same or better performance by using a `System.Threading.Tasks.Parallel.For*` or `System.Threading.Tasks.Parallel.ForEach*` loop with the default partitioner.

## See also

- Data Parallelism
- Custom Partitioners for PLINQ and TPL
- Iterators (C#)
- Iterators (Visual Basic)
- Lambda Expressions in PLINQ and TPL
