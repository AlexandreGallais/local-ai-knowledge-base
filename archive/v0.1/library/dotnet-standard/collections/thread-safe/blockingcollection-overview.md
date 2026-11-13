---
title: "BlockingCollection Overview"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/collections/thread-safe/blockingcollection-overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# BlockingCollection Overview

`System.Collections.Concurrent.BlockingCollection`1` is a thread-safe collection class that provides the following features:

- An implementation of the Producer-Consumer pattern.

- Concurrent adding and taking of items from multiple threads.

- Optional maximum capacity.

- Insertion and removal operations that block when collection is empty or full.

- Insertion and removal "try" operations that do not block or that block up to a specified period of time.

- Encapsulates any collection type that implements `System.Collections.Concurrent.IProducerConsumerCollection`1`

- Cancellation with cancellation tokens.

- Two kinds of enumeration with `foreach` (`For Each` in Visual Basic):

    1. Read-only enumeration.

    2. Enumeration that removes items as they are enumerated.

## Bounding and Blocking Support

 `System.Collections.Concurrent.BlockingCollection`1` supports bounding and blocking. Bounding means you can set the maximum capacity of the collection. Bounding is important in certain scenarios because it enables you to control the maximum size of the collection in memory, and it prevents the producing threads from moving too far ahead of the consuming threads.

 Multiple threads or tasks can add items to the collection concurrently, and if the collection reaches its specified maximum capacity, the producing threads will block until an item is removed. Multiple consumers can remove items concurrently, and if the collection becomes empty, the consuming threads will block until a producer adds an item. A producing thread can call `System.Collections.Concurrent.BlockingCollection`1.CompleteAdding*` to indicate that no more items will be added. Consumers monitor the `System.Collections.Concurrent.BlockingCollection`1.IsCompleted` property to know when the collection is empty and no more items will be added. The following example shows a simple BlockingCollection with a bounded capacity of 100. A producer task adds items to the collection as long as some external condition is true, and then calls `System.Collections.Concurrent.BlockingCollection`1.CompleteAdding*`. The consumer task takes items until the `System.Collections.Concurrent.BlockingCollection`1.IsCompleted` property is true.

 ```csharp
﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OverviewSnippets
{
    using System;
    using System.Collections.Concurrent;

    class Program
    {
        class Data
        { }

        static void Main()
        {
            bool moreItemsToAdd = false;

            // A bounded collection. It can hold no more
            // than 100 items at once.
            BlockingCollection<Data> dataItems = new BlockingCollection<Data>(100);

            // A simple blocking consumer with no cancellation.
            Task.Run(() =>
            {
                while (!dataItems.IsCompleted)
                {

                    Data data = null;
                    // Blocks if dataItems.Count == 0.
                    // IOE means that Take() was called on a completed collection.
                    // Some other thread can call CompleteAdding after we pass the
                    // IsCompleted check but before we call Take.
                    // In this example, we can simply catch the exception since the
                    // loop will break on the next iteration.
                    try
                    {
                        data = dataItems.Take();
                    }
                    catch (InvalidOperationException) { }

                    if (data != null)
                    {
                        Process(data);
                    }
                }
                Console.WriteLine("\r\nNo more items to take.");
            });

            // A simple blocking producer with no cancellation.
            Task.Run(() =>
            {
                while (moreItemsToAdd)
                {
                    Data data = GetData();
                    // Blocks if dataItems.Count == dataItems.BoundedCapacity
                    dataItems.Add(data);
                }
                // Let consumer know we are done.
                dataItems.CompleteAdding();
            });

        }

        static void NonBlockingProducer(BlockingCollection<int> bc, CancellationToken ct)
        {
            int itemToAdd = 0;
            bool moreItems = true;
            bool success = false;

            do
            {
                // Cancellation causes OCE. We know how to handle it.
                try
                {
                    success = bc.TryAdd(itemToAdd, 2, ct);
                }
                catch (OperationCanceledException)
                {
                    bc.CompleteAdding();
                    break;
                }
                //...
            } while (moreItems == true);
        }
        static void Process(Data n) { }
        static Data GetData() { return new Data(); }
    }
}
```

 For a complete example, see How to: Add and Take Items Individually from a BlockingCollection.

## Timed Blocking Operations

 In timed blocking `System.Collections.Concurrent.BlockingCollection`1.TryAdd*` and `System.Collections.Concurrent.BlockingCollection`1.TryTake*` operations on bounded collections, the method tries to add or take an item. If an item is available it is placed into the variable that was passed in by reference, and the method returns true. If no item is retrieved after a specified time-out period the method returns false. The thread is then free to do some other useful work before trying again to access the collection. For an example of timed blocking access, see the second example in How to: Add and Take Items Individually from a BlockingCollection.

## Cancelling Add and Take Operations

 Add and Take operations are typically performed in a loop. You can cancel a loop by passing in a `System.Threading.CancellationToken` to the `System.Collections.Concurrent.BlockingCollection`1.TryAdd*` or `System.Collections.Concurrent.BlockingCollection`1.TryTake*` method, and then checking the value of the token's `System.Threading.CancellationToken.IsCancellationRequested` property on each iteration. If the value is true, then it is up to you to respond to the cancellation request by cleaning up any resources and exiting the loop. The following example shows an overload of `System.Collections.Concurrent.BlockingCollection`1.TryAdd*` that takes a cancellation token, and the code that uses it:

 ```csharp
﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OverviewSnippets
{
    using System;
    using System.Collections.Concurrent;

    class Program
    {
        class Data
        { }

        static void Main()
        {
            bool moreItemsToAdd = false;

            // A bounded collection. It can hold no more
            // than 100 items at once.
            BlockingCollection<Data> dataItems = new BlockingCollection<Data>(100);

            // A simple blocking consumer with no cancellation.
            Task.Run(() =>
            {
                while (!dataItems.IsCompleted)
                {

                    Data data = null;
                    // Blocks if dataItems.Count == 0.
                    // IOE means that Take() was called on a completed collection.
                    // Some other thread can call CompleteAdding after we pass the
                    // IsCompleted check but before we call Take.
                    // In this example, we can simply catch the exception since the
                    // loop will break on the next iteration.
                    try
                    {
                        data = dataItems.Take();
                    }
                    catch (InvalidOperationException) { }

                    if (data != null)
                    {
                        Process(data);
                    }
                }
                Console.WriteLine("\r\nNo more items to take.");
            });

            // A simple blocking producer with no cancellation.
            Task.Run(() =>
            {
                while (moreItemsToAdd)
                {
                    Data data = GetData();
                    // Blocks if dataItems.Count == dataItems.BoundedCapacity
                    dataItems.Add(data);
                }
                // Let consumer know we are done.
                dataItems.CompleteAdding();
            });

        }

        static void NonBlockingProducer(BlockingCollection<int> bc, CancellationToken ct)
        {
            int itemToAdd = 0;
            bool moreItems = true;
            bool success = false;

            do
            {
                // Cancellation causes OCE. We know how to handle it.
                try
                {
                    success = bc.TryAdd(itemToAdd, 2, ct);
                }
                catch (OperationCanceledException)
                {
                    bc.CompleteAdding();
                    break;
                }
                //...
            } while (moreItems == true);
        }
        static void Process(Data n) { }
        static Data GetData() { return new Data(); }
    }
}
```

 For an example of how to add cancellation support, see the second example in How to: Add and Take Items Individually from a BlockingCollection.

## Specifying the Collection Type

 When you create a `System.Collections.Concurrent.BlockingCollection`1`, you can specify not only the bounded capacity but also the type of collection to use. For example, you could specify a `System.Collections.Concurrent.ConcurrentQueue`1` for first in-first out (FIFO) behavior, or a `System.Collections.Concurrent.ConcurrentStack`1` for last in-first out (LIFO) behavior. You can use any collection class that implements the `System.Collections.Concurrent.IProducerConsumerCollection`1` interface. The default collection type for `System.Collections.Concurrent.BlockingCollection`1` is `System.Collections.Concurrent.ConcurrentQueue`1`. The following code example shows how to create a `System.Collections.Concurrent.BlockingCollection`1` of strings that has a capacity of 1000 and uses a `System.Collections.Concurrent.ConcurrentBag`1`:

```vb
Dim bc = New BlockingCollection(Of String)(New ConcurrentBag(Of String()), 1000)
```

```csharp
BlockingCollection<string> bc = new BlockingCollection<string>(new ConcurrentBag<string>(), 1000 );
```

 For more information, see How to: Add Bounding and Blocking Functionality to a Collection.

## IEnumerable Support

 `System.Collections.Concurrent.BlockingCollection`1` provides a `System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*` method that enables consumers to use `foreach` (`For Each` in Visual Basic) to remove items until the collection is completed, which means it is empty and no more items will be added. For more information, see How to: Use ForEach to Remove Items in a BlockingCollection.

## Using Many BlockingCollections As One

 For scenarios in which a consumer needs to take items from multiple collections simultaneously, you can create arrays of `System.Collections.Concurrent.BlockingCollection`1` and use the static methods such as `System.Collections.Concurrent.BlockingCollection`1.TakeFromAny*` and `System.Collections.Concurrent.BlockingCollection`1.AddToAny*` that will add to or take from any of the collections in the array. If one collection is blocking, the method immediately tries another until it finds one that can perform the operation. For more information, see How to: Use Arrays of Blocking Collections in a Pipeline.

## See also

- `System.Collections.Concurrent`
- Collections and Data Structures
- Thread-Safe Collections
