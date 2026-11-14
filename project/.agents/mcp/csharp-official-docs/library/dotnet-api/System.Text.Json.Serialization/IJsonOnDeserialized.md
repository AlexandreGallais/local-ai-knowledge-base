---
title: "IJsonOnDeserialized interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/IJsonOnDeserialized.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IJsonOnDeserialized interface

Namespace: `System.Text.Json.Serialization`

```csharp
public interface IJsonOnDeserialized
```

Specifies that the JSON type should have its `IJsonOnDeserialized.OnDeserialized` method called after deserialization occurs.

#### Remarks

This behavior is only supported on types representing JSON objects. Types that have a custom converter or represent either collections or primitive values do not support this behavior.

## IJsonOnDeserialized.OnDeserialized() method

```csharp
public void OnDeserialized ();
```

The method that is called after deserialization.

To be added.
