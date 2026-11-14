---
title: "Polling for the Status of an Asynchronous Operation"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/polling-for-the-status-of-an-asynchronous-operation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Polling for the Status of an Asynchronous Operation

Applications that can do other work while waiting for the results of an asynchronous operation should not block waiting until the operation completes. Use one of the following options to continue executing instructions while waiting for an asynchronous operation to complete:

- Use the `System.IAsyncResult.IsCompleted` property of the `System.IAsyncResult` returned by the asynchronous operation's **Begin**_OperationName_ method to determine whether the operation has completed. This approach is known as polling and is demonstrated in this topic.

- Use an `System.AsyncCallback` delegate to process the results of the asynchronous operation in a separate thread. For an example that demonstrates this approach, see Using an AsyncCallback Delegate to End an Asynchronous Operation.

## Example

 The following code example demonstrates using asynchronous methods in the `System.Net.Dns` class to retrieve Domain Name System information for a user-specified computer. This example starts the asynchronous operation and then prints periods (".") at the console until the operation is complete. Note that **null** (**Nothing** in Visual Basic) is passed for the `System.Net.Dns.BeginGetHostByName*``System.AsyncCallback` and `System.Object` parameters because these arguments are not required when using this approach.

 ```csharp
/*
The following example demonstrates using asynchronous methods to
get Domain Name System information for the specified host computer.
This example polls to detect the end of the asynchronous operation.
*/

using System;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace Examples.AdvancedProgramming.AsynchronousOperations
{
    public class PollUntilOperationCompletes
    {
        static void UpdateUserInterface()
        {
            // Print a period to indicate that the application
            // is still working on the request.
            Console.Write(".");
        }
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

            // Poll for completion information.
            // Print periods (".") until the operation completes.
            while (result.IsCompleted != true)
            {
                UpdateUserInterface();
            }
            // The operation is complete. Process the results.
            // Print a new line.
            Console.WriteLine();
            try
            {
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
                Console.WriteLine($"An exception occurred while processing the request: {e.Message}");
            }
        }
    }
}
```

## See also

- Event-based Asynchronous Pattern (EAP)
- Event-based Asynchronous Pattern Overview
