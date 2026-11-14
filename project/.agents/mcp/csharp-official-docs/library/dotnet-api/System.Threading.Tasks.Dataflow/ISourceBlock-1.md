---
title: "ISourceBlock<TOutput> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/ISourceBlock`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ISourceBlock<TOutput> interface

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public interface ISourceBlock<out TOutput> : System.Threading.Tasks.Dataflow.IDataflowBlock
```

Represents a dataflow block that is a source of data.

Parameters:

- `TOutput`: Specifies the type of data supplied by the  `ISourceBlock<T>`.

To be added.

## ISourceBlock<TOutput>.ConsumeMessage(DataflowMessageHeader, ITargetBlock<TOutput>, Boolean) method

```csharp
public TOutput? ConsumeMessage (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, System.Threading.Tasks.Dataflow.ITargetBlock<out TOutput> target, out bool messageConsumed);
```

Called by a linked `ITargetBlock<T>` to accept and consume a `DataflowMessageHeader` previously offered by this `ISourceBlock<T>`.

Parameters:

- `messageHeader`: The `DataflowMessageHeader` of the message being consumed.
- `target`: The `ITargetBlock<T>` consuming the message.
- `messageConsumed`: `true` if the message was successfully consumed; otherwise, `false`.

Returns: The value of the consumed message. This may correspond to a different  `DataflowMessageHeader` instance than was previously reserved and passed as the `messageHeader` to `ISourceBlock<T>.ConsumeMessage`. The consuming `ITargetBlock<T>` must use the returned value instead of the value passed as `messageValue` through `ITargetBlock<T>.OfferMessage`.

If the message requested is not available, the return value will be null.

Exceptions:

- `ArgumentException`: The messageHeader is not valid.
- `ArgumentNullException`: The target is `null`.

#### Remarks
Only `ITargetBlock<T>` instances linked to this `ISourceBlock<T>` instance may use `ISourceBlock<T>.ConsumeMessage`, and it must only be used to consume `DataflowMessageHeader` instances previously offered by this source to the target.

## ISourceBlock<TOutput>.LinkTo(ITargetBlock<TOutput>, DataflowLinkOptions) method

```csharp
public IDisposable LinkTo (System.Threading.Tasks.Dataflow.ITargetBlock<out TOutput> target, System.Threading.Tasks.Dataflow.DataflowLinkOptions linkOptions);
```

Links the  `ISourceBlock<T>` to the specified  `ITargetBlock<T>`.

Parameters:

- `target`: The  `ITargetBlock<T>` to which to connect this source.
- `linkOptions`: A `DataflowLinkOptions` instance that configures the link.

Returns: An IDisposable that, upon calling Dispose, will unlink the source from the target.

Exceptions:

- `ArgumentNullException`: `target` is null (Nothing in Visual Basic) or  `linkOptions` is null (Nothing in Visual Basic).

To be added.

## ISourceBlock<TOutput>.ReleaseReservation(DataflowMessageHeader, ITargetBlock<TOutput>) method

```csharp
public void ReleaseReservation (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, System.Threading.Tasks.Dataflow.ITargetBlock<out TOutput> target);
```

Called by a linked `ITargetBlock<T>` to release a previously reserved `DataflowMessageHeader` by this `ISourceBlock<T>`.

Parameters:

- `messageHeader`: The `DataflowMessageHeader` of the reserved message being released.
- `target`: The `ITargetBlock<T>` releasing the message it previously reserved.

Exceptions:

- `ArgumentException`: The `messageHeader` is not valid.
- `ArgumentNullException`: The `target` is `null`.
- `InvalidOperationException`: The `target` did not have the message reserved.

#### Remarks
Only `ITargetBlock<T>` instances linked to this `ISourceBlock<T>` instance may use `ReleaseReservation`, and it must only be used to release `DataflowMessageHeader` instances previously and successfully reserved by the target.

## ISourceBlock<TOutput>.ReserveMessage(DataflowMessageHeader, ITargetBlock<TOutput>) method

```csharp
public bool ReserveMessage (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, System.Threading.Tasks.Dataflow.ITargetBlock<out TOutput> target);
```

Called by a linked `ITargetBlock<T>` to reserve a previously offered `DataflowMessageHeader` by this `ISourceBlock<T>`.

Parameters:

- `messageHeader`: The `DataflowMessageHeader` of the message being reserved.
- `target`: The `ITargetBlock<T>` reserving the message.

Returns: `true` if the message was successfully reserved; otherwise, `false`.

Exceptions:

- `ArgumentException`: The `messageHeader` is not valid.
- `ArgumentNullException`: The `target` is `null`.

#### Remarks
Only `ITargetBlock<T>` instances linked to this `ISourceBlock<T>` instance may use `ISourceBlock<T>.ReserveMessage`, and it must only be used to reserve `DataflowMessageHeader` instances previously offered by this source to the target.

If `true` is returned, the  `ITargetBlock<T>` must subsequently call either  `ISourceBlock<T>.ConsumeMessage` or `ISourceBlock<T>.ReleaseReservation` for this message. Failure to do so may result in the source being unable to propagate any further messages to this or other targets.

`ISourceBlock<T>.ReserveMessage` must not be called while the target is holding any internal locks. Doing so will violate the lock hierarchy necessary to avoid deadlocks in a dataflow network.
