---
title: "EventResetMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/EventResetMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventResetMode enum

Namespace: `System.Threading`

```csharp
public enum EventResetMode
```

Indicates whether an `EventWaitHandle` is reset automatically or manually after receiving a signal.

#### Examples
The following code example uses the `SignalAndWait` method overload to allow the main thread to signal a blocked thread and then wait until the thread finishes a task.

The example starts five threads and allows them to block on an `EventWaitHandle` created with the AutoReset flag, then releases one thread each time the user presses the ENTER key. The example then queues another five threads and releases them all using an `EventWaitHandle` created with the ManualReset flag.

_Code sample not included: ~/snippets/csharp/System.Threading/EventResetMode/Overview/source.cs._

## EventResetMode.AutoReset field

```csharp
AutoReset
```

When signaled, the `EventWaitHandle` resets automatically after releasing a single thread. If no threads are waiting, the `EventWaitHandle` remains signaled until a thread blocks, and resets after releasing the thread.

## EventResetMode.ManualReset field

```csharp
ManualReset
```

When signaled, the `EventWaitHandle` releases all waiting threads and remains signaled until it is manually reset.
