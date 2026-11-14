---
title: "TransformBlock<TInput,TOutput> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/TransformBlock`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TransformBlock<TInput,TOutput> class (part 2 of 2)

## TransformBlock<TInput,TOutput>.TryReceiveAll(IList<TOutput>) method

```csharp
public bool TryReceiveAll (out System.Collections.Generic.IList<TOutput>? items);
```

Attempts to synchronously receive all available items from the `IReceivableSourceBlock<T>`.

Parameters:

- `items`: The items received from the source.

Returns: `true` if one or more items could be received; otherwise, `false`.

#### Remarks
This method does not block waiting for the source to provide an item.

It will return after checking for elements, whether or not an element was available.
