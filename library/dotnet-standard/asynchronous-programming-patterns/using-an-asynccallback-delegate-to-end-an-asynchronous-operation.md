---
title: "Using an AsyncCallback Delegate to End an Asynchronous Operation"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/using-an-asynccallback-delegate-to-end-an-asynchronous-operation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Using an AsyncCallback Delegate to End an Asynchronous Operation

Applications that can do other work while waiting for the results of an asynchronous operation should not block waiting until the operation completes. Use one of the following options to continue executing instructions while waiting for an asynchronous operation to complete:

- Use an `System.AsyncCallback` delegate to process the results of the asynchronous operation in a separate thread. This approach is demonstrated in this topic.

- Use the `System.IAsyncResult.IsCompleted` property of the `System.IAsyncResult` returned by the asynchronous operation's **Begin**_OperationName_ method to determine whether the operation has completed. For an example that demonstrates this approach, see Polling for the Status of an Asynchronous Operation.

## Example

 The following code example demonstrates using asynchronous methods in the `System.Net.Dns` class to retrieve Domain Name System (DNS) information for user-specified computers. This example creates an `System.AsyncCallback` delegate that references the `ProcessDnsInformation` method. This method is called once for each asynchronous request for DNS information.

 Note that the user-specified host is passed to the `System.Net.Dns.BeginGetHostByName*``System.Object` parameter. For an example that demonstrates defining and using a more complex state object, see Using an AsyncCallback Delegate and State Object.

 ```csharp
/*
The following example demonstrates using asynchronous methods to
get Domain Name System information for the specified host computers.
This example uses a delegate to obtain the results of each asynchronous
operation.
*/

using System;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Collections.Specialized;
using System.Collections;

namespace Examples.AdvancedProgramming.AsynchronousOperations
{
    public class UseDelegateForAsyncCallback
    {
        static int requestCounter;
        static ArrayList hostData = new ArrayList();
        static StringCollection hostNames = new StringCollection();
        static void UpdateUserInterface()
        {
            // Print a message to indicate that the application
            // is still working on the remaining requests.
            Console.WriteLine($"{requestCounter} requests remaining.");
        }
        public static void Main()
        {
            // Create the delegate that will process the results of the
            // asynchronous request.
            AsyncCallback callBack = new AsyncCallback(ProcessDnsInformation);
            string host;
            do
            {
                Console.Write(" Enter the name of a host computer or <enter> to finish: ");
                host = Console.ReadLine();
                if (host.Length > 0)
                {
                    // Increment the request counter in a thread safe manner.
                    Interlocked.Increment(ref requestCounter);
                    // Start the asynchronous request for DNS information.
                    Dns.BeginGetHostEntry(host, callBack, host);
                 }
            } while (host.Length > 0);
            // The user has entered all of the host names for lookup.
            // Now wait until the threads complete.
            while (requestCounter > 0)
            {
                UpdateUserInterface();
            }
            // Display the results.
            for (int i = 0; i< hostNames.Count; i++)
            {
                object data = hostData [i];
                string message = data as string;
                // A SocketException was thrown.
                if (message != null)
                {
                    Console.WriteLine($"Request for {hostNames[i]} returned message: {message}");
                    continue;
                }
                // Get the results.
                IPHostEntry h = (IPHostEntry) data;
                string[] aliases = h.Aliases;
                IPAddress[] addresses = h.AddressList;
                if (aliases.Length > 0)
                {
                    Console.WriteLine($"Aliases for {hostNames[i]}");
                    for (int j = 0; j < aliases.Length; j++)
                    {
                        Console.WriteLine($"{aliases[j]}");
                    }
                }
                if (addresses.Length > 0)
                {
                    Console.WriteLine($"Addresses for {hostNames[i]}");
                    for (int k = 0; k < addresses.Length; k++)
                    {
                        Console.WriteLine($"{addresses[k].ToString()}");
                    }
                }
            }
       }

        // The following method is called when each asynchronous operation completes.
        static void ProcessDnsInformation(IAsyncResult result)
        {
            string hostName = (string) result.AsyncState;
            hostNames.Add(hostName);
            try
            {
                // Get the results.
                IPHostEntry host = Dns.EndGetHostEntry(result);
                hostData.Add(host);
            }
            // Store the exception message.
            catch (SocketException e)
            {
                hostData.Add(e.Message);
            }
            finally
            {
                // Decrement the request counter in a thread-safe manner.
                Interlocked.Decrement(ref requestCounter);
            }
        }
    }
}
```

## See also

- Event-based Asynchronous Pattern (EAP)
- Event-based Asynchronous Pattern Overview
- Calling Asynchronous Methods Using IAsyncResult
- Using an AsyncCallback Delegate and State Object
