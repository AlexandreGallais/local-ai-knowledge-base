---
title: "Utf8JsonWriter class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/Utf8JsonWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8JsonWriter class (part 5 of 7)

## Utf8JsonWriter.WriteStartArray(Char>) method

```csharp
public void WriteStartArray (ReadOnlySpan<char> propertyName);
```

Writes the beginning of a JSON array with a property name specified as a read-only character span as the key.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON array to be transcoded and written as UTF-8.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: The depth of the JSON exceeds the maximum depth of 1,000.

-or-

Validation is enabled, and this write operation would produce invalid JSON.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteStartArray(String) method

```csharp
public void WriteStartArray (string propertyName);
```

Writes the beginning of a JSON array with a property name specified as a string as the key.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON array to be transcoded and written as UTF-8.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: The depth of the JSON exceeds the maximum depth of 1,000.

-or-

Validation is enabled, and this write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteStartArray(JsonEncodedText) method

```csharp
public void WriteStartArray (System.Text.Json.JsonEncodedText propertyName);
```

Writes the beginning of a JSON array with a pre-encoded property name as the key.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON array to be transcoded and written as UTF-8.

Exceptions:

- `InvalidOperationException`: The depth of the JSON has exceeded the maximum depth of 1,000.

-or-

Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteStartObject() method

```csharp
public void WriteStartObject ();
```

Writes the beginning of a JSON object.

Exceptions:

- `InvalidOperationException`: The depth of the JSON exceeds the maximum depth of 1,000.

-or-

Validation is enabled, and the operation would result in writing invalid JSON.

To be added.

## Utf8JsonWriter.WriteStartObject(Byte>) method

```csharp
public void WriteStartObject (ReadOnlySpan<byte> utf8PropertyName);
```

Writes the beginning of a JSON object with a property name specified as a read-only span of bytes as the key.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: The depth of the JSON exceeds the maximum depth of 1,000.

-or-

Validation is enabled, and this write operation would produce invalid JSON.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteStartObject(Char>) method

```csharp
public void WriteStartObject (ReadOnlySpan<char> propertyName);
```

Writes the beginning of a JSON object with a property name specified as a read-only character span as the key.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: The depth of the JSON exceeds the maximum depth of 1,000.

-or-

Validation is enabled, and this write operation would produce invalid JSON.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteStartObject(String) method

```csharp
public void WriteStartObject (string propertyName);
```

Writes the beginning of a JSON object with a property name specified as a string as the key.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: The depth of the JSON exceeds the maximum depth of 1,000.

-or-

Validation is enabled, and this write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteStartObject(JsonEncodedText) method

```csharp
public void WriteStartObject (System.Text.Json.JsonEncodedText propertyName);
```

Writes the beginning of a JSON object with a pre-encoded property name as the key.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.

Exceptions:

- `InvalidOperationException`: The depth of the JSON has exceeded the maximum depth of 1,000.

-or-

Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteString(Byte>, DateTime) method

```csharp
public void WriteString (ReadOnlySpan<byte> utf8PropertyName, DateTime value);
```

Writes a UTF-8 property name and a `DateTime` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `DateTime` using the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json);
for example, 2017-06-12T05:30:45.7680000.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteString(Byte>, DateTimeOffset) method

```csharp
public void WriteString (ReadOnlySpan<byte> utf8PropertyName, DateTimeOffset value);
```

Writes a UTF-8 property name and a `DateTimeOffset` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `DateTimeOffset` using the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json);
for example, 2017-06-12T05:30:45.7680000-07:00.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteString(Byte>, Guid) method

```csharp
public void WriteString (ReadOnlySpan<byte> utf8PropertyName, Guid value);
```

Writes a UTF-8 property name and a `Guid` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `Guid` using the default `StandardFormat` (that is, 'D'), in the form: nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn. The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteString(Byte>, Byte>) method

```csharp
public void WriteString (ReadOnlySpan<byte> utf8PropertyName, ReadOnlySpan<byte> utf8Value);
```

Writes a UTF-8 property name and UTF-8 text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `utf8Value`: The UTF-8 encoded value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The property name and value are escaped before writing.

</format>

## Utf8JsonWriter.WriteString(Byte>, Char>) method

```csharp
public void WriteString (ReadOnlySpan<byte> utf8PropertyName, ReadOnlySpan<char> value);
```

Writes a UTF-8 property name and UTF-16 text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The UTF-16 encoded value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The property name and value are escaped before writing.

</format>

## Utf8JsonWriter.WriteString(Byte>, String) method

```csharp
public void WriteString (ReadOnlySpan<byte> utf8PropertyName, string? value);
```

Writes a UTF-8 property name and string text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The UTF-16 encoded value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The property name and value are escaped before writing.

If `value` is `null`, the JSON **null** value is written, as if the `WriteNull` method was called.

</format>

## Utf8JsonWriter.WriteString(Byte>, JsonEncodedText) method

```csharp
public void WriteString (ReadOnlySpan<byte> utf8PropertyName, System.Text.Json.JsonEncodedText value);
```

Writes the UTF-8 property name and pre-encoded value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `utf8PropertyName`: The UTF-8 encoded property name of the JSON object to be written.
- `value`: The JSON encoded value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and this method would result in writing invalid JSON.

#### Remarks

The value should already be escaped when the instance of `JsonEncodedText` was created.

The property name is escaped before writing.

## Utf8JsonWriter.WriteString(Char>, DateTime) method

```csharp
public void WriteString (ReadOnlySpan<char> propertyName, DateTime value);
```

Writes a property name specified as a read-only character span and a `DateTime` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `DateTime` using the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json);
for example, 2017-06-12T05:30:45.7680000.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteString(Char>, DateTimeOffset) method

```csharp
public void WriteString (ReadOnlySpan<char> propertyName, DateTimeOffset value);
```

Writes a property name specified as a read-only character span and a `DateTimeOffset` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `DateTimeOffset` using the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json);
for example, 2017-06-12T05:30:45.7680000-07:00.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteString(Char>, Guid) method

```csharp
public void WriteString (ReadOnlySpan<char> propertyName, Guid value);
```

Writes a property name specified as a read-only character span and a `Guid` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

Writes the `Guid` using the default `StandardFormat` (that is, 'D'), in the form: nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn. The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteString(Char>, Byte>) method

```csharp
public void WriteString (ReadOnlySpan<char> propertyName, ReadOnlySpan<byte> utf8Value);
```

Writes a UTF-16 property name and UTF-8 text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `utf8Value`: The UTF-8 encoded value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The property name and value are escaped before writing.

</format>
