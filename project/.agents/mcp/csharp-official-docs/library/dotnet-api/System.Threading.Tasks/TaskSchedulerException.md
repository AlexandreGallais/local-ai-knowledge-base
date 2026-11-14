---
title: "TaskSchedulerException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskSchedulerException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskSchedulerException class

Namespace: `System.Threading.Tasks`

```csharp
public class TaskSchedulerException : Exception
```

Represents an exception used to communicate an invalid operation by a `TaskScheduler`.

To be added.

## TaskSchedulerException.TaskSchedulerException() constructor

```csharp
public TaskSchedulerException ();
```

Initializes a new instance of the `TaskSchedulerException` class with a system-supplied message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "DefaultMessageDisplayedByParameterlessCtorWriterMustSupply" This message takes into account the current system culture.

The following table shows the initial property values for an instance of `TaskSchedulerException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## TaskSchedulerException.TaskSchedulerException(Exception) constructor

```csharp
public TaskSchedulerException (Exception? innerException);
```

Initializes a new instance of the `TaskSchedulerException` class using the default error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `innerException`: The exception that is the cause of the current exception.

To be added.

## TaskSchedulerException.TaskSchedulerException(String) constructor

```csharp
public TaskSchedulerException (string? message);
```

Initializes a new instance of the `TaskSchedulerException` class with a specified message that describes the error.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `TaskSchedulerException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|

## TaskSchedulerException.TaskSchedulerException(SerializationInfo, StreamingContext) constructor

```csharp
protected TaskSchedulerException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `TaskSchedulerException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## TaskSchedulerException.TaskSchedulerException(String, Exception) constructor

```csharp
public TaskSchedulerException (string? message, Exception? innerException);
```

Initializes a new instance of the `TaskSchedulerException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TaskSchedulerException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|
