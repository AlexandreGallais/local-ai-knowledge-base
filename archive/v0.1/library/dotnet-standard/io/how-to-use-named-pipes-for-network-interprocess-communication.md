---
title: "How to: Use Named Pipes for Network Interprocess Communication (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-use-named-pipes-for-network-interprocess-communication.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Use named pipes for network interprocess communication

Named pipes provide interprocess communication between a pipe server and one or more pipe clients. They offer more functionality than anonymous pipes, which provide interprocess communication on a local computer. Named pipes support full duplex communication over a network and multiple server instances, message-based communication, and client impersonation, which enables connecting processes to use their own set of permissions on remote servers.

> **Important:**
> .NET on Linux uses Unix Domain Sockets (UDS) for the implementation of these APIs.

> **Note:**
> Starting in .NET 11, when you create a `System.IO.Pipes.NamedPipeServerStream` with `System.IO.Pipes.PipeOptions.CurrentUserOnly` on Unix, the underlying socket file is set to mode `0600` (owner read/write only) at bind time. Previously, the socket file inherited permissions from the process umask. For more information, see NamedPipeServerStream with PipeOptions.CurrentUserOnly tightens Unix socket file permissions.

 To implement name pipes, use the `System.IO.Pipes.NamedPipeServerStream` and `System.IO.Pipes.NamedPipeClientStream` classes.

## Example 1

 The following example demonstrates how to create a named pipe by using the `System.IO.Pipes.NamedPipeServerStream` class. In this example, the server process creates four threads. Each thread can accept a client connection. The connected client process then supplies the server with a file name. If the client has sufficient permissions, the server process opens the file and sends its contents back to the client.
 ```csharp
using System;
using System.IO;
using System.IO.Pipes;
using System.Text;
using System.Threading;

public class PipeServer
{
    private static int numThreads = 4;

    public static void Main()
    {
        int i;
        Thread?[] servers = new Thread[numThreads];

        Console.WriteLine("\n*** Named pipe server stream with impersonation example ***\n");
        Console.WriteLine("Waiting for client connect...\n");
        for (i = 0; i < numThreads; i++)
        {
            servers[i] = new Thread(ServerThread);
            servers[i]?.Start();
        }
        Thread.Sleep(250);
        while (i > 0)
        {
            for (int j = 0; j < numThreads; j++)
            {
                if (servers[j] != null)
                {
                    if (servers[j]!.Join(250))
                    {
                        Console.WriteLine($"Server thread[{servers[j]!.ManagedThreadId}] finished.");
                        servers[j] = null;
                        i--;    // decrement the thread watch count
                    }
                }
            }
        }
        Console.WriteLine("\nServer threads exhausted, exiting.");
    }

    private static void ServerThread(object? data)
    {
        NamedPipeServerStream pipeServer =
            new NamedPipeServerStream("testpipe", PipeDirection.InOut, numThreads);

        int threadId = Thread.CurrentThread.ManagedThreadId;

        // Wait for a client to connect
        pipeServer.WaitForConnection();

        Console.WriteLine($"Client connected on thread[{threadId}].");
        try
        {
            // Read the request from the client. Once the client has
            // written to the pipe its security token will be available.

            StreamString ss = new StreamString(pipeServer);

            // Verify our identity to the connected client using a
            // string that the client anticipates.

            ss.WriteString("I am the one true server!");
            string filename = ss.ReadString();

            // Read in the contents of the file while impersonating the client.
            ReadFileToStream fileReader = new ReadFileToStream(ss, filename);

            // Display the name of the user we are impersonating.
            Console.WriteLine($"Reading file: {filename} on thread[{threadId}] as user: {pipeServer.GetImpersonationUserName()}.");
            pipeServer.RunAsClient(fileReader.Start);
        }
        // Catch the IOException that is raised if the pipe is broken
        // or disconnected.
        catch (IOException e)
        {
            Console.WriteLine($"ERROR: {e.Message}");
        }
        pipeServer.Close();
    }
}

// Defines the data protocol for reading and writing strings on our stream
public class StreamString
{
    private Stream ioStream;
    private UnicodeEncoding streamEncoding;

    public StreamString(Stream ioStream)
    {
        this.ioStream = ioStream;
        streamEncoding = new UnicodeEncoding();
    }

    public string ReadString()
    {
        int len = 0;

        len = ioStream.ReadByte() * 256;
        len += ioStream.ReadByte();
        byte[] inBuffer = new byte[len];
        ioStream.Read(inBuffer, 0, len);

        return streamEncoding.GetString(inBuffer);
    }

    public int WriteString(string outString)
    {
        byte[] outBuffer = streamEncoding.GetBytes(outString);
        int len = outBuffer.Length;
        if (len > UInt16.MaxValue)
        {
            len = (int)UInt16.MaxValue;
        }
        ioStream.WriteByte((byte)(len / 256));
        ioStream.WriteByte((byte)(len & 255));
        ioStream.Write(outBuffer, 0, len);
        ioStream.Flush();

        return outBuffer.Length + 2;
    }
}

// Contains the method executed in the context of the impersonated user
public class ReadFileToStream
{
    private string fn;
    private StreamString ss;

    public ReadFileToStream(StreamString str, string filename)
    {
        fn = filename;
        ss = str;
    }

    public void Start()
    {
        string contents = File.ReadAllText(fn);
        ss.WriteString(contents);
    }
}
```
 ```vb
Imports System.IO
Imports System.IO.Pipes
Imports System.Text
Imports System.Threading

Public Class PipeServer
    Private Shared numThreads As Integer = 4

    Public Shared Sub Main()
        Dim i As Integer
        Dim servers(numThreads) As Thread

        Console.WriteLine(vbCrLf + "*** Named pipe server stream with impersonation example ***" + vbCrLf)
        Console.WriteLine("Waiting for client connect..." + vbCrLf)
        For i = 0 To numThreads - 1
            servers(i) = New Thread(AddressOf ServerThread)
            servers(i).Start()
        Next i
        Thread.Sleep(250)
        While i > 0
            For j As Integer = 0 To numThreads - 1
                If Not (servers(j) Is Nothing) Then
                    If servers(j).Join(250) Then
                        Console.WriteLine("Server thread[{0}] finished.", servers(j).ManagedThreadId)
                        servers(j) = Nothing
                        i -= 1    ' decrement the thread watch count
                    End If
                End If
            Next j
        End While
        Console.WriteLine(vbCrLf + "Server threads exhausted, exiting.")
    End Sub

    Private Shared Sub ServerThread(data As Object)
        Dim pipeServer As New _
            NamedPipeServerStream("testpipe", PipeDirection.InOut, numThreads)

        Dim threadId As Integer = Thread.CurrentThread.ManagedThreadId

        ' Wait for a client to connect
        pipeServer.WaitForConnection()

        Console.WriteLine("Client connected on thread[{0}].", threadId)
        Try
            ' Read the request from the client. Once the client has
            ' written to the pipe its security token will be available.

            Dim ss As new StreamString(pipeServer)

            ' Verify our identity to the connected client using a
            ' string that the client anticipates.

            ss.WriteString("I am the one true server!")
            Dim filename As String = ss.ReadString()

            ' Read in the contents of the file while impersonating the client.
            Dim fileReader As New ReadFileToStream(ss, filename)

            ' Display the name of the user we are impersonating.
            Console.WriteLine("Reading file: {0} on thread[{1}] as user: {2}.",
                filename, threadId, pipeServer.GetImpersonationUserName())
            pipeServer.RunAsClient(AddressOf fileReader.Start)
            ' Catch the IOException that is raised if the pipe is broken
            ' or disconnected.
        Catch e As IOException
            Console.WriteLine("ERROR: {0}", e.Message)
        End Try
        pipeServer.Close()
    End Sub
End Class

' Defines the data protocol for reading and writing strings on our stream
Public Class StreamString
    Private ioStream As Stream
    Private streamEncoding As UnicodeEncoding

    Public Sub New(ioStream As Stream)
        Me.ioStream = ioStream
        streamEncoding = New UnicodeEncoding(False, False)
    End Sub

    Public Function ReadString() As String
        Dim len As Integer = 0
        len = CType(ioStream.ReadByte(), Integer) * 256
        len += CType(ioStream.ReadByte(), Integer)
        Dim inBuffer As Array = Array.CreateInstance(GetType(Byte), len)
        ioStream.Read(inBuffer, 0, len)

        Return streamEncoding.GetString(CType(inBuffer, Byte()))
    End Function

    Public Function WriteString(outString As String) As Integer
        Dim outBuffer() As Byte = streamEncoding.GetBytes(outString)
        Dim len As Integer = outBuffer.Length
        If len > UInt16.MaxValue Then
            len = CType(UInt16.MaxValue, Integer)
        End If
        ioStream.WriteByte(CType(len \ 256, Byte))
        ioStream.WriteByte(CType(len And 255, Byte))
        ioStream.Write(outBuffer, 0, outBuffer.Length)
        ioStream.Flush()

        Return outBuffer.Length + 2
    End Function
End Class

' Contains the method executed in the context of the impersonated user
Public Class ReadFileToStream
    Private fn As String
    Private ss As StreamString

    Public Sub New(str As StreamString, filename As String)
        fn = filename
        ss = str
    End Sub

    Public Sub Start()
        Dim contents As String = File.ReadAllText(fn)
        ss.WriteString(contents)
    End Sub
End Class
```
