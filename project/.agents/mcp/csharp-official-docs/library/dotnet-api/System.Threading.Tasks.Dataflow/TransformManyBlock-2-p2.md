---
title: "TransformManyBlock<TInput,TOutput> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/TransformManyBlock`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TransformManyBlock<TInput,TOutput> class (part 2 of 2)

## TransformManyBlock<TInput,TOutput>.System.Threading.Tasks.Dataflow.ITargetBlock<TInput>.OfferMessage(DataflowMessageHeader, TInput, ISourceBlock<TInput>, Boolean) method

```csharp
System.Threading.Tasks.Dataflow.DataflowMessageStatus ITargetBlock<TInput>.OfferMessage (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, TInput messageValue, System.Threading.Tasks.Dataflow.ISourceBlock<TInput> source, bool consumeToAccept);
```

Offers a message to the `ITargetBlock<T>`, giving the target the opportunity to consume or postpone the message.

Parameters:

- `messageHeader`: A `DataflowMessageHeader` instance that represents the header of the message being offered.
- `messageValue`: The value of the message being offered.
- `source`: The `ISourceBlock<T>` offering the message. This may be `null`.
- `consumeToAccept`: `true` if the target must call `ISourceBlock<T>.ConsumeMessage` synchronously during the call to `ITargetBlock<T>`, prior to returning `DataflowMessageStatus.Accepted`, in order to consume the message.

Returns: The status of the offered message. If the message was accepted by the target, `DataflowMessageStatus.Accepted` is returned, and the source should no longer use the offered message, as it is now owned by the target. If the message was postponed by the target, `DataflowMessageStatus.Postponed` is returned as a notification that the target may later attempt to consume or reserve the message; in the meantime, the source still owns the message and may offer it to other blocks.

If the target would have otherwise postponed but source was `null`, `DataflowMessageStatus.Declined` is instead returned.

If the target tried to accept the message but missed it due to the source delivering the message to another target or simply discarding it, `DataflowMessageStatus.NotAvailable` is returned.

If the target chose not to accept the message, `DataflowMessageStatus.Declined` is returned. If the target chose not to accept the message and will never accept another message from this source, `DataflowMessageStatus.DecliningPermanently` is returned.

Exceptions:

- `ArgumentException`: The `messageHeader` is not valid.

-or-

`consumeToAccept` may only be true if provided with a non-null `source`.

To be added.

## TransformManyBlock<TInput,TOutput>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the formatted name of this  `IDataflowBlock` instance.

Returns: A string that represents the formatted name of this  `IDataflowBlock` instance.

#### Remarks
Inherited from  `Object` . Uses the  `DataflowBlockOptions.NameFormat` option.

## TransformManyBlock<TInput,TOutput>.TryReceive(Predicate<TOutput>, TOutput) method

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

## TransformManyBlock<TInput,TOutput>.TryReceiveAll(IList<TOutput>) method

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
