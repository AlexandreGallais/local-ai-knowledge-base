---
title: "SemaphoreFullException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/SemaphoreFullException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SemaphoreFullException class

Namespace: `System.Threading`

```csharp
public class SemaphoreFullException : SystemException
```

The exception that is thrown when the `Release` method is called on a semaphore whose count is already at the maximum.

#### Remarks
The count on a semaphore is decremented each time a thread enters the semaphore, and incremented when a thread releases the semaphore. When the count is zero, subsequent requests block until other threads release the semaphore. When all threads have released the semaphore, the count is at the maximum value specified when the semaphore was created. If a programming error causes a thread to call the `Semaphore.Release` method at this point, a `SemaphoreFullException` is thrown.

> **Note:**
>  The `Semaphore` class does not enforce thread identity on calls to the `WaitHandle.WaitOne` and `Semaphore.Release` methods. It is not necessary for the same thread that called `WaitHandle.WaitOne` to call `Semaphore.Release`.

`SemaphoreFullException` does not necessarily indicate a problem with the code where the exception occurred. Consider the following scenario: Thread A and thread B enter a semaphore that has a maximum count of two. A programming error in thread B causes it to call `Semaphore.Release` twice, so that the count on the semaphore is full. As a result, when thread A eventually calls `Semaphore.Release`, a `SemaphoreFullException` is thrown.

For a list of initial property values for an instance of the `SemaphoreFullException` class, see the `%23ctor` constructor.

#### Examples
The following code example shows how a programming error in one thread can lead to a `SemaphoreFullException` in another thread: Two threads enter a semaphore. The second thread releases the semaphore twice, while the first thread is still executing its task. When the first thread finishes and releases the semaphore, the semaphore count is already full and an exception is thrown.

_Code sample not included: ~/snippets/csharp/System.Threading/SemaphoreFullException/Overview/source.cs._

## SemaphoreFullException.SemaphoreFullException() constructor

```csharp
public SemaphoreFullException ();
```

Initializes a new instance of the `SemaphoreFullException` class with default values.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Adding the given count to the semaphore would cause it to exceed its maximum count." This message takes into account the current system culture.

The following table shows the initial property values for an instance of the `SemaphoreFullException` class.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The system-supplied error message string.|

## SemaphoreFullException.SemaphoreFullException(String) constructor

```csharp
public SemaphoreFullException (string? message);
```

Initializes a new instance of the `SemaphoreFullException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
The content of `message` is a text string intended to inform the user about the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of the `SemaphoreFullException` class initialized with this constructor.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|`message`.|

## SemaphoreFullException.SemaphoreFullException(SerializationInfo, StreamingContext) constructor

```csharp
protected SemaphoreFullException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `SemaphoreFullException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` object that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` object that contains contextual information about the source or destination.

To be added.

## SemaphoreFullException.SemaphoreFullException(String, Exception) constructor

```csharp
public SemaphoreFullException (string? message, Exception? innerException);
```

Initializes a new instance of the `SemaphoreFullException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.
