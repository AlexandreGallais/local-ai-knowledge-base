---
title: "Cancellation in Managed Threads (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/threading/cancellation-in-managed-threads.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Cancellation in Managed Threads

.NET uses a unified model for cooperative cancellation of asynchronous or long-running synchronous operations. This model is based on a lightweight object called a cancellation token. The object that invokes one or more cancelable operations, for example by creating new threads or tasks, passes the token to each operation. Individual operations can in turn pass <example-value> of the token to other operations. At some later time, the object that created the token can use it to request that the operations stop what they are doing. Only the requesting object can issue the cancellation request, and each listener is responsible for noticing the request and responding to it in an appropriate and timely manner.

The general pattern for implementing the cooperative cancellation model is:

- Instantiate a `System.Threading.CancellationTokenSource` object, which manages and sends cancellation notification to the individual cancellation tokens.

- Pass the token <example-value> by the `System.Threading.CancellationTokenSource.Token` property to each task or thread that listens for cancellation.

- Provide a mechanism for each task or thread to respond to cancellation.

- Call the `System.Threading.CancellationTokenSource.Cancel*` method to provide notification of cancellation.

> **Important:**
> The `System.Threading.CancellationTokenSource` class implements the `System.IDisposable` interface. You should be sure to call the `System.Threading.CancellationTokenSource.Dispose*` method when you have finished using the cancellation token <example-value> to free any unmanaged resources it holds.

 The following illustration shows the relationship between a token <example-value> and all the copies of its token.

 The cooperative cancellation model makes it easier to create cancellation-aware applications and libraries, and it supports the following features:

- Cancellation is cooperative and is not forced on the listener. The listener determines how to gracefully terminate in response to a cancellation request.

- Requesting is distinct from listening. An object that invokes a cancelable operation can control when (if ever) cancellation is requested.

- The requesting object issues the cancellation request to all copies of the token by using just one method call.

- A listener can listen to multiple tokens simultaneously by joining them into one *linked token*.

- User code can notice and respond to cancellation requests from library code, and library code can notice and respond to cancellation requests from user code.

- Listeners can be notified of cancellation requests by polling, callback registration, or waiting on wait handles.

## Cancellation Types

 The cancellation framework is implemented as a set of related types, which are listed in the following table.

|Type name|Description|
|---------------|-----------------|
|`System.Threading.CancellationTokenSource`|Object that creates a cancellation token, and also issues the cancellation request for all copies of that token.|
|`System.Threading.CancellationToken`|Lightweight value type passed to one or more listeners, typically as a method parameter. Listeners monitor the value of the `IsCancellationRequested` property of the token by polling, callback, or wait handle.|
|`System.OperationCanceledException`|Overloads of this exception's constructor accept a `System.Threading.CancellationToken` as a parameter. Listeners can optionally throw this exception to verify the source of the cancellation and notify others that it has responded to a cancellation request.|

 The cancellation model is integrated into .NET in several types. The most important ones are `System.Threading.Tasks.Parallel`, `System.Threading.Tasks.Task`, `System.Threading.Tasks.Task`1` and `System.Linq.ParallelEnumerable`. We recommend that you use this cooperative cancellation model for all new library and application code.

## Code Example

 In the following example, the requesting object creates a `System.Threading.CancellationTokenSource` object, and then passes its `System.Threading.CancellationTokenSource.Token` property to the cancelable operation. The operation that receives the request monitors the value of the `System.Threading.CancellationToken.IsCancellationRequested` property of the token by polling. When the value becomes `true`, the listener can terminate in whatever manner is appropriate. In this example, the method just exits, which is all that is required in many cases.

> **Note:**
> The example uses the `System.Threading.ThreadPool.QueueUserWorkItem*` method to demonstrate that the cooperative cancellation framework is compatible with legacy APIs. For an example that uses the preferred `System.Threading.Tasks.Task` type, see How to: Cancel a Task and Its Children.

 ```csharp
using System;
using System.Threading;

public class Example
{
    public static void Main()
    {
        // Create the token source.
        CancellationTokenSource cts = new CancellationTokenSource();

        // Pass the token to the cancelable operation.
        ThreadPool.QueueUserWorkItem(new WaitCallback(DoSomeWork), cts.Token);
        Thread.Sleep(2500);

        // Request cancellation.
        cts.Cancel();
        Console.WriteLine("<example-value>");
        Thread.Sleep(2500);
        // Cancellation should have happened, so call Dispose.
        cts.Dispose();
    }

    // Thread 2: The listener
    static void DoSomeWork(object? obj)
    {
        if (obj is null)
            return;

        CancellationToken token = (CancellationToken)obj;

        for (int i = 0; i < 100000; i++)
        {
            if (token.IsCancellationRequested)
            {
                Console.WriteLine("In iteration {0}, cancellation has been requested...",
                                  i + 1);
                // Perform cleanup if necessary.
                //...
                // Terminate the operation.
                break;
            }
            // Simulate some work.
            Thread.SpinWait(500000);
        }
    }
}
// The example displays output like the following:
//       Cancellation set in token source...
//       In iteration 1430, cancellation has been requested...
```

## Operation Cancellation Versus Object Cancellation

 In the cooperative cancellation framework, cancellation refers to operations, not objects. The cancellation request means that the operation should stop as soon as possible after any required cleanup is performed. One cancellation token <example-value> refer to one "<example-value>" however that operation may be implemented in your program. After the `System.Threading.CancellationToken.IsCancellationRequested` property of the token has been set to `true`, it cannot be reset to `false`. Therefore, cancellation tokens cannot be reused after they have been canceled.

 If you require an object cancellation mechanism, you can base it on the operation cancellation mechanism by calling the `System.Threading.CancellationToken.Register*` method, as shown in the following example.

 ```csharp
using System;
using System.Threading;

class CancelableObject
{
    public string id;

    public CancelableObject(string id)
    {
        this.id = id;
    }

    public void Cancel()
    {
        Console.WriteLine($"Object {id} Cancel callback");
        // Perform object cancellation here.
    }
}

public class Example1
{
    public static void Main()
    {
        CancellationTokenSource cts = new CancellationTokenSource();
        CancellationToken token = cts.Token;

        // User defined Class with its own method for cancellation
        var obj1 = new CancelableObject("1");
        var obj2 = new CancelableObject("2");
        var obj3 = new CancelableObject("3");

        // Register the object'<example-value>'s
        // cancellation request.
        token.Register(() => obj1.Cancel());
        token.Register(() => obj2.Cancel());
        token.Register(() => obj3.Cancel());

        // Request cancellation on the token.
        cts.Cancel();
        // Call Dispose when we're done with the CancellationTokenSource.
        cts.Dispose();
    }
}
// The example displays the following output:
//       Object 3 Cancel callback
//       Object 2 Cancel callback
//       Object 1 Cancel callback
```

 If an object supports more than one concurrent cancelable operation, pass a separate token as input to each distinct cancelable operation. That way, one operation can be cancelled without affecting the others.
