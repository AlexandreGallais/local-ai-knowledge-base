---
title: "BitVector32+Section struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/BitVector32+Section.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BitVector32+Section struct

Namespace: `System.Collections.Specialized`

```csharp
public readonly struct BitVector32.Section : IEquatable<System.Collections.Specialized.BitVector32.Section>
```

Represents a section of the vector that can contain an integer number.

#### Remarks
Use `BitVector32.CreateSection` to define a new section. A `Section` is a window into the `BitVector32` and is composed of the smallest number of consecutive bits that can contain the maximum value specified in `BitVector32.CreateSection`. For example, a section with a maximum value of 1 is composed of only one bit, whereas a section with a maximum value of 5 is composed of three bits. You can create a `Section` with a maximum value of 1 to serve as a Boolean, thereby allowing you to store integers and Booleans in the same `BitVector32`.

#### Examples
The following code example uses a `BitVector32` as a collection of sections.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/BitVector32+Section/Overview/bitvector32_sections.cs._

## BitVector32+Section.Mask property

```csharp
public short Mask { get; }
```

Gets a mask that isolates this section within the `BitVector32`.

Returns: A mask that isolates this section within the `BitVector32`.

To be added.

## BitVector32+Section.Offset property

```csharp
public short Offset { get; }
```

Gets the offset of this section from the start of the `BitVector32`.

Returns: The offset of this section from the start of the `BitVector32`.

To be added.

## BitVector32+Section.Equals(BitVector32+Section) method

```csharp
public bool Equals (System.Collections.Specialized.BitVector32.Section obj);
```

Determines whether the specified `Section` object is the same as the current `Section` object.

Parameters:

- `obj`: The `Section` object to compare with the current `Section` object.

Returns: `true` if the `obj` parameter is the same as the current `Section` object; otherwise `false`.

To be added.

## BitVector32+Section.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

Determines whether the specified object is the same as the current `Section` object.

Parameters:

- `o`: The object to compare with the current `Section`.

Returns: `true` if the specified object is the same as the current `Section` object; otherwise, `false`.

#### Remarks
This method overrides `Object.Equals`.

Two `Section` instances are considered equal if both sections are of the same length and are in the same location within a `BitVector32`.

## BitVector32+Section.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for the current `Section`, suitable for hashing algorithms and data structures, such as a hash table.

Returns: A hash code for the current `Section`.

#### Remarks
This method overrides `Object.GetHashCode`.

This method generates the same hash code for two objects that are equal according to the `Section.Equals` method.

## BitVector32+Section.op_Equality(BitVector32+Section, BitVector32+Section) method

```csharp
public static bool operator == (System.Collections.Specialized.BitVector32.Section a, System.Collections.Specialized.BitVector32.Section b);
```

Determines whether two specified `Section` objects are equal.

Parameters:

- `a`: A `Section` object.
- `b`: A `Section` object.

Returns: `true` if the `a` and `b` parameters represent the same `Section` object, otherwise, `false`.

The equivalent method for this operator is `Equals`.

## BitVector32+Section.op_Inequality(BitVector32+Section, BitVector32+Section) method

```csharp
public static bool operator != (System.Collections.Specialized.BitVector32.Section a, System.Collections.Specialized.BitVector32.Section b);
```

Determines whether two `Section` objects have different values.

Parameters:

- `a`: A `Section` object.
- `b`: A `Section` object.

Returns: `true` if the `a` and `b` parameters represent different `Section` objects; otherwise, `false`.

The equivalent method for this operator is `Section.op_Equality`

## BitVector32+Section.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `Section`.

Returns: A string that represents the current `Section`.

#### Remarks
This method overrides `Object.ToString`.

## BitVector32+Section.ToString(BitVector32+Section) method

```csharp
public static string ToString (System.Collections.Specialized.BitVector32.Section value);
```

Returns a string that represents the specified `Section`.

Parameters:

- `value`: The `Section` to represent.

Returns: A string that represents the specified `Section`.

To be added.
