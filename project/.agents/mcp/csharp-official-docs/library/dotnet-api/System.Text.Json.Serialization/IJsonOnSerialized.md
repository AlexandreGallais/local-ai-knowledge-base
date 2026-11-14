---
title: "IJsonOnSerialized interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/IJsonOnSerialized.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IJsonOnSerialized interface

Namespace: `System.Text.Json.Serialization`

```csharp
public interface IJsonOnSerialized
```

Specifies that the type should have its `IJsonOnSerialized.OnSerialized` method called after serialization occurs.

#### Remarks

This behavior is only supported on types representing JSON objects.
Types that have a custom converter or represent either collections or primitive values do not support this behavior.

## IJsonOnSerialized.OnSerialized() method

```csharp
public void OnSerialized ();
```

The method that is called after serialization.

To be added.
