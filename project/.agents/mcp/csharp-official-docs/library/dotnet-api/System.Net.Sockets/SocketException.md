---
title: "SocketException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketException class

Namespace: `System.Net.Sockets`

```csharp
public class SocketException : System.ComponentModel.Win32Exception
```

The exception that is thrown when a socket error occurs.

#### Remarks
A `SocketException` is thrown by the `Socket` and `Dns` classes when an error occurs with the network.

The parameterless constructor for the `SocketException.%23ctor` class sets the `ErrorCode` property to the last operating system socket error that occurred. For more information about socket error codes, see the Windows Sockets version 2 API error code documentation.

## SocketException.SocketException() constructor

```csharp
public SocketException ();
```

Initializes a new instance of the `SocketException` class with the last operating system error code.

#### Remarks
The `SocketException.%23ctor` constructor sets the `ErrorCode` property to the last operating system socket error that occurred. For more information about socket error codes, see the Windows Sockets version 2 API error code documentation.

## SocketException.SocketException(Int32) constructor

```csharp
public SocketException (int errorCode);
```

Initializes a new instance of the `SocketException` class with the specified error code.

Parameters:

- `errorCode`: The error code that indicates the error that occurred.

#### Remarks
The `SocketException.%23ctor` constructor sets the `ErrorCode` property to `errorCode`.

## SocketException.SocketException(Int32, String) constructor

```csharp
public SocketException (int errorCode, string? message);
```

Initializes a new instance of the `SocketException` class with the specified error code and message.

Parameters:

- `errorCode`: The error code that indicates the error that occurred.
- `message`: The message that describes the error.

To be added.

## SocketException.SocketException(SerializationInfo, StreamingContext) constructor

```csharp
protected SocketException (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `SocketException` class from the specified instances of the `SerializationInfo` and `StreamingContext` classes.

Parameters:

- `serializationInfo`: A `SerializationInfo` instance that contains the information that is required to serialize the new `SocketException` instance.
- `streamingContext`: A `StreamingContext` that contains the source of the serialized stream that is associated with the new `SocketException` instance.

To be added.

## SocketException.ErrorCode property

```csharp
public override int ErrorCode { get; }
```

Gets the error code that is associated with this exception.

Returns: An integer error code that is associated with this exception.

#### Remarks
The `ErrorCode` property contains the error code that is associated with the error that caused the exception.

The parameterless constructor for `SocketException` sets the `ErrorCode` property to the last operating system error that occurred. For more information about socket error codes, see the Windows Sockets version 2 API error code documentation.

## SocketException.Message property

```csharp
public override string Message { get; }
```

Gets the error message that is associated with this exception.

Returns: A string that contains the error message.

To be added.

## SocketException.SocketErrorCode property

```csharp
public System.Net.Sockets.SocketError SocketErrorCode { get; }
```

Gets the error code that is associated with this exception.

Returns: An integer error code that is associated with this exception.

#### Remarks
The `SocketErrorCode` property contains the error code that is associated with the error that caused the exception.

The parameterless constructor for `SocketException` sets the `ErrorCode` property to the last operating system error that occurred. For more information about socket error codes, see the Windows Sockets version 2 API error code documentation.
