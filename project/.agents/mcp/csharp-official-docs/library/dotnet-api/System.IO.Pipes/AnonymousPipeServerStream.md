---
title: "AnonymousPipeServerStream class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/AnonymousPipeServerStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AnonymousPipeServerStream class

Namespace: `System.IO.Pipes`

```csharp
public sealed class AnonymousPipeServerStream : System.IO.Pipes.PipeStream
```

Exposes a stream around an anonymous pipe, which supports both synchronous and asynchronous read and write operations.

#### Remarks
Anonymous pipes help provide safe and secure interprocess communication between child and parent processes. The `AnonymousPipeServerStream` class enables a parent process to send or receive information from a child process.

Anonymous pipes are unnamed, one-way pipes that typically transfer data between parent and child processes. Anonymous pipes are always local; they cannot be used over a network. A `PipeDirection` value of `InOut` is not supported because anonymous pipes are defined to be one-way.

Anonymous pipes do not support the `Message` read mode.

The client side of an anonymous pipe must be created from a pipe handle provided by the server side by calling the `AnonymousPipeServerStream.GetClientHandleAsString` method. The string is then passed as a parameter when creating the client process. From the client process, it is then passed to the `AnonymousPipeClientStream` constructor as the `pipeHandleAsString` parameter.

The `AnonymousPipeServerStream` object must dispose the client handle using the `AnonymousPipeServerStream.DisposeLocalCopyOfClientHandle` method in order to be notified when the client exits.

#### Examples

The following example sends a string from a parent process to a child process using anonymous pipes. This example creates an `AnonymousPipeServerStream` object in a parent process with a `PipeDirection` value of `Out`. It also creates an `AnonymousPipeClientStream` object in a child process with a `PipeDirection` value of `In`. The parent process then sends a user-supplied string to the child process. The string is displayed to the console.

This example is for the server process, which uses the `AnonymousPipeServerStream` class. For the entire code example, including the code for both the pipe client and server, see How to: Use Anonymous Pipes for Local Interprocess Communication.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeServerStream/Overview/Program.cs._

## AnonymousPipeServerStream.AnonymousPipeServerStream() constructor

```csharp
public AnonymousPipeServerStream ();
```

Initializes a new instance of the `AnonymousPipeServerStream` class.

#### Remarks
For `AnonymousPipeServerStream` constructors without a `PipeDirection` parameter, the default direction is `Out`. A `PipeDirection` value of `InOut` is not supported because anonymous pipes are defined to be one-way.

This constructor creates an `AnonymousPipeServerStream` object that has the default buffer size, no pipe security, and a `HandleInheritability` value of `None`.

## AnonymousPipeServerStream.AnonymousPipeServerStream(PipeDirection) constructor

```csharp
public AnonymousPipeServerStream (System.IO.Pipes.PipeDirection direction);
```

Initializes a new instance of the `AnonymousPipeServerStream` class with the specified pipe direction.

Parameters:

- `direction`: One of the enumeration values that determines the direction of the pipe.

Anonymous pipes can only be in one direction, so `direction` cannot be set to `PipeDirection.InOut`.

Exceptions:

- `NotSupportedException`: `direction` is set to `PipeDirection.InOut`.

#### Remarks
A `PipeDirection` value of `InOut` is not supported because anonymous pipes are defined to be one-way.

This constructor creates an `AnonymousPipeServerStream` object that has the default buffer size, no pipe security, and a `HandleInheritability` value of `None`.

## AnonymousPipeServerStream.AnonymousPipeServerStream(PipeDirection, HandleInheritability) constructor

```csharp
public AnonymousPipeServerStream (System.IO.Pipes.PipeDirection direction, System.IO.HandleInheritability inheritability);
```

Initializes a new instance of the `AnonymousPipeServerStream` class with the specified pipe direction and inheritability mode.

Parameters:

- `direction`: One of the enumeration values that determines the direction of the pipe.

Anonymous pipes can only be in one direction, so `direction` cannot be set to `PipeDirection.InOut`.
- `inheritability`: One of the enumeration values that determines whether the underlying handle can be inherited by child processes. Must be set to either `HandleInheritability.None` or `HandleInheritability.Inheritable`.

Exceptions:

- `ArgumentOutOfRangeException`: `inheritability` is not set to either `HandleInheritability.None` or `HandleInheritability.Inheritable`.
- `NotSupportedException`: `direction` is set to `PipeDirection.InOut`.

#### Remarks
A `PipeDirection` value of `InOut` is not supported because anonymous pipes are defined to be one-way.

This constructor creates an `AnonymousPipeServerStream` object that has the default buffer size and no pipe security.

#### Examples
The following example demonstrates a method to send a string from a parent process to a child process using anonymous pipes. In this example, an `AnonymousPipeServerStream` object is created in a parent process with a `PipeDirection` value of `Out`.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeServerStream/Overview/Program.cs._

## AnonymousPipeServerStream.AnonymousPipeServerStream(PipeDirection, SafePipeHandle, SafePipeHandle) constructor

```csharp
public AnonymousPipeServerStream (System.IO.Pipes.PipeDirection direction, Microsoft.Win32.SafeHandles.SafePipeHandle serverSafePipeHandle, Microsoft.Win32.SafeHandles.SafePipeHandle clientSafePipeHandle);
```

Initializes a new instance of the `AnonymousPipeServerStream` class from the specified pipe handles.

Parameters:

- `direction`: One of the enumeration values that determines the direction of the pipe.

Anonymous pipes can only be in one direction, so `direction` cannot be set to `PipeDirection.InOut`.
- `serverSafePipeHandle`: A safe handle for the pipe that this `AnonymousPipeServerStream` object will encapsulate.
- `clientSafePipeHandle`: A safe handle for the `AnonymousPipeClientStream` object.

Exceptions:

- `ArgumentException`: `serverSafePipeHandle` or `clientSafePipeHandle` is an invalid handle.
- `ArgumentNullException`: `serverSafePipeHandle` or `clientSafePipeHandle` is `null`.
- `NotSupportedException`: `direction` is set to `PipeDirection.InOut`.
- `IOException`: An I/O error, such as a disk error, has occurred.

-or-

The stream has been closed.

#### Remarks
A `PipeDirection` value of `InOut` is not supported because anonymous pipes are defined to be one-way.

## AnonymousPipeServerStream.AnonymousPipeServerStream(PipeDirection, HandleInheritability, Int32) constructor

```csharp
public AnonymousPipeServerStream (System.IO.Pipes.PipeDirection direction, System.IO.HandleInheritability inheritability, int bufferSize);
```

Initializes a new instance of the `AnonymousPipeServerStream` class with the specified pipe direction, inheritability mode, and buffer size.

Parameters:

- `direction`: One of the enumeration values that determines the direction of the pipe.

Anonymous pipes can only be in one direction, so `direction` cannot be set to `PipeDirection.InOut`.
- `inheritability`: One of the enumeration values that determines whether the underlying handle can be inherited by child processes. Must be set to either `HandleInheritability.None` or `HandleInheritability.Inheritable`.
- `bufferSize`: The size of the buffer. This value must be greater than or equal to 0.

Exceptions:

- `ArgumentOutOfRangeException`: `inheritability` is not set to either `HandleInheritability.None` or `HandleInheritability.Inheritable`.

-or-

`bufferSize` is less than 0.
- `NotSupportedException`: `direction` is set to `PipeDirection.InOut`.

#### Remarks
A `PipeDirection` value of `InOut` is not supported because anonymous pipes are defined to be one-way.

This constructor creates an `AnonymousPipeServerStream` object without pipe security.

## AnonymousPipeServerStream.ClientSafePipeHandle property

```csharp
public Microsoft.Win32.SafeHandles.SafePipeHandle ClientSafePipeHandle { get; }
```

Gets the safe handle for the `AnonymousPipeClientStream` object that is currently connected to the `AnonymousPipeServerStream` object.

Returns: A handle for the `AnonymousPipeClientStream` object that is currently connected to the `AnonymousPipeServerStream` object.

#### Remarks
The `AnonymousPipeServerStream.DisposeLocalCopyOfClientHandle` method should be called after a client handle has been passed to a client process. If this method is not called, the `AnonymousPipeServerStream` object will not receive notice when the client disposes of its `PipeStream` object.

## AnonymousPipeServerStream.ReadMode property

```csharp
public override System.IO.Pipes.PipeTransmissionMode ReadMode { set; }
```

Sets the reading mode for the `AnonymousPipeServerStream` object. For anonymous pipes, transmission mode must be `PipeTransmissionMode.Byte`.

Returns: The reading mode for the `AnonymousPipeServerStream` object.

Exceptions:

- `ArgumentOutOfRangeException`: The transmission mode is not valid. For anonymous pipes, only `PipeTransmissionMode.Byte` is supported.
- `NotSupportedException`: The property is set to `PipeTransmissionMode.Message`, which is not supported for anonymous pipes.
- `IOException`: The connection is broken or another I/O error occurs.
- `ObjectDisposedException`: The pipe is closed.

#### Remarks

Anonymous pipes do not support the `Message` read mode. Because the default value of this property is `Byte`, there is never a reason to set this property in your code.

## AnonymousPipeServerStream.TransmissionMode property

```csharp
public override System.IO.Pipes.PipeTransmissionMode TransmissionMode { get; }
```

Gets the pipe transmission mode that is supported by the current pipe.

Returns: The `PipeTransmissionMode` that is supported by the current pipe.

#### Remarks

Anonymous pipes do not support the `Message` read mode.

#### Examples
The following example demonstrates a way to send a string from a parent process to a child process by using anonymous pipes. In this example, an `AnonymousPipeServerStream` object is created in a parent process and the `TransmissionMode` property is displayed to the console.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeServerStream/Overview/Program.cs._

## AnonymousPipeServerStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## AnonymousPipeServerStream.DisposeLocalCopyOfClientHandle() method

```csharp
public void DisposeLocalCopyOfClientHandle ();
```

Closes the local copy of the `AnonymousPipeClientStream` object's handle.

#### Remarks
The `AnonymousPipeServerStream.DisposeLocalCopyOfClientHandle` method should be called after the client handle has been passed to the client. If this method is not called, the `AnonymousPipeServerStream` object will not receive notice when the client disposes of its `PipeStream` object.

#### Examples
The following example demonstrates a way to send a string from a parent process to a child process by using anonymous pipes. In this example, an `AnonymousPipeServerStream` object is created in a parent process with a `PipeDirection` value of `Out`.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeServerStream/Overview/Program.cs._

## AnonymousPipeServerStream.Finalize() method

```csharp
~AnonymousPipeServerStream ();
```

Releases unmanaged resources and performs other cleanup operations before the `AnonymousPipeServerStream` instance is reclaimed by garbage collection.

To be added.

## AnonymousPipeServerStream.GetClientHandleAsString() method

```csharp
public string GetClientHandleAsString ();
```

Gets the connected `AnonymousPipeClientStream` object's handle as a string.

Returns: A string that represents the connected `AnonymousPipeClientStream` object's handle.

#### Remarks
The `AnonymousPipeServerStream.DisposeLocalCopyOfClientHandle` method should be called after a client handle has been passed to a client process. If this method is not called, the `AnonymousPipeServerStream` object will not receive notice when the client disposes of its `PipeStream` object.

#### Examples
The following example demonstrates a way to send a string from a parent process to a child process by using anonymous pipes. In this example, an `AnonymousPipeServerStream` object is created in a parent process with a `PipeDirection` value of `Out`.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeServerStream/Overview/Program.cs._
