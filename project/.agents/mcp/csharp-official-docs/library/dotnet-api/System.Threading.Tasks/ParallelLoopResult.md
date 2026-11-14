---
title: "ParallelLoopResult struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/ParallelLoopResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelLoopResult struct

Namespace: `System.Threading.Tasks`

```csharp
public struct ParallelLoopResult
```

Provides completion status on the execution of a `Parallel` loop.

#### Remarks
If `ParallelLoopResult.IsCompleted` returns true, then the loop ran to completion, such that all iterations of the loop were executed. If `ParallelLoopResult.IsCompleted` returns false and `ParallelLoopResult.LowestBreakIteration` returns null, a call to `ParallelLoopState.Stop` was used to end the loop prematurely. If `ParallelLoopResult.IsCompleted` returns false and `ParallelLoopResult.LowestBreakIteration` returns a non-null integral value, `ParallelLoopState.Break` was used to end the loop prematurely.

## ParallelLoopResult.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets whether the loop ran to completion, such that all iterations of the loop were executed and the loop didn't receive a request to end prematurely.

Returns: `true` if the loop ran to completion; otherwise, `false`.

To be added.

## ParallelLoopResult.LowestBreakIteration property

```csharp
public long? LowestBreakIteration { get; }
```

Gets the index of the lowest iteration from which `ParallelLoopState.Break` was called.

Returns: Returns an integer that represents the lowest iteration from which the Break statement was called.

#### Remarks
If `ParallelLoopState.Break` was not employed, this property will return null.
