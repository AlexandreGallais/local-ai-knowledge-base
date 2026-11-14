---
title: "NamedPipeServerStream class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/NamedPipeServerStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NamedPipeServerStream class (part 2 of 2)

## NamedPipeServerStream.Disconnect() method

```csharp
public void Disconnect ();
```

Disconnects the current connection.

Exceptions:

- `InvalidOperationException`: No pipe connections have been made yet.

-or-

The connected pipe has already disconnected.

-or-

The pipe handle has not been set.
- `ObjectDisposedException`: The pipe is closed.

#### Remarks
Calling the `NamedPipeServerStream.Disconnect` method will block until all the sent characters have been read unless the transmission mode of the pipe is set to `Message` and the buffer size is set in the constructor that created the `NamedPipeServerStream` object. In this case, not all of the messages will be received. Calling `PipeStream.WaitForPipeDrain` causes the server to block until all the data has been read from the pipe.

## NamedPipeServerStream.EndWaitForConnection(IAsyncResult) method

```csharp
public void EndWaitForConnection (IAsyncResult asyncResult);
```

Ends an asynchronous operation to wait for a client to connect.

Parameters:

- `asyncResult`: The pending asynchronous request.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `InvalidOperationException`: The pipe was not opened asynchronously.

-or-

The pipe handle has not been set.
- `IOException`: The pipe connection has been broken.
- `ObjectDisposedException`: The pipe is closed.

#### Remarks
`NamedPipeServerStream.EndWaitForConnection` must be called exactly once for every call to `NamedPipeServerStream.BeginWaitForConnection`.

## NamedPipeServerStream.Finalize() method

```csharp
~NamedPipeServerStream ();
```

Releases unmanaged resources and performs other cleanup operations before the `NamedPipeServerStream` instance is reclaimed by garbage collection.

To be added.

## NamedPipeServerStream.GetImpersonationUserName() method

```csharp
public string GetImpersonationUserName ();
```

Gets the user name of the client on the other end of the pipe.

Returns: The user name of the client on the other end of the pipe.

Exceptions:

- `InvalidOperationException`: No pipe connections have been made yet.

-or-

The connected pipe has already disconnected.

-or-

The pipe handle has not been set.
- `ObjectDisposedException`: The pipe is closed.
- `IOException`: The pipe connection has been broken.

-or-

The user name of the client is longer than 19 characters.

#### Remarks
The `NamedPipeServerStream.GetImpersonationUserName` method returns `null` if the client has not yet written to the pipe or if the connected client did not connect with a `TokenImpersonationLevel` of `Impersonation`.

#### Examples
The following example demonstrates a method to create a pipe server that can respond to multiple simultaneous client requests, and a method for client impersonation. This example creates a `NamedPipeServerStream` object in a parent process, which then creates multiple threads that wait for `NamedPipeClientStream` objects to connect. After a client is connected, it supplies a file name to the server and the contents of that file are read and sent back to the client. Because the `NamedPipeServerStream` impersonates the client when opening the file, the client can request only files that it has sufficient permissions to open.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/NamedPipeServerStream/GetImpersonationUserName/Program.cs._

## NamedPipeServerStream.RunAsClient(PipeStreamImpersonationWorker) method

```csharp
public void RunAsClient (System.IO.Pipes.PipeStreamImpersonationWorker impersonationWorker);
```

Calls a delegate while impersonating the client.

Parameters:

- `impersonationWorker`: The delegate that specifies a method to call.

Exceptions:

- `InvalidOperationException`: No pipe connections have been made yet.

-or-

The connected pipe has already disconnected.

-or-

The pipe handle has not been set.
- `ObjectDisposedException`: The pipe is closed.
- `IOException`: The pipe connection has been broken.

-or-

An I/O error occurred.

#### Remarks
The connecting client's permissions are applied to the remote server. For example, if the connecting client tries to request the contents of a file on the server, the client can request only files that it has sufficient permissions to open.

On Windows, only the thread used for executing the delegate is updated to impersonate the client. On other platforms, all threads from the parent process impersonate the client when `RunAsClient` is called. This behavior affects multi-threaded servers such as the example shown.

#### Examples
The following example demonstrates a method to create a pipe server that can respond to multiple simultaneous client requests, and a method for client impersonation. This example creates a `NamedPipeServerStream` object in a parent process, which then creates multiple threads that wait for `NamedPipeClientStream` objects to connect. After a client is connected, it supplies a file name to the server and the contents of that file are read and sent back to the client. Because the `NamedPipeServerStream` impersonates the client when opening the file, the client can request only files that it has sufficient permissions to open.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/NamedPipeServerStream/GetImpersonationUserName/Program.cs._

## NamedPipeServerStream.WaitForConnection() method

```csharp
public void WaitForConnection ();
```

Waits for a client to connect to this `NamedPipeServerStream` object.

Exceptions:

- `InvalidOperationException`: A pipe connection has already been established.

-or-

The pipe handle has not been set.
- `ObjectDisposedException`: The pipe is closed.
- `IOException`: The pipe connection has been broken.

#### Remarks
Calling this method causes the `NamedPipeServerStream` object to block until a client connects.

#### Examples
The following example demonstrates a method to send a string from a parent process to a child process using named pipes. This example creates a `NamedPipeServerStream` object in a parent process. This object has a `PipeDirection` value of `Out`, which then blocks until a `NamedPipeClientStream` object establishes a connection to the `NamedPipeServerStream` object. This example is part of a larger example provided for the `NamedPipeServerStream` and `NamedPipeClientStream` classes.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/NamedPipeServerStream/Overview/Program.cs._

## NamedPipeServerStream.WaitForConnectionAsync() method

```csharp
public System.Threading.Tasks.Task WaitForConnectionAsync ();
```

Asynchronously waits for a client to connect to this `NamedPipeServerStream` object.

Returns: A task that represents the asynchronous wait operation.

#### Remarks
Because it is asynchronous, this method returns immediately, but the connection process is completed when the client calls `NamedPipeClientStream.Connect` or `NamedPipeClientStream.ConnectAsync`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WaitForConnection`.

## NamedPipeServerStream.WaitForConnectionAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task WaitForConnectionAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously waits for a client to connect to this `NamedPipeServerStream` object and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous wait operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
Because it is asynchronous, this method returns immediately, but the connection process is completed when the client calls `NamedPipeClientStream.Connect` or `NamedPipeClientStream.ConnectAsync`.

Cancellation requests using the cancellation token will only work if   the `NamedPipeServerStream` object was created with a pipe option value of `Asynchronous` or if the cancellation occurs before the `NamedPipeServerStream.WaitForConnectionAsync` method is called.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WaitForConnection`.

## NamedPipeServerStream.MaxAllowedServerInstances field

```csharp
public const int MaxAllowedServerInstances = -1;
```

Represents the maximum number of server instances that the system resources allow.

#### Remarks
Use the `MaxAllowedServerInstances` when creating a `NamedPipeServerStream` object to set the maximum number of server instances that the system resources allow.
