---
title: "AnonymousPipeClientStream class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/AnonymousPipeClientStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AnonymousPipeClientStream class

Namespace: `System.IO.Pipes`

```csharp
public sealed class AnonymousPipeClientStream : System.IO.Pipes.PipeStream
```

Exposes the client side of an anonymous pipe stream, which supports both synchronous and asynchronous read and write operations (without cancellation support on Windows platforms).

#### Remarks
Anonymous pipes help provide safe and secure interprocess communication between child and parent processes. The `AnonymousPipeClientStream` class enables a child process to connect to and exchange information with a parent process.

Anonymous pipes are unnamed, one-way pipes that typically transfer data between parent and child processes. Anonymous pipes are always local; they cannot be used over a network. A `PipeDirection` value of `InOut` is not supported because anonymous pipes are defined to be one-way.

Anonymous pipes do not support the `Message` read mode.

The client side of an anonymous pipe must be created from a pipe handle provided by the server side by calling the `AnonymousPipeServerStream.GetClientHandleAsString` method. The string is then passed as a parameter when creating the client process. From the client process, it is passed to the `AnonymousPipeClientStream` constructor as the `pipeHandleAsString` parameter.

On Windows, asynchronous (overlapped) read and write operations aren't supported by anonymous pipes (see Anonymous pipe operations). The `AnonymousPipeClientStream` class will still schedule work on the thread pool on Windows platforms so asynchronous `Stream` operations work, but cancellation of those operations isn't supported.

#### Examples

The following example sends a string from a parent process to a child process by using anonymous pipes. This example creates an `AnonymousPipeServerStream` object in a parent process with a `PipeDirection` value of `Out`. It also creates an `AnonymousPipeClientStream` object in a child process with a `PipeDirection` value of `In`. The parent process then sends a user-supplied string to the child process. The string is displayed to the console.

This example is for the client process, which is started by the server process. Name the resulting executable from the client code `pipeClient.exe` and copy it to the same directory as the server executable when you run this example. For the entire code example, including the code for both the pipe client and server, see How to: Use Anonymous Pipes for Local Interprocess Communication.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeClientStream/Overview/Program.cs._

## AnonymousPipeClientStream.AnonymousPipeClientStream(String) constructor

```csharp
public AnonymousPipeClientStream (string pipeHandleAsString);
```

Initializes a new instance of the `AnonymousPipeClientStream` class with the specified string representation of the pipe handle.

Parameters:

- `pipeHandleAsString`: A string that represents the pipe handle.

Exceptions:

- `IOException`: `pipeHandleAsString` is not a valid pipe handle.

#### Remarks
For constructors without a `PipeDirection` parameter, the default direction is `In`.

#### Examples
The following example demonstrates a way to send a string from a parent process to a child process by using anonymous pipes. In this example, an `AnonymousPipeClientStream` object is created in a child process.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeClientStream/.ctor/Program.cs._

## AnonymousPipeClientStream.AnonymousPipeClientStream(PipeDirection, SafePipeHandle) constructor

```csharp
public AnonymousPipeClientStream (System.IO.Pipes.PipeDirection direction, Microsoft.Win32.SafeHandles.SafePipeHandle safePipeHandle);
```

Initializes a new instance of the `AnonymousPipeClientStream` class from the specified handle.

Parameters:

- `direction`: One of the enumeration values that determines the direction of the pipe.

Anonymous pipes can only be in one direction, so `direction` cannot be set to `PipeDirection.InOut`.
- `safePipeHandle`: A safe handle for the pipe that this `AnonymousPipeClientStream` object will encapsulate.

Exceptions:

- `ArgumentException`: `safePipeHandle` is not a valid handle.
- `ArgumentNullException`: `safePipeHandle` is `null`.
- `NotSupportedException`: `direction` is set to `PipeDirection.InOut`.
- `IOException`: An I/O error, such as a disk error, has occurred.

-or-

The stream has been closed.

#### Remarks
A `PipeDirection` value of `InOut` is not supported because anonymous pipes are defined to be one-way.

#### Examples
The following example demonstrates a way to send a string from a parent process to a child process by using anonymous pipes. In this example, an `AnonymousPipeClientStream` object is created in a child process with a `PipeDirection` value of `In`.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeClientStream/.ctor/Program.cs._

## AnonymousPipeClientStream.AnonymousPipeClientStream(PipeDirection, String) constructor

```csharp
public AnonymousPipeClientStream (System.IO.Pipes.PipeDirection direction, string pipeHandleAsString);
```

Initializes a new instance of the `AnonymousPipeClientStream` class with the specified pipe direction and a string representation of the pipe handle.

Parameters:

- `direction`: One of the enumeration values that determines the direction of the pipe.

Anonymous pipes can only be in one direction, so `direction` cannot be set to `PipeDirection.InOut`.
- `pipeHandleAsString`: A string that represents the pipe handle.

Exceptions:

- `ArgumentException`: `pipeHandleAsString` is an invalid handle.
- `ArgumentNullException`: `pipeHandleAsString` is `null`.
- `NotSupportedException`: `direction` is set to `PipeDirection.InOut`.

#### Remarks
A `PipeDirection` value of `InOut` is not supported because anonymous pipes are defined to be one-way.

#### Examples
The following example demonstrates a way to send a string from a parent process to a child process by using anonymous pipes. In this example, an `AnonymousPipeClientStream` object is created in a child process with a `PipeDirection` value of `In`.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeClientStream/Overview/Program.cs._

## AnonymousPipeClientStream.ReadMode property

```csharp
public override System.IO.Pipes.PipeTransmissionMode ReadMode { set; }
```

Sets the reading mode for the `AnonymousPipeClientStream` object.

Returns: The `PipeTransmissionMode` for the `AnonymousPipeClientStream` object.

Exceptions:

- `ArgumentOutOfRangeException`: The transmission mode is not valid. For anonymous pipes, only `PipeTransmissionMode.Byte` is supported.
- `NotSupportedException`: The transmission mode is `PipeTransmissionMode.Message`.
- `IOException`: The connection is broken or another I/O error occurs.
- `ObjectDisposedException`: The pipe is closed.

#### Remarks

Anonymous pipes do not support the `Message` read mode.

#### Examples

The following example sends a string from a parent process to a child process by using anonymous pipes. In this example, an `AnonymousPipeClientStream` object is created in a child process.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeClientStream/Overview/Program.cs._

## AnonymousPipeClientStream.TransmissionMode property

```csharp
public override System.IO.Pipes.PipeTransmissionMode TransmissionMode { get; }
```

Gets the pipe transmission mode supported by the current pipe.

Returns: The `PipeTransmissionMode` supported by the current pipe.

#### Remarks

Anonymous pipes do not support `Message` read mode. Because the default value of this property is `Byte`, there is never a reason to set this property in your code.

#### Examples

The following example sends a string from a parent process to a child process by using anonymous pipes. In this example, an `AnonymousPipeClientStream` object is created in a child process and the `AnonymousPipeClientStream.TransmissionMode` is displayed to the console.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/AnonymousPipeClientStream/Overview/Program.cs._

## AnonymousPipeClientStream.Finalize() method

```csharp
~AnonymousPipeClientStream ();
```

Releases unmanaged resources and performs other cleanup operations before the `AnonymousPipeClientStream` instance is reclaimed by garbage collection.

To be added.
