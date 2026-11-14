---
title: "ArrayWithOffset struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ArrayWithOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArrayWithOffset struct

Namespace: `System.Runtime.InteropServices`

```csharp
public readonly struct ArrayWithOffset : IEquatable<System.Runtime.InteropServices.ArrayWithOffset>
```

Encapsulates an array and an offset within the specified array.

#### Remarks
Can be used as an argument to a native method reached through platform invoke. In this case, the platform invoke marshaler will retrieve the starting address of the array, add the offset, and pass the resulting pointer to the underlying native function. This structure only supports arrays containing no references, such as primitive type arrays and value type arrays containing only fields of primitive types.

## ArrayWithOffset.ArrayWithOffset(Object, Int32) constructor

```csharp
public ArrayWithOffset (object? array, int offset);
```

Initializes a new instance of the `ArrayWithOffset` structure.

Parameters:

- `array`: A managed array.
- `offset`: The offset in bytes, of the element to be passed through platform invoke.

Exceptions:

- `ArgumentException`: The array is larger than 2 gigabytes (GB).

To be added.

## ArrayWithOffset.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether the specified object matches the current `ArrayWithOffset` object.

Parameters:

- `obj`: Object to compare with this instance.

Returns: `true` if the object matches this `ArrayWithOffset`; otherwise, `false`.

To be added.

## ArrayWithOffset.Equals(ArrayWithOffset) method

```csharp
public bool Equals (System.Runtime.InteropServices.ArrayWithOffset obj);
```

Indicates whether the specified `ArrayWithOffset` object matches the current instance.

Parameters:

- `obj`: An `ArrayWithOffset` object to compare with this instance.

Returns: `true` if the specified `ArrayWithOffset` object matches the current instance; otherwise, `false`.

To be added.

## ArrayWithOffset.GetArray() method

```csharp
public object? GetArray ();
```

Returns the managed array referenced by this `ArrayWithOffset`.

Returns: The managed array this instance references.

To be added.

## ArrayWithOffset.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash code for this value type.

Returns: The hash code for this instance.

To be added.

## ArrayWithOffset.GetOffset() method

```csharp
public int GetOffset ();
```

Returns the offset provided when this `ArrayWithOffset` was constructed.

Returns: The offset for this instance.

To be added.

## ArrayWithOffset.op_Equality(ArrayWithOffset, ArrayWithOffset) method

```csharp
public static bool operator == (System.Runtime.InteropServices.ArrayWithOffset a, System.Runtime.InteropServices.ArrayWithOffset b);
```

Determines whether two specified `ArrayWithOffset` objects have the same value.

Parameters:

- `a`: An `ArrayWithOffset` object to compare with the `b` parameter.
- `b`: An `ArrayWithOffset` object to compare with the `a` parameter.

Returns: `true` if the value of `a` is the same as the value of `b`; otherwise, `false`.

The equivalent method for this operator is `Equals`.

## ArrayWithOffset.op_Inequality(ArrayWithOffset, ArrayWithOffset) method

```csharp
public static bool operator != (System.Runtime.InteropServices.ArrayWithOffset a, System.Runtime.InteropServices.ArrayWithOffset b);
```

Determines whether two specified `ArrayWithOffset` objects no not have the same value.

Parameters:

- `a`: An `ArrayWithOffset` object to compare with the `b` parameter.
- `b`: An `ArrayWithOffset` object to compare with the `a` parameter.

Returns: `true` if the value of `a` is not the same as the value of `b`; otherwise, `false`.

The equivalent method for this operator is `Equals`.
