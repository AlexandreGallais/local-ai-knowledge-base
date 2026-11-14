---
title: "EventActivityOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventActivityOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventActivityOptions enum

Namespace: `System.Diagnostics.Tracing`

```csharp
public enum EventActivityOptions
```

Specifies the tracking of activity start and stop events.

To be added.

## EventActivityOptions.Detachable field

```csharp
Detachable
```

Allow overlapping activities. By default, activity starts and stops must be property nested. That is, a sequence of Start A, Start B, Stop A, Stop B is not allowed will result in B stopping at the same time as A.

## EventActivityOptions.Disable field

```csharp
Disable
```

Turn off start and stop tracking.

## EventActivityOptions.None field

```csharp
None
```

Use the default behavior for start and stop tracking.

## EventActivityOptions.Recursive field

```csharp
Recursive
```

Allow recursive activity starts. By default, an activity cannot be recursive. That is, a sequence of Start A, Start A, Stop A, Stop A is not allowed. Unintentional recursive activities can occur if the app executes and for some the stop is not reached before another start is called.
