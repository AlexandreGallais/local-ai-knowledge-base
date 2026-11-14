---
title: "WebSocketException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocketException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocketException class

Namespace: `System.Net.WebSockets`

```csharp
public sealed class WebSocketException : System.ComponentModel.Win32Exception
```

Represents an exception that occurred when performing an operation on a WebSocket connection.

To be added.

## WebSocketException.WebSocketException() constructor

```csharp
public WebSocketException ();
```

Creates an instance of the `WebSocketException` class.

To be added.

## WebSocketException.WebSocketException(Int32) constructor

```csharp
public WebSocketException (int nativeError);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `nativeError`: The native error code for the exception.

To be added.

## WebSocketException.WebSocketException(WebSocketError) constructor

```csharp
public WebSocketException (System.Net.WebSockets.WebSocketError error);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `error`: The error from the WebSocketError enumeration.

To be added.

## WebSocketException.WebSocketException(String) constructor

```csharp
public WebSocketException (string? message);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `message`: The description of the error.

To be added.

## WebSocketException.WebSocketException(Int32, Exception) constructor

```csharp
public WebSocketException (int nativeError, Exception? innerException);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `nativeError`: The native error code for the exception.
- `innerException`: Indicates the previous exception that led to the current exception.

To be added.

## WebSocketException.WebSocketException(Int32, String) constructor

```csharp
public WebSocketException (int nativeError, string? message);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `nativeError`: The native error code for the exception.
- `message`: The description of the error.

To be added.

## WebSocketException.WebSocketException(WebSocketError, Exception) constructor

```csharp
public WebSocketException (System.Net.WebSockets.WebSocketError error, Exception? innerException);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `error`: The error from the WebSocketError enumeration.
- `innerException`: Indicates the previous exception that led to the current exception.

To be added.

## WebSocketException.WebSocketException(WebSocketError, Int32) constructor

```csharp
public WebSocketException (System.Net.WebSockets.WebSocketError error, int nativeError);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `error`: The error from the WebSocketError enumeration.
- `nativeError`: The native error code for the exception.

To be added.

## WebSocketException.WebSocketException(WebSocketError, String) constructor

```csharp
public WebSocketException (System.Net.WebSockets.WebSocketError error, string? message);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `error`: The error from the WebSocketError enumeration.
- `message`: The description of the error.

To be added.

## WebSocketException.WebSocketException(String, Exception) constructor

```csharp
public WebSocketException (string? message, Exception? innerException);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `message`: The description of the error.
- `innerException`: Indicates the previous exception that led to the current exception.

To be added.

## WebSocketException.WebSocketException(WebSocketError, Int32, Exception) constructor

```csharp
public WebSocketException (System.Net.WebSockets.WebSocketError error, int nativeError, Exception? innerException);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `error`: The error from the WebSocketError enumeration.
- `nativeError`: The native error code for the exception.
- `innerException`: Indicates the previous exception that led to the current exception.

To be added.

## WebSocketException.WebSocketException(WebSocketError, Int32, String) constructor

```csharp
public WebSocketException (System.Net.WebSockets.WebSocketError error, int nativeError, string? message);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `error`: The error from the WebSocketError enumeration.
- `nativeError`: The native error code for the exception.
- `message`: The description of the error.

To be added.

## WebSocketException.WebSocketException(WebSocketError, String, Exception) constructor

```csharp
public WebSocketException (System.Net.WebSockets.WebSocketError error, string? message, Exception? innerException);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `error`: The error from the WebSocketError enumeration.
- `message`: The description of the error.
- `innerException`: Indicates the previous exception that led to the current exception.

To be added.

## WebSocketException.WebSocketException(WebSocketError, Int32, String, Exception) constructor

```csharp
public WebSocketException (System.Net.WebSockets.WebSocketError error, int nativeError, string? message, Exception? innerException);
```

Creates an instance of the `WebSocketException` class.

Parameters:

- `error`: The error from the WebSocketError enumeration.
- `nativeError`: The native error code for the exception.
- `message`: The description of the error.
- `innerException`: Indicates the previous exception that led to the current exception.

To be added.

## WebSocketException.ErrorCode property

```csharp
public override int ErrorCode { get; }
```

Gets the native error code for the exception that occurred.

Returns: The native error code for the exception that occurred.

To be added.

## WebSocketException.WebSocketErrorCode property

```csharp
public System.Net.WebSockets.WebSocketError WebSocketErrorCode { get; }
```

Returns a WebSocketError indicating the type of error that occurred.

Returns: Returns `WebSocketError`.

To be added.

## WebSocketException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the SerializationInfo object with the file name and line number where the exception occurred.

Parameters:

- `info`: A SerializationInfo object.
- `context`: The contextual information about the source or destination.

To be added.
