---
title: "Coalesce cancellation tokens from timeouts"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/coalesce-cancellation-tokens-from-timeouts.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Coalesce cancellation tokens from timeouts

Many APIs need two cancellation triggers:

- A caller-provided `System.Threading.CancellationToken`.
- A timeout enforced by your component.

Use `System.Threading.CancellationTokenSource.CreateLinkedTokenSource*` to merge both into a single token that your async work can consume.

## Use a linked token source for caller token plus timeout

Create a timeout `System.Threading.CancellationTokenSource`, link it with the caller token, and pass the linked token to the operation:

```csharp
public static class LinkedTokenBasicDemo
{
    public static async Task RunAsync(CancellationToken userToken)
    {
        using var timeoutCts = new CancellationTokenSource(TimeSpan.FromMilliseconds(150));
        using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(
            userToken,
            timeoutCts.Token);

        await Task.Delay(500, linkedCts.Token);
    }
}
```
```vb
Public Module LinkedTokenBasicDemo
    Public Async Function RunAsync(userToken As CancellationToken) As Task
        Using timeoutCts = New CancellationTokenSource(TimeSpan.FromMilliseconds(150)),
            linkedCts = CancellationTokenSource.CreateLinkedTokenSource(userToken, timeoutCts.Token)

            Await Task.Delay(500, linkedCts.Token)
        End Using
    End Function
End Module
```
Dispose both `CancellationTokenSource` instances after the operation completes so registrations and timers are released promptly.

## Encapsulate linking in a helper

Wrap linking logic in a helper method when several call sites need the same policy:

```csharp
public static class TimeoutPolicy
{
    public static async Task ExecuteWithLinkedTimeoutAsync(
        Func<CancellationToken, Task> operation,
        TimeSpan timeout,
        CancellationToken userToken)
    {
        using var timeoutCts = new CancellationTokenSource(timeout);
        using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(
            userToken,
            timeoutCts.Token);

        await operation(linkedCts.Token);
    }
}
```
```vb
Public Module TimeoutPolicy
    Public Async Function ExecuteWithLinkedTimeoutAsync(
        operation As Func(Of CancellationToken, Task),
        timeout As TimeSpan,
        userToken As CancellationToken) As Task

        Using timeoutCts = New CancellationTokenSource(timeout),
            linkedCts = CancellationTokenSource.CreateLinkedTokenSource(userToken, timeoutCts.Token)

            Await operation(linkedCts.Token)
        End Using
    End Function
End Module
```
A helper keeps timeout behavior consistent and avoids duplicate disposal bugs.

## Choose the right timeout model

Linked tokens are useful when the callee accepts a token and you need one unified cancellation path. In modern .NET, you also have these alternatives:

- Use `System.Threading.CancellationTokenSource.CancelAfter*` to enforce timeouts on a `CancellationTokenSource` you own.
- Use `System.Threading.Tasks.Task.WaitAsync*` when you want to time out the wait without canceling underlying work.

This example shows a `WaitAsync` timeout for "cancel wait only" semantics:

```csharp
public static class WaitOnlyTimeoutDemo
{
    public static async Task RunAsync(CancellationToken userToken)
    {
        Task operation = Task.Delay(500);

        try
        {
            await operation.WaitAsync(TimeSpan.FromMilliseconds(100), userToken);
            Console.WriteLine("Operation completed before timeout.");
        }
        catch (TimeoutException)
        {
            Console.WriteLine("Timed out waiting without canceling operation.");
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("Canceled while waiting for the operation.");
        }
    }
}
```
```vb
Public Module WaitOnlyTimeoutDemo
    Public Async Function RunAsync(userToken As CancellationToken) As Task
        Dim operation As Task = Task.Delay(500)

        Try
            Await operation.WaitAsync(TimeSpan.FromMilliseconds(100), userToken)
            Console.WriteLine("Operation completed before timeout.")
        Catch ex As TimeoutException
            Console.WriteLine("Timed out waiting without canceling operation.")
        Catch ex As OperationCanceledException
            Console.WriteLine("Canceled waiting because the caller token was canceled.")
        End Try
    End Function
End Module
```
## Summary

Use linked tokens when you need to combine caller intent and infrastructure timeouts into one cancellation contract. Keep ownership and disposal rules explicit:

- If your component creates a `CancellationTokenSource`, your component disposes it.
- If callers pass a token, never dispose the caller's token source.
- If an operation doesn't accept tokens, use wait-cancellation patterns instead of linked tokens.

## See also

- Cancel non-cancelable async operations
- Task cancellation
- Cancellation in managed threads
- `System.Threading.CancellationTokenSource.CreateLinkedTokenSource*`
- `System.Threading.CancellationTokenSource.CancelAfter*`
- `System.Threading.Tasks.Task.WaitAsync*`
