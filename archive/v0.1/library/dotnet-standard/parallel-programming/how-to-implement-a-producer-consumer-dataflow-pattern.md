---
title: "How to: Implement a producer-consumer dataflow pattern"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-implement-a-producer-consumer-dataflow-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a producer-consumer dataflow pattern

In this article, you'll learn how to use the TPL dataflow library to implement a producer-consumer pattern. In this pattern, the *producer* sends messages to a message block, and the *consumer* reads messages from that block.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

## Example

The following example demonstrates a basic <example-value> model that uses dataflow. The `Produce` method writes arrays that contain random bytes of data to a `System.Threading.Tasks.Dataflow.ITargetBlock`1` object and the `Consume` method reads bytes from a `System.Threading.Tasks.Dataflow.ISourceBlock`1` object. By acting on the `System.Threading.Tasks.Dataflow.ISourceBlock`1` and `System.Threading.Tasks.Dataflow.ITargetBlock`1` interfaces, instead of their derived types, you can write reusable code that can act on a variety of dataflow block types. This example uses the `System.Threading.Tasks.Dataflow.BufferBlock`1` class. Because the `System.Threading.Tasks.Dataflow.BufferBlock`1` class acts as both a source block and as a target block, the producer and the consumer can use a shared object to transfer data.

 The `Produce` method calls the `System.Threading.Tasks.Dataflow.DataflowBlock.Post*` method in a loop to synchronously write data to the target block. After the `Produce` method writes all data to the target block, it calls the `System.Threading.Tasks.Dataflow.IDataflowBlock.Complete*` method to indicate that the block will never have additional data available. The `Consume` method uses the async and await operators (Async and Await in Visual Basic) to asynchronously compute the total number of bytes that are received from the `System.Threading.Tasks.Dataflow.ISourceBlock`1` object. To act asynchronously, the `Consume` method calls the `System.Threading.Tasks.Dataflow.DataflowBlock.OutputAvailableAsync*` method to receive a notification when the source block has data available and when the source block will never have additional data available.

 ```csharp
using System;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

class DataflowProducerConsumer
{
    static void Produce(ITargetBlock<byte[]> target)
    {
        var rand = new Random();

        for (int i = 0; i < 100; ++ i)
        {
            var buffer = new byte[1024];
            rand.NextBytes(buffer);
            target.Post(buffer);
        }

        target.Complete();
    }

    static async Task<int> ConsumeAsync(ISourceBlock<byte[]> source)
    {
        int bytesProcessed = 0;

        while (await source.OutputAvailableAsync())
        {
            byte[] data = await source.ReceiveAsync();
            bytesProcessed += data.Length;
        }

        return bytesProcessed;
    }

    static async Task Main()
    {
        var buffer = new BufferBlock<byte[]>();
        var consumerTask = ConsumeAsync(buffer);
        Produce(buffer);

        var bytesProcessed = await consumerTask;

        Console.WriteLine($"Processed {bytesProcessed:#,#} bytes.");
    }
}

// Sample  output:
//     Processed 102,400 bytes.

class Program2
{
    static async Task<int> ConsumeAsync(IReceivableSourceBlock<byte[]> source)
    {
        int bytesProcessed = 0;
        while (await source.OutputAvailableAsync())
        {
            while (source.TryReceive(out byte[] data))
            {
                bytesProcessed += data.Length;
            }
        }
        return bytesProcessed;
    }
}
```

## Robust programming

 The preceding example uses just one consumer to process the source data. If you have multiple consumers in your application, use the `System.Threading.Tasks.Dataflow.IReceivableSourceBlock`1.TryReceive*` method to read data from the source block, as shown in the following example.

 ```csharp
using System;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

class DataflowProducerConsumer
{
    static void Produce(ITargetBlock<byte[]> target)
    {
        var rand = new Random();

        for (int i = 0; i < 100; ++ i)
        {
            var buffer = new byte[1024];
            rand.NextBytes(buffer);
            target.Post(buffer);
        }

        target.Complete();
    }

    static async Task<int> ConsumeAsync(ISourceBlock<byte[]> source)
    {
        int bytesProcessed = 0;

        while (await source.OutputAvailableAsync())
        {
            byte[] data = await source.ReceiveAsync();
            bytesProcessed += data.Length;
        }

        return bytesProcessed;
    }

    static async Task Main()
    {
        var buffer = new BufferBlock<byte[]>();
        var consumerTask = ConsumeAsync(buffer);
        Produce(buffer);

        var bytesProcessed = await consumerTask;

        Console.WriteLine($"Processed {bytesProcessed:#,#} bytes.");
    }
}

// Sample  output:
//     Processed 102,400 bytes.

class Program2
{
    static async Task<int> ConsumeAsync(IReceivableSourceBlock<byte[]> source)
    {
        int bytesProcessed = 0;
        while (await source.OutputAvailableAsync())
        {
            while (source.TryReceive(out byte[] data))
            {
                bytesProcessed += data.Length;
            }
        }
        return bytesProcessed;
    }
}
```

 The `System.Threading.Tasks.Dataflow.IReceivableSourceBlock`1.TryReceive*` method returns `False` when no data is available. When multiple consumers must access the source block concurrently, this mechanism guarantees that data is still available after the call to `System.Threading.Tasks.Dataflow.DataflowBlock.OutputAvailableAsync*`.

## See also

- Dataflow
