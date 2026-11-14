---
title: "How to: Unlink Dataflow Blocks"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-unlink-dataflow-blocks.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Unlink Dataflow Blocks

This document describes how to unlink a target dataflow block from its source.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

## Example

 The following example creates three `System.Threading.Tasks.Dataflow.TransformBlock`2` objects, each of which calls the `TrySolution` method to compute a value. This example requires only the result from the first call to `TrySolution` to finish.

 ```csharp
using System;
using System.Threading;
using System.Threading.Tasks.Dataflow;

// Demonstrates how to unlink dataflow blocks.
class DataflowReceiveAny
{
   // Receives the value from the first provided source that has
   // a message.
   public static T ReceiveFromAny<T>(params ISourceBlock<T>[] sources)
   {
      // Create a WriteOnceBlock<T> object and link it to each source block.
      var writeOnceBlock = new WriteOnceBlock<T>(e => e);
      foreach (var source in sources)
      {
         // Setting MaxMessages to one instructs
         // the source block to unlink from the WriteOnceBlock<T> object
         // after offering the WriteOnceBlock<T> object one message.
         source.LinkTo(writeOnceBlock, new DataflowLinkOptions { MaxMessages = 1 });
      }
      // Return the first value that is offered to the WriteOnceBlock object.
      return writeOnceBlock.Receive();
   }

   // Demonstrates a function that takes several seconds to produce a result.
   static int TrySolution(int n, CancellationToken ct)
   {
      // Simulate a lengthy operation that completes within three seconds
      // or when the provided CancellationToken <example-value> is cancelled.
      SpinWait.SpinUntil(() => ct.IsCancellationRequested,
         new Random().Next(3000));

      // Return a value.
      return n + 42;
   }

   static void Main(string[] args)
   {
      // Create a shared CancellationTokenSource object to enable the
      // TrySolution method to be cancelled.
      var cts = new CancellationTokenSource();

      // Create three TransformBlock<int, int> objects.
      // Each TransformBlock<int, int> object calls the TrySolution method.
      Func<int, int> action = n => TrySolution(n, cts.Token);
      var trySolution1 = new TransformBlock<int, int>(action);
      var trySolution2 = new TransformBlock<int, int>(action);
      var trySolution3 = new TransformBlock<int, int>(action);

      // Post data to each TransformBlock<int, int> object.
      trySolution1.Post(11);
      trySolution2.Post(21);
      trySolution3.Post(31);

      // Call the ReceiveFromAny<T> method to receive the result from the
      // first TransformBlock<int, int> object to finish.
      int result = ReceiveFromAny(trySolution1, trySolution2, trySolution3);

      // Cancel all calls to TrySolution that are still active.
      cts.Cancel();

      // Print the result to the console.
      Console.WriteLine($"The solution is {result}.");

      cts.Dispose();
   }
}

/* Sample output:
The solution is 53.
*/
```

 To receive the value from the first `System.Threading.Tasks.Dataflow.TransformBlock`2` object that finishes, this example defines the `ReceiveFromAny(T)` method. The `ReceiveFromAny(T)` method accepts an array of `System.Threading.Tasks.Dataflow.ISourceBlock`1` objects and links each of these objects to a `System.Threading.Tasks.Dataflow.WriteOnceBlock`1` object. When you use the `System.Threading.Tasks.Dataflow.ISourceBlock`1.LinkTo*` method to link a source dataflow block to a target block, the source propagates messages to the target as data becomes available. Because the `System.Threading.Tasks.Dataflow.WriteOnceBlock`1` class accepts only the first message that it is offered, the `ReceiveFromAny(T)` method produces its result by calling the `System.Threading.Tasks.Dataflow.DataflowBlock.Receive*` method. This produces the first message that is offered to the `System.Threading.Tasks.Dataflow.WriteOnceBlock`1` object. The `System.Threading.Tasks.Dataflow.ISourceBlock`1.LinkTo*` method has an overloaded version that takes an `System.Threading.Tasks.Dataflow.DataflowLinkOptions` object with a `System.Threading.Tasks.Dataflow.DataflowLinkOptions.MaxMessages` property that, when it is set to `1`, instructs the source block to unlink from the target after the target receives one message from the source. It is important for the `System.Threading.Tasks.Dataflow.WriteOnceBlock`1` object to unlink from its sources because the relationship between the array of sources and the `System.Threading.Tasks.Dataflow.WriteOnceBlock`1` object is no longer required after the `System.Threading.Tasks.Dataflow.WriteOnceBlock`1` object receives a message.

 To enable the remaining calls to `TrySolution` to end after one of them computes a value, the `TrySolution` method takes a `System.Threading.CancellationToken` object that is canceled after the call to `ReceiveFromAny(T)` returns. The `System.Threading.SpinWait.SpinUntil*` method returns when this `System.Threading.CancellationToken` object is canceled.

## See also

- Dataflow
