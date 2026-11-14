---
title: "Socket class (part 7 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 7 of 33)

## Socket.BeginReceive(Byte>>, SocketFlags, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginReceive (System.Collections.Generic.IList<ArraySegment<byte>> buffers, System.Net.Sockets.SocketFlags socketFlags, AsyncCallback? callback, object? state);
```

Begins to asynchronously receive data from a connected `Socket`.

Parameters:

- `buffers`: An array of type `Byte` that is the storage location for the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `callback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the receive operation. This object is passed to the `Socket.EndReceive` delegate when the operation is complete.

Returns: An `IAsyncResult` that references the asynchronous read.

Exceptions:

- `ArgumentNullException`: `buffers` is `null`.
- `ObjectDisposedException`: `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginReceive` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `Socket.BeginReceive`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginReceive` method.

The asynchronous `Socket.BeginReceive` operation must be completed by calling the `Socket.EndReceive` method. Typically, the method is invoked by the `AsyncCallback` delegate. `Socket.EndReceive` will block the calling thread until the operation is completed.

Close the `Socket` to cancel a pending `Socket.BeginReceive`. When the `Socket.Close` method is called while an asynchronous operation is in progress, the callback provided to the `Socket.BeginReceive` method is called. A subsequent call to the `Socket.EndReceive` method will throw a `SocketException` to indicate that the operation has been cancelled.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> All I/O initiated by a given thread is canceled when that thread exits. A pending asynchronous operation can fail if the thread exits before the operation completes.

> **Note:**
> `state` is an instantiation of a user-defined class.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.BeginReceive(Byte>>, SocketFlags, SocketError, AsyncCallback, Object) method

```csharp
public IAsyncResult? BeginReceive (System.Collections.Generic.IList<ArraySegment<byte>> buffers, System.Net.Sockets.SocketFlags socketFlags, out System.Net.Sockets.SocketError errorCode, AsyncCallback? callback, object? state);
```

Begins to asynchronously receive data from a connected `Socket`.

Parameters:

- `buffers`: An array of type `Byte` that is the storage location for the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `errorCode`: A `SocketError` object that stores the socket error.
- `callback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the receive operation. This object is passed to the `Socket.EndReceive` delegate when the operation is complete.

Returns: An `IAsyncResult` that references the asynchronous read.

Exceptions:

- `ArgumentNullException`: `buffers` is `null`.
- `ObjectDisposedException`: `Socket` has been closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginReceive` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `Socket.BeginReceive`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginReceive` method.

The asynchronous `Socket.BeginReceive` operation must be completed by calling the `Socket.EndReceive` method. Typically, the method is invoked by the `AsyncCallback` delegate. `Socket.EndReceive` will block the calling thread until the operation is completed.

Close the `Socket` to cancel a pending `Socket.BeginReceive`. When the `Socket.Close` method is called while an asynchronous operation is in progress, the callback provided to the `Socket.BeginReceive` method is called. A subsequent call to the `Socket.EndReceive` method will throw a `SocketException` to indicate that the operation has been cancelled.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> All I/O initiated by a given thread is canceled when that thread exits. A pending asynchronous operation can fail if the thread exits before the operation completes.

> **Note:**
> `state` is an instantiation of a user-defined class.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.BeginReceive(Byte[], Int32, Int32, SocketFlags, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginReceive (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags, AsyncCallback? callback, object? state);
```

Begins to asynchronously receive data from a connected `Socket`.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for the received data.
- `offset`: The zero-based position in the `buffer` parameter at which to store the received data.
- `size`: The number of bytes to receive.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `callback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the receive operation. This object is passed to the `Socket.EndReceive` delegate when the operation is complete.

Returns: An `IAsyncResult` that references the asynchronous read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ObjectDisposedException`: `Socket` has been closed.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`size` is less than 0.

-or-

`size` is greater than the length of `buffer` minus the value of the `offset` parameter.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginReceive` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `Socket.BeginReceive`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginReceive` method.

The asynchronous `Socket.BeginReceive` operation must be completed by calling the `Socket.EndReceive` method. Typically, the method is invoked by the `AsyncCallback` delegate. `Socket.EndReceive` will block the calling thread until the operation is completed.

Close the `Socket` to cancel a pending `Socket.BeginReceive`. When the `Socket.Close` method is called while an asynchronous operation is in progress, the callback provided to the `Socket.BeginReceive` method is called. A subsequent call to the `Socket.EndReceive` method will throw a `SocketException` to indicate that the operation has been cancelled.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> All I/O initiated by a given thread is canceled when that thread exits. A pending asynchronous operation can fail if the thread exits before the operation completes.

> **Note:**
> `state` is an instantiation of a user-defined class.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.BeginReceive(Byte[], Int32, Int32, SocketFlags, SocketError, AsyncCallback, Object) method

```csharp
public IAsyncResult? BeginReceive (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags, out System.Net.Sockets.SocketError errorCode, AsyncCallback? callback, object? state);
```

Begins to asynchronously receive data from a connected `Socket`.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for the received data.
- `offset`: The location in `buffer` to store the received data.
- `size`: The number of bytes to receive.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `errorCode`: A `SocketError` object that stores the socket error.
- `callback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the receive operation. This object is passed to the `Socket.EndReceive` delegate when the operation is complete.

Returns: An `IAsyncResult` that references the asynchronous read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ObjectDisposedException`: `Socket` has been closed.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`size` is less than 0.

-or-

`size` is greater than the length of `buffer` minus the value of the `offset` parameter.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginReceive` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `Socket.BeginReceive`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginReceive` method.

The asynchronous `Socket.BeginReceive` operation must be completed by calling the `Socket.EndReceive` method. Typically, the method is invoked by the `AsyncCallback` delegate. `Socket.EndReceive` will block the calling thread until the operation is completed.

Close the `Socket` to cancel a pending `Socket.BeginReceive`. When the `Socket.Close` method is called while an asynchronous operation is in progress, the callback provided to the `Socket.BeginReceive` method is called. A subsequent call to the `Socket.EndReceive` method will throw a `SocketException` to indicate that the operation has been cancelled.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> All I/O initiated by a given thread is canceled when that thread exits. A pending asynchronous operation can fail if the thread exits before the operation completes.

> **Note:**
> `state` is an instantiation of a user-defined class.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.
