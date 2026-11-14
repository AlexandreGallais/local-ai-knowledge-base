---
title: "TimeoutException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeoutException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeoutException class

Namespace: `System`

```csharp
public class TimeoutException : SystemException
```

The exception that is thrown when the time allotted for a process or operation has expired.

#### Remarks
For information about setting the time-out interval before a `TimeoutException` exception is thrown, consult the documentation for the type whose method timed out. For information about handling the time-out, see the documentation for the method that threw the exception.

`TimeoutException` uses the HRESULT, COR_E_TIMEOUT, which has the value 0x80131505.

For a list of initial property values for an instance of  `TimeoutException`, see the `TimeoutException.%23ctor` constructors.

#### Examples
The following code example demonstrates the use of `TimeoutException` in conjunction with members of the `SerialPort` class.

_Code sample not included: ~/snippets/csharp/System/TimeoutException/Overview/to.cs._

## TimeoutException.TimeoutException() constructor

```csharp
public TimeoutException ();
```

Initializes a new instance of the `TimeoutException` class.

#### Remarks
This constructor initializes the inherited `Message` property of the new instance with a system-supplied error message. This message takes into account the current system culture.

The following table shows the initial property values for an instance of `TimeoutException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## TimeoutException.TimeoutException(String) constructor

```csharp
public TimeoutException (string? message);
```

Initializes a new instance of the `TimeoutException` class with the specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
This constructor initializes the inherited `Message` property of the new instance using the value of the `message` parameter.

The following table shows the initial property values for an instance of `TimeoutException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## TimeoutException.TimeoutException(SerializationInfo, StreamingContext) constructor

```csharp
protected TimeoutException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `TimeoutException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` object that contains serialized object data about the exception being thrown.
- `context`: The `StreamingContext` object that contains contextual information about the source or destination. The `context` parameter is reserved for future use, and can be specified as `null`.

Exceptions:

- `ArgumentNullException`: The `info` parameter is `null`.
- `SerializationException`: The class name is `null`, or `Exception.HResult` is zero (0).

To be added.

## TimeoutException.TimeoutException(String, Exception) constructor

```csharp
public TimeoutException (string? message, Exception? innerException);
```

Initializes a new instance of the `TimeoutException` class with the specified error message and inner exception.

Parameters:

- `message`: The message that describes the error.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
This constructor initializes the inherited `Message` property of the new instance using the value of the `message` parameter.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed to the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TimeoutException`.

|Property|Value|
|--------------|-----------|
|`Exception.Message`|The error message string.|
|`Exception.InnerException`|The inner exception reference.|
