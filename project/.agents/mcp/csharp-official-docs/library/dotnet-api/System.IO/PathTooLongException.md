---
title: "PathTooLongException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/PathTooLongException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PathTooLongException class

Namespace: `System.IO`

```csharp
public class PathTooLongException : System.IO.IOException
```

The exception that's thrown when a path or fully qualified file name is longer than the system-defined maximum length.

#### Remarks

.NET supports long paths in excess of 260 (or `MAX_PATH`) characters. The runtime throws a `PathTooLongException` under the following conditions:

- The operating system returns `COR_E_PATHTOOLONG` or its equivalent.
- The length of the path exceeds `MaxValue` (32,767) characters.

`PathTooLongException` uses the HRESULT `COR_E_PATHTOOLONG`, which has the value 0x800700CE.

## PathTooLongException.PathTooLongException() constructor

```csharp
public PathTooLongException ();
```

Initializes a new instance of the `PathTooLongException` class with its HRESULT set to COR_E_PATHTOOLONG.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The supplied path is too long." This message takes into account the current system culture.

## PathTooLongException.PathTooLongException(String) constructor

```csharp
public PathTooLongException (string? message);
```

Initializes a new instance of the `PathTooLongException` class with its message string set to `message` and its HRESULT set to COR_E_PATHTOOLONG.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
This constructor initializes the `Message` property of the new instance using `message`.

## PathTooLongException.PathTooLongException(SerializationInfo, StreamingContext) constructor

```csharp
protected PathTooLongException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `PathTooLongException` class with the specified serialization and context information.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## PathTooLongException.PathTooLongException(String, Exception) constructor

```csharp
public PathTooLongException (string? message, Exception? innerException);
```

Initializes a new instance of the `PathTooLongException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `PathTooLongException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

For more information on inner exceptions, see `Exception.InnerException`.
