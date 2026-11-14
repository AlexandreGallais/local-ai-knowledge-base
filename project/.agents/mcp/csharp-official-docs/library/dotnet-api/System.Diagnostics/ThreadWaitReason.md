---
title: "ThreadWaitReason enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ThreadWaitReason.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadWaitReason enum

Namespace: `System.Diagnostics`

```csharp
public enum ThreadWaitReason
```

Specifies the reason a thread is waiting.

#### Remarks
The thread wait reason is only valid when the `ThreadState` is `Wait`.

## ThreadWaitReason.EventPairHigh field

```csharp
EventPairHigh
```

The thread is waiting for event pair high.

## ThreadWaitReason.EventPairLow field

```csharp
EventPairLow
```

The thread is waiting for event pair low.

## ThreadWaitReason.ExecutionDelay field

```csharp
ExecutionDelay
```

Thread execution is delayed.

## ThreadWaitReason.Executive field

```csharp
Executive
```

The thread is waiting for the scheduler.

## ThreadWaitReason.FreePage field

```csharp
FreePage
```

The thread is waiting for a free virtual memory page.

## ThreadWaitReason.LpcReceive field

```csharp
LpcReceive
```

The thread is waiting for a local procedure call to arrive.

## ThreadWaitReason.LpcReply field

```csharp
LpcReply
```

The thread is waiting for reply to a local procedure call to arrive.

## ThreadWaitReason.PageIn field

```csharp
PageIn
```

The thread is waiting for a virtual memory page to arrive in memory.

## ThreadWaitReason.PageOut field

```csharp
PageOut
```

The thread is waiting for a virtual memory page to be written to disk.

## ThreadWaitReason.Suspended field

```csharp
Suspended
```

Thread execution is suspended.

## ThreadWaitReason.SystemAllocation field

```csharp
SystemAllocation
```

The thread is waiting for system allocation.

## ThreadWaitReason.Unknown field

```csharp
Unknown
```

The thread is waiting for an unknown reason.

## ThreadWaitReason.UserRequest field

```csharp
UserRequest
```

The thread is waiting for a user request.

## ThreadWaitReason.VirtualMemory field

```csharp
VirtualMemory
```

The thread is waiting for the system to allocate virtual memory.
