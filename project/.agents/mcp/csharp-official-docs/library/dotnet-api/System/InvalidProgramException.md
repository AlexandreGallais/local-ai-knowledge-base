---
title: "InvalidProgramException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/InvalidProgramException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidProgramException class

Namespace: `System`

```csharp
public sealed class InvalidProgramException : SystemException
```

The exception that is thrown when a program contains invalid Microsoft intermediate language (MSIL) or metadata. Generally this indicates a bug in the compiler that generated the program. This exception is also thrown when internal runtime implementation limits have been exceeded by the program.

#### Remarks
`InvalidProgramException` uses the HRESULT `COR_E_INVALIDPROGRAM`, which has the value 0x8013153A.

For a list of initial property values for an instance of `InvalidProgramException`, see the `InvalidProgramException` constructors.

## InvalidProgramException.InvalidProgramException() constructor

```csharp
public InvalidProgramException ();
```

Initializes a new instance of the `InvalidProgramException` class with default properties.

#### Remarks
The constructor initializes the `Message` property of the new exception to a system-supplied message that describes the error, such as "Metadata is incorrect." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `InvalidProgramException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## InvalidProgramException.InvalidProgramException(String) constructor

```csharp
public InvalidProgramException (string? message);
```

Initializes a new instance of the `InvalidProgramException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
This constructor initializes the `Message` property of the new exception using the `message` parameter. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `InvalidProgramException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## InvalidProgramException.InvalidProgramException(String, Exception) constructor

```csharp
public InvalidProgramException (string? message, Exception? inner);
```

Initializes a new instance of the `InvalidProgramException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `InvalidProgramException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
