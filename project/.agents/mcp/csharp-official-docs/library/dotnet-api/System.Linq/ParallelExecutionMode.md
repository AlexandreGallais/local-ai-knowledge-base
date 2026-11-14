---
title: "ParallelExecutionMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelExecutionMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelExecutionMode enum

Namespace: `System.Linq`

```csharp
public enum ParallelExecutionMode
```

The query execution mode is a hint that specifies how the system should handle performance trade-offs when parallelizing queries.

To be added.

## ParallelExecutionMode.Default field

```csharp
Default
```

This is the default setting. PLINQ will examine the query's structure and will only parallelize the query if will likely result in speedup. If the query structure indicates that speedup is not likely to be obtained, then PLINQ will execute the query as an ordinary LINQ to Objects query.

## ParallelExecutionMode.ForceParallelism field

```csharp
ForceParallelism
```

Parallelize the entire query, even if that means using high-overhead algorithms. Use this flag in cases where you know that parallel execution of the query will result in speedup, but PLINQ in the Default mode would execute it as sequential.
