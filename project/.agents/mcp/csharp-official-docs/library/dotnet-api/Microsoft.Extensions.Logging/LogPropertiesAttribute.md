---
title: "LogPropertiesAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LogPropertiesAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LogPropertiesAttribute class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public sealed class LogPropertiesAttribute : Attribute
```

Marks a logging method parameter whose public properties need to be logged as log tags.

To be added.

## LogPropertiesAttribute.LogPropertiesAttribute() constructor

```csharp
public LogPropertiesAttribute ();
```

To be added.

To be added.

## LogPropertiesAttribute.OmitReferenceName property

```csharp
public bool OmitReferenceName { get; set; }
```

Gets or sets a value indicating whether to prefix the name of the parameter or property to the generated name of each tag being logged.

Returns: Defaults to `false`.

To be added.

## LogPropertiesAttribute.SkipNullProperties property

```csharp
public bool SkipNullProperties { get; set; }
```

Gets or sets a value indicating whether `null` properties are logged.

Returns: Defaults to `false`.

To be added.

## LogPropertiesAttribute.Transitive property

```csharp
public bool Transitive { get; set; }
```

Gets or sets a value indicating whether to transitively visit properties which are complex objects.

Returns: Defaults to `false`.

When logging the properties of an object, this property controls the behavior for each encountered property.
When this property is `false`, then each property is serialized by calling `Object.ToString` to
generate a string for the property. When this property is `true`, then each property of any complex objects are
expanded individually.
