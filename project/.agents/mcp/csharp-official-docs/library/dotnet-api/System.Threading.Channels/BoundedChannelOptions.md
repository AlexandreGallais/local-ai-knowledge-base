---
title: "BoundedChannelOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Channels/BoundedChannelOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BoundedChannelOptions class

Namespace: `System.Threading.Channels`

```csharp
public sealed class BoundedChannelOptions : System.Threading.Channels.ChannelOptions
```

Provides options that control the behavior of bounded `Channel<T>` instances.

To be added.

## BoundedChannelOptions.BoundedChannelOptions(Int32) constructor

```csharp
public BoundedChannelOptions (int capacity);
```

Initializes the options.

Parameters:

- `capacity`: The maximum number of items the bounded channel may store.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is negative.

To be added.

## BoundedChannelOptions.Capacity property

```csharp
public int Capacity { get; set; }
```

Gets or sets the maximum number of items the bounded channel may store.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: `value` is negative.

To be added.

## BoundedChannelOptions.FullMode property

```csharp
public System.Threading.Channels.BoundedChannelFullMode FullMode { get; set; }
```

Gets or sets the behavior incurred by write operations when the channel is full.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: `value` is an invalid enum value.

To be added.
