---
title: "ThreadInterruptedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadInterruptedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadInterruptedException class

Namespace: `System.Threading`

```csharp
public class ThreadInterruptedException : SystemException
```

The exception that is thrown when a `Thread` is interrupted while it is in a waiting state.

#### Remarks
After a thread is created, it is in one or more `ThreadState` states until it is destroyed. Calling `Thread.Interrupt` when a thread is in the `WaitSleepJoin` state will cause a `ThreadInterruptedException` to be thrown in the target thread. If the thread is not in the `WaitSleepJoin` state, the exception is not thrown until the thread enters that state. If the thread never blocks, it could complete without ever being interrupted.

`ThreadInterruptedException` uses the HRESULT COR_E_THREADINTERRUPTED, which has the value 0x80131519.

For a list of initial property values for an instance of `ThreadInterruptedException`, see the `ThreadInterruptedException.%23ctor` constructors.

#### Examples
The following code example shows the behavior of a running thread when it is interrupted and subsequently gets blocked.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Interrupt/source.cs._

## ThreadInterruptedException.ThreadInterruptedException() constructor

```csharp
public ThreadInterruptedException ();
```

Initializes a new instance of the `ThreadInterruptedException` class with default properties.

#### Remarks
The following table shows the initial property values for an instance of `ThreadInterruptedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## ThreadInterruptedException.ThreadInterruptedException(String) constructor

```csharp
public ThreadInterruptedException (string? message);
```

Initializes a new instance of the `ThreadInterruptedException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `ThreadInterruptedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

## ThreadInterruptedException.ThreadInterruptedException(SerializationInfo, StreamingContext) constructor

```csharp
protected ThreadInterruptedException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ThreadInterruptedException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## ThreadInterruptedException.ThreadInterruptedException(String, Exception) constructor

```csharp
public ThreadInterruptedException (string? message, Exception? innerException);
```

Initializes a new instance of the `ThreadInterruptedException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `ThreadInterruptedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
