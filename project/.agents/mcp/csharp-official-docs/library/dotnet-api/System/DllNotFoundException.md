---
title: "DllNotFoundException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DllNotFoundException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DllNotFoundException class

Namespace: `System`

```csharp
public class DllNotFoundException : TypeLoadException
```

The exception that is thrown when a DLL specified in a DLL import cannot be found.

#### Remarks
`DllNotFoundException` uses the HRESULT COR_E_DLLNOTFOUND, which has the value 0x80131524.

For a list of initial property values for an instance of `DllNotFoundException`, see the `DllNotFoundException.%23ctor` constructors.

The `DllNotFoundException` is thrown when a dynamic link library defined by the `DllImportAttribute` attribute or a comparable language construct, such as the Visual Basic `Declare` statement, cannot be found. It is not thrown when the common language runtime is unable to load a .NET assembly.

Note that the `DllImportAttribute` can specify the path to the directory in which the DLL resides. If a path is not specified, Windows uses the search order described in Dynamic-Link Library Search Order.

## DllNotFoundException.DllNotFoundException() constructor

```csharp
public DllNotFoundException ();
```

Initializes a new instance of the `DllNotFoundException` class with default properties.

#### Remarks
The following table shows the initial property values for an instance of `DllNotFoundException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`TypeLoadException.Message`|The localized error message string.|

## DllNotFoundException.DllNotFoundException(String) constructor

```csharp
public DllNotFoundException (string? message);
```

Initializes a new instance of the `DllNotFoundException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `DllNotFoundException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`TypeLoadException.Message`|The error message string.|

## DllNotFoundException.DllNotFoundException(SerializationInfo, StreamingContext) constructor

```csharp
protected DllNotFoundException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `DllNotFoundException` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## DllNotFoundException.DllNotFoundException(String, Exception) constructor

```csharp
public DllNotFoundException (string? message, Exception? inner);
```

Initializes a new instance of the `DllNotFoundException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `DllNotFoundException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`TypeLoadException.Message`|The error message string.|
