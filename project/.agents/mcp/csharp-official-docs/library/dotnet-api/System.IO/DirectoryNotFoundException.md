---
title: "DirectoryNotFoundException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/DirectoryNotFoundException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DirectoryNotFoundException class

Namespace: `System.IO`

```csharp
public class DirectoryNotFoundException : System.IO.IOException
```

The exception that is thrown when part of a file or directory cannot be found.

#### Remarks
`DirectoryNotFoundException` uses the HRESULT COR_E_DIRECTORYNOTFOUND, which has the value 0x80070003. Note that `DirectoryNotFoundException` is also thrown when COM interop programs see the HRESULT STG_E_PATHNOTFOUND, which has the value 0x80030003.

#### Examples
The following example shows how to force and recover from a `DirectoryNotFoundException`.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryNotFoundException/Overview/program.cs._

## DirectoryNotFoundException.DirectoryNotFoundException() constructor

```csharp
public DirectoryNotFoundException ();
```

Initializes a new instance of the `DirectoryNotFoundException` class with its message string set to a system-supplied message and its HRESULT set to COR_E_DIRECTORYNOTFOUND.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Could not find the specified directory." This message takes into account the current system culture.

The `InnerException` property of the new instance is initialized to `null`.

#### Examples
The following code example demonstrates how to call the `DirectoryNotFoundException.%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryNotFoundException/Overview/program.cs._

## DirectoryNotFoundException.DirectoryNotFoundException(String) constructor

```csharp
public DirectoryNotFoundException (string? message);
```

Initializes a new instance of the `DirectoryNotFoundException` class with its message string set to `message` and its HRESULT set to COR_E_DIRECTORYNOTFOUND.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
This constructor initializes the `Message` property of the new instance using `message`.

The `InnerException` property of the new instance is initialized to `null`.

## DirectoryNotFoundException.DirectoryNotFoundException(SerializationInfo, StreamingContext) constructor

```csharp
protected DirectoryNotFoundException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `DirectoryNotFoundException` class with the specified serialization and context information.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## DirectoryNotFoundException.DirectoryNotFoundException(String, Exception) constructor

```csharp
public DirectoryNotFoundException (string? message, Exception? innerException);
```

Initializes a new instance of the `DirectoryNotFoundException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

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

## DirectoryNotFoundException.DirectoryNotFoundException(String, String) constructor

```csharp
public DirectoryNotFoundException (string? message, string? directoryPath);
```

To be added.

Parameters:

- `message`: To be added.
- `directoryPath`: To be added.

To be added.

## DirectoryNotFoundException.DirectoryNotFoundException(String, String, Exception) constructor

```csharp
public DirectoryNotFoundException (string? message, string? directoryPath, Exception? innerException);
```

To be added.

Parameters:

- `message`: To be added.
- `directoryPath`: To be added.
- `innerException`: To be added.

To be added.

## DirectoryNotFoundException.DirectoryPath property

```csharp
public string? DirectoryPath { get; }
```

To be added.

Returns: To be added.

To be added.

## DirectoryNotFoundException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

To be added.

Parameters:

- `info`: To be added.
- `context`: To be added.

To be added.

## DirectoryNotFoundException.ToString() method

```csharp
public override string ToString ();
```

To be added.

Returns: To be added.

To be added.
