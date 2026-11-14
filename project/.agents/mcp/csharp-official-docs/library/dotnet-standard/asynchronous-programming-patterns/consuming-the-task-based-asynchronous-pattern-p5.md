---
title: "Consuming the Task-based Asynchronous Pattern (part 5 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/consuming-the-task-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Consuming the Task-based Asynchronous Pattern (part 5 of 6)

## Building Task-based Combinators

 Because a task is able to completely represent an asynchronous operation and provide synchronous and asynchronous capabilities for joining with the operation, retrieving its results, and so on, you can build useful libraries of combinators that compose tasks to build larger patterns. As discussed in the previous section, .NET includes several built-in combinators, but you can also build your own. The following sections provide several examples of potential combinator methods and types.

### RetryOnFault

 In many situations, you want to retry an operation if a previous attempt fails. For synchronous code, you might build a helper method such as `RetryOnFault` in the following example to accomplish this task:

```csharp
public static T RetryOnFault<T>(Func<T> function, int maxTries)
{
    for (int i = 0; i < maxTries; i++)
    {
        try { return function(); }
        catch { if (i == maxTries - 1) throw; }
    }
    return default(T)!;
}
```
```vb
Public Function RetryOnFaultSync(Of T)(func As Func(Of T), maxTries As Integer) As T
    For i As Integer = 0 To maxTries - 1
        Try
            Return func()
        Catch
            If i = maxTries - 1 Then Throw
        End Try
    Next
    Return Nothing
End Function
```
 You can build an almost identical helper method for asynchronous operations that are implemented with TAP and thus return tasks:

```csharp
public static async Task<T> RetryOnFault<T>(Func<Task<T>> function, int maxTries)
{
    for (int i = 0; i < maxTries; i++)
    {
        try { return await function().ConfigureAwait(false); }
        catch { if (i == maxTries - 1) throw; }
    }
    return default(T)!;
}
```
```vb
Public Async Function RetryOnFault(Of T)(func As Func(Of Task(Of T)), maxTries As Integer) As Task(Of T)
    For i As Integer = 0 To maxTries - 1
        Try
            Return Await func().ConfigureAwait(False)
        Catch
            If i = maxTries - 1 Then Throw
        End Try
    Next
    Return Nothing
End Function
```
 You can then use this combinator to encode retries into the application's logic. For example:

```csharp
// Download the URL, trying up to three times in case of failure
string pageContents = await RetryOnFault(
    () => DownloadStringTaskAsync(url), 3);
```

 You can extend the `RetryOnFault` function further. For example, the function could accept another `Func<Task>` that the function invokes between retries to determine when to try the operation again. For example:

```csharp
public static async Task<T> RetryOnFaultWithDelay<T>(
    Func<Task<T>> function, int maxTries, Func<Task> retryWhen)
{
    for (int i = 0; i < maxTries; i++)
    {
        try { return await function().ConfigureAwait(false); }
        catch { if (i == maxTries - 1) throw; }
        await retryWhen().ConfigureAwait(false);
    }
    return default(T)!;
}
```
```vb
Public Async Function RetryOnFaultWithDelay(Of T)(
    func As Func(Of Task(Of T)), maxTries As Integer, retryWhen As Func(Of Task)) As Task(Of T)
    For i As Integer = 0 To maxTries - 1
        Try
            Return Await func().ConfigureAwait(False)
        Catch
            If i = maxTries - 1 Then Throw
        End Try
        Await retryWhen().ConfigureAwait(False)
    Next
    Return Nothing
End Function
```
 You can then use the function as follows to wait for a second before retrying the operation:

```csharp
// Download the URL, trying up to three times in case of failure,
// and delaying for a second between retries
string pageContents = await RetryOnFault(
    () => DownloadStringTaskAsync(url), 3, () => Task.Delay(1000));
```

### NeedOnlyOne

 Sometimes, you can take advantage of redundancy to improve an operation's latency and chances for success. Consider multiple web services that provide stock quotes, but at various times of the day, each service might provide different levels of quality and response times. To deal with these fluctuations, you might issue requests to all the web services, and as soon as you get a response from one, cancel the remaining requests. You can implement a helper function to make it easier to implement this common pattern of launching multiple operations, waiting for any, and then canceling the rest. The `NeedOnlyOne` function in the following example illustrates this scenario:

```csharp
public static async Task<T> NeedOnlyOne<T>(
    params Func<CancellationToken, Task<T>>[] functions)
{
    var cts = new CancellationTokenSource();
    var tasks = (from function in functions
                 select function(cts.Token)).ToArray();
    var completed = await Task.WhenAny(tasks).ConfigureAwait(false);
    cts.Cancel();
    foreach (var task in tasks)
    {
        var ignored = task.ContinueWith(
            t => Stubs.Log(t), TaskContinuationOptions.OnlyOnFaulted);
    }
    return await completed;
}
```
```vb
Public Async Function NeedOnlyOne(Of T)(
    ParamArray functions As Func(Of CancellationToken, Task(Of T))()) As Task(Of T)
    Dim cts As New CancellationTokenSource()
    Dim tasks As Task(Of T)() = (From func In functions Select func(cts.Token)).ToArray()
    Dim completed As Task(Of T) = Await Task.WhenAny(tasks).ConfigureAwait(False)
    cts.Cancel()
    For Each task In tasks
        Dim ignored = task.ContinueWith(
            Sub(tsk) Stubs.Log(tsk), TaskContinuationOptions.OnlyOnFaulted)
    Next
    Return Await completed
End Function
```
 You can then use this function as follows:

```csharp
double currentPrice = await NeedOnlyOne(
    ct => GetCurrentPriceFromServer1Async("msft", ct),
    ct => GetCurrentPriceFromServer2Async("msft", ct),
    ct => GetCurrentPriceFromServer3Async("msft", ct));
```

### Interleaved operations

 Using the `System.Threading.Tasks.Task.WhenAny*` method to support an interleaving scenario can cause a performance problem when you work with large sets of tasks. Each call to `System.Threading.Tasks.Task.WhenAny*` registers a continuation with each task. For N number of tasks, this process creates O(N2) continuations over the lifetime of the interleaving operation. If you're working with a large set of tasks, use a combinator (`Interleaved` in the following example) to address the performance problem:

```csharp
public static IEnumerable<Task<T>> Interleaved<T>(IEnumerable<Task<T>> tasks)
{
    var inputTasks = tasks.ToList();
    var sources = (from _ in Enumerable.Range(0, inputTasks.Count)
                   select new TaskCompletionSource<T>()).ToList();
    int nextTaskIndex = -1;
    foreach (var inputTask in inputTasks)
    {
        inputTask.ContinueWith(completed =>
        {
            var source = sources[Interlocked.Increment(ref nextTaskIndex)];
            if (completed.IsFaulted)
                source.TrySetException(completed.Exception!.InnerExceptions);
            else if (completed.IsCanceled)
                source.TrySetCanceled();
            else
                source.TrySetResult(completed.Result);
        }, CancellationToken.None,
           TaskContinuationOptions.ExecuteSynchronously,
           TaskScheduler.Default);
    }
    return from source in sources
           select source.Task;
}
```
```vb
Public Function Interleaved(Of T)(tasks As IEnumerable(Of Task(Of T))) As IEnumerable(Of Task(Of T))
    Dim inputTasks As List(Of Task(Of T)) = tasks.ToList()
    Dim sources As List(Of TaskCompletionSource(Of T)) =
        (From _i In Enumerable.Range(0, inputTasks.Count) Select New TaskCompletionSource(Of T)()).ToList()
    Dim indexRef As Integer() = {-1}
    For Each inputTask In inputTasks
        inputTask.ContinueWith(Sub(completed)
                                   Dim idx = Interlocked.Increment(indexRef(0))
                                   Dim source = sources(idx)
                                   If completed.IsFaulted Then
                                       source.TrySetException(completed.Exception.InnerExceptions)
                                   ElseIf completed.IsCanceled Then
                                       source.TrySetCanceled()
                                   Else
                                       source.TrySetResult(completed.Result)
                                   End If
                               End Sub,
                               CancellationToken.None,
                               TaskContinuationOptions.ExecuteSynchronously,
                               TaskScheduler.Default)
    Next
    Return From source In sources Select source.Task
End Function
```
 Use the combinator to process the results of tasks as they complete. For example:

```csharp
IEnumerable<Task<int>> tasks = ...;
foreach(var task in Interleaved(tasks))
{
    int result = await task;
    …
}
```

### WhenAllOrFirstException

 In certain scatter/gather scenarios, you might want to wait for all tasks in a set, unless one of them faults. In that case, you want to stop waiting as soon as the exception occurs. You can accomplish that behavior by using a combinator method such as `WhenAllOrFirstException` in the following example:

```csharp
public static Task<T[]> WhenAllOrFirstException<T>(IEnumerable<Task<T>> tasks)
{
    var inputs = tasks.ToList();
    var ce = new CountdownEvent(inputs.Count);
    var tcs = new TaskCompletionSource<T[]>();

    Action<Task> onCompleted = (Task completed) =>
    {
        if (completed.IsFaulted)
            tcs.TrySetException(completed.Exception!.InnerExceptions);
        if (ce.Signal() && !tcs.Task.IsCompleted)
            tcs.TrySetResult(inputs.Select(t => ((Task<T>)t).Result).ToArray());
    };

    foreach (var t in inputs) t.ContinueWith(onCompleted);
    return tcs.Task;
}
```
```vb
Public Function WhenAllOrFirstException(Of T)(tasks As IEnumerable(Of Task(Of T))) As Task(Of T())
    Dim inputs As List(Of Task(Of T)) = tasks.ToList()
    Dim ce As New CountdownEvent(inputs.Count)
    Dim tcs As New TaskCompletionSource(Of T())()

    Dim onCompleted As Action(Of Task) = Sub(completed As Task)
                                             If completed.IsFaulted Then
                                                 tcs.TrySetException(completed.Exception.InnerExceptions)
                                             End If
                                             If ce.Signal() AndAlso Not tcs.Task.IsCompleted Then
                                                 tcs.TrySetResult(inputs.Select(Function(taskItem) DirectCast(taskItem, Task(Of T)).Result).ToArray())
                                             End If
                                         End Sub

    For Each t In inputs
        t.ContinueWith(onCompleted)
    Next
    Return tcs.Task
End Function
```
