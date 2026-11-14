---
title: "RuntimeFieldHandle struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/RuntimeFieldHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeFieldHandle struct

Namespace: `System`

```csharp
public struct RuntimeFieldHandle : IEquatable<RuntimeFieldHandle>, System.Runtime.Serialization.ISerializable
```

Represents a field using an internal metadata token.

#### Remarks
The value of an instance of the `RuntimeFieldHandle` structure is a handle to the field represented by the instance.

## RuntimeFieldHandle.Value property

```csharp
public IntPtr Value { get; }
```

Gets a handle to the field represented by the current instance.

Returns: An `IntPtr` that contains the handle to the field represented by the current instance.

To be added.

## RuntimeFieldHandle.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether the current instance is equal to the specified object.

Parameters:

- `obj`: The object to compare to the current instance.

Returns: `true` if `obj` is a `RuntimeFieldHandle` and equal to the value of the current instance; otherwise, `false`.

To be added.

## RuntimeFieldHandle.Equals(RuntimeFieldHandle) method

```csharp
public bool Equals (RuntimeFieldHandle handle);
```

Indicates whether the current instance is equal to the specified `RuntimeFieldHandle`.

Parameters:

- `handle`: The `RuntimeFieldHandle` to compare to the current instance.

Returns: `true` if the value of `handle` is equal to the value of the current instance; otherwise, `false`.

To be added.

## RuntimeFieldHandle.FromIntPtr(IntPtr) method

```csharp
public static RuntimeFieldHandle FromIntPtr (IntPtr value);
```

Returns a new `RuntimeFieldHandle` object created from a handle to a RuntimeFieldInfo.

Parameters:

- `value`: An IntPtr handle to a RuntimeFieldInfo to create a `RuntimeFieldHandle` object from.

Returns: A new `RuntimeFieldHandle` object that corresponds to the value parameter.

To be added.

## RuntimeFieldHandle.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer that is the hash code for this instance.

To be added.

## RuntimeFieldHandle.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` with the data necessary to deserialize the field represented by the current instance.

Parameters:

- `info`: The `SerializationInfo` object to populate with serialization information.
- `context`: (Reserved) The place to store and retrieve serialized data.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `SerializationException`: The `RuntimeFieldHandle.Value` property of the current instance is not a valid handle.

To be added.

## RuntimeFieldHandle.op_Equality(RuntimeFieldHandle, RuntimeFieldHandle) method

```csharp
public static bool operator == (RuntimeFieldHandle left, RuntimeFieldHandle right);
```

Indicates whether two `RuntimeFieldHandle` structures are equal.

Parameters:

- `left`: The `RuntimeFieldHandle` to compare to `right`.
- `right`: The `RuntimeFieldHandle` to compare to `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

The equivalent method for this operator is `Equals`.

## RuntimeFieldHandle.op_Inequality(RuntimeFieldHandle, RuntimeFieldHandle) method

```csharp
public static bool operator != (RuntimeFieldHandle left, RuntimeFieldHandle right);
```

Indicates whether two `RuntimeFieldHandle` structures are not equal.

Parameters:

- `left`: The `RuntimeFieldHandle` to compare to `right`.
- `right`: The `RuntimeFieldHandle` to compare to `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

The equivalent method for this operator is `Equals`.

## RuntimeFieldHandle.ToIntPtr(RuntimeFieldHandle) method

```csharp
public static IntPtr ToIntPtr (RuntimeFieldHandle value);
```

Returns the internal pointer representation of a `RuntimeFieldHandle` object.

Parameters:

- `value`: A `RuntimeFieldHandle` object to retrieve an internal pointer representation from.

Returns: An `IntPtr` object that represents a `RuntimeFieldHandle` object.

To be added.
