---
title: "Channel class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Channels/Channel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Channel class

Namespace: `System.Threading.Channels`

```csharp
public static class Channel
```

Provides static methods for creating channels.

To be added.

## Channel.CreateBounded<T>(Int32) method

```csharp
public static System.Threading.Channels.Channel<T> CreateBounded<T> (int capacity);
```

Creates a channel with the specified maximum capacity.

Parameters:

- `T`: Specifies the type of data in the channel.
- `capacity`: The maximum number of items the channel may store.

Returns: The created channel.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is negative.

Channels created with this method apply the `BoundedChannelFullMode.Wait`
behavior and prohibit continuations from running synchronously.

## Channel.CreateBounded<T>(BoundedChannelOptions) method

```csharp
public static System.Threading.Channels.Channel<T> CreateBounded<T> (System.Threading.Channels.BoundedChannelOptions options);
```

Creates a channel with the specified maximum capacity.

Parameters:

- `T`: Specifies the type of data in the channel.
- `options`: Options that guide the behavior of the channel.

Returns: The created channel.

Exceptions:

- `ArgumentNullException`: `options` is `null`.

To be added.

## Channel.CreateBounded<T>(BoundedChannelOptions, Action<T>) method

```csharp
public static System.Threading.Channels.Channel<T> CreateBounded<T> (System.Threading.Channels.BoundedChannelOptions options, Action<T>? itemDropped);
```

Creates a channel subject to the provided options.

Parameters:

- `T`: Specifies the type of data in the channel.
- `options`: Options that guide the behavior of the channel.
- `itemDropped`: Delegate that will be called when item is being dropped from channel. See `BoundedChannelFullMode`.

Returns: The created channel.

Exceptions:

- `ArgumentNullException`: `options` is `null`.

To be added.

## Channel.CreateUnbounded<T>() method

```csharp
public static System.Threading.Channels.Channel<T> CreateUnbounded<T> ();
```

Creates an unbounded channel usable by any number of readers and writers concurrently.

Parameters:

- `T`: The type of data in the channel.

Returns: The created channel.

To be added.

## Channel.CreateUnbounded<T>(UnboundedChannelOptions) method

```csharp
public static System.Threading.Channels.Channel<T> CreateUnbounded<T> (System.Threading.Channels.UnboundedChannelOptions options);
```

Creates an unbounded channel subject to the provided options.

Parameters:

- `T`: Specifies the type of data in the channel.
- `options`: Options that guide the behavior of the channel.

Returns: The created channel.

Exceptions:

- `ArgumentNullException`: `options` is `null`.

To be added.

## Channel.CreateUnboundedPrioritized<T>() method

```csharp
public static System.Threading.Channels.Channel<T> CreateUnboundedPrioritized<T> ();
```

Creates an unbounded prioritized channel usable by any number of readers and writers concurrently.

Parameters:

- `T`: To be added.

Returns: The created channel.

`Comparer<T>.Default` is used to determine priority of elements.
The next item read from the channel will be the element available in the channel with the lowest priority value.

## Channel.CreateUnboundedPrioritized<T>(UnboundedPrioritizedChannelOptions<T>) method

```csharp
public static System.Threading.Channels.Channel<T> CreateUnboundedPrioritized<T> (System.Threading.Channels.UnboundedPrioritizedChannelOptions<T> options);
```

Creates an unbounded prioritized channel subject to the provided options.

Parameters:

- `T`: Specifies the type of data in the channel.
- `options`: Options that guide the behavior of the channel.

Returns: The created channel.

The `UnboundedPrioritizedChannelOptions<T>.Comparer` of the supplied `options` is used to determine priority of elements, or `Comparer<T>.Default` if the provided comparer is `null`.
The next item read from the channel will be the element available in the channel with the lowest priority value.
