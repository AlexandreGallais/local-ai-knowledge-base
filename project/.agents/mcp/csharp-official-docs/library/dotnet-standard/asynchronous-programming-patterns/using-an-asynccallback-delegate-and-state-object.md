---
title: "Using an AsyncCallback Delegate and State Object"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/using-an-asynccallback-delegate-and-state-object.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Using an AsyncCallback Delegate and State Object

When you use an `System.AsyncCallback` delegate to process the results of the asynchronous operation in a separate thread, you can use a state object to pass <example-value> between the callbacks and to retrieve a final result. This topic demonstrates that practice by expanding the example in Using an AsyncCallback Delegate to End an Asynchronous Operation.

## Example

 The following code example demonstrates using asynchronous methods in the `System.Net.Dns` class to retrieve Domain Name System (DNS) information for user-specified computers. This example defines and uses the `HostRequest` class to store state information. A `HostRequest` object gets created for each computer name entered by the user. This object is passed to the `System.Net.Dns.BeginGetHostByName*` method. The `ProcessDnsInformation` method is called each time a request completes. The `HostRequest` object is retrieved using the `System.IAsyncResult.AsyncState` property. The `ProcessDnsInformation` method uses the `HostRequest` object to store the `System.Net.IPHostEntry` returned by the request or a `System.Net.Sockets.SocketException` thrown by the request. When all requests are complete, the application iterates over the `HostRequest` objects and displays the DNS information or `System.Net.Sockets.SocketException` error message.

 ```csharp
/*
The following example demonstrates using asynchronous methods to
get Domain Name System information for the specified host computer.
*/

using System;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Collections;

namespace Examples.AdvancedProgramming.AsynchronousOperations
{
// Create a state object that holds each requested host name,
// an associated IPHostEntry object or a SocketException.
    public class HostRequest
    {
        // Stores the requested host name.
        private string hostName;
        // Stores any SocketException returned by the Dns EndGetHostByName method.
        private SocketException e;
        // Stores an IPHostEntry returned by the Dns EndGetHostByName method.
        private IPHostEntry entry;

        public HostRequest(string name)
        {
            hostName = name;
        }

        public string HostName
        {
            get
            {
                return hostName;
            }
        }

        public SocketException ExceptionObject
        {
            get
            {
                return e;
            }
            set
            {
                 e = value;
            }
        }

        public IPHostEntry HostEntry
        {
            get
            {
                return entry;
            }
            set
            {
                entry = value;
            }
        }
    }

    public class UseDelegateAndStateForAsyncCallback
    {
        // The number of pending requests.
        static int requestCounter;
        static ArrayList hostData = new ArrayList();
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
                    // Create and store the state object for this request.
                    HostRequest request = new HostRequest(host);
                    hostData.Add(request);
                    // Start the asynchronous request for DNS information.
                    Dns.BeginGetHostEntry(host, callBack, request);
                 }
            } while (host.Length > 0);
            // The user has entered all of the host names for lookup.
            // Now wait until the threads complete.
            while (requestCounter > 0)
            {
                UpdateUserInterface();
            }
            // Display the results.
            foreach(HostRequest r in hostData)
            {
                    if (r.ExceptionObject != null)
                    {
                        Console.WriteLine($"Request for host {r.HostName} returned the following error: {r.ExceptionObject.Message}.");
                    }
                    else
                    {
                        // Get the results.
                        IPHostEntry h = r.HostEntry;
                        string[] aliases = h.Aliases;
                        IPAddress[] addresses = h.AddressList;
                        if (aliases.Length > 0)
                        {
                            Console.WriteLine($"Aliases for {r.HostName}");
                            for (int j = 0; j < aliases.Length; j++)
                            {
                                Console.WriteLine($"{aliases[j]}");
                            }
                        }
                        if (addresses.Length > 0)
                        {
                            Console.WriteLine($"Addresses for {r.HostName}");
                            for (int k = 0; k < addresses.Length; k++)
                            {
                                Console.WriteLine($"{addresses[k].ToString()}");
                            }
                        }
                    }
            }
       }

        // The following method is invoked when each asynchronous operation completes.
        static void ProcessDnsInformation(IAsyncResult result)
        {
           // Get the state object associated with this request.
           HostRequest request = (HostRequest) result.AsyncState;
            try
            {
                // Get the results and store them in the state object.
                IPHostEntry host = Dns.EndGetHostEntry(result);
                request.HostEntry = host;
            }
            catch (SocketException e)
            {
                // Store any SocketExceptions.
                request.ExceptionObject = e;
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
- Using an AsyncCallback Delegate to End an Asynchronous Operation
