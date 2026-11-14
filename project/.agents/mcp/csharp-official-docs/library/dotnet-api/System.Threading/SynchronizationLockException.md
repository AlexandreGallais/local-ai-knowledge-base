---
title: "SynchronizationLockException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/SynchronizationLockException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SynchronizationLockException class

Namespace: `System.Threading`

```csharp
public class SynchronizationLockException : SystemException
```

The exception that is thrown when a method requires the caller to own the lock on a given Monitor, and the method is invoked by a caller that does not own that lock.

#### Remarks
`SynchronizationLockException` is thrown by calling the `Monitor.Exit`, `Monitor.Pulse`, `Monitor.PulseAll`, and `Monitor.Wait` methods of the `Monitor` class from an unsynchronized block of code.

`SynchronizationLockException` uses the HRESULT COR_E_SYNCHRONIZATIONLOCK, which has the value 0x80131518.

For a list of initial property values for an instance of `SynchronizationLockException`, see the `SynchronizationLockException.%23ctor` constructors.

## SynchronizationLockException.SynchronizationLockException() constructor

```csharp
public SynchronizationLockException ();
```

Initializes a new instance of the `SynchronizationLockException` class with default properties.

#### Remarks
The following table shows the initial property values for an instance of `SynchronizationLockException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## SynchronizationLockException.SynchronizationLockException(String) constructor

```csharp
public SynchronizationLockException (string? message);
```

Initializes a new instance of the `SynchronizationLockException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `SynchronizationLockException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

## SynchronizationLockException.SynchronizationLockException(SerializationInfo, StreamingContext) constructor

```csharp
protected SynchronizationLockException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `SynchronizationLockException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## SynchronizationLockException.SynchronizationLockException(String, Exception) constructor

```csharp
public SynchronizationLockException (string? message, Exception? innerException);
```

Initializes a new instance of the `SynchronizationLockException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `SynchronizationLockException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
