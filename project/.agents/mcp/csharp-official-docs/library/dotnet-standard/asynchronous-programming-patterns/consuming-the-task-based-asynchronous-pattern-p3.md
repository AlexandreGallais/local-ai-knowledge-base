---
title: "Consuming the Task-based Asynchronous Pattern (part 3 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/consuming-the-task-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Consuming the Task-based Asynchronous Pattern (part 3 of 6)

### Task.WhenAny

 Use the `System.Threading.Tasks.Task.WhenAny*` method to asynchronously wait for just one of multiple asynchronous operations represented as tasks to complete. This method serves four primary use cases:

- Redundancy:  Performing an operation multiple times and selecting the one that completes first (for example, contacting multiple stock quote web services that return a single result and selecting the one that completes the fastest).

- Interleaving:  Launching multiple operations and waiting for all of them to complete, but processing them as they complete.

- Throttling:  Allowing additional operations to begin as others complete. This scenario is an extension of the interleaving scenario.

- Early bailout:  For example, an operation represented by task t1 can be grouped in a `System.Threading.Tasks.Task.WhenAny*` task with another task t2, and you can wait on the `System.Threading.Tasks.Task.WhenAny*` task. Task t2 could represent a time-out, or cancellation, or some other signal that causes the `System.Threading.Tasks.Task.WhenAny*` task to complete before t1 completes.

#### Redundancy

 Consider a case where you want to make a decision about whether to buy a stock. Several stock recommendation web services exist that you trust, but depending on daily load, each service can end up being slow at different times. Use the `System.Threading.Tasks.Task.WhenAny*` method to receive a notification when any operation completes:

```csharp
public static async Task WhenAnyRedundancy(string symbol)
{
    var recommendations = new List<Task<bool>>()
    {
        Stubs.GetBuyRecommendation1Async(symbol),
        Stubs.GetBuyRecommendation2Async(symbol),
        Stubs.GetBuyRecommendation3Async(symbol)
    };
    Task<bool> recommendation = await Task.WhenAny(recommendations);
    if (await recommendation) Stubs.BuyStock(symbol);
}
```
```vb
Public Async Function WhenAnyRedundancy(symbol As String) As Task
    Dim recommendations As New List(Of Task(Of Boolean)) From {
        Stubs.GetBuyRecommendation1Async(symbol),
        Stubs.GetBuyRecommendation2Async(symbol),
        Stubs.GetBuyRecommendation3Async(symbol)
    }
    Dim recommendation As Task(Of Boolean) = Await Task.WhenAny(recommendations)
    If Await recommendation Then Stubs.BuyStock(symbol)
End Function
```
 Unlike `System.Threading.Tasks.Task.WhenAll*`, which returns the unwrapped results of all tasks that completed successfully, `System.Threading.Tasks.Task.WhenAny*` returns the task that completed. If a task fails, it's important to know that it failed, and if a task succeeds, it's important to know which task the return value is associated with. Therefore, you need to access the result of the returned task, or further await it, as  this example shows.

 As with `System.Threading.Tasks.Task.WhenAll*`, you have to be able to accommodate exceptions. Because you receive the completed task back, you can await the returned task to have errors propagated, and `try/catch` them appropriately; for example:

```csharp
public static async Task WhenAnyRetryOnException(string symbol)
{
    Task<bool>[] allRecommendations = new Task<bool>[]
    {
        Stubs.GetBuyRecommendation1Async(symbol),
        Stubs.GetBuyRecommendation2Async(symbol),
        Stubs.GetBuyRecommendation3Async(symbol)
    };
    var remaining = allRecommendations.ToList();
    while (remaining.Count > 0)
    {
        Task<bool> recommendation = await Task.WhenAny(remaining);
        try
        {
            if (await recommendation) Stubs.BuyStock(symbol);
            break;
        }
        catch (WebException)
        {
            remaining.Remove(recommendation);
        }
    }
}
```
```vb
Public Async Function WhenAnyRetryOnException(symbol As String) As Task
    Dim allRecommendations As Task(Of Boolean)() = {
        Stubs.GetBuyRecommendation1Async(symbol),
        Stubs.GetBuyRecommendation2Async(symbol),
        Stubs.GetBuyRecommendation3Async(symbol)
    }
    Dim remaining As List(Of Task(Of Boolean)) = allRecommendations.ToList()
    While remaining.Count > 0
        Dim recommendation As Task(Of Boolean) = Await Task.WhenAny(remaining)
        Try
            If Await recommendation Then Stubs.BuyStock(symbol)
            Exit While
        Catch ex As WebException
            remaining.Remove(recommendation)
        End Try
    End While
End Function
```
 Additionally, even if a first task completes successfully, subsequent tasks might fail. At this point, you have several options for dealing with exceptions:  You can wait until all the launched tasks complete, in which case you can use the `System.Threading.Tasks.Task.WhenAll*` method, or you can decide that all exceptions are important and must be logged. For this scenario, you can use continuations to receive a notification when tasks complete asynchronously:

```csharp
foreach(Task recommendation in recommendations)
{
    var ignored = recommendation.ContinueWith(
        t => { if (t.IsFaulted) Log(t.Exception); });
}
```

 or:

```csharp
foreach(Task recommendation in recommendations)
{
    var ignored = recommendation.ContinueWith(
        t => Log(t.Exception), TaskContinuationOptions.OnlyOnFaulted);
}
```

 or even:

```csharp
private static async void LogCompletionIfFailed(IEnumerable<Task> tasks)
{
    foreach (var task in tasks)
    {
        try { await task; }
        catch (Exception exc) { Stubs.Log(exc); }
    }
}
```
```vb
Private Async Sub LogCompletionIfFailed(tasks As IEnumerable(Of Task))
    For Each task In tasks
        Try
            Await task
        Catch exc As Exception
            Stubs.Log(exc)
        End Try
    Next
End Sub
```
 Finally, you might want to cancel all the remaining operations:

```csharp
public static async Task WhenAnyCancelRemainder(string symbol)
{
    var cts = new CancellationTokenSource();
    var recommendations = new List<Task<bool>>()
    {
        Stubs.GetBuyRecommendation1Async(symbol, cts.Token),
        Stubs.GetBuyRecommendation2Async(symbol, cts.Token),
        Stubs.GetBuyRecommendation3Async(symbol, cts.Token)
    };

    Task<bool> recommendation = await Task.WhenAny(recommendations);
    cts.Cancel();
    if (await recommendation) Stubs.BuyStock(symbol);
}
```
```vb
Public Async Function WhenAnyCancelRemainder(symbol As String) As Task
    Dim cts As New CancellationTokenSource()
    Dim recommendations As New List(Of Task(Of Boolean)) From {
        Stubs.GetBuyRecommendation1Async(symbol, cts.Token),
        Stubs.GetBuyRecommendation2Async(symbol, cts.Token),
        Stubs.GetBuyRecommendation3Async(symbol, cts.Token)
    }

    Dim recommendation As Task(Of Boolean) = Await Task.WhenAny(recommendations)
    cts.Cancel()
    If Await recommendation Then Stubs.BuyStock(symbol)
End Function
```
#### Interleaving

 Consider a case where you're downloading images from the web and processing each image (for example, adding the image to a UI control). You process the images sequentially on the UI thread, but want to download the images as concurrently as possible. Also, you don't want to hold up adding the images to the UI until they're all downloaded. Instead, you want to add them as they complete.

```csharp
public static async Task WhenAnyInterleaving(string[] imageUrls)
{
    List<Task<Bitmap>> imageTasks =
        (from imageUrl in imageUrls select Stubs.GetBitmapAsync(imageUrl)).ToList();
    while (imageTasks.Count > 0)
    {
        try
        {
            Task<Bitmap> imageTask = await Task.WhenAny(imageTasks);
            imageTasks.Remove(imageTask);

            Bitmap image = await imageTask;
            Console.WriteLine($"Got image: {image.Width}x{image.Height}");
        }
        catch { }
    }
}
```
```vb
Public Async Function WhenAnyInterleaving(imageUrls As String()) As Task
    Dim imageTasks As List(Of Task(Of Bitmap)) =
        (From imageUrl In imageUrls Select Stubs.GetBitmapAsync(imageUrl)).ToList()
    While imageTasks.Count > 0
        Try
            Dim imageTask As Task(Of Bitmap) = Await Task.WhenAny(imageTasks)
            imageTasks.Remove(imageTask)

            Dim image As Bitmap = Await imageTask
            Console.WriteLine($"Got image: {image.Width}x{image.Height}")
        Catch
        End Try
    End While
End Function
```
 You can also apply interleaving to a scenario that involves computationally intensive processing on the `System.Threading.ThreadPool` of the downloaded images; for example:

```csharp
public static async Task WhenAnyInterleavingWithProcessing(string[] imageUrls)
{
    List<Task<Bitmap>> imageTasks =
        (from imageUrl in imageUrls
         select Stubs.GetBitmapAsync(imageUrl)
             .ContinueWith(t => Stubs.ConvertImage(t.Result))).ToList();
    while (imageTasks.Count > 0)
    {
        try
        {
            Task<Bitmap> imageTask = await Task.WhenAny(imageTasks);
            imageTasks.Remove(imageTask);

            Bitmap image = await imageTask;
            Console.WriteLine($"Got image: {image.Width}x{image.Height}");
        }
        catch { }
    }
}
```
```vb
Public Async Function WhenAnyInterleavingWithProcessing(imageUrls As String()) As Task
    Dim imageTasks As List(Of Task(Of Bitmap)) =
        (From imageUrl In imageUrls
         Select Stubs.GetBitmapAsync(imageUrl).ContinueWith(Function(t) Stubs.ConvertImage(t.Result))).ToList()
    While imageTasks.Count > 0
        Try
            Dim imageTask As Task(Of Bitmap) = Await Task.WhenAny(imageTasks)
            imageTasks.Remove(imageTask)

            Dim image As Bitmap = Await imageTask
            Console.WriteLine($"Got image: {image.Width}x{image.Height}")
        Catch
        End Try
    End While
End Function
```
#### Throttling

 Consider the interleaving example, except that the user is downloading so many images that the downloads have to be throttled. For example, you want only a specific number of downloads to happen concurrently. To achieve this goal, start a subset of the asynchronous operations. As operations complete, you can start additional operations to take their place:

```csharp
public static async Task WhenAnyThrottling(Uri[] uriList)
{
    const int CONCURRENCY_LEVEL = 15;
    int nextIndex = 0;
    var imageTasks = new List<Task<Bitmap>>();
    while (nextIndex < CONCURRENCY_LEVEL && nextIndex < uriList.Length)
    {
        imageTasks.Add(Stubs.GetBitmapAsync(uriList[nextIndex].ToString()));
        nextIndex++;
    }

    while (imageTasks.Count > 0)
    {
        try
        {
            Task<Bitmap> imageTask = await Task.WhenAny(imageTasks);
            imageTasks.Remove(imageTask);

            Bitmap image = await imageTask;
            Console.WriteLine($"Got image: {image.Width}x{image.Height}");
        }
        catch (Exception exc) { Stubs.Log(exc); }

        if (nextIndex < uriList.Length)
        {
            imageTasks.Add(Stubs.GetBitmapAsync(uriList[nextIndex].ToString()));
            nextIndex++;
        }
    }
}
```
```vb
Public Async Function WhenAnyThrottling(uriList As Uri()) As Task
    Const CONCURRENCY_LEVEL As Integer = 15
    Dim nextIndex As Integer = 0
    Dim imageTasks As New List(Of Task(Of Bitmap))
    While nextIndex < CONCURRENCY_LEVEL AndAlso nextIndex < uriList.Length
        imageTasks.Add(Stubs.GetBitmapAsync(uriList(nextIndex).ToString()))
        nextIndex += 1
    End While

    While imageTasks.Count > 0
        Try
            Dim imageTask As Task(Of Bitmap) = Await Task.WhenAny(imageTasks)
            imageTasks.Remove(imageTask)

            Dim image As Bitmap = Await imageTask
            Console.WriteLine($"Got image: {image.Width}x{image.Height}")
        Catch exc As Exception
            Stubs.Log(exc)
        End Try

        If nextIndex < uriList.Length Then
            imageTasks.Add(Stubs.GetBitmapAsync(uriList(nextIndex).ToString()))
            nextIndex += 1
        End If
    End While
End Function
```
#### Early Bailout

 Consider that you're waiting asynchronously for an operation to complete while simultaneously responding to a user's cancellation request (for example, the user clicked a cancel button). The following code illustrates this scenario:

```csharp
class EarlyBailoutUI
{
    private CancellationTokenSource? m_cts;

    public void btnCancel_Click(object sender, EventArgs e)
    {
        if (m_cts != null) m_cts.Cancel();
    }

    public async void btnRun_Click(object sender, EventArgs e)
    {
        m_cts = new CancellationTokenSource();
        try
        {
            Task<Bitmap> imageDownload = Stubs.GetBitmapAsync("url");
            await Examples.UntilCompletionOrCancellation(imageDownload, m_cts.Token);
            if (imageDownload.IsCompleted)
            {
                Bitmap image = await imageDownload;
                Stubs.Log(image);
            }
            else imageDownload.ContinueWith(t => Stubs.Log(t));
        }
        finally { }
    }
}
```
```vb
Class EarlyBailoutUI
    Private m_cts As CancellationTokenSource

    Public Sub btnCancel_Click(sender As Object, e As EventArgs)
        If m_cts IsNot Nothing Then m_cts.Cancel()
    End Sub

    Public Async Sub btnRun_Click(sender As Object, e As EventArgs)
        m_cts = New CancellationTokenSource()
        Try
            Dim imageDownload As Task(Of Bitmap) = Stubs.GetBitmapAsync("url")
            Await Examples.UntilCompletionOrCancellation(imageDownload, m_cts.Token)
            If imageDownload.IsCompleted Then
                Dim image As Bitmap = Await imageDownload
                Stubs.Log(image)
            Else
                imageDownload.ContinueWith(Sub(t) Stubs.Log(t))
            End If
        Finally
        End Try
    End Sub
End Class
```
 This implementation re-enables the user interface as soon as you decide to bail out, but doesn't cancel the underlying asynchronous operations. Another alternative would be to cancel the pending operations when you decide to bail out, but not reestablish the user interface until the operations complete, potentially due to ending early due to the cancellation request:
