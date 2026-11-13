---
title: "What's new in .NET libraries for .NET 9 (part 6 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-9/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 9 (part 6 of 6)

## Threading

The threading APIs include improvements for iterating through tasks, for prioritized channels, which can order their elements instead of being first-in-first-out (FIFO), and `Interlocked.CompareExchange` for more types.

### `Task.WhenEach`

A variety of helpful new APIs have been added for working with `System.Threading.Tasks.Task`1` objects. The new `System.Threading.Tasks.Task.WhenEach*` method lets you iterate through tasks as they complete using an `await foreach` statement. You no longer need to do things like repeatedly call `System.Threading.Tasks.Task.WaitAny*` on a set of tasks to pick off the next one that completes.

The following code makes multiple `HttpClient` calls and operates on their results as they complete.

```csharp
﻿using System;
using System.Net.Http;
using System.Threading.Tasks;

internal class TaskExamples
{
    public static async void RunIt()
    {
        using HttpClient http = new();

        Task<string> dotnet = http.GetStringAsync("http://dot.net");
        Task<string> bing = http.GetStringAsync("http://www.bing.com");
        Task<string> ms = http.GetStringAsync("http://microsoft.com");

        await foreach (Task<string> t in Task.WhenEach(bing, dotnet, ms))
        {
            Console.WriteLine(t.Result);
        }
    }
}
```
### Prioritized unbounded channel

The `System.Threading.Channels` namespace lets you create first-in-first-out (FIFO) channels using the `System.Threading.Channels.Channel.CreateBounded*` and `System.Threading.Channels.Channel.CreateUnbounded*` methods. With FIFO channels, elements are read from the channel in the order they were written to it. In .NET 9, the new `System.Threading.Channels.Channel.CreateUnboundedPrioritized*` method has been added, which orders the elements such that the next element read from the channel is the one deemed to be most important, according to either `System.Collections.Generic.Comparer`1.Default` or a custom `System.Collections.Generic.IComparer`1`.

The following example uses the new method to create a channel that outputs the numbers 1 through 5 in order, even though they're written to the channel in a different order.

```csharp
﻿using System;
using System.Threading.Channels;

internal class Channels
{
    public static async void RunIt()
    {
        Channel<int> c = Channel.CreateUnboundedPrioritized<int>();

        await c.Writer.WriteAsync(1);
        await c.Writer.WriteAsync(5);
        await c.Writer.WriteAsync(2);
        await c.Writer.WriteAsync(4);
        await c.Writer.WriteAsync(3);
        c.Writer.Complete();

        while (await c.Reader.WaitToReadAsync())
        {
            while (c.Reader.TryRead(out int item))
            {
                Console.Write($"{item} ");
            }
        }

        // Output: 1 2 3 4 5
    }
}
```
### Interlocked.CompareExchange for more types

In previous versions of .NET, `System.Threading.Interlocked.Exchange*` and `System.Threading.Interlocked.CompareExchange*` had overloads for working with `int`, `uint`, `long`, `ulong`, `nint`, `nuint`, `float`, `double`, and `object`, as well as a generic overload for working with any reference type `T`. In .NET 9, there are new overloads for atomically working with `byte`, `sbyte`, `short`, and `ushort`. Also, the generic constraint on the generic `Interlocked.Exchange<T>` and `Interlocked.CompareExchange<T>` overloads has been removed, so those methods are no longer constrained to only work with reference types. They can now work with any primitive type, which includes all of the aforementioned types as well as `bool` and `char`, as well as any `enum` type.
