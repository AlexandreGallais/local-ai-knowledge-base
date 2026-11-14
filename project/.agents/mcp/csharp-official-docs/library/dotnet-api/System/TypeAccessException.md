---
title: "TypeAccessException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TypeAccessException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeAccessException class

Namespace: `System`

```csharp
public class TypeAccessException : TypeLoadException
```

The exception that is thrown when a method attempts to use a type that it does not have access to.

#### Remarks
`TypeAccessException` is thrown when a method attempts to cast an object to a type that is not accessible from the method. For example, `TypeAccessException` is thrown for a dynamic method that uses an internal type from another assembly. A method might not have access to its containing type, its return type, or one of its parameter types.

## TypeAccessException.TypeAccessException() constructor

```csharp
public TypeAccessException ();
```

Initializes a new instance of the `TypeAccessException` class with a system-supplied message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Attempt to access the type failed." This message takes the current system culture into account.

The following table shows the initial property values for an instance of `TypeAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## TypeAccessException.TypeAccessException(String) constructor

```csharp
public TypeAccessException (string? message);
```

Initializes a new instance of the `TypeAccessException` class with a specified message that describes the error.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor must ensure that this string has been localized for the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `TypeAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string specified in `message`.|

## TypeAccessException.TypeAccessException(SerializationInfo, StreamingContext) constructor

```csharp
protected TypeAccessException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `TypeAccessException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized data.
- `context`: The contextual information about the source or destination.

To be added.

## TypeAccessException.TypeAccessException(String, Exception) constructor

```csharp
public TypeAccessException (string? message, Exception? inner);
```

Initializes a new instance of the `TypeAccessException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor must ensure that this string has been localized for the current system culture.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TypeAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string specified in `message`.|
