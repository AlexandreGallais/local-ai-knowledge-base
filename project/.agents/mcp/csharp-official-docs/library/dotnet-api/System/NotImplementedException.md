---
title: "NotImplementedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/NotImplementedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NotImplementedException class

Namespace: `System`

```csharp
public class NotImplementedException : SystemException
```

The exception that is thrown when a requested method or operation is not implemented.

The `NotImplementedException` exception is thrown when a particular method, get accessor, or set accessor is present as a member of a type but is not implemented.

`NotImplementedException` uses the default `Object.Equals` implementation, which supports reference equality. For a list of initial values for an instance of `NotImplementedException`, see the `NotImplementedException.%23ctor` constructors.

#### Throw the exception

You might choose to throw a `NotImplementedException` exception in properties or methods in your own types when a member is still in development and will only be implemented later in production code.

#### Handle the exception

The `NotImplementedException` exception indicates that the method or property that you are attempting to invoke has no implementation and therefore provides no functionality. As a result, you should not handle this error in a `try/catch` block. Instead, you should remove the member invocation from your code. You can include a call to the member when it is implemented in the production version of a library.

In some cases, a `NotImplementedException` exception might not be used to indicate functionality that is still in development in a preproduction library. However, this still indicates that the functionality is unavailable, and you should remove the member invocation from your code.

#### NotImplementedException and other exception types

.NET also includes two other exception types, `NotSupportedException` and `PlatformNotSupportedException`, that indicate that no implementation exists for a particular member of a type. You should throw one of these instead of a `NotImplementedException` exception under the following conditions:

- Throw a `PlatformNotSupportedException` exception on platforms on which the functionality is not supported if you've designed a type with one or more members that are available on some platforms or versions but not others.
- Throw a `NotSupportedException` exception if the implementation of an interface member or an override to an abstract base class method is not possible.

For example, the `ToInt32` method throws a `NotSupportedException` exception because no meaningful conversion between a date and time and a 32-bit signed integer exists. The method must be present in this case because the `Convert` class implements the `IConvertible` interface.

You should also throw a `NotSupportedException` exception if you've implemented an abstract base class and add a new member to it that must be overridden by derived classes. In that case, making the member abstract causes existing subclasses to fail to load.

The following example throws this exception for a method that has not been developed.

_Code sample not included: ~/snippets/csharp/System/NotImplementedException/Overview/program.cs._

## NotImplementedException.NotImplementedException() constructor

```csharp
public NotImplementedException ();
```

Initializes a new instance of the `NotImplementedException` class with default properties.

#### Remarks
The following table shows the initial property values for an instance of `NotImplementedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The empty string ("").|

## NotImplementedException.NotImplementedException(String) constructor

```csharp
public NotImplementedException (string? message);
```

Initializes a new instance of the `NotImplementedException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `NotImplementedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

## NotImplementedException.NotImplementedException(SerializationInfo, StreamingContext) constructor

```csharp
protected NotImplementedException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `NotImplementedException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## NotImplementedException.NotImplementedException(String, Exception) constructor

```csharp
public NotImplementedException (string? message, Exception? inner);
```

Initializes a new instance of the `NotImplementedException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `NotImplementedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
