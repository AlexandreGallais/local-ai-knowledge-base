---
title: "How to: Specify the Degree of Parallelism in a Dataflow Block"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-specify-the-degree-of-parallelism-in-a-dataflow-block.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Specify the Degree of Parallelism in a Dataflow Block

This document describes how to set the `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions.MaxDegreeOfParallelism` property to enable an execution dataflow block to process more than one message at a time. Doing this is useful when you have a dataflow block that performs a long-running computation and can benefit from processing messages in parallel. This example uses the `System.Threading.Tasks.Dataflow.ActionBlock`1` class to perform multiple dataflow operations concurrently; however, you can specify the maximum degree of parallelism in any of the predefined execution block types that the TPL Dataflow Library provides, `System.Threading.Tasks.Dataflow.ActionBlock`1`, `System.Threading.Tasks.Dataflow.TransformBlock`2`, and `System.Threading.Tasks.Dataflow.TransformManyBlock`2`.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

## Example

 The following example performs two dataflow computations and prints the elapsed time that is required for each computation. The first computation specifies a maximum degree of parallelism of 1, which is the default. A maximum degree of parallelism of 1 causes the dataflow block to process messages serially. The second computation resembles the first, except that it specifies a maximum degree of parallelism that is equal to the number of available processors. This enables the dataflow block to perform multiple operations in parallel.

 ```csharp
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks.Dataflow;

// Demonstrates how to specify the maximum degree of parallelism
// when using dataflow.
class Program
{
   // Performs several computations by using dataflow and returns the elapsed
   // time required to perform the computations.
   static TimeSpan TimeDataflowComputations(int maxDegreeOfParallelism,
      int messageCount)
   {
      // Create an ActionBlock<int> that performs some work.
      var workerBlock = new ActionBlock<int>(
         // Simulate work by suspending the current thread.
         millisecondsTimeout => Thread.Sleep(millisecondsTimeout),
         // Specify a maximum degree of parallelism.
         new ExecutionDataflowBlockOptions
         {
            MaxDegreeOfParallelism = maxDegreeOfParallelism
         });

      // Compute the time that it takes for several messages to
      // flow through the dataflow block.

      Stopwatch stopwatch = new Stopwatch();
      stopwatch.Start();

      for (int i = 0; i < messageCount; i++)
      {
         workerBlock.Post(1000);
      }
      workerBlock.Complete();

      // Wait for all messages to propagate through the network.
      workerBlock.Completion.Wait();

      // Stop the timer and return the elapsed number of milliseconds.
      stopwatch.Stop();
      return stopwatch.Elapsed;
   }
   static void Main(string[] args)
   {
      int processorCount = Environment.ProcessorCount;
      int messageCount = processorCount;

      // Print the number of processors on this computer.
      Console.WriteLine($"Processor count = {processorCount}.");

      TimeSpan elapsed;

      // Perform two dataflow computations and print the elapsed
      // time required for each.

      // This call specifies a maximum degree of parallelism of 1.
      // This causes the dataflow block to process messages serially.
      elapsed = TimeDataflowComputations(1, messageCount);
      Console.WriteLine("Degree of parallelism = {0}; message count = {1}; " +
         "elapsed time = {2}ms.", 1, messageCount, (int)elapsed.TotalMilliseconds);

      // Perform the computations again. This time, specify the number of
      // processors as the maximum degree of parallelism. This causes
      // multiple messages to be processed in parallel.
      elapsed = TimeDataflowComputations(processorCount, messageCount);
      Console.WriteLine("Degree of parallelism = {0}; message count = {1}; " +
         "elapsed time = {2}ms.", processorCount, messageCount, (int)elapsed.TotalMilliseconds);
   }
}

/* Sample output:
Processor count = 4.
Degree of parallelism = 1; message count = 4; elapsed time = 4032ms.
Degree of parallelism = 4; message count = 4; elapsed time = 1001ms.
*/
```

## Robust Programming

 By default, each predefined dataflow block propagates out messages in the order in which the messages are received.  Although multiple messages are processed simultaneously when you specify a maximum degree of parallelism that is greater than 1, they are still propagated out in the order in which they are received.

 Because the `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions.MaxDegreeOfParallelism` property represents the maximum degree of parallelism, the dataflow block might execute with a lesser degree of parallelism than you specify. The dataflow block can use a lesser degree of parallelism to meet its functional requirements or to account for a lack of available system resources. A dataflow block never chooses a greater degree of parallelism than you specify.

## See also

- Dataflow
