---
title: "Task-based Asynchronous Pattern (TAP): Introduction and overview (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Task-based Asynchronous Pattern (TAP): Introduction and overview (part 2 of 2)

## Progress reporting (optional)

Some asynchronous operations benefit from providing progress notifications. Typically, use these notifications to update a user interface with information about the progress of the asynchronous operation.

In TAP, handle progress through an `System.IProgress`1` interface. Pass this interface to the asynchronous method as a parameter, usually named `progress`. When you provide the progress interface at the time of calling the asynchronous method, you help eliminate race conditions that result from incorrect usage. These race conditions occur when event handlers are incorrectly registered after the operation starts and miss updates. More importantly, the progress interface supports varying implementations of progress, as determined by the consuming code. For example, the consuming code might only care about the latest progress update, or it might want to buffer all updates, invoke an action for each update, or control whether the invocation is marshalled to a particular thread. All these options are achievable by using different implementations of the interface, customized to the particular consumer's needs. As with cancellation, TAP implementations should provide an `System.IProgress`1` parameter only if the API supports progress notifications.

For example, if the `ReadAsync` method discussed earlier in this article can report intermediate progress in the form of the number of bytes read thus far, the progress callback could be an `System.IProgress`1` interface:

```csharp
public static Task ReadAsync(byte[] buffer, int offset, int count,
                             IProgress<long> progress)
```
```vb
Public Function ReadAsync(buffer As Byte(), offset As Integer, count As Integer,
                          progress As IProgress(Of Long)) As Task
```
If a `FindFilesAsync` method returns a list of all files that meet a particular search pattern, the progress callback could provide an estimate of the percentage of work completed and the current set of partial results. It could provide this information with either a tuple:

```csharp
public static Task<ReadOnlyCollection<FileInfo>> FindFilesAsync(
    string pattern,
    IProgress<Tuple<double, ReadOnlyCollection<List<FileInfo>>>> progress)
```
```vb
Public Function FindFilesAsync(
    pattern As String,
    progress As IProgress(Of Tuple(Of Double, ReadOnlyCollection(Of List(Of FileInfo))))) As Task(Of ReadOnlyCollection(Of FileInfo))
```
or with a data type that's specific to the API:

```csharp
public static Task<ReadOnlyCollection<FileInfo>> FindFilesAsync(
    string pattern,
    IProgress<FindFilesProgressInfo> progress)
```
```vb
Public Function FindFilesAsync(
    pattern As String,
    progress As IProgress(Of FindFilesProgressInfo)) As Task(Of ReadOnlyCollection(Of FileInfo))
```
In the latter case, the special data type is usually suffixed with `ProgressInfo`.

If TAP implementations provide overloads that accept a `progress` parameter, they must allow the argument to be `null`. If you pass `null`, no progress is reported. TAP implementations should report the progress to the `System.Progress`1` object synchronously, which enables the asynchronous method to quickly provide progress. It also allows the consumer of the progress to determine how and where best to handle the information. For example, the progress instance could choose to marshal callbacks and raise events on a captured synchronization context.

## IProgress\<T> implementations

.NET provides the `System.Progress`1` class, which implements `System.IProgress`1`. The `System.Progress`1` class is declared as follows:

```csharp
public class Progress<T> : IProgress<T>
{
    public Progress();
    public Progress(Action<T> handler);
    protected virtual void OnReport(T value);
    public event EventHandler<T>? ProgressChanged;
}
```

An instance of `System.Progress`1` exposes a `System.Progress`1.ProgressChanged` event, which is raised every time the asynchronous operation reports a progress update. The `System.Progress`1.ProgressChanged` event is raised on the `System.Threading.SynchronizationContext` object that the `System.Progress`1` instance captures when it's instantiated. If no synchronization context is available, a default context that targets the thread pool is used. You can register handlers with this event. For convenience, you can also provide a single handler to the `System.Progress`1` constructor. This handler behaves just like an event handler for the `System.Progress`1.ProgressChanged` event. Progress updates are raised asynchronously to avoid delaying the asynchronous operation while event handlers are executing. Another `System.IProgress`1` implementation could choose to apply different semantics.

## Choosing the overloads to provide

If a TAP implementation uses both the optional `System.Threading.Tasks.TaskFactory.CancellationToken` and optional `System.IProgress`1` parameters, it could potentially require up to four overloads:

```csharp
public Task MethodNameAsync(…);
public Task MethodNameAsync(…, CancellationToken cancellationToken);
public Task MethodNameAsync(…, IProgress<T> progress);
public Task MethodNameAsync(…,
    CancellationToken cancellationToken, IProgress<T> progress);
```

```vb
Public MethodNameAsync(…) As Task
Public MethodNameAsync(…, cancellationToken As CancellationToken cancellationToken) As Task
Public MethodNameAsync(…, progress As IProgress(Of T)) As Task
Public MethodNameAsync(…, cancellationToken As CancellationToken,
                       progress As IProgress(Of T)) As Task
```

However, many TAP implementations don't provide cancellation or progress capabilities, so they require a single method:

```csharp
public Task MethodNameAsync(…);
```

```vb
Public MethodNameAsync(…) As Task
```

If a TAP implementation supports either cancellation or progress but not both, it might provide two overloads:

```csharp
public Task MethodNameAsync(…);
public Task MethodNameAsync(…, CancellationToken cancellationToken);

// … or …

public Task MethodNameAsync(…);
public Task MethodNameAsync(…, IProgress<T> progress);
```

```vb
Public MethodNameAsync(…) As Task
Public MethodNameAsync(…, cancellationToken As CancellationToken) As Task

' … or …

Public MethodNameAsync(…) As Task
Public MethodNameAsync(…, progress As IProgress(Of T)) As Task
```

If a TAP implementation supports both cancellation and progress, it might expose all four overloads. However, it might provide only the following two:

```csharp
public Task MethodNameAsync(…);
public Task MethodNameAsync(…,
    CancellationToken cancellationToken, IProgress<T> progress);
```

```vb
Public MethodNameAsync(…) As Task
Public MethodNameAsync(…, cancellationToken As CancellationToken,
                       progress As IProgress(Of T)) As Task
```

To compensate for the two missing intermediate combinations, developers can pass `System.Threading.CancellationToken.None*` or a default `System.Threading.CancellationToken` for the `cancellationToken` parameter and `null` for the `progress` parameter.

If you expect every usage of the TAP method to support cancellation or progress, you can omit the overloads that don't accept the relevant parameter.

If you decide to expose multiple overloads to make cancellation or progress optional, the overloads that don't support cancellation or progress should behave as if they passed `System.Threading.CancellationToken.None*` for cancellation or `null` for progress to the overload that does support these parameters.

## Related articles

- Asynchronous Programming Patterns — Introduces the three patterns for performing asynchronous operations: the Task-based Asynchronous Pattern (TAP), the Asynchronous Programming Model (APM), and the Event-based Asynchronous Pattern (EAP).
- Implementing the Task-based Asynchronous Pattern — Describes how to implement TAP in three ways: by using the C# and Visual Basic compilers in Visual Studio, manually, or through a combination of the compiler and manual methods.
- Consuming the Task-based Asynchronous Pattern — Describes how you can use tasks and callbacks to achieve waiting without blocking.
- Interop with Other Asynchronous Patterns and Types — Describes how to use TAP to implement the Asynchronous Programming Model (APM) and Event-based Asynchronous Pattern (EAP).
