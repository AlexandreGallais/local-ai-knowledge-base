---
title: "How to: Write and read messages from a Dataflow block"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-write-messages-to-and-read-messages-from-a-dataflow-block.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Write and read messages from a Dataflow block

This article describes how to use the Task Parallel Library (TPL) Dataflow Library to write messages to and read messages from a dataflow block. The TPL Dataflow Library provides both synchronous and asynchronous methods for writing messages to and reading messages from a dataflow block. This article shows how to use the `System.Threading.Tasks.Dataflow.BufferBlock`1` class. The `System.Threading.Tasks.Dataflow.BufferBlock`1` class buffers messages and behaves as both a message source and a message target.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

## Writing and reading synchronously

The following example uses the `System.Threading.Tasks.Dataflow.DataflowBlock.Post*` method to write to a `System.Threading.Tasks.Dataflow.BufferBlock`1` dataflow block and the `System.Threading.Tasks.Dataflow.DataflowBlock.Receive*` method to read from the same object.

```csharp
var bufferBlock = new BufferBlock<int>();

// Post several messages to the block.
for (int i = 0; i < 3; i++)
{
    bufferBlock.Post(i);
}

// Receive the messages back from the block.
for (int i = 0; i < 3; i++)
{
    Console.WriteLine(bufferBlock.Receive());
}

// Output:
//   0
//   1
//   2
```

You can also use the `System.Threading.Tasks.Dataflow.IReceivableSourceBlock`1.TryReceive*` method to read from a dataflow block, as shown in the following example. The `System.Threading.Tasks.Dataflow.IReceivableSourceBlock`1.TryReceive*` method does not block the current thread and is useful when you occasionally poll for data.

```csharp
// Post more messages to the block.
for (int i = 0; i < 3; i++)
{
    bufferBlock.Post(i);
}

// Receive the messages back from the block.
while (bufferBlock.TryReceive(out int value))
{
    Console.WriteLine(value);
}

// Output:
//   0
//   1
//   2
```

Because the `System.Threading.Tasks.Dataflow.DataflowBlock.Post*` method acts synchronously, the `System.Threading.Tasks.Dataflow.BufferBlock`1` object in the previous examples receives all data before the second loop reads data. The following example extends the first example by using `System.Threading.Tasks.Task.WhenAll(System.Threading.Tasks.Task[])` to read from and write to the message block concurrently. Because `System.Threading.Tasks.Task.WhenAll*` awaits all the asynchronous operations that are executing concurrently, the values are not written to the `System.Threading.Tasks.Dataflow.BufferBlock`1` object in any specific order.

```csharp
// Write to and read from the message block concurrently.
var post01 = Task.Run(() =>
{
    bufferBlock.Post(0);
    bufferBlock.Post(1);
});
var receive = Task.Run(() =>
{
    for (int i = 0; i < 3; i++)
    {
        Console.WriteLine(bufferBlock.Receive());
    }
});
var post2 = Task.Run(() =>
{
    bufferBlock.Post(2);
});

await Task.WhenAll(post01, receive, post2);

// Output:
//   0
//   1
//   2
```

## Writing and reading asynchronously

The following example uses the `System.Threading.Tasks.Dataflow.DataflowBlock.SendAsync*` method to asynchronously write to a `System.Threading.Tasks.Dataflow.BufferBlock`1` object and the `System.Threading.Tasks.Dataflow.DataflowBlock.ReceiveAsync*` method to asynchronously read from the same object. This example uses the async and await operators (Async and Await in Visual Basic) to asynchronously send data to and read data from the target block. The `System.Threading.Tasks.Dataflow.DataflowBlock.SendAsync*` method is useful when you must enable a dataflow block to postpone messages. The `System.Threading.Tasks.Dataflow.DataflowBlock.ReceiveAsync*` method is useful when you want to act on data when that data becomes available. For more information about how messages propagate among message blocks, see the section Message Passing in Dataflow.

```csharp
// Post more messages to the block asynchronously.
for (int i = 0; i < 3; i++)
{
    await bufferBlock.SendAsync(i);
}

// Asynchronously receive the messages back from the block.
for (int i = 0; i < 3; i++)
{
    Console.WriteLine(await bufferBlock.ReceiveAsync());
}

// Output:
//   0
//   1
//   2
```

## A complete example

The following example shows all of the code for this article.

```csharp
using System;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

// Demonstrates a how to write to and read from a dataflow block.
class DataflowReadWrite
{
    // Demonstrates asynchronous dataflow operations.
    static async Task AsyncSendReceive(BufferBlock<int> bufferBlock)
    {
        // Post more messages to the block asynchronously.
        for (int i = 0; i < 3; i++)
        {
            await bufferBlock.SendAsync(i);
        }

        // Asynchronously receive the messages back from the block.
        for (int i = 0; i < 3; i++)
        {
            Console.WriteLine(await bufferBlock.ReceiveAsync());
        }

        // Output:
        //   0
        //   1
        //   2
    }

    static async Task Main()
    {
        var bufferBlock = new BufferBlock<int>();

        // Post several messages to the block.
        for (int i = 0; i < 3; i++)
        {
            bufferBlock.Post(i);
        }

        // Receive the messages back from the block.
        for (int i = 0; i < 3; i++)
        {
            Console.WriteLine(bufferBlock.Receive());
        }

        // Output:
        //   0
        //   1
        //   2

        // Post more messages to the block.
        for (int i = 0; i < 3; i++)
        {
            bufferBlock.Post(i);
        }

        // Receive the messages back from the block.
        while (bufferBlock.TryReceive(out int value))
        {
            Console.WriteLine(value);
        }

        // Output:
        //   0
        //   1
        //   2

        // Write to and read from the message block concurrently.
        var post01 = Task.Run(() =>
        {
            bufferBlock.Post(0);
            bufferBlock.Post(1);
        });
        var receive = Task.Run(() =>
        {
            for (int i = 0; i < 3; i++)
            {
                Console.WriteLine(bufferBlock.Receive());
            }
        });
        var post2 = Task.Run(() =>
        {
            bufferBlock.Post(2);
        });

        await Task.WhenAll(post01, receive, post2);

        // Output:
        //   0
        //   1
        //   2

        // Demonstrate asynchronous dataflow operations.
        await AsyncSendReceive(bufferBlock);
    }
}
```

## Next steps

This example shows how to read from and write to a message block directly. You can also connect dataflow blocks to form *pipelines*, which are linear sequences of dataflow blocks, or *networks*, which are graphs of dataflow blocks. In a pipeline or network, sources asynchronously propagate data to targets as that data becomes available. For an example that creates a basic <example-value> pipeline, see Walkthrough: Creating a Dataflow Pipeline. For an example that creates a more complex dataflow network, see Walkthrough: Using Dataflow in a Windows Forms Application.

## See also

- Dataflow (Task Parallel Library)
