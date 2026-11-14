---
title: "NetworkInformationException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkInformationException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkInformationException class

Namespace: `System.Net.NetworkInformation`

```csharp
public class NetworkInformationException : System.ComponentModel.Win32Exception
```

The exception that is thrown when an error occurs while retrieving network information.

#### Remarks
Types in the `NetworkInformation` namespace throw this exception when a call to a `Win32` function fails. The `ErrorCode` property contains the result returned by the function.

## NetworkInformationException.NetworkInformationException() constructor

```csharp
public NetworkInformationException ();
```

Initializes a new instance of the `NetworkInformationException` class.

#### Remarks
This constructor sets the `ErrorCode` property to the most recent `Win32` error.

## NetworkInformationException.NetworkInformationException(Int32) constructor

```csharp
public NetworkInformationException (int errorCode);
```

Initializes a new instance of the `NetworkInformationException` class with the specified error code.

Parameters:

- `errorCode`: A `Win32` error code.

#### Remarks
This constructor sets the value of the `ErrorCode` property to `errorCode`.

## NetworkInformationException.NetworkInformationException(SerializationInfo, StreamingContext) constructor

```csharp
protected NetworkInformationException (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `NetworkInformationException` class with serialized data.

Parameters:

- `serializationInfo`: A SerializationInfo object that contains the serialized exception data.
- `streamingContext`: A StreamingContext that contains contextual information about the serialized exception.

To be added.

## NetworkInformationException.ErrorCode property

```csharp
public override int ErrorCode { get; }
```

Gets the `Win32` error code for this exception.

Returns: An `Int32` value that contains the `Win32` error code.

#### Remarks
The value of this property is set by the constructor. This property is overridden to return a `Win32` error code instead of an HRESULT value.
