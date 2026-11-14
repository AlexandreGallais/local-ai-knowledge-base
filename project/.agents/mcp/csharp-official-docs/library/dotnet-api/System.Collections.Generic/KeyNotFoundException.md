---
title: "KeyNotFoundException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/KeyNotFoundException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeyNotFoundException class

Namespace: `System.Collections.Generic`

```csharp
public class KeyNotFoundException : SystemException
```

The exception that is thrown when the key <example-value> for accessing an element in a collection does not match any key in the collection.

#### Remarks
A `KeyNotFoundException` is thrown when an operation attempts to retrieve an element from a collection using a key that does not exist in that collection.

`KeyNotFoundException` uses the HRESULT COR_E_KEYNOTFOUND, which has the value 0x80131577.

For a list of initial property values for an instance of the `KeyNotFoundException` class, see the `KeyNotFoundException.%23ctor` constructors.

## KeyNotFoundException.KeyNotFoundException() constructor

```csharp
public KeyNotFoundException ();
```

Initializes a new instance of the `KeyNotFoundException` class using default property values.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "The given key was not present in the dictionary." This message takes into account the current system culture.

The following table shows the initial property values for an instance of the `KeyNotFoundException` class.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## KeyNotFoundException.KeyNotFoundException(String) constructor

```csharp
public KeyNotFoundException (string? message);
```

Initializes a new instance of the `KeyNotFoundException` class with the specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of the `KeyNotFoundException` class.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## KeyNotFoundException.KeyNotFoundException(SerializationInfo, StreamingContext) constructor

```csharp
protected KeyNotFoundException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `KeyNotFoundException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## KeyNotFoundException.KeyNotFoundException(String, Exception) constructor

```csharp
public KeyNotFoundException (string? message, Exception? innerException);
```

Initializes a new instance of the `KeyNotFoundException` class with the specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of the `KeyNotFoundException` class.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The localized error message string.|
