---
title: "JsonTokenType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonTokenType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonTokenType enum

Namespace: `System.Text.Json`

```csharp
public enum JsonTokenType
```

Defines the various JSON tokens that make up a JSON text.

#### Remarks

For more information, see How to write custom serializers and deserializers with System.Text.Json.

## JsonTokenType.Comment field

```csharp
Comment
```

The token type is a comment string.

## JsonTokenType.EndArray field

```csharp
EndArray
```

The token type is the end of a JSON array.

## JsonTokenType.EndObject field

```csharp
EndObject
```

The token type is the end of a JSON object.

## JsonTokenType.False field

```csharp
False
```

The token type is the JSON literal false.

## JsonTokenType.None field

```csharp
None
```

There is no value (as distinct from `JsonTokenType.Null`). This is the default token type if no data has been read by the `Utf8JsonReader`.

#### Remarks

This is the default token type if no data has been read by the `Utf8JsonReader`.

## JsonTokenType.Null field

```csharp
Null
```

The token type is the JSON literal null.

## JsonTokenType.Number field

```csharp
Number
```

The token type is a JSON number.

## JsonTokenType.PropertyName field

```csharp
PropertyName
```

The token type is a JSON property name.

## JsonTokenType.StartArray field

```csharp
StartArray
```

The token type is the start of a JSON array.

## JsonTokenType.StartObject field

```csharp
StartObject
```

The token type is the start of a JSON object.

## JsonTokenType.String field

```csharp
String
```

The token type is a JSON string.

## JsonTokenType.True field

```csharp
True
```

The token type is the JSON literal true.
