---
title: "EventFieldAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventFieldAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventFieldAttribute class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class EventFieldAttribute : Attribute
```

The `EventFieldAttribute` is placed on fields of user-defined types that are passed as `EventSource` payloads.

To be added.

## EventFieldAttribute.EventFieldAttribute() constructor

```csharp
public EventFieldAttribute ();
```

Initializes a new instance of the `EventFieldAttribute` class.

To be added.

## EventFieldAttribute.Format property

```csharp
public System.Diagnostics.Tracing.EventFieldFormat Format { get; set; }
```

Gets or sets the value that specifies how to format the value of a user-defined type.

Returns: The value that specifies how to format the value of a user-defined type.

To be added.

## EventFieldAttribute.Tags property

```csharp
public System.Diagnostics.Tracing.EventFieldTags Tags { get; set; }
```

Gets or sets the user-defined `EventFieldTags` value that is required for fields that contain data that isn't one of the supported types.

Returns: Returns `EventFieldTags`.

To be added.
