---
title: "TargetException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/TargetException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TargetException class

Namespace: `System.Reflection`

```csharp
public class TargetException : ApplicationException
```

Represents the exception that is thrown when an attempt is made to invoke an invalid target.

#### Remarks
A `TargetException` is thrown when an attempt is made to invoke a non-static method on a null object. This may occur because the caller does not have access to the member, or because the target does not define the member, and so on.

## TargetException.TargetException() constructor

```csharp
public TargetException ();
```

Initializes a new instance of the `TargetException` class with an empty message and the root cause of the exception.

#### Remarks
The `InnerException` property is set to `null` and the HRESULT error code is set to COR_E_TARGET.

`TargetException` inherits from the `Exception`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`|
|`Exception.Message`|The empty string ("").|

## TargetException.TargetException(String) constructor

```csharp
public TargetException (string? message);
```

Initializes a new instance of the `TargetException` class with the given message and the root cause exception.

Parameters:

- `message`: A `String` describing the reason why the exception occurred.

#### Remarks
`TargetException` inherits from the `Exception`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`|
|`Exception.Message`|The message string.|

## TargetException.TargetException(SerializationInfo, StreamingContext) constructor

```csharp
protected TargetException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `TargetException` class with the specified serialization and context information.

Parameters:

- `info`: The data for serializing or deserializing the object.
- `context`: The source of and destination for the object.

To be added.

## TargetException.TargetException(String, Exception) constructor

```csharp
public TargetException (string? message, Exception? inner);
```

Initializes a new instance of the `TargetException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TargetException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
