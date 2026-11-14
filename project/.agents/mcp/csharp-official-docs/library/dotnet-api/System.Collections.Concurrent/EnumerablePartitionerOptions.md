---
title: "EnumerablePartitionerOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/EnumerablePartitionerOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EnumerablePartitionerOptions enum

Namespace: `System.Collections.Concurrent`

```csharp
public enum EnumerablePartitionerOptions
```

Specifies options to control the buffering behavior of a partitioner.

#### Remarks
Out-of-the-box partitioners are created with a set of default behaviors. For example, by default, some form of buffering and chunking will be used to achieve optimal performance in the common scenario where an `IEnumerable<T>` implementation is fast and non-blocking. These behaviors can be overridden by this enumeration by using the `Partitioner.Create` method.

## EnumerablePartitionerOptions.NoBuffering field

```csharp
NoBuffering
```

Create a partitioner that takes items from the source enumerable one at a time and does not use intermediate storage that can be accessed more efficiently by multiple threads. This option provides support for low latency (items will be processed as soon as they are available from the source) and provides partial support for dependencies between items (a thread cannot deadlock waiting for an item that the thread itself is responsible for processing).

## EnumerablePartitionerOptions.None field

```csharp
None
```

Use the default behavior, which is to use buffering to achieve optimal performance.
