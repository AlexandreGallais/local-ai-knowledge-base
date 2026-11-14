---
title: "GCGenerationInfo struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GCGenerationInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GCGenerationInfo struct

Namespace: `System`

```csharp
public readonly struct GCGenerationInfo
```

Represents the size and the fragmenation of a generation on entry and on exit of the GC reported in `GCMemoryInfo`.

To be added.

## GCGenerationInfo.FragmentationAfterBytes property

```csharp
public long FragmentationAfterBytes { get; }
```

Gets the fragmentation in bytes on exit from the reported collection.

Returns: A number representing the fragmentation in bytes on exit from the reported collection.

To be added.

## GCGenerationInfo.FragmentationBeforeBytes property

```csharp
public long FragmentationBeforeBytes { get; }
```

Gets the fragmentation in bytes on entry to the reported collection.

Returns: A number representing the fragmentation in bytes on entry to the reported collection.

To be added.

## GCGenerationInfo.SizeAfterBytes property

```csharp
public long SizeAfterBytes { get; }
```

Gets the size in bytes on exit from the reported collection.

Returns: A number representing the size in bytes on exit from the reported collection.

To be added.

## GCGenerationInfo.SizeBeforeBytes property

```csharp
public long SizeBeforeBytes { get; }
```

Gets the size in bytes on entry to the reported collection.

Returns: A number representing the size in bytes on entry to the reported collection.

To be added.
