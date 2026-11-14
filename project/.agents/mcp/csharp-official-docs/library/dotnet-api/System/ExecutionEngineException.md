---
title: "ExecutionEngineException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ExecutionEngineException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExecutionEngineException class

Namespace: `System`

```csharp
public sealed class ExecutionEngineException : SystemException
```

The exception that is thrown when there is an internal error in the execution engine of the common language runtime. This class cannot be inherited.

#### Remarks
There is no non-obsolete alternative to `ExecutionEngineException`. If further execution of your application cannot be sustained, use the `Environment.FailFast` method.

## ExecutionEngineException.ExecutionEngineException() constructor

```csharp
public ExecutionEngineException ();
```

Initializes a new instance of the `ExecutionEngineException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Internal error occurred." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `ExecutionEngineException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## ExecutionEngineException.ExecutionEngineException(String) constructor

```csharp
public ExecutionEngineException (string? message);
```

Initializes a new instance of the `ExecutionEngineException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new exception using the `message` parameter. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `ExecutionEngineException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## ExecutionEngineException.ExecutionEngineException(String, Exception) constructor

```csharp
public ExecutionEngineException (string? message, Exception? innerException);
```

Initializes a new instance of the `ExecutionEngineException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `ExecutionEngineException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
