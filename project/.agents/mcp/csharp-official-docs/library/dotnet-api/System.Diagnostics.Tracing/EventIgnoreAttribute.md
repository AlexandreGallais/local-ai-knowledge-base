---
title: "EventIgnoreAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventIgnoreAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventIgnoreAttribute class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class EventIgnoreAttribute : Attribute
```

Specifies a property should be ignored when writing an event type with the `EventSource.Write<T>` method.

#### Remarks
By default, when the `EventSource.Write` method is called, all of an object's public properties are written to the event payload. Apply `EventIgnoreAttribute` to a property to prevent the property from being written in the event.

## EventIgnoreAttribute.EventIgnoreAttribute() constructor

```csharp
public EventIgnoreAttribute ();
```

Initializes a new instance of the `EventIgnoreAttribute` class.

To be added.
