---
title: "MarshalDirectiveException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/MarshalDirectiveException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MarshalDirectiveException class

Namespace: `System.Runtime.InteropServices`

```csharp
public class MarshalDirectiveException : SystemException
```

The exception that is thrown by the marshaler when it encounters a `MarshalAsAttribute` it does not support.

#### Remarks
`MarshalDirectiveException` uses the HRESULT COR_E_MARSHALDIRECTIVE, which has the value 0x80131535.

## MarshalDirectiveException.MarshalDirectiveException() constructor

```csharp
public MarshalDirectiveException ();
```

Initializes a new instance of the `MarshalDirectiveException` class with default properties.

#### Remarks
The following table shows the initial property values for an instance of `MarshalDirectiveException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|A localized error message string.|

## MarshalDirectiveException.MarshalDirectiveException(String) constructor

```csharp
public MarshalDirectiveException (string? message);
```

Initializes a new instance of the `MarshalDirectiveException` class with a specified error message.

Parameters:

- `message`: The error message that specifies the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `MarshalDirectiveException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|`message`|

## MarshalDirectiveException.MarshalDirectiveException(SerializationInfo, StreamingContext) constructor

```csharp
protected MarshalDirectiveException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `MarshalDirectiveException` class from serialization data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## MarshalDirectiveException.MarshalDirectiveException(String, Exception) constructor

```csharp
public MarshalDirectiveException (string? message, Exception? inner);
```

Initializes a new instance of the `MarshalDirectiveException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `MarshalDirectiveException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
