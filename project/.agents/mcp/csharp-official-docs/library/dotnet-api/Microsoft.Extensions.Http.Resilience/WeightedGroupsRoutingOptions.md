---
title: "WeightedGroupsRoutingOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/WeightedGroupsRoutingOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WeightedGroupsRoutingOptions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class WeightedGroupsRoutingOptions
```

Represents the options for collection of endpoint groups that have a weight assigned.

This strategy picks the first endpoint group based on its weight and then selects the remaining groups in order,
starting from the first one and omitting the one that was already selected.

## WeightedGroupsRoutingOptions.WeightedGroupsRoutingOptions() constructor

```csharp
public WeightedGroupsRoutingOptions ();
```

To be added.

To be added.

## WeightedGroupsRoutingOptions.Groups property

```csharp
public System.Collections.Generic.IList<Microsoft.Extensions.Http.Resilience.WeightedUriEndpointGroup> Groups { get; set; }
```

Gets or sets the collection of weighted endpoints groups.

Returns: To be added.

To be added.

## WeightedGroupsRoutingOptions.SelectionMode property

```csharp
public Microsoft.Extensions.Http.Resilience.WeightedGroupSelectionMode SelectionMode { get; set; }
```

Gets or sets the selection mode that determines the behavior of underlying routing strategy.

Returns: To be added.

To be added.
