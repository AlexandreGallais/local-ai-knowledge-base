---
title: "DuplicateWaitObjectException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DuplicateWaitObjectException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DuplicateWaitObjectException class

Namespace: `System`

```csharp
public class DuplicateWaitObjectException : ArgumentException
```

The exception that is thrown when an object appears more than once in an array of synchronization objects.

#### Remarks
The common language runtime provides a thread synchronization mechanism based on synchronization objects waiting for execution in an array of `WaitHandle` objects. If the array of `WaitHandle` objects passed to `WaitHandle.WaitAll` or `WaitHandle.WaitAny` contains any duplicate operating system handles, `DuplicateWaitObjectException` is thrown. For more information, see `WaitHandle`.

`DuplicateWaitObjectException` uses the HRESULT COR_E_DUPLICATEWAITOBJECT, which has the value 0x80131529.

For a list of initial property values for an instance of `DuplicateWaitObjectException`, see the `DuplicateWaitObjectException.%23ctor` constructors.

## DuplicateWaitObjectException.DuplicateWaitObjectException() constructor

```csharp
public DuplicateWaitObjectException ();
```

Initializes a new instance of the `DuplicateWaitObjectException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Duplicate objects in argument." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `DuplicateWaitObjectException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`ArgumentException.Message`|The localized error message string.|

## DuplicateWaitObjectException.DuplicateWaitObjectException(String) constructor

```csharp
public DuplicateWaitObjectException (string? parameterName);
```

Initializes a new instance of the `DuplicateWaitObjectException` class with the name of the parameter that causes this exception.

Parameters:

- `parameterName`: The name of the parameter that caused the exception.

#### Remarks
The content of `parameterName` is intended to be understood by humans.

The following table shows the initial property values for an instance of `DuplicateWaitObjectException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`ArgumentException.Message`|The localized error message string.|
|`ArgumentException.ParamName`|The parameter name string.|

## DuplicateWaitObjectException.DuplicateWaitObjectException(SerializationInfo, StreamingContext) constructor

```csharp
protected DuplicateWaitObjectException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `DuplicateWaitObjectException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## DuplicateWaitObjectException.DuplicateWaitObjectException(String, Exception) constructor

```csharp
public DuplicateWaitObjectException (string? message, Exception? innerException);
```

Initializes a new instance of the `DuplicateWaitObjectException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed to this constructor.

The following table shows the initial property values for an instance of `DuplicateWaitObjectException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The exception specified by `innerException`.|
|`ArgumentException.Message`|The error message string specified by `message`.|

## DuplicateWaitObjectException.DuplicateWaitObjectException(String, String) constructor

```csharp
public DuplicateWaitObjectException (string? parameterName, string? message);
```

Initializes a new instance of the `DuplicateWaitObjectException` class with a specified error message and the name of the parameter that causes this exception.

Parameters:

- `parameterName`: The name of the parameter that caused the exception.
- `message`: The message that describes the error.

#### Remarks
The content of the `parameterName` and `message` parameters is intended to be understood by humans. The caller of this constructor is required to ensure that these strings have been localized for the current system culture.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `DuplicateWaitObjectException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic)|
|`ArgumentException.Message`|The error message string.|
|`ArgumentException.ParamName`|The parameter name string.|
