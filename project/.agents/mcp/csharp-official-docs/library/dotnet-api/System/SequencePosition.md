---
title: "SequencePosition struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/SequencePosition.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SequencePosition struct

Namespace: `System`

```csharp
public readonly struct SequencePosition : IEquatable<SequencePosition>
```

Represents a position in a non-contiguous set of memory. Properties of this type should not be interpreted by anything but the type that created it.

To be added.

## SequencePosition.SequencePosition(Object, Int32) constructor

```csharp
public SequencePosition (object? object, int integer);
```

Initializes a new instance of the `SequencePosition` struct.

Parameters:

- `object`: A non-contiguous set of memory.
- `integer`: The position in `object`.

To be added.

## SequencePosition.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current instance is equal to another object.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if `obj` is of type `SequencePosition` and is equal to the current instance; otherwise, `false`.

#### Remarks

Equality does not guarantee that the two instances point to the same location in a `ReadOnlySequence<T>`.

## SequencePosition.Equals(SequencePosition) method

```csharp
public bool Equals (SequencePosition other);
```

Indicates whether the current instance is equal to another `SequencePosition`.

Parameters:

- `other`: The sequence position to compare with the current instance.

Returns: `true` if the two instances are equal; `false` otherwise.

#### Remarks

Equality does not guarantee that the two instances point to the same location in a `ReadOnlySequence<T>`.

## SequencePosition.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code for this instance.

To be added.

## SequencePosition.GetInteger() method

```csharp
public int GetInteger ();
```

Returns the integer part of this `SequencePosition`.

Returns: The integer part of this sequence position.

To be added.

## SequencePosition.GetObject() method

```csharp
public object? GetObject ();
```

Returns the object part of this `SequencePosition`.

Returns: The object part of this sequence position.

To be added.
