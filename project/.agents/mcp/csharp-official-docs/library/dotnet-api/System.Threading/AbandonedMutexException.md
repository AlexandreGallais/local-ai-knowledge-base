---
title: "AbandonedMutexException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/AbandonedMutexException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AbandonedMutexException class

Namespace: `System.Threading`

```csharp
public class AbandonedMutexException : SystemException
```

The exception that is thrown when one thread acquires a `Mutex` object that another thread has abandoned by exiting without releasing it.

#### Remarks
When a thread abandons a mutex, the exception is thrown in the next thread that acquires the mutex. The thread might acquire the mutex because it was already waiting on the mutex or because it enters the mutex at a later time.

An abandoned mutex indicates a serious programming error. When a thread exits without releasing the mutex, the data structures protected by the mutex might not be in a consistent state.

The next thread to request ownership of the mutex can handle this exception and proceed, provided that the integrity of the data structures can be verified.

#### Examples
The following code example executes a thread that abandons five mutexes, demonstrating their effects on the `WaitHandle.WaitOne`, `WaitHandle.WaitAny`, and `WaitHandle.WaitAll` methods. The value of the `MutexIndex` property is displayed for the `WaitHandle.WaitAny` call.

> **Note:**
>  The call to the `WaitHandle.WaitAny` method is interrupted by one of the abandoned mutexes. The other abandoned mutex could still cause an `AbandonedMutexException` to be thrown by subsequent wait methods.

_Code sample not included: ~/snippets/csharp/System.Threading/AbandonedMutexException/Overview/koax.cs._

## AbandonedMutexException.AbandonedMutexException() constructor

```csharp
public AbandonedMutexException ();
```

Initializes a new instance of the `AbandonedMutexException` class with default values.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The wait completed due to an abandoned mutex." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `AbandonedMutexException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The system-supplied error message string.|
|`AbandonedMutexException.Mutex`|`null`.|
|`AbandonedMutexException.MutexIndex`|-1 (minus one).|

## AbandonedMutexException.AbandonedMutexException(String) constructor

```csharp
public AbandonedMutexException (string? message);
```

Initializes a new instance of the `AbandonedMutexException` class with a specified error message.

Parameters:

- `message`: An error message that explains the reason for the exception.

#### Remarks
The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `AbandonedMutexException` initialized with this constructor.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|`message`.|
|`AbandonedMutexException.Mutex`|`null`.|
|`AbandonedMutexException.MutexIndex`|-1 (minus one).|

## AbandonedMutexException.AbandonedMutexException(Int32, WaitHandle) constructor

```csharp
public AbandonedMutexException (int location, System.Threading.WaitHandle? handle);
```

Initializes a new instance of the `AbandonedMutexException` class with a specified index for the abandoned mutex, if applicable, and a `Mutex` object that represents the mutex.

Parameters:

- `location`: The index of the abandoned mutex in the array of wait handles if the exception is thrown for the `WaitAny` method, or -1 if the exception is thrown for the `WaitOne` or `WaitAll` methods.
- `handle`: A `Mutex` object that represents the abandoned mutex.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The wait completed due to an abandoned mutex." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `AbandonedMutexException` initialized with this constructor.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|A system-supplied error message string.|
|`AbandonedMutexException.Mutex`|`handle`.|
|`AbandonedMutexException.MutexIndex`|`location`.|

## AbandonedMutexException.AbandonedMutexException(SerializationInfo, StreamingContext) constructor

```csharp
protected AbandonedMutexException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `AbandonedMutexException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` object that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` object that contains contextual information about the source or destination.

To be added.

## AbandonedMutexException.AbandonedMutexException(String, Exception) constructor

```csharp
public AbandonedMutexException (string? message, Exception? inner);
```

Initializes a new instance of the `AbandonedMutexException` class with a specified error message and inner exception.

Parameters:

- `message`: An error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `AbandonedMutexException` initialized with this constructor.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`inner`.|
|`Exception.Message`|`message`.|
|`AbandonedMutexException.Mutex`|`null`.|
|`AbandonedMutexException.MutexIndex`|-1 (minus one).|

## AbandonedMutexException.AbandonedMutexException(String, Int32, WaitHandle) constructor

```csharp
public AbandonedMutexException (string? message, int location, System.Threading.WaitHandle? handle);
```

Initializes a new instance of the `AbandonedMutexException` class with a specified error message, the index of the abandoned mutex, if applicable, and the abandoned mutex.

Parameters:

- `message`: An error message that explains the reason for the exception.
- `location`: The index of the abandoned mutex in the array of wait handles if the exception is thrown for the `WaitAny` method, or -1 if the exception is thrown for the `WaitOne` or `WaitAll` methods.
- `handle`: A `Mutex` object that represents the abandoned mutex.

#### Remarks
The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `AbandonedMutexException` initialized with this constructor.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|`message`.|
|`AbandonedMutexException.Mutex`|`handle`.|
|`AbandonedMutexException.MutexIndex`|`location`.|

## AbandonedMutexException.AbandonedMutexException(String, Exception, Int32, WaitHandle) constructor

```csharp
public AbandonedMutexException (string? message, Exception? inner, int location, System.Threading.WaitHandle? handle);
```

Initializes a new instance of the `AbandonedMutexException` class with a specified error message, the inner exception, the index for the abandoned mutex, if applicable, and a `Mutex` object that represents the mutex.

Parameters:

- `message`: An error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.
- `location`: The index of the abandoned mutex in the array of wait handles if the exception is thrown for the `WaitAny` method, or -1 if the exception is thrown for the `WaitOne` or `WaitAll` methods.
- `handle`: A `Mutex` object that represents the abandoned mutex.

#### Remarks
The content of `message` is a text string intended to inform the user about the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `AbandonedMutexException` initialized with this constructor.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`inner`.|
|`Exception.Message`|`message`.|
|`AbandonedMutexException.Mutex`|`handle`.|
|`AbandonedMutexException.MutexIndex`|`location`.|

## AbandonedMutexException.Mutex property

```csharp
public System.Threading.Mutex? Mutex { get; }
```

Gets the abandoned mutex that caused the exception, if known.

Returns: A `Mutex` object that represents the abandoned mutex, or `null` if the abandoned mutex could not be identified.

#### Remarks
If the exception is thrown on a call to the `WaitHandle.WaitAny` method, the `Mutex` returned is the abandoned mutex with the lowest index in the array of `WaitHandle` objects that was passed to `WaitHandle.WaitAny`, or `null` if the abandoned mutex could not be identified. If the exception is thrown on a call to `WaitHandle.WaitOne` or `WaitHandle.WaitAll`, this property always returns `null`.

## AbandonedMutexException.MutexIndex property

```csharp
public int MutexIndex { get; }
```

Gets the index of the abandoned mutex that caused the exception, if known.

Returns: The index, in the array of wait handles passed to the `WaitAny` method, of the `Mutex` object that represents the abandoned mutex, or -1 if the index of the abandoned mutex could not be determined.

#### Remarks
If the exception is thrown on a call to the `WaitHandle.WaitAny` method, this property returns the index of the abandoned mutex with the lowest index in the array of `WaitHandle` objects that was passed to `WaitHandle.WaitAny`, or -1 if the abandoned mutex could not be identified. If the exception is thrown on a call to `WaitHandle.WaitOne` or `WaitHandle.WaitAll`, this property always returns -1.

#### Examples
The following code example executes a thread that abandons five mutexes. The abandoned mutexes are used to demonstrate the effects on the `WaitHandle.WaitOne`, `WaitHandle.WaitAny`, and `WaitHandle.WaitAll` method calls. The value of the `MutexIndex` property is displayed for the `WaitHandle.WaitAny` call.

> **Note:**
>  The call to `WaitHandle.WaitAny` is interrupted by one of the abandoned mutexes. The other abandoned mutex could still cause an `AbandonedMutexException` to be thrown by subsequent wait methods.

_Code sample not included: ~/snippets/csharp/System.Threading/AbandonedMutexException/Overview/koax.cs._
