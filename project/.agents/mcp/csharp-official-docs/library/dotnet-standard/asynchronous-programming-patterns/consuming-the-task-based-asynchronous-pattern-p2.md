---
title: "Consuming the Task-based Asynchronous Pattern (part 2 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/consuming-the-task-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Consuming the Task-based Asynchronous Pattern (part 2 of 6)

## Using the built-in task-based combinators

 The `System.Threading.Tasks` namespace includes several methods for composing and working with tasks.

> **Note:**
> Several code samples in this section use `System.Drawing.Bitmap`, which requires the `System.Drawing.Common` package and is supported only on Windows. The async patterns they demonstrate apply on all platforms; substitute a cross-platform imaging library for non-Windows targets.

### Task.Run

 The `System.Threading.Tasks.Task` class includes several `System.Threading.Tasks.Task.Run*` methods that let you easily offload work as a `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` to the thread pool. For example:

```csharp
public static async Task TaskRunBasicExample()
{
    int answer = 42;
    string result = await Task.Run(() =>
    {
        // … do compute-bound work here
        return answer.ToString();
    });
    Console.WriteLine(result);
}
```
```vb
Public Async Function TaskRunBasicExample() As Task
    Dim answer As Integer = 42
    Dim result As String = Await Task.Run(Function()
                                              ' … do compute-bound work here
                                              Return answer.ToString()
                                          End Function)
    Console.WriteLine(result)
End Function
```
 Some of these `System.Threading.Tasks.Task.Run*` methods, such as the `System.Threading.Tasks.Task.Run(System.Func{System.Threading.Tasks.Task})` overload, exist as shorthand for the `System.Threading.Tasks.TaskFactory.StartNew*` method. This overload enables you to use `await` within the offloaded work. For example:

```csharp
public static async Task TaskRunAsyncExample()
{
    Bitmap image = await Task.Run(async () =>
    {
        using Bitmap bmp1 = await Stubs.DownloadFirstImageAsync();
        using Bitmap bmp2 = await Stubs.DownloadSecondImageAsync();
        return Stubs.Mashup(bmp1, bmp2);
    });
}
```
```vb
Public Async Function TaskRunAsyncExample() As Task
    Dim image As Bitmap = Await Task.Run(Async Function()
                                             Using bmp1 As Bitmap = Await Stubs.DownloadFirstImageAsync()
                                                 Using bmp2 As Bitmap = Await Stubs.DownloadSecondImageAsync()
                                                     Return Stubs.Mashup(bmp1, bmp2)
                                                 End Using
                                             End Using
                                         End Function)
End Function
```
 Such overloads are logically equivalent to using the `System.Threading.Tasks.TaskFactory.StartNew*` method in conjunction with the `System.Threading.Tasks.TaskExtensions.Unwrap*` extension method in the Task Parallel Library.

### Task.FromResult

 Use the `System.Threading.Tasks.Task.FromResult*` method in scenarios where data might already be available and you just need to return it from a task-returning method lifted into a `System.Threading.Tasks.Task`1`:

```csharp
public static Task<int> GetValueAsync(string key)
{
    int cachedValue;
    return Stubs.TryGetCachedValue(out cachedValue) ?
        Task.FromResult(cachedValue) :
        GetValueAsyncInternal(key);
}

static async Task<int> GetValueAsyncInternal(string key)
{
    await Task.Delay(1);
    return 0;
}
```
```vb
Public Function GetValueAsync(key As String) As Task(Of Integer)
    Dim cachedValue As Integer
    If Stubs.TryGetCachedValue(cachedValue) Then
        Return Task.FromResult(cachedValue)
    Else
        Return GetValueAsyncInternal(key)
    End If
End Function

Private Async Function GetValueAsyncInternal(key As String) As Task(Of Integer)
    Await Task.Delay(1)
    Return 0
End Function
```
### Task.WhenAll

 Use the `System.Threading.Tasks.Task.WhenAll*` method to asynchronously wait on multiple asynchronous operations that are represented as tasks. The method has multiple overloads that support a set of non-generic tasks or a non-uniform set of generic tasks (for example, asynchronously waiting for multiple void-returning operations, or asynchronously waiting for multiple value-returning methods where each value might have a different type) and to support a uniform set of generic tasks (such as asynchronously waiting for multiple `TResult`-returning methods).

 Suppose you want to send email messages to several customers. You can overlap sending the messages so you're not waiting for one message to complete before sending the next. You can also find out when the send operations complete and whether any errors occur:

```csharp
IEnumerable<Task> asyncOps = from addr in addrs select SendMailAsync(addr);
await Task.WhenAll(asyncOps);
```

 This code doesn't explicitly handle exceptions that might occur, but it lets exceptions propagate out of the `await` on the resulting task from `System.Threading.Tasks.Task.WhenAll*`. To handle the exceptions, use code such as the following:

```csharp
public static async Task WhenAllWithCatch()
{
    IEnumerable<Task> asyncOps = from addr in Stubs.addrs select Stubs.SendMailAsync(addr);
    try
    {
        await Task.WhenAll(asyncOps);
    }
    catch (Exception exc)
    {
        Console.WriteLine(exc);
    }
}
```
```vb
Public Async Function WhenAllWithCatch() As Task
    Dim asyncOps As IEnumerable(Of Task) = From addr In Stubs.addrs Select Stubs.SendMailAsync(addr)
    Try
        Await Task.WhenAll(asyncOps)
    Catch exc As Exception
        Console.WriteLine(exc)
    End Try
End Function
```
 In this case, if any asynchronous operation fails, all the exceptions are consolidated in an `System.AggregateException` exception, which is stored in the `System.Threading.Tasks.Task` that is returned from the `System.Threading.Tasks.Task.WhenAll*` method. However, only one of those exceptions is propagated by the `await` keyword. If you want to examine all the exceptions, you can rewrite the previous code as follows:

```csharp
public static async Task WhenAllExamineExceptions()
{
    Task[] asyncOps = (from addr in Stubs.addrs select Stubs.SendMailAsync(addr)).ToArray();
    try
    {
        await Task.WhenAll(asyncOps);
    }
    catch (Exception exc)
    {
        foreach (Task faulted in asyncOps.Where(t => t.IsFaulted))
        {
            Console.WriteLine($"Faulted: {faulted.Exception}");
        }
    }
}
```
```vb
Public Async Function WhenAllExamineExceptions() As Task
    Dim asyncOps As Task() = (From addr In Stubs.addrs Select Stubs.SendMailAsync(addr)).ToArray()
    Try
        Await Task.WhenAll(asyncOps)
    Catch exc As Exception
        For Each faulted As Task In asyncOps.Where(Function(t) t.IsFaulted)
            Console.WriteLine($"Faulted: {faulted.Exception}")
        Next
    End Try
End Function
```
 Consider an example of downloading multiple files from the web asynchronously. In this case, all the asynchronous operations have homogeneous result types, and it's easy to access the results:

```csharp
string [] pages = await Task.WhenAll(
    from url in urls select DownloadStringTaskAsync(url));
```

 You can use the same exception-handling techniques discussed in the previous void-returning scenario:

```csharp
public static async Task WhenAllDownloadPagesExceptions()
{
    Task<string>[] asyncOps =
        (from url in Stubs.urls select Stubs.DownloadStringTaskAsync(url)).ToArray();
    try
    {
        string[] pages = await Task.WhenAll(asyncOps);
        Console.WriteLine(pages.Length);
    }
    catch (Exception exc)
    {
        foreach (Task<string> faulted in asyncOps.Where(t => t.IsFaulted))
        {
            Console.WriteLine($"Faulted: {faulted.Exception}");
        }
    }
}
```
```vb
Public Async Function WhenAllDownloadPagesExceptions() As Task
    Dim asyncOps As Task(Of String)() =
        (From url In Stubs.urls Select Stubs.DownloadStringTaskAsync(url)).ToArray()
    Try
        Dim pages As String() = Await Task.WhenAll(asyncOps)
        Console.WriteLine(pages.Length)
    Catch exc As Exception
        For Each faulted As Task(Of String) In asyncOps.Where(Function(t) t.IsFaulted)
            Console.WriteLine($"Faulted: {faulted.Exception}")
        Next
    End Try
End Function
```
