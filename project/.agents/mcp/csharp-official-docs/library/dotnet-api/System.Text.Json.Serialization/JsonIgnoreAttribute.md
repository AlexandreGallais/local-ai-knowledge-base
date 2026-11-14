---
title: "JsonIgnoreAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonIgnoreAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonIgnoreAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonIgnoreAttribute : System.Text.Json.Serialization.JsonAttribute
```

Prevents a property from being serialized or deserialized.

#### Remarks

For more information, see How to ignore properties with System.Text.Json.

## JsonIgnoreAttribute.JsonIgnoreAttribute() constructor

```csharp
public JsonIgnoreAttribute ();
```

Initializes a new instance of `JsonIgnoreAttribute`.

To be added.

## JsonIgnoreAttribute.Condition property

```csharp
public System.Text.Json.Serialization.JsonIgnoreCondition Condition { get; set; }
```

Gets or sets the condition that must be met before a property will be ignored.

Returns: To be added.

#### Remarks

The default value is `Always`.
