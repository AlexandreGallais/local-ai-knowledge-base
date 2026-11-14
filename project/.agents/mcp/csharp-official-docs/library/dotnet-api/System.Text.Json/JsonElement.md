---
title: "JsonElement struct (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonElement struct

Namespace: `System.Text.Json`

```csharp
public readonly struct JsonElement
```

Represents a specific JSON value within a `JsonDocument`.

#### Remarks

For more information, see Use JsonDocument for access to data.

## JsonElement.Item property

```csharp
public System.Text.Json.JsonElement this[int index] { get; }
```

Gets the value at the specified index if the current value is an `JsonValueKind.Array`.

Parameters:

- `index`: The item index.

Returns: The value at the specified index.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Array`.
- `IndexOutOfRangeException`: `index` is not in the range [0, `JsonElement.GetArrayLength`()).
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.

## JsonElement.ValueKind property

```csharp
public System.Text.Json.JsonValueKind ValueKind { get; }
```

Gets the type of the current JSON value.

Returns: The type of the current JSON value.

Exceptions:

- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.

## JsonElement.Clone() method

```csharp
public System.Text.Json.JsonElement Clone ();
```

Gets a JsonElement that can be safely stored beyond the lifetime of the original `JsonDocument`.

Returns: A JsonElement that can be safely stored beyond the lifetime of the original `JsonDocument`.

<format>

## Remarks

If this `JsonElement` is itself the output of a previous call to `Clone` or a value contained within another `JsonElement` that was the output of a previous call to `Clone`, this method results in no additional memory allocation.

</format>

## JsonElement.DeepEquals(JsonElement, JsonElement) method

```csharp
public static bool DeepEquals (System.Text.Json.JsonElement element1, System.Text.Json.JsonElement element2);
```

Compares the values of two `JsonElement` values for equality, including the values of all descendant elements.

Parameters:

- `element1`: The first `JsonElement` to compare.
- `element2`: The second `JsonElement` to compare.

Returns: `true` if the two values are equal; otherwise, `false`.

Deep equality of two JSON values is defined as follows:

JSON values of different kinds are not equal.
JSON constants `null`, `false`, and `true` only equal themselves.
JSON numbers are equal if and only if they have they have equivalent decimal representations, with no rounding being used.
JSON strings are equal if and only if they are equal using ordinal string comparison.
JSON arrays are equal if and only if they are of equal length and each of their elements are pairwise equal.
JSON objects are equal if and only if they have the same number of properties and each property in the first object has a corresponding property in the second object with the same name and equal value. The order of properties is not significant, with the exception of repeated properties that must be specified in the same order (with interleaving allowed).

## JsonElement.EnumerateArray() method

```csharp
public System.Text.Json.JsonElement.ArrayEnumerator EnumerateArray ();
```

Gets an enumerator to enumerate the values in the JSON array represented by this JsonElement.

Returns: An enumerator to enumerate the values in the JSON array represented by this JsonElement.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Array`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

#### Remarks

For more information, see How to write custom serializers and deserializers with System.Text.Json.

## JsonElement.EnumerateObject() method

```csharp
public System.Text.Json.JsonElement.ObjectEnumerator EnumerateObject ();
```

Gets an enumerator to enumerate the properties in the JSON object represented by this JsonElement.

Returns: An enumerator to enumerate the properties in the JSON object represented by this JsonElement.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Object`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.

## JsonElement.GetArrayLength() method

```csharp
public int GetArrayLength ();
```

Gets the number of values contained within the current array value.

Returns: The number of values contained within the current array value.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Array`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

#### Remarks

For more information, see How to write custom serializers and deserializers with System.Text.Json.

## JsonElement.GetBoolean() method

```csharp
public bool GetBoolean ();
```

Gets the value of the element as a `Boolean`.

Returns: The value of the element as a `Boolean`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is neither `JsonValueKind.True` nor `JsonValueKind.False`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

This method does not parse the contents of a JSON string value.

</format>

## JsonElement.GetByte() method

```csharp
public byte GetByte ();
```

Gets the current JSON number as a `Byte`.

Returns: The current JSON number as a `Byte`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as a `Byte`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

#### Remarks

This method does not parse the contents of a JSON string value.

## JsonElement.GetBytesFromBase64() method

```csharp
public byte[] GetBytesFromBase64 ();
```

Gets the value of the element as a byte array.

Returns: The value decoded as a byte array.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.
- `FormatException`: The value is not encoded as Base64 text and hence cannot be decoded to bytes.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

#### Remarks

This method does not create a byte representation of values other than Base64 encoded JSON strings.

## JsonElement.GetDateTime() method

```csharp
public DateTime GetDateTime ();
```

Gets the value of the element as a `DateTime`.

Returns: The value of the element as a `DateTime`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.
- `FormatException`: The value cannot be read as a `DateTime`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method only creates a DateTime representation of JSON strings that conform to the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json).

</format>

## JsonElement.GetDateTimeOffset() method

```csharp
public DateTimeOffset GetDateTimeOffset ();
```

Gets the value of the element as a `DateTimeOffset`.

Returns: The value of the element as a `DateTimeOffset`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.
- `FormatException`: The value cannot be read as a `DateTimeOffset`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method only creates a DateTimeOffset representation of JSON strings that conform to the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json).

</format>

## JsonElement.GetDecimal() method

```csharp
public decimal GetDecimal ();
```

Gets the current JSON number as a `Decimal`.

Returns: The current JSON number as a `Decimal`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as a `Decimal`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

</format>

## JsonElement.GetDouble() method

```csharp
public double GetDouble ();
```

Gets the current JSON number as a `Double`.

Returns: The current JSON number as a `Double`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as a `Double`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

This method returns `PositiveInfinity` for values larger than `MaxValue`, and it returns `NegativeInfinity` for values smaller than `MinValue`.

</format>

## JsonElement.GetGuid() method

```csharp
public Guid GetGuid ();
```

Gets the value of the element as a `Guid`.

Returns: The value of the element as a `Guid`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.
- `FormatException`: The value cannot be represented as a `Guid`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not create a Guid representation of values other than JSON strings.

</format>

## JsonElement.GetInt16() method

```csharp
public short GetInt16 ();
```

Gets the current JSON number as an `Int16`.

Returns: The current JSON number as an `Int16`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as an `Int16`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.

## JsonElement.GetInt32() method

```csharp
public int GetInt32 ();
```

Gets the current JSON number as an `Int32`.

Returns: The current JSON number as an `Int32`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as an `Int32`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.

## JsonElement.GetInt64() method

```csharp
public long GetInt64 ();
```

Gets the current JSON number as an `Int64`.

Returns: The current JSON number as an `Int64`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as a `Int64`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

</format>

## JsonElement.GetProperty(Byte>) method

```csharp
public System.Text.Json.JsonElement GetProperty (ReadOnlySpan<byte> utf8PropertyName);
```

Gets a `JsonElement` representing the value of a required property identified by `utf8PropertyName`.

Parameters:

- `utf8PropertyName`: The UTF-8 representation (with no Byte-Order-Mark (BOM)) of the name of the property to return.

Returns: A `JsonElement` representing the value of the requested property.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Object`.
- `KeyNotFoundException`: No property was found with the requested name.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

Property name matching is performed as an ordinal, case-sensitive comparison.

If a property is defined multiple times for the same object, the method matches the last such definition.

For more information, see How to write custom serializers and deserializers with System.Text.Json.

</format>

## JsonElement.GetProperty(Char>) method

```csharp
public System.Text.Json.JsonElement GetProperty (ReadOnlySpan<char> propertyName);
```

Gets a `JsonElement` representing the value of a required property identified by `propertyName`.

Parameters:

- `propertyName`: The name of the property whose value is to be returned.

Returns: A `JsonElement` representing the value of the requested property.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Object`.
- `KeyNotFoundException`: No property was found with the requested name.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

Property name matching is performed as an ordinal, case-sensitive comparison.

If a property is defined multiple times for the same object, the method matches the last such definition.

</format>

## JsonElement.GetProperty(String) method

```csharp
public System.Text.Json.JsonElement GetProperty (string propertyName);
```

Gets a `JsonElement` representing the value of a required property identified by `propertyName`.

Parameters:

- `propertyName`: The name of the property whose value is to be returned.

Returns: A `JsonElement` representing the value of the requested property.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Object`.
- `KeyNotFoundException`: No property was found with the requested name.
- `ArgumentNullException`: `propertyName` is `null`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

Property name matching is performed as an ordinal, case-sensitive comparison.

If a property is defined multiple times for the same object, the method matches the last such definition.

</format>

## JsonElement.GetPropertyCount() method

```csharp
public int GetPropertyCount ();
```

Gets the number of properties contained within the current object value.

Returns: The number of properties contained within the current object value.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Object`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.

## JsonElement.GetRawText() method

```csharp
public string GetRawText ();
```

Gets a string that represents the original input data backing this value.

Returns: The original input data backing this value.

Exceptions:

- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.

## JsonElement.GetSByte() method

```csharp
public sbyte GetSByte ();
```

Gets the current JSON number as an `SByte`.

Returns: The current JSON number as an `SByte`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as an `SByte`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.
