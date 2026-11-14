---
title: "UnauthorizedAccessException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UnauthorizedAccessException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnauthorizedAccessException class

Namespace: `System`

```csharp
public class UnauthorizedAccessException : SystemException
```

The exception that is thrown when the operating system denies access because of an I/O error or a specific type of security error.

#### Remarks
An `UnauthorizedAccessException` exception is typically thrown by a method that wraps a Windows API call. To find the reasons for the exception, examine the text of the exception object's `Message` property.

`UnauthorizedAccessException` uses the `HRESULT` `COR_E_UNAUTHORIZEDACCESS`, which has the value 0x80070005.

#### Examples
The following example illustrates the `UnauthorizedAccessException` exception that is thrown when attempting to write to a read-only file.

_Code sample not included: ~/snippets/csharp/System/UnauthorizedAccessException/Overview/withio.cs._

## UnauthorizedAccessException.UnauthorizedAccessException() constructor

```csharp
public UnauthorizedAccessException ();
```

Initializes a new instance of the `UnauthorizedAccessException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Attempted to perform an unauthorized operation." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `MemberAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## UnauthorizedAccessException.UnauthorizedAccessException(String) constructor

```csharp
public UnauthorizedAccessException (string? message);
```

Initializes a new instance of the `UnauthorizedAccessException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` parameter should be understandable to the user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `UnauthorizedAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## UnauthorizedAccessException.UnauthorizedAccessException(SerializationInfo, StreamingContext) constructor

```csharp
protected UnauthorizedAccessException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `UnauthorizedAccessException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## UnauthorizedAccessException.UnauthorizedAccessException(String, Exception) constructor

```csharp
public UnauthorizedAccessException (string? message, Exception? inner);
```

Initializes a new instance of the `UnauthorizedAccessException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `UnauthorizedAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
