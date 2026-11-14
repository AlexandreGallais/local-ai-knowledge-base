---
title: "PropertyAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/PropertyAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyAttributes enum

Namespace: `System.Reflection`

```csharp
public enum PropertyAttributes
```

Defines the attributes that can be associated with a property. These attribute values are defined in corhdr.h.

#### Remarks
To get the `PropertyAttributes`, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, get the `Attributes`.

The enumerated value is a number representing the bitwise OR of the attributes implemented on the method.

#### Examples
The following example builds three properties and displays the `PropertyAttributes` enumerated value. Note that the read-only property has no setter and thus cannot be changed by.`Caption = statement`.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyAttributes/Overview/source.cs._

## PropertyAttributes.HasDefault field

```csharp
HasDefault
```

Specifies that the property has a default value.

## PropertyAttributes.None field

```csharp
None
```

Specifies that no attributes are associated with a property.

## PropertyAttributes.Reserved2 field

```csharp
Reserved2
```

Reserved.

## PropertyAttributes.Reserved3 field

```csharp
Reserved3
```

Reserved.

## PropertyAttributes.Reserved4 field

```csharp
Reserved4
```

Reserved.

## PropertyAttributes.ReservedMask field

```csharp
ReservedMask
```

Specifies a flag reserved for runtime use only.

## PropertyAttributes.RTSpecialName field

```csharp
RTSpecialName
```

Specifies that the metadata internal APIs check the name encoding.

## PropertyAttributes.SpecialName field

```csharp
SpecialName
```

Specifies that the property is special, with the name describing how the property is special.
