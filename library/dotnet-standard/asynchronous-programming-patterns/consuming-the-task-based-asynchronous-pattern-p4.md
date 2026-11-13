---
title: "Consuming the Task-based Asynchronous Pattern (part 4 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/consuming-the-task-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Consuming the Task-based Asynchronous Pattern (part 4 of 6)

```csharp
class EarlyBailoutWithTokenUI
{
    private CancellationTokenSource? m_cts;

    public async void btnRun_Click(object sender, EventArgs e)
    {
        m_cts = new CancellationTokenSource();
        try
        {
            Task<Bitmap> imageDownload = Stubs.GetBitmapAsync("url", m_cts.Token);
            await Examples.UntilCompletionOrCancellation(imageDownload, m_cts.Token);
            Bitmap image = await imageDownload;
            Stubs.Log(image);
        }
        catch (OperationCanceledException) { }
        finally { }
    }
}
```
```vb
Class EarlyBailoutWithTokenUI
    Private m_cts As CancellationTokenSource

    Public Async Sub btnRun_Click(sender As Object, e As EventArgs)
        m_cts = New CancellationTokenSource()
        Try
            Dim imageDownload As Task(Of Bitmap) = Stubs.GetBitmapAsync("url", m_cts.Token)
            Await Examples.UntilCompletionOrCancellation(imageDownload, m_cts.Token)
            Dim image As Bitmap = Await imageDownload
            Stubs.Log(image)
        Catch ex As OperationCanceledException
        Finally
        End Try
    End Sub
End Class
```
 Another example of early bailout involves using the `System.Threading.Tasks.Task.WhenAny*` method in conjunction with the `System.Threading.Tasks.Task.Delay*` method, as discussed in the next section.

### Task.Delay

 Use the `System.Threading.Tasks.Task.Delay*` method to add pauses into an asynchronous method's execution. This pause is useful for many kinds of functionality, including building polling loops and delaying the handling of user input for a predetermined period of time. You can also use the `System.Threading.Tasks.Task.Delay*` method with `System.Threading.Tasks.Task.WhenAny*` to implement time-outs on awaits.

 If a task that's part of a larger asynchronous operation (for example, an ASP.NET web service) takes too long to complete, the overall operation could suffer, especially if it fails to ever complete. For this reason, it's important to be able to time out when waiting on an asynchronous operation. The synchronous `System.Threading.Tasks.Task.Wait*`, `System.Threading.Tasks.Task.WaitAll*`, and `System.Threading.Tasks.Task.WaitAny*` methods accept time-out values, but the corresponding `System.Threading.Tasks.TaskFactory.ContinueWhenAll*`/`System.Threading.Tasks.TaskFactory.ContinueWhenAny*` and the previously mentioned `System.Threading.Tasks.Task.WhenAll*`/`System.Threading.Tasks.Task.WhenAny*` methods don't. Instead, use `System.Threading.Tasks.Task.Delay*` and `System.Threading.Tasks.Task.WhenAny*` together to implement a time-out.

 For example, in your UI application, suppose that you want to download an image and disable the UI while the image is downloading. However, if the download takes too long, you want to re-enable the UI and discard the download:

```csharp
public static async Task<Bitmap?> DownloadWithTimeout(string url)
{
    Task<Bitmap> download = Stubs.GetBitmapAsync(url);
    if (download == await Task.WhenAny(download, Task.Delay(3000)))
    {
        return await download;
    }
    else
    {
        var ignored = download.ContinueWith(
            t => Trace($"Task finally completed: {t.Status}"));
        return null;
    }
}

static void Trace(string message) => Console.WriteLine(message);
```
```vb
Public Async Function DownloadWithTimeout(url As String) As Task(Of Bitmap)
    Dim download As Task(Of Bitmap) = Stubs.GetBitmapAsync(url)
    If download Is Await Task.WhenAny(download, Task.Delay(3000)) Then
        Return Await download
    Else
        Dim ignored = download.ContinueWith(Sub(t) TraceMsg($"Task finally completed: {t.Status}"))
        Return Nothing
    End If
End Function
```
 The same principle applies to multiple downloads, because `System.Threading.Tasks.Task.WhenAll*` returns a task:

```csharp
public static async Task<Bitmap[]?> DownloadMultipleWithTimeout(string[] imageUrls)
{
    Task<Bitmap[]> downloads =
        Task.WhenAll(from url in imageUrls select Stubs.GetBitmapAsync(url));
    if (downloads == await Task.WhenAny(downloads, Task.Delay(3000)))
    {
        return await downloads;
    }
    else
    {
        downloads.ContinueWith(t => Stubs.Log(t));
        return null;
    }
}
```
```vb
Public Async Function DownloadMultipleWithTimeout(imageUrls As String()) As Task(Of Bitmap())
    Dim downloads As Task(Of Bitmap()) =
        Task.WhenAll(From url In imageUrls Select Stubs.GetBitmapAsync(url))
    If downloads Is Await Task.WhenAny(downloads, Task.Delay(3000)) Then
        Return Await downloads
    Else
        downloads.ContinueWith(Sub(t) Stubs.Log(t))
        Return Nothing
    End If
End Function
```
