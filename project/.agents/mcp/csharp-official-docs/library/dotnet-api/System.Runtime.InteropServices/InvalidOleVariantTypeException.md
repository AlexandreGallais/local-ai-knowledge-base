---
title: "InvalidOleVariantTypeException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/InvalidOleVariantTypeException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidOleVariantTypeException class

Namespace: `System.Runtime.InteropServices`

```csharp
public class InvalidOleVariantTypeException : SystemException
```

The exception thrown by the marshaler when it encounters an argument of a variant type that can not be marshaled to managed code.

#### Remarks
`InvalidOLEVariantTypeException` uses the HRESULT COR_E_INVALIDOLEVARIANTTYPE, which has the value 0x80131531.

## InvalidOleVariantTypeException.InvalidOleVariantTypeException() constructor

```csharp
public InvalidOleVariantTypeException ();
```

Initializes a new instance of the `InvalidOleVariantTypeException` class with default values.

#### Remarks
`InvalidOleVariantTypeException` inherits from `SystemException`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|A localized error message string.|

## InvalidOleVariantTypeException.InvalidOleVariantTypeException(String) constructor

```csharp
public InvalidOleVariantTypeException (string? message);
```

Initializes a new instance of the `InvalidOleVariantTypeException` class with a specified message.

Parameters:

- `message`: The message that indicates the reason for the exception.

#### Remarks
`InvalidOleVariantTypeException` inherits from `SystemException`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|`message`|

## InvalidOleVariantTypeException.InvalidOleVariantTypeException(SerializationInfo, StreamingContext) constructor

```csharp
protected InvalidOleVariantTypeException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `InvalidOleVariantTypeException` class from serialization data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## InvalidOleVariantTypeException.InvalidOleVariantTypeException(String, Exception) constructor

```csharp
public InvalidOleVariantTypeException (string? message, Exception? inner);
```

Initializes a new instance of the `InvalidOleVariantTypeException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `InvalidOleVariantTypeException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
