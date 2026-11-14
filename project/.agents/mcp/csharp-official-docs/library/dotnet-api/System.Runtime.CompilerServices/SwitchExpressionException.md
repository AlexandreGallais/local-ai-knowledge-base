---
title: "SwitchExpressionException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/SwitchExpressionException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SwitchExpressionException class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class SwitchExpressionException : InvalidOperationException
```

Indicates that a switch expression that was non-exhaustive failed to match its input at runtime. The exception optionally contains an object representing the unmatched value.

#### Remarks

A C# example of an expression that would throw this exception:

```csharp
3 switch { 4 => 5 }
```

## SwitchExpressionException.SwitchExpressionException() constructor

```csharp
public SwitchExpressionException ();
```

Initializes a new instance of the `SwitchExpressionException` class.

To be added.

## SwitchExpressionException.SwitchExpressionException(Exception) constructor

```csharp
public SwitchExpressionException (Exception? innerException);
```

Initializes a new instance of the `SwitchExpressionException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

To be added.

## SwitchExpressionException.SwitchExpressionException(Object) constructor

```csharp
public SwitchExpressionException (object? unmatchedValue);
```

Initializes a new instance of the `SwitchExpressionException` class with an unmatched switch value.

Parameters:

- `unmatchedValue`: The switch value that does not match any switch cases.

To be added.

## SwitchExpressionException.SwitchExpressionException(String) constructor

```csharp
public SwitchExpressionException (string? message);
```

Initializes a new instance of the `SwitchExpressionException` class with the specified message.

Parameters:

- `message`: The message to display to the end user.

To be added.

## SwitchExpressionException.SwitchExpressionException(String, Exception) constructor

```csharp
public SwitchExpressionException (string? message, Exception? innerException);
```

Initializes a new instance of the `SwitchExpressionException` class with the specified detailed description and the specified exception.

Parameters:

- `message`: The message to display to the end user.
- `innerException`: A reference to the inner exception that is the cause of this exception.

To be added.

## SwitchExpressionException.Message property

```csharp
public override string Message { get; }
```

Gets the exception message.

Returns: The complete message string.

To be added.

## SwitchExpressionException.UnmatchedValue property

```csharp
public object? UnmatchedValue { get; }
```

Gets the unmatched value associated with the exception.

Returns: The unmatched value causing the exception.

To be added.

## SwitchExpressionException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` with the parameter name and additional exception information.

Parameters:

- `info`: Stores the data that was being used to serialize or deserialize the object that the `CodeDomSerializer` was serializing or deserializing.
- `context`: Describes the source and destination of the stream that generated the exception, as well as a means for serialization to retain that context and an additional caller-defined context.

To be added.
