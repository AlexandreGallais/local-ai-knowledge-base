---
title: "Interop with Other Asynchronous Patterns and Types (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/interop-with-other-asynchronous-patterns-and-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Interop with Other Asynchronous Patterns and Types (part 2 of 2)

## Tasks and Wait Handles

### From Wait Handles to TAP

 Although wait handles don't implement an asynchronous pattern, advanced developers may use the `System.Threading.WaitHandle` class and the `System.Threading.ThreadPool.RegisterWaitForSingleObject*` method for asynchronous notifications when a wait handle is set.  You can wrap the `System.Threading.ThreadPool.RegisterWaitForSingleObject*` method to enable a task-based alternative to any synchronous wait on a wait handle:

 ```csharp
﻿using System;
using System.Threading;
using System.Threading.Tasks;

public static class Example
{
    public static Task WaitOneAsync(this WaitHandle waitHandle)
    {
        if (waitHandle == null)
            throw new ArgumentNullException("waitHandle");

        var tcs = new TaskCompletionSource<bool>();
        var rwh = ThreadPool.RegisterWaitForSingleObject(waitHandle,
            delegate { tcs.TrySetResult(true); }, null, -1, true);
        var t = tcs.Task;
        t.ContinueWith( (antecedent) => rwh.Unregister(null));
        return t;
    }

   public static void MethodA()
   {
     var task = Task.Run( () => { Thread.Sleep(1000); } );
     WaitHandle wh = ((IAsyncResult)task).AsyncWaitHandle;
   }
}
```

 With this method, you can use existing `System.Threading.WaitHandle` implementations in asynchronous methods.  For example, if you want to throttle the number of asynchronous operations that are executing at any particular time, you can utilize a semaphore (a `System.Threading.SemaphoreSlim` object).  You can throttle to *N* the number of operations that run concurrently by initializing the semaphore's count to *N*, waiting on the semaphore any time you want to perform an operation, and releasing the semaphore when you're done with an operation:

 ```csharp
﻿using System;
using System.Threading;
using System.Threading.Tasks;

public class Example
{
    static int N = 3;

    static SemaphoreSlim m_throttle = new SemaphoreSlim(N, N);

    static async Task DoOperation()
    {
        await m_throttle.WaitAsync();
        // do work
        m_throttle.Release();
    }
}
```

 You can also build an asynchronous semaphore that does not rely on wait handles and instead works completely with tasks. To do this, you can use techniques such as those discussed in Consuming the Task-based Asynchronous Pattern for building data structures on top of `System.Threading.Tasks.Task`.

### From TAP to Wait Handles

 As previously mentioned, the `System.Threading.Tasks.Task` class implements `System.IAsyncResult`, and that implementation exposes an `System.Threading.Tasks.Task.System#IAsyncResult#AsyncWaitHandle` property that returns a wait handle that will be set when the `System.Threading.Tasks.Task` completes.  You can get a `System.Threading.WaitHandle` for a `System.Threading.Tasks.Task` as follows:

 ```csharp
﻿using System;
using System.Threading;
using System.Threading.Tasks;

public static class Example
{
    public static Task WaitOneAsync(this WaitHandle waitHandle)
    {
        if (waitHandle == null)
            throw new ArgumentNullException("waitHandle");

        var tcs = new TaskCompletionSource<bool>();
        var rwh = ThreadPool.RegisterWaitForSingleObject(waitHandle,
            delegate { tcs.TrySetResult(true); }, null, -1, true);
        var t = tcs.Task;
        t.ContinueWith( (antecedent) => rwh.Unregister(null));
        return t;
    }

   public static void MethodA()
   {
     var task = Task.Run( () => { Thread.Sleep(1000); } );
     WaitHandle wh = ((IAsyncResult)task).AsyncWaitHandle;
   }
}
```

## See also

- Task-based Asynchronous Pattern (TAP)
- Implementing the Task-based Asynchronous Pattern
- Consuming the Task-based Asynchronous Pattern
