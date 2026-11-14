---
title: "FileFormatException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileFormatException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileFormatException class

Namespace: `System.IO`

```csharp
public class FileFormatException : FormatException
```

The exception that is thrown when an input file or a data stream that is supposed to conform to a certain file format specification is malformed.

To be added.

## FileFormatException.FileFormatException() constructor

```csharp
public FileFormatException ();
```

Creates a new instance of the `FileFormatException` class.

#### Remarks
This constructor uses a default system message that describes the error, such as "An input file or a data stream does not conform to the expected file format specification." This message takes into account the current system culture.

## FileFormatException.FileFormatException(String) constructor

```csharp
public FileFormatException (string? message);
```

Creates a new instance of the `FileFormatException` class with a specified error message.

Parameters:

- `message`: A `String` value that represents the error message.

To be added.

## FileFormatException.FileFormatException(Uri) constructor

```csharp
public FileFormatException (Uri? sourceUri);
```

Creates a new instance of the `FileFormatException` class with a source URI value.

Parameters:

- `sourceUri`: The `Uri` value of the file that caused this error.

#### Remarks
This constructor initializes the `Message` property of the new `FileFormatException` instance to a system-supplied message that describes the error and includes the file name, such as "The file '`sourceUri`' does not conform to the expected file format specification." This message takes into account the current system culture.

The `SourceUri` property is initialized using the `sourceUri` parameter.

## FileFormatException.FileFormatException(SerializationInfo, StreamingContext) constructor

```csharp
protected FileFormatException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Creates a new instance of the `FileFormatException` class and initializes it with serialized data. This constructor is called during deserialization to reconstitute the exception object transmitted over a stream.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## FileFormatException.FileFormatException(String, Exception) constructor

```csharp
public FileFormatException (string? message, Exception? innerException);
```

Creates a new instance of the `FileFormatException` class with a specified error message and exception type.

Parameters:

- `message`: A `String` value that represents the error message.
- `innerException`: The value of the `Exception.InnerException` property, which represents the cause of the current exception.

#### Remarks
This constructor initializes the `Message` property of the new `FileFormatException` instance with the specified error message represented by `message`.

## FileFormatException.FileFormatException(Uri, Exception) constructor

```csharp
public FileFormatException (Uri? sourceUri, Exception? innerException);
```

Creates a new instance of the `FileFormatException` class with a source URI value and an exception type.

Parameters:

- `sourceUri`: The `Uri` value of the file that caused this error.
- `innerException`: The value of the `Exception.InnerException` property, which represents the cause of the current exception.

#### Remarks
This constructor initializes the Message property of the new instance to a system-supplied message that describes the error and includes the file name, such as "The file '`sourceUri`' does not conform to the expected file format specification." This message takes into account the current system culture.

The `SourceUri` property is initialized using the `sourceUri` parameter.

## FileFormatException.FileFormatException(Uri, String) constructor

```csharp
public FileFormatException (Uri? sourceUri, string? message);
```

Creates a new instance of the `FileFormatException` class with a source URI value and a specified error message.

Parameters:

- `sourceUri`: The `Uri` value of the file that caused this error.
- `message`: A `String` value that represents the error message.

#### Remarks
This constructor initializes the `Message` property of the new `FileFormatException` instance with the specified error message represented by `message`. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The `SourceUri` property is initialized using the `sourceUri` parameter.

## FileFormatException.FileFormatException(Uri, String, Exception) constructor

```csharp
public FileFormatException (Uri? sourceUri, string? message, Exception? innerException);
```

Creates a new instance of the `FileFormatException` class with a source URI value, a specified error message, and an exception type.

Parameters:

- `sourceUri`: The `Uri` value of the file that caused this error.
- `message`: A `String` value that represents the error message.
- `innerException`: The value of the `Exception.InnerException` property, which represents the cause of the current exception.

#### Remarks
This constructor initializes the Message property of the new instance using the message parameter. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The `SourceUri` property is initialized using the `sourceUri` parameter.

## FileFormatException.SourceUri property

```csharp
public Uri? SourceUri { get; }
```

Gets the name of a file that caused the `FileFormatException`.

Returns: A `Uri` that represents the name the file that caused the exception.

#### Remarks
If there was an error in obtaining the name the file that caused the exception, the return value is `null`, and SourceUri.`Object.ToString` returns an empty string.

## FileFormatException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the file name and additional exception information.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.
