---
title: "StrongNameKeyPair class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/StrongNameKeyPair.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StrongNameKeyPair class

Namespace: `System.Reflection`

```csharp
public class StrongNameKeyPair : System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Encapsulates access to a public or private key pair used to sign strong name assemblies.

To be added.

## StrongNameKeyPair.StrongNameKeyPair(Byte[]) constructor

```csharp
public StrongNameKeyPair (byte[] keyPairArray);
```

Initializes a new instance of the `StrongNameKeyPair` class, building the key pair from a `byte` array.

Parameters:

- `keyPairArray`: An array of type `byte` containing the key pair.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## StrongNameKeyPair.StrongNameKeyPair(FileStream) constructor

```csharp
public StrongNameKeyPair (System.IO.FileStream keyPairFile);
```

Initializes a new instance of the `StrongNameKeyPair` class, building the key pair from a `FileStream`.

Parameters:

- `keyPairFile`: A `FileStream` containing the key pair.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## StrongNameKeyPair.StrongNameKeyPair(String) constructor

```csharp
public StrongNameKeyPair (string keyPairContainer);
```

Initializes a new instance of the `StrongNameKeyPair` class, building the key pair from a `String`.

Parameters:

- `keyPairContainer`: A string containing the key pair.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## StrongNameKeyPair.StrongNameKeyPair(SerializationInfo, StreamingContext) constructor

```csharp
protected StrongNameKeyPair (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `StrongNameKeyPair` class, building the key pair from serialized data.

Parameters:

- `info`: A `SerializationInfo` object that holds the serialized object data.
- `context`: A `StreamingContext` object that contains contextual information about the source or destination.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## StrongNameKeyPair.PublicKey <example-value>

```csharp
public byte[] PublicKey { get; }
```

Gets the public part of the public key or public key token of the key pair.

Returns: An array of type `byte` containing the public key or public key token of the key pair.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## StrongNameKeyPair.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Runs when the entire object graph has been deserialized.

Parameters:

- `sender`: The object that initiated the callback.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## StrongNameKeyPair.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with all the data required to reinstantiate the current `StrongNameKeyPair` object.

Parameters:

- `info`: The object to be populated with serialization information.
- `context`: The destination context of the serialization.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.
