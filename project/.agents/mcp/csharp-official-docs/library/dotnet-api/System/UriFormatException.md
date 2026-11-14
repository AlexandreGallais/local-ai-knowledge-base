---
title: "UriFormatException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UriFormatException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriFormatException class

Namespace: `System`

```csharp
public class UriFormatException : FormatException
```

The exception that is thrown when an invalid Uniform Resource Identifier (URI) is detected.

#### Remarks
The `UriFormatException` is thrown by the Uri class constructor if the supplied URI could not be correctly parsed. The format for a valid URI is defined in RFC 2396.

The text of the `Message` property indicates the reason that the exception was thrown.

## UriFormatException.UriFormatException() constructor

```csharp
public UriFormatException ();
```

Initializes a new instance of the `UriFormatException` class.

#### Remarks
The parameterless constructor initializes a new instance of the `UriFormatException` class with all fields set to `null`.

## UriFormatException.UriFormatException(String) constructor

```csharp
public UriFormatException (string? textString);
```

Initializes a new instance of the `UriFormatException` class with the specified message.

Parameters:

- `textString`: The error message string.

#### Remarks
The UriFormatException constructor initializes the `UriFormatException` instance with the `Message` property set to the value of `textString`.

## UriFormatException.UriFormatException(SerializationInfo, StreamingContext) constructor

```csharp
protected UriFormatException (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `UriFormatException` class from the specified `SerializationInfo` and `StreamingContext` instances.

Parameters:

- `serializationInfo`: A `SerializationInfo` that contains the information that is required to serialize the new `UriFormatException`.
- `streamingContext`: A `StreamingContext` that contains the source of the serialized stream that is associated with the new `UriFormatException`.

To be added.

## UriFormatException.UriFormatException(String, Exception) constructor

```csharp
public UriFormatException (string? textString, Exception? e);
```

Initializes a new instance of the `UriFormatException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `textString`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `e`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `UriFormatException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|

## UriFormatException.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` instance with the data that is needed to serialize the `UriFormatException`.

Parameters:

- `serializationInfo`: A `SerializationInfo` that will hold the serialized data for the `UriFormatException`.
- `streamingContext`: A `StreamingContext` that contains the destination of the serialized stream that is associated with the new `UriFormatException`.

To be added.
