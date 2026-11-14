---
title: "StringValues struct (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/StringValues.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringValues struct (part 2 of 2)

## StringValues.op_Inequality(StringValues, Object) method

```csharp
public static bool operator != (Microsoft.Extensions.Primitives.StringValues left, object? right);
```

Determines whether the specified `StringValues` and `Object`, which must be a
`StringValues`, `String`, or array of `String`, have different values.

Parameters:

- `left`: The `StringValues` to compare.
- `right`: The `Object` to compare.

Returns: `true` if the `left` object is equal to the `right`; otherwise, `false`.

To be added.

## StringValues.op_Inequality(StringValues, String) method

```csharp
public static bool operator != (Microsoft.Extensions.Primitives.StringValues left, string? right);
```

Determines whether the specified `StringValues` and `String` objects have different values.

Parameters:

- `left`: The `StringValues` to compare.
- `right`: The `String` to compare.

Returns: `true` if the value of `left` is different to the value of `right`; otherwise, `false`.

To be added.

## StringValues.op_Inequality(StringValues, String[]) method

```csharp
public static bool operator != (Microsoft.Extensions.Primitives.StringValues left, string?[]? right);
```

Determines whether the specified `StringValues` and string array have different values.

Parameters:

- `left`: The `StringValues` to compare.
- `right`: The string array to compare.

Returns: `true` if the value of `left` is different to the value of `right`; otherwise, `false`.

To be added.

## StringValues.op_Inequality(Object, StringValues) method

```csharp
public static bool operator != (object? left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether the specified `Object` and `StringValues` object have the same values.

Parameters:

- `left`: The `Object` to compare.
- `right`: The `StringValues` to compare.

Returns: `true` if the `left` object is equal to the `right`; otherwise, `false`.

To be added.

## StringValues.op_Inequality(String, StringValues) method

```csharp
public static bool operator != (string? left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether the specified `String` and `StringValues` objects have different values.

Parameters:

- `left`: The `String` to compare.
- `right`: The `StringValues` to compare.

Returns: `true` if the value of `left` is different to the value of `right`; otherwise, `false`.

To be added.

## StringValues.op_Inequality(String[], StringValues) method

```csharp
public static bool operator != (string?[]? left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether the specified string array and `StringValues` have different values.

Parameters:

- `left`: The string array to compare.
- `right`: The `StringValues` to compare.

Returns: `true` if the value of `left` is different to the value of `right`; otherwise, `false`.

To be added.

## StringValues.System.Collections.Generic.ICollection<System.String>.Add(String) method

```csharp
void ICollection<string>.Add (string? item);
```

Adds an item to the collection.

Parameters:

- `item`: The object to add to the collection.

To be added.

## StringValues.System.Collections.Generic.ICollection<System.String>.Clear() method

```csharp
void ICollection<string>.Clear ();
```

Removes all items from the collection.

To be added.

## StringValues.System.Collections.Generic.ICollection<System.String>.Contains(String) method

```csharp
bool ICollection<string>.Contains (string? item);
```

Determines whether a string is in the `StringValues`.

Parameters:

- `item`: The `String` to locate in the `StringValues`.

Returns: `true` if `item` is found in the `StringValues`; otherwise, `false`.

To be added.

## StringValues.System.Collections.Generic.ICollection<System.String>.CopyTo(String[], Int32) method

```csharp
void ICollection<string>.CopyTo (string?[]? array, int arrayIndex);
```

Copies the entire `StringValues`to a string array, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in the destination array at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is null.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than 0.
- `ArgumentException`: The number of elements in the source `StringValues` is greater than the available space from `arrayIndex` to the end of the destination `array`.

To be added.

## StringValues.System.Collections.Generic.ICollection<System.String>.Remove(String) method

```csharp
bool ICollection<string>.Remove (string? item);
```

Removes the first occurrence of a specific object from the collection.

Parameters:

- `item`: The object to remove from the collection.

Returns: `true` if `item` was successfully removed from the collection; otherwise, `false`. This method also returns `false` if `item` is not found in the original collection.

To be added.

## StringValues.System.Collections.Generic.IEnumerable<System.String>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<string?>? IEnumerable<string>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## StringValues.System.Collections.Generic.IList<System.String>.IndexOf(String) method

```csharp
int IList<string>.IndexOf (string? item);
```

Returns the zero-based index of the first occurrence of an item in the `StringValues`.

Parameters:

- `item`: The string to locate in the <see cref="T:Microsoft.Extensions.Primitives.StringValues"></see>.

Returns: The zero-based index of the first occurrence of `item` within the <see cref="T:Microsoft.Extensions.Primitives.StringValues"></see>, if found; otherwise, -1.

To be added.

## StringValues.System.Collections.Generic.IList<System.String>.Insert(Int32, String) method

```csharp
void IList<string>.Insert (int index, string? item);
```

Inserts an item to the `IList<T>` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the `IList<T>`.

To be added.

## StringValues.System.Collections.Generic.IList<System.String>.RemoveAt(Int32) method

```csharp
void IList<string>.RemoveAt (int index);
```

Removes the `IList<T>` item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

To be added.

## StringValues.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator? IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An <xref data-throw-if-not-resolved="true" uid="System.Collections.IEnumerator"></xref> object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `StringValues` instance is cast to an `IEnumerable` interface.

## StringValues.ToArray() method

```csharp
public string?[] ToArray ();
```

Creates a string array from the current `StringValues` object.

Returns: A string array represented by this instance.

If the `StringValues` contains a single string internally, it is copied to a new array.

If the `StringValues` contains an array internally it returns that array instance.

## StringValues.ToString() method

```csharp
public override string ToString ();
```

Converts the value of the current `StringValues` object to its equivalent string representation, with multiple values joined as a comma separated string.

Returns: A string representation of the value of the current `StringValues` object.

To be added.

## StringValues.Empty field

```csharp
public static readonly Microsoft.Extensions.Primitives.StringValues Empty;
```

A readonly instance of the `StringValues` struct whose value is an empty string array.

In application code, this field is most commonly used to safely represent a `StringValues` that has null string values.
