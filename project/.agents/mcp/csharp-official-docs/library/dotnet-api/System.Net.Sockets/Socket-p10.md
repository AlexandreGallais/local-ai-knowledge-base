---
title: "Socket class (part 10 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 10 of 33)

## Socket.BeginSendFile(String, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginSendFile (string? fileName, AsyncCallback? callback, object? state);
```

Sends the file `fileName` to a connected `Socket` object using the `TransmitFileOptions.UseDefaultWorkerThread` flag.

Parameters:

- `fileName`: A string that contains the path and name of the file to send. This parameter can be `null`.
- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` object that represents the asynchronous send.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `NotSupportedException`: The socket is not connected to a remote host.
- `FileNotFoundException`: The file `fileName` was not found.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

This overload sends the file `fileName` over the socket. If `fileName` is in the local directory, it may be identified with just the name of the file; otherwise, the full path and name of the file must be specified. Wildcards ("..\\\myfile.txt") and UNC share names ("\\\\\\\shared directory\\\myfile.txt") are supported. If the file is not found, the exception `FileNotFoundException` is thrown.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginSendFile` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `Socket.BeginSendFile`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginSendFile` method.

The `Socket.BeginSendFile` operation must be completed by calling the `Socket.EndSendFile` method. Typically, the method is invoked by the `AsyncCallback` delegate. `Socket.EndSendFile` will block the calling thread until the operation is completed.

Although intended for connection-oriented protocols, `Socket.BeginSendFile` also works for connectionless protocols, provided that you first call the `Socket.Connect` or `Socket.BeginConnect` method to establish a default remote host. With connectionless protocols, you must be sure that the size of your file does not exceed the maximum packet size of the underlying service provider. If it does, the datagram is not sent and `Socket.BeginSendFile` throws a `SocketException` exception.

> **Note:**
> If you receive a `SocketException` exception, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

## Socket.BeginSendFile(String, Byte[], Byte[], TransmitFileOptions, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginSendFile (string? fileName, byte[]? preBuffer, byte[]? postBuffer, System.Net.Sockets.TransmitFileOptions flags, AsyncCallback? callback, object? state);
```

Sends a file and buffers of data asynchronously to a connected `Socket` object.

Parameters:

- `fileName`: A string that contains the path and name of the file to be sent. This parameter can be `null`.
- `preBuffer`: The data to be sent before the file is sent. This parameter can be `null`.
- `postBuffer`: The data to be sent after the file is sent. This parameter can be `null`.
- `flags`: A bitwise combination of the enumeration values.
- `callback`: An `AsyncCallback` delegate to be invoked when this operation completes. This parameter can be `null`.
- `state`: A user-defined object that contains state information for this request. This parameter can be `null`.

Returns: An `IAsyncResult` object that represents the asynchronous operation.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `NotSupportedException`: The operating system is not Windows NT or later.

-or-

The socket is not connected to a remote host.
- `FileNotFoundException`: The file `fileName` was not found.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

This overload requires the name of the file you want to send and a bitwise combination of `TransmitFileOptions` values. The `preBuffer` parameter contains any data you want to precede the file. `postBuffer` contains data you want to follow the file. If `fileName` is in the local directory, it may be identified with just the name of the file; otherwise, the full path and name of the file must be specified. Wildcards ("..\\\myfile.txt") and UNC share names ("\\\\\\\shared directory\\\myfile.txt") are supported. If the file is not found, the exception `FileNotFoundException` is thrown.

The `flags` parameter provides additional information about the file transfer. For more information about how to use this parameter, see `TransmitFileOptions`.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginSendFile` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `Socket.BeginSendFile`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginSendFile` method.

The `Socket.BeginSendFile` operation must be completed by calling the `Socket.EndSendFile` method. Typically, the method is invoked by the provided `AsyncCallback` delegate. `Socket.EndSendFile` will block the calling thread until the operation is completed.

Although intended for connection-oriented protocols, `Socket.BeginSendFile` also works for connectionless protocols, provided that you first call the `Socket.Connect` or `Socket.BeginConnect` method to establish a default remote host. With connectionless protocols, you must be sure that the size of your file does not exceed the maximum packet size of the underlying service provider. If it does, the datagram is not sent and `Socket.BeginSendFile` throws a `SocketException` exception.

> **Note:**
> If you receive a `SocketException` exception, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.BeginSendTo(Byte[], Int32, Int32, SocketFlags, EndPoint, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginSendTo (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEP, AsyncCallback? callback, object? state);
```

Sends data asynchronously to a specific remote host.

Parameters:

- `buffer`: An array of type `Byte` that contains the data to send.
- `offset`: The zero-based position in `buffer` at which to begin sending data.
- `size`: The number of bytes to send.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: An `EndPoint` that represents the remote device.
- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` that references the asynchronous send.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEP` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`size` is less than 0.

-or-

`size` is greater than the length of `buffer` minus the value of the `offset` parameter.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginSendTo` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `Socket.BeginSendTo`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginSendTo` method.

The `Socket.BeginSendTo` operation must be completed by calling the `Socket.EndSendTo` method. Typically, the method is invoked by the provided `AsyncCallback` delegate. `Socket.EndSendTo` will block the calling thread until the operation is completed.

If you are using a connection-oriented protocol, you must first call the `Socket.Connect`, `Socket.BeginConnect`, `Socket.Accept`, or `Socket.BeginAccept` method, or `Socket.BeginSendTo` will throw a `SocketException`. `Socket.BeginSendTo` will ignore the `remoteEP` parameter and send data to the `EndPoint` established in the `Socket.Connect`, `Socket.BeginConnect`, `Socket.Accept`, or `Socket.BeginAccept` method.

If you are using a connectionless protocol, you do not need to establish a default remote host with the `Socket.Connect` or `Socket.BeginConnect` method prior to calling `Socket.SendTo`. You only need to do this if you intend to call the `Socket.BeginSend` method. If you do call the `Socket.Connect` or `Socket.BeginConnect` method prior to calling `Socket.SendTo`, the `remoteEP` parameter will override the specified default remote host for that send operation only. You are also not required to call the `Socket.Bind` method. In this case, the underlying service provider will assign the most appropriate local network address and port number. Use a port number of zero if you want the underlying service provider to select a free port. If you need to identify the assigned local network address and port number, you can use the `LocalEndPoint` property after the `Socket.EndSendTo` method successfully completes.

If you want to send data to a broadcast address, you must first call the `Socket.SetSocketOption` method and set the socket option to `Broadcast`. -You must also be sure that the size of your buffer does not exceed the maximum packet size of the underlying service provider. If it does, the datagram will not be sent and `Socket.EndSendTo` will throw a `SocketException`.

If you specify the `DontRoute` flag as the `socketflags` parameter, the data you are sending will not be routed.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.
