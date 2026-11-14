---
title: "IOException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/IOException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOException class

Namespace: `System.IO`

```csharp
public class IOException : SystemException
```

The exception that is thrown when an I/O error occurs.

#### Remarks
`IOException` is the base class for exceptions thrown while accessing information using streams, files and directories.

The Base Class Library includes the following types, each of which is a derived class of `IOException` :

-   `DirectoryNotFoundException`
-   `EndOfStreamException`
-   `FileNotFoundException`
-   `FileLoadException`
-   `PathTooLongException`

Where appropriate, use these types instead of IOException.

`IOException` uses the HRESULT COR_E_IO, which has the value 0x80131620.

#### Examples
This code example is part of a larger example provided for the `FileStream.Lock` method.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/fstreamlock.cs._

## IOException.IOException() constructor

```csharp
public IOException ();
```

Initializes a new instance of the `IOException` class with its message string set to the empty string (""), its HRESULT set to COR_E_IO, and its inner exception set to a null reference.

#### Remarks
The constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "An I/O error occurred while performing the requested operation." This message takes into account the current system culture.

## IOException.IOException(String) constructor

```csharp
public IOException (string? message);
```

Initializes a new instance of the `IOException` class with its message string set to `message`, its HRESULT set to COR_E_IO, and its inner exception set to `null`.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
The constructor initializes the `Message` property of the new instance using `message`.

## IOException.IOException(SerializationInfo, StreamingContext) constructor

```csharp
protected IOException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `IOException` class with the specified serialization and context information.

Parameters:

- `info`: The data for serializing or deserializing the object.
- `context`: The source and destination for the object.

To be added.

## IOException.IOException(String, Exception) constructor

```csharp
public IOException (string? message, Exception? innerException);
```

Initializes a new instance of the `IOException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `IOException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

For more information on inner exceptions, see `Exception.InnerException`.

## IOException.IOException(String, Int32) constructor

```csharp
public IOException (string? message, int hresult);
```

Initializes a new instance of the `IOException` class with its message string set to `message` and its HRESULT user-defined.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `hresult`: An integer identifying the error that has occurred.

To be added.
