---
title: "FileLoadException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileLoadException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileLoadException class

Namespace: `System.IO`

```csharp
public class FileLoadException : System.IO.IOException
```

The exception that is thrown when a managed assembly is found but cannot be loaded.

#### Remarks
Represents the error that occurs when a `Assembly` file is found but cannot be loaded.

The `FileNotFoundException` exception is thrown when the file fails to load because it cannot be located. If the file is located, but cannot be loaded due to insufficient permissions, a `SecurityException` is thrown.

`FileLoadException` has the default HRESULT of COR_E_FILELOAD, which has the value 0x80131621, but this is not the only possible HRESULT.

The exact timing of when static assembly references are loaded is unspecified. This exception may be thrown before the method that statically references the assembly that failed to load starts executing.

**Associated Tips**

**Make sure that the file is a valid .NET assembly.**
This exception is thrown if the file is not a valid .NET assembly. For more information, see `Assembly`.

**Check to make sure an assembly or module was not loaded twice with two different evidences.**
Evidence is the set of information that constitutes input to security policy decisions, such as what permissions can be granted to code. For more information, see `Publish.GacRemove` and `Assembly.Evidence`

**If using the `IComSoapPublisher.RegisterAssembly` or `IComSoapPublisher.UnRegisterAssembly` methods, check to make sure the assembly name is not longer than the system-defined maximum length.**
The assembly name's length cannot exceed the system-defined maximum. For more information, see `PathTooLongException`.

**If loading a satellite assembly, make sure the specified CultureInfo matches the file's CultureInfo.**
Satellite assemblies contain localized resources which contain non-localizable executable code and resources for a single culture that serve as the default or neutral culture. For more information, see `Assembly.GetSatelliteAssembly`.

## FileLoadException.FileLoadException() constructor

```csharp
public FileLoadException ();
```

Initializes a new instance of the `FileLoadException` class, setting the `Exception.Message` property of the new instance to a system-supplied message that describes the error, such as "Could not load the specified file." This message takes into account the current system culture.

#### Remarks
The `InnerException` property and `FileName` property of the new instance are initialized to `null`.

## FileLoadException.FileLoadException(String) constructor

```csharp
public FileLoadException (string? message);
```

Initializes a new instance of the `FileLoadException` class with the specified error message.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
This constructor initializes the `Message` property of the new instance using `message`. The `InnerException` property and `FileName` property of the new instance are initialized to `null`.

## FileLoadException.FileLoadException(SerializationInfo, StreamingContext) constructor

```csharp
protected FileLoadException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `FileLoadException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## FileLoadException.FileLoadException(String, Exception) constructor

```csharp
public FileLoadException (string? message, Exception? inner);
```

Initializes a new instance of the `FileLoadException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `FileLoadException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`FileLoadException.Message`|The error message string.|

For more information on inner exceptions, see `Exception.InnerException`.

## FileLoadException.FileLoadException(String, String) constructor

```csharp
public FileLoadException (string? message, string? fileName);
```

Initializes a new instance of the `FileLoadException` class with a specified error message and the name of the file that could not be loaded.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `fileName`: A `String` containing the name of the file that was not loaded.

#### Remarks
This constructor initializes the `Message` property of the new instance using `message` and the `FileName` property using `fileName`. The `InnerException` property of the new instance is initialized to `null`.

`FileLoadException.FileName` is not required to be a file stored on disk; it can be any part of a system that supports access to streams. For example, depending on the system, this class might be able to access a physical device.

## FileLoadException.FileLoadException(String, String, Exception) constructor

```csharp
public FileLoadException (string? message, string? fileName, Exception? inner);
```

Initializes a new instance of the `FileLoadException` class with a specified error message, the name of the file that could not be loaded, and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `fileName`: A `String` containing the name of the file that was not loaded.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

`FileLoadException.FileName` is not required to be a file stored on disk; it can be any part of a system that supports access to streams. For example, depending on the system, this class might be able to access a physical device.

The following table shows the initial property values for an instance of `FileLoadException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`FileLoadException.Message`|The error message string.|

For more information on inner exceptions, see `Exception.InnerException`.

## FileLoadException.FileName property

```csharp
public string? FileName { get; }
```

Gets the name of the file that causes this exception.

Returns: A `String` containing the name of the file with the invalid image, or a null reference if no file name was passed to the constructor for the current instance.

#### Remarks
This property returns the name of the file supplied to the constructor for the current instance, if any. If the file name was not specified or is a null reference, this property returns a null reference.

This property is read-only.

## FileLoadException.FusionLog property

```csharp
public string? FusionLog { get; }
```

Gets the log file that describes why an assembly load failed.

Returns: A string containing errors reported by the assembly cache.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

To be added.

## FileLoadException.Message property

```csharp
public override string Message { get; }
```

Gets the error message and the name of the file that caused this exception.

Returns: A string containing the error message and the name of the file that caused this exception.

#### Remarks
This property overrides `Exception.Message`.

If no message was supplied to the constructor for the current exception, this property returns a system-supplied error message. If the `FileName` property is not a null reference, the message includes the file name, for example, "Unable to load file a `FileName`." (a `FileName` represents the value returned by `FileLoadException.FileName`.) If `FileLoadException.FileName` is `null`, this is indicated in the system-supplied message as "(null)". The system-supplied message takes into account the current system culture.

This property is read-only.

## FileLoadException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` with the file name and additional exception information.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

To be added.

## FileLoadException.ToString() method

```csharp
public override string ToString ();
```

Returns the fully qualified name of the current exception, and possibly the error message, the name of the inner exception, and the stack trace.

Returns: A string containing the fully qualified name of this exception, and possibly the error message, the name of the inner exception, and the stack trace, depending on which `FileLoadException` constructor is used.

#### Remarks
This method overrides `Object.ToString`.

The string representation returned by this method includes the name of the exception, the value of the `FileLoadException.Message` the value of the `FileName` property, and the result of calling `Environment.StackTrace`. If any of these members is a null reference, its value is not included in the returned string.
