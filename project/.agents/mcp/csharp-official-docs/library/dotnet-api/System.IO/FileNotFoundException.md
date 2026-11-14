---
title: "FileNotFoundException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileNotFoundException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileNotFoundException class

Namespace: `System.IO`

```csharp
public class FileNotFoundException : System.IO.IOException
```

The exception that is thrown when an attempt to access a file that does not exist on disk fails.

#### Remarks
`FileNotFoundException` uses the HRESULT COR_E_FILENOTFOUND, which has the value 0x80070002.

## FileNotFoundException.FileNotFoundException() constructor

```csharp
public FileNotFoundException ();
```

Initializes a new instance of the `FileNotFoundException` class with its message string set to a system-supplied message.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Could not find the specified file." This message takes into account the current system culture.

## FileNotFoundException.FileNotFoundException(String) constructor

```csharp
public FileNotFoundException (string? message);
```

Initializes a new instance of the `FileNotFoundException` class with a specified error message.

Parameters:

- `message`: A description of the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
This constructor initializes the `Message` property of the new instance using `message`.

## FileNotFoundException.FileNotFoundException(SerializationInfo, StreamingContext) constructor

```csharp
protected FileNotFoundException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `FileNotFoundException` class with the specified serialization and context information.

Parameters:

- `info`: An object that holds the serialized object data about the exception being thrown.
- `context`: An object that contains contextual information about the source or destination.

To be added.

## FileNotFoundException.FileNotFoundException(String, Exception) constructor

```csharp
public FileNotFoundException (string? message, Exception? innerException);
```

Initializes a new instance of the `FileNotFoundException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: A description of the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `FileNotFoundException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

For more information on inner exceptions, see `Exception.InnerException`.

## FileNotFoundException.FileNotFoundException(String, String) constructor

```csharp
public FileNotFoundException (string? message, string? fileName);
```

Initializes a new instance of the `FileNotFoundException` class with a specified error message, and the file name that cannot be found.

Parameters:

- `message`: A description of the error, or `null` to use a system-supplied message with the given `fileName`. The content of `message` should be understood by humans. The caller of this constructor must ensure that this string has been localized for the current system culture.
- `fileName`: The full name of the file with the invalid image.

#### Remarks
The constructor initializes the `Message` property of the new instance using `message` and the `FileName` property using `fileName`.

## FileNotFoundException.FileNotFoundException(String, String, Exception) constructor

```csharp
public FileNotFoundException (string? message, string? fileName, Exception? innerException);
```

Initializes a new instance of the `FileNotFoundException` class with a specified error message, the file name that cannot be found, and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `fileName`: The full name of the file with the invalid image.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `FileNotFoundException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

For more information on inner exceptions, see `Exception.InnerException`.

## FileNotFoundException.FileName property

```csharp
public string? FileName { get; }
```

Gets the name of the file that cannot be found.

Returns: The name of the file, or `null` if no file name was passed to the constructor for this instance.

#### Remarks
This property is read-only.

## FileNotFoundException.FusionLog property

```csharp
public string? FusionLog { get; }
```

Gets the log file that describes why loading of an assembly failed.

Returns: The errors reported by the assembly cache.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

To be added.

## FileNotFoundException.Message property

```csharp
public override string Message { get; }
```

Gets the error message that explains the reason for the exception.

Returns: The error message.

#### Remarks
If no message was supplied to the constructor for the current exception, this property returns a system-supplied error message. If the `FileName` property is not `null`, the message includes the file name.

This property is read-only.

## FileNotFoundException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the file name and additional exception information.

Parameters:

- `info`: The object that holds the serialized object data about the exception being thrown.
- `context`: The object that contains contextual information about the source or destination.

To be added.

## FileNotFoundException.ToString() method

```csharp
public override string ToString ();
```

Returns the fully qualified name of this exception and possibly the error message, the name of the inner exception, and the stack trace.

Returns: The fully qualified name of this exception and possibly the error message, the name of the inner exception, and the stack trace.

#### Remarks
This method overrides `Object.ToString`.

The string representation returned by this method includes the name of the exception, the value of the `Message` property, the result of calling ToString on the inner exception, the value of the `FileName` property, and the result of calling `Environment.StackTrace`. If any of these members is a null reference, its value is not included in the returned string.
