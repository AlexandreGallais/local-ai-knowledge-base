---
title: "TypeUnloadedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TypeUnloadedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeUnloadedException class

Namespace: `System`

```csharp
public class TypeUnloadedException : SystemException
```

The exception that is thrown when there is an attempt to access an unloaded class.

#### Remarks
`TypeUnloadedException` uses the HRESULT COR_E_TYPEUNLOADED, that has the value 0x80131013.

For a list of initial property values for an instance of `TypeUnloadedException`, see the `TypeUnloadedException.%23ctor` constructors.

## TypeUnloadedException.TypeUnloadedException() constructor

```csharp
public TypeUnloadedException ();
```

Initializes a new instance of the `TypeUnloadedException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Type has been unloaded." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `TypeUnloadedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## TypeUnloadedException.TypeUnloadedException(String) constructor

```csharp
public TypeUnloadedException (string? message);
```

Initializes a new instance of the `TypeUnloadedException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` parameter should be understandable to the end user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `TypeUnloadedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## TypeUnloadedException.TypeUnloadedException(SerializationInfo, StreamingContext) constructor

```csharp
protected TypeUnloadedException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `TypeUnloadedException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## TypeUnloadedException.TypeUnloadedException(String, Exception) constructor

```csharp
public TypeUnloadedException (string? message, Exception? innerException);
```

Initializes a new instance of the `TypeUnloadedException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TypeUnloadedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
