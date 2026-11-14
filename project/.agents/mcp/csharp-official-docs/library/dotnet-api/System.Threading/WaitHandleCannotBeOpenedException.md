---
title: "WaitHandleCannotBeOpenedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/WaitHandleCannotBeOpenedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WaitHandleCannotBeOpenedException class

Namespace: `System.Threading`

```csharp
public class WaitHandleCannotBeOpenedException : ApplicationException
```

The exception that is thrown when an attempt is made to open a system mutex, semaphore, or event wait handle that does not exist.

#### Remarks
Instances of the `Mutex`, `Semaphore`, and  `EventWaitHandle` classes can represent named system synchronization objects. When you use the `Mutex.OpenExisting` method, the `Semaphore.OpenExisting` method, or the  `EventWaitHandle.OpenExisting` method to open a named system object that does not exist, a `WaitHandleCannotBeOpenedException` exception is thrown.

## WaitHandleCannotBeOpenedException.WaitHandleCannotBeOpenedException() constructor

```csharp
public WaitHandleCannotBeOpenedException ();
```

Initializes a new instance of the `WaitHandleCannotBeOpenedException` class with default values.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "No handle of the given name exists." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `WaitHandleCannotBeOpenedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The system-supplied error message string.|

## WaitHandleCannotBeOpenedException.WaitHandleCannotBeOpenedException(String) constructor

```csharp
public WaitHandleCannotBeOpenedException (string? message);
```

Initializes a new instance of the `WaitHandleCannotBeOpenedException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `WaitHandleCannotBeOpenedException` initialized with this constructor.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|`message`.|

## WaitHandleCannotBeOpenedException.WaitHandleCannotBeOpenedException(SerializationInfo, StreamingContext) constructor

```csharp
protected WaitHandleCannotBeOpenedException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `WaitHandleCannotBeOpenedException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` object that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` object that contains contextual information about the source or destination.

To be added.

## WaitHandleCannotBeOpenedException.WaitHandleCannotBeOpenedException(String, Exception) constructor

```csharp
public WaitHandleCannotBeOpenedException (string? message, Exception? innerException);
```

Initializes a new instance of the `WaitHandleCannotBeOpenedException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.
