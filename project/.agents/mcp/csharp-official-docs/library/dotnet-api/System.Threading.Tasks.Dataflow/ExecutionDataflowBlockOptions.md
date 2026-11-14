---
title: "ExecutionDataflowBlockOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/ExecutionDataflowBlockOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExecutionDataflowBlockOptions class

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public class ExecutionDataflowBlockOptions : System.Threading.Tasks.Dataflow.DataflowBlockOptions
```

Provides options used to configure the processing performed by dataflow blocks that process each message through the invocation of a user-provided delegate. These are dataflow blocks such as  `ActionBlock<T>` and  `TransformBlock<T1,T2>`.

#### Remarks

`ExecutionDataflowBlockOptions` is mutable and can be configured through its properties.

When specific configuration options are not set, the following defaults are used:

|Options|Default|
|-------------|-------------|
|TaskScheduler|`TaskScheduler.Default`|
|CancellationToken|`CancellationToken.None`|
|MaxMessagesPerTask|DataflowBlockOptions.Unbounded (-1)|
|BoundedCapacity|DataflowBlockOptions.Unbounded (-1)|
|MaxDegreeOfParallelism|1|

Dataflow blocks capture the state of the options at their construction. Subsequent changes to the provided `ExecutionDataflowBlockOptions` instance should not affect the behavior of a dataflow block.

## ExecutionDataflowBlockOptions.ExecutionDataflowBlockOptions() constructor

```csharp
public ExecutionDataflowBlockOptions ();
```

Initializes a new `ExecutionDataflowBlockOptions`.

To be added.

## ExecutionDataflowBlockOptions.MaxDegreeOfParallelism property

```csharp
public int MaxDegreeOfParallelism { get; set; }
```

Gets the maximum number of messages that may be processed by the block concurrently.

Returns: The maximum number of messages.

To be added.

## ExecutionDataflowBlockOptions.SingleProducerConstrained property

```csharp
public bool SingleProducerConstrained { get; set; }
```

Gets whether code using the dataflow block is constrained to one producer at a time.

Returns: Returns  `Boolean`.

#### Remarks
This property defaults to false, such that the block may be used by multiple producers concurrently. This property should only be set to true if the code using the block can guarantee that it will only ever be used by one producer (e.g. a source linked to the block) at a time, meaning that methods like Post, Complete, Fault, and OfferMessage will never be called concurrently. Some blocks may choose to capitalize on the knowledge that there will only be one producer at a time in order to provide better performance.
