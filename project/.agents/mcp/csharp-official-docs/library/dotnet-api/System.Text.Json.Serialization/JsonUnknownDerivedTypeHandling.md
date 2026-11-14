---
title: "JsonUnknownDerivedTypeHandling enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonUnknownDerivedTypeHandling.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonUnknownDerivedTypeHandling enum

Namespace: `System.Text.Json.Serialization`

```csharp
public enum JsonUnknownDerivedTypeHandling
```

Defines how objects of a derived runtime type that has not been explicitly declared for polymorphic serialization should be handled.

To be added.

## JsonUnknownDerivedTypeHandling.FailSerialization field

```csharp
FailSerialization
```

An object of undeclared runtime type will fail polymorphic serialization.

## JsonUnknownDerivedTypeHandling.FallBackToBaseType field

```csharp
FallBackToBaseType
```

An object of undeclared runtime type will fall back to the serialization contract of the base type.

## JsonUnknownDerivedTypeHandling.FallBackToNearestAncestor field

```csharp
FallBackToNearestAncestor
```

An object of undeclared runtime type will revert to the serialization contract of the nearest declared ancestor type.
Certain interface hierarchies are not supported due to diamond ambiguity constraints.
