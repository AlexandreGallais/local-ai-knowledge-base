---
title: "NamedPipeClientStream class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/NamedPipeClientStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NamedPipeClientStream class

Namespace: `System.IO.Pipes`

```csharp
public sealed class NamedPipeClientStream : System.IO.Pipes.PipeStream
```

Exposes a `Stream` around a named pipe, which supports both synchronous and asynchronous read and write operations.

#### Remarks
Named pipes provide one-way or duplex pipes for communication between a pipe server and one or more pipe clients. Named pipes can be used for interprocess communication locally or over a network. A single pipe name can be shared by multiple `NamedPipeClientStream` objects.

Any process can act as either a named pipe server or client, or both.

#### Examples
The following example demonstrates a way to send a string from a parent process to a child process on the same computer using named pipes. This example creates a `NamedPipeServerStream` object in a parent process. The `NamedPipeServerStream` object has a `PipeDirection` value of `Out`. The server then waits for a `NamedPipeClientStream` object in a child process to connect to it. In this example, both processes are on the same computer and the `NamedPipeClientStream` object has a `PipeDirection` value of `In`. The parent process then sends a user-supplied string to the child process. The string is displayed to the console.

This example is for the client process, which connects to the server process. For the entire code sample, including the code for both the pipe client and server, see How to: Use Named Pipes for Network Interprocess Communication.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/NamedPipeClientStream/Overview/Program.cs._

## NamedPipeClientStream.NamedPipeClientStream(String) constructor

```csharp
public NamedPipeClientStream (string pipeName);
```

Initializes a new instance of the `NamedPipeClientStream` class with the specified pipe name.

Parameters:

- `pipeName`: The name of the pipe.

Exceptions:

- `ArgumentNullException`: `pipeName` is `null`.
- `ArgumentException`: `pipeName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

#### Remarks
This constructor uses the following default values:

- A default server name of ".".

- A default `PipeDirection` value of `InOut`.

- A default `PipeOptions` value of `None`.

- A default `TokenImpersonationLevel` value of `None`.

- A default `HandleInheritability` value of `None`.

## NamedPipeClientStream.NamedPipeClientStream(String, String) constructor

```csharp
public NamedPipeClientStream (string serverName, string pipeName);
```

Initializes a new instance of the `NamedPipeClientStream` class with the specified pipe and server names.

Parameters:

- `serverName`: The name of the remote computer to connect to, or "." to specify the local computer.
- `pipeName`: The name of the pipe.

Exceptions:

- `ArgumentNullException`: `pipeName` or `serverName` is `null`.
- `ArgumentException`: `pipeName` or `serverName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

#### Remarks
This constructor uses the following default values:

- A default `PipeDirection` value of `InOut`.

- A default `PipeOptions` value of `None`.

- A default `TokenImpersonationLevel` value of `None`.

- A default `HandleInheritability` value of `None`.

## NamedPipeClientStream.NamedPipeClientStream(PipeDirection, Boolean, SafePipeHandle) constructor

```csharp
public NamedPipeClientStream (System.IO.Pipes.PipeDirection direction, bool isAsync, Microsoft.Win32.SafeHandles.SafePipeHandle safePipeHandle);
```

To be added.

Parameters:

- `direction`: To be added.
- `isAsync`: To be added.
- `safePipeHandle`: To be added.

To be added.

## NamedPipeClientStream.NamedPipeClientStream(String, String, PipeDirection) constructor

```csharp
public NamedPipeClientStream (string serverName, string pipeName, System.IO.Pipes.PipeDirection direction);
```

Initializes a new instance of the `NamedPipeClientStream` class with the specified pipe and server names, and the specified pipe direction.

Parameters:

- `serverName`: The name of the remote computer to connect to, or "." to specify the local computer.
- `pipeName`: The name of the pipe.
- `direction`: One of the enumeration values that determines the direction of the pipe.

Exceptions:

- `ArgumentNullException`: `pipeName` or `serverName` is `null`.
- `ArgumentException`: `pipeName` or `serverName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

-or-

`direction` is not a valid `PipeDirection` value.

#### Remarks
This constructor uses the following default values:

- A default `PipeOptions` value of `None`.

- A default `TokenImpersonationLevel` value of `None`.

- A default `HandleInheritability` value of `None`.

#### Examples
The following example demonstrates a method to send a string from a parent process to a child process using named pipes. This example creates a `NamedPipeClientStream` object in a child process, which then connects to a pipe on the local computer. The server example can be seen in the `NamedPipeServerStream` class. This example is part of a larger example provided for the `NamedPipeServerStream` and `NamedPipeClientStream` classes.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/NamedPipeClientStream/Overview/Program.cs._

## NamedPipeClientStream.NamedPipeClientStream(PipeDirection, Boolean, Boolean, SafePipeHandle) constructor

```csharp
public NamedPipeClientStream (System.IO.Pipes.PipeDirection direction, bool isAsync, bool isConnected, Microsoft.Win32.SafeHandles.SafePipeHandle safePipeHandle);
```

Initializes a new instance of the `NamedPipeClientStream` class for the specified pipe handle with the specified pipe direction.

Parameters:

- `direction`: One of the enumeration values that determines the direction of the pipe.
- `isAsync`: `true` to indicate that the handle was opened asynchronously; otherwise, `false`.
- `isConnected`: `true` to indicate that the pipe is connected; otherwise, `false`.
- `safePipeHandle`: A safe handle for the pipe that this `NamedPipeClientStream` object will encapsulate.

Exceptions:

- `IOException`: The stream has been closed.
- `ArgumentException`: `safePipeHandle` is not a valid handle.
- `ArgumentNullException`: `safePipeHandle` is `null`.
- `ArgumentOutOfRangeException`: `direction` is not a valid `PipeDirection` value.

To be added.

## NamedPipeClientStream.NamedPipeClientStream(String, String, PipeDirection, PipeOptions) constructor

```csharp
public NamedPipeClientStream (string serverName, string pipeName, System.IO.Pipes.PipeDirection direction, System.IO.Pipes.PipeOptions options);
```

Initializes a new instance of the `NamedPipeClientStream` class with the specified pipe and server names, and the specified pipe direction and pipe options.

Parameters:

- `serverName`: The name of the remote computer to connect to, or "." to specify the local computer.
- `pipeName`: The name of the pipe.
- `direction`: One of the enumeration values that determines the direction of the pipe.
- `options`: One of the enumeration values that determines how to open or create the pipe.

Exceptions:

- `ArgumentNullException`: `pipeName` or `serverName` is `null`.
- `ArgumentException`: `pipeName` or `serverName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

-or-

`direction` is not a valid `PipeDirection` value.

-or-

`options` is not a valid `PipeOptions` value.

#### Remarks
This constructor uses the following default values:

- A default `TokenImpersonationLevel` value of `None`.

- A default `HandleInheritability` value of `None`.

## NamedPipeClientStream.NamedPipeClientStream(String, String, PipeDirection, PipeOptions, TokenImpersonationLevel) constructor

```csharp
public NamedPipeClientStream (string serverName, string pipeName, System.IO.Pipes.PipeDirection direction, System.IO.Pipes.PipeOptions options, System.Security.Principal.TokenImpersonationLevel impersonationLevel);
```

Initializes a new instance of the `NamedPipeClientStream` class with the specified pipe and server names, and the specified pipe direction, pipe options, and security impersonation level.

Parameters:

- `serverName`: The name of the remote computer to connect to, or "." to specify the local computer.
- `pipeName`: The name of the pipe.
- `direction`: One of the enumeration values that determines the direction of the pipe.
- `options`: One of the enumeration values that determines how to open or create the pipe.
- `impersonationLevel`: One of the enumeration values that determines the security impersonation level.

Exceptions:

- `ArgumentNullException`: `pipeName` or `serverName` is `null`.
- `ArgumentException`: `pipeName` or `serverName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

-or-

`direction` is not a valid `PipeDirection` value.

-or-

`options` is not a valid `PipeOptions` value.

-or-

`impersonationLevel` is not a valid `TokenImpersonationLevel` value.

#### Remarks
This constructor uses a default `HandleInheritability` value of `None`.

## NamedPipeClientStream.NamedPipeClientStream(String, String, PipeAccessRights, PipeOptions, TokenImpersonationLevel, HandleInheritability) constructor

```csharp
public NamedPipeClientStream (string serverName, string pipeName, System.IO.Pipes.PipeAccessRights desiredAccessRights, System.IO.Pipes.PipeOptions options, System.Security.Principal.TokenImpersonationLevel impersonationLevel, System.IO.HandleInheritability inheritability);
```

Initializes a new instance of the `NamedPipeClientStream` class with the specified pipe and server names, and the specified pipe options, security impersonation level, and inheritability mode.

Parameters:

- `serverName`: The name of the remote computer to connect to, or "." to specify the local computer.
- `pipeName`: The name of the pipe.
- `desiredAccessRights`: One of the enumeration values that specifies the desired access rights of the pipe.
- `options`: One of the enumeration values that determines how to open or create the pipe.
- `impersonationLevel`: One of the enumeration values that determines the security impersonation level.
- `inheritability`: One of the enumeration values that determines whether the underlying handle will be inheritable by child processes.

Exceptions:

- `ArgumentNullException`: `pipeName` or `serverName` is `null`.
- `ArgumentException`: `pipeName` or `serverName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

-or-

`options` is not a valid `PipeOptions` value.

-or-

`impersonationLevel` is not a valid `TokenImpersonationLevel` value.

-or-

`inheritability` is not a valid `HandleInheritability` value.

#### Remarks
The pipe direction for this constructor is determined by the `desiredAccessRights` parameter. If the `desiredAccessRights` value is `ReadData`, the pipe direction will be `In`. If the value of `desiredAccessRights` is `WriteData`, the pipe direction will be `Out`. If the value of `desiredAccessRights` includes both `ReadData` and `WriteData`, the pipe direction will be `InOut`.

## NamedPipeClientStream.NamedPipeClientStream(String, String, PipeDirection, PipeOptions, TokenImpersonationLevel, HandleInheritability) constructor

```csharp
public NamedPipeClientStream (string serverName, string pipeName, System.IO.Pipes.PipeDirection direction, System.IO.Pipes.PipeOptions options, System.Security.Principal.TokenImpersonationLevel impersonationLevel, System.IO.HandleInheritability inheritability);
```

Initializes a new instance of the `NamedPipeClientStream` class with the specified pipe and server names, and the specified pipe direction, pipe options, security impersonation level, and inheritability mode.

Parameters:

- `serverName`: The name of the remote computer to connect to, or "." to specify the local computer.
- `pipeName`: The name of the pipe.
- `direction`: One of the enumeration values that determines the direction of the pipe.
- `options`: One of the enumeration values that determines how to open or create the pipe.
- `impersonationLevel`: One of the enumeration values that determines the security impersonation level.
- `inheritability`: One of the enumeration values that determines whether the underlying handle will be inheritable by child processes.

Exceptions:

- `ArgumentNullException`: `pipeName` or `serverName` is `null`.
- `ArgumentException`: `pipeName` or `serverName` is a zero-length string.
- `ArgumentOutOfRangeException`: `pipeName` is set to "anonymous".

-or-

`direction` is not a valid `PipeDirection` value.

-or-

`options` is not a valid `PipeOptions` value.

-or-

`impersonationLevel` is not a valid `TokenImpersonationLevel` value.

-or-

`inheritability` is not a valid `HandleInheritability` value.

To be added.

## NamedPipeClientStream.NumberOfServerInstances property

```csharp
public int NumberOfServerInstances { get; }
```

Gets the number of server instances that share the same pipe name.

Returns: The number of server instances that share the same pipe name.

Exceptions:

- `InvalidOperationException`: The pipe handle has not been set.

-or-

The current `NamedPipeClientStream` object has not yet connected to a `NamedPipeServerStream` object.
- `IOException`: The pipe is broken or an I/O error occurred.
- `ObjectDisposedException`: The underlying pipe handle is closed.
- `PlatformNotSupportedException`: On Linux and macOS: In all cases.

#### Remarks
This property returns the number of server instances for the `NamedPipeServerStream` object that the current `NamedPipeClientStream` object has a handle to or is connected to. If the current `NamedPipeClientStream` object has not yet connected to a named pipe server, or if the current pipe handle has not yet been set, this property throws an `InvalidOperationException`.

#### Examples
The following example demonstrates a method to send a string from a parent process to a child process using named pipes. In this example, a `NamedPipeClientStream` object is created in a child process, which then connects to a pipe on the local computer. The server example can be seen in the `NamedPipeServerStream` class. This example is part of a larger example provided for the `NamedPipeServerStream` and `NamedPipeClientStream` classes.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/NamedPipeClientStream/Overview/Program.cs._

## NamedPipeClientStream.CheckPipePropertyOperations() method

```csharp
protected internal override void CheckPipePropertyOperations ();
```

To be added.

To be added.
