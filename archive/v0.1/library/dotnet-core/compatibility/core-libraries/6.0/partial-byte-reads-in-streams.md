---
title: "Breaking change: Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/6.0/partial-byte-reads-in-streams.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream

The `Read()` and `ReadAsync()` methods on `System.IO.Compression.DeflateStream`, `System.IO.Compression.GZipStream`, and `System.Security.Cryptography.CryptoStream` might no longer return as many bytes as were requested.

Previously, `System.IO.Compression.DeflateStream`, `System.IO.Compression.GZipStream`, and `System.Security.Cryptography.CryptoStream` diverged from typical `System.IO.Stream.Read*` and `System.IO.Stream.ReadAsync*` behavior in the following two ways, both of which this change addresses:

- They didn't complete the read operation until either the buffer passed to the read operation was completely filled or the end of the stream was reached.
- As wrapper streams, they didn't delegate zero-length buffer functionality to the stream they wrap.

Consider this example that creates and compresses 150 random bytes. It then sends the compressed data one byte at a time from the client to the server, and the server decompresses the data by calling `Read` and requesting all 150 bytes.

```csharp
﻿using System.IO.Compression;
using System.Net;
using System.Net.Sockets;

internal class Program
{
    private static async Task Main()
    {
        // Connect two sockets and wrap a stream around each.
        using (Socket listener = new(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp))
        using (Socket client = new(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp))
        {
            listener.Bind(new IPEndPoint(IPAddress.Loopback, 0));
            listener.Listen(int.MaxValue);
            client.Connect(listener.LocalEndPoint!);
            using (Socket server = listener.Accept())
            {
                var clientStream = new NetworkStream(client, ownsSocket: true);
                var serverStream = new NetworkStream(server, ownsSocket: true);

                // Create some compressed data.
                var compressedData = new MemoryStream();
                using (var gz = new GZipStream(compressedData, CompressionLevel.Fastest, leaveOpen: true))
                {
                    byte[] bytes = new byte[150];
                    new Random().NextBytes(bytes);
                    gz.Write(bytes, 0, bytes.Length);
                }

                // Trickle it from the client stream to the server.
                Task sendTask = Task.Run(() =>
                {
                    foreach (byte b in compressedData.ToArray())
                    {
                        clientStream.WriteByte(b);
                    }
                    clientStream.Dispose();
                });

                // Read and decompress all the sent bytes.
                byte[] buffer = new byte[150];
                int total = 0;
                using (var gz = new GZipStream(serverStream, CompressionMode.Decompress))
                {
                    int numRead = 0;
                    while ((numRead = gz.Read(buffer.AsSpan(numRead))) > 0)
                    {
                        total += numRead;
                        Console.WriteLine($"Read: {numRead} bytes");
                    }
                }
                Console.WriteLine($"Total received: {total} bytes");

                await sendTask;
            }
        }
    }
}
```
In previous versions of .NET and .NET Framework, the following output shows that `Read` was only called once. Even though data was available for `GZipStream` to return, `Read` was forced to wait until the requested number of bytes was available.

```output
Read: 150 bytes
Total received: 150 bytes
```

In .NET 6 and later versions, the following output shows that `Read` was called multiple times until *all* the requested data was received. Even though the call to `Read` requests 150 bytes, each call to `Read` was able to successfully decompress *some* bytes (that is, all of the bytes that had been received at that time) to return, and it did:

```output
Read: 1 bytes
Read: 101 bytes
Read: 4 bytes
Read: 4 bytes
Read: 2 bytes
Read: 2 bytes
Read: 2 bytes
Read: 2 bytes
Read: 3 bytes
Read: 2 bytes
Read: 3 bytes
Read: 2 bytes
Read: 2 bytes
Read: 2 bytes
Read: 2 bytes
Read: 1 bytes
Read: 2 bytes
Read: 1 bytes
Read: 1 bytes
Read: 1 bytes
Read: 2 bytes
Read: 1 bytes
Read: 1 bytes
Read: 2 bytes
Read: 1 bytes
Read: 1 bytes
Read: 2 bytes
Total received: 150 bytes
```

## Old behavior

When `Stream.Read` or `Stream.ReadAsync` was called on one of the affected stream types with a buffer of length `N`, the operation wouldn't complete until:

- `N` bytes had been read from the stream, or
- The underlying stream returned 0 from a call to its read, indicating no more data was available.

Also, when `Stream.Read` or `Stream.ReadAsync` was called with a buffer of length 0, the operation would succeed immediately, sometimes without doing a zero-length read on the stream it wraps.

## New behavior

Starting in .NET 6, when `Stream.Read` or `Stream.ReadAsync` is called on one of the affected stream types with a buffer of length `N`, the operation completes when:

- At least 1 byte has been read from the stream, or
- The underlying stream returns 0 from a call to its read, indicating no more data is available.

Also, when `Stream.Read` or `Stream.ReadAsync` is called with a buffer of length 0, the operation succeeds once a call with a nonzero buffer would succeed.

When you call one of the affected `Read` methods, if the read can satisfy at least one byte of the request, regardless of how many were requested, *it returns as many as it can at that moment*.

## Version introduced

6.0

## Reason for change

The streams might not have returned from a read operation even if data had been successfully read. This meant they couldn't readily be used in any bidirectional communication situation where messages smaller than the buffer size were being used. This could lead to deadlocks: the application is unable to read the data from the stream that's necessary to continue the operation. It could also lead to arbitrary slowdowns, with the consumer unable to process available data while waiting for more data to arrive.

Also, in highly scalable applications, it's common to use zero-byte reads as a way of delaying buffer allocation until a buffer is needed. An application can issue a read with an empty buffer, and when that read completes, data should soon be available to consume. The application can then issue the read again, this time with a buffer to receive the data. By delegating to the wrapped stream if no already decompressed or transformed data is available, these streams now inherit any such behavior of the streams they wrap.

## Recommended action

In general, code should:

- Not make any assumptions about a stream `Read` or `ReadAsync` operation reading as much as was requested. The call returns the number of bytes read, which might be less than what was requested. If an application depends on the buffer being completely filled before progressing, it can perform the read in a loop to regain the behavior.

  ```csharp
  int totalRead = 0;
  while (totalRead < buffer.Length)
  {
      int bytesRead = stream.Read(buffer.AsSpan(totalRead));
      if (bytesRead == 0) break;
      totalRead += bytesRead;
  }
  ```

  Starting in .NET 7, you can also use `System.IO.Stream.ReadExactly*` or `System.IO.Stream.ReadExactlyAsync*` to read the exact number of bytes requested into the buffer:

  ```csharp
  stream.ReadExactly(buffer);
  ```

- When reading textual data from a stream, such as reading decrypted text from a `CryptoStream`, consider using `System.IO.StreamReader` to read to the end instead of manually reading into byte arrays:

  ```csharp
  using var reader = new StreamReader(cryptoStream);
  string plainText = reader.ReadToEnd();
  ```

- Expect that a stream `Read` or `ReadAsync` call might not complete until at least a byte of data is available for consumption (or the stream reaches its end), regardless of how many bytes were requested. If an application depends on a zero-byte read completing immediately without waiting, it can check the buffer length itself and skip the call entirely:

  ```csharp
  int bytesRead = 0;
  if (!buffer.IsEmpty)
  {
      bytesRead = stream.Read(buffer);
  }
  ```

## Affected APIs

- `System.IO.Compression.DeflateStream.Read*`
- `System.IO.Compression.DeflateStream.ReadAsync*`
- `System.IO.Compression.DeflateStream.BeginRead(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)`
- `System.IO.Compression.GZipStream.Read*`
- `System.IO.Compression.GZipStream.ReadAsync*`
- `System.IO.Compression.GZipStream.BeginRead(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)`
- `System.Security.Cryptography.CryptoStream.Read*`
- `System.Security.Cryptography.CryptoStream.ReadAsync*`
- `System.Security.Cryptography.CryptoStream.BeginRead(System.Byte[],System.Int32,System.Int32,System.AsyncCallback,System.Object)`

## See also

- CA2022: Avoid inexact read with Stream.Read
