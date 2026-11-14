---
title: "JsonIncludeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonIncludeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonIncludeAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonIncludeAttribute : System.Text.Json.Serialization.JsonAttribute
```

Indicates that the member should be included for serialization and deserialization.

#### Remarks

When applied to a property, this attribute indicates that non-public *getters* and *setters* can be used for serialization and deserialization.

> **Note:**
> Even with this attribute, the serialization source generator is still limited to non-public members that are *accessible* to the generated code. *Accessible* non-public members include those that are:
>
> - `internal` when in the same assembly as the generated context.
> - `protected`, `protected internal`, or `private protected` when the generated context is in a class that derives from the type.
> - `private` if the type is nested in the same class as the generated context.

## JsonIncludeAttribute.JsonIncludeAttribute() constructor

```csharp
public JsonIncludeAttribute ();
```

Initializes a new instance of `JsonIncludeAttribute`.

To be added.
