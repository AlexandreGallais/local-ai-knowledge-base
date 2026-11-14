---
title: "ThreadPriority enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadPriority.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadPriority enum

Namespace: `System.Threading`

```csharp
public enum ThreadPriority
```

Specifies the scheduling priority of a `Thread`.

#### Remarks
`ThreadPriority` defines the set of all possible values for a thread priority. Thread priorities specify the relative priority of one thread versus another.

Every thread has an assigned priority. Threads created within the runtime are initially assigned the `Normal` priority, while threads created outside the runtime retain their previous priority when they enter the runtime. You can get and set the priority of a thread by accessing its `Priority` property.

Threads are scheduled for execution based on their priority. The scheduling algorithm used to determine the order of thread execution varies with each operating system. The operating system can also adjust the thread priority dynamically as the user interface's focus is moved between the foreground and the background.

The priority of a thread does not affect the thread's state; the state of the thread must be `Running` before the operating system can schedule it.

#### Examples
The following code example shows the result of changing the priority of a thread. Three threads are created, the priority of one thread is set to BelowNormal, and the priority of a second is set to AboveNormal. Each thread increments a variable in a `while` loop and runs for a set time.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Priority/Example1.cs._

## ThreadPriority.AboveNormal field

```csharp
AboveNormal
```

The `Thread` can be scheduled after threads with `Highest` priority and before those with `Normal` priority.

## ThreadPriority.BelowNormal field

```csharp
BelowNormal
```

The `Thread` can be scheduled after threads with `Normal` priority and before those with `Lowest` priority.

## ThreadPriority.Highest field

```csharp
Highest
```

The `Thread` can be scheduled before threads with any other priority.

## ThreadPriority.Lowest field

```csharp
Lowest
```

The `Thread` can be scheduled after threads with any other priority.

## ThreadPriority.Normal field

```csharp
Normal
```

The `Thread` can be scheduled after threads with `AboveNormal` priority and before those with `BelowNormal` priority. Threads have `Normal` priority by default.
