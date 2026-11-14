---
title: "How to: Add and Take Items Individually from a BlockingCollection"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/collections/thread-safe/how-to-add-and-take-items.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Add and Take Items Individually from a BlockingCollection

This example shows how to add and remove items from a `System.Collections.Concurrent.BlockingCollection`1` in both a blocking and a non-blocking manner. For more information on `System.Collections.Concurrent.BlockingCollection`1`, see BlockingCollection Overview.

 For an example of how to enumerate a `System.Collections.Concurrent.BlockingCollection`1` until it is empty and no more elements will be added, see How to: Use ForEach to Remove Items in a BlockingCollection.

## Example 1

 This first example shows how to add and take items so that the operations will block if the collection is either temporarily empty (when taking) or at maximum capacity (when adding), or if a specified timeout period has elapsed. Note that blocking on maximum capacity is only enabled when the BlockingCollection has been created with a maximum capacity specified in the constructor.

 ```csharp
using System;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        // Increase or decrease this value as desired.
        int itemsToAdd = 500;

        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            int width = Math.Max(Console.BufferWidth, 80);
            int height = Math.Max(Console.BufferHeight, itemsToAdd * 2 + 3);

            // Preserve all the display output for Adds and Takes
            Console.SetBufferSize(width, height);
        }

        // A bounded collection. Increase, decrease, or remove the
        // maximum capacity argument to see how it impacts behavior.
        var numbers = new BlockingCollection<int>(50);

        // A simple blocking consumer with no cancellation.
        Task.Run(() =>
        {
            int i = -1;
            while (!numbers.IsCompleted)
            {
                try
                {
                    i = numbers.Take();
                }
                catch (InvalidOperationException)
                {
                    Console.WriteLine("Adding was completed!");
                    break;
                }
                Console.WriteLine($"Take:{i} ");

                // Simulate a slow consumer. This will cause
                // collection to fill up fast and thus Adds wil block.
                Thread.SpinWait(100000);
            }

            Console.WriteLine("\r\nNo more items to take. Press the Enter key to exit.");
        });

        // A simple blocking producer with no cancellation.
        Task.Run(() =>
        {
            for (int i = 0; i < itemsToAdd; i++)
            {
                numbers.Add(i);
                Console.WriteLine($"Add:{i} Count={numbers.Count}");
            }

            // See documentation for this method.
            numbers.CompleteAdding();
        });

        // Keep the console display open in debug mode.
        Console.ReadLine();
    }
}
```

## Example 2

 This second example shows how to add and take items so that the operations will not block. If no item is present, maximum capacity on a bounded collection has been reached, or the timeout period has elapsed, then the `System.Collections.Concurrent.BlockingCollection`1.TryAdd*` or `System.Collections.Concurrent.BlockingCollection`1.TryTake*` operation returns false. This allows the thread to do some other useful work for a while and then try again later to either retrieve a new item, or try to add the same item that could not be added previously. The program also demonstrates how to implement cancellation when accessing a `System.Collections.Concurrent.BlockingCollection`1`.

 ```csharp
using System;
using System.Collections.Concurrent;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;

class ProgramWithCancellation
{
    static int inputs = 2000;

    static void Main()
    {
        // The token <example-value> for issuing the cancelation request.
        var cts = new CancellationTokenSource();

        // A blocking collection that can hold no more than 100 items at a time.
        var numberCollection = new BlockingCollection<int>(100);

        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            int width = Math.Max(Console.BufferWidth, 80);
            int height = Math.Max(Console.BufferHeight, 8000);

            // Preserve all the display output for Adds and Takes
            Console.SetBufferSize(width, height);
        }

        // The simplest UI thread ever invented.
        Task.Run(() =>
        {
            if (Console.ReadKey(true).KeyChar == 'c')
            {
                cts.Cancel();
            }
        });

        // Start one producer and one consumer.
        Task t1 = Task.Run(() => NonBlockingConsumer(numberCollection, cts.Token));
        Task t2 = Task.Run(() => NonBlockingProducer(numberCollection, cts.Token));

        // Wait for the tasks to complete execution
        Task.WaitAll(t1, t2);

        cts.Dispose();
        Console.WriteLine("Press the Enter key to exit.");
        Console.ReadLine();
    }

    static void NonBlockingConsumer(BlockingCollection<int> bc, CancellationToken ct)
    {
        // IsCompleted == (IsAddingCompleted && Count == 0)
        while (!bc.IsCompleted)
        {
            int nextItem = 0;
            try
            {
                if (!bc.TryTake(out nextItem, 0, ct))
                {
                    Console.WriteLine(" Take Blocked");
                }
                else
                {
                    Console.WriteLine($" Take:{nextItem}");
                }
            }

            catch (OperationCanceledException)
            {
                Console.WriteLine("Taking canceled.");
                break;
            }

            // Slow down consumer just a little to cause
            // collection to fill up faster, and lead to "AddBlocked"
            Thread.SpinWait(500000);
        }

        Console.WriteLine("\r\nNo more items to take.");
    }

    static void NonBlockingProducer(BlockingCollection<int> bc, CancellationToken ct)
    {
        int itemToAdd = 0;
        bool success = false;

        do
        {
            // Cancellation causes OCE. We know how to handle it.
            try
            {
                // A shorter timeout causes more failures.
                success = bc.TryAdd(itemToAdd, 2, ct);
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("Add loop canceled.");
                // Let other threads know we're done in case
                // they aren't monitoring the cancellation token.
                bc.CompleteAdding();
                break;
            }

            if (success)
            {
                Console.WriteLine($" Add:{itemToAdd}");
                itemToAdd++;
            }
            else
            {
                Console.Write(" AddBlocked:{0} Count = {1}", itemToAdd.ToString(), bc.Count);
                // Don't increment nextItem. Try again on next iteration.

                //Do something else useful instead.
                UpdateProgress(itemToAdd);
            }
        } while (itemToAdd < inputs);

        // No lock required here because only one producer.
        bc.CompleteAdding();
    }

    static void UpdateProgress(int i)
    {
        double percent = ((double)i / inputs) * 100;
        Console.WriteLine($"Percent complete: {percent}");
    }
}
```

## See also

- `System.Collections.Concurrent`
- BlockingCollection Overview
