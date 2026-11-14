---
title: "ObjectDisposedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ObjectDisposedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObjectDisposedException class

Namespace: `System`

```csharp
public class ObjectDisposedException : InvalidOperationException
```

The exception that is thrown when an operation is performed on a disposed object.

#### Remarks
An `ObjectDisposedException` is thrown when you try to access a member of an object that implements the `IDisposable` interface or `IAsyncDisposable` interface, and that object has been disposed. Typically, this exception is caused by one of the following conditions:

- You've called an `IDisposable` object's `Dispose` method (or an `IDisposableAsync` object's `DisposeAsync` method), and you're trying to access an instance member that gets or sets the object's state. The following example illustrates the `ObjectDisposedException` that is thrown when you try to reset the frequency of timer notifications after you call the `Timer.Dispose` method.

_Code sample not included: ~/snippets/csharp/System/ObjectDisposedException/Overview/dispose1.cs._

- You've called an object's `Close` method, and you're trying to access an instance member that gets or sets the object's state. Often, the `Close` method provides a type's public implementation of the `IDisposable.Dispose` method. The same is true for `CloseAsync` and ``IAsyncDisposable.DisposeAsync``.

- You've called an object's `Dispose` or `DisposeAsync` methods multiple times. Typically, this doesn't throw an exception. However, depending on how a type implements `IDisposable.Dispose` or `IAsyncDisposable.DisposeAsync`, it may not allow multiple calls to that method.

In most cases, this exception results from developer error. Instead of handling the error in a `try`/`catch` block, you should correct the error, typically by reinstantiating the object.

#### Examples
The following example demonstrates an error that causes the `ObjectDisposedException` exception to be thrown.

_Code sample not included: ~/snippets/csharp/System/ObjectDisposedException/Overview/objdispexc.cs._

This code produces the following output:

```txt
Caught:
  Cannot access a closed Stream.
```

## ObjectDisposedException.ObjectDisposedException(String) constructor

```csharp
public ObjectDisposedException (string? objectName);
```

Initializes a new instance of the `ObjectDisposedException` class with a string containing the name of the disposed object.

Parameters:

- `objectName`: A string containing the name of the disposed object.

#### Remarks
The `Message` property is initialized to a system-supplied message that describes the error and includes the `objectName` parameter. This message takes into account the current system culture.

The `InnerException` property of the new instance is initialized to `null`.

If `objectName` is `null`, the `Message` property contains only an error message.

## ObjectDisposedException.ObjectDisposedException(SerializationInfo, StreamingContext) constructor

```csharp
protected ObjectDisposedException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ObjectDisposedException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## ObjectDisposedException.ObjectDisposedException(String, Exception) constructor

```csharp
public ObjectDisposedException (string? message, Exception? innerException);
```

Initializes a new instance of the `ObjectDisposedException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If `innerException` is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor.

## ObjectDisposedException.ObjectDisposedException(String, String) constructor

```csharp
public ObjectDisposedException (string? objectName, string? message);
```

Initializes a new instance of the `ObjectDisposedException` class with the specified object name and message.

Parameters:

- `objectName`: The name of the disposed object.
- `message`: The error message that explains the reason for the exception.

#### Remarks
The `InnerException` property of the new instance is initialized to `null`.

If `objectName` is `null`, the `Message` property contains only an error message.

## ObjectDisposedException.Message property

```csharp
public override string Message { get; }
```

Gets the message that describes the error.

Returns: A string that describes the error.

#### Remarks
If the `ObjectName` property is not `null`, the message includes the name of the object.

This property overrides `Exception.Message`.

## ObjectDisposedException.ObjectName property

```csharp
public string ObjectName { get; }
```

Gets the name of the disposed object.

Returns: A string containing the name of the disposed object.

#### Remarks
If the current property is not `null` or `Empty`, the value of this property is included in the string returned by the `Message` property.

## ObjectDisposedException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Retrieves the `SerializationInfo` object with the parameter name and additional exception information.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## ObjectDisposedException.ThrowIf(Boolean, Object) method

```csharp
public static void ThrowIf (bool condition, object instance);
```

Throws an `ObjectDisposedException` if the specified `condition` is `true`.

Parameters:

- `condition`: The condition to evaluate.
- `instance`: The object whose type's full name should be included in any resulting `ObjectDisposedException`.

Exceptions:

- `ObjectDisposedException`: The `condition` is `true`.

To be added.

## ObjectDisposedException.ThrowIf(Boolean, Type) method

```csharp
public static void ThrowIf (bool condition, Type type);
```

Throws an `ObjectDisposedException` if the specified `condition` is `true`.

Parameters:

- `condition`: The condition to evaluate.
- `type`: The type whose full name should be included in any resulting `ObjectDisposedException`.

Exceptions:

- `ObjectDisposedException`: The `condition` is `true`.

To be added.
