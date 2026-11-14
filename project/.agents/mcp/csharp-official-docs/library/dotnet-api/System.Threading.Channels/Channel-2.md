---
title: "Channel<TWrite,TRead> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Channels/Channel`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Channel<TWrite,TRead> class

Namespace: `System.Threading.Channels`

```csharp
public abstract class Channel<TWrite,TRead>
```

Provides a base class for channels that support reading elements of type `TRead` and writing elements of type `TWrite`.

Parameters:

- `TWrite`: Specifies the type of data that may be written to the channel.
- `TRead`: Specifies the type of data that may be read from the channel.

To be added.

## Channel<TWrite,TRead>.Channel() constructor

```csharp
protected Channel ();
```

Initializes an instance of the `Channel<T1,T2>` class.

To be added.

## Channel<TWrite,TRead>.Reader property

```csharp
public System.Threading.Channels.ChannelReader<TRead> Reader { get; protected set; }
```

Gets the readable half of this channel.

Returns: To be added.

To be added.

## Channel<TWrite,TRead>.Writer property

```csharp
public System.Threading.Channels.ChannelWriter<TWrite> Writer { get; protected set; }
```

Gets the writable half of this channel.

Returns: To be added.

To be added.

## Channel<TWrite,TRead>.op_Implicit(Channel<TWrite,TRead>) method

```csharp
public static implicit operator System.Threading.Channels.ChannelReader<TRead> (System.Threading.Channels.Channel<TWrite,TRead> channel);
```

Implicit cast from a `Channel<T1,T2>` to its readable half.

Parameters:

- `channel`: The `Channel<T1,T2>` being cast.

Returns: The readable half.

To be added.

## Channel<TWrite,TRead>.op_Implicit(Channel<TWrite,TRead>) method

```csharp
public static implicit operator System.Threading.Channels.ChannelWriter<TWrite> (System.Threading.Channels.Channel<TWrite,TRead> channel);
```

Implicit cast from a `Channel<T1,T2>` to its writable half.

Parameters:

- `channel`: The `Channel<T1,T2>` being cast.

Returns: The writable half.

To be added.
