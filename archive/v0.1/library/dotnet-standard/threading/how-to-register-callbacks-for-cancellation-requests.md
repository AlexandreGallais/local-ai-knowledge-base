---
title: "Register callbacks for cancellation requests"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/threading/how-to-register-callbacks-for-cancellation-requests.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Register callbacks for cancellation requests

Learn how to register a delegate that will be invoked when an `System.Threading.CancellationToken.IsCancellationRequested` property becomes true. The value changes from false to true when a call to `System.Threading.CancellationTokenSource.Cancel*` on the object that created the token is made. Use this technique for canceling asynchronous operations that do not natively support the unified cancellation framework, and for unblocking methods that might be waiting for an asynchronous operation to finish.

> **Note:**
> When "Just My Code" is enabled, Visual Studio in some cases will break on the line that throws the exception and display an error message that says "exception not handled by user code." This error is benign. You can press `F5` to continue from it, and see the exception-handling behavior that is demonstrated in the examples below. To prevent Visual Studio from breaking on the first error, just uncheck the "Just My Code" checkbox under **Tools, Options, Debugging, General**.

## Example

In the following example, the `System.Net.WebClient.CancelAsync*` method is registered as the method to be invoked when cancellation is requested through the cancellation token.

```csharp
﻿using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

class CancelWithCallback
{
    static void Main()
    {
        using var cts = new CancellationTokenSource();
        var token = cts.Token;

        _ = Task.Run(async () =>
        {
            using var client = new WebClient();

            client.DownloadStringCompleted += (_, args) =>
            {
                if (args.Cancelled)
                {
                    Console.WriteLine("The download was canceled.");
                }
                else
                {
                    Console.WriteLine("The download has completed:\n");
                    Console.WriteLine($"{args.Result}\n\nPress any key to continue.");
                }
            };

            if (!token.IsCancellationRequested)
            {
                using CancellationTokenRegistration ctr = token.Register(() => client.CancelAsync());

                Console.WriteLine("Starting request\n");
                await client.DownloadStringTaskAsync(new Uri("http://www.contoso.com"));
            }
        }, token);

        Console.WriteLine("Press 'c' to cancel.\n\n");
        if (Console.ReadKey().KeyChar == 'c')
        {
            cts.Cancel();
        }

        Console.WriteLine("\nPress any key to exit.");
        Console.ReadKey();
    }
}
```

If cancellation has already been requested when the callback is registered, the callback is still guaranteed to be called. In this particular case, the `System.Net.WebClient.CancelAsync*` method will do nothing if no asynchronous operation is in progress, so it is always safe to call the method.

## See also

- Cancellation in managed threads
- `System.Net.WebClient.DownloadStringTaskAsync(System.String)`
