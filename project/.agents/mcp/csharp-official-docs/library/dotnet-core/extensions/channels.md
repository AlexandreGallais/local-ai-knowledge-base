---
title: "Channels (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/channels.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.Threading.Channels library

The `System.Threading.Channels` namespace provides a set of synchronization data structures for passing data between producers and consumers asynchronously. The library targets .NET, .NET Standard, and .NET Framework, and works on all .NET implementations.

This library is available in the 📦 System.Threading.Channels NuGet package. However, if you're using .NET Core 3.0 or later, the package is included as part of the shared framework.

## Producer/consumer conceptual programming model

Channels are an implementation of the producer/consumer conceptual programming model. In this programming model, producers asynchronously produce data, and consumers asynchronously consume that data. In other words, this model passes data from one party to another through a first-in first-out ("FIFO") queue. Think of channels as any other common generic collection type, such as a `List<T>`. The primary difference is that this collection manages synchronization and provides various consumption models through factory creation options. These options control the behavior of the channels, such as:

- How many elements they're allowed to store and what happens if that limit is reached.
- Whether the channel is accessed by multiple producers or multiple consumers concurrently.

## Basic usage

The following example demonstrates the basic usage of a channel, where a producer writes items and a consumer reads them:

```csharp
static async Task BasicUsageAsync()
{
    Channel<int> channel = Channel.CreateUnbounded<int>();

    Task producer = ProduceAsync(channel.Writer);
    Task consumer = ConsumeAsync(channel.Reader);

    await Task.WhenAll(producer, consumer);

    static async Task ProduceAsync(ChannelWriter<int> writer)
    {
        for (int i = 0; i < 5; i++)
        {
            await writer.WriteAsync(i);
        }

        writer.Complete();
    }

    static async Task ConsumeAsync(ChannelReader<int> reader)
    {
        await foreach (int item in reader.ReadAllAsync())
        {
            Console.WriteLine($"Received: {item}");
        }
    }
}
```
## Bounding strategies

Depending on how a `Channel<T>` is created, its reader and writer behave differently.

To create a channel that specifies a maximum capacity, call `System.Threading.Channels.Channel.CreateBounded*`. To create a channel that is used by any number of readers and writers concurrently, call `System.Threading.Channels.Channel.CreateUnbounded*`. Each bounding strategy exposes various creator-defined options, either `System.Threading.Channels.BoundedChannelOptions` or `System.Threading.Channels.UnboundedChannelOptions` respectively.

> **Note:**
> Regardless of the bounding strategy, a channel always throws a `System.Threading.Channels.ChannelClosedException` when it's used after it's been closed.

### Unbounded channels

To create an unbounded channel, call one of the `System.Threading.Channels.Channel.CreateUnbounded*` overloads:

```csharp
var channel = Channel.CreateUnbounded<T>();
```

When you create an unbounded channel, by default, the channel can be used by any number of readers and writers concurrently. Alternatively, you can specify nondefault behavior when creating an unbounded channel by providing an `UnboundedChannelOptions` instance. The channel's capacity is unbounded and all writes are performed synchronously. For more examples, see Unbounded creation patterns.

### Bounded channels

To create a bounded channel, call one of the `System.Threading.Channels.Channel.CreateBounded*` overloads:

```csharp
var channel = Channel.CreateBounded<T>(7);
```

The preceding code creates a channel that has a maximum capacity of `7` items. When you create a bounded channel, the channel is bound to a maximum capacity. When the bound is reached, the default behavior is that the channel asynchronously blocks the producer until space becomes available. You can configure this behavior by specifying an option when you create the channel. Bounded channels can be created with any capacity value greater than zero. For other examples, see Bounded creation patterns.

#### Full mode behavior

When using a bounded channel, you can specify the behavior the channel adheres to when the configured bound is reached. The following table lists the full mode behaviors for each `System.Threading.Channels.BoundedChannelFullMode` value:

| Value | Behavior |
|-------|----------|
| `System.Threading.Channels.BoundedChannelFullMode.Wait` | This is the default value. Calls to `WriteAsync` wait for space to be available in order to complete the write operation. Calls to `TryWrite` return `false` immediately. |
| `System.Threading.Channels.BoundedChannelFullMode.DropNewest` | Removes and ignores the newest item in the channel in order to make room for the item being written. |
| `System.Threading.Channels.BoundedChannelFullMode.DropOldest` | Removes and ignores the oldest item in the channel in order to make room for the item being written. |
| `System.Threading.Channels.BoundedChannelFullMode.DropWrite` | Drops the item being written. |

> **Important:**
> Whenever a `System.Threading.Channels.Channel`2.Writer*` produces faster than a `System.Threading.Channels.Channel`2.Reader*` can consume, the channel's writer experiences back pressure.

## Producer APIs

The producer functionality is exposed on the `System.Threading.Channels.Channel`2.Writer*`. The producer APIs and expected behavior are detailed in the following table:

| API | Expected behavior |
|-----|-------------------|
| `System.Threading.Channels.ChannelWriter`1.Complete*` | Marks the channel as being complete, meaning no more items are written to it. |
| `System.Threading.Channels.ChannelWriter`1.TryComplete*` | Attempts to mark the channel as being completed, meaning no more data is written to it. |
| `System.Threading.Channels.ChannelWriter`1.TryWrite*` | Attempts to write the specified item to the channel. When used with an unbounded channel, this always returns `true` unless the channel's writer signals completion with either `System.Threading.Channels.ChannelWriter`1.Complete*`, or `System.Threading.Channels.ChannelWriter`1.TryComplete*`. |
| `System.Threading.Channels.ChannelWriter`1.WaitToWriteAsync*` | Returns a `System.Threading.Tasks.ValueTask`1` that completes when space is available to write an item. |
| `System.Threading.Channels.ChannelWriter`1.WriteAsync*` | Asynchronously writes an item to the channel. |

## Consumer APIs

The consumer functionality is exposed on the `System.Threading.Channels.Channel`2.Reader*`. The consumer APIs and expected behavior are detailed in the following table:

| API | Expected behavior |
|-----|-------------------|
| `System.Threading.Channels.ChannelReader`1.ReadAllAsync*` | Creates an `System.Collections.Generic.IAsyncEnumerable`1` that enables reading all of the data from the channel. |
| `System.Threading.Channels.ChannelReader`1.ReadAsync*` | Asynchronously reads an item from the channel. |
| `System.Threading.Channels.ChannelReader`1.TryPeek*` | Attempts to peek at an item from the channel. |
| `System.Threading.Channels.ChannelReader`1.TryRead*` | Attempts to read an item from the channel. |
| `System.Threading.Channels.ChannelReader`1.WaitToReadAsync*` | Returns a `System.Threading.Tasks.ValueTask`1` that completes when data is available to read. |
