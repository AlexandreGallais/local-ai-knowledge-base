---
title: "NameObjectCollectionBase class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/NameObjectCollectionBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NameObjectCollectionBase class (part 3 of 3)

## NameObjectCollectionBase.OnDeserialization(Object) method

```csharp
public virtual void OnDeserialization (object? sender);
```

Implements the `ISerializable` interface and raises the deserialization event when the deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `SerializationException`: The `SerializationInfo` object associated with the current `NameObjectCollectionBase` instance is invalid.
- `PlatformNotSupportedException`: In all cases.

#### Remarks
While the `NameObjectCollectionBase.OnDeserialization` method is not visible to COM clients by default, inheriting the `NameObjectCollectionBase` class can expose it and can cause undesirable behavior in COM clients.

This method is an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.

## NameObjectCollectionBase.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array? array, int index);
```

Copies the entire `NameObjectCollectionBase` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `NameObjectCollectionBase`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `NameObjectCollectionBase` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `NameObjectCollectionBase` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The specified array must be of a compatible type.

This method uses `Array.Copy` to copy the elements.

While the `NameObjectCollectionBase.System%23Collections%23ICollection%23CopyTo` method is not visible to COM clients by default, inheriting the `NameObjectCollectionBase` class can expose it and can cause undesirable behavior in COM clients.

This method is an O(`n`) operation, where `n` is `NameObjectCollectionBase.Count`.
