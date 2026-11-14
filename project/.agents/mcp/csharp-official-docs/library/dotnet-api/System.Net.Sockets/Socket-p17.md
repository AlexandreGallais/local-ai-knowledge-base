---
title: "Socket class (part 17 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 17 of 33)

## Socket.GetSocketOption(SocketOptionLevel, SocketOptionName) method

```csharp
public object? GetSocketOption (System.Net.Sockets.SocketOptionLevel optionLevel, System.Net.Sockets.SocketOptionName optionName);
```

Returns the value of a specified `Socket` option, represented as an object.

Parameters:

- `optionLevel`: One of the `SocketOptionLevel` values.
- `optionName`: One of the `SocketOptionName` values.

Returns: An object that represents the value of the option. When the `optionName` parameter is set to `SocketOptionName.Linger` the return value is an instance of the `LingerOption` class. When `optionName` is set to `SocketOptionName.AddMembership` or `SocketOptionName.DropMembership`, the return value is an instance of the `MulticastOption` class. When `optionName` is any other value, the return value is an integer.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.

-or-

`optionName` was set to the unsupported value `SocketOptionName.MaxConnections`.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
`Socket` options determine the behavior of the current `Socket`. Use this overload to get the `Linger`, `AddMembership`, and `DropMembership``Socket` options. For the `Linger` option, use `Socket` for the `optionLevel` parameter. For `AddMembership` and `DropMembership`, use `IP`. If you want to set the value of any of the options listed above, use the `Socket.SetSocketOption` method.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example retrieves the `LingerOption` and `Socket.Send` time-out values and displays them to the console.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## Socket.GetSocketOption(SocketOptionLevel, SocketOptionName, Byte[]) method

```csharp
public void GetSocketOption (System.Net.Sockets.SocketOptionLevel optionLevel, System.Net.Sockets.SocketOptionName optionName, byte[] optionValue);
```

Returns the specified `Socket` option setting, represented as a byte array.

Parameters:

- `optionLevel`: One of the `SocketOptionLevel` values.
- `optionName`: One of the `SocketOptionName` values.
- `optionValue`: An array of type `Byte` that is to receive the option setting.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
`Socket` options determine the behavior of the current `Socket`. Upon successful completion of this method, the array specified by the `optionValue` parameter contains the value of the specified `Socket` option.

When the length of the `optionValue` array is smaller than the number of bytes required to store the value of the specified `Socket` option, `Socket.GetSocketOption` will throw a `SocketException`. If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error. Use this overload for any sockets that are represented by Boolean values or integers.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example retrieves the `LingerOption` and `Socket.Send` time-out values and displays them to the console.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## Socket.GetSocketOption(SocketOptionLevel, SocketOptionName, Int32) method

```csharp
public byte[] GetSocketOption (System.Net.Sockets.SocketOptionLevel optionLevel, System.Net.Sockets.SocketOptionName optionName, int optionLength);
```

Returns the value of the specified `Socket` option in an array.

Parameters:

- `optionLevel`: One of the `SocketOptionLevel` values.
- `optionName`: One of the `SocketOptionName` values.
- `optionLength`: The length, in bytes, of the expected return value.

Returns: An array of type `Byte` that contains the value of the socket option.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The `optionLength` parameter sets the maximum size of the returned byte array. If the option value requires fewer bytes, the array will contain only that many bytes. If the option value requires more bytes, `Socket.GetSocketOption` will throw a `SocketException`. Use this overload for any sockets that are represented by Boolean values or integers.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example retrieves the `LingerOption` and `Socket.Send` time-out values and displays them to the console.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## Socket.IOControl(Int32, Byte[], Byte[]) method

```csharp
public int IOControl (int ioControlCode, byte[]? optionInValue, byte[]? optionOutValue);
```

Sets low-level operating modes for the `Socket` using numerical control codes.

Parameters:

- `ioControlCode`: An `Int32` value that specifies the control code of the operation to perform.
- `optionInValue`: A `Byte` array that contains the input data required by the operation.
- `optionOutValue`: A `Byte` array that contains the output data returned by the operation.

Returns: The number of bytes in the `optionOutValue` parameter.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `InvalidOperationException`: An attempt was made to change the blocking mode without using the `Socket.Blocking` property.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks
The `Socket.IOControl` method provides low-level access to the operating system `Socket` underlying the current instance of the `Socket` class. For more information, see the WSAIoctl documentation.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example compares the results of FIONREAD and the Available property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Available/iocontrolserver.cs._
## Socket.IOControl(IOControlCode, Byte[], Byte[]) method

```csharp
public int IOControl (System.Net.Sockets.IOControlCode ioControlCode, byte[]? optionInValue, byte[]? optionOutValue);
```

Sets low-level operating modes for the `Socket` using the `IOControlCode` enumeration to specify control codes.

Parameters:

- `ioControlCode`: A `IOControlCode` value that specifies the control code of the operation to perform.
- `optionInValue`: An array of type `Byte` that contains the input data required by the operation.
- `optionOutValue`: An array of type `Byte` that contains the output data returned by the operation.

Returns: The number of bytes in the `optionOutValue` parameter.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `InvalidOperationException`: An attempt was made to change the blocking mode without using the `Socket.Blocking` property.

#### Remarks
This method provides low-level access to the operating system `Socket` underlying the current instance of the `Socket` class. For more, see the WSAIoctl documentation.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example compares the results of calling `Socket.IOControl` with `DataToRead` and the `Available` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IOControlCode/Overview/iocontrolcode.cs._
## Socket.Listen() method

```csharp
public void Listen ();
```

Places a `Socket` in a listening state.

#### Remarks

The maximum length of the pending connections queue is determined automatically.

## Socket.Listen(Int32) method

```csharp
public void Listen (int backlog);
```

Places a `Socket` in a listening state.

Parameters:

- `backlog`: The maximum length of the pending connections queue.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
`Socket.Listen` causes a connection-oriented `Socket` to listen for incoming connection attempts. The `backlog` parameter specifies the number of incoming connections that can be queued for acceptance. To determine the maximum number of connections you can specify, retrieve the `MaxConnections` value. `Socket.Listen` does not block.

If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error. Use `Socket.Accept` or `Socket.BeginAccept` to accept a connection from the queue.

> **Note:**
> You must call the `Socket.Bind` method before calling `Socket.Listen`, or `Socket.Listen` will throw a `SocketException`.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> The backlog parameter is limited to different values depending on the Operating System. You may specify a higher value, but the backlog will be limited based on the Operating System.

#### Examples
The following code example uses `Socket` to listen for incoming connections.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Listen/source.cs._

## Socket.Poll(Int32, SelectMode) method

```csharp
public bool Poll (int microSeconds, System.Net.Sockets.SelectMode mode);
```

Determines the status of the `Socket`.

Parameters:

- `microSeconds`: The time to wait for a response, in microseconds.
- `mode`: One of the `SelectMode` values.

Returns: The status of the `Socket` based on the polling mode value passed in the `mode` parameter.
For `SelectMode.SelectRead`, it returns `true` if `Socket.Listen` has been called and a connection is pending, if data is available for reading, or if the connection has been closed, reset, or terminated.For `SelectMode.SelectWrite`, it returns `true` if processing a `Connect` and the connection has succeeded or if data can be sent.For `SelectMode.SelectError`, it returns `true` if processing a `Connect` that does not block and the connection has failed, or if `SocketOptionName.OutOfBandInline` is not set and out-of-band data is available.Otherwise, it returns `false`.

Exceptions:

- `NotSupportedException`: The `mode` parameter is not one of the `SelectMode` values.
- `SocketException`: An error occurred when attempting to access the socket. See remarks below.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The `Socket.Poll` method checks the state of the `Socket`. Specify `SelectRead` for the `selectMode` parameter to determine if the `Socket` is readable. Specify `SelectWrite` to determine if the `Socket` is writable. Use `SelectError` to detect an error condition. `Socket.Poll` will block execution until the specified time period, measured in `microseconds`, elapses or data becomes available. Set the `microSeconds` parameter to a negative integer if you would like to wait indefinitely for a response. If you want to check the status of multiple sockets, you might prefer to use the `Socket.Select` method.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This method cannot detect certain kinds of connection problems, such as a broken network cable, or that the remote host was shut down ungracefully. You must attempt to send or receive data to detect these kinds of errors.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example creates a socket, connects to a server, and uses `Socket.Poll` to check the status of the socket.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/SelectMode/Overview/source.cs._

## Socket.Poll(TimeSpan, SelectMode) method

```csharp
public bool Poll (TimeSpan timeout, System.Net.Sockets.SelectMode mode);
```

Determines the status of the `Socket`.

Parameters:

- `timeout`: The time to wait for a response.
- `mode`: One of the `SelectMode` values.

Returns: The status of the `Socket` based on the polling mode value passed in the `mode` parameter. Returns `true` if any of the following conditions occur before the `timeout` expires, otherwise, `false`.
For `SelectMode.SelectRead`, it returns `true` if `Socket.Listen` has been called and a connection is pending, if data is available for reading, or if the connection has been closed, reset, or terminated.For `SelectMode.SelectWrite`, it returns `true` if processing a `Connect` and the connection has succeeded or if data can be sent.For `SelectMode.SelectError`, it returns `true` if processing a `Connect` that does not block and the connection has failed, or if `SocketOptionName.OutOfBandInline` is not set and out-of-band data is available.Otherwise, it returns `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout` is less than -1 milliseconds or greater than `Int32.MaxValue` milliseconds.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.
