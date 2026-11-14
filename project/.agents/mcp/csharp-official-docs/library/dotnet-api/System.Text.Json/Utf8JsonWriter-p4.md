---
title: "Utf8JsonWriter class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/Utf8JsonWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8JsonWriter class (part 4 of 7)

## Utf8JsonWriter.WriteNumber(JsonEncodedText, Single) method

```csharp
public void WriteNumber (System.Text.Json.JsonEncodedText propertyName, float value);
```

Writes the pre-encoded property name and `Single` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

This method writes the `Single` value using the default `StandardFormat` (that is, 'G').

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteNumber(JsonEncodedText, UInt32) method

```csharp
public void WriteNumber (System.Text.Json.JsonEncodedText propertyName, uint value);
```

Writes the pre-encoded property name and `UInt32` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

Writes the `UInt32` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteNumber(JsonEncodedText, UInt64) method

```csharp
public void WriteNumber (System.Text.Json.JsonEncodedText propertyName, ulong value);
```

Writes the pre-encoded property name and `UInt64` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

Writes the `UInt64` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteNumberValue(Decimal) method

```csharp
public void WriteNumberValue (decimal value);
```

Writes a `Decimal` value (as a JSON number).

Parameters:

- `value`: The value to be written as a JSON number.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

This method writes the `Decimal` value using the default `StandardFormat` (that is, 'G').

</format>

## Utf8JsonWriter.WriteNumberValue(Double) method

```csharp
public void WriteNumberValue (double value);
```

Writes a `Double` value (as a JSON number).

Parameters:

- `value`: The value to be written as a JSON number.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

This method writes the `Double` value using the default `StandardFormat` (that is, 'G').

</format>

## Utf8JsonWriter.WriteNumberValue(Int32) method

```csharp
public void WriteNumberValue (int value);
```

Writes an `Int32` value (as a JSON number).

Parameters:

- `value`: The value to be written as a JSON number.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

This method writes the `Int32` value using the default `StandardFormat` (that is, 'G'). For example, 32767.

</format>

## Utf8JsonWriter.WriteNumberValue(Int64) method

```csharp
public void WriteNumberValue (long value);
```

Writes an `Int64` value (as a JSON number).

Parameters:

- `value`: The value to be written as a JSON number.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

This method writes the `Int64` value using the default `StandardFormat` (that is, 'G'). For example, 32767.

</format>

## Utf8JsonWriter.WriteNumberValue(Single) method

```csharp
public void WriteNumberValue (float value);
```

Writes a `Single` value (as a JSON number).

Parameters:

- `value`: The value to be written as a JSON number.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

This method writes the `Single` value using the default `StandardFormat` (that is, 'G').

</format>

## Utf8JsonWriter.WriteNumberValue(UInt32) method

```csharp
public void WriteNumberValue (uint value);
```

Writes a `UInt32` value (as a JSON number).

Parameters:

- `value`: The value to be written as a JSON number.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

This method writes the `UInt32` value using the default `StandardFormat` (that is, 'G'). For example, 32767.

</format>

## Utf8JsonWriter.WriteNumberValue(UInt64) method

```csharp
public void WriteNumberValue (ulong value);
```

Writes a `UInt64` value (as a JSON number).

Parameters:

- `value`: The value to be written as a JSON number.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

This method writes the `UInt64` value using the default `StandardFormat` (that is, 'G'). For example, 32767.

</format>

## Utf8JsonWriter.WritePropertyName(Byte>) method

```csharp
public void WritePropertyName (ReadOnlySpan<byte> utf8PropertyName);
```

Writes the UTF-8 property name (as a JSON string) as the first part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and this write operation would produce invalid JSON.

#### Remarks

The property name is escaped before writing.

## Utf8JsonWriter.WritePropertyName(Char>) method

```csharp
public void WritePropertyName (ReadOnlySpan<char> propertyName);
```

Writes the property name (as a JSON string) as the first part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The property name of the JSON object to be transcoded and written as UTF-8.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and this write operation would produce invalid JSON.

#### Remarks

The property name is escaped before writing.

## Utf8JsonWriter.WritePropertyName(String) method

```csharp
public void WritePropertyName (string propertyName);
```

Writes the property name (as a JSON string) as the first part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The property name of the JSON object to be transcoded and written as UTF-8.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and this write operation would produce invalid JSON.
- `ArgumentNullException`: `propertyName` is `null`.

#### Remarks

The property name is escaped before writing.

## Utf8JsonWriter.WritePropertyName(JsonEncodedText) method

```csharp
public void WritePropertyName (System.Text.Json.JsonEncodedText propertyName);
```

Writes the pre-encoded property name (as a JSON string) as the first part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and this write operation would produce invalid JSON.

#### Remarks

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteRawValue(Byte>, Boolean) method

```csharp
public void WriteRawValue (System.Buffers.ReadOnlySequence<byte> utf8Json, bool skipInputValidation = false);
```

Writes the input as JSON content. It is expected that the input content is a single complete JSON value.

Parameters:

- `utf8Json`: The raw JSON content to write.
- `skipInputValidation`: `false` to validate if the input is an RFC 8259-compliant JSON payload; `true` to skip validation.

Exceptions:

- `ArgumentException`: The length of the input is zero or equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `JsonException`: `skipInputValidation` is `false`, and the input
is not a valid, complete, single JSON value according to the JSON RFC
or the input JSON exceeds a recursive depth of 64.

When writing untrusted JSON values, don't set `skipInputValidation` to `true` as this can result in invalid JSON being written or an invalid overall payload being written to the writer instance.

When using this method, the input content will be written to the writer destination as-is, unless validation fails (when it is enabled).

The `JsonWriterOptions.SkipValidation` value for the writer instance is honored when using this method.

The `JsonWriterOptions.Indented` and `JsonWriterOptions.Encoder` values for the writer instance are not applied when using this method.

## Utf8JsonWriter.WriteRawValue(Byte>, Boolean) method

```csharp
public void WriteRawValue (ReadOnlySpan<byte> utf8Json, bool skipInputValidation = false);
```

Writes the input as JSON content. It is expected that the input content is a single complete JSON value.

Parameters:

- `utf8Json`: The raw JSON content to write.
- `skipInputValidation`: `false` to validate if the input is an RFC 8259-compliant JSON payload; `true` otherwise.

Exceptions:

- `ArgumentException`: The length of the input is zero or equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `JsonException`: `skipInputValidation` is `false`, and the input is not a valid, complete, single JSON value according to the JSON RFC, or the input JSON exceeds a recursive depth of 64.

#### Remarks

When writing untrusted JSON values, do not set `skipInputValidation` to `true` as this can result in invalid JSON being written, or an invalid overall payload being written to the writer.

When using this method, the input content will be written to the writer destination as-is, unless validation fails (when it is enabled).

The `SkipValidation` value for the writer instance is honored when using this method.

The `Indented` and `Encoder` values for the writer instance are not applied when using this method.

## Utf8JsonWriter.WriteRawValue(Char>, Boolean) method

```csharp
public void WriteRawValue (ReadOnlySpan<char> json, bool skipInputValidation = false);
```

Writes the input as JSON content. It is expected that the input content is a single complete JSON value.

Parameters:

- `json`: The raw JSON content to write.
- `skipInputValidation`: `false` to validate if the input is an RFC 8259-compliant JSON payload; `true` otherwise.

Exceptions:

- `ArgumentException`: The length of the input is zero or greater than 715,827,882 (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> / 3).
- `JsonException`: `skipInputValidation` is `false`, and the input is not a valid, complete, single JSON value according to the JSON RFC, or the input JSON exceeds a recursive depth of 64.

#### Remarks

When writing untrusted JSON values, do not set `skipInputValidation` to `true` as this can result in invalid JSON being written, or an invalid overall payload being written to the writer instance.

When using this method, the input content will be written to the writer destination as-is, unless validation fails (when it is enabled).

The `SkipValidation` value for the writer instance is honored when using this method.

The `Indented` and `Encoder` values for the writer instance are not applied when using this method.

## Utf8JsonWriter.WriteRawValue(String, Boolean) method

```csharp
public void WriteRawValue (string json, bool skipInputValidation = false);
```

Writes the input as JSON content. It is expected that the input content is a single complete JSON value.

Parameters:

- `json`: The raw JSON content to write.
- `skipInputValidation`: `false` to validate if the input is an RFC 8259-compliant JSON payload; `true` otherwise.

Exceptions:

- `ArgumentNullException`: `json` is `null`.
- `ArgumentException`: The length of the input is zero or greater than 715,827,882 (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> / 3).
- `JsonException`: `skipInputValidation` is `false`, and the input is not a valid, complete, single JSON value according to the JSON RFC, or the input JSON exceeds a recursive depth of 64.

#### Remarks

When writing untrusted JSON values, do not set `skipInputValidation` to `true` as this can result in invalid JSON being written, or an invalid overall payload being written to the writer instance.

When using this method, the input content will be written to the writer destination as-is, unless validation fails (when it is enabled).

The `SkipValidation` value for the writer instance is honored when using this method.

The `Indented` and `Encoder` values for the writer instance are not applied when using this method.

## Utf8JsonWriter.WriteStartArray() method

```csharp
public void WriteStartArray ();
```

Writes the beginning of a JSON array.

Exceptions:

- `InvalidOperationException`: The depth of the JSON exceeds the maximum depth of 1,000.

-or-

Validation is enabled, and this write operation would produce invalid JSON.

To be added.

## Utf8JsonWriter.WriteStartArray(Byte>) method

```csharp
public void WriteStartArray (ReadOnlySpan<byte> utf8PropertyName);
```

Writes the beginning of a JSON array with a property name specified as a read-only span of bytes as the key.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON array to be written.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: The depth of the JSON exceeds the maximum depth of 1,000.

-or-

Validation is enabled, and this write operation would produce invalid JSON.

<format>

## Remarks

The property name is escaped before writing.

</format>
