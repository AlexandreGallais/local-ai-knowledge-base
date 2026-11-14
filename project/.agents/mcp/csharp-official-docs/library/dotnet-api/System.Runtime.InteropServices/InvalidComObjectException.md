---
title: "InvalidComObjectException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/InvalidComObjectException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidComObjectException class

Namespace: `System.Runtime.InteropServices`

```csharp
public class InvalidComObjectException : SystemException
```

The exception thrown when an invalid COM object is used.

#### Remarks
An `InvalidComObjectException` is thrown when an invalid COM object is used. This happens when the `__ComObject` type is used directly, without having a backing class factory. For more information, see `Type.IsCOMObject`.

`InvalidComObjectException` uses the HRESULT COR_E_INVALIDCOMOBJECT, which has the value 0x80131527.

## InvalidComObjectException.InvalidComObjectException() constructor

```csharp
public InvalidComObjectException ();
```

Initializes an instance of the `InvalidComObjectException` with default properties.

#### Remarks
`InvalidComObjectException` inherits from `SystemException`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property Type|Value|
|-------------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|A localized error message string.|

## InvalidComObjectException.InvalidComObjectException(String) constructor

```csharp
public InvalidComObjectException (string? message);
```

Initializes an instance of the `InvalidComObjectException` with a message.

Parameters:

- `message`: The message that indicates the reason for the exception.

#### Remarks
`InvalidComObjectException` inherits from `SystemException`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property Type|Value|
|-------------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|`message`|

## InvalidComObjectException.InvalidComObjectException(SerializationInfo, StreamingContext) constructor

```csharp
protected InvalidComObjectException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `COMException` class from serialization data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## InvalidComObjectException.InvalidComObjectException(String, Exception) constructor

```csharp
public InvalidComObjectException (string? message, Exception? inner);
```

Initializes a new instance of the `InvalidComObjectException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `InvalidComObjectException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
