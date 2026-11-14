---
title: "ThreadState enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ThreadState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadState enum

Namespace: `System.Diagnostics`

```csharp
public enum ThreadState
```

Specifies the current execution state of the thread.

#### Remarks

> **Important:**
>  There are two thread state enumerations, `ThreadState` and `ThreadState`.  The thread state enumerations are only of interest in a few debugging scenarios. Your code should never use thread state to synchronize the activities of threads.

## ThreadState.Initialized field

```csharp
Initialized
```

A state that indicates the thread has been initialized, but has not yet started.

## ThreadState.Ready field

```csharp
Ready
```

A state that indicates the thread is waiting to use a processor because no processor is free. The thread is prepared to run on the next available processor.

## ThreadState.Running field

```csharp
Running
```

A state that indicates the thread is currently using a processor.

## ThreadState.Standby field

```csharp
Standby
```

A state that indicates the thread is about to use a processor. Only one thread can be in this state at a time.

## ThreadState.Terminated field

```csharp
Terminated
```

A state that indicates the thread has finished executing and has exited.

## ThreadState.Transition field

```csharp
Transition
```

A state that indicates the thread is waiting for a resource, other than the processor, before it can execute. For example, it might be waiting for its execution stack to be paged in from disk.

## ThreadState.Unknown field

```csharp
Unknown
```

The state of the thread is unknown.

## ThreadState.Wait field

```csharp
Wait
```

A state that indicates the thread is not ready to use the processor because it is waiting for a peripheral operation to complete or a resource to become free. When the thread is ready, it will be rescheduled.
