---
title: "RuntimeMethodHandle struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/RuntimeMethodHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeMethodHandle struct

Namespace: `System`

```csharp
public struct RuntimeMethodHandle : IEquatable<RuntimeMethodHandle>, System.Runtime.Serialization.ISerializable
```

`RuntimeMethodHandle` is a handle to the internal metadata representation of a method.

To be added.

## RuntimeMethodHandle.Value property

```csharp
public IntPtr Value { get; }
```

Gets the value of this instance.

Returns: A `RuntimeMethodHandle` that is the internal metadata representation of a method.

To be added.

## RuntimeMethodHandle.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: A `Object` to compare to this instance.

Returns: `true` if `obj` is a `RuntimeMethodHandle` and equal to the value of this instance; otherwise, `false`.

To be added.

## RuntimeMethodHandle.Equals(RuntimeMethodHandle) method

```csharp
public bool Equals (RuntimeMethodHandle handle);
```

Indicates whether this instance is equal to a specified `RuntimeMethodHandle`.

Parameters:

- `handle`: A `RuntimeMethodHandle` to compare to this instance.

Returns: `true` if `handle` is equal to the value of this instance; otherwise, `false`.

To be added.

## RuntimeMethodHandle.FromIntPtr(IntPtr) method

```csharp
public static RuntimeMethodHandle FromIntPtr (IntPtr value);
```

Returns a new `RuntimeMethodHandle` object created from a handle to a RuntimeMethodInfo.

Parameters:

- `value`: An IntPtr handle to a RuntimeMethodInfo to create a `RuntimeMethodHandle` object from.

Returns: A new `RuntimeMethodHandle` object that corresponds to the value parameter.

To be added.

## RuntimeMethodHandle.GetFunctionPointer() method

```csharp
public IntPtr GetFunctionPointer ();
```

Obtains a pointer to the method represented by this instance.

Returns: A pointer to the method represented by this instance.

Exceptions:

- `SecurityException`: The caller does not have the necessary permission to perform this operation.

#### Remarks

If the method has the `UnmanagedCallersOnlyAttribute` attribute, then the returned value is an unmanaged function pointer with the same calling convention as specified in the attribute. If the method this handle represents is static, then the returned value can be cast to a C# managed function pointer type with the same signature. For instance method handles, the value is not easily usable from user code and is meant exclusively for usage within the runtime.

For methods that don't have the `UnmanagedCallersOnlyAttribute`, use `Marshal.GetFunctionPointerForDelegate` to get a function pointer that can be passed to native code.

## RuntimeMethodHandle.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## RuntimeMethodHandle.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` with the data necessary to deserialize the field represented by this instance.

Parameters:

- `info`: The object to populate with serialization information.
- `context`: (Reserved) The place to store and retrieve serialized data.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `SerializationException`: `RuntimeMethodHandle.Value` is invalid.

To be added.

## RuntimeMethodHandle.op_Equality(RuntimeMethodHandle, RuntimeMethodHandle) method

```csharp
public static bool operator == (RuntimeMethodHandle left, RuntimeMethodHandle right);
```

Indicates whether two instances of `RuntimeMethodHandle` are equal.

Parameters:

- `left`: A `RuntimeMethodHandle` to compare to `right`.
- `right`: A `RuntimeMethodHandle` to compare to `left`.

Returns: `true` if the value of `left` is equal to the value of `right`; otherwise, `false`.

The equivalent method for this operator is `Equals`.

## RuntimeMethodHandle.op_Inequality(RuntimeMethodHandle, RuntimeMethodHandle) method

```csharp
public static bool operator != (RuntimeMethodHandle left, RuntimeMethodHandle right);
```

Indicates whether two instances of `RuntimeMethodHandle` are not equal.

Parameters:

- `left`: A `RuntimeMethodHandle` to compare to `right`.
- `right`: A `RuntimeMethodHandle` to compare to `left`.

Returns: `true` if the value of `left` is unequal to the value of `right`; otherwise, `false`.

The equivalent method for this operator is `Equals`.

## RuntimeMethodHandle.ToIntPtr(RuntimeMethodHandle) method

```csharp
public static IntPtr ToIntPtr (RuntimeMethodHandle value);
```

Returns the internal pointer representation of a `RuntimeMethodHandle` object.

Parameters:

- `value`: A `RuntimeMethodHandle` object to retrieve an internal pointer representation from.

Returns: An `IntPtr` object that represents a `RuntimeMethodHandle` object.

To be added.
