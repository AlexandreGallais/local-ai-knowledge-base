---
title: "Utf8JsonWriter class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/Utf8JsonWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8JsonWriter class (part 7 of 7)

## Utf8JsonWriter.WriteString(JsonEncodedText, JsonEncodedText) method

```csharp
public void WriteString (System.Text.Json.JsonEncodedText propertyName, System.Text.Json.JsonEncodedText value);
```

Writes the pre-encoded property name and pre-encoded value (as a JSON string) as part of a name/value pair of a JSON object.

Parameters:

- `propertyName`: The JSON encoded property name of the JSON object to be transcoded and written as UTF-8.
- `value`: The JSON encoded value to be written as a UTF-8 transcoded JSON string as part of the name/value pair.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

#### Remarks

The property name and value should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteStringValue(DateTime) method

```csharp
public void WriteStringValue (DateTime value);
```

Writes a `DateTime` value (as a JSON string).

Parameters:

- `value`: The value to be written as a JSON string.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

This method writes the `DateTime` using the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json);
for example, 2017-06-12T05:30:45.7680000.

</format>

## Utf8JsonWriter.WriteStringValue(DateTimeOffset) method

```csharp
public void WriteStringValue (DateTimeOffset value);
```

Writes a `DateTimeOffset` value (as a JSON string).

Parameters:

- `value`: The value to be written as a JSON string.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

This method writes the `DateTimeOffset` using the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json); for example, 2017-06-12T05:30:45.7680000-07:00.

</format>

## Utf8JsonWriter.WriteStringValue(Guid) method

```csharp
public void WriteStringValue (Guid value);
```

Writes a `Guid` value (as a JSON string).

Parameters:

- `value`: The value to be written as a JSON string.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the operation would result in writing invalid JSON.

<format>

## Remarks

This method writes the `Guid` value using the default `StandardFormat` (that is, 'D'), as the form: nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn.

</format>

## Utf8JsonWriter.WriteStringValue(Byte>) method

```csharp
public void WriteStringValue (ReadOnlySpan<byte> utf8Value);
```

Writes a UTF-8 text value (as a JSON string).

Parameters:

- `utf8Value`: The UTF-8 encoded value to be written as a JSON string.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The value is escaped before writing.

</format>

## Utf8JsonWriter.WriteStringValue(Char>) method

```csharp
public void WriteStringValue (ReadOnlySpan<char> value);
```

Writes a UTF-16 text value (as a JSON string).

Parameters:

- `value`: The UTF-16 encoded value to be written as a UTF-8 transcoded JSON string.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The value is escaped before writing.

</format>

## Utf8JsonWriter.WriteStringValue(String) method

```csharp
public void WriteStringValue (string? value);
```

Writes a string text value (as a JSON string).

Parameters:

- `value`: The UTF-16 encoded value to be written as a UTF-8 transcoded JSON string.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

<format>

## Remarks

The value is escaped before writing.

If `value` is `null`, the JSON **null** value is written, as if the `WriteNullValue` method was called.

</format>

## Utf8JsonWriter.WriteStringValue(JsonEncodedText) method

```csharp
public void WriteStringValue (System.Text.Json.JsonEncodedText value);
```

Writes the pre-encoded text value (as a JSON string).

Parameters:

- `value`: The JSON encoded value to be written as a UTF-8 transcoded JSON string.

Exceptions:

- `InvalidOperationException`: Validation is enabled, and the write operation would produce invalid JSON.

#### Remarks

The value should already be escaped when the instance of `JsonEncodedText` was created.

## Utf8JsonWriter.WriteStringValueSegment(Byte>, Boolean) method

```csharp
public void WriteStringValueSegment (ReadOnlySpan<byte> value, bool isFinalSegment);
```

Writes the UTF-8 text value segment as a partial JSON string.

Parameters:

- `value`: The UTF-8 encoded value to be written as a JSON string element of a JSON array.
- `isFinalSegment`: Indicates that this is the final segment of the string.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: When validation is enabled, this would result in invalid JSON being written, or if the previously written segment (if any) was not written with this same overload.

The value is escaped before writing.

## Utf8JsonWriter.WriteStringValueSegment(Char>, Boolean) method

```csharp
public void WriteStringValueSegment (ReadOnlySpan<char> value, bool isFinalSegment);
```

Writes the text value segment as a partial JSON string.

Parameters:

- `value`: The value to write.
- `isFinalSegment`: Indicates that this is the final segment of the string.

Exceptions:

- `ArgumentException`: The specified value is too large.
- `InvalidOperationException`: When validation is enabled, this would result in invalid JSON being written, or if the previously written segment (if any) was not written with this same overload.

The value is escaped before writing.
