---
title: "RuntimeTypeHandle struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/RuntimeTypeHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeTypeHandle struct

Namespace: `System`

```csharp
public struct RuntimeTypeHandle : IEquatable<RuntimeTypeHandle>, System.Runtime.Serialization.ISerializable
```

Represents a type using an internal metadata token.

#### Examples
The following example demonstrates how to obtain a `RuntimeTypeHandle` from a type or from an object, and how to turn the handle back into a type.

_Code sample not included: ~/snippets/csharp/System/RuntimeTypeHandle/Overview/type_gettypehandle.cs._

## RuntimeTypeHandle.Value property

```csharp
public IntPtr Value { get; }
```

Gets a handle to the type represented by this instance.

Returns: A handle to the type represented by this instance.

To be added.

## RuntimeTypeHandle.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether the specified object is equal to the current `RuntimeTypeHandle` structure.

Parameters:

- `obj`: An object to compare to the current instance.

Returns: `true` if `obj` is a `RuntimeTypeHandle` structure and is equal to the value of this instance; otherwise, `false`.

To be added.

## RuntimeTypeHandle.Equals(RuntimeTypeHandle) method

```csharp
public bool Equals (RuntimeTypeHandle handle);
```

Indicates whether the specified `RuntimeTypeHandle` structure is equal to the current `RuntimeTypeHandle` structure.

Parameters:

- `handle`: The `RuntimeTypeHandle` structure to compare to the current instance.

Returns: `true` if the value of `handle` is equal to the value of this instance; otherwise, `false`.

To be added.

## RuntimeTypeHandle.FromIntPtr(IntPtr) method

```csharp
public static RuntimeTypeHandle FromIntPtr (IntPtr value);
```

Returns a new `RuntimeTypeHandle` object created from a handle to a RuntimeType.

Parameters:

- `value`: An IntPtr handle to a RuntimeType to create a `RuntimeTypeHandle` object from.

Returns: A new `RuntimeTypeHandle` object that corresponds to the value parameter.

To be added.

## RuntimeTypeHandle.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current instance.

Returns: A 32-bit signed integer hash code.

To be added.

## RuntimeTypeHandle.GetModuleHandle() method

```csharp
public ModuleHandle GetModuleHandle ();
```

Gets a handle to the module that contains the type represented by the current instance.

Returns: A `ModuleHandle` structure representing a handle to the module that contains the type represented by the current instance.

To be added.

## RuntimeTypeHandle.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` with the data necessary to deserialize the type represented by the current instance.

Parameters:

- `info`: The object to be populated with serialization information.
- `context`: (Reserved) The location where serialized data will be stored and retrieved.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `SerializationException`: `RuntimeTypeHandle.Value` is invalid.

To be added.

## RuntimeTypeHandle.op_Equality(Object, RuntimeTypeHandle) method

```csharp
public static bool operator == (object? left, RuntimeTypeHandle right);
```

Indicates whether an object and a `RuntimeTypeHandle` structure are equal.

Parameters:

- `left`: An object to compare to `right`.
- `right`: A `RuntimeTypeHandle` structure to compare to `left`.

Returns: `true` if `left` is a `RuntimeTypeHandle` structure and is equal to `right`; otherwise, `false`.

#### Remarks
Using this operator to compare two variables of type `RuntimeTypeHandle` causes an ambiguous overload resolution error when compiled. Use the `RuntimeTypeHandle.Equals` method instead.

The equivalent method for this operator is `Equals`.

## RuntimeTypeHandle.op_Equality(RuntimeTypeHandle, Object) method

```csharp
public static bool operator == (RuntimeTypeHandle left, object? right);
```

Indicates whether a `RuntimeTypeHandle` structure is equal to an object.

Parameters:

- `left`: A `RuntimeTypeHandle` structure to compare to `right`.
- `right`: An object to compare to `left`.

Returns: `true` if `right` is a `RuntimeTypeHandle` and is equal to `left`; otherwise, `false`.

#### Remarks
Using this operator to compare two variables of type `RuntimeTypeHandle` causes an ambiguous overload resolution error when compiled. Use the `RuntimeTypeHandle.Equals` method instead.

The equivalent method for this operator is `Equals`>.

## RuntimeTypeHandle.op_Inequality(Object, RuntimeTypeHandle) method

```csharp
public static bool operator != (object? left, RuntimeTypeHandle right);
```

Indicates whether an object and a `RuntimeTypeHandle` structure are not equal.

Parameters:

- `left`: An object to compare to `right`.
- `right`: A `RuntimeTypeHandle` structure to compare to `left`.

Returns: `true` if `left` is a `RuntimeTypeHandle` and is not equal to `right`; otherwise, `false`.

#### Remarks
Using this operator to compare two variables of type `RuntimeTypeHandle` causes an ambiguous overload resolution error when compiled. Use the `RuntimeTypeHandle.Equals` method instead.

The equivalent method for this operator is `Equals`.

## RuntimeTypeHandle.op_Inequality(RuntimeTypeHandle, Object) method

```csharp
public static bool operator != (RuntimeTypeHandle left, object? right);
```

Indicates whether a `RuntimeTypeHandle` structure is not equal to an object.

Parameters:

- `left`: A `RuntimeTypeHandle` structure to compare to `right`.
- `right`: An object to compare to `left`.

Returns: `true` if `right` is a `RuntimeTypeHandle` structure and is not equal to `left`; otherwise, `false`.

#### Remarks
Using this operator to compare two variables of type `RuntimeTypeHandle` causes an ambiguous overload resolution error when compiled. Use the `RuntimeTypeHandle.Equals` method instead.

The equivalent method for this operator is `Equals`.

## RuntimeTypeHandle.ToIntPtr(RuntimeTypeHandle) method

```csharp
public static IntPtr ToIntPtr (RuntimeTypeHandle value);
```

Returns the internal pointer representation of a `RuntimeTypeHandle` object.

Parameters:

- `value`: A `RuntimeTypeHandle` object to retrieve an internal pointer representation from.

Returns: An `IntPtr` object that represents a `RuntimeTypeHandle` object.

To be added.
