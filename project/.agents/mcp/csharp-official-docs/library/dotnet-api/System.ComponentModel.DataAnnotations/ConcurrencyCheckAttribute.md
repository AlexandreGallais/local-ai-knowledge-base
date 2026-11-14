---
title: "ConcurrencyCheckAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/ConcurrencyCheckAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrencyCheckAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class ConcurrencyCheckAttribute : Attribute
```

Specifies that a property participates in optimistic concurrency checks.

To be added.

## ConcurrencyCheckAttribute.ConcurrencyCheckAttribute() constructor

```csharp
public ConcurrencyCheckAttribute ();
```

Initializes a new instance of the `ConcurrencyCheckAttribute` class.

#### Remarks
You apply the `ConcurrencyCheckAttribute` attribute to a property in order to specify that the property indicates whether the data record in the application is still current with the data record in the data source.
