---
title: "Channels (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/channels.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Channels (part 2 of 2)

## Common usage patterns

There are several usage patterns for channels:

- Creation patterns
- Producer patterns
- Consumer patterns

The API is designed to be simple, consistent, and as flexible as possible. All of the asynchronous methods return a `ValueTask` (or `ValueTask<bool>`) that represents a lightweight asynchronous operation that can avoid allocating if the operation completes synchronously and potentially even asynchronously. Additionally, the API is designed to be composable, in that the creator of a channel makes promises about its intended usage. When a channel is created with certain parameters, the internal implementation can operate more efficiently knowing these promises.

### Creation patterns

Imagine that you're creating a producer/consumer solution for a global position system (GPS). You want to track the coordinates of a device over time. A sample coordinates object might look like this:

```csharp
﻿/// <summary>
/// A representation of a device's coordinates, 
/// which includes latitude and longitude.
/// </summary>
/// <param name="DeviceId">A unique device identifier.</param>
/// <param name="Latitude">The latitude of the device.</param>
/// <param name="Longitude">The longitude of the device.</param>
public readonly record struct Coordinates(
    Guid DeviceId,
    double Latitude,
    double Longitude);
```
#### Unbounded creation patterns

One common usage pattern is to create a default *unbounded* channel:

```csharp
var channel = Channel.CreateUnbounded<Coordinates>();
```
But instead, imagine that you want to create an unbounded channel with multiple producers and consumers. Set `SingleWriter = false` and `SingleReader = false` in the channel options:

```csharp
var channel = Channel.CreateUnbounded<Coordinates>(
    new UnboundedChannelOptions
    {
        SingleWriter = false,
        SingleReader = false,
        AllowSynchronousContinuations = true
    });
```
In this case, all writes are synchronous, even `WriteAsync`. This behavior occurs because an unbounded channel always has available room for a write immediately. However, by setting `AllowSynchronousContinuations` to `true`, the writes might end up doing work associated with a reader by executing their continuations. This setting doesn't affect the synchronicity of the operation.

#### Bounded creation patterns

With *bounded* channels, the configurability of the channel should be known to the consumer to help ensure proper consumption. That is, the consumer should know what behavior the channel exhibits when the configured bound is reached. The following examples show some of the common bounded creation patterns.

The simplest way to create a bounded channel is to specify a capacity. The following code creates a bounded channel with a max capacity of `1`.

```csharp
var channel = Channel.CreateBounded<Coordinates>(1);
```
Other options are available. Some options are the same as an unbounded channel, while others are specific to bounded channels. In the following code, the channel is created as a bounded channel that's limited to 1,000 items, with a single writer but many readers. Its full mode behavior is defined as `DropWrite`, which means that it drops the item being written if the channel is full.

```csharp
var channel = Channel.CreateBounded<Coordinates>(
    new BoundedChannelOptions(1_000)
    {
        SingleWriter = true,
        SingleReader = false,
        AllowSynchronousContinuations = false,
        FullMode = BoundedChannelFullMode.DropWrite
    });
```
To observe items that are dropped when using bounded channels, register an `itemDropped` callback:

```csharp
var channel = Channel.CreateBounded(
    new BoundedChannelOptions(10)
    {
        AllowSynchronousContinuations = true,
        FullMode = BoundedChannelFullMode.DropOldest
    },
    static void (Coordinates dropped) =>
        Console.WriteLine($"Coordinates dropped: {dropped}"));
```
Whenever the channel is full and a new item is added, the `itemDropped` callback is invoked. In this example, the provided callback writes the item to the console, but you're free to take any other action you want.

### Producer patterns

Imagine that the producer in this scenario is writing new coordinates to the channel. The producer can do this by calling `System.Threading.Channels.ChannelWriter`1.TryWrite*`:

```csharp
static void ProduceWithWhileAndTryWrite(
    ChannelWriter<Coordinates> writer, Coordinates coordinates)
{
    while (coordinates is { Latitude: < 90, Longitude: < 180 })
    {
        var tempCoordinates = coordinates with
        {
            Latitude = coordinates.Latitude + .5,
            Longitude = coordinates.Longitude + 1
        };

        if (writer.TryWrite(item: tempCoordinates))
        {
            coordinates = tempCoordinates;
        }
    }
}
```
The preceding producer code:

- Accepts the `Channel<Coordinates>.Writer` (`ChannelWriter<Coordinates>`) as an argument, along with the initial `Coordinates`.
- Defines a conditional `while` loop that attempts to move the coordinates using `TryWrite`.

An alternative producer might use the `WriteAsync` method:

```csharp
static async ValueTask ProduceWithWhileWriteAsync(
    ChannelWriter<Coordinates> writer, Coordinates coordinates)
{
    while (coordinates is { Latitude: < 90, Longitude: < 180 })
    {
        await writer.WriteAsync(
            item: coordinates = coordinates with
            {
                Latitude = coordinates.Latitude + .5,
                Longitude = coordinates.Longitude + 1
            });
    }

    writer.Complete();
}
```
Again, the `Channel<Coordinates>.Writer` is used within a `while` loop. But this time, the `System.Threading.Channels.ChannelWriter`1.WriteAsync*` method is called. The method continues only after the coordinates have been written. When the `while` loop exits, a call to `System.Threading.Channels.ChannelWriter`1.Complete*` is made, which signals that no more data is written to the channel.

Another producer pattern is to use the `System.Threading.Channels.ChannelWriter`1.WaitToWriteAsync*` method, consider the following code:

```csharp
static async ValueTask ProduceWithWaitToWriteAsync(
    ChannelWriter<Coordinates> writer, Coordinates coordinates)
{
    while (coordinates is { Latitude: < 90, Longitude: < 180 } &&
        await writer.WaitToWriteAsync())
    {
        var tempCoordinates = coordinates with
        {
            Latitude = coordinates.Latitude + .5,
            Longitude = coordinates.Longitude + 1
        };

        if (writer.TryWrite(item: tempCoordinates))
        {
            coordinates = tempCoordinates;
        }

        await Task.Delay(TimeSpan.FromMilliseconds(10));
    }

    writer.Complete();
}
```
As part of the conditional `while`, the result of the `WaitToWriteAsync` call is used to determine whether to continue the loop.

### Consumer patterns

There are several common channel consumer patterns. When a channel is never ending, meaning it produces data indefinitely, the consumer could use a `while (true)` loop, and read data as it becomes available:

```csharp
static async ValueTask ConsumeWithWhileAsync(
    ChannelReader<Coordinates> reader)
{
    while (true)
    {
        // May throw ChannelClosedException if
        // the parent channel's writer signals complete.
        Coordinates coordinates = await reader.ReadAsync();
        Console.WriteLine(coordinates);
    }
}
```
> **Note:**
> This code throws an exception if the channel is closed.

An alternative consumer could avoid this concern by using a nested while loop, as shown in the following code:

```csharp
static async ValueTask ConsumeWithNestedWhileAsync(
    ChannelReader<Coordinates> reader)
{
    while (await reader.WaitToReadAsync())
    {
        while (reader.TryRead(out Coordinates coordinates))
        {
            Console.WriteLine(coordinates);
        }
    }
}
```
In the preceding code, the consumer waits to read data. Once the data is available, the consumer tries to read it. These loops continue to evaluate until the producer of the channel signals that it no longer has data to be read. With that said, when a producer is known to have a finite number of items it produces and it signals completion, the consumer can use `await foreach` semantics to iterate over the items:

```csharp
static async ValueTask ConsumeWithAwaitForeachAsync(
    ChannelReader<Coordinates> reader)
{
    await foreach (Coordinates coordinates in reader.ReadAllAsync())
    {
        Console.WriteLine(coordinates);
    }
}
```
The preceding code uses the `System.Threading.Channels.ChannelReader`1.ReadAllAsync*` method to read all of the coordinates from the channel.

## Multiple producers and consumers

Channels support multiple concurrent producers and consumers. To enable this, create a channel with `SingleWriter = false` and `SingleReader = false` in the channel options. You then fan-out writing across multiple producer tasks and fan-in reading across multiple consumer tasks.

```csharp
static async Task UseMultipleProducersAndConsumersAsync()
{
    Channel<Coordinates> channel = Channel.CreateUnbounded<Coordinates>(
        new UnboundedChannelOptions
        {
            SingleWriter = false,
            SingleReader = false
        });

    // Start three concurrent producer tasks.
    Task[] producerTasks = Enumerable.Range(0, 3)
        .Select(id => ProduceAsync(id, channel))
        .ToArray();

    // Start two concurrent consumer tasks.
    Task[] consumerTasks = Enumerable.Range(0, 2)
        .Select(_ => ConsumeAsync(channel))
        .ToArray();

    // Wait for all producers to finish, then mark the channel as complete.
    await Task.WhenAll(producerTasks);
    channel.Writer.Complete();

    // Wait for all consumers to finish.
    await Task.WhenAll(consumerTasks);

    static async Task ProduceAsync(int id, Channel<Coordinates> channel)
    {
        Coordinates coordinates = new(
            DeviceId: Guid.NewGuid(),
            Latitude: -90 + (id * 30),
            Longitude: -180 + (id * 60));

        while (coordinates is { Latitude: < 90, Longitude: < 180 })
        {
            coordinates = coordinates with
            {
                Latitude = coordinates.Latitude + 0.5,
                Longitude = coordinates.Longitude + 1
            };
                
            await channel.Writer.WriteAsync(coordinates);
        }
    }

    static async Task ConsumeAsync(Channel<Coordinates> channel)
    {
        await foreach (Coordinates coordinates in channel.Reader.ReadAllAsync())
        {
            Console.WriteLine(coordinates);
        }
    }
}
```
The preceding code:

- Creates an unbounded channel that explicitly supports multiple concurrent writers and readers.
- Starts three concurrent producer tasks, each writing a series of coordinates with a unique device identifier.
- Starts two concurrent consumer tasks, each reading from the same channel using `ReadAllAsync`.
- Waits for all producers to finish, then calls `System.Threading.Channels.ChannelWriter`1.Complete*` to signal that no more data is written to the channel.
- Waits for all consumers to finish draining the remaining data from the channel.

> **Tip:**
> With multiple producers, only call `channel.Writer.Complete()` after **all** producers finish writing. This signals that no more data is written, allowing `ReadAllAsync()` to complete after consuming all remaining items.

## See also

- On .NET show: Working with Channels in .NET
- .NET Blog: An Introduction to System.Threading.Channels
- Managed threading basics
