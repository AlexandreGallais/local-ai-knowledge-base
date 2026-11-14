---
title: "EventSourceAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventSourceAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSourceAttribute class

Namespace: `System.Diagnostics.Tracing`

```csharp
public sealed class EventSourceAttribute : Attribute
```

Allows the event tracing for Windows (ETW) name to be defined independently of the name of the event source class.

#### Remarks
By default, in event tracing for Windows (ETW), the name of an event source matches the name of the event source class, but without the namespace name. This is sufficient for private event sources, but for more visible event sources it is better to have a hierarchical namespace such as: *CompanyName*.*ProviderName*.  The `EventSourceAttribute` attribute lets you define the ETW name independently of the name of the class.

The `EventSourceAttribute` attribute also lets you define a GUID explicitly for the event source.  In standard usage, you don't need to specify a GUID when defining an event source or referring to it, because a GUID is implicitly derived from the name of the event source class. Explicitly defining a GUID is discouraged, except when upgrading existing ETW providers to using event sources.

## EventSourceAttribute.EventSourceAttribute() constructor

```csharp
public EventSourceAttribute ();
```

Initializes a new instance of the `EventSourceAttribute` class.

To be added.

## EventSourceAttribute.Guid property

```csharp
public string? Guid { get; set; }
```

Gets or sets the event source identifier.

Returns: The event source identifier.

#### Remarks
In standard usage, you don't need to specify a GUID when defining an event source or referring to it, because a GUID is implicitly derived from the name of the event source class. Explicitly defining a GUID is discouraged, except when upgrading existing ETW providers to using event sources.

## EventSourceAttribute.LocalizationResources property

```csharp
public string? LocalizationResources { get; set; }
```

Gets or sets the name of the localization resource file.

Returns: The name of the localization resource file, or `null` if the localization resource file does not exist.

#### Remarks
Event sources support the localization of events. You can localize the names used for events, operation codes, tasks, keywords, and maps to multiple languages. To localize events, create a .ResX style string table by adding a resource file to your project.  The resource file is given a name (for example, DefaultNameSpace.ResourceFileName) that can be passed to the `ResourceManager.%23ctor` constructor that will read the resources.  This name is the value of the `LocalizationResources` property. If the `LocalizationResources` property is not `null`, the `EventSource` object looks up the localized strings for events by using the following resource naming scheme, where the terms in uppercase represent the name of the event, task, keyword, or map value that should be localized:

- event_EVENTNAME

- task_TASKNAME

- keyword_KEYWORDNAME

- map_MAPNAME

Note that the localized string for an event corresponds to the message string and can have {0} values, which represent the payload values.

## EventSourceAttribute.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name of the event source.

Returns: The name of the event source.

To be added.
