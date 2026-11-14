---
title: "DriveNotFoundException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/DriveNotFoundException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DriveNotFoundException class

Namespace: `System.IO`

```csharp
public class DriveNotFoundException : System.IO.IOException
```

The exception that is thrown when trying to access a drive or share that is not available.

#### Remarks
The `DriveNotFoundException` class uses the HRESULT COR_E_DIRECTORYNOTFOUND. This exception can be thrown when a Win32 ERROR_PATH_NOT_FOUND HRESULT error is encountered.

## DriveNotFoundException.DriveNotFoundException() constructor

```csharp
public DriveNotFoundException ();
```

Initializes a new instance of the `DriveNotFoundException` class with its message string set to a system-supplied message and its HRESULT set to COR_E_DIRECTORYNOTFOUND.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Could not find the specified directory." This message is localized based on the current system culture.

The `InnerException` property of the new instance is initialized to `null`.

## DriveNotFoundException.DriveNotFoundException(String) constructor

```csharp
public DriveNotFoundException (string? message);
```

Initializes a new instance of the `DriveNotFoundException` class with the specified message string and the HRESULT set to COR_E_DIRECTORYNOTFOUND.

Parameters:

- `message`: A `String` object that describes the error. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
This constructor initializes the `Message` property of the new instance using the `message` parameter.

The `InnerException` property of the new instance is initialized to `null`.

## DriveNotFoundException.DriveNotFoundException(SerializationInfo, StreamingContext) constructor

```csharp
protected DriveNotFoundException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `DriveNotFoundException` class with the specified serialization and context information.

Parameters:

- `info`: A `SerializationInfo` object that contains the serialized object data about the exception being thrown.
- `context`: A `StreamingContext` object that contains contextual information about the source or destination of the exception being thrown.

To be added.

## DriveNotFoundException.DriveNotFoundException(String, Exception) constructor

```csharp
public DriveNotFoundException (string? message, Exception? innerException);
```

Initializes a new instance of the `DriveNotFoundException` class with the specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `DirectoryNotFoundException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
