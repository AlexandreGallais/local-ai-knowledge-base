---
title: "OperationCanceledException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/OperationCanceledException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OperationCanceledException class

Namespace: `System`

```csharp
public class OperationCanceledException : SystemException
```

The exception that is thrown in a thread upon cancellation of an operation that the thread was executing.

#### Remarks
If the task that was canceled had an associated cancellation token, it is returned by the `CancellationToken` property, and the `IsCancellationRequested` property of the token is set to `true`.

## OperationCanceledException.OperationCanceledException() constructor

```csharp
public OperationCanceledException ();
```

Initializes a new instance of the `OperationCanceledException` class with a system-supplied error message.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The operation was canceled." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `OperationCanceledException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A nullreference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|
|`OperationCanceledException.CancellationToken`|A cancellation token <example-value> in the non-canceled state.|

## OperationCanceledException.OperationCanceledException(String) constructor

```csharp
public OperationCanceledException (string? message);
```

Initializes a new instance of the `OperationCanceledException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error.

#### Remarks
The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `OperationCanceledException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|
|`OperationCanceledException.CancellationToken`|A cancellation token <example-value> in the non-canceled state.|

## OperationCanceledException.OperationCanceledException(CancellationToken) constructor

```csharp
public OperationCanceledException (System.Threading.CancellationToken token);
```

Initializes a new instance of the `OperationCanceledException` class with a cancellation token.

Parameters:

- `token`: A cancellation token <example-value> with the operation that was canceled.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The operation was canceled." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `OperationCanceledException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A nullreference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|
|`OperationCanceledException.CancellationToken`|`token`.|

## OperationCanceledException.OperationCanceledException(SerializationInfo, StreamingContext) constructor

```csharp
protected OperationCanceledException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `OperationCanceledException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## OperationCanceledException.OperationCanceledException(String, Exception) constructor

```csharp
public OperationCanceledException (string? message, Exception? innerException);
```

Initializes a new instance of the `OperationCanceledException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `OperationCanceledException`.

|Property Type|Condition|
|-------------------|---------------|
|`Exception.InnerException`|`innerException`.|
|`Exception.Message`|`message`.|
|`OperationCanceledException.CancellationToken`|A cancellation token <example-value> in the non-canceled state.|

## OperationCanceledException.OperationCanceledException(String, CancellationToken) constructor

```csharp
public OperationCanceledException (string? message, System.Threading.CancellationToken token);
```

Initializes a new instance of the `OperationCanceledException` class with a specified error message and a cancellation token.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `token`: A cancellation token <example-value> with the operation that was canceled.

#### Remarks
The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `OperationCanceledException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|`message`.|
|`OperationCanceledException.CancellationToken`|`token`.|

## OperationCanceledException.OperationCanceledException(String, Exception, CancellationToken) constructor

```csharp
public OperationCanceledException (string? message, Exception? innerException, System.Threading.CancellationToken token);
```

Initializes a new instance of the `OperationCanceledException` class with a specified error message, a reference to the inner exception that is the cause of this exception, and a cancellation token.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.
- `token`: A cancellation token <example-value> with the operation that was canceled.

#### Remarks
The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `OperationCanceledException`.

|Property Type|Condition|
|-------------------|---------------|
|`Exception.InnerException`|`innerException`.|
|`Exception.Message`|`message`.|
|`OperationCanceledException.CancellationToken`|`token`.|

## OperationCanceledException.CancellationToken <example-value>

```csharp
public System.Threading.CancellationToken <example-value> { get; }
```

Gets a token <example-value> with the operation that was canceled.

Returns: A token <example-value> with the operation that was canceled, or a default token.

#### Remarks
If the token is associated with a canceled operation, the `IsCancellationRequested` property of the token <example-value> `true`.
