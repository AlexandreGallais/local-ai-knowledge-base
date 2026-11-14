---
title: "DisplayAttribute class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/DisplayAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DisplayAttribute class (part 2 of 2)

## DisplayAttribute.GetOrder() method

```csharp
public int? GetOrder ();
```

Returns the value of the `DisplayAttribute.Order` property.

Returns: The value of the `DisplayAttribute.Order` property, if it has been set; otherwise, `null`.

#### Remarks
If an order is not specified, presentation layers should consider setting the value of the `Order` property to 10000. This value lets explicitly-ordered fields be displayed before and after the fields that do not have a specified order.

## DisplayAttribute.GetPrompt() method

```csharp
public string? GetPrompt ();
```

Returns the value of the `DisplayAttribute.Prompt` property.

Returns: The localized string for the `DisplayAttribute.Prompt` property if the `DisplayAttribute.ResourceType` property has been specified and if the `DisplayAttribute.Prompt` property represents a resource key; otherwise, the non-localized value of the `DisplayAttribute.Prompt` property.

Exceptions:

- `InvalidOperationException`: Both the `DisplayAttribute.ResourceType` property and `DisplayAttribute.Prompt` properties were set, but a public static property with a name matching the `DisplayAttribute.Prompt` value couldn't be found on the `DisplayAttribute.ResourceType`.

#### Remarks
The `Prompt` property is typically used as a prompt or watermark for a UI element that is bound to the property that is annotated with the `DisplayAttribute.Prompt` attribute.

## DisplayAttribute.GetShortName() method

```csharp
public string? GetShortName ();
```

Returns the value of the `DisplayAttribute.ShortName` property.

Returns: The localized string for the `DisplayAttribute.ShortName` property if the `DisplayAttribute.ResourceType` property has been specified and if the `DisplayAttribute.ShortName` property represents a resource key; otherwise, the non-localized value of the `DisplayAttribute.ShortName` value property.

Exceptions:

- `InvalidOperationException`: Both the `DisplayAttribute.ResourceType` property and `DisplayAttribute.ShortName` properties were set,
but a public static property with a name matching the `DisplayAttribute.ShortName` value couldn't be found on the `DisplayAttribute.ResourceType`.

#### Remarks
The short name is used as the grid column label for a UI element that is bound to the property that is annotated with this attribute. This property returns either the literal, non-localized string, or a localized string if `DisplayAttribute.ResourceType` is not `null`.
