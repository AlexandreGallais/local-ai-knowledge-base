---
title: "ProcessThread class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessThread.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessThread class (part 2 of 2)

## ProcessThread.TotalProcessorTime property

```csharp
public TimeSpan TotalProcessorTime { get; }
```

Gets the total amount of time that this thread has spent using the processor.

Returns: A `TimeSpan` that indicates the amount of time that the thread has had control of the processor.

Exceptions:

- `Win32Exception`: The thread time could not be retrieved.
- `NotSupportedException`: The process is on a remote computer.

#### Remarks
The `TotalProcessorTime` property indicates the total amount of time that the system has taken the thread out of the wait state and given it priority on any processor. On a multiple processor system, this value would include time spent on each processor, if the thread used more than one processor.

The `TotalProcessorTime` property is the sum of the `ProcessThread.UserProcessorTime` and `ProcessThread.PrivilegedProcessorTime` properties.

## ProcessThread.UserProcessorTime property

```csharp
public TimeSpan UserProcessorTime { get; }
```

Gets the amount of time that the associated thread has spent running code inside the application.

Returns: A `TimeSpan` indicating the amount of time that the thread has spent running code inside the application, as opposed to inside the operating system core.

Exceptions:

- `Win32Exception`: The thread time could not be retrieved.
- `NotSupportedException`: The process is on a remote computer.

#### Remarks
Windows NT uses several different protection mechanisms, and at the root of them all is the distinction between user mode and privileged mode. `ProcessThread.UserProcessorTime` corresponds to the amount of time that the application has spent running in user mode, outside the operating system core. The `ProcessThread.PrivilegedProcessorTime` corresponds to the amount of time that the application has spent running code in privileged mode, inside the system core.

User mode restricts the application in two important ways. First, the application cannot directly access the peripherals, but instead must call the operating system core to get or set peripheral data. The operating system can thus ensure that one application does not destroy peripheral data that is needed by another. Second, the application cannot read or change data that the operating system itself maintains. This restriction prevents applications from either inadvertently or intentionally corrupting the core. If the application needs the operating system to perform an operation, it calls one of the system's routines. Many of these transition into privileged mode, perform the operation, and smoothly return to user mode.

## ProcessThread.WaitReason property

```csharp
public System.Diagnostics.ThreadWaitReason WaitReason { get; }
```

Gets the reason that the thread is waiting.

Returns: A `ThreadWaitReason` representing the reason that the thread is in the wait state.

Exceptions:

- `InvalidOperationException`: The thread is not in the wait state.
- `NotSupportedException`: The process is on a remote computer.

#### Remarks
The `WaitReason` property is valid only when the `ProcessThread.ThreadState` is `Wait`. Therefore, check the `ProcessThread.ThreadState` value before you get the `WaitReason` property.

## ProcessThread.ResetIdealProcessor() method

```csharp
public void ResetIdealProcessor ();
```

Resets the ideal processor for this thread to indicate that there is no single ideal processor. In other words, so that any processor is ideal.

Exceptions:

- `Win32Exception`: The ideal processor could not be reset.
- `NotSupportedException`: The process is on a remote computer.

To be added.
