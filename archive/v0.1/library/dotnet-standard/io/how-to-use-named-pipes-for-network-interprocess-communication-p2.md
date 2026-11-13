---
title: "How to: Use Named Pipes for Network Interprocess Communication (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-use-named-pipes-for-network-interprocess-communication.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Use Named Pipes for Network Interprocess Communication (part 2 of 2)

## Example 2

 The following example shows the client process, which uses the `System.IO.Pipes.NamedPipeClientStream` class. The client connects to the server process and sends a file name to the server. The example uses impersonation, so the identity that is running the client application must have permission to access the file. The server then sends the contents of the file back to the client. The file contents are then displayed to the console.

 ```csharp
using System;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using System.Security.Principal;
using System.Text;
using System.Threading;

public class PipeClient
{
    private static int numClients = 4;

    public static void Main(string[] args)
    {
        if (args.Length > 0)
        {
            if (args[0] == "spawnclient")
            {
                var pipeClient =
                    new NamedPipeClientStream(".", "testpipe",
                        PipeDirection.InOut, PipeOptions.None,
                        TokenImpersonationLevel.Impersonation);

                Console.WriteLine("Connecting to server...\n");
                pipeClient.Connect();

                var ss = new StreamString(pipeClient);
                // Validate the server's signature string.
                if (ss.ReadString() == "I am the one true server!")
                {
                    // The client security token is sent with the first write.
                    // Send the name of the file whose contents are returned
                    // by the server.
                    ss.WriteString("c:\\textfile.txt");

                    // Print the file to the screen.
                    Console.Write(ss.ReadString());
                }
                else
                {
                    Console.WriteLine("Server could not be verified.");
                }
                pipeClient.Close();
                // Give the client process some time to display results before exiting.
                Thread.Sleep(4000);
            }
        }
        else
        {
            Console.WriteLine("\n*** Named pipe client stream with impersonation example ***\n");
            StartClients();
        }
    }

    // Helper function to create pipe client processes
    private static void StartClients()
    {
        string currentProcessName = Environment.CommandLine;

        // Remove extra characters when launched from Visual Studio
        currentProcessName = currentProcessName.Trim('"', ' ');

        currentProcessName = Path.ChangeExtension(currentProcessName, ".exe");
        Process?[] plist = new Process?[numClients];

        Console.WriteLine("Spawning client processes...\n");

        if (currentProcessName.Contains(Environment.CurrentDirectory))
        {
            currentProcessName = currentProcessName.Replace(Environment.CurrentDirectory, String.Empty);
        }

        // Remove extra characters when launched from Visual Studio
        currentProcessName = currentProcessName.Replace("\\", String.Empty);
        currentProcessName = currentProcessName.Replace("\"", String.Empty);

        int i;
        for (i = 0; i < numClients; i++)
        {
            // Start 'this' program but spawn a named pipe client.
            plist[i] = Process.Start(currentProcessName, "spawnclient");
        }
        while (i > 0)
        {
            for (int j = 0; j < numClients; j++)
            {
                if (plist[j] != null)
                {
                    if (plist[j]!.HasExited)
                    {
                        Console.WriteLine($"Client process[{plist[j]?.Id}] has exited.");
                        plist[j] = null;
                        i--;    // decrement the process watch count
                    }
                    else
                    {
                        Thread.Sleep(250);
                    }
                }
            }
        }
        Console.WriteLine("\nClient processes finished, exiting.");
    }
}

// Defines the data protocol for reading and writing strings on our stream.
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
        int len;
        len = ioStream.ReadByte() * 256;
        len += ioStream.ReadByte();
        var inBuffer = new byte[len];
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
```
 ```vb
Imports System.Diagnostics
Imports System.IO
Imports System.IO.Pipes
Imports System.Security.Principal
Imports System.Text
Imports System.Threading

Public Class PipeClient
    Private Shared numClients As Integer = 4

    Public Shared Sub Main(args() As String)
        If args.Length > 0 Then
            If args(0) = "spawnclient" Then
                Dim pipeClient As New NamedPipeClientStream( _
                    ".", "testpipe", _
                    PipeDirection.InOut, PipeOptions.None, _
                    TokenImpersonationLevel.Impersonation)

                Console.WriteLine("Connecting to server..." + vbCrLf)
                pipeClient.Connect()

                Dim ss As New StreamString(pipeClient)
                ' Validate the server's signature string.
                If ss.ReadString() = "I am the one true server!" Then
                    ' The client security token is sent with the first write.
                    ' Send the name of the file whose contents are returned
                    ' by the server.
                    ss.WriteString("c:\textfile.txt")

                    ' Print the file to the screen.
                    Console.Write(ss.ReadString())
                Else
                    Console.WriteLine("Server could not be verified.")
                End If
                pipeClient.Close()
                ' Give the client process some time to display results before exiting.
                Thread.Sleep(4000)
            End If
        Else
            Console.WriteLine(vbCrLf + "*** Named pipe client stream with impersonation example ***" + vbCrLf)
            StartClients()
        End If
    End Sub

    ' Helper function to create pipe client processes
    Private Shared Sub StartClients()
        Dim currentProcessName As String = Environment.CommandLine
        Dim plist(numClients - 1) As Process

        Console.WriteLine("Spawning client processes..." + vbCrLf)

        If currentProcessName.Contains(Environment.CurrentDirectory) Then
            currentProcessName = currentProcessName.Replace(Environment.CurrentDirectory, String.Empty)
        End If

        ' Remove extra characters when launched from Visual Studio.
        currentProcessName = currentProcessName.Replace("\", String.Empty)
        currentProcessName = currentProcessName.Replace("""", String.Empty)

        ' Change extension for .NET Core "dotnet run" returns the DLL, not the host exe.
        currentProcessName = Path.ChangeExtension(currentProcessName, ".exe")

        Dim i As Integer
        For i = 0 To numClients - 1
            ' Start 'this' program but spawn a named pipe client.
            plist(i) = Process.Start(currentProcessName, "spawnclient")
        Next
        While i > 0
            For j As Integer = 0 To numClients - 1
                If plist(j) IsNot Nothing Then
                    If plist(j).HasExited Then
                        Console.WriteLine($"Client process[{plist(j).Id}] has exited.")
                        plist(j) = Nothing
                        i -= 1    ' decrement the process watch count
                    Else
                        Thread.Sleep(250)
                    End If
                End If
            Next
        End While
        Console.WriteLine(vbCrLf + "Client processes finished, exiting.")
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
        Dim outBuffer As Byte() = streamEncoding.GetBytes(outString)
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
```

## Robust Programming

 The client and server processes in this example are intended to run on the same computer, so the server name provided to the `System.IO.Pipes.NamedPipeClientStream` object is `"."`. If the client and server processes were on separate computers, `"."` would be replaced with the network name of the computer that runs the server process.

## See also

- `System.Security.Principal.TokenImpersonationLevel`
- `System.IO.Pipes.NamedPipeServerStream.GetImpersonationUserName*`
- Pipes
- How to: Use Anonymous Pipes for Local Interprocess Communication
