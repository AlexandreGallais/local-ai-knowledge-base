---
title: "InvalidOperationException class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/InvalidOperationException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InvalidOperationException class (part 2 of 2)

You can call the `Enumerable.FirstOrDefault` method instead of `Enumerable.First` to return a specified or default value. If the method does not find a first element in the sequence, it returns the default value for that data type. The default value is `null` for a reference type, zero for a numeric data type, and `MinValue` for the `DateTime` type.

> **Note:**
> Interpreting the value returned by the `Enumerable.FirstOrDefault` method is often complicated by the fact that the default value of the type can be a valid value in the sequence. In this case, you an call the `Enumerable.Any` method to determine whether the sequence has valid members before calling the `Enumerable.First` method.

The following example calls the  `FirstOrDefault<T>` method to prevent the `InvalidOperationException` exception thrown in the previous example.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Enumerable4.cs._

#### Call Enumerable.Single or Enumerable.SingleOrDefault on a sequence without one element

The `Enumerable.Single` method returns the only element of a sequence, or the only element of a sequence that meets a specified condition.   If there are no elements in the sequence, or if there is more than one element , the method throws an `InvalidOperationException` exception.

You can use the `Enumerable.SingleOrDefault` method to return a default value instead of throwing an exception when the sequence contains no elements. However, the `Enumerable.SingleOrDefault` method still throws an `InvalidOperationException` exception when the sequence contains more than one element.

The following table lists the exception messages from the `InvalidOperationException` exception objects thrown by calls to the `Enumerable.Single` and `Enumerable.SingleOrDefault` methods.

| Method                            | Message                                              |
|-----------------------------------|------------------------------------------------------|
| `Single`                          | **Sequence contains no matching element**            |
| `Single` `SingleOrDefault` | **Sequence contains more than one matching element** |

In the following example, the call to the `Enumerable.Single` method throws an `InvalidOperationException` exception because the sequence doesn't have an element greater than 4.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Enumerable5.cs._

The following example attempts to prevent the `InvalidOperationException` exception thrown when a sequence is empty by instead calling the `Enumerable.SingleOrDefault` method. However, because this sequence returns multiple elements whose value is greater than 2, it also throws an `InvalidOperationException` exception.

_Code sample not included: ~/snippets/csharp/System/InvalidOperationException/Overview/Other/Enumerable6.cs._

Calling the `Enumerable.Single` method assumes that either a sequence or the sequence that meets specified criteria contains only one element. `Enumerable.SingleOrDefault` assumes a sequence with zero or one result, but no more. If this assumption is a deliberate one on your part and these conditions are not met, rethrowing or catching the resulting `InvalidOperationException` is appropriate. Otherwise, or if you expect that invalid conditions will occur with some frequency, you should consider using some other `Enumerable` method, such as `Enumerable.FirstOrDefault` or `Enumerable.Where`.

#### Dynamic cross-application domain field access

The `Ldflda` common intermediate language (CIL) instruction throws an `InvalidOperationException` exception if the object containing the field whose address you are trying to retrieve is not within the application domain in which your code is executing. The address of a field can only be accessed from the application domain in which it resides.

#### Throw an InvalidOperationException exception

You should throw an `InvalidOperationException` exception only when the state of your object for some reason does not support a particular method call. That is, the method call is valid in some circumstances or contexts, but is invalid in others.

If the method invocation failure is due to invalid arguments, then `ArgumentException` or one of its derived classes, `ArgumentNullException` or `ArgumentOutOfRangeException`, should be thrown instead.

## InvalidOperationException.InvalidOperationException() constructor

```csharp
public InvalidOperationException ();
```

Initializes a new instance of the `InvalidOperationException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The requested operation cannot be performed." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `InvalidOperationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## InvalidOperationException.InvalidOperationException(String) constructor

```csharp
public InvalidOperationException (string? message);
```

Initializes a new instance of the `InvalidOperationException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new exception using the `message` parameter. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `InvalidOperationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## InvalidOperationException.InvalidOperationException(SerializationInfo, StreamingContext) constructor

```csharp
protected InvalidOperationException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `InvalidOperationException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## InvalidOperationException.InvalidOperationException(String, Exception) constructor

```csharp
public InvalidOperationException (string? message, Exception? innerException);
```

Initializes a new instance of the `InvalidOperationException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `InvalidOperationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
