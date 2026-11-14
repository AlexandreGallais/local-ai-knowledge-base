---
title: "DataflowMessageStatus enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/DataflowMessageStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataflowMessageStatus enum

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public enum DataflowMessageStatus
```

Represents the status of a `DataflowMessageHeader` when passed between dataflow blocks.

To be added.

## DataflowMessageStatus.Accepted field

```csharp
Accepted
```

Indicates that the  `ITargetBlock<T>` accepted the message. Once a target has accepted a message, it is wholly owned by the target.

## DataflowMessageStatus.Declined field

```csharp
Declined
```

Indicates that the `ITargetBlock<T>` declined the message. The `ISourceBlock<T>` still owns the message.

## DataflowMessageStatus.DecliningPermanently field

```csharp
DecliningPermanently
```

Indicates that the `ITargetBlock<T>` declined the message. The `ISourceBlock<T>` still owns the message.

Additionally, the `ITargetBlock<T>` will decline all future messages sent by the source.

## DataflowMessageStatus.NotAvailable field

```csharp
NotAvailable
```

Indicates that the `ITargetBlock<T>` tried to accept the message from the `ISourceBlock<T>`, but the message was no longer available.

## DataflowMessageStatus.Postponed field

```csharp
Postponed
```

Indicates that the `ITargetBlock<T>` postponed the message for potential consumption at a later time.

The `ISourceBlock<T>` still owns the message.
