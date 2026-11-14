---
title: "ParallelMergeOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelMergeOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelMergeOptions enum

Namespace: `System.Linq`

```csharp
public enum ParallelMergeOptions
```

Specifies the preferred type of *output merge* to use in a query. In other words, it indicates how PLINQ should merge the results from the various partitions back into a single result sequence. This is a hint only, and may not be respected by the system when parallelizing all queries.

#### Remarks
Use `NotBuffered` for queries that will be consumed and output as streams, this has the lowest latency between beginning query execution and elements being yielded. For some queries, such as those involving a sort (OrderBy, OrderByDescending), buffering is essential and a hint of NotBuffered or AutoBuffered will be ignored. However, queries that are created by using the AsOrdered operator can be streamed as long as no further sorting is performed within the query itself.

Use `AutoBuffered` for most cases; this is the default. It strikes a balance between latency and overall performance.

Use `FullyBuffered` for queries when the entire output can be processed before the information is needed. This option offers the best performance when all of the output can be accumulated before yielding any information, though it is not suitable for stream processing or showing partial results mid-query.

## ParallelMergeOptions.AutoBuffered field

```csharp
AutoBuffered
```

Use a merge with output buffers of a size chosen by the system. Results will accumulate into an output buffer before they are available to the consumer of the query.

## ParallelMergeOptions.Default field

```csharp
Default
```

Use the default merge type, which is AutoBuffered.

## ParallelMergeOptions.FullyBuffered field

```csharp
FullyBuffered
```

Use a merge with full output buffers. The system will accumulate all of the results before making any of them available to the consumer of the query.

## ParallelMergeOptions.NotBuffered field

```csharp
NotBuffered
```

Use a merge without output buffers. As soon as result elements have been computed, make that element available to the consumer of the query.
