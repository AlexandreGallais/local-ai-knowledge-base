---
title: "GCKind enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GCKind.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GCKind enum

Namespace: `System`

```csharp
public enum GCKind
```

Specifies the kind of a garbage collection.

#### Remarks

A GC can be one of the 3 kinds - ephemeral, full blocking, or background.
Their frequencies are very different. Ephemeral GCs happen much more often than the other two kinds. Background GCs usually happen infrequently, and full blocking GCs usually happen very infrequently. In order to sample the very infrequent GCs, collections are separated into kinds so callers can ask for all three kinds while maintaining a reasonable sampling rate. For example, if you're sampling once every second, without this distinction, you may never observe a background GC. With this distinction, you can always get info of the last GC of the kind you specify.

## GCKind.Any field

```csharp
Any
```

Any kind of collection.

## GCKind.Background field

```csharp
Background
```

A background collection. This is always a generation 2 collection.

#### Remarks

This is always a gen2 collection.

## GCKind.Ephemeral field

```csharp
Ephemeral
```

A gen0 or gen1 collection.

## GCKind.FullBlocking field

```csharp
FullBlocking
```

A blocking gen2 collection.
