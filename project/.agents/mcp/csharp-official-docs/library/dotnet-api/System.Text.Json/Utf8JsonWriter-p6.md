---
title: "Utf8JsonWriter class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/Utf8JsonWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8JsonWriter class (part 6 of 7)

## Utf8JsonWriter.WriteString(Char>, Char>) method

```csharp
public void WriteString (ReadOnlySpan<char> propertyName, ReadOnlySpan<char> value);
```

Writes a UTF-16 property name and UTF-16 text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The UTF-16 encoded value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The property name and value are escaped before writing.

</format>

## Utf8JsonWriter.WriteString(Char>, String) method

```csharp
public void WriteString (ReadOnlySpan<char> propertyName, string? value);
```

Writes a UTF-16 property name and string text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The UTF-16 encoded value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The property name and value are escaped before writing.

If `value` is `null`, the JSON **null** value is written, as if the `WriteNull` method was called.

</format>

## Utf8JsonWriter.WriteString(Char>, JsonEncodedText) method

```csharp
public void WriteString (ReadOnlySpan<char> propertyName, System.Text.Json.JsonEncodedText value);
```

Writes the property name and pre-encoded value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The JSON encoded value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

#### Remarks

The value should already be escaped when the instance of `JsonEncodedText` was created.

The property name is escaped before writing.

## Utf8JsonWriter.WriteString(String, DateTime) method

```csharp
public void WriteString (string propertyName, DateTime value);
```

Writes a property name specified as a string and a `DateTime` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

Writes the `DateTime` using the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json);
for example, 2017-06-12T05:30:45.7680000.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteString(String, DateTimeOffset) method

```csharp
public void WriteString (string propertyName, DateTimeOffset value);
```

Writes a property name specified as a string and a `DateTimeOffset` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

Writes the `DateTimeOffset` using the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json);
for example, 2017-06-12T05:30:45.7680000-07:00.

The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteString(String, Guid) method

```csharp
public void WriteString (string propertyName, Guid value);
```

Writes a property name specified as a string and a `Guid` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

Writes the `Guid` using the default `StandardFormat` (that is, 'D'), in the form: nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn. The property name is escaped before writing.

</format>

## Utf8JsonWriter.WriteString(String, Byte>) method

```csharp
public void WriteString (string propertyName, ReadOnlySpan<byte> utf8Value);
```

Writes a property name specified as a string and a UTF-8 text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `utf8Value`: The UTF-8 encoded value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

The property name and value are escaped before writing.

</format>

## Utf8JsonWriter.WriteString(String, Char>) method

```csharp
public void WriteString (string propertyName, ReadOnlySpan<char> value);
```

Writes a property name specified as a string and a UTF-16 text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The UTF-16 encoded value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

The property name and value are escaped before writing.

</format>

## Utf8JsonWriter.WriteString(String, String) method

```csharp
public void WriteString (string propertyName, string? value);
```

Writes a property name specified as a string and a string text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The UTF-16 encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The UTF-16 encoded value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name or value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

<format>

## Remarks

The property name and value are escaped before writing.

If `value` is `null`, the JSON **null** value is written, as if the `WriteNull` method was called.

</format>

## Utf8JsonWriter.WriteString(String, JsonEncodedText) method

```csharp
public void WriteString (string propertyName, System.Text.Json.JsonEncodedText value);
```

Writes the property name and pre-encoded value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The JSON encoded value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified property name is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.
- `ArgumentNullException`: The `propertyName` parameter is `null`.

#### Remarks

The value should already be escaped when the instance of `JsonEncodedText` was created.

The property name is escaped before writing.

## Utf8JsonWriter.WriteString(JsonEncodedText, DateTime) method

```csharp
public void WriteString (System.Text.Json.JsonEncodedText propertyName, DateTime value);
```

Writes the pre-encoded property name and `DateTime` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

#### Remarks

Writes the `DateTime` using the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json);
for example, 2017-06-12T05:30:45.7680000.

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteString(JsonEncodedText, DateTimeOffset) method

```csharp
public void WriteString (System.Text.Json.JsonEncodedText propertyName, DateTimeOffset value);
```

Writes the pre-encoded property name and `DateTimeOffset` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

#### Remarks

Writes the `DateTimeOffset` using the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json);
for example, 2017-06-12T05:30:45.7680000-07:00.

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteString(JsonEncodedText, Guid) method

```csharp
public void WriteString (System.Text.Json.JsonEncodedText propertyName, Guid value);
```

Writes the pre-encoded property name and `Guid` value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

#### Remarks

Writes the `Guid` using the default `StandardFormat` (that is, 'D'), in the form: nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn.

The property name should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteString(JsonEncodedText, Byte>) method

```csharp
public void WriteString (System.Text.Json.JsonEncodedText propertyName, ReadOnlySpan<byte> utf8Value);
```

Writes the pre-encoded property name and UTF-8 text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `utf8Value`: The UTF-8 encoded value to be written as a JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

#### Remarks

The property name should already be escaped when the instance of `JsonEncodedText` was created.

The value is escaped before writing.

## Utf8JsonWriter.WriteString(JsonEncodedText, Char>) method

```csharp
public void WriteString (System.Text.Json.JsonEncodedText propertyName, ReadOnlySpan<char> value);
```

Writes the pre-encoded property name and text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

#### Remarks

The property name should already be escaped when the instance of `JsonEncodedText` was created.

The value is escaped before writing.

If `value` is `null`, the JSON **null** value is written, as if the `WriteNull` method was called.

## Utf8JsonWriter.WriteString(JsonEncodedText, String) method

```csharp
public void WriteString (System.Text.Json.JsonEncodedText propertyName, string? value);
```

Writes the pre-encoded property name and string text value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

#### Remarks

The property name should already be escaped when the instance of `JsonEncodedText` was created.

The value is escaped before writing.

If `value` is `null`, the JSON **null** value is written, as if the `WriteNull` method was called.
