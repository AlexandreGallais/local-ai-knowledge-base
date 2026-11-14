---
title: "How to: Use JoinBlock to Read Data From Multiple Sources"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-use-joinblock-to-read-data-from-multiple-sources.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Use JoinBlock to Read Data From Multiple Sources

This document explains how to use the `System.Threading.Tasks.Dataflow.JoinBlock`2` class to perform an operation when data is available from multiple sources. It also demonstrates how to use non-greedy mode to enable multiple join blocks to share a data source more efficiently.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

## Example

 The following example defines three resource types, `NetworkResource`, `FileResource`, and `MemoryResource`, and performs operations when resources become available. This example requires a `NetworkResource` and `MemoryResource` pair in order to perform the first operation and a `FileResource` and `MemoryResource` pair in order to perform the second operation. To enable these operations to occur when all required resources are available, this example uses the `System.Threading.Tasks.Dataflow.JoinBlock`2` class. When a `System.Threading.Tasks.Dataflow.JoinBlock`2` object receives data from all sources, it propagates that data to its target, which in this example is an `System.Threading.Tasks.Dataflow.ActionBlock`1` object. Both `System.Threading.Tasks.Dataflow.JoinBlock`2` objects read from a shared pool of `MemoryResource` objects.

 ```csharp
using System;
using System.Threading;
using System.Threading.Tasks.Dataflow;

// Demonstrates how to use non-greedy join blocks to distribute
// resources among a dataflow network.
class Program
{
   // Represents a resource. A derived class might represent
   // a limited resource such as a memory, network, or I/O
   // device.
   abstract class Resource
   {
   }

   // Represents a memory resource. For brevity, the details of
   // this class are omitted.
   class MemoryResource : Resource
   {
   }

   // Represents a network resource. For brevity, the details of
   // this class are omitted.
   class NetworkResource : Resource
   {
   }

   // Represents a file resource. For brevity, the details of
   // this class are omitted.
   class FileResource : Resource
   {
   }

   static void Main(string[] args)
   {
      // Create three BufferBlock<T> objects. Each object holds a different
      // type of resource.
      var networkResources = new BufferBlock<NetworkResource>();
      var fileResources = new BufferBlock<FileResource>();
      var memoryResources = new BufferBlock<MemoryResource>();

      // Create two non-greedy JoinBlock<T1, T2> objects.
      // The first join works with network and memory resources;
      // the second pool works with file and memory resources.

      var joinNetworkAndMemoryResources =
         new JoinBlock<NetworkResource, MemoryResource>(
            new GroupingDataflowBlockOptions
            {
               Greedy = false
            });

      var joinFileAndMemoryResources =
         new JoinBlock<FileResource, MemoryResource>(
            new GroupingDataflowBlockOptions
            {
               Greedy = false
            });

      // Create two ActionBlock<T> objects.
      // The first block acts on a network resource and a memory resource.
      // The second block acts on a file resource and a memory resource.

      var networkMemoryAction =
         new ActionBlock<Tuple<NetworkResource, MemoryResource>>(
            data =>
            {
               // Perform some action on the resources.

               // Print a message.
               Console.WriteLine("Network worker: using resources...");

               // Simulate a lengthy operation that uses the resources.
               Thread.Sleep(new Random().Next(500, 2000));

               // Print a message.
               Console.WriteLine("Network worker: finished using resources...");

               // Release the resources back to their respective pools.
               networkResources.Post(data.Item1);
               memoryResources.Post(data.Item2);
            });

      var fileMemoryAction =
         new ActionBlock<Tuple<FileResource, MemoryResource>>(
            data =>
            {
               // Perform some action on the resources.

               // Print a message.
               Console.WriteLine("File worker: using resources...");

               // Simulate a lengthy operation that uses the resources.
               Thread.Sleep(new Random().Next(500, 2000));

               // Print a message.
               Console.WriteLine("File worker: finished using resources...");

               // Release the resources back to their respective pools.
               fileResources.Post(data.Item1);
               memoryResources.Post(data.Item2);
            });

      // Link the resource pools to the JoinBlock<T1, T2> objects.
      // Because these join blocks operate in non-greedy mode, they do not
      // take the resource from a pool until all resources are available from
      // all pools.

      networkResources.LinkTo(joinNetworkAndMemoryResources.Target1);
      memoryResources.LinkTo(joinNetworkAndMemoryResources.Target2);

      fileResources.LinkTo(joinFileAndMemoryResources.Target1);
      memoryResources.LinkTo(joinFileAndMemoryResources.Target2);

      // Link the JoinBlock<T1, T2> objects to the ActionBlock<T> objects.

      joinNetworkAndMemoryResources.LinkTo(networkMemoryAction);
      joinFileAndMemoryResources.LinkTo(fileMemoryAction);

      // Populate the resource pools. In this example, network and
      // file resources are more abundant than memory resources.

      networkResources.Post(new NetworkResource());
      networkResources.Post(new NetworkResource());
      networkResources.Post(new NetworkResource());

      memoryResources.Post(new MemoryResource());

      fileResources.Post(new FileResource());
      fileResources.Post(new FileResource());
      fileResources.Post(new FileResource());

      // Allow data to flow through the network for several seconds.
      Thread.Sleep(10000);
   }
}

/* Sample output:
File worker: using resources...
File worker: finished using resources...
Network worker: using resources...
Network worker: finished using resources...
File worker: using resources...
File worker: finished using resources...
Network worker: using resources...
Network worker: finished using resources...
File worker: using resources...
File worker: finished using resources...
File worker: using resources...
File worker: finished using resources...
Network worker: using resources...
Network worker: finished using resources...
Network worker: using resources...
Network worker: finished using resources...
File worker: using resources...
*/
```

 To enable efficient use of the shared pool of `MemoryResource` objects, this example specifies a `System.Threading.Tasks.Dataflow.GroupingDataflowBlockOptions` object that has the `System.Threading.Tasks.Dataflow.GroupingDataflowBlockOptions.Greedy` property set to `False` to create `System.Threading.Tasks.Dataflow.JoinBlock`2` objects that act in non-greedy mode. A non-greedy join block postpones all incoming messages until one is available from each source. If any of the postponed messages were accepted by another block, the join block restarts the process. Non-greedy mode enables join blocks that share one or more source blocks to make forward progress as the other blocks wait for data. In this example, if a `MemoryResource` object is added to the `memoryResources` pool, the first join block to receive its second data source can make forward progress. If this example were to use greedy mode, which is the default, one join block might take the `MemoryResource` object and wait for the second resource to become available. However, if the other join block has its second data source available, it cannot make forward progress because the `MemoryResource` object has been taken by the other join block.

## Robust Programming

 The use of non-greedy joins can also help you prevent deadlock in your application. In a software application, *deadlock* occurs when two or more processes each hold a resource and mutually wait for another process to release some other resource. Consider an application that defines two `System.Threading.Tasks.Dataflow.JoinBlock`2` objects. Both objects each read data from two shared source blocks. In greedy mode, if one join block reads from the first source and the second join block reads from the second source, the application might deadlock because both join blocks mutually wait for the other to release its resource. In non-greedy mode, each join block reads from its sources only when all data is available, and therefore, the risk of deadlock is eliminated.

## See also

- Dataflow
