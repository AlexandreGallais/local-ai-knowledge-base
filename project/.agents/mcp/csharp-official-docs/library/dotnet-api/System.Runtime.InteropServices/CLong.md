---
title: "CLong struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CLong.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CLong struct

Namespace: `System.Runtime.InteropServices`

```csharp
public readonly struct CLong : IEquatable<System.Runtime.InteropServices.CLong>
```

`CLong` is an immutable value type that represents the `long` type in C and C++.
It is meant to be used as an exchange type at the managed/unmanaged boundary to accurately represent in managed code unmanaged APIs that use the `long` type.
This type has 32-bits of storage on all Windows platforms and 32-bit Unix-based platforms.
It has 64-bits of storage on 64-bit Unix platforms.

To be added.

## CLong.CLong(Int32) constructor

```csharp
public CLong (int value);
```

Constructs an instance from a 32-bit integer.

Parameters:

- `value`: The integer value.

To be added.

## CLong.CLong(IntPtr) constructor

```csharp
public CLong (IntPtr value);
```

Constructs an instance from a native-sized integer.

Parameters:

- `value`: The integer value.

Exceptions:

- `OverflowException`: `value` is outside the range of the underlying storage type.

To be added.

## CLong.Value property

```csharp
public IntPtr Value { get; }
```

The underlying integer value of this instance.

Returns: To be added.

To be added.

## CLong.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `o`: An object to compare with this instance.

Returns: `true` if `o` is an instance of `CLong` and equals the value of this instance; otherwise, `false`.

To be added.

## CLong.Equals(CLong) method

```csharp
public bool Equals (System.Runtime.InteropServices.CLong other);
```

Returns a value indicating whether this instance is equal to a specified `CLong` value.

Parameters:

- `other`: A `CLong` value to compare to this instance.

Returns: `true` if `other` has the same value as this instance; otherwise, `false`.

To be added.

## CLong.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## CLong.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance, consisting of a negative sign if the value is negative, and a sequence of digits ranging from 0 to 9 with no leading zeroes.

To be added.
