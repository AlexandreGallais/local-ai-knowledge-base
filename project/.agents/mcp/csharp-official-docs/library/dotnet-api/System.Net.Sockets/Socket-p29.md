---
title: "Socket class (part 29 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 29 of 33)

## Socket.SendFile(String) method

```csharp
public void SendFile (string? fileName);
```

Sends the file `fileName` to a connected `Socket` object with the `TransmitFileOptions.UseDefaultWorkerThread` transmit flag.

Parameters:

- `fileName`: A `String` that contains the path and name of the file to be sent. This parameter can be `null`.

Exceptions:

- `NotSupportedException`: The socket is not connected to a remote host.
- `ObjectDisposedException`: The `Socket` object has been closed.
- `InvalidOperationException`: The `Socket` object is not in blocking mode and cannot accept this synchronous call.
- `FileNotFoundException`: The file `fileName` was not found.
- `SocketException`: An error occurred when attempting to access the socket.

#### Remarks
This overload sends the file `fileName` to the connected socket. The `flags` parameter defaults to `UseDefaultWorkerThread` (0), and the `preBuffer` and `postBuffer` parameters default to `null`. If `fileName` is in the local directory, it may be identified with just the name of the file; otherwise, the full path and name of the file must be specified. Wildcards ("..\\\myfile.txt") and UNC share names ("\\\\\\\shared directory\\\myfile.txt") are supported. If the file is not found, the exception `FileNotFoundException` is thrown.

This method uses the `TransmitFile` function found in the Windows Sockets 2 API. For more information about the `TransmitFile` function and its flags, see the Windows Sockets documentation.

`Socket.SendFile` synchronously sends a file to the remote host specified in the `Socket.Connect` or `Socket.Accept` method. `Socket.SendFile` can be used for both connection-oriented and for connectionless protocols.

If you are using a connectionless protocol, you must call `Socket.Connect` before calling this method, otherwise `Socket.SendFile` throws a `SocketException` exception. If you are using a connection-oriented protocol, you must either use `Socket.Connect` to establish a remote host connection or use `Socket.Accept` to accept an incoming connection.

If you are using a connection-oriented protocol, `Socket.SendFile` blocks until the file is sent. In nonblocking mode, `Socket.SendFile` may complete successfully before the entire file has been sent. There is no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.SendFile` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example creates and connects a socket and then sends a file to the remote host. The file "test.txt" is located in the root directory of the local machine.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/BeginAccept/nclsocketenhancements.cs._
## Socket.SendFile(String, Byte[], Byte[], TransmitFileOptions) method

```csharp
public void SendFile (string? fileName, byte[]? preBuffer, byte[]? postBuffer, System.Net.Sockets.TransmitFileOptions flags);
```

Sends the file `fileName` and buffers of data to a connected `Socket` object using the specified `TransmitFileOptions` value.

Parameters:

- `fileName`: The path and name of the file to be sent. This parameter can be `null`.
- `preBuffer`: The data to be sent before the file is sent. This parameter can be `null`.
- `postBuffer`: The data to be sent after the file is sent. This parameter can be `null`.
- `flags`: A bitwise combination of the enumeration values that specifies how the file is transferred.

Exceptions:

- `NotSupportedException`: The operating system is not Windows NT or later.

-or-

The socket is not connected to a remote host.
- `ObjectDisposedException`: The `Socket` object has been closed.
- `InvalidOperationException`: The `Socket` object is not in blocking mode and cannot accept this synchronous call.
- `FileNotFoundException`: The file `fileName` was not found.
- `SocketException`: An error occurred when attempting to access the socket.

#### Remarks
This overload requires the name of the file you want to send and a bitwise combination of `TransmitFileOptions` values. The `preBuffer` parameter contains any data you want to precede the file. `postBuffer` contains data you want to follow the file. If `fileName` is in the current working directory, it may be identified with just the name of the file; otherwise, the full path and name of the file must be specified. Wildcards ("..\\\myfile.txt") and UNC share names ("\\\\\\\shared directory\\\myfile.txt") are supported.

The `flags` parameter provides the Window Sockets service provider with additional information about the file transfer. For more information about how to use this parameter, see `TransmitFileOptions`.

This method uses the `TransmitFile` function found in the Windows Sockets 2 API. For more information about the `TransmitFile` function and its flags, see the Windows Sockets documentation.

`Socket.SendFile` synchronously sends a file to the remote host specified in the `Socket.Connect` or `Socket.Accept` method. `Socket.SendFile` can be used for both connection-oriented and for connectionless protocols.

If you are using a connectionless protocol, you must call `Socket.Connect` before calling this method; otherwise `Socket.SendFile` throws a `SocketException`. If you are using a connection-oriented protocol, you must either use `Socket.Connect` to establish a remote host connection, or use `Socket.Accept` to accept an incoming connection.

If you are using a connection-oriented protocol, `Socket.SendFile` blocks until the entire file is sent. In nonblocking mode, `Socket.SendFile` may complete successfully before the entire file has been sent. There is no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.SendFile` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example creates and connects a socket. The file "test.txt" is located in the root directory of the local machine. In this example, we create a prebuffer and postbuffer of data and send them to the remote host with the file. The default `TransmitFileOptions` are used.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/BeginAccept/nclsocketenhancements.cs._
## Socket.SendFile(String, Byte>, Byte>, TransmitFileOptions) method

```csharp
public void SendFile (string? fileName, ReadOnlySpan<byte> preBuffer, ReadOnlySpan<byte> postBuffer, System.Net.Sockets.TransmitFileOptions flags);
```

Sends the file `fileName` and buffers of data to a connected `Socket` object using the specified `TransmitFileOptions` value.

Parameters:

- `fileName`: A `String` that contains the path and name of the file to be sent. This parameter can be `null`.
- `preBuffer`: A `ReadOnlySpan<T>` that contains data to be sent before the file is sent. This buffer can be empty.
- `postBuffer`: A `ReadOnlySpan<T>` that contains data to be sent after the file is sent. This buffer can be empty.
- `flags`: One or more of `TransmitFileOptions` values.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `NotSupportedException`: The `Socket` object is not connected to a remote host.
- `InvalidOperationException`: The `Socket` object is not in blocking mode and cannot accept this synchronous call.
- `FileNotFoundException`: The file `fileName` was not found.
- `SocketException`: An error occurred when attempting to access the socket.

To be added.

## Socket.SendFileAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask SendFileAsync (string? fileName, System.Threading.CancellationToken <example-value> = default);
```

Sends the file `fileName` to a connected `Socket` object.

Parameters:

- `fileName`: A `String` that contains the path and name of the file to be sent. This parameter can be `null`.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: A value task that represents the asynchronous send file operation.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `NotSupportedException`: The `Socket` object is not connected to a remote host.
- `FileNotFoundException`: The file `fileName` was not found.
- `SocketException`: An error occurred when attempting to access the socket.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.SendFile`.

## Socket.SendFileAsync(String, Byte>, Byte>, TransmitFileOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask SendFileAsync (string? fileName, ReadOnlyMemory<byte> preBuffer, ReadOnlyMemory<byte> postBuffer, System.Net.Sockets.TransmitFileOptions flags, System.Threading.CancellationToken <example-value> = default);
```

Sends the file `fileName` and buffers of data to a connected `Socket` object using the specified `TransmitFileOptions` value.

Parameters:

- `fileName`: A `String` that contains the path and name of the file to be sent. This parameter can be `null`.
- `preBuffer`: A `Byte` array that contains data to be sent before the file is sent. This parameter can be `null`.
- `postBuffer`: A `Byte` array that contains data to be sent after the file is sent. This parameter can be `null`.
- `flags`: One or more of `TransmitFileOptions` values.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: A value task that represents the asynchronous send file operation.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `NotSupportedException`: The `Socket` object is not connected to a remote host.
- `FileNotFoundException`: The file `fileName` was not found.
- `SocketException`: An error occurred when attempting to access the socket.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
