---
title: "InsufficientMemoryException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/InsufficientMemoryException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InsufficientMemoryException class

Namespace: `System`

```csharp
public sealed class InsufficientMemoryException : OutOfMemoryException
```

The exception that is thrown when a check for sufficient available memory fails. This class cannot be inherited.

#### Remarks
Unlike `OutOfMemoryException`, `InsufficientMemoryException` is thrown before starting an operation, and thus does not imply state corruption. An application can catch this exception, throttle back its memory usage, and avoid actual out of memory conditions and their potential for corrupting program state.

This exception is thrown by the `MemoryFailPoint.%23ctor` constructor when you specify a projected memory allocation larger than the amount of currently available memory. Your program can catch the exception and either delay the task that needs the memory or execute it in smaller steps that require less memory.

See the `MemoryFailPoint` class for a code example.

## InsufficientMemoryException.InsufficientMemoryException() constructor

```csharp
public InsufficientMemoryException ();
```

Initializes a new instance of the `InsufficientMemoryException` class with a system-supplied message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Insufficient available memory to meet the expected demands of an operation at this time. Please try again later." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `InsufficientMemoryException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## InsufficientMemoryException.InsufficientMemoryException(String) constructor

```csharp
public InsufficientMemoryException (string? message);
```

Initializes a new instance of the `InsufficientMemoryException` class with a specified message that describes the error.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `InsufficientMemoryException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|

## InsufficientMemoryException.InsufficientMemoryException(String, Exception) constructor

```csharp
public InsufficientMemoryException (string? message, Exception? innerException);
```

Initializes a new instance of the `InsufficientMemoryException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `InsufficientMemoryException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|
