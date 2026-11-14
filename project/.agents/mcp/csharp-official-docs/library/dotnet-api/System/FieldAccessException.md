---
title: "FieldAccessException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/FieldAccessException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FieldAccessException class

Namespace: `System`

```csharp
public class FieldAccessException : MemberAccessException
```

The exception that is thrown when there is an invalid attempt to access a private or protected field inside a class.

#### Remarks
This exception is typically thrown when the access level of a field in a class library is changed, and one or more assemblies referencing the library have not been recompiled.

`FieldAccessException` uses the HRESULT COR_E_FIELDACCESS, which has the value 0x80131507.

For a list of initial property values for an instance of `FieldAccessException`, see the `FieldAccessException.%23ctor` constructors.

## FieldAccessException.FieldAccessException() constructor

```csharp
public FieldAccessException ();
```

Initializes a new instance of the `FieldAccessException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Attempted to access a field that is not accessible by the caller." This message takes the current system culture into account.

The following table shows the initial property values for an instance of `FieldAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## FieldAccessException.FieldAccessException(String) constructor

```csharp
public FieldAccessException (string? message);
```

Initializes a new instance of the `FieldAccessException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
This constructor initializes the `Message` property of the new instance by using the `message` parameter. The content of `message` is intended to be understood by humans. The caller of this constructor must ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `FieldAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## FieldAccessException.FieldAccessException(SerializationInfo, StreamingContext) constructor

```csharp
protected FieldAccessException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `FieldAccessException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## FieldAccessException.FieldAccessException(String, Exception) constructor

```csharp
public FieldAccessException (string? message, Exception? inner);
```

Initializes a new instance of the `FieldAccessException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or returns `null` if it does not supply the inner exception value to the constructor. The caller of this constructor must ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `FieldAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The localized error message string.|
