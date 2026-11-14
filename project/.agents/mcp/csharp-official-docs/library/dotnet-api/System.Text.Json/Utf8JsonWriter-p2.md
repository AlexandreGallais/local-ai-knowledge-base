---
title: "Utf8JsonWriter class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/Utf8JsonWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8JsonWriter class (part 2 of 7)

## Utf8JsonWriter.WriteBoolean(Byte>, Boolean) method

```csharp
public void WriteBoolean (ReadOnlySpan<byte> utf8PropertyName, bool value);
```

Writes a property name specified as a read-only span of bytes and a `Boolean` value (as a JSON literal true or false) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON literal true or false as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteBoolean(Char>, Boolean) method

```csharp
public void WriteBoolean (ReadOnlySpan<char> propertyName, bool value);
```

Writes a property name specified as a read-only character span and a `Boolean` value (as a JSON literal true or false) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON literal true or false as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteBoolean(String, Boolean) method

```csharp
public void WriteBoolean (string propertyName, bool value);
```

Writes a property name specified as a string and a `Boolean` value (as a JSON literal true or false) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON literal true or false as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteBoolean(JsonEncodedText, Boolean) method

```csharp
public void WriteBoolean (System.Text.Json.JsonEncodedText propertyName, bool value);
```

Writes the pre-encoded property name and `Boolean` value (as a JSON literal true or false) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON literal true or false as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteBooleanValue(Boolean) method

```csharp
public void WriteBooleanValue (bool value);
```

Writes a `Boolean` value (as a JSON literal true or false).

Parameters:

- `value`: The value to be written as a JSON literal true or false.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

To be added.

## Utf8JsonWriter.WriteCommentValue(Byte>) method

```csharp
public void WriteCommentValue (ReadOnlySpan<byte> utf8Value);
```

Writes a UTF-8 text value as a JSON comment.

Parameters:

- `utf8Value`: The UTF-8 encoded value to be written as a JSON comment within `/*..*/`.

Exceptions:

- `ArgumentException`: The specified value is too large.

-or-

`utf8Value` contains a comment delimiter (that is, `*/`).

<format>

## Remarks

The comment value is not escaped before writing.

</format>

## Utf8JsonWriter.WriteCommentValue(Char>) method

```csharp
public void WriteCommentValue (ReadOnlySpan<char> value);
```

Writes a UTF-16 text value as a JSON comment.

Parameters:

- `value`: The UTF-16 encoded value to be written as a UTF-8 transcoded JSON comment within `/*..*/`.

Exceptions:

- `ArgumentException`: The specified value is too large.

-or-

`value` contains a comment delimiter (that is, `*/`).

<format>

## Remarks

The comment value is not escaped before writing.

</format>

## Utf8JsonWriter.WriteCommentValue(String) method

```csharp
public void WriteCommentValue (string value);
```

Writes a string text value as a JSON comment.

Parameters:

- `value`: The UTF-16 encoded value to be written as a UTF-8 transcoded JSON comment within `/*..*/`.

Exceptions:

- `ArgumentException`: The specified value is too large.

-or-

`value` contains a comment delimiter (that is, `*/`).
- `ArgumentNullException`: The `value` parameter is `null`.

<format>

## Remarks

The comment value is not escaped before writing.

</format>

## Utf8JsonWriter.WriteEndArray() method

```csharp
public void WriteEndArray ();
```

Writes the end of a JSON array.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

To be added.

## Utf8JsonWriter.WriteEndObject() method

```csharp
public void WriteEndObject ();
```

Writes the end of a JSON object.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

To be added.

## Utf8JsonWriter.WriteNull(Byte>) method

```csharp
public void WriteNull (ReadOnlySpan<byte> utf8PropertyName);
```

Writes a property name specified as a read-only span of bytes and the JSON literal null as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNull(Char>) method

```csharp
public void WriteNull (ReadOnlySpan<char> propertyName);
```

Writes a property name specified as a read-only character span and the JSON literal null as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNull(String) method

```csharp
public void WriteNull (string propertyName);
```

Writes a property name specified as a string and the JSON literal null as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNull(JsonEncodedText) method

```csharp
public void WriteNull (System.Text.Json.JsonEncodedText propertyName);
```

Writes the pre-encoded property name and the JSON literal null as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteNullValue() method

```csharp
public void WriteNullValue ();
```

Writes the JSON literal null.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

To be added.

## Utf8JsonWriter.WriteNumber(Byte>, Decimal) method

```csharp
public void WriteNumber (ReadOnlySpan<byte> utf8PropertyName, decimal value);
```

Writes a property name specified as a read-only span of bytes and a `Decimal` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `Decimal` using the default `StandardFormat` (that is, 'G').

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Byte>, Double) method

```csharp
public void WriteNumber (ReadOnlySpan<byte> utf8PropertyName, double value);
```

Writes a property name specified as a read-only span of bytes and a `Double` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

This method writes the `Double` value using the default `StandardFormat` (that is, 'G').

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Byte>, Int32) method

```csharp
public void WriteNumber (ReadOnlySpan<byte> utf8PropertyName, int value);
```

Writes a property name specified as a read-only span of bytes and an `Int32` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `Int32` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Byte>, Int64) method

```csharp
public void WriteNumber (ReadOnlySpan<byte> utf8PropertyName, long value);
```

Writes a property name specified as a read-only span of bytes and an `Int64` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `Int64` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Byte>, Single) method

```csharp
public void WriteNumber (ReadOnlySpan<byte> utf8PropertyName, float value);
```

Writes a property name specified as a read-only span of bytes and a `Single` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

This method writes the `Single` value using the default `StandardFormat` (that is, 'G').

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Byte>, UInt32) method

```csharp
public void WriteNumber (ReadOnlySpan<byte> utf8PropertyName, uint value);
```

Writes a property name specified as a read-only span of bytes and a `UInt32` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `UInt32` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Byte>, UInt64) method

```csharp
public void WriteNumber (ReadOnlySpan<byte> utf8PropertyName, ulong value);
```

Writes a property name specified as a read-only span of bytes and a `UInt64` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `UInt64` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Char>, Decimal) method

```csharp
public void WriteNumber (ReadOnlySpan<char> propertyName, decimal value);
```

Writes a property name specified as a read-only character span and a `Decimal` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>
