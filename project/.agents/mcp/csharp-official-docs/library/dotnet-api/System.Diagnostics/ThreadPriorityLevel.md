---
title: "ThreadPriorityLevel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ThreadPriorityLevel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadPriorityLevel enum

Namespace: `System.Diagnostics`

```csharp
public enum ThreadPriorityLevel
```

Specifies the priority level of a thread.

#### Remarks
Every thread has a base-priority level determined by the thread's priority value and the priority class of its process. The operating system uses the base-priority level of all executable threads to determine which thread gets the next slice of processor time.

The priority level is not an absolute value, but instead is a range of priority values. The operating system computes the priority by using the process priority class to determine where, in the range specified by the `PriorityLevel` property, to set the thread's priority.

## ThreadPriorityLevel.AboveNormal field

```csharp
AboveNormal
```

Specifies one step above the normal priority for the associated `ProcessPriorityClass`.

## ThreadPriorityLevel.BelowNormal field

```csharp
BelowNormal
```

Specifies one step below the normal priority for the associated `ProcessPriorityClass`.

## ThreadPriorityLevel.Highest field

```csharp
Highest
```

Specifies highest priority. This is two steps above the normal priority for the associated `ProcessPriorityClass`.

## ThreadPriorityLevel.Idle field

```csharp
Idle
```

Specifies idle priority. This is the lowest possible priority value of all threads, independent of the value of the associated `ProcessPriorityClass`.

## ThreadPriorityLevel.Lowest field

```csharp
Lowest
```

Specifies lowest priority. This is two steps below the normal priority for the associated `ProcessPriorityClass`.

## ThreadPriorityLevel.Normal field

```csharp
Normal
```

Specifies normal priority for the associated `ProcessPriorityClass`.

## ThreadPriorityLevel.TimeCritical field

```csharp
TimeCritical
```

Specifies time-critical priority. This is the highest priority of all threads, independent of the value of the associated `ProcessPriorityClass`.
