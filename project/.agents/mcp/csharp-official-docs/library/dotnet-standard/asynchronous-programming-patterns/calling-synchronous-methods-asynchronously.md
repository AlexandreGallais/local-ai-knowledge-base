---
title: "Calling Synchronous Methods Asynchronously (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/calling-synchronous-methods-asynchronously.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Calling Synchronous Methods Asynchronously

.NET enables you to call any method asynchronously. To do this, you define a delegate with the same signature as the method you want to call. The common language runtime automatically defines `BeginInvoke` and `EndInvoke` methods for this delegate, with the appropriate signatures.

> **Note:**
> Asynchronous delegate calls, specifically the `BeginInvoke` and `EndInvoke` methods, are not supported in the .NET Compact Framework.

The `BeginInvoke` method initiates the asynchronous call. It has the same parameters as the method that you want to execute asynchronously, plus two additional optional parameters. The first parameter is an `System.AsyncCallback` delegate that references a method to be called when the asynchronous call completes. The second parameter is a user-defined object that passes information into the callback method. `BeginInvoke` returns immediately and does not wait for the asynchronous call to complete. `BeginInvoke` returns an `System.IAsyncResult`, which can be used to monitor the progress of the asynchronous call.

The `EndInvoke` method retrieves the results of the asynchronous call. It can be called any time after `BeginInvoke`. If the asynchronous call has not completed, `EndInvoke` blocks the calling thread until it completes. The parameters of `EndInvoke` include the `out` and `ref` parameters (`<Out>` `ByRef` and `ByRef` in Visual Basic) of the method that you want to execute asynchronously, plus the `System.IAsyncResult` returned by `BeginInvoke`.

> **Note:**
> The IntelliSense feature in Visual Studio displays the parameters of `BeginInvoke` and `EndInvoke`. If you're not using Visual Studio or a similar tool, or if you're using C# with Visual Studio, see Asynchronous Programming Model (APM) for a description of the parameters defined for these methods.

The code examples in this topic demonstrate four common ways to use `BeginInvoke` and `EndInvoke` to make asynchronous calls. After calling `BeginInvoke` you can do the following:

- Do some work and then call `EndInvoke` to block until the call completes.

- Obtain a `System.Threading.WaitHandle` using the `System.IAsyncResult.AsyncWaitHandle` property, use its `System.Threading.WaitHandle.WaitOne*` method to block execution until the `System.Threading.WaitHandle` is signaled, and then call `EndInvoke`.

- Poll the `System.IAsyncResult` returned by `BeginInvoke` to determine when the asynchronous call has completed, and then call `EndInvoke`.

- Pass a delegate for a callback method to `BeginInvoke`. The method is executed on a `System.Threading.ThreadPool` thread when the asynchronous call completes. The callback method calls `EndInvoke`.

> **Important:**
> No matter which technique you use, always call `EndInvoke` to complete your asynchronous call.

## Defining the Test Method and Asynchronous Delegate

 The code examples that follow demonstrate various ways of calling the same long-running method, `TestMethod`, asynchronously. The `TestMethod` method displays a console message to show that it has begun processing, sleeps for a few seconds, and then ends. `TestMethod` has an `out` parameter to demonstrate the way such parameters are added to the signatures of `BeginInvoke` and `EndInvoke`. You can handle `ref` parameters similarly.

 The following code example shows the definition of `TestMethod` and the delegate named `AsyncMethodCaller` that can be used to call `TestMethod` asynchronously. To compile the code examples, you must include the definitions for `TestMethod` and the `AsyncMethodCaller` delegate.

 ```csharp
using System;
using System.Threading;

namespace Examples.AdvancedProgramming.AsynchronousOperations
{
    public class AsyncDemo
    {
        // The method to be executed asynchronously.
        public string TestMethod(int callDuration, out int threadId)
        {
            Console.WriteLine("Test method begins.");
            Thread.Sleep(callDuration);
            threadId = Thread.CurrentThread.ManagedThreadId;
            return String.Format("My call time was {0}.", callDuration.ToString());
        }
    }
    // The delegate must have the same signature as the method
    // it will call asynchronously.
    public delegate string AsyncMethodCaller(int callDuration, out int threadId);
}
```

## Waiting for an Asynchronous Call with EndInvoke

 The simplest way to execute a method asynchronously is to start executing the method by calling the delegate's `BeginInvoke` method, do some work on the main thread, and then call the delegate's `EndInvoke` method. `EndInvoke` might block the calling thread because it does not return until the asynchronous call completes. This is a good technique to use with file or network operations.

> **Important:**
> Because `EndInvoke` might block, you should never call it from threads that service the user interface.

 ```csharp
using System;
using System.Threading;

namespace Examples.AdvancedProgramming.AsynchronousOperations
{
    public class AsyncMain3
    {
        public static void Main()
        {
            // The asynchronous method puts the thread id here.
            int threadId;

            // Create an instance of the test class.
            AsyncDemo ad = new AsyncDemo();

            // Create the delegate.
            AsyncMethodCaller caller = new AsyncMethodCaller(ad.TestMethod);

            // Initiate the asynchronous call.
            IAsyncResult result = caller.BeginInvoke(3000,
                out threadId, null, null);

            Thread.Sleep(0);
            Console.WriteLine($"Main thread {Thread.CurrentThread.ManagedThreadId} does some work.");

            // Call EndInvoke to wait for the asynchronous call to complete,
            // and to retrieve the results.
            string returnValue = caller.EndInvoke(out threadId, result);

            Console.WriteLine("The call executed on thread {0}, with return value \"{1}\".",
                threadId, returnValue);
        }
    }
}

/* This example produces output similar to the following:

Main thread 1 does some work.
Test method begins.
The call executed on thread 3, with return value "My call time was 3000.".
 */
```

## Waiting for an Asynchronous Call with WaitHandle

 You can obtain a `System.Threading.WaitHandle` by using the `System.IAsyncResult.AsyncWaitHandle` property of the `System.IAsyncResult` returned by `BeginInvoke`. The `System.Threading.WaitHandle` is signaled when the asynchronous call completes, and you can wait for it by calling the `System.Threading.WaitHandle.WaitOne*` method.

 If you use a `System.Threading.WaitHandle`, you can perform additional processing before or after the asynchronous call completes, but before calling `EndInvoke` to retrieve the results.

> **Note:**
> The wait handle is not closed automatically when you call `EndInvoke`. If you release all references to the wait handle, system resources are freed when garbage collection reclaims the wait handle. To free the system resources as soon as you are finished using the wait handle, dispose of it by calling the `System.Threading.WaitHandle.Close*` method. Garbage collection works more efficiently when disposable objects are explicitly disposed.

 ```csharp
using System;
using System.Threading;

namespace Examples.AdvancedProgramming.AsynchronousOperations
{
    public class AsyncMain2
    {
        static void Main()
        {
            // The asynchronous method puts the thread id here.
            int threadId;

            // Create an instance of the test class.
            AsyncDemo ad = new AsyncDemo();

            // Create the delegate.
            AsyncMethodCaller caller = new AsyncMethodCaller(ad.TestMethod);

            // Initiate the asynchronous call.
            IAsyncResult result = caller.BeginInvoke(3000,
                out threadId, null, null);

            Thread.Sleep(0);
            Console.WriteLine($"Main thread {Thread.CurrentThread.ManagedThreadId} does some work.");

            // Wait for the WaitHandle to become signaled.
            result.AsyncWaitHandle.WaitOne();

            // Perform additional processing here.
            // Call EndInvoke to retrieve the results.
            string returnValue = caller.EndInvoke(out threadId, result);

            // Close the wait handle.
            result.AsyncWaitHandle.Close();

            Console.WriteLine("The call executed on thread {0}, with return value \"{1}\".",
                threadId, returnValue);
        }
    }
}

/* This example produces output similar to the following:

Main thread 1 does some work.
Test method begins.
The call executed on thread 3, with return value "My call time was 3000.".
 */
```

## Polling for Asynchronous Call Completion

 You can use the `System.IAsyncResult.IsCompleted` property of the `System.IAsyncResult` returned by `BeginInvoke` to discover when the asynchronous call completes. You might do this when making the asynchronous call from a thread that services the user interface. Polling for completion allows the calling thread to continue executing while the asynchronous call executes on a `System.Threading.ThreadPool` thread.

 ```csharp
using System;
using System.Threading;

namespace Examples.AdvancedProgramming.AsynchronousOperations
{
    public class AsyncMain
    {
        static void Main() {
            // The asynchronous method puts the thread id here.
            int threadId;

            // Create an instance of the test class.
            AsyncDemo ad = new AsyncDemo();

            // Create the delegate.
            AsyncMethodCaller caller = new AsyncMethodCaller(ad.TestMethod);

            // Initiate the asynchronous call.
            IAsyncResult result = caller.BeginInvoke(3000,
                out threadId, null, null);

            // Poll while simulating work.
            while(result.IsCompleted == false) {
                Thread.Sleep(250);
                Console.Write(".");
            }

            // Call EndInvoke to retrieve the results.
            string returnValue = caller.EndInvoke(out threadId, result);

            Console.WriteLine("\nThe call executed on thread {0}, with return value \"{1}\".",
                threadId, returnValue);
        }
    }
}

/* This example produces output similar to the following:

Test method begins.
.............
The call executed on thread 3, with return value "My call time was 3000.".
 */
```
