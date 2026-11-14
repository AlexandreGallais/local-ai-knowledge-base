---
title: "Pointer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Pointer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Pointer class

Namespace: `System.Reflection`

```csharp
public sealed class Pointer : System.Runtime.Serialization.ISerializable
```

Provides a wrapper class for pointers.

To be added.

## Pointer.Box(Void*, Type) method

```csharp
public static object Box (void* ptr, Type type);
```

Boxes the supplied unmanaged memory pointer and the type associated with that pointer into a managed `Pointer` wrapper object. The value and the type are saved so they can be accessed from the native code during an invocation.

Parameters:

- `ptr`: The supplied unmanaged memory pointer.
- `type`: The type associated with the `ptr` parameter.

Returns: A pointer object.

Exceptions:

- `ArgumentException`: `type` is not a pointer.
- `ArgumentNullException`: `type` is `null`.

To be added.

## Pointer.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current object is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

To be added.

## Pointer.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current object.

Returns: A 32-bit signed integer hash code.

To be added.

## Pointer.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the file name, fusion log, and additional exception information.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.

## Pointer.Unbox(Object) method

```csharp
public static void* Unbox (object ptr);
```

Returns the stored pointer.

Parameters:

- `ptr`: The stored pointer.

Returns: This method returns void.

Exceptions:

- `ArgumentException`: `ptr` is not a pointer.

To be added.
