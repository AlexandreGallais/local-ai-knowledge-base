---
title: "TaskCanceledException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskCanceledException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskCanceledException class

Namespace: `System.Threading.Tasks`

```csharp
public class TaskCanceledException : OperationCanceledException
```

Represents an exception used to communicate task cancellation.

To be added.

## TaskCanceledException.TaskCanceledException() constructor

```csharp
public TaskCanceledException ();
```

Initializes a new instance of the `TaskCanceledException` class with a system-supplied message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error. This message takes into account the current system culture.

The following table shows the initial property values for an instance of `OperationCanceledException`:

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## TaskCanceledException.TaskCanceledException(String) constructor

```csharp
public TaskCanceledException (string? message);
```

Initializes a new instance of the `TaskCanceledException` class with a specified message that describes the error.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `TaskCanceledException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|

## TaskCanceledException.TaskCanceledException(Task) constructor

```csharp
public TaskCanceledException (System.Threading.Tasks.Task? task);
```

Initializes a new instance of the `TaskCanceledException` class with a reference to the `Task` that has been canceled.

Parameters:

- `task`: A task that has been canceled.

To be added.

## TaskCanceledException.TaskCanceledException(SerializationInfo, StreamingContext) constructor

```csharp
protected TaskCanceledException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `TaskCanceledException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## TaskCanceledException.TaskCanceledException(String, Exception) constructor

```csharp
public TaskCanceledException (string? message, Exception? innerException);
```

Initializes a new instance of the `TaskCanceledException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TaskCanceledException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|

## TaskCanceledException.TaskCanceledException(String, Exception, CancellationToken) constructor

```csharp
public TaskCanceledException (string? message, Exception? innerException, System.Threading.CancellationToken token);
```

Initializes a new instance of the `TaskCanceledException` class with a specified error message, a reference to the inner exception that is the cause of this exception, and the `CancellationToken` that triggered the cancellation.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception.
- `token`: The cancellation token that triggered the cancellation.

To be added.

## TaskCanceledException.Task property

```csharp
public System.Threading.Tasks.Task? Task { get; }
```

Gets the task associated with this exception.

Returns: A reference to the `Task` that is associated with this exception.

#### Remarks
It is permissible for no Task to be associated with a `TaskCanceledException`, in which case this property will return null.

This property is thread-safe and may be used from multiple threads concurrently.
