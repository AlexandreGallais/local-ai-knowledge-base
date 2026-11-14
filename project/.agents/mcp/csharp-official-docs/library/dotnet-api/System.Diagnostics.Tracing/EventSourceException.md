---
title: "EventSourceException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventSourceException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSourceException class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class EventSourceException : Exception
```

The exception that is thrown when an error occurs during event tracing for Windows (ETW).

To be added.

## EventSourceException.EventSourceException() constructor

```csharp
public EventSourceException ();
```

Initializes a new instance of the `EventSourceException` class.

To be added.

## EventSourceException.EventSourceException(String) constructor

```csharp
public EventSourceException (string? message);
```

Initializes a new instance of the `EventSourceException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

To be added.

## EventSourceException.EventSourceException(SerializationInfo, StreamingContext) constructor

```csharp
protected EventSourceException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `EventSourceException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## EventSourceException.EventSourceException(String, Exception) constructor

```csharp
public EventSourceException (string? message, Exception? innerException);
```

Initializes a new instance of the `EventSourceException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception, or `null` if no inner exception is specified.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.
