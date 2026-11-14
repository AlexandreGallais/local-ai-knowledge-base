---
title: "ActivitySamplingResult enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivitySamplingResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivitySamplingResult enum

Namespace: `System.Diagnostics`

```csharp
public enum ActivitySamplingResult
```

Enumeration values used by `ActivityListener` to indicate the amount of data to collect for the related `Activity`. Requesting more data causes a greater performance overhead.

To be added.

## ActivitySamplingResult.AllData field

```csharp
AllData
```

The activity object should be populated with all the propagation information and also all other properties such as Links, Tags, and Events. Using this value causes `Activity.IsAllDataRequested` to return `true`.

## ActivitySamplingResult.AllDataAndRecorded field

```csharp
AllDataAndRecorded
```

The activity object should be populated the same as the `ActivitySamplingResult.AllData` case. Additionally, Activity.Recorded is set to `true`. For activities using the W3C trace ids, this sets a flag bit in the ID that will be propagated downstream requesting that the trace is recorded everywhere.

## ActivitySamplingResult.None field

```csharp
None
```

The activity object does not need to be created.

## ActivitySamplingResult.PropagationData field

```csharp
PropagationData
```

The activity object needs to be created. It will have a Name, a Source, an Id and Baggage. Other properties are unnecessary and will be ignored by this listener.
