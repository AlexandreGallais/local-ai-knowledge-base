---
title: "JsonException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonException class

Namespace: `System.Text.Json`

```csharp
public class JsonException : Exception
```

Defines a custom exception object that is thrown when invalid JSON text is encountered, the defined maximum depth is passed, or the JSON text is not compatible with the type of a property on an object.

#### Remarks

For more information, see How to write custom converters for JSON serialization.

## JsonException.JsonException() constructor

```csharp
public JsonException ();
```

Initializes a new instance of the `JsonException` class.

To be added.

## JsonException.JsonException(String) constructor

```csharp
public JsonException (string? message);
```

Initializes a new instance of the `JsonException` class with a specified error message.

Parameters:

- `message`: The context-specific error message.

To be added.

## JsonException.JsonException(SerializationInfo, StreamingContext) constructor

```csharp
protected JsonException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Creates a new exception object with serialized data.

Parameters:

- `info`: The serialized object data about the exception being thrown.
- `context`: An object that contains contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## JsonException.JsonException(String, Exception) constructor

```csharp
public JsonException (string? message, Exception? innerException);
```

Initializes a new instance of the `JsonException` class, with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The context-specific error message.
- `innerException`: The exception that caused the current exception.

To be added.

## JsonException.JsonException(String, String, Int64>, Int64>) constructor

```csharp
public JsonException (string? message, string? path, long? lineNumber, long? bytePositionInLine);
```

Creates a new exception object to relay error information to the user.

Parameters:

- `message`: The context-specific error message.
- `path`: The path where the invalid JSON was encountered.
- `lineNumber`: The line number (starting at 0) at which the invalid JSON was encountered when deserializing.
- `bytePositionInLine`: The byte count within the current line (starting at 0) where the invalid JSON was encountered.

#### Remarks

Note that `bytePositionInLine` counts the number of bytes (that is,  UTF-8 code units), and not characters or scalars.

## JsonException.JsonException(String, String, Int64>, Int64>, Exception) constructor

```csharp
public JsonException (string? message, string? path, long? lineNumber, long? bytePositionInLine, Exception? innerException);
```

Creates a new exception object to relay error information to the user that includes a specified inner exception.

Parameters:

- `message`: The context-specific error message.
- `path`: The path where the invalid JSON was encountered.
- `lineNumber`: The line number (starting at 0) at which the invalid JSON was encountered when deserializing.
- `bytePositionInLine`: The byte count (starting at 0) within the current line where the invalid JSON was encountered.
- `innerException`: The exception that caused the current exception.

#### Remarks

Note that the `bytePositionInLine` counts the number of bytes (that is, UTF-8 code units), and not characters or scalars.

## JsonException.BytePositionInLine property

```csharp
public long? BytePositionInLine { get; }
```

Gets the zero-based number of bytes read within the current line before the exception.

Returns: The zero-based number of bytes read within the current line before the exception.

To be added.

## JsonException.LineNumber property

```csharp
public long? LineNumber { get; }
```

Gets the zero-based number of lines read before the exception.

Returns: The zero-based number of lines read before the exception.

To be added.

## JsonException.Message property

```csharp
public override string Message { get; }
```

Gets a message that describes the current exception.

Returns: The error message that describes the current exception.

To be added.

## JsonException.Path property

```csharp
public string? Path { get; }
```

Gets The path within the JSON where the exception was encountered.

Returns: The path within the JSON where the exception was encountered.

To be added.

## JsonException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` with information about the exception.

Parameters:

- `info`: The serialized object data about the exception being thrown.
- `context`: An object that contains contextual information about the source or destination.

To be added.
