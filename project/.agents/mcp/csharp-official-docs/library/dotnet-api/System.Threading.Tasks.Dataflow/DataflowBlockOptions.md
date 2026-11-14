---
title: "DataflowBlockOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/DataflowBlockOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataflowBlockOptions class

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public class DataflowBlockOptions
```

Provides options used to configure the processing performed by dataflow blocks.

#### Remarks

`DataflowBlockOptions` is mutable and can be configured through its properties.

When specific configuration options are not set, the following defaults are used:

| Options            | Default                                              |
|--------------------|------------------------------------------------------|
| TaskScheduler      | `TaskScheduler.Default` |
| MaxMessagesPerTask | DataflowBlockOptions.Unbounded (-1)                  |
| CancellationToken  | `CancellationToken.None`      |
| BoundedCapacity    | DataflowBlockOptions.Unbounded (-1)                  |

Dataflow blocks capture the state of the options at their construction. Subsequent changes to the provided `DataflowBlockOptions` instance should not affect the behavior of a dataflow block.

## DataflowBlockOptions.DataflowBlockOptions() constructor

```csharp
public DataflowBlockOptions ();
```

Initializes a new `DataflowBlockOptions`.

To be added.

## DataflowBlockOptions.BoundedCapacity property

```csharp
public int BoundedCapacity { get; set; }
```

Gets or sets the maximum number of messages that may be buffered by the block.

Returns: The maximum number of messages. The default is -1, which indicates an unlimited number of messages.

To be added.

## DataflowBlockOptions.CancellationToken <example-value>

```csharp
public System.Threading.CancellationToken <example-value> { get; set; }
```

Gets or sets the  `CancellationToken` to monitor for cancellation requests.

Returns: The token.

To be added.

## DataflowBlockOptions.EnsureOrdered property

```csharp
public bool EnsureOrdered { get; set; }
```

Gets or sets a value that indicates whether ordered processing should be enforced on a block's handling of messages.

Returns: `true` if ordered processing should be enforced; otherwise, `false`. The default value is `true`.

#### Remarks

By default, dataflow blocks enforce ordering on the processing of messages. This means that a
block like `TransformBlock<T1,T2>` will ensure that messages are output in the same
order they were input, even if parallelism is employed by the block, and the processing of a message N finishes
after the processing of a subsequent message N+1 (the block will reorder the results to maintain the input
ordering prior to making those results available to a consumer).  Some blocks may allow this to be relaxed,
however.  Setting `EnsureOrdered` to false tells a block that it may relax this ordering if
it's able to do so.  This can be beneficial if making a processed result immediately available
is more important than maintaining the input-to-output ordering.

## DataflowBlockOptions.MaxMessagesPerTask property

```csharp
public int MaxMessagesPerTask { get; set; }
```

Gets or sets the maximum number of messages that may be processed per task.

Returns: The maximum number of messages. The default is -1, which indicates an unlimited number of messages.

To be added.

## DataflowBlockOptions.NameFormat property

```csharp
public string NameFormat { get; set; }
```

Gets or sets the format string to use when a block is queried for its name.

Returns: The format string to use when a block is queried for its name.

#### Remarks
The name format may contain up to two format items. {0} will be substituted with the block's name. {1} will be substituted with the block's Id, as is returned from the block's Completion.Id property.

## DataflowBlockOptions.TaskScheduler property

```csharp
public System.Threading.Tasks.TaskScheduler TaskScheduler { get; set; }
```

Gets or sets the `TaskScheduler` to use for scheduling tasks.

Returns: The task scheduler.

To be added.

## DataflowBlockOptions.Unbounded field

```csharp
public const int Unbounded = -1;
```

A constant used to specify an unlimited quantity for  `DataflowBlockOptions` members that provide an upper bound. This field is constant.

To be added.
