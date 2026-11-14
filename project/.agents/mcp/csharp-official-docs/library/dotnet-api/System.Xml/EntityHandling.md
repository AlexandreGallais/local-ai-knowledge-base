---
title: "EntityHandling enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/EntityHandling.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EntityHandling enum

Namespace: `System.Xml`

```csharp
public enum EntityHandling
```

Specifies how the `XmlTextReader` or `XmlValidatingReader` handle entities.

To be added.

## EntityHandling.ExpandCharEntities field

```csharp
ExpandCharEntities
```

Expands character entities and returns general entities as `XmlNodeType.EntityReference` nodes.

You must call `ResolveEntity` to see what the general entities expand to. This enables you to optimize entity handling by only expanding the entity the first time it is used.

When set to `ExpandCharEntities`, a reader call to the `GetAttribute` method expands all entities (both general and character entities).

## EntityHandling.ExpandEntities field

```csharp
ExpandEntities
```

Expands all entities and returns the expanded nodes.

`XmlNodeType.EntityReference` nodes are not returned. The entity text is expanded in place of the entity references.
