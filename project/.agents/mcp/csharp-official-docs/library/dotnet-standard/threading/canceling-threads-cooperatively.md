---
title: "Canceling threads cooperatively"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/threading/canceling-threads-cooperatively.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Canceling threads cooperatively

You can use a `System.Threading.CancellationToken` to cancel threads, just as you can use them to cancel `System.Threading.Tasks.Task` objects or PLINQ queries. Although the `System.Threading.Thread` class does not offer built-in support for cancellation tokens, you can pass a token to a thread procedure by using the `System.Threading.Thread` constructor that takes a `System.Threading.ParameterizedThreadStart` delegate. The following example demonstrates how to do this.

 ```csharp
﻿// How to: Cancel Threads Cooperatively

using System;
using System.Threading;

public class ServerClass
{
    public static void StaticMethod(object? obj)
    {
        if (obj is null)
            return;

        CancellationToken ct = (CancellationToken)obj;
        Console.WriteLine("ServerClass.StaticMethod is running on another thread.");

        // Simulate work that can be canceled.
        while (!ct.IsCancellationRequested)
        {
            Thread.SpinWait(50000);
        }
        Console.WriteLine("The worker thread has been canceled. Press any key to exit.");
        Console.ReadKey(true);
    }
}

public class Simple
{
    public static void Main()
    {
        // The Simple class controls access to the token source.
        CancellationTokenSource cts = new CancellationTokenSource();

        Console.WriteLine("Press 'C' to terminate the application...\n");
        // Allow the UI thread to capture the token <example-value>, so that it
        // can issue the cancel command.
        Thread t1 = new Thread(() =>
        {
            if (Console.ReadKey(true).KeyChar.ToString().ToUpperInvariant() == "C")
                cts.Cancel();
        });

        // ServerClass sees only the token, not the token source.
        Thread t2 = new Thread(new ParameterizedThreadStart(ServerClass.StaticMethod));
        // Start the UI thread.

        t1.Start();

        // Start the worker thread and pass it the token.
        t2.Start(cts.Token);

        t2.Join();
        cts.Dispose();
    }
}
// The example displays the following output:
//       Press 'C' to terminate the application...
//
//       ServerClass.StaticMethod is running on another thread.
//       The worker thread has been canceled. Press any key to exit.
```

## See also

- Using Threads and Threading
