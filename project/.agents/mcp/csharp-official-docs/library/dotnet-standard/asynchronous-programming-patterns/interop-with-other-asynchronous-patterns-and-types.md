---
title: "Interop with Other Asynchronous Patterns and Types (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/interop-with-other-asynchronous-patterns-and-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Interop with Other Asynchronous Patterns and Types

A brief history of asynchronous patterns in .NET:

- .NET Framework 1.0 introduced the `System.IAsyncResult` pattern, otherwise known as the Asynchronous Programming Model (APM), or the `Begin/End` pattern.
- .NET Framework 2.0 added the Event-based Asynchronous Pattern (EAP).
- .NET Framework 4 introduced the Task-based Asynchronous Pattern (TAP), which supersedes both APM and EAP and provides the ability to easily build migration routines from the earlier patterns.

## Tasks and the Asynchronous Programming Model (APM)

### From APM to TAP

 Because the Asynchronous Programming Model (APM) pattern is structured, it is quite easy to build a wrapper to expose an APM implementation as a TAP implementation. .NET Framework 4 and later versions include helper routines in the form of `System.Threading.Tasks.TaskFactory.FromAsync*` method overloads to provide this translation.

 Consider the `System.IO.Stream` class and its `System.IO.Stream.BeginRead*` and `System.IO.Stream.EndRead*` methods, which represent the APM counterpart to the synchronous `System.IO.Stream.Read*` method:

 ```csharp
﻿using System;

public class Stream
{
    public int Read(byte[] buffer, int offset, int count)
    { return 0; }

    public IAsyncResult BeginRead(byte[] buffer, int offset,
                                  int count, AsyncCallback callback,
                                  object state)
    { return null;  }

    public int EndRead(IAsyncResult asyncResult)
    { return 0; }
}
```

```csharp
﻿using System;

public class Stream
{
    public int Read(byte[] buffer, int offset, int count)
    { return 0; }

    public IAsyncResult BeginRead(byte[] buffer, int offset,
                                  int count, AsyncCallback callback,
                                  object state)
    { return null;  }

    public int EndRead(IAsyncResult asyncResult)
    { return 0; }
}
```

```csharp
﻿using System;

public class Stream
{
    public int Read(byte[] buffer, int offset, int count)
    { return 0; }

    public IAsyncResult BeginRead(byte[] buffer, int offset,
                                  int count, AsyncCallback callback,
                                  object state)
    { return null;  }

    public int EndRead(IAsyncResult asyncResult)
    { return 0; }
}
```

 You can use the `System.Threading.Tasks.TaskFactory`1.FromAsync*` method to implement a TAP wrapper for this operation as follows:

 ```csharp
﻿using System;
using System.IO;
using System.Threading.Tasks;

public static class Wrapper
{
    public static Task<int> ReadAsync(this Stream stream,
                                      byte[] buffer, int offset,
                                      int count)
    {
        if (stream == null)
           throw new ArgumentNullException("stream");

        return Task<int>.Factory.FromAsync(stream.BeginRead,
                                           stream.EndRead, buffer,
                                           offset, count, null);
    }
}
```

 This implementation is similar to the following:

 ```csharp
﻿using System;
using System.IO;
using System.Threading.Tasks;

public static class Wrapper
{
    public static Task<int> ReadAsync(this Stream stream,
                                      byte [] buffer, int offset,
                                      int count)
    {
       if (stream == null)
           throw new ArgumentNullException("stream");

       var tcs = new TaskCompletionSource<int>();
       stream.BeginRead(buffer, offset, count, iar =>
                        {
                           try {
                              tcs.TrySetResult(stream.EndRead(iar));
                           }
                           catch(OperationCanceledException) {
                              tcs.TrySetCanceled();
                           }
                           catch(Exception exc) {
                              tcs.TrySetException(exc);
                           }
                        }, null);
       return tcs.Task;
   }
}
```

### From TAP to APM

 If your existing infrastructure expects the APM pattern, you'll also want to take a TAP implementation and use it where an APM implementation is expected.  Because tasks can be composed and  the `System.Threading.Tasks.Task` class implements `System.IAsyncResult`, you can use a straightforward helper function to do this. The following code uses an extension of the `System.Threading.Tasks.Task`1` class, but you can use an almost identical function for non-generic tasks.

 ```csharp
﻿using System;
using System.Threading.Tasks;

public static class Example
{
    public static IAsyncResult AsApm<T>(this Task<T> task,
                                        AsyncCallback callback,
                                        object state)
    {
        if (task == null)
            throw new ArgumentNullException("task");

        var tcs = new TaskCompletionSource<T>(state);
        task.ContinueWith(t =>
                          {
                             if (t.IsFaulted)
                                tcs.TrySetException(t.Exception.InnerExceptions);
                             else if (t.IsCanceled)
                                tcs.TrySetCanceled();
                             else
                                tcs.TrySetResult(t.Result);

                             if (callback != null)
                                callback(tcs.Task);
                          }, TaskScheduler.Default);
        return tcs.Task;
    }
}
```

 Now, consider a case where you have the following TAP implementation:

 ```csharp
﻿using System;
using System.Threading.Tasks;

public class Example
{
   public static Task<String> DownloadStringAsync(Uri url)
   { return Task.FromResult<String>(String.Empty); }

   public IAsyncResult BeginDownloadString(Uri url,
                                           AsyncCallback callback,
                                           object state)
   { return null; }

   public string EndDownloadString(IAsyncResult asyncResult)
   { return String.Empty; }
}

public class Example2
{
   public IAsyncResult BeginDownloadString(Uri url,
                                           AsyncCallback callback,
                                           object state)
   {
      return DownloadStringAsync(url).AsApm(callback, state);
   }

   public string EndDownloadString(IAsyncResult asyncResult)
   {
      return ((Task<string>)asyncResult).Result;
   }

   public static Task<String> DownloadStringAsync(Uri url)
   { return Task.FromResult<String>(String.Empty); }
}

public static class Library
{
    public static IAsyncResult AsApm<T>(this Task<T> task,
                                        AsyncCallback callback,
                                        object state)
    {
        if (task == null)
            throw new ArgumentNullException("task");

        var tcs = new TaskCompletionSource<T>(state);
        task.ContinueWith(t =>
                          {
                             if (t.IsFaulted)
                                tcs.TrySetException(t.Exception.InnerExceptions);
                             else if (t.IsCanceled)
                                tcs.TrySetCanceled();
                             else
                                tcs.TrySetResult(t.Result);

                             if (callback != null)
                                callback(tcs.Task);
                          }, TaskScheduler.Default);
        return tcs.Task;
    }
}
```

 and you want to provide this APM implementation:

 ```csharp
﻿using System;
using System.Threading.Tasks;

public class Example
{
   public static Task<String> DownloadStringAsync(Uri url)
   { return Task.FromResult<String>(String.Empty); }

   public IAsyncResult BeginDownloadString(Uri url,
                                           AsyncCallback callback,
                                           object state)
   { return null; }

   public string EndDownloadString(IAsyncResult asyncResult)
   { return String.Empty; }
}

public class Example2
{
   public IAsyncResult BeginDownloadString(Uri url,
                                           AsyncCallback callback,
                                           object state)
   {
      return DownloadStringAsync(url).AsApm(callback, state);
   }

   public string EndDownloadString(IAsyncResult asyncResult)
   {
      return ((Task<string>)asyncResult).Result;
   }

   public static Task<String> DownloadStringAsync(Uri url)
   { return Task.FromResult<String>(String.Empty); }
}

public static class Library
{
    public static IAsyncResult AsApm<T>(this Task<T> task,
                                        AsyncCallback callback,
                                        object state)
    {
        if (task == null)
            throw new ArgumentNullException("task");

        var tcs = new TaskCompletionSource<T>(state);
        task.ContinueWith(t =>
                          {
                             if (t.IsFaulted)
                                tcs.TrySetException(t.Exception.InnerExceptions);
                             else if (t.IsCanceled)
                                tcs.TrySetCanceled();
                             else
                                tcs.TrySetResult(t.Result);

                             if (callback != null)
                                callback(tcs.Task);
                          }, TaskScheduler.Default);
        return tcs.Task;
    }
}
```

```csharp
﻿using System;
using System.Threading.Tasks;

public class Example
{
   public static Task<String> DownloadStringAsync(Uri url)
   { return Task.FromResult<String>(String.Empty); }

   public IAsyncResult BeginDownloadString(Uri url,
                                           AsyncCallback callback,
                                           object state)
   { return null; }

   public string EndDownloadString(IAsyncResult asyncResult)
   { return String.Empty; }
}

public class Example2
{
   public IAsyncResult BeginDownloadString(Uri url,
                                           AsyncCallback callback,
                                           object state)
   {
      return DownloadStringAsync(url).AsApm(callback, state);
   }

   public string EndDownloadString(IAsyncResult asyncResult)
   {
      return ((Task<string>)asyncResult).Result;
   }

   public static Task<String> DownloadStringAsync(Uri url)
   { return Task.FromResult<String>(String.Empty); }
}

public static class Library
{
    public static IAsyncResult AsApm<T>(this Task<T> task,
                                        AsyncCallback callback,
                                        object state)
    {
        if (task == null)
            throw new ArgumentNullException("task");

        var tcs = new TaskCompletionSource<T>(state);
        task.ContinueWith(t =>
                          {
                             if (t.IsFaulted)
                                tcs.TrySetException(t.Exception.InnerExceptions);
                             else if (t.IsCanceled)
                                tcs.TrySetCanceled();
                             else
                                tcs.TrySetResult(t.Result);

                             if (callback != null)
                                callback(tcs.Task);
                          }, TaskScheduler.Default);
        return tcs.Task;
    }
}
```

 The following example demonstrates one migration to APM:

 ```csharp
﻿using System;
using System.Threading.Tasks;

public class Example
{
   public static Task<String> DownloadStringAsync(Uri url)
   { return Task.FromResult<String>(String.Empty); }

   public IAsyncResult BeginDownloadString(Uri url,
                                           AsyncCallback callback,
                                           object state)
   { return null; }

   public string EndDownloadString(IAsyncResult asyncResult)
   { return String.Empty; }
}

public class Example2
{
   public IAsyncResult BeginDownloadString(Uri url,
                                           AsyncCallback callback,
                                           object state)
   {
      return DownloadStringAsync(url).AsApm(callback, state);
   }

   public string EndDownloadString(IAsyncResult asyncResult)
   {
      return ((Task<string>)asyncResult).Result;
   }

   public static Task<String> DownloadStringAsync(Uri url)
   { return Task.FromResult<String>(String.Empty); }
}

public static class Library
{
    public static IAsyncResult AsApm<T>(this Task<T> task,
                                        AsyncCallback callback,
                                        object state)
    {
        if (task == null)
            throw new ArgumentNullException("task");

        var tcs = new TaskCompletionSource<T>(state);
        task.ContinueWith(t =>
                          {
                             if (t.IsFaulted)
                                tcs.TrySetException(t.Exception.InnerExceptions);
                             else if (t.IsCanceled)
                                tcs.TrySetCanceled();
                             else
                                tcs.TrySetResult(t.Result);

                             if (callback != null)
                                callback(tcs.Task);
                          }, TaskScheduler.Default);
        return tcs.Task;
    }
}
```

## Tasks and the Event-based Asynchronous Pattern (EAP)

 Wrapping an Event-based Asynchronous Pattern (EAP) implementation is more involved than wrapping an APM pattern, because the EAP pattern has more variation and less structure than the APM pattern.  To demonstrate, the following code wraps the `DownloadStringAsync` method.  `DownloadStringAsync` accepts a URI, raises the `DownloadProgressChanged` event while downloading in order to report multiple statistics on progress, and raises the `DownloadStringCompleted` event when it's done.  The final result is a string that contains the contents of the page at the specified URI.

 ```csharp
﻿using System;
using System.Threading.Tasks;
using System.Net;

public class Example
{
    public static Task<string> DownloadStringAsync(Uri url)
    {
        var tcs = new TaskCompletionSource<string>();
        var wc = new WebClient();
        wc.DownloadStringCompleted += (s,e) =>
            {
                if (e.Error != null)
                   tcs.TrySetException(e.Error);
                else if (e.Cancelled)
                   tcs.TrySetCanceled();
                else
                   tcs.TrySetResult(e.Result);
            };
        wc.DownloadStringAsync(url);
        return tcs.Task;
   }
}
```
