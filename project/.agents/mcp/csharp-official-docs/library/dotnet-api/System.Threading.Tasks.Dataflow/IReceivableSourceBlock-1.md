---
title: "IReceivableSourceBlock<TOutput> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/IReceivableSourceBlock`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IReceivableSourceBlock<TOutput> interface

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public interface IReceivableSourceBlock<TOutput> : System.Threading.Tasks.Dataflow.ISourceBlock<TOutput>
```

Represents a dataflow block that supports receiving messages without linking.

Parameters:

- `TOutput`: Specifies the type of data supplied by the `IReceivableSourceBlock<T>`.

To be added.

## IReceivableSourceBlock<TOutput>.TryReceive(Predicate<TOutput>, TOutput) method

```csharp
public bool TryReceive (Predicate<TOutput>? filter, out TOutput item);
```

Attempts to synchronously receive an available output item from the `IReceivableSourceBlock<T>`.

Parameters:

- `filter`: The predicate value must successfully pass in order for it to be received.  `filter` may be `null`, in which case all items will pass.
- `item`: The item received from the source.

Returns: `true` if an item could be received; otherwise, `false`.

#### Remarks
This method does not block waiting for the source to provide an item.

It will return after checking for an element, whether or not an element was available.

## IReceivableSourceBlock<TOutput>.TryReceiveAll(IList<TOutput>) method

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
