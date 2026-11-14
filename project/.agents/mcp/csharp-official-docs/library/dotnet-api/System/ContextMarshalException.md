---
title: "ContextMarshalException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ContextMarshalException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContextMarshalException class

Namespace: `System`

```csharp
public class ContextMarshalException : SystemException
```

The exception that is thrown when an attempt to marshal an object across a context boundary fails.

#### Remarks
Objects can marshal by value or by reference. Any attempt to pass a type that cannot be marshaled through a context boundary will result in a `ContextMarshalException`.

`ContextMarshalException` uses the HRESULT COR_E_CONTEXTMARSHAL, which has the value 0x80131504L.

`ContextMarshalException` uses the default `Object.Equals` implementation, which supports reference equality.

For a list of initial property values for an instance of `ContextMarshalException`, see the `ContextMarshalException.%23ctor` constructors.

## ContextMarshalException.ContextMarshalException() constructor

```csharp
public ContextMarshalException ();
```

Initializes a new instance of the `ContextMarshalException` class with default properties.

#### Remarks
The following table shows the initial property values for an instance of `ContextMarshalException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The empty string ("").|

## ContextMarshalException.ContextMarshalException(String) constructor

```csharp
public ContextMarshalException (string? message);
```

Initializes a new instance of the `ContextMarshalException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `ContextMarshalException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

## ContextMarshalException.ContextMarshalException(SerializationInfo, StreamingContext) constructor

```csharp
protected ContextMarshalException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ContextMarshalException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## ContextMarshalException.ContextMarshalException(String, Exception) constructor

```csharp
public ContextMarshalException (string? message, Exception? inner);
```

Initializes a new instance of the `ContextMarshalException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `ContextMarshalException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
