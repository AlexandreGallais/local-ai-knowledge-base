---
title: "JsonEncodedText struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonEncodedText.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonEncodedText struct

Namespace: `System.Text.Json`

```csharp
public readonly struct JsonEncodedText : IEquatable<System.Text.Json.JsonEncodedText>
```

Provides methods to transform UTF-8 or UTF-16 encoded text into a form that is suitable for JSON.

#### Remarks

This type can be used to cache and store known strings used for writing JSON ahead of time by pre-encoding them up front.

## JsonEncodedText.EncodedUtf8Bytes property

```csharp
public ReadOnlySpan<byte> EncodedUtf8Bytes { get; }
```

Gets the UTF-8 encoded representation of the pre-encoded JSON text.

Returns: The UTF-8 encoded representation of the pre-encoded JSON text.

To be added.

## JsonEncodedText.Value property

```csharp
public string Value { get; }
```

Gets the UTF-16 encoded representation of the pre-encoded JSON text as a `String`.

Returns: To be added.

To be added.

## JsonEncodedText.Encode(Byte>, JavaScriptEncoder) method

```csharp
public static System.Text.Json.JsonEncodedText Encode (ReadOnlySpan<byte> utf8Value, System.Text.Encodings.Web.JavaScriptEncoder? encoder = default);
```

Encodes a UTF-8 text value as a JSON string.

Parameters:

- `utf8Value`: The UTF-8 encoded text to convert to JSON encoded text.
- `encoder`: The encoder to use when escaping the string, or `null` to use the default encoder.

Returns: The encoded JSON text.

Exceptions:

- `ArgumentException`: `utf8Value` is too large.

-or-

`utf8Value` contains invalid UTF-8 bytes.

To be added.

## JsonEncodedText.Encode(Char>, JavaScriptEncoder) method

```csharp
public static System.Text.Json.JsonEncodedText Encode (ReadOnlySpan<char> value, System.Text.Encodings.Web.JavaScriptEncoder? encoder = default);
```

Encodes a specified text value as a JSON string.

Parameters:

- `value`: The value to convert to JSON encoded text.
- `encoder`: The encoder to use when escaping the string, or `null` to use the default encoder.

Returns: The encoded JSON text.

Exceptions:

- `ArgumentException`: `value` is too large.

-or-

`value` contains invalid UTF-16 characters.

To be added.

## JsonEncodedText.Encode(String, JavaScriptEncoder) method

```csharp
public static System.Text.Json.JsonEncodedText Encode (string value, System.Text.Encodings.Web.JavaScriptEncoder? encoder = default);
```

Encodes the string text value as a JSON string.

Parameters:

- `value`: The value to convert to JSON encoded text.
- `encoder`: The encoder to use when escaping the string, or `null` to use the default encoder.

Returns: The encoded JSON text.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `value` is too large.

-or-

`value` contains invalid UTF-16 characters.

To be added.

## JsonEncodedText.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether this instance and a specified object, which must also be a `JsonEncodedText` instance, have the same value.

Parameters:

- `obj`: The object to compare to this instance.

Returns: `true` if the current instance and `obj` are equal; otherwise, `false`.

#### Remarks

If `obj` is `null`, the method returns `false`.

## JsonEncodedText.Equals(JsonEncodedText) method

```csharp
public bool Equals (System.Text.Json.JsonEncodedText other);
```

Determines whether this instance and another specified `JsonEncodedText` instance have the same value.

Parameters:

- `other`: The object to compare to this instance.

Returns: `true` if this instance and `other` have the same value; otherwise, `false`.

#### Remarks

Default instances of `JsonEncodedText` are treated as equal.

## JsonEncodedText.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this `JsonEncodedText`.

Returns: The hash code for this instance.

#### Remarks

This method returns 0 on a default instance of `JsonEncodedText`.

## JsonEncodedText.ToString() method

```csharp
public override string ToString ();
```

Converts the value of this instance to a `String`.

Returns: The underlying UTF-16 encoded string.

#### Remarks

This method returns an empty string on a default instance of `JsonEncodedText`.
