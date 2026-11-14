---
title: "NotSupportedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/NotSupportedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NotSupportedException class

Namespace: `System`

```csharp
public class NotSupportedException : SystemException
```

The exception that is thrown when an invoked method is not supported, or when there is an attempt to read, seek, or write to a stream that does not support the invoked functionality.

`NotSupportedException` indicates that no implementation exists for an invoked method or property.

`NotSupportedException` uses the HRESULT `COR_E_NOTSUPPORTED`, which has the value 0x80131515.

For a list of initial property values for an instance of `NotSupportedException`, see the `NotSupportedException.%23ctor` constructors.

#### Throw a NotSupportedException exception

You might consider throwing a `NotSupportedException` exception in the following cases:

- You're implementing a general-purpose interface, and some of the methods have no meaningful implementation. For example, if you're creating a date and time type that implements the `IConvertible` interface, you would throw a `NotSupportedException` exception for most of the conversions.

- You've inherited from an abstract class that requires that you override some methods. However, you're only prepared to provide an implementation for a subset of these. For the methods that you decide not to implement, you can choose to throw a `NotSupportedException`.

- You're defining a general-purpose type with a state that enables operations conditionally. For example, your type can be either read-only or read-write. In that case:

- If the object is read-only, attempting to assign values to the properties of an instance or call methods that modify instance state should throw a `NotSupportedException` exception.

- You should implement a property that returns a `Boolean` value that indicates whether particular functionality is available. For example, for a type that can be either read-only or read-write, you could implement a `IsReadOnly` property that indicates whether the set of read-write methods are available or unavailable.

#### Handle a NotSupportedException exception

The `NotSupportedException` exception indicates that a method has no implementation and that you should not call it. You should not handle the exception. Instead, what you should do depends on the cause of the exception: whether an implementation is completely absent, or the member invocation is inconsistent with the purpose of an object (such as a call to the `FileStream.Write` method on a read-only `FileStream` object).

**An implementation has not been provided because the operation cannot be performed in a meaningful way.**
This is a common exception when you are calling methods on an object that provides implementations for the methods of an abstract base class, or that implements a general-purpose interface, and the method has no meaningful implementation.

For example, the `Convert` class implements the `IConvertible` interface, which means that it must include a method to convert every primitive type to every other primitive type. Many of those conversions, however, are not possible. As a result, a call to the `ToBoolean` method, for instance, throws a `NotSupportedException` exception because there is no possible conversion between a `DateTime` and a `Boolean` value.

To eliminate the exception, you should eliminate the method call.

**The method call is not supported given the state of the object.**
You're attempting to invoke a member whose functionality is unavailable because of the object's state. You can eliminate the exception in one of three ways:

- You know the state of the object in advance, but you've invoked an unsupported method or property. In this case, the member invocation is an error, and you can eliminate it.

- You know the state of the object in advance (usually because your code has instantiated it), but the object is mis-configured. The following example illustrates this issue. It creates a read-only `FileStream` object and then attempts to write to it.

_Code sample not included: ~/snippets/csharp/System/NotSupportedException/Overview/BadState1.cs._

You can eliminate the exception by ensuring that the instantiated object supports the functionality you intend. The following example addresses the problem of the read-only `FileStream` object by providing the correct arguments to the `%23ctor` constructor.

- You don't know the state of the object in advance, and the object doesn't support a particular operation. In most cases, the object should include a property or method that indicates whether it supports a particular set of operations. You can eliminate the exception by checking the value of the object and invoking the member only if appropriate.

The following example defines a `DetectEncoding` method that throws a `NotSupportedException` exception when it attempts to read from the beginning of a stream that does not support read access.

_Code sample not included: ~/snippets/csharp/System/NotSupportedException/Overview/TestProp1.cs._

You can eliminate the exception by examining the value of the `CanRead` property and exiting the method if the stream is read-only.

_Code sample not included: ~/snippets/csharp/System/NotSupportedException/Overview/TestProp2.cs._

#### Related exception types

The `NotSupportedException` exception is closely related to two other exception types:

- `NotImplementedException`

This exception is thrown when a method could be implemented but is not, either because the member will be implemented in a later version, the member is not available on a particular platform, or the member belongs to an abstract class and a derived class must provide an implementation.

- `InvalidOperationException`

This exception is thrown in scenarios in which it is generally sometimes possible for the object to perform the requested operation, and the object state determines whether the operation can be performed.

## NotSupportedException.NotSupportedException() constructor

```csharp
public NotSupportedException ();
```

Initializes a new instance of the `NotSupportedException` class, setting the `Exception.Message` property of the new instance to a system-supplied message that describes the error. This message takes into account the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `NotSupportedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## NotSupportedException.NotSupportedException(String) constructor

```csharp
public NotSupportedException (string? message);
```

Initializes a new instance of the `NotSupportedException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `NotSupportedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

## NotSupportedException.NotSupportedException(SerializationInfo, StreamingContext) constructor

```csharp
protected NotSupportedException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `NotSupportedException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## NotSupportedException.NotSupportedException(String, Exception) constructor

```csharp
public NotSupportedException (string? message, Exception? innerException);
```

Initializes a new instance of the `NotSupportedException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `NotSupportedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
