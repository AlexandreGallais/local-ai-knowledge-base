---
title: "MissingFieldException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MissingFieldException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MissingFieldException class

Namespace: `System`

```csharp
public class MissingFieldException : MissingMemberException
```

The exception that is thrown when there is an attempt to dynamically access a field that does not exist. If a field in a class library has been removed or renamed, recompile any assemblies that reference that library.

#### Remarks
Normally a compilation error is generated if code attempts to access a nonexistent member of a class. `MissingFieldException` is designed to handle cases where an attempt is made to dynamically access a renamed or deleted field of an assembly that is not referenced by its strong name. The `MissingFieldException` is thrown when code in a dependent assembly attempts to access a missing field in an assembly that was modified.

`MissingFieldException` uses the HRESULT COR_E_MISSINGFIELD, that has the value 0x80131511.

For a list of initial property values for an instance of `MissingFieldException`, see the `MissingFieldException.%23ctor` constructors.

#### Examples
This example shows what happens if you attempt to use reflection to call a method that does not exist and access a field that does not exist. The application recovers by catching the `MissingMethodException`, `MissingFieldException`, and `MissingMemberException`.

_Code sample not included: ~/snippets/csharp/System/MissingFieldException/Overview/MissingMethodException.cs._

## MissingFieldException.MissingFieldException() constructor

```csharp
public MissingFieldException ();
```

Initializes a new instance of the `MissingFieldException` class.

#### Remarks
This constructor initializes `Message` property of the new instance to a system-supplied message that describes the error, such as "Attempted to access a non-existing field." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `MissingFieldException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`MissingFieldException.Message`|The localized error message string.|

## MissingFieldException.MissingFieldException(String) constructor

```csharp
public MissingFieldException (string? message);
```

Initializes a new instance of the `MissingFieldException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error.

#### Remarks
The content of `message` should be understandable to the user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `MissingFieldException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`MissingFieldException.Message`|The error message string.|

## MissingFieldException.MissingFieldException(SerializationInfo, StreamingContext) constructor

```csharp
protected MissingFieldException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `MissingFieldException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## MissingFieldException.MissingFieldException(String, Exception) constructor

```csharp
public MissingFieldException (string? message, Exception? inner);
```

Initializes a new instance of the `MissingFieldException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `MissingFieldException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`MissingFieldException.Message`|The error message string.|

## MissingFieldException.MissingFieldException(String, String) constructor

```csharp
public MissingFieldException (string? className, string? fieldName);
```

Initializes a new instance of the `MissingFieldException` class with the specified class name and field name.

Parameters:

- `className`: The name of the class in which access to a nonexistent field was attempted.
- `fieldName`: The name of the field that cannot be accessed.

To be added.

## MissingFieldException.Message property

```csharp
public override string Message { get; }
```

Gets the text string showing the signature of the missing field, the class name, and the field name. This property is read-only.

Returns: The error message string.

#### Remarks
If the class name is not specified when the object is constructed, the default text string inherited from the base class is returned. This property overrides `MissingMemberException.Message`. The error message should be localized.

#### Examples
The following example demonstrates the `Message` property. This code example is part of a larger example provided for the `MissingFieldException` class.

_Code sample not included: ~/snippets/csharp/System/MissingFieldException/Overview/MissingMethodException.cs._
