---
title: "How to: Cancel a Parallel.For or ForEach Loop"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-cancel-a-parallel-for-or-foreach-loop.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Cancel a Parallel.For or ForEach Loop

The `System.Threading.Tasks.Parallel.For*` and `System.Threading.Tasks.Parallel.ForEach*` methods support cancellation through the use of cancellation tokens. For more information about cancellation in general, see Cancellation. In a parallel loop, you supply the `System.Threading.CancellationToken` to the method in the `System.Threading.Tasks.ParallelOptions` parameter and then enclose the parallel call in a try-catch block.

## Example

The following example shows how to cancel a call to `System.Threading.Tasks.Parallel.ForEach*`. You can apply the same approach to a `System.Threading.Tasks.Parallel.For*` call.

```csharp
namespace CancelParallelLoops
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    class Program
    {
        static void Main()
        {
            int[] nums = Enumerable.Range(0, 10_000_000).ToArray();
            CancellationTokenSource cts = new();

            // Use ParallelOptions instance to store the CancellationToken
            ParallelOptions options = new()
            {
                CancellationToken = cts.Token,
                MaxDegreeOfParallelism = Environment.ProcessorCount
            };
            Console.WriteLine("Press any key to start. Press 'c' to cancel.");
            Console.ReadKey();

            // Run a task so that we can cancel from another thread.
            Task.Factory.StartNew(() =>
            {
                if (Console.ReadKey().KeyChar is 'c')
                    cts.Cancel();
                Console.WriteLine("press any key to exit");
            });

            try
            {
                Parallel.ForEach(nums, options, (num) =>
                {
                    double d = Math.Sqrt(num);
                    Console.WriteLine($"{d} on {Environment.CurrentManagedThreadId}");
                });
            }
            catch (OperationCanceledException e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                cts.Dispose();
            }

            Console.ReadKey();
        }
    }
}
```

If the token that signals the cancellation is the same token that is specified in the `System.Threading.Tasks.ParallelOptions` instance, then the parallel loop will throw a single `System.OperationCanceledException` on cancellation. This immediately stops all iterations from executing as the exception is thrown. If some other token causes cancellation, the loop will throw an `System.AggregateException` with an `System.OperationCanceledException` as an `InnerException`.

## See also

- Data parallelism
- Lambda expressions in PLINQ and TPL
