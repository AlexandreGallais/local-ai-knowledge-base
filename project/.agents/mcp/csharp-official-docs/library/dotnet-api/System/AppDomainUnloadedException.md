---
title: "AppDomainUnloadedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AppDomainUnloadedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AppDomainUnloadedException class

Namespace: `System`

```csharp
public class AppDomainUnloadedException : SystemException
```

The exception that is thrown when an attempt is made to access an unloaded application domain.

#### Remarks

An `AppDomainUnloadedException` that is not handled in user code has the following effect:

- If a thread was started in managed code, it is terminated. The unhandled exception is not allowed to terminate the application.
- If a task is executing on a `ThreadPool` thread, it is terminated and the thread is returned to the thread pool. The unhandled exception is not allowed to terminate the application.
- If a thread started in unmanaged code, such as the main application thread, it is terminated. The unhandled exception is allowed to proceed, and the operating system terminates the application.

`AppDomainUnloadedException` uses the HRESULT COR_E_APPDOMAINUNLOADED, which has the value 0x80131014.

For a list of initial property values for an instance of `AppDomainUnloadedException`, see the `AppDomainUnloadedException.%23ctor` constructors.

## AppDomainUnloadedException.AppDomainUnloadedException() constructor

```csharp
public AppDomainUnloadedException ();
```

Initializes a new instance of the `AppDomainUnloadedException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The target application domain has been unloaded." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `AppDomainUnloadedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## AppDomainUnloadedException.AppDomainUnloadedException(String) constructor

```csharp
public AppDomainUnloadedException (string? message);
```

Initializes a new instance of the `AppDomainUnloadedException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `AppDomainUnloadedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## AppDomainUnloadedException.AppDomainUnloadedException(SerializationInfo, StreamingContext) constructor

```csharp
protected AppDomainUnloadedException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `AppDomainUnloadedException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## AppDomainUnloadedException.AppDomainUnloadedException(String, Exception) constructor

```csharp
public AppDomainUnloadedException (string? message, Exception? innerException);
```

Initializes a new instance of the `AppDomainUnloadedException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The message that describes the error.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `AppDomainUnloadedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
