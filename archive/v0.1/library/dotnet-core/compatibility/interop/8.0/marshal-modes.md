---
title: "Breaking change: Custom marshallers require additional members"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/interop/8.0/marshal-modes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Custom marshallers require additional members

The custom marshaller analyzer has changed to require all element-focused marshal modes to satisfy both the managed-to-unmanaged and unmanaged-to-managed shapes.

## Previous behavior

Custom marshallers with `MarshalMode.ElementIn` only needed a `ConvertToUnmanaged` method. Custom marshallers with `MarshalMode.ElementOut` only needed a `ConvertToManaged` method.

## New behavior

Starting in .NET 8, SYSLIB1057 is reported for custom marshallers with `MarshalMode.ElementIn` or `MarshalMode.ElementOut` that don't have both a `ConvertToUnmanaged` and `ConvertToManaged` method.

## Version introduced

.NET 8 RC 1

## Type of breaking change

This change can affect source compatibility.

## Reason for change

With the introduction of source-generated COM, the marshallers can be used in element scenarios in both managed-to-unmanaged and unmanaged-to-managed scenarios. This change updates the analyzer to ensure that user-defined marshallers have the required members for all scenarios where the marshaller might be used.

## Recommended action

Add both a `ConvertToManaged` and `ConvertToUnmanaged` method to the marshaller type.

## Affected APIs

- `System.Runtime.InteropServices.Marshalling.CustomMarshallerAttribute`
