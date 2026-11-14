---
title: "LockRecursionException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/LockRecursionException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LockRecursionException class

Namespace: `System.Threading`

```csharp
public class LockRecursionException : Exception
```

The exception that is thrown when recursive entry into a lock is not compatible with the recursion policy for the lock.

#### Remarks
`LockRecursionException` is thrown for several reasons, including the following:

- If a thread tries to enter an instance of `ReaderWriterLockSlim` recursively, but the instance does not support recursion.

- If a thread tries to enter a `ReaderWriterLockSlim` instance in write mode or upgradeable mode when the thread initially entered the lock in read mode. This represents a potential deadlock and therefore is not allowed.

- If allowing one more level of recursion would exceed the maximum value for the internal storage counter used to track recursions. This limit is so large that applications should never encounter it.

#### Examples
The following example shows two causes of `LockRecursionException` when using the `ReaderWriterLockSlim` class. The program creates a `ReaderWriterLockSlim` by using the parameterless constructor, which disallows recursion. The program then starts a thread that enters the lock in read mode. The thread tries to enter the lock recursively in read mode, and catches the resulting exception. Finally, the thread tries to enter write mode, which would create a potential for deadlocks. The thread catches the resulting exception.

_Code sample not included: ~/snippets/csharp/System.Threading/LockRecursionException/Overview/source.cs._

## LockRecursionException.LockRecursionException() constructor

```csharp
public LockRecursionException ();
```

Initializes a new instance of the `LockRecursionException` class with a system-supplied message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Recursive read lock acquisitions not allowed in this mode." This message takes the current system culture into account.

The following table shows the initial property values for an instance of `InsufficientMemoryException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## LockRecursionException.LockRecursionException(String) constructor

```csharp
public LockRecursionException (string? message);
```

Initializes a new instance of the `LockRecursionException` class with a specified message that describes the error.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor must make sure that this string has been localized for the current system culture.

#### Remarks
This constructor initializes the `Message` property of the new exception with the `message` parameter. The content of `message` is intended to be understood by humans. The caller of this constructor must make sure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `LockRecursionException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

## LockRecursionException.LockRecursionException(SerializationInfo, StreamingContext) constructor

```csharp
protected LockRecursionException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `LockRecursionException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## LockRecursionException.LockRecursionException(String, Exception) constructor

```csharp
public LockRecursionException (string? message, Exception? innerException);
```

Initializes a new instance of the `LockRecursionException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor must make sure that this string has been localized for the current system culture.
- `innerException`: The exception that caused the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `LockRecursionException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The exception specified in `innerException`.|
|`Exception.Message`|The error message string specified in `message`.|
