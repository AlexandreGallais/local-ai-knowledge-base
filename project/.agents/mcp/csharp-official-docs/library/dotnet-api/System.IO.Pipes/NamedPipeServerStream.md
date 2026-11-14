---
title: "NamedPipeServerStream class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/NamedPipeServerStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NamedPipeServerStream class

Namespace: `System.IO.Pipes`

```csharp
public sealed class NamedPipeServerStream : System.IO.Pipes.PipeStream
```

Exposes a `Stream` around a named pipe, supporting both synchronous and asynchronous read and write operations.

#### Remarks

Named pipes provide one-way or duplex pipes for communication between a pipe server and one or more pipe clients. Named pipes can be used for interprocess communication locally or over a network. A single pipe name can be shared by multiple `NamedPipeClientStream` objects.

Any process can act as either a named pipe server or client, or both.

With regards to thread safety for reading and writing, up to a single reader and a single writer can use an instance concurrently.

#### Examples

The following example demonstrates a way to send a string from a parent process to a child process on the same computer using named pipes. This example creates a `NamedPipeServerStream` object in a parent process with a `PipeDirection` value of `Out`. The server then waits for a `NamedPipeClientStream` object in a child process to connect to it. In this example, both processes are on the same computer and the `NamedPipeClientStream` object has a `PipeDirection` value of `In`. The parent process then sends a user-supplied string to the child process. The string is displayed to the console.

This example is for the server process, which uses the `NamedPipeServerStream` class. For the entire code example, including the code for both the pipe client and server, see How to: Use Named Pipes for Network Interprocess Communication.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/NamedPipeServerStream/Overview/Program.cs._

## NamedPipeServerStream.NamedPipeServerStream(String) constructor

```csharp
public NamedPipeServerStream (string pipeName);
```

Initializes a new instance of the `NamedPipeServerStream` class with the specified pipe name.

Parameters:

- `pipeName`: The name of the pipe.

Exceptions:

- `ArgumentNullException`: `pipeName` is `null`.
- `ArgumentException`: `pipeName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".
- `NotSupportedException`: `pipeName` contains a colon (":").
- `IOException`: The maximum number of server instances has been exceeded.

#### Remarks
This constructor creates a `NamedPipeServerStream` object that has the following characteristics:

- A default pipe direction of `InOut`.

- The maximum number of server instances that share the same name set to 1.

- A `PipeTransmissionMode` value of `Byte`.

- A `PipeOptions` value of `None`.

- Default input and output buffer sizes.

- No pipe security.

- A `HandleInheritability` value of `None`.

- No specified additional `PipeAccessRights`.

## NamedPipeServerStream.NamedPipeServerStream(String, PipeDirection) constructor

```csharp
public NamedPipeServerStream (string pipeName, System.IO.Pipes.PipeDirection direction);
```

Initializes a new instance of the `NamedPipeServerStream` class with the specified pipe name and pipe direction.

Parameters:

- `pipeName`: The name of the pipe.
- `direction`: One of the enumeration values that determines the direction of the pipe.

Exceptions:

- `ArgumentNullException`: `pipeName` is `null`.
- `ArgumentException`: `pipeName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

-or-

`direction` is not a valid `PipeDirection` value.
- `NotSupportedException`: `pipeName` contains a colon (":").
- `IOException`: The maximum number of server instances has been exceeded.

#### Remarks
This constructor creates a `NamedPipeServerStream` object that has the following characteristics:

- A `PipeTransmissionMode` value of `Byte`.

- A `PipeOptions` value of `None`.

- Default input and output buffer sizes.

- No pipe security.

- A `HandleInheritability` value of `None`.

- No specified additional `PipeAccessRights`.

#### Examples
The following example demonstrates a method to send a string from a parent process to a child process using named pipes. This example creates a `NamedPipeServerStream` object in a parent process. The `NamedPipeServerStream` object has a `PipeDirection` value of `Out`, which then blocks until a `NamedPipeClientStream` object establishes a connection to the current `NamedPipeServerStream` object.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/NamedPipeServerStream/Overview/Program.cs._

## NamedPipeServerStream.NamedPipeServerStream(String, PipeDirection, Int32) constructor

```csharp
public NamedPipeServerStream (string pipeName, System.IO.Pipes.PipeDirection direction, int maxNumberOfServerInstances);
```

Initializes a new instance of the `NamedPipeServerStream` class with the specified pipe name, pipe direction, and maximum number of server instances.

Parameters:

- `pipeName`: The name of the pipe.
- `direction`: One of the enumeration values that determines the direction of the pipe.
- `maxNumberOfServerInstances`: The maximum number of server instances that share the same name. You can pass `NamedPipeServerStream.MaxAllowedServerInstances` for this value.

Exceptions:

- `ArgumentNullException`: `pipeName` is `null`.
- `ArgumentException`: `pipeName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

-or-

`direction` is not a valid `PipeDirection` value.

-or-

A non-negative number is required.

-or-

`maxNumberOfServerInstances` is less than -1 or greater than 254 (-1 indicates `NamedPipeServerStream.MaxAllowedServerInstances`)

-or-

`HandleInheritability.None` or `HandleInheritability.Inheritable` is required.

-or-

Access rights is limited to the `PipeAccessRights.ChangePermissions` , `PipeAccessRights.TakeOwnership` , and `PipeAccessRights.AccessSystemSecurity` flags.
- `NotSupportedException`: `pipeName` contains a colon (":").
- `IOException`: The maximum number of server instances has been exceeded.

#### Remarks
This constructor creates a `NamedPipeServerStream` object that has the following characteristics:

- A default value of 1 for the maximum number of server instances that share the same name.
- A default `PipeTransmissionMode` value of `Byte`.
- A `PipeOptions` value of `None`.
- Default input and output buffer sizes.
- No pipe security.
- A `HandleInheritability` value of `None`.
- No specified additional `PipeAccessRights`.

## NamedPipeServerStream.NamedPipeServerStream(PipeDirection, Boolean, Boolean, SafePipeHandle) constructor

```csharp
public NamedPipeServerStream (System.IO.Pipes.PipeDirection direction, bool isAsync, bool isConnected, Microsoft.Win32.SafeHandles.SafePipeHandle safePipeHandle);
```

Initializes a new instance of the `NamedPipeServerStream` class from the specified pipe handle.

Parameters:

- `direction`: One of the enumeration values that determines the direction of the pipe.
- `isAsync`: `true` to indicate that the handle was opened asynchronously; otherwise, `false`.
- `isConnected`: `true` to indicate that the pipe is connected; otherwise, `false`.
- `safePipeHandle`: A safe handle for the pipe that this `NamedPipeServerStream` object will encapsulate.

Exceptions:

- `ArgumentOutOfRangeException`: `direction` is not a valid `PipeDirection` value.
- `ArgumentNullException`: `safePipeHandle` is `null`.
- `ArgumentException`: `safePipeHandle` is an invalid handle.
- `IOException`: `safePipeHandle` is not a valid pipe handle.

-or-

The maximum number of server instances has been exceeded.

To be added.

## NamedPipeServerStream.NamedPipeServerStream(String, PipeDirection, Int32, PipeTransmissionMode) constructor

```csharp
public NamedPipeServerStream (string pipeName, System.IO.Pipes.PipeDirection direction, int maxNumberOfServerInstances, System.IO.Pipes.PipeTransmissionMode transmissionMode);
```

Initializes a new instance of the `NamedPipeServerStream` class with the specified pipe name, pipe direction, maximum number of server instances, and transmission mode.

Parameters:

- `pipeName`: The name of the pipe.
- `direction`: One of the enumeration values that determines the direction of the pipe.
- `maxNumberOfServerInstances`: The maximum number of server instances that share the same name. You can pass `NamedPipeServerStream.MaxAllowedServerInstances` for this value.
- `transmissionMode`: One of the enumeration values that determines the transmission mode of the pipe.

Exceptions:

- `ArgumentNullException`: `pipeName` is `null`.
- `ArgumentException`: `pipeName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

-or-

`direction` is not a valid `PipeDirection` value.

-or-

`maxNumberOfServerInstances` is less than -1 or greater than 254 (-1 indicates `NamedPipeServerStream.MaxAllowedServerInstances`)
- `NotSupportedException`: `pipeName` contains a colon (":").
- `IOException`: The maximum number of server instances has been exceeded.

#### Remarks
This constructor creates a `NamedPipeServerStream` object that has the following characteristics:

- A default `PipeOptions` value of `None`.
- Default input and output buffer sizes.
- No pipe security.
- A `HandleInheritability` value of `None`.
- No specified additional `PipeAccessRights`.

## NamedPipeServerStream.NamedPipeServerStream(String, PipeDirection, Int32, PipeTransmissionMode, PipeOptions) constructor

```csharp
public NamedPipeServerStream (string pipeName, System.IO.Pipes.PipeDirection direction, int maxNumberOfServerInstances, System.IO.Pipes.PipeTransmissionMode transmissionMode, System.IO.Pipes.PipeOptions options);
```

Initializes a new instance of the `NamedPipeServerStream` class with the specified pipe name, pipe direction, maximum number of server instances, transmission mode, and pipe options.

Parameters:

- `pipeName`: The name of the pipe.
- `direction`: One of the enumeration values that determines the direction of the pipe.
- `maxNumberOfServerInstances`: The maximum number of server instances that share the same name. You can pass `NamedPipeServerStream.MaxAllowedServerInstances` for this value.
- `transmissionMode`: One of the enumeration values that determines the transmission mode of the pipe.
- `options`: One of the enumeration values that determines how to open or create the pipe.

Exceptions:

- `ArgumentNullException`: `pipeName` is `null`.
- `ArgumentException`: `pipeName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

-or-

`direction` is not a valid `PipeDirection` value.

-or-

`maxNumberOfServerInstances` is less than -1 or greater than 254 (-1 indicates `NamedPipeServerStream.MaxAllowedServerInstances`)

-or-

`options` is not a valid `PipeOptions` value.
- `NotSupportedException`: `pipeName` contains a colon (":").
- `IOException`: The maximum number of server instances has been exceeded.

#### Remarks
This constructor creates a `NamedPipeServerStream` object that has the following characteristics:

- Default input and output buffer sizes.
- No pipe security.
- A `HandleInheritability` value of `None`.
- No specified additional `PipeAccessRights`.

## NamedPipeServerStream.NamedPipeServerStream(String, PipeDirection, Int32, PipeTransmissionMode, PipeOptions, Int32, Int32) constructor

```csharp
public NamedPipeServerStream (string pipeName, System.IO.Pipes.PipeDirection direction, int maxNumberOfServerInstances, System.IO.Pipes.PipeTransmissionMode transmissionMode, System.IO.Pipes.PipeOptions options, int inBufferSize, int outBufferSize);
```

Initializes a new instance of the `NamedPipeServerStream` class with the specified pipe name, pipe direction, maximum number of server instances, transmission mode, pipe options, and recommended in and out buffer sizes.

Parameters:

- `pipeName`: The name of the pipe.
- `direction`: One of the enumeration values that determines the direction of the pipe.
- `maxNumberOfServerInstances`: The maximum number of server instances that share the same name. You can pass `NamedPipeServerStream.MaxAllowedServerInstances` for this value.
- `transmissionMode`: One of the enumeration values that determines the transmission mode of the pipe.
- `options`: One of the enumeration values that determines how to open or create the pipe.
- `inBufferSize`: A positive value greater than 0 that indicates the input buffer size.
- `outBufferSize`: A positive value greater than 0 that indicates the output buffer size.

Exceptions:

- `ArgumentNullException`: `pipeName` is `null`.
- `ArgumentException`: `pipeName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

-or-

`direction` is not a valid `PipeDirection` value.

-or-

`maxNumberOfServerInstances` is less than -1 or greater than 254 (-1 indicates `NamedPipeServerStream.MaxAllowedServerInstances`)

-or-

`options` is not a valid `PipeOptions` value.

-or-

`inBufferSize` is negative.
- `NotSupportedException`: `pipeName` contains a colon (":").
- `IOException`: The maximum number of server instances has been exceeded.

#### Remarks
This constructor creates a `NamedPipeServerStream` object that has the following characteristics:

- No additional pipe security.
- A default `HandleInheritability` value of `None`.
- No specified additional `PipeAccessRights`.

## NamedPipeServerStream.BeginWaitForConnection(AsyncCallback, Object) method

```csharp
public IAsyncResult BeginWaitForConnection (AsyncCallback? callback, object? state);
```

Begins an asynchronous operation to wait for a client to connect.

Parameters:

- `callback`: The method to call when a client connects to the `NamedPipeServerStream` object.
- `state`: A user-provided object that distinguishes this particular asynchronous request from other requests.

Returns: An object that references the asynchronous request.

Exceptions:

- `InvalidOperationException`: The pipe was not opened asynchronously.

-or-

A pipe connection has already been established.

-or-

The pipe handle has not been set.
- `IOException`: The pipe connection has been broken.
- `ObjectDisposedException`: The pipe is closed.

#### Remarks
This is the asynchronous equivalent of `NamedPipeServerStream.WaitForConnection`.

`NamedPipeServerStream.EndWaitForConnection` must be called exactly once for every call to `NamedPipeServerStream.BeginWaitForConnection`.
