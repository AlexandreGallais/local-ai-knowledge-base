---
title: "OverloadResolutionPriorityAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/OverloadResolutionPriorityAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OverloadResolutionPriorityAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class OverloadResolutionPriorityAttribute : Attribute
```

Specifies the priority of a member in overload resolution. When unspecified, the default priority is 0.

To be added.

## OverloadResolutionPriorityAttribute.OverloadResolutionPriorityAttribute(Int32) constructor

```csharp
public OverloadResolutionPriorityAttribute (int priority);
```

Initializes a new instance of the `OverloadResolutionPriorityAttribute` class.

Parameters:

- `priority`: The priority of the attributed member. Higher numbers are prioritized, lower numbers are deprioritized. 0 is the default if no attribute is present.

To be added.

## OverloadResolutionPriorityAttribute.Priority property

```csharp
public int Priority { get; }
```

The priority of the member. Higher numbers are prioritized, lower numbers are deprioritized.

Returns: To be added.

To be added.
