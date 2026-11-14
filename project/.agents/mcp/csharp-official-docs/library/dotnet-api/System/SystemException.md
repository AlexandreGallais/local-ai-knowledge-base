---
title: "SystemException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/SystemException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SystemException class

Namespace: `System`

```csharp
public class SystemException : Exception
```

Serves as the base class for system exceptions namespace.

#### Remarks
This class is provided as a means to differentiate between system exceptions and application exceptions. It is the base class of such exceptions as `ArgumentException`, `FormatException`, and `InvalidOperationException`.

> **Important:**
>  Because `SystemException` serves as the base class of a variety of exception types, your code should not throw a `SystemException` exception, nor should it attempt to handle a `SystemException` exception unless you intend to re-throw the original exception.

`SystemException` uses the HRESULT COR_E_SYSTEM, that has the value 0x80131501.

## SystemException.SystemException() constructor

```csharp
public SystemException ();
```

Initializes a new instance of the `SystemException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "A system error has occurred." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `SystemException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## SystemException.SystemException(String) constructor

```csharp
public SystemException (string? message);
```

Initializes a new instance of the `SystemException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` parameter should be understandable to the user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `SystemException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## SystemException.SystemException(SerializationInfo, StreamingContext) constructor

```csharp
protected SystemException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `SystemException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## SystemException.SystemException(String, Exception) constructor

```csharp
public SystemException (string? message, Exception? innerException);
```

Initializes a new instance of the `SystemException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `SystemException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
