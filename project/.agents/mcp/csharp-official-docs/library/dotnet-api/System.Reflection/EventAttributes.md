---
title: "EventAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/EventAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventAttributes enum

Namespace: `System.Reflection`

```csharp
public enum EventAttributes
```

Specifies the attributes of an event.

#### Remarks
`EventAttributes` values may be combined using the bitwise OR operation to get the appropriate combination.

These enums are defined in the corhdr.h file and are a combination of bits and enumerators.

#### Examples
The following example uses reflection emit to create a type with two events. It uses None to specify that the events have no attributes.

_Code sample not included: ~/snippets/csharp/System.Reflection/EventAttributes/Overview/typebuilder_getevents1.cs._

## EventAttributes.None field

```csharp
None
```

Specifies that the event has no attributes.

## EventAttributes.ReservedMask field

```csharp
ReservedMask
```

Specifies a reserved flag for common language runtime use only.

## EventAttributes.RTSpecialName field

```csharp
RTSpecialName
```

Specifies that the common language runtime should check name encoding.

## EventAttributes.SpecialName field

```csharp
SpecialName
```

Specifies that the event is special in a way described by the name.
