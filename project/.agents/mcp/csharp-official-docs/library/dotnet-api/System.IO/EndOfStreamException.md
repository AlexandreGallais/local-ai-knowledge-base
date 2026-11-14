---
title: "EndOfStreamException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/EndOfStreamException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EndOfStreamException class

Namespace: `System.IO`

```csharp
public class EndOfStreamException : System.IO.IOException
```

The exception that is thrown when reading is attempted past the end of a stream.

#### Remarks
`EndOfStreamException` uses the HRESULT COR_E_ENDOFSTREAM, which has the value 0x80070026.

#### Examples
The following code example shows how to read and write `Double` data to memory by using the `BinaryReader` and `BinaryWriter` classes on top of the `MemoryStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/BaseStream/rwdouble.cs._

## EndOfStreamException.EndOfStreamException() constructor

```csharp
public EndOfStreamException ();
```

Initializes a new instance of the `EndOfStreamException` class with its message string set to a system-supplied message and its HRESULT set to COR_E_ENDOFSTREAM.

To be added.

## EndOfStreamException.EndOfStreamException(String) constructor

```csharp
public EndOfStreamException (string? message);
```

Initializes a new instance of the `EndOfStreamException` class with its message string set to `message` and its HRESULT set to COR_E_ENDOFSTREAM.

Parameters:

- `message`: A string that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

To be added.

## EndOfStreamException.EndOfStreamException(SerializationInfo, StreamingContext) constructor

```csharp
protected EndOfStreamException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `EndOfStreamException` class with the specified serialization and context information.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## EndOfStreamException.EndOfStreamException(String, Exception) constructor

```csharp
public EndOfStreamException (string? message, Exception? innerException);
```

Initializes a new instance of the `EndOfStreamException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: A string that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `EndOfStreamException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
