---
title: "JsonSerializerDefaults enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializerDefaults.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializerDefaults enum

Namespace: `System.Text.Json`

```csharp
public enum JsonSerializerDefaults
```

Specifies scenario-based default serialization options that can be used to construct a `JsonSerializerOptions` instance.

To be added.

## JsonSerializerDefaults.General field

```csharp
General
```

General-purpose option values. These are the same settings that are applied if a `JsonSerializerDefaults` member isn't specified.

For information about the default property values that are applied, see JsonSerializerOptions properties.

This option implies that property names are treated as case-sensitive and that "PascalCase" name formatting should be employed.

## JsonSerializerDefaults.Strict field

```csharp
Strict
```

Option values appropriate for strict JSON parsing.

This member implies that:

Unmapped JSON properties aren't allowed.
Duplicate JSON properties aren't allowed.
Nullable reference type annotations are respected.
Required constructor parameters are respected.

This option configures stricter deserialization behavior that rejects unmapped or duplicate properties, and enforces both nullable annotations and required constructor parameters.

## JsonSerializerDefaults.Web field

```csharp
Web
```

Option values appropriate to Web-based scenarios.

This member implies that:

Integers must be encoded as small as possible.
Property names are treated as case-insensitive.
"camelCase" name formatting should be employed.
Quoted numbers (JSON strings for number properties) are allowed.

This option implies that property names are treated as case-insensitive and that "camelCase" name formatting should be employed.
