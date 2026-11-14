---
title: "PipeException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/PipeException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeException class

Namespace: `System.IO`

```csharp
public class PipeException : System.IO.IOException
```

Thrown when an error occurs within a named pipe.

To be added.

## PipeException.PipeException() constructor

```csharp
public PipeException ();
```

Initializes a new instance of the `PipeException` class.

To be added.

## PipeException.PipeException(String) constructor

```csharp
public PipeException (string message);
```

Initializes a new instance of the `PipeException` class with a specified error message.

Parameters:

- `message`: A string that contains the error message that explains the reason for the exception.

To be added.

## PipeException.PipeException(SerializationInfo, StreamingContext) constructor

```csharp
protected PipeException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `PipeException` class with the specified serialization information and streaming context.

Parameters:

- `info`: The `SerializationInfo` that contains all the data required to serialize the exception.
- `context`: The `StreamingContext` that specifies the source and destination of the stream.

To be added.

## PipeException.PipeException(String, Exception) constructor

```csharp
public PipeException (string message, Exception inner);
```

Initializes a new instance of the `PipeException` class with the specified error message and the inner exception.

Parameters:

- `message`: A string that contains the error message that explains the reason for the exception.
- `inner`: The `Exception` that caused the current exception to be thrown.

To be added.

## PipeException.PipeException(String, Int32) constructor

```csharp
public PipeException (string message, int errorCode);
```

Initializes a new instance of the `PipeException` class with a specified error message and error code.

Parameters:

- `message`: A string that contains the error message that explains the reason for the exception.
- `errorCode`: An integer that contains the error code.

To be added.

## PipeException.ErrorCode property

```csharp
public virtual int ErrorCode { get; }
```

Gets the error code to be returned with the exception.

Returns: An integer with the error code to be returned with the exception.

To be added.
