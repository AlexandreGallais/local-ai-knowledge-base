---
title: "MemberAccessException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemberAccessException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberAccessException class

Namespace: `System`

```csharp
public class MemberAccessException : SystemException
```

The exception that is thrown when an attempt to access a class member fails.

#### Remarks
`MemberAccessException` is the base class for `FieldAccessException`, `MethodAccessException`, `MissingMemberException`, `MissingMethodException`, and `MissingFieldException`, and  (.NET Native only). These exceptions are thrown when a class member is not found or access to the member is not permitted.

`MemberAccessException` is thrown by the following methods:

`MethodBase.Invoke` of the `Reflection` classes, `FieldInfo.GetValue` of the `FieldInfo` class, and `Delegate.DynamicInvoke` of the `Delegate` class.

Apps compiled by using the .NET Native tool chain may throw a MissingRuntimeArtifactException exception at run time. `MissingRuntimeArtifactException` is an internal-only exception type derived from `MemberAccessException`. The exception indicates that metadata needed for the successful execution of an app is not present at run time. You should not use a `try`/`catch` block to handle the exception. Instead, you should determine what metadata is missing and modify your app's runtime directives file to ensure that it is present at run time.

`MemberAccessException` uses the HRESULT COR_E_MEMBERACCESS, that has the value 0x8013151A.

For a list of initial property values for an instance of `MemberAccessException`, see the `MemberAccessException` constructors.

## MemberAccessException.MemberAccessException() constructor

```csharp
public MemberAccessException ();
```

Initializes a new instance of the `MemberAccessException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Cannot access member." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `MemberAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## MemberAccessException.MemberAccessException(String) constructor

```csharp
public MemberAccessException (string? message);
```

Initializes a new instance of the `MemberAccessException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of `message` should be understood by the user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `MemberAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## MemberAccessException.MemberAccessException(SerializationInfo, StreamingContext) constructor

```csharp
protected MemberAccessException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `MemberAccessException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## MemberAccessException.MemberAccessException(String, Exception) constructor

```csharp
public MemberAccessException (string? message, Exception? inner);
```

Initializes a new instance of the `MemberAccessException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `MemberAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
