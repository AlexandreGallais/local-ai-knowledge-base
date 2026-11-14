---
title: "JsonCommentHandling enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonCommentHandling.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonCommentHandling enum

Namespace: `System.Text.Json`

```csharp
public enum JsonCommentHandling
```

Defines how the `Utf8JsonReader` struct handles comments.

#### Remarks

For more information, see How to allow some kinds of invalid JSON with System.Text.Json.

## JsonCommentHandling.Allow field

```csharp
Allow
```

Allows comments within the JSON input and treats them as valid tokens. While reading, the caller can access the comment values.

## JsonCommentHandling.Disallow field

```csharp
Disallow
```

Doesn't allow comments within the JSON input. Comments are treated as invalid JSON if found, and a `JsonException` is thrown. This is the default value.

## JsonCommentHandling.Skip field

```csharp
Skip
```

Allows comments within the JSON input and ignores them. The `Utf8JsonReader` behaves as if no comments are present.
