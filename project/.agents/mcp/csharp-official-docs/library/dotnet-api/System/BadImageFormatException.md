---
title: "BadImageFormatException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/BadImageFormatException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BadImageFormatException class

Namespace: `System`

```csharp
public class BadImageFormatException : SystemException
```

The exception that is thrown when the file image of a dynamic link library (DLL) or an executable program is invalid.

#### Remarks
This exception is thrown when the file format of a dynamic link library (.dll file) or an executable (.exe file) doesn't conform to the format that the common language runtime expects. In particular, the exception is thrown under the following conditions:

- An earlier version of a .NET utility, such as ILDasm.exe or installutil.exe, is used with an assembly that was developed with a later version of .NET.

To address this exception, use the version of the tool that corresponds to the version of .NET that was used to develop the assembly. This may require modifying the `Path` environment variable or providing a fully qualified path to the correct executable.

- You are trying to load an unmanaged dynamic link library or executable (such as a Windows system DLL) as if it were a .NET assembly. The following example illustrates this by using the `Assembly.LoadFile` method to load Kernel32.dll.

_Code sample not included: ~/snippets/csharp/System/BadImageFormatException/Overview/condition1.cs._

To address this exception, access the methods defined in the DLL by using the features provided by your development language, such as the `Declare` statement in Visual Basic or the `DllImportAttribute` attribute with the `extern` keyword in C# and F#.

- You are trying to load a reference assembly in a context other than the reflection-only context. You can address this issue in either of two ways:

- You can load the implementation assembly rather than the reference assembly.
- You can load the reference assembly in the reflection-only context by calling the `Assembly.ReflectionOnlyLoad` method.

- A DLL or executable is loaded as a 64-bit assembly, but it contains 32-bit features or resources. For example, it relies on COM interop or calls methods in a 32-bit dynamic link library.

To address this exception, set the project's **Platform target** property to x86 (instead of x64 or AnyCPU) and recompile.

- Your application's components were created using different versions of .NET. The `BadImageFormatException` might be reported as a compile-time error, or it might be thrown at runtime. The following example defines a `StringLib` class that has a single member, `ToProperCase`, and that resides in an assembly named StringLib.dll.

_Code sample not included: ~/snippets/csharp/System/BadImageFormatException/Overview/stringlib.cs._

- The components of your application target different platforms. For example, you are trying to load ARM assemblies in an x86 application. You can use the following command-line utility to determine the target platforms of individual .NET assemblies. The list of files should be provided as a space-delimited list at the command line.

_Code sample not included: ~/snippets/csharp/System/BadImageFormatException/Overview/targetplatform1.cs._

- Reflecting on C++ executable files might throw this exception. This is most likely caused by the C++ compiler stripping the relocation addresses or the .Reloc section from the executable file. To preserve the .relocation address in a C++ executable file, specify /fixed:no when linking.

`BadImageFormatException` uses the HRESULT `COR_E_BADIMAGEFORMAT`, which has the value 0x8007000B.

For a list of initial property values for an instance of `BadImageFormatException`, see the `BadImageFormatException` constructors.

## BadImageFormatException.BadImageFormatException() constructor

```csharp
public BadImageFormatException ();
```

Initializes a new instance of the `BadImageFormatException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Format of the executable or library is invalid." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `BadImageFormatException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## BadImageFormatException.BadImageFormatException(String) constructor

```csharp
public BadImageFormatException (string? message);
```

Initializes a new instance of the `BadImageFormatException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `BadImageFormatException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## BadImageFormatException.BadImageFormatException(SerializationInfo, StreamingContext) constructor

```csharp
protected BadImageFormatException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `BadImageFormatException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## BadImageFormatException.BadImageFormatException(String, Exception) constructor

```csharp
public BadImageFormatException (string? message, Exception? inner);
```

Initializes a new instance of the `BadImageFormatException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not a null reference, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `BadImageFormatException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

## BadImageFormatException.BadImageFormatException(String, String) constructor

```csharp
public BadImageFormatException (string? message, string? fileName);
```

Initializes a new instance of the `BadImageFormatException` class with a specified error message and file name.

Parameters:

- `message`: A message that describes the error.
- `fileName`: The full name of the file with the invalid image.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

|Property|Value|
|--------------|-----------|
|`BadImageFormatException.FileName`|The full name of the file with the invalid image.|
|`BadImageFormatException.Message`|The error message string.|

## BadImageFormatException.BadImageFormatException(String, String, Exception) constructor

```csharp
public BadImageFormatException (string? message, string? fileName, Exception? inner);
```

Initializes a new instance of the `BadImageFormatException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `fileName`: The full name of the file with the invalid image.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `BadImageFormatException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`BadImageFormatException.FileName`|The full name of the file with the invalid image.|
|`BadImageFormatException.Message`|The error message string.|

## BadImageFormatException.FileName property

```csharp
public string? FileName { get; }
```

Gets the name of the file that causes this exception.

Returns: The name of the file with the invalid image, or a null reference if no file name was passed to the constructor for the current instance.

#### Remarks
This property returns the name of the file supplied to the constructor for the current instance, if any. If the file name was not specified or is a null reference (`Nothing` in Visual Basic), this property returns a null reference.

This property is read-only.

## BadImageFormatException.FusionLog property

```csharp
public string? FusionLog { get; }
```

Gets the log file that describes why an assembly load failed.

Returns: A `String` containing errors reported by the assembly cache.

To be added.

## BadImageFormatException.Message property

```csharp
public override string Message { get; }
```

Gets the error message and the name of the file that caused this exception.

Returns: A string containing the error message and the name of the file that caused this exception.

#### Remarks
If no message was supplied to the constructor for the current exception, this property returns a system-supplied error message. If the `FileName` property is not a null reference (`Nothing` in Visual Basic), the message includes the file name.

This property is read-only.

## BadImageFormatException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the file name, assembly cache log, and additional exception information.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

To be added.

## BadImageFormatException.ToString() method

```csharp
public override string ToString ();
```

Returns the fully qualified name of this exception and possibly the error message, the name of the inner exception, and the stack trace.

Returns: A string containing the fully qualified name of this exception and possibly the error message, the name of the inner exception, and the stack trace.

#### Remarks
The string representation returned by this method includes the name of the exception, the value of the `Message` property, the result of calling `ToString` on the inner exception, the value of the `FileName` property, and the result of calling `Environment.StackTrace`. If any of these members is a null reference (`Nothing` in Visual Basic), its value is not included in the returned string.
