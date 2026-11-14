---
title: "MonitoringDescriptionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/MonitoringDescriptionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MonitoringDescriptionAttribute class

Namespace: `System.Diagnostics`

```csharp
public class MonitoringDescriptionAttribute : System.ComponentModel.DescriptionAttribute
```

Specifies a description for a property or event.

#### Remarks
A visual designer can display the description when referencing the component member, such as in a Properties window. Access the `Description` property to get or set the text associated with this attribute.

## MonitoringDescriptionAttribute.MonitoringDescriptionAttribute(String) constructor

```csharp
public MonitoringDescriptionAttribute (string description);
```

Initializes a new instance of the `MonitoringDescriptionAttribute` class, using the specified description.

Parameters:

- `description`: The application-defined description text.

#### Remarks
The description you specify in the `MonitoringDescriptionAttribute.%23ctor` constructor is displayed by a visual designer when you access the property, event, or extender to which the attribute applies

## MonitoringDescriptionAttribute.Description property

```csharp
public override string Description { get; }
```

Gets description text associated with the item monitored.

Returns: An application-defined description.

To be added.
