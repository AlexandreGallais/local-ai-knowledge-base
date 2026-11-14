---
title: "ITargetBlock<TInput> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/ITargetBlock`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ITargetBlock<TInput> interface

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public interface ITargetBlock<in TInput> : System.Threading.Tasks.Dataflow.IDataflowBlock
```

Represents a dataflow block that is a target for data.

Parameters:

- `TInput`: Specifies the type of data accepted by the `ITargetBlock<T>`.

To be added.

## ITargetBlock<TInput>.OfferMessage(DataflowMessageHeader, TInput, ISourceBlock<TInput>, Boolean) method

```csharp
public System.Threading.Tasks.Dataflow.DataflowMessageStatus OfferMessage (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, TInput messageValue, System.Threading.Tasks.Dataflow.ISourceBlock<in TInput>? source, bool consumeToAccept);
```

Offers a message to the `ITargetBlock<T>`, giving the target the opportunity to consume or postpone the message.

Parameters:

- `messageHeader`: A `DataflowMessageHeader` instance that represents the header of the message being offered.
- `messageValue`: The value of the message being offered.
- `source`: The `ISourceBlock<T>` offering the message. This may be null.
- `consumeToAccept`: Set to `true` to instruct the target to call `ISourceBlock<T>.ConsumeMessage` synchronously during the call to `ITargetBlock<T>.OfferMessage`, prior to returning `DataflowMessageStatus.Accepted`, in order to consume the message.

Returns: The status of the offered message. If the message was accepted by the target, `DataflowMessageStatus.Accepted` is returned, and the source should no longer use the offered message, because it is now owned by the target. If the message was postponed by the target, `DataflowMessageStatus.Postponed` is returned as a notification that the target may later attempt to consume or reserve the message; in the meantime, the source still owns the message and may offer it to other blocks.

If the target would have otherwise postponed message, but source was `null`, `DataflowMessageStatus.Declined` is instead returned.

If the target tried to accept the message but missed it due to the source delivering the message to another target or simply discarding it, `DataflowMessageStatus.NotAvailable` is returned.

If the target chose not to accept the message, `DataflowMessageStatus.Declined` is returned. If the target chose not to accept the message and will never accept another message from this source, `DataflowMessageStatus.DecliningPermanently` is returned.

Exceptions:

- `ArgumentException`: The  `messageHeader` is not valid.

-or- `consumeToAccept` may only be true if provided with a non-null `source`.

To be added.
