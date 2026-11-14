---
title: "MethodAccessException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MethodAccessException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodAccessException class

Namespace: `System`

```csharp
public class MethodAccessException : MemberAccessException
```

The exception that is thrown when there is an invalid attempt to access a method.

#### Remarks

This exception is thrown in situations such as the following:

- A security-critical method is accessed from transparent code.
- The access level of a method in a class library has changed, and one or more assemblies that reference the library have not been recompiled.

`MethodAccessException` uses the HRESULT COR_E_METHODACCESS, that has the value 0x80131510.

For a list of initial property values for an instance of `MethodAccessException`, see the `MethodAccessException.%23ctor` constructors.

## MethodAccessException.MethodAccessException() constructor

```csharp
public MethodAccessException ();
```

Initializes a new instance of the `MethodAccessException` class, setting the `Exception.Message` property of the new instance to a system-supplied message that describes the error, such as "Attempt to access the method failed." This message takes into account the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `MethodAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## MethodAccessException.MethodAccessException(String) constructor

```csharp
public MethodAccessException (string? message);
```

Initializes a new instance of the `MethodAccessException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error.

#### Remarks
The content of `message` should be understandable to the user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `MethodAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## MethodAccessException.MethodAccessException(SerializationInfo, StreamingContext) constructor

```csharp
protected MethodAccessException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `MethodAccessException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## MethodAccessException.MethodAccessException(String, Exception) constructor

```csharp
public MethodAccessException (string? message, Exception? inner);
```

Initializes a new instance of the `MethodAccessException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `MethodAccessException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
