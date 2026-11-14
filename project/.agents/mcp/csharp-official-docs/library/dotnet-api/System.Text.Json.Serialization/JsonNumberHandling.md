---
title: "JsonNumberHandling enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonNumberHandling.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonNumberHandling enum

Namespace: `System.Text.Json.Serialization`

```csharp
public enum JsonNumberHandling
```

Determines how `JsonSerializer` handles numbers when serializing and deserializing.

The behavior of `JsonNumberHandling.WriteAsString` and `JsonNumberHandling.AllowNamedFloatingPointLiterals` is not defined by the JSON specification. Altering the default number handling can potentially produce JSON that cannot be parsed by other JSON implementations.

## JsonNumberHandling.AllowNamedFloatingPointLiterals field

```csharp
AllowNamedFloatingPointLiterals
```

The "<example-value>", "<example-value>", and "<example-value>" `JsonTokenType.String` tokens can be read as floating-point constants, and the `Single` and `Double` values for these constants will be written as their corresponding JSON string representations.

This field is not defined by the JSON specification. Altering the default number handling can potentially produce JSON that cannot be parsed by other JSON implementations.

## JsonNumberHandling.AllowReadingFromString field

```csharp
AllowReadingFromString
```

Numbers can be read from `JsonTokenType.String` tokens. Does not prevent numbers from being read from `JsonTokenType.Number` token.

To be added.

## JsonNumberHandling.Strict field

```csharp
Strict
```

Numbers will only be read from `JsonTokenType.Number` tokens and will only be written as JSON numbers (without quotes).

To be added.

## JsonNumberHandling.WriteAsString field

```csharp
WriteAsString
```

Numbers will be written as JSON strings (with quotes), not as JSON numbers.

This field is not defined by the JSON specification. Altering the default number handling can potentially produce JSON that cannot be parsed by other JSON implementations.
