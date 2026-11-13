---
title: "Blocking Application Execution Using an AsyncWaitHandle"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/blocking-application-execution-using-an-asyncwaithandle.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Blocking Application Execution Using an AsyncWaitHandle

Applications that cannot continue to do other work while waiting for the results of an asynchronous operation must block until the operation completes. Use one of the following options to block your application's main thread while waiting for an asynchronous operation to complete:

- Use the `System.IAsyncResult.AsyncWaitHandle` property of the `System.IAsyncResult` returned by the asynchronous operation's **Begin**_OperationName_ method. This approach is demonstrated in this topic.

- Call the asynchronous operation's **End**_OperationName_ method. For an example that demonstrates this approach, see Blocking Application Execution by Ending an Async Operation.

 Applications that use one or more `System.Threading.WaitHandle` objects to block until an asynchronous operation is complete will typically call the **Begin**_OperationName_ method, perform any work that can be done without the results of the operation, and then block until the asynchronous operation(s) completes. An application can block on a single operation by calling one of the `System.Threading.WaitHandle.WaitOne*` methods using the `System.IAsyncResult.AsyncWaitHandle*`. To block while waiting for a set of asynchronous operations to complete, store the associated `System.IAsyncResult.AsyncWaitHandle*` objects in an array and call one of the `System.Threading.WaitHandle.WaitAll*` methods. To block while waiting for any one of a set of asynchronous operations to complete, store the associated `System.IAsyncResult.AsyncWaitHandle*` objects in an array and call one of the `System.Threading.WaitHandle.WaitAny*` methods.

## Example

 The following code example demonstrates using asynchronous methods in the DNS class to retrieve Domain Name System information for a user-specified computer. The example demonstrates blocking using the `System.Threading.WaitHandle` associated with the asynchronous operation. Note that `null` (`Nothing` in Visual Basic) is passed for the `System.Net.Dns.BeginGetHostByName*``requestCallback` and `stateObject` parameters because these are not required when using this approach.

 ```csharp
/*
The following example demonstrates using asynchronous methods to
get Domain Name System information for the specified host computer.

*/

using System;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace Examples.AdvancedProgramming.AsynchronousOperations
{
    public class WaitUntilOperationCompletes
    {
        public static void Main(string[] args)
        {
            // Make sure the caller supplied a host name.
            if (args.Length == 0 || args[0].Length == 0)
            {
                // Print a message and exit.
                Console.WriteLine("You must specify the name of a host computer.");
                return;
            }
            // Start the asynchronous request for DNS information.
            IAsyncResult result = Dns.BeginGetHostEntry(args[0], null, null);
            Console.WriteLine("Processing request for information...");
            // Wait until the operation completes.
            result.AsyncWaitHandle.WaitOne();
            // The operation completed. Process the results.
            try
            {
                // Get the results.
                IPHostEntry host = Dns.EndGetHostEntry(result);
                string[] aliases = host.Aliases;
                IPAddress[] addresses = host.AddressList;
                if (aliases.Length > 0)
                {
                    Console.WriteLine("Aliases");
                    for (int i = 0; i < aliases.Length; i++)
                    {
                        Console.WriteLine($"{aliases[i]}");
                    }
                }
                if (addresses.Length > 0)
                {
                    Console.WriteLine("Addresses");
                    for (int i = 0; i < addresses.Length; i++)
                    {
                        Console.WriteLine($"{addresses[i].ToString()}");
                    }
                }
            }
            catch (SocketException e)
            {
                Console.WriteLine($"Exception occurred while processing the request: {e.Message}");
            }
        }
    }
}
```

## See also

- Event-based Asynchronous Pattern (EAP)
- Event-based Asynchronous Pattern Overview
