---
title: "TimersDescriptionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Timers/TimersDescriptionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimersDescriptionAttribute class

Namespace: `System.Timers`

```csharp
public class TimersDescriptionAttribute : System.ComponentModel.DescriptionAttribute
```

Sets the description that visual designers can display when referencing an event, extender, or property.

#### Remarks
For more information about using attributes, see Attributes.

## TimersDescriptionAttribute.TimersDescriptionAttribute(String) constructor

```csharp
public TimersDescriptionAttribute (string description);
```

Initializes a new instance of the `TimersDescriptionAttribute` class.

Parameters:

- `description`: The description to use.

#### Remarks
For more information about using attributes, see Attributes.

## TimersDescriptionAttribute.Description property

```csharp
public override string Description { get; }
```

Gets the description that visual designers can display when referencing an event, extender, or property.

Returns: The description for the event, extender, or property.

#### Remarks
For more information about using attributes, see Attributes.
