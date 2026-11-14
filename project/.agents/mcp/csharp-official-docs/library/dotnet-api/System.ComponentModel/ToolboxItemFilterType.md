---
title: "ToolboxItemFilterType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ToolboxItemFilterType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ToolboxItemFilterType enum

Namespace: `System.ComponentModel`

```csharp
public enum ToolboxItemFilterType
```

Defines identifiers used to indicate the type of filter that a `ToolboxItemFilterAttribute` uses.

#### Examples
The following code example demonstrates how to apply the `ToolboxItemFilterAttribute`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ToolboxItemFilterAttribute/Overview/samplecontrol.cs._

## ToolboxItemFilterType.Allow field

```csharp
Allow
```

Indicates that a toolbox item filter string is allowed, but not required.

## ToolboxItemFilterType.Custom field

```csharp
Custom
```

Indicates that custom processing is required to determine whether to use a toolbox item filter string. It is typically specified on a root designer class to indicate that the designer wishes to accept or reject a toolbox item through code. The designer must implement the `IToolboxUser.GetToolSupported` method of the `IToolboxUser` interface.

## ToolboxItemFilterType.Prevent field

```csharp
Prevent
```

Indicates that a toolbox item filter string is not allowed. If a designer and a component class both have a filter string and the value of one is `ToolboxItemFilterType.Prevent`, the toolbox item will not be available.

## ToolboxItemFilterType.Require field

```csharp
Require
```

Indicates that a toolbox item filter string must be present for a toolbox item to be enabled.  For a toolbox item with a filter type of `Require` to be enabled, the designer and the component class must have a matching filter string. Additionally, neither the designer or component class can have a filter type of `Prevent` for the toolbox item to be enabled.
