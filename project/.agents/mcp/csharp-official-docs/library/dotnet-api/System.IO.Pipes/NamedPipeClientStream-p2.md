---
title: "NamedPipeClientStream class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/NamedPipeClientStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NamedPipeClientStream class (part 2 of 2)

## NamedPipeClientStream.Connect() method

```csharp
public void Connect ();
```

Connects to a waiting server with an infinite time-out value.

Exceptions:

- `InvalidOperationException`: The client is already connected.

#### Remarks
This method calls the `Connect` method with an infinite time-out value.

This method waits for a pipe instance to become available. `NamedPipeClientStream.Connect` might return before `NamedPipeServerStream.WaitForConnection` is called from the `NamedPipeServerStream` object, but `NamedPipeServerStream.WaitForConnection` will not return until `NamedPipeClientStream.Connect` has returned.

Any data written to the pipe after a `NamedPipeClientStream` object has connected, but before the server has called `NamedPipeServerStream.WaitForConnection`, will be available to the server following the call to `NamedPipeServerStream.WaitForConnection`.

#### Examples
The following example demonstrates a method to send a string from a parent process to a child process using named pipes. This example creates a `NamedPipeClientStream` object in a child process, which then connects to a pipe on the local computer. The server example can be seen in the `NamedPipeServerStream` class. This example is part of a larger example provided for the `NamedPipeServerStream` and `NamedPipeClientStream` classes.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/NamedPipeClientStream/Overview/Program.cs._

## NamedPipeClientStream.Connect(Int32) method

```csharp
public void Connect (int timeout);
```

Connects to a waiting server within the specified time-out period.

Parameters:

- `timeout`: The number of milliseconds to wait for the server to respond before the connection times out.

Exceptions:

- `TimeoutException`: Could not connect to the server within the specified `timeout` period.
- `ArgumentOutOfRangeException`: `timeout` is less than 0 and not set to `Timeout.Infinite`.
- `InvalidOperationException`: The client is already connected.
- `IOException`: The server is connected to another client and the time-out period has expired.

#### Remarks
This method waits for a pipe instance to become available. `NamedPipeClientStream.Connect` might return before `NamedPipeServerStream.WaitForConnection` is called from the `NamedPipeServerStream`, but `NamedPipeServerStream.WaitForConnection` will not return until `NamedPipeClientStream.Connect` has returned. You set the `timeout` parameter to `Infinite` to specify an infinite time-out value.

Any data written to the pipe after a `NamedPipeClientStream` object has connected, but before the server has called `NamedPipeServerStream.WaitForConnection`, will be available to the server following the call to `NamedPipeServerStream.WaitForConnection`.

## NamedPipeClientStream.Connect(TimeSpan) method

```csharp
public void Connect (TimeSpan timeout);
```

Connects to a waiting server within the specified timeout period.

Parameters:

- `timeout`: The amount of time to wait for the server to respond before the connection times out.

See `NamedPipeClientStream.Connect` remarks.

## NamedPipeClientStream.ConnectAsync() method

```csharp
public System.Threading.Tasks.Task ConnectAsync ();
```

Asynchronously connects to a waiting server with an infinite timeout period.

Returns: A task that represents the asynchronous connect operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `NamedPipeClientStream.Connect`.

## NamedPipeClientStream.ConnectAsync(Int32) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (int timeout);
```

Asynchronously connects to a waiting server within the specified timeout period.

Parameters:

- `timeout`: The number of milliseconds to wait for the server to respond before the connection times out.

Returns: A task that represents the asynchronous connect operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `NamedPipeClientStream.Connect`.

## NamedPipeClientStream.ConnectAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously connects to a waiting server and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous connect operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `NamedPipeClientStream.Connect`.

## NamedPipeClientStream.ConnectAsync(Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (int timeout, System.Threading.CancellationToken <example-value>);
```

Asynchronously connects to a waiting server within the specified timeout period and monitors cancellation requests.

Parameters:

- `timeout`: The number of milliseconds to wait for the server to respond before the connection times out.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous connect operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `NamedPipeClientStream.Connect`.

## NamedPipeClientStream.ConnectAsync(TimeSpan, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Asynchronously connects to a waiting server within the specified timeout period and monitors cancellation requests.

Parameters:

- `timeout`: The amount of time to wait for the server to respond before the connection times out.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous connect operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `NamedPipeClientStream.Connect`.

## NamedPipeClientStream.Finalize() method

```csharp
~NamedPipeClientStream ();
```

Releases unmanaged resources and performs other cleanup operations before the `NamedPipeClientStream` instance is reclaimed by garbage collection.

To be added.
