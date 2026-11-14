---
title: "EventDataAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventDataAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventDataAttribute class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class EventDataAttribute : Attribute
```

Specifies a type to be passed to the `EventSource.Write<T>` method.

#### Remarks
`EventSource.Write` requires T to be an anonymous type or marked with the `EventDataAttribute` attribute. In addition, the properties of `T` must be a supported property type; either a simple framework type such as `Int16`, `Int32`, `Int64`, `String`, `Guid`, `DateTime` or `DateTimeOffset`, or an array of primitive types.

## EventDataAttribute.EventDataAttribute() constructor

```csharp
public EventDataAttribute ();
```

Initializes a new instance of the `EventDataAttribute` class.

To be added.

## EventDataAttribute.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name to apply to an event if the event type or property is not explicitly named.

Returns: The name to apply to the event or property.

#### Remarks
If you call `EventSource.Write`, passing `null` for `eventName`, the event name is automatically derived from `EventDataAttribute.Name` or determined based on the name of type `T`.
