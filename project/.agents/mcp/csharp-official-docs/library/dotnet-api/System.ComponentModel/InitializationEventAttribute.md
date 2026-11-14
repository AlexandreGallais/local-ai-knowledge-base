---
title: "InitializationEventAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/InitializationEventAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InitializationEventAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class InitializationEventAttribute : Attribute
```

Specifies which event is raised on initialization. This class cannot be inherited.

#### Remarks
The `InitializationEventAttribute` class identifies the event for which data-bound controls can be loaded. It is intended for use at design time to determine which event to handle when autogenerating data-binding code.

## InitializationEventAttribute.InitializationEventAttribute(String) constructor

```csharp
public InitializationEventAttribute (string eventName);
```

Initializes a new instance of the `InitializationEventAttribute` class.

Parameters:

- `eventName`: The name of the initialization event.

To be added.

## InitializationEventAttribute.EventName property

```csharp
public string EventName { get; }
```

Gets the name of the initialization event.

Returns: The name of the initialization event.

To be added.
