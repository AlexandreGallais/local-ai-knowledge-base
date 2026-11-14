---
title: "Implementing the Task-based Asynchronous Pattern (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/implementing-the-task-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Implementing the task-based asynchronous pattern

You can implement the task-based asynchronous pattern (TAP) in three ways: by using the C# and Visual Basic <example-value> in Visual Studio, manually, or through a combination of the compiler and manual methods. The following sections discuss each method in detail. You can use the TAP pattern to implement both compute-bound and I/O-bound asynchronous operations. The Workloads section discusses each type of operation.

## Generating TAP methods

### Using the compilers

Any method that is attributed with the `async` keyword (`Async` in Visual Basic) is considered an asynchronous method. The C# and Visual Basic <example-value> perform the necessary transformations to implement the method asynchronously by using TAP. An asynchronous method should return either a `System.Threading.Tasks.Task` or a `System.Threading.Tasks.Task`1` object. For the latter, the body of the function should return a `TResult`, and the compiler ensures that this result is made available through the resulting task object. Similarly, any exceptions that go unhandled within the body of the method are marshalled to the output task and cause the resulting task to end in the `System.Threading.Tasks.TaskStatus.Faulted` state. The exception to this rule is when an `System.OperationCanceledException` (or derived type) goes unhandled, in which case the resulting task ends in the `System.Threading.Tasks.TaskStatus.Canceled` state.

### Task.Start and task disposal

Use `System.Threading.Tasks.Task.Start*` only for tasks explicitly created with a `System.Threading.Tasks.Task` constructor that are still in the `Created` state. Public TAP methods should return active tasks, so callers shouldn't need to call `Start`.

In most TAP code, don't dispose tasks. A `System.Threading.Tasks.Task` doesn't hold unmanaged resources in the typical case, and disposing every task adds overhead without practical benefit. Dispose only when specific APIs or measurements show a need.

If you start background work that outlives the immediate call path, keep ownership explicit and track completion. For more guidance, see Keeping async methods alive.

### Generating TAP methods manually

You might implement the TAP pattern manually for better control over implementation. The compiler relies on the public surface area exposed from the `System.Threading.Tasks` namespace and supporting types in the `System.Runtime.CompilerServices` namespace. To implement the TAP yourself, you create a `System.Threading.Tasks.TaskCompletionSource`1` object, perform the asynchronous operation, and when it completes, call the `System.Threading.Tasks.TaskCompletionSource`1.SetResult*`, `System.Threading.Tasks.TaskCompletionSource`1.SetException*`, or `System.Threading.Tasks.TaskCompletionSource`1.SetCanceled*` method, or the `Try` version of one of these methods. When you implement a TAP method manually, you must complete the resulting task when the represented asynchronous operation completes. For example:

```csharp
static class StreamExtensions
{
    public static Task<int> ReadTask(this Stream stream, byte[] buffer, int offset, int count, object? state)
    {
        var tcs = new TaskCompletionSource<int>();
        stream.BeginRead(buffer, offset, count, ar =>
        {
            try { tcs.SetResult(stream.EndRead(ar)); }
            catch (Exception exc) { tcs.SetException(exc); }
        }, state);
        return tcs.Task;
    }
}
```
```vb
Module StreamExtensions
    <Extension()>
    Public Function ReadTask(stream As Stream, buffer As Byte(),
                             offset As Integer, count As Integer,
                             state As Object) As Task(Of Integer)
        Dim tcs As New TaskCompletionSource(Of Integer)()
        stream.BeginRead(buffer, offset, count,
            Sub(ar)
                Try
                    tcs.SetResult(stream.EndRead(ar))
                Catch exc As Exception
                    tcs.SetException(exc)
                End Try
            End Sub, state)
        Return tcs.Task
    End Function
End Module
```
### Hybrid approach

 You might find it useful to implement the TAP pattern manually but delegate the core logic for the implementation to the compiler. For example, you might want to use the hybrid approach when you want to verify arguments outside a compiler-generated asynchronous method so that exceptions can escape to the method's direct caller rather than being exposed through the `System.Threading.Tasks.Task` object:

```csharp
class Calculator
{
    private int value = 0;

    public Task<int> MethodAsync(string input)
    {
        if (input == null) throw new ArgumentNullException(nameof(input));
        return MethodAsyncInternal(input);
    }

    private async Task<int> MethodAsyncInternal(string input)
    {
        // code that uses await goes here
        await Task.Delay(1);
        return value;
    }
}
```
```vb
Class Calculator
    Private value As Integer = 0

    Public Function MethodAsync(input As String) As Task(Of Integer)
        If input Is Nothing Then Throw New ArgumentNullException(NameOf(input))
        Return MethodAsyncInternal(input)
    End Function

    Private Async Function MethodAsyncInternal(input As String) As Task(Of Integer)
        ' code that uses await goes here
        Await Task.Delay(1)
        Return value
    End Function
End Class
```
 Another case where such delegation is useful is when you're implementing fast-path optimization and want to return a cached task.
