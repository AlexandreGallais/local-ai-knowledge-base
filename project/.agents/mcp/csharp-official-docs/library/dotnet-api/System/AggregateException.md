---
title: "AggregateException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AggregateException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AggregateException class

Namespace: `System`

```csharp
public class AggregateException : Exception
```

Represents one or more errors that occur during application execution.

#### Remarks
`AggregateException` is used to consolidate multiple failures into a single, throwable exception object. It is used extensively in the Task Parallel Library (TPL) and Parallel LINQ (PLINQ). For more information, see Exception Handling and How to: Handle Exceptions in a PLINQ Query. For additional information, see the Aggregating Exceptions entry in the .NET Matters blog.

#### Examples
The following example catches the `AggregateException` exception and calls the `AggregateException.Handle` method to handle each exception it contains. Compiling and running the example with the first `task1` variable should result in an `AggregateException` object that contains an `UnauthorizedAccessException` exception. Commenting out that line, uncommenting the second `task1` variable, and compiling and running the example produces an `AggregateException` object that contains an `IndexOutOfRangeException` exception.

_Code sample not included: ~/snippets/csharp/System/AggregateException/Overview/exception1.cs._

## AggregateException.AggregateException() constructor

```csharp
public AggregateException ();
```

Initializes a new instance of the `AggregateException` class with a system-supplied message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "System.AggregateException: One or more errors occurred." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `AggregateException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## AggregateException.AggregateException(Exception>) constructor

```csharp
public AggregateException (System.Collections.Generic.IEnumerable<Exception> innerExceptions);
```

Initializes a new instance of the `AggregateException` class with references to the inner exceptions that are the cause of this exception.

Parameters:

- `innerExceptions`: The exceptions that are the cause of the current exception.

Exceptions:

- `ArgumentNullException`: The `innerExceptions` argument is null.
- `ArgumentException`: An element of `innerExceptions` is null.

To be added.

## AggregateException.AggregateException(Exception[]) constructor

```csharp
public AggregateException (params Exception[] innerExceptions);
```

Initializes a new instance of the `AggregateException` class with references to the inner exceptions that are the cause of this exception.

Parameters:

- `innerExceptions`: The exceptions that are the cause of the current exception.

Exceptions:

- `ArgumentNullException`: The `innerExceptions` argument is null.
- `ArgumentException`: An element of `innerExceptions` is null.

To be added.

## AggregateException.AggregateException(String) constructor

```csharp
public AggregateException (string? message);
```

Initializes a new instance of the `AggregateException` class with a specified message that describes the error.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `AggregateException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|

## AggregateException.AggregateException(SerializationInfo, StreamingContext) constructor

```csharp
protected AggregateException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `AggregateException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: The `info` argument is null.
- `SerializationException`: The exception could not be deserialized correctly.

To be added.

## AggregateException.AggregateException(String, Exception>) constructor

```csharp
public AggregateException (string? message, System.Collections.Generic.IEnumerable<Exception> innerExceptions);
```

Initializes a new instance of the `AggregateException` class with a specified error message and references to the inner exceptions that are the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerExceptions`: The exceptions that are the cause of the current exception.

Exceptions:

- `ArgumentNullException`: The `innerExceptions` argument is null.
- `ArgumentException`: An element of `innerExceptions` is null.

To be added.

## AggregateException.AggregateException(String, Exception) constructor

```csharp
public AggregateException (string? message, Exception innerException);
```

Initializes a new instance of the `AggregateException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The message that describes the exception. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

Exceptions:

- `ArgumentNullException`: The `innerException` argument is null.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `AggregateException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string specified in `message`.|

## AggregateException.AggregateException(String, Exception[]) constructor

```csharp
public AggregateException (string? message, params Exception[] innerExceptions);
```

Initializes a new instance of the `AggregateException` class with a specified error message and references to the inner exceptions that are the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerExceptions`: The exceptions that are the cause of the current exception.

Exceptions:

- `ArgumentNullException`: The `innerExceptions` argument is null.
- `ArgumentException`: An element of `innerExceptions` is null.

To be added.

## AggregateException.InnerExceptions property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<Exception> InnerExceptions { get; }
```

Gets a read-only collection of the `Exception` instances that caused the current exception.

Returns: A read-only collection of the `Exception` instances that caused the current exception.

To be added.

## AggregateException.Message property

```csharp
public override string Message { get; }
```

Gets a message that describes the exception.

Returns: The message that describes the exception.

To be added.

## AggregateException.Flatten() method

```csharp
public AggregateException Flatten ();
```

Flattens an `AggregateException` instances into a single, new instance.

Returns: A new, flattened `AggregateException`.

#### Remarks
If a task has an attached child task that throws an exception, that exception is wrapped in an `AggregateException` exception before it is propagated to the parent task, which wraps that exception in its own `AggregateException` exception before it propagates it back to the calling thread. In such cases, the `InnerExceptions` property of the `AggregateException` exception that is caught by the `Task.Wait`, `Task.Wait`, `Task.WaitAny` or `Task.WaitAll` method contains one or more `AggregateException` instances, not the original exceptions that caused the fault. To avoid having to iterate over nested `AggregateException` exceptions, you can use the `AggregateException.Flatten` method to remove all the nested `AggregateException` exceptions, so that the `InnerExceptions` property of the returned `AggregateException` object contains the original exceptions.

This method recursively flattens all instances of  `AggregateException` exceptions that are inner exceptions of the current `AggregateException` instance. The inner exceptions returned in the new `AggregateException` are the union of all the inner exceptions from exception tree rooted at the current `AggregateException` instance.

#### Examples
In the following example, nested `AggregateException` instances are flattened and handled in just one loop.

_Code sample not included: ~/snippets/csharp/System/AggregateException/Flatten/flatten2.cs._

You can also use the `AggregateException.Flatten` method to rethrow the inner exceptions from multiple `AggregateException` instances thrown by multiple tasks in a single `AggregateException` instance, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/AggregateException/Flatten/taskexceptions2.cs._

## AggregateException.GetBaseException() method

```csharp
public override Exception GetBaseException ();
```

Returns the `Exception` that is the root cause of this exception. This exception is either the root exception or the first `AggregateException` that contains either multiple inner exceptions or no inner exceptions at all.

Returns: The `Exception` that is the root cause of this exception.

This will either be the root exception, or the first `AggregateException` that contains either multiple inner exceptions or no inner exceptions at all.

## AggregateException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `AggregateException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: The `info` argument is null.

To be added.

## AggregateException.Handle(Boolean>) method

```csharp
public void Handle (Func<Exception,bool> predicate);
```

Invokes a handler on each `Exception` contained by this `AggregateException`.

Parameters:

- `predicate`: The predicate to execute for each exception. The predicate accepts as an argument the `Exception` to be processed and returns a Boolean to indicate whether the exception was handled.

Exceptions:

- `ArgumentNullException`: The `predicate` argument is null.
- `AggregateException`: An exception contained by this `AggregateException` was not handled.

#### Remarks
Each invocation of the `predicate` returns true or false to indicate whether the `Exception` was handled. After all invocations, any unhandled exceptions are put into a new `AggregateException` that will be thrown. If there are no unhandled exceptions, the `AggregateException.Handle` method simply returns. If any invocations of the `predicate` throws an exception, it will halt the processing of any more exceptions and immediately propagate the thrown exception as-is.

#### Examples
Ordinarily, an exception handler that catches an `AggregateException` exception uses a `foreach` loop (in C#) or `For Each` loop (in Visual Basic) to handle each exception in its `AggregateException.InnerExceptions` collection. Instead, the following example uses the `AggregateException.Handle` method to handle each exception, and only rethrows exceptions that are not `CustomException` instances.

_Code sample not included: ~/snippets/csharp/System/AggregateException/Handle/handlemethod2.cs._

The following is a more complete example that uses the `AggregateException.Handle` method to provide special handling for an `UnauthorizedAccessException` when enumerating files.

_Code sample not included: ~/snippets/csharp/System/AggregateException/Handle/taskexceptions.cs._

## AggregateException.ToString() method

```csharp
public override string ToString ();
```

Creates and returns a string representation of the current `AggregateException`.

Returns: A string representation of the current exception.

To be added.
