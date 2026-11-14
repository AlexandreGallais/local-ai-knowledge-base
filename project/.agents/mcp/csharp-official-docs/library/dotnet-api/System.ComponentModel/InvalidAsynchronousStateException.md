---
title: "InvalidAsynchronousStateException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/InvalidAsynchronousStateException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidAsynchronousStateException class

Namespace: `System.ComponentModel`

```csharp
public class InvalidAsynchronousStateException : ArgumentException
```

Thrown when a thread on which an operation should execute no longer exists or has no message loop.

To be added.

## InvalidAsynchronousStateException.InvalidAsynchronousStateException() constructor

```csharp
public InvalidAsynchronousStateException ();
```

Initializes a new instance of the `InvalidAsynchronousStateException` class.

To be added.

## InvalidAsynchronousStateException.InvalidAsynchronousStateException(String) constructor

```csharp
public InvalidAsynchronousStateException (string? message);
```

Initializes a new instance of the `InvalidAsynchronousStateException` class with the specified detailed description.

Parameters:

- `message`: A detailed description of the error.

To be added.

## InvalidAsynchronousStateException.InvalidAsynchronousStateException(SerializationInfo, StreamingContext) constructor

```csharp
protected InvalidAsynchronousStateException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `InvalidAsynchronousStateException` class with the given `SerializationInfo` and `StreamingContext`.

Parameters:

- `info`: The `SerializationInfo` to be used for deserialization.
- `context`: The destination to be used for deserialization.

To be added.

## InvalidAsynchronousStateException.InvalidAsynchronousStateException(String, Exception) constructor

```csharp
public InvalidAsynchronousStateException (string? message, Exception? innerException);
```

Initializes a new instance of the `InvalidAsynchronousStateException` class with the specified detailed description and the specified exception.

Parameters:

- `message`: A detailed description of the error.
- `innerException`: A reference to the inner exception that is the cause of this exception.

To be added.
