---
title: "ProcessPriorityClass enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessPriorityClass.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessPriorityClass enum

Namespace: `System.Diagnostics`

```csharp
public enum ProcessPriorityClass
```

Indicates the priority that the system associates with a process. This value, together with the priority value of each thread of the process, determines each thread's base priority level.

#### Remarks
A process priority class encompasses a range of thread priority levels. Threads with different priorities running in the process run relative to the process's priority class. The operating system uses the base-priority level of all executable threads to determine which thread gets the next slice of processor time.

Win32 uses four priority classes with seven base priority levels per class. Based on time elapsed or other boosts, the operating system can change the base priority level when a process needs to be put ahead of others for access to the processor. In addition, you can set `Process.PriorityBoostEnabled` to temporarily boost the priority level of threads that have been taken out of the wait state. The priority is reset when the process returns to the wait state.

## ProcessPriorityClass.AboveNormal field

```csharp
AboveNormal
```

Specifies that the process has priority higher than `Normal` but lower than `High`.

## ProcessPriorityClass.BelowNormal field

```csharp
BelowNormal
```

Specifies that the process has priority above `Idle` but below `Normal`.

## ProcessPriorityClass.High field

```csharp
High
```

Specifies that the process performs time-critical tasks that must be executed immediately, such as the `Task List` dialog, which must respond quickly when called by the user, regardless of the load on the operating system. The threads of the process preempt the threads of normal or idle priority class processes. Use extreme care when specifying `High` for the process's priority class, because a high priority class application can use nearly all available processor time.

## ProcessPriorityClass.Idle field

```csharp
Idle
```

Specifies that the threads of this process run only when the system is idle, such as a screen saver. The threads of the process are preempted by the threads of any process running in a higher priority class. This priority class is inherited by child processes.

## ProcessPriorityClass.Normal field

```csharp
Normal
```

Specifies that the process has no special scheduling needs.

## ProcessPriorityClass.RealTime field

```csharp
RealTime
```

Specifies that the process has the highest possible priority. The threads of a process with `RealTime` priority preempt the threads of all other processes, including operating system processes performing important tasks. Thus, a `RealTime` priority process that executes for more than a very brief interval can cause disk caches not to flush or cause the mouse to be unresponsive.
