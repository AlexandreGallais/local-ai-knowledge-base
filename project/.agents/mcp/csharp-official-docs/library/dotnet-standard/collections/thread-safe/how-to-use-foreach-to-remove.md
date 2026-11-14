---
title: "Use foreach to remove items in a BlockingCollection"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/collections/thread-safe/how-to-use-foreach-to-remove.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Use foreach to remove items in a BlockingCollection

In addition to taking items from a `System.Collections.Concurrent.BlockingCollection`1` by using the `System.Collections.Concurrent.BlockingCollection`1.Take*` and `System.Collections.Concurrent.BlockingCollection`1.TryTake*` method, you can also use a foreach (For Each in Visual Basic) with the `System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*` to remove items until adding is completed and the collection is empty. This is called a *mutating enumeration* or *consuming enumeration* because, unlike a typical `foreach` (`For Each`) loop, this enumerator modifies the source collection by removing items.

## Example

The following example shows how to remove all the items in a `System.Collections.Concurrent.BlockingCollection`1` by using a `foreach` (`For Each`) loop.

```csharp
using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

class Example
{
    // Limit the collection size to 2000 items at any given time.
    // Set itemsToProduce to > 500 to hit the limit.
    const int UpperLimit = 1000;

    // Adjust this number to see how it impacts the producing-consuming pattern.
    const int ItemsToProduce = 100;

    static readonly BlockingCollection<long> Collection =
        new BlockingCollection<long>(UpperLimit);

    // Variables for diagnostic output only.
    static readonly Stopwatch Stopwatch = new Stopwatch();
    static int TotalAdditions = 0;

    static async Task Main()
    {
        Stopwatch.Start();

        // Queue the consumer task.
        var consumerTask = Task.Run(() => RunConsumer());

        // Queue the producer tasks.
        var produceTaskOne = Task.Run(() => RunProducer("A", 0));
        var produceTaskTwo = Task.Run(() => RunProducer("B", ItemsToProduce));
        var producerTasks = new[] { produceTaskOne , produceTaskTwo };

        // Create a cleanup task that will call CompleteAdding after
        // all producers are done adding items.
        var cleanupTask = Task.Factory.ContinueWhenAll(producerTasks, _ => Collection.CompleteAdding());

        // Wait for all tasks to complete
        await Task.WhenAll(consumerTask, produceTaskOne, produceTaskTwo, cleanupTask);

        // Keep the console window open while the
        // consumer thread completes its output.
        Console.WriteLine("Press any key to exit");
        Console.ReadKey(true);
    }

    static void RunProducer(string id, int start)
    {
        var additions = 0;
        for (var i = start; i < start + ItemsToProduce; i++)
        {
            // The data that is added to the collection.
            var ticks = Stopwatch.ElapsedTicks;

            // Display additions and subtractions.
            Console.WriteLine($"{id} adding tick value {ticks}. item# {i}");

            if (!Collection.IsAddingCompleted)
            {
                Collection.Add(ticks);
            }

            // Counter for demonstration purposes only.
            additions++;

            // Comment this line to speed up the producer threads.
            Thread.SpinWait(100000);
        }

        Interlocked.Add(ref TotalAdditions, additions);
        Console.WriteLine($"{id} is done adding: {additions} items");
    }

    static void RunConsumer()
    {
        // GetConsumingEnumerable returns the enumerator for the underlying collection.
        var subtractions = 0;
        foreach (var item in Collection.GetConsumingEnumerable())
        {
            Console.WriteLine(
                $"Consuming tick value {item:D18} : item# {subtractions++} : current count = {Collection.Count}");
        }

        Console.WriteLine(
            $"Total added: {TotalAdditions} Total consumed: {subtractions} Current count: {Collection.Count}");

        Stopwatch.Stop();
    }
}
```

This example uses a `foreach` loop with the `System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*` method in the consuming thread, which causes each item to be removed from the collection as it is enumerated. `System.Collections.Concurrent.BlockingCollection`1` limits the maximum number of items that are in the collection at any time. Enumerating the collection in this way blocks the consumer thread if no items are available or if the collection is empty. In this example blocking is not a concern because the producer thread adds items faster than they can be consumed.

The `System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*` returns an `IEnumerable<T>`, thus order cannot be guaranteed. However, internally a `System.Collections.Concurrent.ConcurrentQueue`1` is used as the underlying collection type - which will dequeue objects following first-in-first-out (FIFO) ordering. If concurrent calls to `System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*` are made, they will compete. One item consumed (dequeued) in one enumeration cannot be observed in the other.

To enumerate the collection without modifying it, just use `foreach` (`For Each`) without the `System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*` method. However, it is important to understand that this kind of enumeration represents a snapshot of the collection at a precise point in time. If other threads are adding or removing items concurrently while you are executing the loop, then the loop might not represent the actual state of the collection.

## See also

- `System.Collections.Concurrent`
- Parallel Programming
