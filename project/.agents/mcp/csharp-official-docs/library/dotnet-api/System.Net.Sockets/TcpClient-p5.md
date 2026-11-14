---
title: "TcpClient class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/TcpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpClient class (part 5 of 5)

## TcpClient.GetStream() method

```csharp
public System.Net.Sockets.NetworkStream GetStream ();
```

Returns the `NetworkStream` used to send and receive data.

Returns: The underlying `NetworkStream`.

Exceptions:

- `InvalidOperationException`: The `TcpClient` is not connected to a remote host.
- `ObjectDisposedException`: The `TcpClient` has been closed.

#### Remarks
The `GetStream` method returns a `NetworkStream` that you can use to send and receive data. The `NetworkStream` class inherits from the `Stream` class, which provides a rich collection of methods and properties used to facilitate network communications.

You must call the `TcpClient.Connect` method first, or the `TcpClient.GetStream` method will throw an `InvalidOperationException`. After you have obtained the `NetworkStream`, call the `NetworkStream.Write` method to send data to the remote host. Call the `NetworkStream.Read` method to receive data arriving from the remote host. Both of these methods block until the specified operation is performed. You can avoid blocking on a read operation by checking the `DataAvailable` property. A `true` value means that data has arrived from the remote host and is available for reading. In this case, `NetworkStream.Read` is guaranteed to complete immediately. If the remote host has shutdown its connection, `NetworkStream.Read` will immediately return with zero bytes.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example uses `GetStream` to obtain the underlying `NetworkStream`. After obtaining the `NetworkStream`, it sends and receives using its `NetworkStream.Write` and `NetworkStream.Read` methods.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._
