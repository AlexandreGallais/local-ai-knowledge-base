---
title: "OperationStatus enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/OperationStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OperationStatus enum

Namespace: `System.Buffers`

```csharp
public enum OperationStatus
```

Defines the values that can be returned from span-based operations that support processing of input contained in multiple discontiguous buffers.

To be added.

## OperationStatus.DestinationTooSmall field

```csharp
DestinationTooSmall
```

The input is partially processed, up to what could fit into the destination buffer. The caller can enlarge the destination buffer, slice the buffers appropriately, and retry.

## OperationStatus.Done field

```csharp
Done
```

The entire input buffer has been processed and the operation is complete.

## OperationStatus.InvalidData field

```csharp
InvalidData
```

The input contained invalid bytes which could not be processed. If the input is partially processed, the destination contains the partial result. This guarantees that no additional data appended to the input will make the invalid sequence valid.

## OperationStatus.NeedMoreData field

```csharp
NeedMoreData
```

The input is partially processed, up to the last valid chunk of the input that could be consumed. The caller can stitch the remaining unprocessed input with more data, slice the buffers appropriately, and retry.
