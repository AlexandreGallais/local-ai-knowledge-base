---
title: "Utf8JsonWriter class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/Utf8JsonWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8JsonWriter class (part 3 of 7)

## Remarks

Writes the `Decimal` using the default `StandardFormat` (that is, 'G').

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Char>, Double) method

```csharp
public void WriteNumber (ReadOnlySpan<char> propertyName, double value);
```

Writes a property name specified as a read-only character span and a `Double` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

This method writes the `Double` value using the default `StandardFormat` (that is, 'G').

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Char>, Int32) method

```csharp
public void WriteNumber (ReadOnlySpan<char> propertyName, int value);
```

Writes a property name specified as a read-only character span and an `Int32` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `Int32` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Char>, Int64) method

```csharp
public void WriteNumber (ReadOnlySpan<char> propertyName, long value);
```

Writes a property name specified as a read-only character span and an `Int64` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `Int64` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Char>, Single) method

```csharp
public void WriteNumber (ReadOnlySpan<char> propertyName, float value);
```

Writes a property name specified as a read-only character span and a `Single` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

This method writes the `Single` value using the default `StandardFormat` (that is, 'G').

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Char>, UInt32) method

```csharp
public void WriteNumber (ReadOnlySpan<char> propertyName, uint value);
```

Writes a property name specified as a read-only character span and a `UInt32` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `UInt32` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(Char>, UInt64) method

```csharp
public void WriteNumber (ReadOnlySpan<char> propertyName, ulong value);
```

Writes a property name specified as a read-only character span and a `UInt64` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `UInt64` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(String, Decimal) method

```csharp
public void WriteNumber (string propertyName, decimal value);
```

Writes a property name specified as a string and a `Decimal` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

Writes the `Decimal` using the default `StandardFormat` (that is, 'G').

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(String, Double) method

```csharp
public void WriteNumber (string propertyName, double value);
```

Writes a property name specified as a string and a `Double` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

This method writes the `Double` value using the default `StandardFormat` (that is, 'G').

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(String, Int32) method

```csharp
public void WriteNumber (string propertyName, int value);
```

Writes a property name specified as a string and an `Int32` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

Writes the `Int32` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(String, Int64) method

```csharp
public void WriteNumber (string propertyName, long value);
```

Writes a property name specified as a string and an `Int64` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

Writes the `Int64` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(String, Single) method

```csharp
public void WriteNumber (string propertyName, float value);
```

Writes a property name specified as a string and a `Single` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

This method writes the `Single` value using the default `StandardFormat` (that is, 'G').

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(String, UInt32) method

```csharp
public void WriteNumber (string propertyName, uint value);
```

Writes a property name specified as a string and a `UInt32` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

Writes the `UInt32` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(String, UInt64) method

```csharp
public void WriteNumber (string propertyName, ulong value);
```

Writes a property name specified as a string and a `UInt64` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

Writes the `UInt64` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteNumber(JsonEncodedText, Decimal) method

```csharp
public void WriteNumber (System.Text.Json.JsonEncodedText propertyName, decimal value);
```

Writes the pre-encoded property name and `Decimal` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

Writes the `Decimal` using the default `StandardFormat` (that is, 'G').

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteNumber(JsonEncodedText, Double) method

```csharp
public void WriteNumber (System.Text.Json.JsonEncodedText propertyName, double value);
```

Writes the pre-encoded property name and `Double` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

This method writes the `Double` value using the default `StandardFormat` (that is, 'G').

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteNumber(JsonEncodedText, Int32) method

```csharp
public void WriteNumber (System.Text.Json.JsonEncodedText propertyName, int value);
```

Writes the pre-encoded property name and `Int32` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

Writes the `Int32` using the default `StandardFormat` (that is, 'G'); for example, 32767.

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteNumber(JsonEncodedText, Int64) method

```csharp
public void WriteNumber (System.Text.Json.JsonEncodedText propertyName, long value);
```

Writes the pre-encoded property name and `Int64` value (as a JSON number) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON number as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

Writes the `Int64` using the default `StandardFormat` (this is, 'G'); for example, 32767.

The property name should already be escaped when the instance of `JsonEncodedText` was created.
