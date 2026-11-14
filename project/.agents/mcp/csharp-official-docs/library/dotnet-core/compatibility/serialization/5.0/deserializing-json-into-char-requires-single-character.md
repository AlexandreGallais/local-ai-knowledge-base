---
title: "Breaking change: Deserialize char requires single-character string"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/serialization/5.0/deserializing-json-into-char-requires-single-character.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.Text.Json requires single-char string to deserialize a char

To successfully deserialize a `System.Char` using `System.Text.Json`, the JSON string must contain a single character.

## Change description

In previous .NET versions, a multi-`char` string in the JSON is successfully deserialized to a `char` property or field. Only the first `char` of the string is used, as in the following example:

```csharp
// .NET Core 3.0 and 3.1: Returns the first char 'a'.
// .NET 5 and later: Throws JsonException because payload has more than one char.
char deserializedChar = JsonSerializer.Deserialize<char>("\"abc\"");
```

In .NET 5 and later, anything other than a single-`char` string causes a `System.Text.Json.JsonException` to be thrown when the deserialization target is a `char`. The following example string is successfully deserialized in all .NET versions:

```csharp
// Correct usage.
char deserializedChar = JsonSerializer.Deserialize<char>("\"a\"");
```

## Version introduced

5.0

## Reason for change

Parsing for deserialization should only succeed when the provided payload is valid for the target type. For a `char` type, the only valid payload is a single-`char` string.

## Recommended action

When you deserialize JSON into a `char` target, make sure the string consists of a single `char`.

## Affected APIs

- `System.Text.Json.JsonSerializer.Deserialize*`
