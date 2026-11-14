---
title: "IPropagatorBlock<TInput,TOutput> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/IPropagatorBlock`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPropagatorBlock<TInput,TOutput> interface

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public interface IPropagatorBlock<in TInput,out TOutput> : System.Threading.Tasks.Dataflow.ISourceBlock<out TOutput>, System.Threading.Tasks.Dataflow.ITargetBlock<in TInput>
```

Represents a dataflow block that is both a target for data and a source of data.

Parameters:

- `TInput`: Specifies the type of data accepted by the  `IPropagatorBlock<T1,T2>`.
- `TOutput`: Specifies the type of data supplied by the  `IPropagatorBlock<T1,T2>`.

To be added.
