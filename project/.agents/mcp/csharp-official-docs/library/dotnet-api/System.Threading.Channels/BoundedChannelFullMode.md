---
title: "BoundedChannelFullMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Channels/BoundedChannelFullMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BoundedChannelFullMode enum

Namespace: `System.Threading.Channels`

```csharp
public enum BoundedChannelFullMode
```

Specifies the behavior to use when writing to a bounded channel that is already full.

To be added.

## BoundedChannelFullMode.DropNewest field

```csharp
DropNewest
```

Removes and ignores the newest item in the channel in order to make room for the item being written.

## BoundedChannelFullMode.DropOldest field

```csharp
DropOldest
```

Removes and ignores the oldest item in the channel in order to make room for the item being written.

## BoundedChannelFullMode.DropWrite field

```csharp
DropWrite
```

Drops the item being written.

## BoundedChannelFullMode.Wait field

```csharp
Wait
```

Waits for space to be available in order to complete the write operation.
