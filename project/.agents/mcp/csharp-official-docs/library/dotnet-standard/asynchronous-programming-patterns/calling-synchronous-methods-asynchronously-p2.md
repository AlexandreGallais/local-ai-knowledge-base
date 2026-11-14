---
title: "Calling Synchronous Methods Asynchronously (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/calling-synchronous-methods-asynchronously.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Calling Synchronous Methods Asynchronously (part 2 of 2)

## Executing a Callback Method When an Asynchronous Call Completes

 If the thread that initiates the asynchronous call does not need to be the thread that processes the results, you can execute a callback method when the call completes. The callback method is executed on a `System.Threading.ThreadPool` thread.

 To use a callback method, you must pass `BeginInvoke` an `System.AsyncCallback` delegate that represents the callback method. You can also pass an object that contains information to be used by the callback method. In the callback method, you can cast the `System.IAsyncResult`, which is the only parameter of the callback method, to an `System.Runtime.Remoting.Messaging.AsyncResult` object. You can then use the `System.Runtime.Remoting.Messaging.AsyncResult.AsyncDelegate` property to get the delegate that was used to initiate the call so that you can call `EndInvoke`.

 Notes on the example:

- The `threadId` parameter of `TestMethod` is an `out` parameter ([`<Out>` `ByRef` in Visual Basic), so its input value is never used by `TestMethod`. A dummy variable is passed to the `BeginInvoke` call. If the `threadId` parameter were a `ref` parameter (`ByRef` in Visual Basic), the variable would have to be a class-level field so that it could be passed to both `BeginInvoke` and `EndInvoke`.

- The state information that is passed to `BeginInvoke` is a format string, which the callback method uses to format an output message. Because it is passed as type `System.Object`, the state information must be cast to its proper type before it can be used.

- The callback is made on a `System.Threading.ThreadPool` thread. `System.Threading.ThreadPool` threads are background threads, which do not keep the application running if the main thread ends, so the main thread of the example has to sleep long enough for the callback to finish.

 ```csharp
using System;
using System.Threading;
using System.Runtime.Remoting.Messaging;

namespace Examples.AdvancedProgramming.AsynchronousOperations
{
    public class AsyncMain4
    {
        static void Main()
        {
            // Create an instance of the test class.
            AsyncDemo ad = new AsyncDemo();

            // Create the delegate.
            AsyncMethodCaller caller = new AsyncMethodCaller(ad.TestMethod);

            // The threadId parameter of TestMethod is an out parameter, so
            // its input value is never used by TestMethod. Therefore, a dummy
            // variable can be passed to the BeginInvoke call. If the threadId
            // parameter were a ref parameter, it would have to be a class-
            // level field so that it could be passed to both BeginInvoke and
            // EndInvoke.
            int dummy = 0;

            // Initiate the asynchronous call, passing three seconds (3000 ms)
            // for the callDuration parameter of TestMethod; a dummy variable
            // for the out parameter (threadId); the callback delegate; and
            // state information that can be retrieved by the callback method.
            // In this case, the state information is a string that can be used
            // to format a console message.
            IAsyncResult result = caller.BeginInvoke(3000,
                out dummy,
                new AsyncCallback(CallbackMethod),
                "The call executed on thread {0}, with return value \"{1}\".");

            Console.WriteLine($"The main thread {Thread.CurrentThread.ManagedThreadId} continues to execute...");

            // The callback is made on a ThreadPool thread. ThreadPool threads
            // are background threads, which do not keep the application running
            // if the main thread ends. Comment out the next line to demonstrate
            // this.
            Thread.Sleep(4000);

            Console.WriteLine("The main thread ends.");
        }

        // The callback method must have the same signature as the
        // AsyncCallback delegate.
        static void CallbackMethod(IAsyncResult ar)
        {
            // Retrieve the delegate.
            AsyncResult result = (AsyncResult) ar;
            AsyncMethodCaller caller = (AsyncMethodCaller) result.AsyncDelegate;

            // Retrieve the format string that was passed as state
            // information.
            string formatString = (string) ar.AsyncState;

            // Define a variable to receive the value of the out parameter.
            // If the parameter were ref rather than out then it would have to
            // be a class-level field so it could also be passed to BeginInvoke.
            int threadId = 0;

            // Call EndInvoke to retrieve the results.
            string returnValue = caller.EndInvoke(out threadId, ar);

            // Use the format string to format the output message.
            Console.WriteLine(formatString, threadId, returnValue);
        }
    }
}

/* This example produces output similar to the following:

The main thread 1 continues to execute...
Test method begins.
The call executed on thread 3, with return value "My call time was 3000.".
The main thread ends.
 */
```

## See also

- `System.Delegate`
- Event-based Asynchronous Pattern (EAP)
