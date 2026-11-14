---
title: "How to: Use Anonymous Pipes for Local Interprocess Communication"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/how-to-use-anonymous-pipes-for-local-interprocess-communication.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Use anonymous pipes for local interprocess communication

Anonymous pipes provide interprocess communication on a local computer. They offer less functionality than named pipes, but also require less overhead. You can use anonymous pipes to make interprocess communication on a local computer easier. You cannot use anonymous pipes for communication over a network.

 To implement anonymous pipes, use the `System.IO.Pipes.AnonymousPipeServerStream` and `System.IO.Pipes.AnonymousPipeClientStream` classes.

## Example 1

 The following example demonstrates a way to send a string from a parent process to a child process using anonymous pipes. This example creates an `System.IO.Pipes.AnonymousPipeServerStream` object in a parent process with a `System.IO.Pipes.PipeDirection` value of `System.IO.Pipes.PipeDirection.Out`. The parent process then creates a child process by using a client handle to create an `System.IO.Pipes.AnonymousPipeClientStream` object. The child process has a `System.IO.Pipes.PipeDirection` value of `System.IO.Pipes.PipeDirection.In`.

 The parent process then sends a user-supplied string to the child process. The string is displayed to the console in the child process.

 The following example shows the server process.
 ```csharp
using System;
using System.IO;
using System.IO.Pipes;
using System.Diagnostics;

class PipeServer
{
    static void Main()
    {
        Process pipeClient = new Process();

        pipeClient.StartInfo.FileName = "pipeClient.exe";

        using (AnonymousPipeServerStream pipeServer =
            new AnonymousPipeServerStream(PipeDirection.Out,
            HandleInheritability.Inheritable))
        {
            Console.WriteLine($"[SERVER] Current TransmissionMode: {pipeServer.TransmissionMode}.");

            // Pass the client process a handle to the server.
            pipeClient.StartInfo.Arguments =
                pipeServer.GetClientHandleAsString();
            pipeClient.StartInfo.UseShellExecute = false;
            pipeClient.Start();

            pipeServer.DisposeLocalCopyOfClientHandle();

            try
            {
                // Read user input and send that to the client process.
                using (StreamWriter sw = new StreamWriter(pipeServer))
                {
                    sw.AutoFlush = true;
                    // Send a 'sync message' and wait for client to receive it.
                    sw.WriteLine("SYNC");
                    pipeServer.WaitForPipeDrain();
                    // Send the console input to the client process.
                    Console.Write("[SERVER] Enter text: ");
                    sw.WriteLine(Console.ReadLine());
                }
            }
            // Catch the IOException that is raised if the pipe is broken
            // or disconnected.
            catch (IOException e)
            {
                Console.WriteLine($"[SERVER] Error: {e.Message}");
            }
        }

        pipeClient.WaitForExit();
        pipeClient.Close();
        Console.WriteLine("[SERVER] Client quit. Server terminating.");
    }
}
```

## Example 2

 The following example shows the client process. The server process starts the client process and gives that process a client handle. The resulting executable from the client code should be named `pipeClient.exe` and be copied to the same directory as the server executable before running the server process.
 ```csharp
using System;
using System.IO;
using System.IO.Pipes;

class PipeClient
{
    static void Main(string[] args)
    {
        if (args.Length > 0)
        {
            using (PipeStream pipeClient =
                new AnonymousPipeClientStream(PipeDirection.In, args[0]))
            {
                Console.WriteLine($"[CLIENT] Current TransmissionMode: {pipeClient.TransmissionMode}.");

                using (StreamReader sr = new StreamReader(pipeClient))
                {
                    // Display the read text to the console
                    string temp;

                    // Wait for 'sync message' from the server.
                    do
                    {
                        Console.WriteLine("[CLIENT] Wait for sync...");
                        temp = sr.ReadLine();
                    }
                    while (!temp.StartsWith("SYNC"));

                    // Read the server data and echo to the console.
                    while ((temp = sr.ReadLine()) != null)
                    {
                        Console.WriteLine("[CLIENT] Echo: " + temp);
                    }
                }
            }
        }
        Console.Write("[CLIENT] Press Enter to continue...");
        Console.ReadLine();
    }
}
```

## See also

- Pipes
- How to: Use Named Pipes for Network Interprocess Communication
