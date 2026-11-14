---
title: "WeightedGroupSelectionMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/WeightedGroupSelectionMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WeightedGroupSelectionMode enum

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public enum WeightedGroupSelectionMode
```

Represents the selection mode used in `WeightedGroupsRoutingOptions`.

To be added.

## WeightedGroupSelectionMode.EveryAttempt field

```csharp
EveryAttempt
```

In this selection mode the weight is used for every pick of `WeightedUriEndpointGroup`.

## WeightedGroupSelectionMode.InitialAttempt field

```csharp
InitialAttempt
```

In this selection mode the weight is only used to pick initial `WeightedUriEndpointGroup`.
Remaining groups are picked in order, starting from the first, finishing with last and skipping already picked group.
