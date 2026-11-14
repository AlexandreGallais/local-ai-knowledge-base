---
title: "IJsonOnSerializing interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/IJsonOnSerializing.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IJsonOnSerializing interface

Namespace: `System.Text.Json.Serialization`

```csharp
public interface IJsonOnSerializing
```

Specifies that the type should have its `IJsonOnSerializing.OnSerializing` method called before serialization occurs.

#### Remarks

This behavior is only supported on types representing JSON objects.
Types that have a custom converter or represent either collections or primitive values do not support this behavior.

## IJsonOnSerializing.OnSerializing() method

```csharp
public void OnSerializing ();
```

The method that is called before serialization.

To be added.
