---
title: "MulticastNotSupportedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MulticastNotSupportedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MulticastNotSupportedException class

Namespace: `System`

```csharp
public sealed class MulticastNotSupportedException : SystemException
```

The exception that is thrown when there is an attempt to combine two delegates based on the `Delegate` type instead of the `MulticastDelegate` type. This class cannot be inherited.

#### Remarks
Only delegates based on the `MulticastDelegate` type can be combined. Two multicast delegates can be combined using the `MulticastDelegate.CombineImpl` method.

`MulticastNotSupportedException` uses the HRESULT COR_E_MULTICASTNOTSUPPORTED, which has the value 0x80131514.

For a list of initial property values for an instance of `MulticastNotSupportedException`, see the `MulticastNotSupportedException.%23ctor` constructors.

## MulticastNotSupportedException.MulticastNotSupportedException() constructor

```csharp
public MulticastNotSupportedException ();
```

Initializes a new instance of the `MulticastNotSupportedException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "This operation cannot be performed with the specified delegates." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `MulticastNotSupportedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## MulticastNotSupportedException.MulticastNotSupportedException(String) constructor

```csharp
public MulticastNotSupportedException (string? message);
```

Initializes a new instance of the `MulticastNotSupportedException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` parameter should be understandable to the user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `MulticastNotSupportedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## MulticastNotSupportedException.MulticastNotSupportedException(String, Exception) constructor

```csharp
public MulticastNotSupportedException (string? message, Exception? inner);
```

Initializes a new instance of the `MulticastNotSupportedException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `MulticastNotSupportedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
