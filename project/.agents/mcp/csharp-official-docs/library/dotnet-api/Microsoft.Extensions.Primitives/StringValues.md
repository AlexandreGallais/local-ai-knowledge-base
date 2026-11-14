---
title: "StringValues struct (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/StringValues.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringValues struct

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public readonly struct StringValues : IEquatable<Microsoft.Extensions.Primitives.StringValues>, IEquatable<string[]>, IEquatable<string>, System.Collections.Generic.ICollection<string>, System.Collections.Generic.IEnumerable<string>, System.Collections.Generic.IList<string>, System.Collections.Generic.IReadOnlyCollection<string>, System.Collections.Generic.IReadOnlyList<string>
```

Represents zero/null, one, or many strings in an efficient way.

To be added.

## StringValues.StringValues(String) constructor

```csharp
public StringValues (string? value);
```

Initializes a new instance of the `StringValues` structure using the specified string.

Parameters:

- `value`: A string value or `null`.

To be added.

## StringValues.StringValues(String[]) constructor

```csharp
public StringValues (string?[]? values);
```

Initializes a new instance of the `StringValues` structure using the specified array of strings.

Parameters:

- `values`: A string array.

To be added.

## StringValues.Count property

```csharp
public int Count { get; }
```

Gets the number of `String` elements contained in this `StringValues`.

Returns: The number of string elements contained in this `StringValues`.

To be added.

## StringValues.Item property

```csharp
public string? this[int index] { get; }
```

Gets the `String` at the specified index.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The string at the specified index.

To be added.

## StringValues.System.Collections.Generic.ICollection<System.String>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.String>.IsReadOnly { get; }
```

Gets a value indicating whether the collection is read-only.

Returns: `true` if the collection is read-only; otherwise, `false`.

To be added.

## StringValues.System.Collections.Generic.IList<System.String>.Item property

```csharp
string? System.Collections.Generic.IList<System.String>.Item[int index] { get; set; }
```

Gets the `String` at the specified index.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The string at the specified index.

Exceptions:

- `NotSupportedException`: Set operations are not supported on readonly `StringValues`.

To be added.

## StringValues.Concat(StringValues, StringValues) method

```csharp
public static Microsoft.Extensions.Primitives.StringValues Concat (Microsoft.Extensions.Primitives.StringValues values1, Microsoft.Extensions.Primitives.StringValues values2);
```

Concatenates two specified instances of `StringValues`.

Parameters:

- `values1`: The first `StringValues` to concatenate.
- `values2`: The second `StringValues` to concatenate.

Returns: The concatenation of `values1` and `values2`.

To be added.

## StringValues.Concat(StringValues, String) method

```csharp
public static Microsoft.Extensions.Primitives.StringValues Concat (in Microsoft.Extensions.Primitives.StringValues values, string? value);
```

Concatenates specified instance of `StringValues` with specified `String`.

Parameters:

- `values`: The `StringValues` to concatenate.
- `value`: The `String` to concatenate.

Returns: The concatenation of `values` and `value`.

To be added.

## StringValues.Concat(String, StringValues) method

```csharp
public static Microsoft.Extensions.Primitives.StringValues Concat (string? value, in Microsoft.Extensions.Primitives.StringValues values);
```

Concatenates specified instance of `String` with specified `StringValues`.

Parameters:

- `value`: The `String` to concatenate.
- `values`: The `StringValues` to concatenate.

Returns: The concatenation of `values` and `values`.

To be added.

## StringValues.Equals(StringValues) method

```csharp
public bool Equals (Microsoft.Extensions.Primitives.StringValues other);
```

Determines whether this instance and another specified `StringValues` object have the same values.

Parameters:

- `other`: The string to compare to this instance.

Returns: `true` if the value of `other` is the same as the value of this instance; otherwise, `false`.

To be added.

## StringValues.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether this instance and a specified object have the same value.

Parameters:

- `obj`: An object to compare with this object.

Returns: `true` if the current object is equal to `obj`; otherwise, `false`.

To be added.

## StringValues.Equals(String) method

```csharp
public bool Equals (string? other);
```

Determines whether this instance and a specified `String`, have the same value.

Parameters:

- `other`: The `String` to compare to this instance.

Returns: `true` if the value of `other` is the same as this instance; otherwise, `false`. If `other` is `null`, returns `false`.

To be added.

## StringValues.Equals(String[]) method

```csharp
public bool Equals (string?[]? other);
```

Determines whether this instance and a specified string array have the same values.

Parameters:

- `other`: The string array to compare to this instance.

Returns: `true` if the value of `other` is the same as this instance; otherwise, `false`.

To be added.

## StringValues.Equals(StringValues, StringValues) method

```csharp
public static bool Equals (Microsoft.Extensions.Primitives.StringValues left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether two specified `StringValues` objects have the same values in the same order.

Parameters:

- `left`: The first `StringValues` to compare.
- `right`: The second `StringValues` to compare.

Returns: `true` if the value of `left` is the same as the value of `right`; otherwise, `false`.

To be added.

## StringValues.Equals(StringValues, String) method

```csharp
public static bool Equals (Microsoft.Extensions.Primitives.StringValues left, string? right);
```

Determines whether the specified `StringValues` and `String` objects have the same values.

Parameters:

- `left`: The `StringValues` to compare.
- `right`: The `String` to compare.

Returns: `true` if the value of `left` is the same as the value of `right`; otherwise, `false`. If `right` is `null`, the method returns `false`.

To be added.

## StringValues.Equals(StringValues, String[]) method

```csharp
public static bool Equals (Microsoft.Extensions.Primitives.StringValues left, string?[]? right);
```

Determines whether the specified `StringValues` and string array objects have the same values.

Parameters:

- `left`: The `StringValues` to compare.
- `right`: The string array to compare.

Returns: `true` if the value of `left` is the same as the value of `right`; otherwise, `false`.

To be added.

## StringValues.Equals(String, StringValues) method

```csharp
public static bool Equals (string? left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether the specified `String` and `StringValues` objects have the same values.

Parameters:

- `left`: The `String` to compare.
- `right`: The `StringValues` to compare.

Returns: `true` if the value of `left` is the same as the value of `right`; otherwise, `false`. If `left` is `null`, the method returns `false`.

To be added.

## StringValues.Equals(String[], StringValues) method

```csharp
public static bool Equals (string?[]? left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether the specified string array and `StringValues` objects have the same values.

Parameters:

- `left`: The string array to compare.
- `right`: The `StringValues` to compare.

Returns: `true` if the value of `left` is the same as the value of `right`; otherwise, `false`.

To be added.

## StringValues.GetEnumerator() method

```csharp
public Microsoft.Extensions.Primitives.StringValues.Enumerator GetEnumerator ();
```

Retrieves an object that can iterate through the individual strings in this `StringValues`.

Returns: An enumerator that can be used to iterate through the `StringValues`.

To be added.

## StringValues.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash code for this instance.

Returns: A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table.

To be added.

## StringValues.IsNullOrEmpty(StringValues) method

```csharp
public static bool IsNullOrEmpty (Microsoft.Extensions.Primitives.StringValues value);
```

Indicates whether the specified `StringValues` contains no string values.

Parameters:

- `value`: The `StringValues` to test.

Returns: `true` if `value` contains a single `null` or empty string or an empty array; otherwise, `false`.

To be added.

## StringValues.op_Equality(StringValues, StringValues) method

```csharp
public static bool operator == (Microsoft.Extensions.Primitives.StringValues left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether two specified `StringValues` have the same values.

Parameters:

- `left`: The first `StringValues` to compare.
- `right`: The second `StringValues` to compare.

Returns: `true` if the value of `left` is the same as the value of `right`; otherwise, `false`.

To be added.

## StringValues.op_Equality(StringValues, Object) method

```csharp
public static bool operator == (Microsoft.Extensions.Primitives.StringValues left, object? right);
```

Determines whether the specified `StringValues` and `Object`, which must be a
`StringValues`, `String`, or array of `String`, have the same value.

Parameters:

- `left`: The `StringValues` to compare.
- `right`: The `Object` to compare.

Returns: `true` if the `left` object is equal to the `right`; otherwise, `false`.

To be added.

## StringValues.op_Equality(StringValues, String) method

```csharp
public static bool operator == (Microsoft.Extensions.Primitives.StringValues left, string? right);
```

Determines whether the specified  and  objects have the same values.

Parameters:

- `left`: The <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.Primitives.StringValues"></xref> to compare.
- `right`: The <xref data-throw-if-not-resolved="true" uid="System.String"></xref> to compare.

Returns: ```csharp
true
```
if the value of 
```csharp
left
```
is the same as the value of
```csharp
right
```
; otherwise,
```csharp
false
```
. If
```csharp
right
```
is
```csharp
null
```
, the method returns
```csharp
false
```
.

To be added.

## StringValues.op_Equality(StringValues, String[]) method

```csharp
public static bool operator == (Microsoft.Extensions.Primitives.StringValues left, string?[]? right);
```

Determines whether the specified  and string array objects have the same values.

Parameters:

- `left`: The <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.Primitives.StringValues"></xref> to compare.
- `right`: The string array to compare.

Returns: ```csharp
true
```
if the value of 
```csharp
left
```
is the same as the value of
```csharp
right
```
; otherwise,
```csharp
false
```
.

To be added.

## StringValues.op_Equality(Object, StringValues) method

```csharp
public static bool operator == (object? left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether the specified `Object`, which must be a
`StringValues`, `String`, or array of `String`, and specified `StringValues`,  have the same value.

Parameters:

- `left`: The `StringValues` to compare.
- `right`: The `Object` to compare.

Returns: `true` if the `left` object is equal to the `right`; otherwise, `false`.

To be added.

## StringValues.op_Equality(String, StringValues) method

```csharp
public static bool operator == (string? left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether the specified  and  objects have the same values.

Parameters:

- `left`: The string to compare.
- `right`: The <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.Primitives.StringValues"></xref> to compare.

Returns: ```csharp
true
```
if the value of 
```csharp
left
```
is the same as the value of
```csharp
right
```
; otherwise,
```csharp
false
```
. If
```csharp
left
```
is
```csharp
null
```
, the method returns
```csharp
false
```
.

To be added.

## StringValues.op_Equality(String[], StringValues) method

```csharp
public static bool operator == (string?[]? left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether the specified string array and  objects have the same values.

Parameters:

- `left`: The string array to compare.
- `right`: The <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.Primitives.StringValues"></xref> to compare.

Returns: ```csharp
true
```
if the value of 
```csharp
left
```
is the same as the value of
```csharp
right
```
; otherwise,
```csharp
false
```
.

To be added.

## StringValues.op_Implicit(StringValues) method

```csharp
public static implicit operator string? (Microsoft.Extensions.Primitives.StringValues values);
```

Defines an implicit conversion of a given `StringValues` to a string, with multiple values joined as a comma separated string.

Parameters:

- `values`: A `StringValues` to implicitly convert.

Returns: Returns `null` where `StringValues` has been initialized from an empty string array or is `StringValues.Empty`. Otherwise, it returns the implicit conversion of `StringValues` to a string.

Returns `null` where `StringValues` has been initialized from an empty string array or is `StringValues.Empty`.

## StringValues.op_Implicit(StringValues) method

```csharp
public static implicit operator string?[]? (Microsoft.Extensions.Primitives.StringValues value);
```

Defines an implicit conversion of a given `StringValues` to a string array.

Parameters:

- `value`: A `StringValues` to implicitly convert.

Returns: To be added.

To be added.

## StringValues.op_Implicit(String) method

```csharp
public static implicit operator Microsoft.Extensions.Primitives.StringValues (string? value);
```

Defines an implicit conversion of a given string to a `StringValues`.

Parameters:

- `value`: A string to implicitly convert.

Returns: To be added.

To be added.

## StringValues.op_Implicit(String[]) method

```csharp
public static implicit operator Microsoft.Extensions.Primitives.StringValues (string?[]? values);
```

Defines an implicit conversion of a given string array to a `StringValues`.

Parameters:

- `values`: A string array to implicitly convert.

Returns: To be added.

To be added.

## StringValues.op_Inequality(StringValues, StringValues) method

```csharp
public static bool operator != (Microsoft.Extensions.Primitives.StringValues left, Microsoft.Extensions.Primitives.StringValues right);
```

Determines whether two specified `StringValues` have different values.

Parameters:

- `left`: The first `StringValues` to compare.
- `right`: The second `StringValues` to compare.

Returns: `true` if the value of `left` is different to the value of `right`; otherwise, `false`.

To be added.
