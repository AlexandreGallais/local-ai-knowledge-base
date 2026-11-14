---
title: "ApplicationException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ApplicationException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ApplicationException class

Namespace: `System`

```csharp
public class ApplicationException : Exception
```

Serves as the base class for application-defined exceptions.

#### Remarks

> **Important:**
>  You should derive custom exceptions from the `Exception` class rather than the `ApplicationException` class.  You should not throw an `ApplicationException` exception in your code, and you should not catch an `ApplicationException` exception unless you intend to re-throw the original exception.

## ApplicationException.ApplicationException() constructor

```csharp
public ApplicationException ();
```

Initializes a new instance of the `ApplicationException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "An application error has occurred." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `ApplicationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## ApplicationException.ApplicationException(String) constructor

```csharp
public ApplicationException (string? message);
```

Initializes a new instance of the `ApplicationException` class with a specified error message.

Parameters:

- `message`: A message that describes the error.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

This message takes into account the current system culture.

The following table shows the initial property values for an instance of `ApplicationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Message`|The error message string.|

## ApplicationException.ApplicationException(SerializationInfo, StreamingContext) constructor

```csharp
protected ApplicationException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ApplicationException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## ApplicationException.ApplicationException(String, Exception) constructor

```csharp
public ApplicationException (string? message, Exception? innerException);
```

Initializes a new instance of the `ApplicationException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `ApplicationException`.

| Property                                | Value                          |
|-----------------------------------------|--------------------------------|
| `Exception.InnerException` | The inner exception reference. |
| `Exception.Message`        | The error message string.      |
