---
title: "PlatformNotSupportedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/PlatformNotSupportedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PlatformNotSupportedException class

Namespace: `System`

```csharp
public class PlatformNotSupportedException : NotSupportedException
```

The exception that is thrown when a feature does not run on a particular platform.

#### Remarks
`PlatformNotSupportedException` uses the HRESULT COR_E_PLATFORMNOTSUPPORTED, which has the value 0x80131539.

## PlatformNotSupportedException.PlatformNotSupportedException() constructor

```csharp
public PlatformNotSupportedException ();
```

Initializes a new instance of the `PlatformNotSupportedException` class with default properties.

#### Remarks
When an instance of the `PlatformNotSupportedException` class is created by a call to this constructor, the following properties are initialized to the specified values:

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The empty string.|

## PlatformNotSupportedException.PlatformNotSupportedException(String) constructor

```csharp
public PlatformNotSupportedException (string? message);
```

Initializes a new instance of the `PlatformNotSupportedException` class with a specified error message.

Parameters:

- `message`: The text message that explains the reason for the exception.

#### Remarks
When an instance of the `PlatformNotSupportedException` class is created by a call to this constructor, the following properties are initialized to the specified values:

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

## PlatformNotSupportedException.PlatformNotSupportedException(SerializationInfo, StreamingContext) constructor

```csharp
protected PlatformNotSupportedException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `PlatformNotSupportedException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## PlatformNotSupportedException.PlatformNotSupportedException(String, Exception) constructor

```csharp
public PlatformNotSupportedException (string? message, Exception? inner);
```

Initializes a new instance of the `PlatformNotSupportedException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `PlatformNotSupportedException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
