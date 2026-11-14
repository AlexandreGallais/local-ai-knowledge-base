---
title: "CannotUnloadAppDomainException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/CannotUnloadAppDomainException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CannotUnloadAppDomainException class

Namespace: `System`

```csharp
public class CannotUnloadAppDomainException : SystemException
```

The exception that is thrown when an attempt to unload an application domain fails.

#### Remarks
`CannotUnloadAppDomainException` is thrown when there is an attempt to unload the following:

- The default application domain, which must remain loaded during the lifetime of the application.
- An application domain with a running thread that cannot immediately stop execution.
- An application domain that has already been unloaded.

`CannotUnloadAppDomainException` uses the HRESULT COR_E_CANNOTUNLOADAPPDOMAIN, which has the value 0x80131015.

For a list of initial property values for an instance of `CannotUnloadAppDomainException`, see the `CannotUnloadAppDomainException.%23ctor` constructors.

## CannotUnloadAppDomainException.CannotUnloadAppDomainException() constructor

```csharp
public CannotUnloadAppDomainException ();
```

Initializes a new instance of the `CannotUnloadAppDomainException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Attempt to unload the AppDomain failed." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `CannotUnloadAppDomainException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## CannotUnloadAppDomainException.CannotUnloadAppDomainException(String) constructor

```csharp
public CannotUnloadAppDomainException (string? message);
```

Initializes a new instance of the `CannotUnloadAppDomainException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `CannotUnloadAppDomainException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## CannotUnloadAppDomainException.CannotUnloadAppDomainException(SerializationInfo, StreamingContext) constructor

```csharp
protected CannotUnloadAppDomainException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `CannotUnloadAppDomainException` class from serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## CannotUnloadAppDomainException.CannotUnloadAppDomainException(String, Exception) constructor

```csharp
public CannotUnloadAppDomainException (string? message, Exception? innerException);
```

Initializes a new instance of the `CannotUnloadAppDomainException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `CannotUnloadAppDomainException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
