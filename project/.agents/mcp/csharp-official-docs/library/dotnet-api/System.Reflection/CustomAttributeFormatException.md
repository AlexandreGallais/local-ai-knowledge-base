---
title: "CustomAttributeFormatException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/CustomAttributeFormatException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomAttributeFormatException class

Namespace: `System.Reflection`

```csharp
public class CustomAttributeFormatException : FormatException
```

The exception that is thrown when the binary format of a custom attribute is invalid.

#### Remarks
`CustomAttributeFormatException` uses the HRESULT COR_E_FORMAT, which has the value 0x80131537.

`CustomAttributeFormatException` is thrown if a custom attribute on a data type is formatted incorrectly, possibly because of a bug in the tool used to create the data type.

## CustomAttributeFormatException.CustomAttributeFormatException() constructor

```csharp
public CustomAttributeFormatException ();
```

Initializes a new instance of the `CustomAttributeFormatException` class with the default properties.

#### Remarks
This constructor initializes an instance of `CustomAttributeFormatException` with an empty message string and the root cause exception set to `null`.

This constructor sets the properties of the `Exception` object as follows:

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|null|
|`Exception.Message`|The empty string ("").|

## CustomAttributeFormatException.CustomAttributeFormatException(String) constructor

```csharp
public CustomAttributeFormatException (string? message);
```

Initializes a new instance of the `CustomAttributeFormatException` class with the specified message.

Parameters:

- `message`: The message that indicates the reason this exception was thrown.

#### Remarks
This constructor sets the properties of the Exception object as follows:

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`|

## CustomAttributeFormatException.CustomAttributeFormatException(SerializationInfo, StreamingContext) constructor

```csharp
protected CustomAttributeFormatException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `CustomAttributeFormatException` class with the specified serialization and context information.

Parameters:

- `info`: The data for serializing or deserializing the custom attribute.
- `context`: The source and destination for the custom attribute.

To be added.

## CustomAttributeFormatException.CustomAttributeFormatException(String, Exception) constructor

```csharp
public CustomAttributeFormatException (string? message, Exception? inner);
```

Initializes a new instance of the `CustomAttributeFormatException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `CustomAttributeFormatException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The `inner` exception.|
|`Exception.Message`|The error message string.|
