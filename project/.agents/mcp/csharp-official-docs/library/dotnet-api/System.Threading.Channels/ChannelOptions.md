---
title: "ChannelOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Channels/ChannelOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ChannelOptions class

Namespace: `System.Threading.Channels`

```csharp
public abstract class ChannelOptions
```

Provides options that control the behavior of channel instances.

To be added.

## ChannelOptions.ChannelOptions() constructor

```csharp
protected ChannelOptions ();
```

Initializes an instance of the `ChannelOptions` class.

To be added.

## ChannelOptions.AllowSynchronousContinuations property

```csharp
public bool AllowSynchronousContinuations { get; set; }
```

`true` if operations performed on a channel may synchronously invoke continuations subscribed to
notifications of pending async operations; `false` if all continuations should be invoked asynchronously.

Returns: To be added.

Setting this option to `true` can provide measurable throughput improvements by avoiding
scheduling additional work items. However, it may come at the cost of reduced parallelism, as for example a producer
may then be the one to execute work associated with a consumer, and if not done thoughtfully, this can lead
to unexpected interactions. The default is `false`.

## ChannelOptions.SingleReader property

```csharp
public bool SingleReader { get; set; }
```

`true` readers from the channel guarantee that there will only ever be at most one read operation at a time;
`false` if no such constraint is guaranteed.

Returns: To be added.

If `true`, the channel may be able to optimize certain operations based on knowing about the single-reader guarantee.
The default is `false`.

## ChannelOptions.SingleWriter property

```csharp
public bool SingleWriter { get; set; }
```

`true` if writers to the channel guarantee that there will only ever be at most one write operation
at a time; `false` if no such constraint is guaranteed.

Returns: To be added.

If `true`, the channel may be able to optimize certain operations based on knowing about the single-writer guarantee.
The default is `false`.
