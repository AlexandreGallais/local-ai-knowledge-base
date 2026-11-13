---
title: "Cancel non-cancelable async operations"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/cancel-non-cancelable-async-operations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Cancel non-cancelable async operations

Sometimes you need cancellation, but the operation you'<example-value>'t accept a `System.Threading.CancellationToken`. In that case, choose the behavior you need:

- Cancel the operation itself.
- Cancel only your wait.
- Cancel both the operation and your wait.

The right choice depends on who owns the operation and what cleanup guarantees you need.

## Understand the three cancellation meanings

When people say, "cancel this async call," they usually mean one of three different things:

- **Cancel the operation.** Signal the operation to stop work.
- **Cancel the wait.** Stop awaiting and continue your workflow, even if the operation still runs.
- **Cancel both.** Request operation cancellation and also stop waiting promptly.

Treat these meanings as separate design decisions. If you mix them, cancellation behavior becomes hard to reason about.

## Prefer token-aware APIs when available

Before you add a wrapper, check whether the API already supports cancellation tokens. Modern .NET APIs have much broader token <example-value> than older .NET Framework code. For example, many stream APIs in .NET now support cancellation, and `NetworkStream` async operations honor cancellation tokens.

Use token <example-value> whenever they exist:

```csharp
public static class StreamExamples
{
    public static async Task<int> ReadOnceAsync(
        NetworkStream stream,
        byte[] buffer,
        CancellationToken <example-value>)
    {
        return await stream.ReadAsync(
            buffer.AsMemory(0, buffer.Length),
            cancellationToken);
    }
}
```
```vb
Public Module StreamExamples
    Public Async Function ReadOnceAsync(
        stream As NetworkStream,
        buffer As Byte(),
        cancellationToken As CancellationToken) As Task(Of Integer)

        Return Await stream.ReadAsync(
            buffer.AsMemory(0, buffer.Length),
            cancellationToken)
    End Function
End Module
```
## Cancel only the wait by using `Task.WhenAny`

When an operation doesn't accept a token, cancel your wait by racing the operation against a token-backed task. This pattern often appears as a `WithCancellation` helper:

```csharp
public static class TaskCancellationExtensions
{
    public static async Task<T> WithCancellation<T>(
        this Task<T> task,
        CancellationToken <example-value>)
    {
        if (task.IsCompleted)
            return await task.ConfigureAwait(false);

        var cancellationTaskSource = new TaskCompletionSource<bool>(
            TaskCreationOptions.RunContinuationsAsynchronously);

        using var registration = cancellationToken.Register(
            static state =>
                ((TaskCompletionSource<bool>)state!).TrySetResult(true),
            cancellationTaskSource);

        Task completed = await Task.WhenAny(task, cancellationTaskSource.Task)
            .ConfigureAwait(false);

        if (completed != task)
            throw new OperationCanceledException(cancellationToken);

        return await task.ConfigureAwait(false);
    }
}
```
```vb
Public Module TaskCancellationExtensions
    <Extension()>
    Public Async Function WithCancellation(Of T)(
        operationTask As Task(Of T),
        cancellationToken As CancellationToken) As Task(Of T)

        If operationTask.IsCompleted Then
            Return Await operationTask
        End If

        Dim cancellationTaskSource =
            New TaskCompletionSource(Of Boolean)(TaskCreationOptions.RunContinuationsAsynchronously)

        Using registration = cancellationToken.Register(
            Sub(state)
                DirectCast(state, TaskCompletionSource(Of Boolean)).TrySetResult(True)
            End Sub,
            cancellationTaskSource)

            Dim completed = Await Task.WhenAny(operationTask, cancellationTaskSource.Task)

            If completed IsNot operationTask Then
                Throw New OperationCanceledException(cancellationToken)
            End If
        End Using

        Return Await operationTask
    End Function
End Module
```
This pattern uses `System.Threading.Tasks.Task.WhenAny*` to return as soon as either task completes.

Use this approach only when it's safe for the original operation to continue in the background.

## Cancel both operation and wait when you own the operation

If you own the operation and it accepts a token, pass the token and still use a cancelable wait when needed:

```csharp
public static class CancelBothDemo
{
    public static async Task<string> FetchDataAsync(CancellationToken <example-value>)
    {
        await Task.Delay(500, cancellationToken);
        return "payload";
    }

    public static async Task RunAsync()
    {
        using var cts = new CancellationTokenSource();
        cts.CancelAfter(100);

        try
        {
            string payload = await FetchDataAsync(cts.Token)
                .WithCancellation(cts.Token);
            Console.WriteLine(payload);
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("Canceled operation and wait.");
        }
    }
}
```
```vb
Public Module CancelBothDemo
    Public Async Function FetchDataAsync(cancellationToken As CancellationToken) As Task(Of String)
        Await Task.Delay(500, cancellationToken)
        Return "payload"
    End Function

    Public Async Function RunAsync() As Task
        Using cts = New CancellationTokenSource()
            cts.CancelAfter(100)

            Try
                Dim payload = Await FetchDataAsync(cts.Token).WithCancellation(cts.Token)
                Console.WriteLine(payload)
            Catch ex As OperationCanceledException
                Console.WriteLine("Canceled operation and wait.")
            End Try
        End Using
    End Function
End Module
```
This combination gives responsive cancellation for callers and cooperative shutdown for the underlying work.

## Handle abandoned operations safely

If you cancel only the wait, the original task might later fault. Keep a reference so you can observe completion and log exceptions. Otherwise, you can miss failures and make troubleshooting harder.

```csharp
public static class ObserveLateFaultDemo
{
    private static async Task<int> FaultLaterAsync()
    {
        await Task.Delay(250);
        throw new InvalidOperationException("Background operation failed.");
    }

    public static async Task RunAsync()
    {
        Task<int> operation = FaultLaterAsync();

        using var cts = new CancellationTokenSource(50);

        try
        {
            await operation.WithCancellation(cts.Token);
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("Stopped waiting; operation still running.");
        }

        _ = operation.ContinueWith(
            t => Console.WriteLine($"Observed late fault: {t.Exception!.InnerException!.Message}"),
            TaskContinuationOptions.OnlyOnFaulted);

        await Task.Delay(300);
    }
}
```
```vb
Public Module ObserveLateFaultDemo
    Private Async Function FaultLaterAsync() As Task(Of Integer)
        Await Task.Delay(250)
        Throw New InvalidOperationException("Background operation failed.")
    End Function

    Public Async Function RunAsync() As Task
        Dim operation As Task(Of Integer) = FaultLaterAsync()

        Using cts = New CancellationTokenSource(50)
            Try
                Await operation.WithCancellation(cts.Token)
            Catch ex As OperationCanceledException
                Console.WriteLine("Stopped waiting; operation still running.")
            End Try
        End Using

        Dim observed = operation.ContinueWith(
            Sub(t)
                Console.WriteLine($"Observed late fault: {t.Exception.InnerException.Message}")
            End Sub,
            TaskContinuationOptions.OnlyOnFaulted)

        Await observed
    End Function
End Module
```
## See also

- Consume the task-based asynchronous pattern
- Task cancellation
- Cancellation in managed threads
- `System.Threading.CancellationToken`
- `System.Threading.Tasks.Task.WhenAny*`
