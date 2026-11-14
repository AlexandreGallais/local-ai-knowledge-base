---
title: "InvalidDataException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/InvalidDataException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidDataException class

Namespace: `System.IO`

```csharp
public sealed class InvalidDataException : SystemException
```

The exception that is thrown when a data stream is in an invalid format.

#### Remarks
An `InvalidDataException` is thrown when invalid data is detected in the data stream.

## InvalidDataException.InvalidDataException() constructor

```csharp
public InvalidDataException ();
```

Initializes a new instance of the `InvalidDataException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "An invalid argument was specified." This message is localized based on the current system culture.

## InvalidDataException.InvalidDataException(String) constructor

```csharp
public InvalidDataException (string? message);
```

Initializes a new instance of the `InvalidDataException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "An invalid argument was specified." This message is localized based on the current system culture.

## InvalidDataException.InvalidDataException(String, Exception) constructor

```csharp
public InvalidDataException (string? message, Exception? innerException);
```

Initializes a new instance of the `InvalidDataException` class with a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the value of the `message` parameter. The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.
