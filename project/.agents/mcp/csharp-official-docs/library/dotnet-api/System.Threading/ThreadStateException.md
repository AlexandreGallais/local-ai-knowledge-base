---
title: "ThreadStateException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadStateException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadStateException class

Namespace: `System.Threading`

```csharp
public class ThreadStateException : SystemException
```

The exception that is thrown when a `Thread` is in an invalid `Thread.ThreadState` for the method call.

#### Remarks
Once a thread is created, it is in at least one of the `ThreadState` states until it terminates. `ThreadStateException` is thrown by methods that cannot perform the requested operation due to the current state of a thread. For example, trying to restart an aborted thread by calling `Thread.Start` on a thread that has terminated throws a `ThreadStateException`.

`ThreadStateException` uses the HRESULT COR_E_THREADSTATE, which has the value 0x80131520.

For a list of initial property values for an instance of `ThreadStateException`, see the `ThreadStateException.%23ctor` constructors.

#### Examples
The following example demonstrates an error that causes the system to throw a `ThreadStateException`.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadStateException/Overview/threadstex.cs._

This code produces the following output:

```
In main. Attempting to restart myThread.
    Working thread...
    Caught: Thread is running or terminated. Cannot restart.
```

## ThreadStateException.ThreadStateException() constructor

```csharp
public ThreadStateException ();
```

Initializes a new instance of the `ThreadStateException` class with default properties.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The requested operation cannot be performed on the thread due to its current state." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `ThreadStateException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## ThreadStateException.ThreadStateException(String) constructor

```csharp
public ThreadStateException (string? message);
```

Initializes a new instance of the `ThreadStateException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
This constructor initializes the `Message` property of the new instance using the `message` parameter.

The following table shows the initial property values for an instance of `ThreadStateException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

## ThreadStateException.ThreadStateException(SerializationInfo, StreamingContext) constructor

```csharp
protected ThreadStateException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ThreadStateException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## ThreadStateException.ThreadStateException(String, Exception) constructor

```csharp
public ThreadStateException (string? message, Exception? innerException);
```

Initializes a new instance of the `ThreadStateException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `ThreadStateException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
